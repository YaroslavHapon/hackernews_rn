import React from 'react';
import { ActivityIndicator, View,
  Text, Linking  } from  'react-native';
import { shallow } from 'enzyme';
import sinon from 'sinon'
import Button from './../../../src/components/Button'
import HTMLView from 'react-native-htmlview';
import CommentContainer from './../../../src/containers/CommentContainer'
import Comment from './../../../src/components/Comment'

jest.mock('Linking', () => {
  return {
    openURL: jest.fn()
  }
});

const mockProps = {
  id: 1234,
  commentGet: {},
  fetchComment: sinon.spy(),
  key: 2
};

describe('Testing Comment component', () => {
  const wrapper = shallow(
    <Comment {...mockProps} />
  );

  it('should render correctly', () => {
    wrapper.setProps({ id: 5678 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the fetchComment function', () => {
    expect(wrapper.instance().props.fetchComment.calledOnce).toBe(true);
    expect(wrapper.instance().props.fetchComment.args[0][0]).toBe(1234);
  });

  it('should show ActivityIndicator, while request loading', () => {
    const wrapper = shallow(
      <Comment {...mockProps} commentGet= {{ 1234: { loading: true }} } />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(ActivityIndicator).length).toBe(1);
  });

  it('should show ActivityIndicator, when request fails', () => {
    const error = { message: 'Request error!' };
    const wrapper = shallow(
      <Comment {...mockProps} commentGet= {{ 1234: { error: error }}} />
    );
    expect(wrapper.find(View).props().children).toBe(error.message);
  });

  const data = {
    by: 'Jhon Doe',
    text: 'Some text',
    kids: [123, 345, 678]
  };

  it('should render with data', () => {
    const wrapperWithData = shallow(
      <Comment {...mockProps}
        commentGet={ { 1234: { data: data }}}
      />
    );
    expect(wrapperWithData).toMatchSnapshot();
  });

  it('should show the right data', () => {
    const wrapperWithData = shallow(
      <Comment {...mockProps}
        commentGet={ { 1234: { data: data }}}
      />
    );
    expect(wrapperWithData).toMatchSnapshot();
    expect(wrapperWithData.find(Text).nodes[0].props.children[1])
      .toBe(data.by);
  });

  it('should open the comment link in browser', () => {
    const wrapperWithData = shallow(
      <Comment {...mockProps}
        commentGet={ { 1234: { data: data }}}
      />
    );
    const openURlSpy = sinon.spy(Linking, 'openURL');
    wrapperWithData.find(HTMLView).props().onLinkPress();
    expect(openURlSpy.calledOnce).toBe(true);
  });

  it('should show the correct html', () => {
    const wrapperWithData = shallow(
      <Comment {...mockProps}
        commentGet={ { 1234: { data: data }}}
      />
    );
    expect(wrapperWithData.find(HTMLView).props().value)
      .toBe(data.text);
  });

  it('should change the component state', () => {
    const wrapperWithData = shallow(
      <Comment {...mockProps}
        commentGet={{ 1234: { data: data }}}
      />
    );
    wrapperWithData.find(Button).props().onPress();
    expect(wrapperWithData.state().showAnswers).toBe(true);
    expect(wrapperWithData.find(CommentContainer).length).toBe(data.kids.length);
  });
});
