import { ActivityIndicator, View, TouchableHighlight,
  Text, Linking  } from  'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon'
import Button from './../../../src/components/Button'
import Story from './../../../src/components/Story'

jest.mock('Linking', () => {
  return {
    openURL: jest.fn()
  }
});

const mockProps = {
  story: { item: 1234 },
  storyGet: {},
  fetchStory: sinon.spy()
};

describe('Testing Story component', () => {
  const wrapper = shallow(
    <Story {...mockProps} />
  );

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    wrapper.setProps({ story: { item: 5678 }});
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the fetchStory function', () => {
    expect(wrapper.instance().props.fetchStory.calledOnce).toBe(true);
    expect(wrapper.instance().props.fetchStory.args[0][0]).toBe(1234);
  });

  it('should show ActivityIndicator, while request loading', () => {
    const wrapper = shallow(
      <Story {...mockProps} storyGet= {{ 1234: { loading: true }} } />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ActivityIndicator).length).toBe(1);
  });

  it('should show ActivityIndicator, when request fails', () => {
    const error = { message: 'Request error!' };
    const wrapper = shallow(
      <Story {...mockProps} storyGet= {{ 1234: { error: error }}} />
    );
    expect(wrapper.find(View).props().children).toBe(error.message);
  });

  const data = {
    title: 'New story',
    by: 'Jhon Doe',
    score: 100,
    url: 'http://url'
  };

  it('should render with data', () => {
    const wrapperWithData = shallow(
      <Story {...mockProps}
        storyGet={ { 1234: { data: data }}}
      />
    );
    expect(wrapperWithData).toMatchSnapshot();
  });

  it('should navigate to comments, on touch', () => {
    const navigate = sinon.spy();
    const wrapperWithData = shallow(
      <Story {...mockProps}
        storyGet={ { 1234: { data: data }}}
        navigate={navigate}
      />
    );

    wrapperWithData.find(TouchableHighlight).props().onPress();
    expect(navigate.calledOnce).toBe(true);
  });

  it('should show the right data', () => {
    const wrapperWithData = shallow(
      <Story {...mockProps}
        storyGet={ { 1234: { data: data }}}
      />
    );
    expect(wrapperWithData).toMatchSnapshot();
    expect(wrapperWithData.find(Text).nodes[0].props.children)
      .toBe(data.title);
    expect(wrapperWithData.find(Text).nodes[1].props.children[1])
      .toBe(data.by);
    expect(wrapperWithData.find(Text).nodes[3].props.children[1])
      .toBe(data.score)
  });

  it('should open the story in browser', () => {
    const wrapperWithData = shallow(
      <Story {...mockProps}
        storyGet={ { 1234: { data: data }}}
      />
    );
    const openURlSpy = sinon.spy(Linking, 'openURL');
    wrapperWithData.find(Button).props().onPress();
    expect(openURlSpy.calledOnce).toBe(true);
  });
});
