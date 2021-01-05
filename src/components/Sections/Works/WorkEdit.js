import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Space, Switch, Spin, Select } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNotification } from '../../../modules/Notification';
import WorkForm from './WorkForm';
import { getById, update } from '../../../api/work';
import { getAll } from '../../../api/workTypes';

const { Option } = Select;

const WorkEdit = ({ showNotification }) => {
  const [types, setTypes] = useState([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [work, setWork] = useState({});
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setIsLoadingTypes(true);
    getAll()
      .then(({ data }) => {
        setIsLoadingTypes(false);
        setTypes(data);
        getById(id).then(({ work }) => {
          setWork({ ...work });
          setIsLoading(false);
        });
      })
      .catch(() => {
        setIsLoadingTypes(false);
      });
  }, []);

  const handleSubmit = (values) => {
    setIsSaved(true);
    update(id, values)
      .then(() => {
        setIsSaved(false);
        showNotification({
          type: 'success',
          content: 'Работа обновлена :)',
        });
        history.push('/works');
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
        initialValues={work}
      >
        <Row justify="end">
          <Col span={8}>
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'flex-end' }}
            >
              <Link to="/works">
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
        <Form.Item
          valuePropName="value"
          wrapperCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          name="WorkTypeId"
          rules={[{ required: true, message: 'Выберите тип' }]}
        >
          <Select loading={isLoadingTypes} placeholder="Выбирите тип работы">
            {types.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <WorkForm />
      </Form>
    </>
  );
};

export default connect(null, { showNotification })(WorkEdit);
