/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { findIdBySlug } from 'src/selectors';
import Header from 'src/containers/Header';
import Home from 'src/containers/Home';
import OneArticle from 'src/containers/OneArticle';
import LoginForm from 'src/containers/LoginForm';
import SignInForm from 'src/containers/SignInForm';
import Gardiens from 'src/containers/Gardiens';
import Contact from 'src/containers/Contact';
import Games from 'src/containers/Games';
import OneGame from 'src/containers/OneGame';
import Events from 'src/containers/Events';
import OneEvent from 'src/containers/OneEvent';
import AddArticle from 'src/containers/AddArticle';
import Profil from 'src/containers/Profil';
import RGPD from 'src/containers/RGPD';
import Footer from 'src/components/Footer';
import ProtectedRoute from 'src/components/ProtectedRoute';
import Error from 'src/components/Error';
import Error403 from 'src/components/Error403';

import medieval3 from 'src/assets/medieval3.jpg';

import './styles.css';

const App = (
  {
    fetchArticles,
    fetchEvents,
    fetchGames,
    events,
    articles,
    games,
    isLogged,
  },
) => {
/**
 * function that is performed once when the main page is displayed
 */
  useEffect(() => {
    fetchArticles();
    fetchEvents();
    fetchGames();
  }, []);
  return (
    <div className="app" style={{ background: `url(${medieval3})` }}>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route
          path="/articles/:id"
          render={({ match }) => {
            const { params: { id } } = match;
            const foundArticle = findIdBySlug(articles, id);
            return <OneArticle article={foundArticle} />;
          }}
        />
        <Route path="/connexion">
          <LoginForm />
        </Route>
        <Route path="/inscription">
          <SignInForm />
        </Route>
        <Route path="/les-gardiens">
          <Gardiens />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route
          path="/jeux/:id"
          render={({ match }) => {
            const { params: { id } } = match;
            const foundGame = findIdBySlug(games, id);
            return <OneGame game={foundGame} />;
          }}
        />
        <Route path="/jeux">
          <Games />
        </Route>
        <Route
          path="/evenements/:id"
          render={({ match }) => {
            const { params: { id } } = match;
            const foundEvent = findIdBySlug(events, id);
            return (
              <OneEvent event={foundEvent} />
            );
          }}
        />
        <Route path="/evenements">
          <Events />
        </Route>
        <ProtectedRoute path="/ajoutArticle" component={AddArticle} isLogged={isLogged} />
        <ProtectedRoute path="/profil" component={Profil} isLogged={isLogged} />
        <Route path="/RGPD">
          <RGPD />
        </Route>
        <Route path="/unauthorized">
          <Error403 />
        </Route>
        <Route>
          <Error />
        </Route>

      </Switch>
      <Footer />
    </div>

  );
};

App.propTypes = {
  fetchEvents: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  articles: PropTypes.array.isRequired,
  games: PropTypes.array.isRequired,
  isLogged: PropTypes.bool.isRequired,
};

export default App;
