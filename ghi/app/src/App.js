import './App.css';
import { AuthProvider } from './useToken';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHome from './AuthDemo/UserHome';
import AuthDemo from './AuthDemo/AuthDemo';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthDemo />} />
          <Route path="/home" element={<UserHome />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
