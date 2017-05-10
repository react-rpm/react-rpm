import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ProfileContent from './ProfileContent';
import ProfileDataKeyList from './ProfileDataKeyList';

describe('<ProfileContent />', () => {

  it('should render a <ProfileDataKeyList /> component', () => {
    const wrapper = shallow(<ProfileContent />);
    expect(wrapper.find(ProfileDataKeyList)).to.have.length(1);
  });

});
