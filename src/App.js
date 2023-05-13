import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Main from './pages/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyInfo from './pages/MyInfo';
import Search from './pages/Search';
import SearchUser from './pages/SearchUser';
import UserInfo from './pages/UserInfo';
import Song from './pages/Song';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login/>}></Route>
          <Route path='/SignUp' element = {<SignUp/>}></Route>
          <Route path='/Main' element = {<Main/>}></Route>
          <Route path='/Search' element={<Search/>}></Route>
          <Route path='/SearchUser' element={<SearchUser/>}></Route>
          <Route path='/MyInfo' element={<MyInfo/>}></Route>
          <Route path='/UserInfo/:id' element={<UserInfo/>}></Route>
          <Route path='/Song/:title' element={<Song/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
