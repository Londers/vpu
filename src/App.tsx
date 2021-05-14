import React, {useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.sass';
import MainPage from "./pages/mainPage/MainPage";
import UsersPage from "./pages/usersPage/UsersPage";

function App() {

    const [logged, setLogged] = useState(false)

  return (
      <Router>
          <div>
              <nav hidden={!logged}>
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/about">About</Link>
                      </li>
                      <li>
                          <Link to="/users">Users</Link>
                      </li>
                  </ul>
              </nav>

              {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
              <Switch>
                  <Route path="/users">
                      <UsersPage />
                  </Route>
                  <Route path="/">
                      <MainPage setLogged={setLogged} />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
