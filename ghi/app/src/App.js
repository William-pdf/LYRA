import './App.css';
import { AuthProvider } from './useToken';
import AuthDemo from './AuthDemo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHome from './UserHome';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthDemo />} />
          <Route path="/home" element={<UserHome />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
