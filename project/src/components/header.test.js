import React, { Component } from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import {shallow, mount} from 'enzyme';
import Header from './header';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var header = mount(<Header api="http://3.18.110.2:3001/api" setContent={()=>{}}/>);
describe('Header Test Case', () => {
    it('Test API is http://3.18.110.2:3001/api', () => {
        expect(header.props().api).toEqual("http://3.18.110.2:3001/api");
    });

    it('Test search case one', () => {
        header.instance().login({username: "test02", password: "test02", interestsList: []});
        expect(cookies.get('users').username).toEqual("test02");
    });

    
});