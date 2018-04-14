import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './components/bulma.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

//import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

ReactDOM.render(<App />, document.getElementById('root'));

// ReactDOM.render((
//     <BrowserRouter>
//       <App/>
//     </BrowserRouter>
//   ), document.getElementById('root'))

registerServiceWorker();
