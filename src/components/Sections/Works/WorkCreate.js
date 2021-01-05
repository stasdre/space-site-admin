import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Space, Switch, Select } from 'antd';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { workCreateRequest, workUpdateIsSaved, isSaved } from '../../../modules/Work';
import WorkForm from './WorkForm';
import { getAll } from '../../../api/workTypes';

const { Option } = Select;

const WorkCreate = ({ workCreateRequest, isSaved, workUpdateIsSaved }) => {
  const [types, setTypes] = useState([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isSaved === true) {
      history.push('/works');
      workUpdateIsSaved();
      return;
    }

    setIsLoadingTypes(true);
    getAll()
      .then(({ data }) => {
        setIsLoadingTypes(false);
        setTypes(data);
      })
      .catch(() => {
        setIsLoadingTypes(false);
      });
  }, [isSaved]);

  const handleSubmit = (values) => {
    workCreateRequest(values);
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
              <Link to="/works">
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

export default connect((state) => ({ isSaved: isSaved(state) }), {
  workCreateRequest,
  workUpdateIsSaved,
})(WorkCreate);
