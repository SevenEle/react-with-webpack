import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';

export default () => (
  <div>
    <Route path="/" render={() => <Redirect to="/list" />} exact />
    <Route path="/list" component={TopicList} />
    <Route path="/detail" component={TopicDetail} />
  </div>
);
