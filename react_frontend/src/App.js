import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';
import StoreProvider from './components/Store/Provider';
import RoutesPrivate from './components/Routes/Private/Private';

function App() {
  return (
    <Router>
      <StoreProvider>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/cadastro" component={Cadastro} />
          <RoutesPrivate path="/" component={Home} />
        </Switch>
      </StoreProvider>
    </Router>
  );
}

export default App;