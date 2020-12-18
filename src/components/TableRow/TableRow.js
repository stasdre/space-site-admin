import React from 'react';
import { Form } from 'antd';

const EditableContext = React.createContext();

const TableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export { EditableContext };

export default TableRow;
