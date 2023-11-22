import './App.css';
import Layout from './Components/Layout';
import {Routes, Route} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import UserContextProvider from './Components/UserContext';
import CreatePage from './Pages/CreatePage';
import PostPage from './Pages/PostPage';
import EditPage from './Pages/EditPage';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/signup' element={<SignupPage />}/>
          <Route path='/create' element={<CreatePage />}/>
          <Route path='/post/:id' element={<PostPage />}/>
          <Route path='/edit/:id' element={<EditPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
