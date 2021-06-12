/* eslint-disable linebreak-style */
import { expect } from 'chai';
import gamesReducer, { initialState } from 'src/reducers/games';
import { setGames } from 'src/actions/games';

describe('reducer for games', () => {
  describe('structure', () => {
    it('must be a function', () => {
      expect(gamesReducer).to.a('function');
    });

    it('check initial state', () => {
      expect(initialState).to.be.an('object');
      expect(gamesReducer()).to.be.equal(initialState);
    });
  });
});

it('setGames must set games', () => {
  const newValueGames = [{
    id: 0,
    title: 'un titre de jeux de société',
    minAge: 8,
    duration: {
      hours: 1,
      minutes: 30,
    },
    quantity: 1,
    purchasedDate: 'une date de sortie',
    creator: 'un créateur',
    editor: 'un éditeur',
    description: 'une description',
    year: 2002,
    typeId: '5',
    min_player: 1,
    max_player: 10,
    game_type: 'base',
    game_categories: [''],
    preview: '',
  }];
  const action = setGames(newValueGames);
  const newState = gamesReducer(initialState, action);
  expect(newState).to.be.eql({ games: newValueGames, loadingGames: true });
});
