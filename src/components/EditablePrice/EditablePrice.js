import React, { useState } from 'react';
import { connect } from 'react-redux';
import { InputNumber, Form, Spin } from 'antd';

import { priceUpdateRequest } from '../../modules/Price';
import styles from './EditablePrice.module.css';

const EditablePrice = ({ price, priceUpdateRequest }) => {
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = async (e) => {
    const newPrice = e.target.value;
    toggleEdit();
    priceUpdateRequest({ id: price.id, data: { price: newPrice } });
  };

  if (editing) {
    return (
      <Form
        initialValues={{
          price: price.price,
        }}
        onFinish={save}
      >
        <Form.Item
          name="price"
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Цена обязательна`,
            },
          ]}
        >
          <InputNumber prefix="$" onPressEnter={save} onBlur={save} />
        </Form.Item>
      </Form>
    );
  } else {
    return (
      <>
        <div className={styles.editable} onClick={toggleEdit}>
          {price.from === true && 'от '} $ {price.price}
        </div>
      </>
    );
  }
};

export default connect(null, {
  priceUpdateRequest,
})(EditablePrice);
