import React, { Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import {shallow, mount} from 'enzyme';
import Body from './body';


var body = mount(<Body api="http://3.18.110.2:3001/api" />);
describe('Search Test Case 02', () => {
    it('Test API is http://3.18.110.2:3001/api', () => {
        expect(body.props().api).toEqual("http://3.18.110.2:3001/api");
    });

    
});