import React, { useState } from 'react';
import { InputNumber, Form } from 'antd';

import styles from './EditablePrice.module.css';

const EditablePrice = ({ price }) => {
  const [editing, setEditing] = useState(false);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const save = async (e) => {
    try {
      console.log('SAVE!!!');
      toggleEdit();
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
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

export default EditablePrice;
