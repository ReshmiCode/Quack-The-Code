import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router , Route , Redirect , Switch} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';
import HomePage from './HomePage';
import MainApp from './MainApp';

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
                    <Route path="/app" exact>
                      <MainApp />
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
