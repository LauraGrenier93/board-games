import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Field from 'src/components/Field';

describe('<Field />', () => {
  const recipe = { id: 1 };

  describe('structure', () => {
    it('should input if Field does not exists', () => {
      const wrapper = shallow(<Field name="firstName"
      placeholder="Prénom"/>)
      expect(wrapper.find('div')).to.have.lengthOf(1);
      expect(wrapper.find('input')).to.have.lengthOf(1);
    });
  });
});
