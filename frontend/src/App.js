import './App.css';
import React from "react";
import Login from './pages/auth/login'
import Home from './pages/home/home'
import About from './pages/about/about'
import Contacts from './pages/contacts/contacts'
import Form from './pages/auth/Form'
import Profile from './pages/profile/profile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


function App() {
  function ProtectedRoute({ children, ...rest }) {
    let auth = localStorage.getItem('isAuthenticated');
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  return (
    <div className="App">
      <Router>
              <Switch className="content">
                <Route path="/sign-up" component={Form} />
                <Route path="/login" component={Login} />
                <ProtectedRoute exact path="/" component={Home} />
                <ProtectedRoute exact path="/about" component={About} />
                <ProtectedRoute exact path="/contacts" component={Contacts} />
                <ProtectedRoute exact path="/profile" component={Profile} />
              </Switch>
      </Router>
    </div>
  );
}
export default App;
