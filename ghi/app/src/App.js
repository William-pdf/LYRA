import './App.css';
import { AuthProvider } from './useToken';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHome from './AuthDemo/UserHome';
import AuthDemo from './AuthDemo/AuthDemo';

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, 'lyra/');
  return (
    <BrowserRouter basename={basename}>
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
