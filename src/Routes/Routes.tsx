import * as React from "react";
import {Route, Switch } from "react-router";
import SearchBlock from "../MainPage/SearchBlock/SearchBlock";
// import SongDetail from "../MainPage/SongDetail/SongDetail";

const routes: React.StatelessComponent<{}> = () => {
  return (
    <Switch>
    <Route exact path="/" component={SearchBlock} />
    <Route exact path="/video" component={SearchBlock} />
    <Route render={() => <h1>Страница не найдена</h1>} />
    </Switch>
  );
};

export default routes;
