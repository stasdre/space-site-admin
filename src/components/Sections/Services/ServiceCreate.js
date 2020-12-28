import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Space, Switch } from 'antd';
import { connect, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { workGetAllRequest, isLoading, works } from '../../../modules/Work';
import {
  seviceCreateRequest,
  isSaved,
  serviceUpdateIsSaved,
} from '../../../modules/Service';
import ServiceForm from './ServiceForm';

const ServiceCreate = ({
  isLoadingWorks,
  workGetAllRequest,
  seviceCreateRequest,
  works,
  isSaved,
  serviceUpdateIsSaved,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (isSaved === true) {
      history.push('/services');
      serviceUpdateIsSaved();
      return;
    }
    workGetAllRequest();
  }, [isSaved]);

  const handleSubmit = (values) => {
    seviceCreateRequest(values);
  };

  return (
    <>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Row justify="end">
          <Col span={8}>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'flex-end' }}
            >
              <Link to="/services">
                <Button>Отменить</Button>
              </Link>
              <Button type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Space>
          </Col>
        </Row>
        <Form.Item name="active" initialValue={true} valuePropName="checked">
          <Switch checkedChildren="Активна" unCheckedChildren="Не активна" />
        </Form.Item>

        <ServiceForm isLoadingWorks={isLoadingWorks} works={works} />
      </Form>
    </>
  );
};

export default connect(
  (state) => ({
    isLoadingWorks: isLoading(state),
    works: works(state),
    isSaved: isSaved(state),
  }),
  { workGetAllRequest, seviceCreateRequest, serviceUpdateIsSaved }
)(ServiceCreate);
