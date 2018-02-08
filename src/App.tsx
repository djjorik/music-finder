import * as React from 'react';
import './App.css';
import UserPanel from'./UserPanel/UserPanel';
import Routes from './Routes/Routes';
import { Provider } from 'react-redux';
import configureStore from './Store/configureStore';
import { Router } from 'react-router-dom';
import  history  from './Routes/history'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const devTools =  window['__REDUX_DEVTOOLS_EXTENSION__'] 
&& window['__REDUX_DEVTOOLS_EXTENSION__']();
const store  = configureStore(devTools);

class App extends React.Component {
  render() {
      return (
        <MuiThemeProvider>
        <Router history={history} >
         <Provider store={store}>
          <div className="App">
            <UserPanel/>
             <Routes /> 
          </div>
          </Provider>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
