/* eslint-disable linebreak-style */
import { expect } from 'chai';
import articlesReducer, { initialState } from 'src/reducers/articles';
import { setArticles, setFieldValueArticle, setAddNewArticle } from 'src/actions/articles';

describe('Test describe', () => {
  it('must true return true', () => {
    expect(true).to.be.equal(true);
  });
});

/**
 * function that checks the structure
 */
describe('reducer for articles', () => {
  describe('structure', () => {
    it('must be a function', () => {
      expect(articlesReducer).to.a('function');
    });

    it('check initial state', () => {
      expect(initialState).to.be.an('object');
      expect(articlesReducer()).to.be.equal(initialState);
    });
  });
});

/**
 * function that tests the actions of the reducers
 */
describe('actions', () => {
  it('setArticles must set articles', () => {
    const newValueArticles = [{
      id: 1,
      title: 'un titre',
      description: 'une description',
      createdDate: '',
      updateDate: null,
      authorId: 2,
      authorPseudo: '',
      tagId: '',
      tagName: 'News',
      preview: '',
    }];
    const action = setArticles(newValueArticles);
    const newState = articlesReducer(initialState, action);
    expect(newState).to.be.eql({
      articles: newValueArticles,
      editArticle: false,
      deleteArticle: false,
      newArticle: false,
      newTitle: '',
      newDescription: '',
      newArticleDate: '',
      newTagId: '',
      idArticle: '',
      loadingArticles: true,
    });
  });

  it('setAddNewArticle must set add new articles', () => {
    const newValueArticle = true;
    const action = setAddNewArticle(newValueArticle);
    const newState = articlesReducer(initialState, action);
    expect(newState).to.be.eql({
      articles: [{
        id: 1,
        title: '',
        description: '',
        createdDate: '',
        updateDate: null,
        authorId: 2,
        authorPseudo: '',
        tagId: 1,
        tagName: '',
        preview: '',
      }],
      editArticle: false,
      deleteArticle: false,
      newArticle: newValueArticle,
      newTitle: '',
      newDescription: '',
      newTagId: '',
      loadingArticles: true,
      newArticleDate: '',
      idArticle: '',
    });
  });

  it('setFieldValueArticle must set field value articles', () => {
    const titleValue = 'un titre';
    const titleName = 'newTitle';
    const action = setFieldValueArticle(titleValue, titleName);
    const newState = articlesReducer(initialState, action);
    expect(newState).to.be.eql({
      articles:
          [{
            id: 1,
            title: '',
            description: '',
            createdDate: '',
            updateDate: null,
            authorId: 2,
            authorPseudo: '',
            tagId: 1,
            tagName: '',
            preview: '',
          }],
      editArticle: false,
      deleteArticle: false,
      newArticle: false,
      newTitle: titleValue,
      newDescription: '',
      loadingArticles: true,
      newTagId: '',
      newArticleDate: '',
      idArticle: '',
    });
  });
});
