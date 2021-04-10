import './App.css';
import React from "react";
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import Home from './pages/home/home'
import About from './pages/about/about'
import Contacts from './pages/contacts/contacts'
import Subscribe from './pages/auth/subscribe'
import Profile from './pages/profile/profile'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
              <Switch className="content">
                <Route path="/sign-up" component= {Register} />
                <Route path="/login" component={Login} />
                <Route exact path="/" component={Home} /> 
                <Route path="/about" component={About} />
                <Route path="/contacts" component={Contacts} />
                <Route path="/subscribe" component={Subscribe} />
                <Route path="/profile" component={Profile} />
              </Switch>
      </Router>
    </div>
  );
}




export default App;
