import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Space, Switch, Spin } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNotification } from '../../../modules/Notification';
import ServiceForm from './ServiceForm';
import { getById, update } from '../../../api/services';
import { getAll } from '../../../api/work';

const ServiceEdit = ({ showNotification }) => {
  const [works, setWorks] = useState({});
  const [isLoadingWorks, setIsLoadingWorks] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [service, setService] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setIsLoadingWorks(true);
    getAll()
      .then(({ works }) => {
        setWorks(works);
        setIsLoadingWorks(false);
        getById(id).then(({ service }) => {
          setService({ ...service });
          setIsLoading(false);
        });
      })
      .catch(() => {
        setIsLoadingWorks(false);
      });
  }, []);

  const handleSubmit = (values) => {
    setIsSaved(true);
    update(id, values)
      .then(() => {
        setIsSaved(false);
        showNotification({
          type: 'success',
          content: 'Услуга обновлена :)',
        });
        history.push('/services');
      })
      .catch((data) => {
        setIsSaved(false);
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
              <Button loading={isSaved} type="primary" htmlType="submit">
                Сохранить
              </Button>
            </Space>
          </Col>
        </Row>
        <Form.Item name="active" valuePropName="checked">
          <Switch checkedChildren="Активна" unCheckedChildren="Не активна" />
        </Form.Item>

        <ServiceForm isLoadingWorks={isLoadingWorks} works={works} />
      </Form>
    </>
  );
};

export default connect(null, { showNotification })(ServiceEdit);
