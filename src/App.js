import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import Group from "./pages/Group/Group";
import JoinCreateGroup from "./pages/JoinCreateGroup/JoinCreateGroup";
import JoinGroup from "./pages/JoinGroup/JoinGroup";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import LoggedInRedirect from "./components/LoggedInRedirect/LoggedInRedirect";
import RecordMatch from "./pages/RecordMatch/RecordMatch";
import ModerateGroup from "./pages/ModerateGroup/ModerateGroup";
import MainContext from "./store/main-context";

const App = () => {
  const mainCtx = useContext(MainContext);
  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route element={<LoggedInRedirect />}>
            <Route path="/" element={<Home />} />
            <Route path={mainCtx.baseURL} element={<Home />} />
            <Route path={`${mainCtx.baseURL}/login`} element={<Login />} />
            <Route
              path={`${mainCtx.baseURL}/register`}
              element={<Register />}
            />
            <Route path={`${mainCtx.baseURL}/about`} element={<About />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route
              path={`${mainCtx.baseURL}/:username/join-create`}
              element={<JoinCreateGroup />}
            />
            <Route
              path={`${mainCtx.baseURL}/:username/join`}
              element={<JoinGroup />}
            />
            <Route
              path={`${mainCtx.baseURL}/:username/create`}
              element={<CreateGroup />}
            />
            <Route
              path={`${mainCtx.baseURL}/:username/dashboard`}
              element={<Home />}
            />
            <Route
              path={`${mainCtx.baseURL}/:username/profile`}
              element={<Profile />}
            />
            <Route
              path={`${mainCtx.baseURL}/group/:group`}
              element={<Group />}
            />
            <Route
              path={`${mainCtx.baseURL}/:username/record-match`}
              element={<RecordMatch />}
            />
            <Route
              path={`${mainCtx.baseURL}/group/:group/moderate`}
              element={<ModerateGroup />}
            />
          </Route>

          <Route
            path={`${mainCtx.baseURL}/*`}
            element={<p>There's nothing here: 404!</p>}
          />
        </Routes>
      </Main>
      <Footer />
    </>
  );
};

export default App;
