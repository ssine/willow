import React from 'react';
import axios from 'axios'
import logo from './img/logo.svg';
import './css/App.scss';
import { api_uri } from './config';

class App extends React.Component {
  constructor(prop: any) {
    super(prop);
  }

  async componentDidMount() {
    let res = await axios.get(`${api_uri}university`, {
      params: {
        filter: `{"abbreviation": "NEU"}`
      }
    });
    console.log(res);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App;
