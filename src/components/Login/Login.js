import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';
import { authRequest, isAuthorized, getErrors, isLoading } from '../../modules/Auth';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = ({ isAuthorized, isLoading, authRequest }) => {
  const handleSubmit = (values) => {
    authRequest({ email: values.email, password: values.password });
  };

  return isAuthorized ? (
    <Redirect to="/" />
  ) : (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={6}>
        <Form {...layout} name="basic" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                min: 8,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default connect(
  (state) => ({
    isAuthorized: isAuthorized(state),
    authError: getErrors(state),
    isLoading: isLoading(state),
  }),
  { authRequest }
)(Login);
