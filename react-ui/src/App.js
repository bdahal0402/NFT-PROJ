import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';


import Home from './Components/Home'
import Detail from './Components/Details'
import Signup from './Components/Signup'
import Signin from './Components/Signin'
import Createassets from './Components/Createasset'
import Howto from './Components/howto'
import VerifyEmail from './Components/VerifyEmail'



function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Detail" component={Detail} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Signin" component={Signin} />
        <Route exact path="/Createassets" component={Createassets} />
        <Route exact path="/howto" component={Howto} />
        <Route exact path="/VerifyEmail" component={VerifyEmail} />
      </Switch>
    </div>
  );
}

export default App;