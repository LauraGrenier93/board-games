/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import { SET_GAMES } from 'src/actions/games';
import { SET_LOADING } from 'src/actions/user';

export const initialState = {
  games:
    [
      {
        id: 0,
        title: '',
        minAge: 0,
        duration: {
          hours: 0,
          minutes: 0,
        },
        quantity: 0,
        purchasedDate: '',
        creator: '',
        editor: '',
        description: '',
        year: 0,
        typeId: '',
        minPlayer: 0,
        maxPlayer: 0,
        gameType: '',
        gameCategories: ['cartes'],
        preview: '',
      },
    ],
  loadingGames: true,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_GAMES:
      return {
        ...state,
        games: action.games,
      };
    case SET_LOADING:
      return {
        ...state,
        [action.name]: action.boolean,
      };
    default:
      return state;
  }
};
