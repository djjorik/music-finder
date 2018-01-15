import * as React from "react";
import "./App.css";
import MainPage from "./MainPage/MainPage";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import userstate from './Reducers';

const store = createStore(userstate); 

class App extends React.Component {
  render() {
    return (
     
        <BrowserRouter>
         <Provider store={store}>
          <div className="App">
            <MainPage />
          </div>
          </Provider>
        </BrowserRouter>
      
    );
  }
}

export default App;
