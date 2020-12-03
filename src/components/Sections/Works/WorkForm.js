import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Switch, Input, Select, Upload, Button, Row, Col, message } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { workCreateRequest, isLoading } from '../../../modules/Work';
import {
  workTypesRequest,
  isLoading as typesIsLoading,
  types,
} from '../../../modules/WorkTypes';

const { Option } = Select;

const WorkForm = ({
  isLoading,
  workCreateRequest,
  workTypesRequest,
  typesIsLoading,
  types,
}) => {
  const [images, setImage] = useState([]);

  useEffect(() => {
    workTypesRequest();
  }, []);

  const handleSubmit = (values) => {
    workCreateRequest(values);
  };

  return (
    <>
      <Form onFinish={handleSubmit} initialValues={{ active: true }}>
        <Row justify="end">
          <Col span={8} push={4}>
            <Link to="/works">
              <Button>Отменить</Button>
            </Link>
            <Button type="primary" loading={isLoading} htmlType="submit">
              Сохранить
            </Button>
          </Col>
        </Row>
        <Form.Item name="active">
          <Switch
            checkedChildren="Активна"
            unCheckedChildren="Не активна"
            defaultChecked
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Название обязательно' }]}
        >
          <Input placeholder="Название работы" />
        </Form.Item>
        <Form.Item
          wrapperCol={{ xs: { span: 24 }, sm: { span: 8 } }}
          name="WorkTypeId"
          rules={[{ required: true, message: 'Выберите тип' }]}
        >
          <Select loading={typesIsLoading} placeholder="Выбирите тип работы">
            {types.map((type) => (
              <Option key={type.id} value={type.id}>
                {type.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="images" rules={[{ required: true, message: 'Загрузите фото' }]}>
          <Upload
            accept="image/jpeg,image/jpg,image/png"
            action="/works/upload"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Выбрать фото</Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};

export default connect(
  (state) => ({
    isLoading: isLoading(state),
    typesIsLoading: typesIsLoading(state),
    types: types(state),
  }),
  { workCreateRequest, workTypesRequest }
)(WorkForm);
