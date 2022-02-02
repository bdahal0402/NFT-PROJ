import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import background from './images/home_background.png';


import Home from './Components/Home'




function App() {

  return (
    <div className="App" style={{ backgroundImage: `url(${background})` }}>
      <Switch>
        <Route exact path="/" component={Home} />
        {/*<Route exact path="/Detail" component={Detail} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/Signin" component={Signin} />
        <Route exact path="/Createassets" component={Createassets} />
        <Route exact path="/howto" component={Howto} />
  <Route exact path="/VerifyEmail" component={VerifyEmail} />*/}
      </Switch>
    </div>
  );
}

export default App;