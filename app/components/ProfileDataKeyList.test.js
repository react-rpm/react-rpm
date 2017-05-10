import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import ProfileDataKeyList from './ProfileDataKeyList';
import ProfileDataKey from './ProfileDataKey';

describe('<ProfileDataKeyList />', () => {

  it('should render <ProfileDataKey /> components', () => {
    const wrapper = shallow(<ProfileDataKeyList />);
    expect(wrapper.contains(ProfileDataKey)).to.equal(true);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <ProfileDataKey onClick={onButtonClick} />,
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });

});
