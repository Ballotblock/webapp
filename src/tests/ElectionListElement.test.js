import React from 'react';
import ReactDOM from 'react-dom';
import ElectionListElement from '../components/VoterComponents/ElectionListElement'

it('ElectionListElement renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElectionListElement />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  