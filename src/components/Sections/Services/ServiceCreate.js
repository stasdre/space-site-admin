import React, { useEffect } from 'react';
import { Form, Button, Row, Col, Space } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { workGetAllRequest, isLoading, works } from '../../../modules/Work';
import ServiceForm from './ServiceForm';

const ServiceCreate = ({ isLoadingWorks, workGetAllRequest, works }) => {
  useEffect(() => {
    workGetAllRequest();
  }, []);

  const handleSubmit = (values) => {
    console.log('Data!!!', values);
    //seviceCreateRequest(values);
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
        <ServiceForm isLoadingWorks={isLoadingWorks} works={works} />
      </Form>
    </>
  );
};

export default connect(
  (state) => ({
    isLoadingWorks: isLoading(state),
    works: works(state),
  }),
  { workGetAllRequest }
)(ServiceCreate);
