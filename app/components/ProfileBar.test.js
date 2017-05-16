import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ProfileBar from './ProfileBar';
import PerfItemList from './PerfItemList';

describe('<ProfileBar />', () => {

  it('should render a <PerfItemList /> component', () => {
    const wrapper = shallow(<ProfileBar />);
    expect(wrapper.find(PerfItemList)).to.have.length(1);
  });

});
