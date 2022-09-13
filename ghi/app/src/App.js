import './App.css';
import { AuthProvider } from './useToken';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './nav/Nav';
import SongRequestPage from './song_request_pages/SongRequestPage';
import AddSongFormWrapper from './song_request_pages/AddSongForm';
import ArtistFacingRequestPage from './song_request_pages/ArtistFacingRequestPage';
import LandingPage from './main_page/LandingPage';
import UserCatalog from './song_request_pages/UserCatalogPage';
import EditSong from './song_request_pages/EditSongPage';
import Login from './Auth/Login';
import UserHome from './Auth/UserHome';
import Signup from './Auth/Signup';
import SongRequestsPage from './song_request_pages/SongRequestPage';

function App(props) {
  let { categories, songs } = props;
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, '');
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
                element={<AddSongFormWrapper categories={categories} />}
              />
              <Route path=':songNav/'
                element={<EditSong 
                  categories={categories}
                />} 
              />
            </Route>
            <Route path="requests/">
              <Route
                index
                element={<ArtistFacingRequestPage songs={songs} />}
              />
              <Route
                path=":ownerArtist/"
                element={
                  <SongRequestsPage categories={categories} songs={songs} />
                }
              /> 
              {/* <Route path=':ownerArtist/'
                element={<SongRequestPage
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
