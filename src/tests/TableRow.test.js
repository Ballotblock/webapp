import React from 'react';
import ReactDOM from 'react-dom';
import TableRow from '../components/VoterComponents/TableRow'

it('TableRow renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TableRow />, div);
    ReactDOM.unmountComponentAtNode(div);
  });