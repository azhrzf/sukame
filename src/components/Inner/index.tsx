import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MyMessages from "./Chat";
import ChatContextProvider from "../Context";
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ChatProps, UserProps, MessageProps } from "../../types";
import { AuthContext } from "../../App";
import { theme } from "../../Theme";

function JoyMessagesTemplate() {
  const backend = Cookies.get("backend");
  const token = Cookies.get("token");

  interface Conversation {
    conversation_id: string;
    sender: string;
    receiver: string;
    message: string;
    dateTime: string;
  }

  const [users, setUsers] = useState<UserProps[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [initChats, setInitChats] = useState<ChatProps[]>([]);
  const { refresh } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backend}user/conversations`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (response.data.status_code === 200) {
          const { id, conversations } = response.data.data;
          const usedUsers = conversations.filter(
            (conversation: Conversation) => {
              return conversation.sender === id || conversation.receiver === id;
            }
          );
          const sendersAndReceivers = Array.from(
            new Set(
              usedUsers.flatMap((conversation: Conversation) => [
                conversation.sender,
                conversation.receiver,
              ])
            )
          ) as string[];

          const mappedUsers = sendersAndReceivers.map((user: string) => {
            return {
              id: user,
              name: user,
              username: user,
              avatar: "/static/images/avatar/2.jpg",
              online: true,
            };
          });

          setUsers(mappedUsers);

          const filteredConversations: ChatProps[] = sendersAndReceivers
            .map((sendid, index): ChatProps | undefined => {
              if (sendid !== id) {
                return {
                  id: index.toString(),
                  sender: [
                    mappedUsers[sendersAndReceivers.indexOf(sendid)],
                    mappedUsers[sendersAndReceivers.indexOf(id)],
                  ],
                  messages: usedUsers
                    .map(
                      (
                        conv: Conversation,
                        index: number
                      ): MessageProps | undefined => {
                        if (conv.sender === id || conv.receiver === id) {
                          return {
                            id: index.toString(),
                            content: conv.message,
                            timestamp: conv.dateTime,
                            sender:
                              conv.sender === id
                                ? mappedUsers[sendersAndReceivers.indexOf(id)]
                                : mappedUsers[
                                    sendersAndReceivers.indexOf(sendid)
                                  ],
                          };
                        }
                      }
                    )
                    .filter(Boolean) as MessageProps[], // remove undefined values from messages
                };
              }
            })
            .filter(Boolean) as ChatProps[]; // remove undefined values from conversations

          setUsers(mappedUsers);
          setCurrentUser(mappedUsers[0]); // set currentUser after users state is set
          setInitChats(filteredConversations); // set initChats after conversations state is set
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [backend, token, refresh]);

  const handleChangeUser = (username: string) => {
    const userIndex = users.findIndex((user) => user.username === username);
    if (userIndex !== -1) {
      setCurrentUser(users[userIndex]);
    }
  };

  const getChatsFromUser = (
    chats: ChatProps[],
    user: UserProps
  ): ChatProps[] => {
    return chats.filter((chat) => {
      const isFromUser = chat.sender.some((sender) => sender.id === user.id);
      return isFromUser;
    });
  };

  return (
    <CssVarsProvider theme={theme} disableTransitionOnChange>
      <CssBaseline />
      <ChatContextProvider>
        <Box sx={{ display: "flex", minHeight: "100dvh" }}>
          {currentUser && (
            <>
              <Sidebar user={currentUser} handleChangeUser={handleChangeUser} />
              <Header />
              <Box component="main" className="MainContent" sx={{ flex: 1 }}>
                <MyMessages
                  user={currentUser}
                  initChats={getChatsFromUser(initChats, currentUser)}
                  setInitChats={setInitChats}
                />
              </Box>
            </>
          )}
        </Box>
      </ChatContextProvider>
    </CssVarsProvider>
  );
}

export default JoyMessagesTemplate;
