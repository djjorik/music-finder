import TrackWrapper from '../MainPage/TracksWrapper/TrackWrapper';
import SongDetail from '../MainPage/SongDetail/SongDetail';
import * as React from 'react';
import {Route, Switch } from "react-router";

// import SongDetail from "../MainPage/SongDetail/SongDetail";

const routes: React.StatelessComponent<{}> = (props) => {
  return (
    <Switch>
    <Route exact path="/" {...props} component={TrackWrapper} />
    <Route exact path="/video" {...props} component={SongDetail} />
    <Route render={() => <h1>Страница не найдена</h1>} />
    </Switch>
  );
};

export default routes;
