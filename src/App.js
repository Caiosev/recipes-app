import React from 'react';
import './App.css';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoritesRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/foods/:id/in-progress" component={RecipeInProgress} />
        <Route path="/foods/:id" component={RecipeDetails} />
        <Route path="/foods" component={Foods} />
        <Route path="/drinks/:id/in-progress" component={RecipeInProgress} />
        <Route path="/drinks/:id" component={RecipeDetails} />
        <Route path="/drinks" component={Drinks} />
        <Route path="/profile" component={Profile} />
        <Route path="/done-recipes" component={DoneRecipes} />
        <Route path="/favorite-recipes" component={FavoriteRecipes} />
      </Switch>
    </HashRouter>
  );
}

export default App;
