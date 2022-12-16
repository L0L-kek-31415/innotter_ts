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
import PostList from "./components/post/postList";
import AddPost from "./components/post/addPost";
import OnePage from "./components/page/onePage";
import ForYouPostList from "./components/post/forYouPosts";

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
        <Route path="/page/:id" element={<OnePage />} />
        <Route path="/mypages/page/:id" element={<OnePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<PageList />} />
        <Route path="/createpage" element={<AddPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/mypages" element={<MyPageList />} />
        <Route path="/search" element={<Search />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/createpost" element={<AddPost />} />
        <Route path="/recom" element={<ForYouPostList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
