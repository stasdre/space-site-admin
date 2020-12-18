import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Space, Drawer, Form, Input } from 'antd';
import { TableRow } from '../../TableRow';
import { TableCell } from '../../TableCell';

const columns = [
  { title: 'Услуга', dataIndex: 'title', key: 'title' },
  { title: 'Цена 1', dataIndex: 'price_1', key: 'price_1', editable: true },
  { title: 'Цена 2', dataIndex: 'price_2', key: 'price_2', editable: true },
  { title: 'Цена 3', dataIndex: 'price_3', key: 'price_3', editable: true },
];

const servData = [
  {
    key: 1,
    title: 'Интернет магазин',
    price_1: '$ 1190',
    price_2: '$ 1510',
    price_3: '$ 1490',
  },
  {
    key: 2,
    title: 'Сайт визитка',
    price_1: '$ 992',
    price_2: '$ 1620',
    price_3: 'от $ 1892',
  },
  { key: 3, title: 'Сайт каталог', price_1: 'от $ 990', price_2: 'от $ 2990' },
  { key: 4, title: 'Сайт портал', price_1: 'от $ 4990', price_2: 'от $ 9990' },
  { key: 5, title: 'Промо', price_1: '$ 992', price_2: '$ 1620', price_3: 'от $ 1892' },
  {
    key: 6,
    title: 'Информационный сайт',
    price_1: '$ 992',
    price_2: '$ 1620',
    price_3: 'от $ 3922',
  },
  { key: 7, title: 'Верстка из Figma', price_1: 'от $ 200' },
  {
    key: 8,
    title: 'Редизайн сайта',
    price_1: '$ 990',
    price_2: 'от $ 1420',
    price_3: 'от $ 1950',
  },
];

const Services = () => {
  const [data, setData] = useState(servData);
  const [selectedData, setSelectedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (selectedRowKeys, selectedRows) => {
    setSelectedData(selectedRows);
  };

  const handleSave = (row) => {
    const id = row.key;
    setData(
      data.map((item) => {
        if (item.key !== id) return item;

        return row;
      })
    );
  };

  const handleSubmit = (values) => {
    setData(
      data.map((item) => {
        item.price_1 = values.price_1;
        item.price_2 = values.price_2;
        item.price_3 = values.price_3;

        return item;
      })
    );

    setIsOpen(false);
  };

  const cols = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Link to="/services/create">
          <Button type="primary" size="large">
            Create new
          </Button>
        </Link>
        <Button disabled={selectedData.length === 0} onClick={() => setIsOpen(true)}>
          Обновить цены
        </Button>
      </Space>
      <Table
        columns={cols}
        components={{
          body: {
            row: TableRow,
            cell: TableCell,
          },
        }}
        rowSelection={{ onChange: handleChange }}
        bordered
        dataSource={data}
      />
      <Drawer
        title="Обновление цен"
        width={720}
        visible={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name="price_1" label="Цена 1">
            <Input placeholder="Цена 1" />
          </Form.Item>
          <Form.Item name="price_2" label="Цена 2">
            <Input placeholder="Цена 2" />
          </Form.Item>
          <Form.Item name="price_3" label="Цена 3">
            <Input placeholder="Цена 3" />
          </Form.Item>
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => setIsOpen(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default Services;
