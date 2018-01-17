import * as React from 'react';
import './App.css';
import Routes from './Routes/Routes'
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Reducers/index';


/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer,
   window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()); 
/* eslint-enable */

class App extends React.Component {
  render() {
    return (
        <BrowserRouter>
         <Provider store={store}>
          <div className="App">
             <Routes /> 
             {/* <MainPage />  */}
          </div>
          </Provider>
        </BrowserRouter>
      
    );
  }
}

export default App;
