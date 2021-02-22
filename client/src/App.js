
import AppWithRouter from './components/parts/AppRouter';

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";




const App = () => <AppWithRouter />;
  // return (
  //   // <BrowserRouter>
  //   //   <Switch>
  //   //     <Route exact path="/register" component={Register} />
  //   //     <Route exact path="/login" component={Login} />
  //   //     <Route exact path="/" component={Home} />
  //   //     <Route exact path="/create-post" component={CreatePost} />
  //   //   </Switch>
  //   // </BrowserRouter>
  // );


export default App;
