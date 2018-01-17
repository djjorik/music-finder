import * as React from 'react';
import './App.css';
import Routes from './Routes/Routes'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './Store/configureStore';


const devTools =  window['__REDUX_DEVTOOLS_EXTENSION__'] && window['__REDUX_DEVTOOLS_EXTENSION__']();
const store  = configureStore(devTools);

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
