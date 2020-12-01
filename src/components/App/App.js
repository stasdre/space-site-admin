import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin, Layout } from 'antd';
import { Router } from '../Router';
import { Notification } from '../Notification';
import { content, type } from '../../modules/Notification';

const App = ({ content, type }) => {
  return false ? (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <Spin size="large" />
    </Layout>
  ) : (
    <>
      {content && type && <Notification content={content} type={type} />}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default connect(
  (state) => ({
    content: content(state),
    type: type(state),
  }),
  null
)(App);
