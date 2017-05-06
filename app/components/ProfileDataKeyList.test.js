import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ProfileDataKeyList from './ProfileDataKeyList';
import ProfileDataKey from './ProfileDataKey';

describe('<ProfileDataKeyList />', () => {

  it('should render <ProfileDataKey /> components', () => {
    const wrapper = shallow(<ProfileDataKeyList />);
    expect(wrapper.contains(ProfileDataKey)).to.equal(true);
  });

});
