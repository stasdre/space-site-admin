import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Space, Switch, Select } from 'antd';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { getAll } from '../../../api/work';
import { getAll as getAllCategories } from '../../../api/categories';
import {
  seviceCreateRequest,
  isSaved,
  serviceUpdateIsSaved,
} from '../../../modules/Service';
import ServiceForm from './ServiceForm';

const { Option } = Select;

const ServiceFormCreateContext = React.createContext();

const ServiceCreate = ({ seviceCreateRequest, isSaved, serviceUpdateIsSaved }) => {
  const [form] = Form.useForm();
  const [works, setWorks] = useState({});
  const [isLoadingWorks, setIsLoadingWorks] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isSaved === true) {
      history.push('/services');
      serviceUpdateIsSaved();
      return;
    }
    setIsLoadingWorks(true);
    setIsCategoriesLoading(true);
    getAll()
      .then(({ works }) => {
        setWorks(works);
        setIsLoadingWorks(false);
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
  }, [isSaved]);

  const handleSubmit = (values) => {
    seviceCreateRequest(values);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <ServiceFormCreateContext.Provider value={form}>
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
          <Form.Item
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
        </ServiceFormCreateContext.Provider>
      </Form>
    </>
  );
};

export { ServiceFormCreateContext };

export default connect(
  (state) => ({
    isSaved: isSaved(state),
  }),
  { seviceCreateRequest, serviceUpdateIsSaved }
)(ServiceCreate);
