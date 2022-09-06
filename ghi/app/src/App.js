import "./App.css";
import { AuthProvider } from "./useToken";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./nav/Nav";
import SongRequestPage from "./song_request_pages/SongRequestPage";
import AddSongForm from "./song_request_pages/AddSongForm";
import LandingPage from "./main_page/LandingPage";
import Login from "./Auth/Login";
import UserHome from "./Auth/UserHome";
import Signup from "./Auth/Signup";

function App(props) {
  let { songs, categories } = props;
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  return (
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="catalog/">
              {/* <Route 
                index
                element={<MyCatalogPage 
                  songs={songs}
                />} 
              /> */}
              <Route
                path="add/"
                element={<AddSongForm categories={categories} />}
              />
              {/* <Route path="edit/"
                element={<EditSongPage 
                  categories={categories}
                />} 
              /> */}
            </Route>
            <Route path="requests/">
              <Route index element={<SongRequestPage />} />
              {/* <Route path='${artist_name}/'
                element={<PublicRequestPage
                  songs={songs}
                />}
              /> */}
            </Route>
            {/* <Route path="account/" 
              element={<AccountPage
              />}
            /> */}
            {/* <Route path="signup/"
              element={<SignUpPage
              />}
            /> */}
            <Route path="login/" element={<Login />} />
            {/* <Route path="logout"
              element={<LogoutPage
              />}
            /> */}
            {/* <Route path="signup/" element={<AuthDemo />} /> */}
            <Route path="home/" element={<UserHome />} />
            <Route path="signup/" element={<Signup />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
