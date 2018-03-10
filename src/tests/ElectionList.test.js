import React from 'react';
import ReactDOM from 'react-dom';
import ElectionList from '../components/VoterComponents/ElectionList'


it('ElectionList renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ElectionList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });