import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from './components/Navigation'
const HomePage = lazy(() => import('./views/HomePage' /* webpackChunkName: "homepage" */));
const MoviesPage = lazy(() => import('./views/MoviesPage' /* webpackChunkName: "moviepage" */));
const MovieDetailsView = lazy(() => import('./views/MovieDetailsView' /* webpackChunkName: "moviedetailsview" */));

function App() {
    return (<>
        <Navigation />
        <Suspense fallback={<span>Is Loading...</span>}>
            <Switch>
                <Route path="/" exact>
                    <HomePage/>
                </Route>

                <Route path="/movies/:moviesId">
                  <MovieDetailsView />
                </Route>

                <Route path="/movies" exact>
                    <MoviesPage/>
                </Route>

                <Route>
                    <HomePage/>
                </Route>
            </Switch>
        </Suspense>
        <ToastContainer autoClose={3000}/>
     </>)
}

export default App;
