import { Routes, Route, BrowserRouter, Navigate, HashRouter } from 'react-router-dom';
import './App.css';

import { Dashboard } from './Dashboard';
import SignUp from './SignUp';
import { LogIn } from './LogIn';
import EditPost from './EditPost';
import AddNewPost from './AddNewPost';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <Navigate to="/dashboard"/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/:postId' element={<EditPost/>}/>
        <Route path='/dashboard/add' element={<AddNewPost/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<LogIn/>}/>
      </Routes>
  </HashRouter>
  )
}

export default App;
