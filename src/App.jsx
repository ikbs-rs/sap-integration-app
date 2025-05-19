import { Routes, Route} from 'react-router-dom';
import './App.css'

import Login from './Login';
import Home from './Home';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

