import * as React from 'react';
import  { Route, Switch } from 'react-router';
import MainPage from '../Pages/MainPage/MainPage';
import YoutubePage from '../Pages/YoutubePage/YoutubePage';
import Playlist from './../Pages/Playlist/Playlist';

const routes: React.StatelessComponent<{}> = (props) => {
  return (
    <Switch>
    <Route exact path="/"  component={MainPage} />
    <Route exact path="/video"  component={YoutubePage} />
    <Route exact path="/playlist"  component={Playlist} />
    <Route render={() => <h1>Страница не найдена</h1>} />
    </Switch>
  );
};

export default routes;
