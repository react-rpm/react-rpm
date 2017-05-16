import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';

describe('<ProfileDataKey />', () => {

  it('rendered a button', () => {
    const wrapper = render(<button />);
    expect(wrapper.find('button')).to.have.length(1);
  });

});
