import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation'
import HomePage from './views/HomePage';
import MoviesPage from './views/MoviesPage';
import MovieDetailsView from './views/MovieDetailsView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

            <Route path="/movies/:moviesId">
              <MovieDetailsView />
            </Route>

            <Route>
                <HomePage/>
            </Route>
        </Switch>
        <ToastContainer autoClose={3000}/>
     </>)
}

export default App;
