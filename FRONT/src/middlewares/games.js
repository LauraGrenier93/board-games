/* eslint-disable linebreak-style */
import { FETCH_GAMES, setGames } from 'src/actions/games';
import { setError, setLoading } from 'src/actions/user';
import axios from 'src/api';

export default (store) => (next) => async (action) => {
  switch (action.type) {
    case FETCH_GAMES: {
      try {
        const response = await axios.get('jeux');
        store.dispatch(setGames(response.data));
      }
      catch (error) {
        store.dispatch(setError('Suite à un problème technique, nous n\'avons pas pu afficher les jeux.', 'errorGames'));
      }
      finally {
        store.dispatch(setLoading(false, 'loadingGames'));
      }
      return next(action);
    }
    default:
      return next(action);
  }
};
