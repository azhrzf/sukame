import { HashRouter, Routes, Route } from "react-router-dom";
import JoySignInSideTemplate from "./components/Login";
import JoySignInSideTemplateRegister from "./components/Register";
import JoyMessagesTemplate from "./components/Inner";
import Cookies from "js-cookie";
import { createContext, useState, useContext } from "react";

const AuthContext = createContext<{
  backend: string | undefined;
  token: string | undefined;
  changeAuth: (backend: string, token: string) => void;
}>({
  backend: undefined,
  token: undefined,
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

  const changeAuth = (newBackend: string, newToken: string) => {
    setBackend(newBackend);
    setToken(newToken);
  };

  return (
    <HashRouter>
      <AuthContext.Provider value={{ backend, token, changeAuth }}>
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
