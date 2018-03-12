import React from 'react';
import ReactDOM from 'react-dom';
import Content from '../components/VoterComponents/Content'

it('Content renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(Content.render, div);
    ReactDOM.unmountComponentAtNode(div);
  });