import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigateTo = useNavigate();

  const handleLogin = () => {
    const newBool = true;
    setIsAuthenticated(newBool);
    console.log(isAuthenticated);
    navigateTo("/hero");
  };

  const handleLogout = () => {
    const newBool = false;
    setIsAuthenticated(newBool);
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid container">
          <a className="navbar-brand" href="#">
            Flight App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            {isAuthenticated ? (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                  {/* <Link to="/login">Login</Link> */}
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/registration">
                    Registration
                  </a>
                  {/* <Link to="/registration">Registration</Link> */}
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route
          path="/hero"
          element={<PrivateRoute isAuth={isAuthenticated} />}
        />
      </Routes>
    </div>
  );
}

export default App;
