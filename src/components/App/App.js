import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin, Layout } from 'antd';
import { Router } from '../Router';
import { Notification } from '../Notification';
import { content, type } from '../../modules/Notification';
import { isLoading, initRequest } from '../../modules/Initial';
// Add initial loading (Auth,languages,etc...)

const App = ({ content, type, isLoading, initRequest }) => {
  useEffect(() => {
    initRequest();
  }, []);

  return isLoading ? (
    <Layout style={{ minHeight: '100vh', justifyContent: 'center' }}>
      <Spin size="large" />
    </Layout>
  ) : (
    <>
      {content && type && <Notification content={content} type={type} />}
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Router />
      </BrowserRouter>
    </>
  );
};

export default connect(
  (state) => ({
    content: content(state),
    type: type(state),
    isLoading: isLoading(state),
  }),
  { initRequest }
)(App);
