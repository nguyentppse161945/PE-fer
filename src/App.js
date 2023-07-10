import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import { Route, Routes } from 'react-router-dom';
import FormModal from './components/FormModal';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <ToastContainer autoClose={1000}/>
    <Routes>
      <Route path='/' element ={<Home/>}>Home</Route>
      <Route path='/dashboard' element ={<Dashboard/>}>DashBoard</Route>
      <Route path='/contact' element ={<Contact/>}>Contact</Route>
      <Route path='/detail/:id' element ={<Detail/>}>Detail</Route>
      <Route path='/update/:id' element ={<FormModal/>}>FormModal</Route>
      <Route path='/add' element ={<FormModal/>}>FormModal</Route>
    </Routes>
    </div>
  );
}

export default App;
