import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Space, Input, InputNumber, Switch } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { priceMassUpdateRequest, isLoadingMass } from '../../modules/Price';

const PriceDrawer = ({
  setIsOpen,
  lang,
  selectedData,
  priceMassUpdateRequest,
  isLoadingMass,
}) => {
  const handleSubmit = ({ price }) => {
    const services = selectedData.map((item) => item.id);

    priceMassUpdateRequest({ lang, services, price });
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.List name="price">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey, 'title']}
                    // rules={[{ required: true, message: 'Название обязательно' }]}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input placeholder="Название" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'from']}
                    fieldKey={[field.fieldKey, 'from']}
                    valuePropName="checked"
                  >
                    <Switch checkedChildren="От" unCheckedChildren="От" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'price']}
                    fieldKey={[field.fieldKey, 'price']}
                    // rules={[{ required: true, message: 'Неверная цена' }]}
                    wrapperCol={{ span: 24 }}
                  >
                    <InputNumber placeholder="Цена" prefix="$" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'promo']}
                    fieldKey={[field.fieldKey, 'promo']}
                    wrapperCol={{ span: 24 }}
                  >
                    <Input placeholder="Промо" />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  disabled={fields.length === 3}
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                >
                  Добавить цену
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Button onClick={() => setIsOpen(false)} style={{ marginRight: 8 }}>
          Cancel
        </Button>
        <Button htmlType="submit" type="primary" loading={isLoadingMass}>
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default connect((state) => ({ isLoadingMass: isLoadingMass(state) }), {
  priceMassUpdateRequest,
})(PriceDrawer);
