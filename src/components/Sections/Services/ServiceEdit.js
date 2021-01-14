import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Space, Switch, Spin, Select } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { showNotification } from '../../../modules/Notification';
import ServiceForm from './ServiceForm';
import { getById, update } from '../../../api/services';
import { getAll } from '../../../api/work';
import { getAll as getAllCategories } from '../../../api/categories';

const { Option } = Select;

const ServiceEdit = ({ showNotification }) => {
  const [works, setWorks] = useState({});
  const [isLoadingWorks, setIsLoadingWorks] = useState(false);

  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

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
    getAllCategories('ru')
      .then(({ data }) => {
        setCategories(data);
        setIsCategoriesLoading(false);
      })
      .catch(() => {
        setIsCategoriesLoading(false);
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
        <Form.Item
          valuePropName="value"
          wrapperCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          name="ServiceCategoryId"
          rules={[{ required: true, message: 'Выберите категорию' }]}
        >
          <Select loading={isCategoriesLoading} placeholder="Выбирите тип работы">
            {categories.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <ServiceForm isLoadingWorks={isLoadingWorks} works={works} />
      </Form>
    </>
  );
};

export default connect(null, { showNotification })(ServiceEdit);
