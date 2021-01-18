// import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';


function App() {
    return (<>
        <Navigation />
        <Switch>
            <Route path="/" exact>
                <HomePage/>
            </Route>
            <Route path="/movies" exact>
                <MoviesPage/>
            </Route>
        </Switch>
     </>)
}

export default App;
