import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Space, Switch, Spin } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNotification } from '../../../modules/Notification';
import ServiceForm from './ServiceForm';
import { getById, update } from '../../../api/services';

const ServiceEdit = ({ showNotification }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    if (isSaved === true) {
      history.push('/services');
      return;
    }
    getById(id).then(({ service }) => {
      setService({ ...service });
      setIsLoading(false);
    });
  }, [isSaved]);

  const handleSubmit = (values) => {
    setIsLoading(true);
    update(id, values)
      .then(() => {
        setIsLoading(false);
        showNotification({
          type: 'success',
          content: 'Услуга обновлена :)',
        });
        history.push('/services');
      })
      .catch((data) => {
        setIsLoading(false);
        showNotification({
          type: 'error',
          content: data.message || 'Что-то пошло не так (:',
        });
      });
  };

  if (isLoading) return <Spin size="large" />;

  return (
    <>
      <Form
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        initialValues={service}
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
        <Form.Item name="active" valuePropName="checked">
          <Switch checkedChildren="Активна" unCheckedChildren="Не активна" />
        </Form.Item>

        <ServiceForm />
      </Form>
    </>
  );
};

export default connect(null, { showNotification })(ServiceEdit);
