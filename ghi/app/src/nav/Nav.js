import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useToken } from "../useToken";
import logo from "../lyra_logo/L_only_trans.png";
import "./nav.css";

function Nav() {
  // eslint-disable-next-line no-unused-vars
  const [token, login, logout] = useToken();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState("");
  useEffect(() => {
    async function getCurrentUser() {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/tokens/me/`;
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const userResponse = await response.json();
        setUser(userResponse);
      }
    }
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  console.log(token);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img className="logo" src={logo} alt="Lyra" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="nav-list">
            <li className="nav-item">
              <NavLink className="nav-link" to="catalog/">
                <h3 className="link-nav">CATALOG</h3>
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="catalog/">
                <h3 className="link-nav">BUTTS</h3>
              </NavLink>
            </li>
            <li>
              {token ? (
                <button
                  onClick={() => logout()}
                  type="button"
                  className="btn btn-primary"
                >
                  Logout
                </button>
              ) : (
                <NavLink className="nav-link" to="login/">
                  <h3 className="link-nav">LOGIN</h3>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
