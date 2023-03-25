import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MySong from './components/MySong';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Login/>}></Route>
          <Route path = '/SignUp' element = {<SignUp/>}></Route>
          <Route path='/Main' element = {<Main/>}></Route>
          <Route path='/Search' element={<Search/>}></Route>
          <Route path='/MySong' element={<MySong/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
