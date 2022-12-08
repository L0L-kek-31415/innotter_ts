import LogIn from './pages/login';
import SingUp from './pages/register';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import LogOut from './pages/logout';
import Header from './components/header/header';
import { Eblan } from './pages/ebanat';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/register" element={<SingUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/" element={<Eblan />} />

        <Route path="/logout" element={<LogOut />} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
