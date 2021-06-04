import { expect, should } from 'chai';
import { findIdBySlug, randomArray, getHighestId, lastArray } from 'src/selectors';

should();


describe('selectors', () => {

  describe('findIdBySlug', () => {

    const dataValues = [
      {
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
      }, {
        id: 2,
        title: '',
        description: '',
        createdDate: '',
        updateDate: null,
        authorId: 2,
        authorPseudo: '',
        tagId: 1,
        tagName: '',
        preview: '',
      }];

    it('must be a function', () => {
      findIdBySlug.should.be.a('function');
    });

    it('must return a matching object', () => {
      findIdBySlug(dataValues, '1').should.be.an('object');
    });

    it('must return a undefined if not match', () => {

      expect(findIdBySlug(dataValues, 'notfound')).to.be.undefined;
    });

    it('must not throw if slug is undefined', () => {

      expect(() =>findIdBySlug(dataValues, undefined).to.not.throw());
    });
  });

  describe('randomArray', () => {

    const dataValues = [
      {
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
      }, {
        id: 2,
        title: '',
        description: '',
        createdDate: '',
        updateDate: null,
        authorId: 2,
        authorPseudo: '',
        tagId: 1,
        tagName: '',
        preview: '',
      },
      {
        id: 3,
        title: '',
        description: '',
        createdDate: '',
        updateDate: null,
        authorId: 2,
        authorPseudo: '',
        tagId: 1,
        tagName: '',
        preview: '',
      },
      {
        id: 4,
        title: '',
        description: '',
        createdDate: '',
        updateDate: null,
        authorId: 2,
        authorPseudo: '',
        tagId: 1,
        tagName: '',
        preview: '',
      }
    ];
    const arrayVoid = [];

    it('randomArray must be a function', () => {
      randomArray.should.be.a('function');
    });

    it('must return a matching array', () => {
      randomArray(dataValues).should.be.an('array');
    });

    it('must return a matching lenght array=3 ', () => {
      expect(randomArray(dataValues)).to.have.lengthOf(2);
    });

        it('must return a matching lenght array=0 ', () => {
          expect(() =>randomArray(arrayVoid).to.not.throw());
        });
  })

  describe('getHighestId', () => {

    const dataValues = [
      {
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
      }, {
        id: 2,
        title: '',
        description: '',
        createdDate: '',
        updateDate: null,
        authorId: 2,
        authorPseudo: '',
        tagId: 1,
        tagName: '',
        preview: '',
      }];
      const arrayVoid = [];

    it('getHighestId must be a function', () => {
      getHighestId.should.be.a('function');
    });

    it('getHighestId must return a matching number', () => {
      getHighestId(dataValues).should.be.an('number');
    });

    it('getHighestId must return a undefined if not match', () => {
      expect(() => getHighestId(arrayVoid)).to.not.throw();
    });
  });


describe('lastArray', () => {
  const dataValues = [
    {
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
    }, {
      id: 2,
      title: '',
      description: '',
      createdDate: '',
      updateDate: null,
      authorId: 2,
      authorPseudo: '',
      tagId: 1,
      tagName: '',
      preview: '',
    }];
    const arrayVoid = [];
  it('lastArray must be a function', () => {
    lastArray.should.be.a('function');
  });
  it('getHighestId must return a matching array', () => {
    lastArray(dataValues).should.be.an('array');
  });
  it('lastArray must return a undefined if not match', () => {
    expect(() => lastArray(arrayVoid)).to.not.throw();
  });
});


});
