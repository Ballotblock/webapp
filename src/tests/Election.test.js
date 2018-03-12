import React from 'react';
import ReactDOM from 'react-dom';
import Election from '../components/VoterComponents/Election'

it('Election renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Election />, div);
    ReactDOM.unmountComponentAtNode(div);
  });