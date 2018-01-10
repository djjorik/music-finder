import * as React from 'react';
import './App.css';
import MainPage from './MainPage/MainPage';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
       <MainPage/>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
