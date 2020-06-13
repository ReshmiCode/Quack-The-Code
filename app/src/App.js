import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router , Route , Redirect , Switch} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import Duckie from './Duckie';
import HomePage from './HomePage';
import Desktop from './Desktop';

const App = () => {
  return (
    <div>
      <Router>
        <main>
            <ScrollToTop>
                <Switch>
                    <Route path="/" exact>
                      <HomePage/>
                    </Route>
                    <Route path="/duckie" exact>
                      <Duckie />
                    </Route>
                    <Route path="/app" exact>
                      <Desktop />
                    </Route>
                    <Redirect to="/"/>
                </Switch>
              </ScrollToTop>
          </main>
      </Router>
    </div>
  );
}

export default App;
