import LogIn from "./pages/login";
import SingUp from "./pages/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogOut from "./pages/logout";
import Header from "./components/header/header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import userService from "./services/userService";
import { clearUser, initUser } from "./store/reducers/userReducer";
import { AxiosError } from "axios";
import PageList from "./components/page/pageList";
import AddPage from "./components/page/addPage";
import MyPageList from "./components/page/myPagesList";
import Search from "./components/page/search";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await userService.me();
        dispatch(initUser(response.data));
      } catch (err) {
        const error = err as AxiosError;
        // @ts-ignore
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          dispatch(clearUser());
        }
      }
    };
    fetchMe();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<SingUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<PageList />} />
        <Route path="/create" element={<AddPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/mypages" element={<MyPageList />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
