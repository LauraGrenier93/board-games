/* eslint-disable linebreak-style */
//  Types of action
export const FETCH_GAMES = 'FETCH_GAMES';
export const SET_GAMES = 'SET_GAMES';

// creation of an action
/**
 * action that will request the games from the database
 */
export const fetchGames = () => ({
  type: FETCH_GAMES,
});

/**
 * action that displays the list of board games
 * @param {object} games
 * @returns
 */
export const setGames = (games) => ({
  type: SET_GAMES,
  games,
});
