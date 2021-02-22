import React,{useState} from 'react';
import createHistory from 'history/createBrowserHistory';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import withAnalytics, { initAnalytics } from 'react-with-analytics';


import HomePage from '../pages/HomePage';
import Register from '../pages/Register';
import Login from '../pages/Login';

// const [user,setUser]= useState('');
// const userData = (data) =>{
//  setUser(data);
// }

// initAnalytics('UA-126201794-1');
export const history = createHistory();

const Root = () => {
  const [user,setUser]= useState('');

  const userData = (data) =>{
    setUser(data);
   }
   return (

  
  <Switch>
    <Route exact path="/" ><HomePage user={user} /></Route>
    <Route path="/register" component={Register} />
    <Route path="/login" ><Login user={userData} /> </Route>
    {/* <Route path="/profile/:id" component={ProfilePage} />
    <Route path="/following" component={FollowingPage} />
    <Route path="/discover" component={DiscoverPage} />
    <Route path="/settings" component={SettingsPage} />
    <Route component={NotFound} /> */}
  </Switch>
);}

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <Router history={history}>
    <App />
  </Router>
);

export default AppWithRouter;
