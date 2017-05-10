import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import PerfItemList from './PerfItemList';
import PerfItem from './PerfItem';

describe('<PerfItemList />', () => {

  it('should render <PerfItem /> components', () => {
    const wrapper = shallow(<PerfItemList />);
    expect(wrapper.contains(PerfItem)).to.equal(true);
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <PerfItem onClick={onButtonClick} />,
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });

});
