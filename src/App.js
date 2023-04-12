import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MyInfo from './components/MyInfo';
import Search from './components/Search';
import SearchUser from './components/SearchUser';
import UserInfo from './components/UserInfo';


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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
