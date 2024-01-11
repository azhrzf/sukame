import { HashRouter, Routes, Route } from "react-router-dom";
import JoySignInSideTemplate from "./components/Login";
import JoySignInSideTemplateRegister from "./components/Register";
import JoyMessagesTemplate from "./components/Inner";
import Cookies from "js-cookie";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext<{
  backend: string | undefined;
  token: string | undefined;
  refresh: boolean;
  refresher: () => void; // add this line
  changeAuth: (backend: string, token: string) => void;
}>({
  backend: undefined,
  token: undefined,
  refresh: false,
  refresher: () => {},
  changeAuth: () => {},
});

const Home = () => {
  const { backend, token } = useContext(AuthContext);
  if (backend && token) {
    return <JoyMessagesTemplate />;
  } else {
    return <JoySignInSideTemplate />;
  }
};

function App() {
  const [backend, setBackend] = useState<string | undefined>(
    Cookies.get("backend")
  );
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  const [refresh, setRefresh] = useState<boolean>(false);

  const changeAuth = (newBackend: string, newToken: string) => {
    setBackend(newBackend);
    setToken(newToken);
  };

  const refresher = () => {
    console.log("refreshing");
    setRefresh((prevState) => !prevState);
  };

  return (
    <HashRouter>
      <AuthContext.Provider
        value={{ backend, token, refresh, refresher, changeAuth }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<JoySignInSideTemplate />} />
          <Route path="/register" element={<JoySignInSideTemplateRegister />} />
        </Routes>
      </AuthContext.Provider>
    </HashRouter>
  );
}

export { AuthContext };
export default App;
