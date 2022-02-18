import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Header from './Components/Header';
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path={'/'}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
