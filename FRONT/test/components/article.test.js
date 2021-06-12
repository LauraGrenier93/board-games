/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ContentArticles from 'src/components/Articles/ContentArticles';
import CardArticle from 'src/components/Articles/CardArticle';

describe('<Article />', () => {
  describe('structure', () => {
    const elements = [{
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
    }];
    it('should input if Field does not exists', () => {
      const wrapper = shallow(<ContentArticles elements={elements} />);
      expect(wrapper.find(CardArticle)).to.have.lengthOf(1);
    });
  });
});
