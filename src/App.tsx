import * as React from 'react';
import './App.css';
// import MainPage from './MainPage/MainPage';
import Routes from './Routes/Routes'
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import globalState from './Reducers/index';




/* eslint-disable no-underscore-dangle */
const store = createStore(globalState,
   window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']()); 
/* eslint-enable */
console.log(store);
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
