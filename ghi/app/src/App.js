import './App.css';
import { AuthProvider } from './useToken';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './nav/Nav';
import SongRequestPage from './song_request_pages/SongRequestPage';
import AddSongForm from './song_request_pages/AddSongForm';
import LandingPage from './main_page/LandingPage';
import UserCatalog from './song_request_pages/UserCatalogPageTest';
import Login from './Auth/Login';
import UserHome from './Auth/UserHome';
import Signup from './Auth/Signup';

function App(props) {
  let { categories, songs } = props;
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
  let songID = 0
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="catalog/">
              <Route 
                index
                element={<UserCatalog 
                  songs={songs}
                />} 
              />
              <Route
                path="add/"
                element={<AddSongForm categories={categories} />}
              />
              {/* <Route path=':songNav/'
                element={<EditSongPage 
                  categories={categories}
                />}  */}
              />
            </Route>
            <Route path="requests/:ownerArtist/">
              <Route
                index
                element={
                  <SongRequestPage categories={categories} songs={songs} />
                }
              />
              {/* <Route path='${artist_name}/'
                element={<PublicRequestPage
                  songs={songs}
                />}
              /> */}
            </Route>
            <Route path="signup/" element={<Signup />} />
            <Route path="login/" element={<Login />} />
            <Route path="account/" element={<UserHome />} />
            {/* <Route path="logout"
              element={<LogoutPage
              />}
            /> */}
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
