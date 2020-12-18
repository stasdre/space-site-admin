import React, { useState } from 'react';
import { Table, Space, Drawer, Button, Transfer } from 'antd';
import { AppstoreAddOutlined, EditOutlined, UnlockOutlined } from '@ant-design/icons';

const data = [
  { key: 1, name: 'Старт', price: '$ 992' },
  { key: 2, name: 'Стандарт', price: '$ 1620' },
  { key: 3, name: 'Свой', price: 'от $ 1800' },
  { key: 4, name: 'Уникальный', price: '$ 3922' },
];

const workList = [
  { key: 1, title: 'Интернет-магазин' },
  { key: 2, title: 'Сайт визитка' },
  { key: 3, title: 'Сайт каталог' },
  { key: 4, title: 'Информационный сайт' },
  { key: 5, title: 'Кулинарный сайт' },
];

const expandedRowRender = () => {
  const columns = [
    { title: 'Название услуги', dataIndex: 'name', key: 'name' },
    {
      title: 'Действия',
      key: 'operation',
      render: () => (
        <Space size="middle">
          <Button icon={<EditOutlined />}>Редактировать</Button>
          <Button icon={<UnlockOutlined />}>Отвязать от цены</Button>
        </Space>
      ),
    },
  ];

  const data = [
    { key: 1, name: 'Интернет-магазин' },
    { key: 2, name: 'Сайт визитка' },
    { key: 3, name: 'Сайт каталог' },
  ];

  return <Table columns={columns} dataSource={data} />;
};

const Prices = () => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [targetKeys, setTargetKeys] = useState([4, 5]);

  const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const columns = [
    { title: 'Название', dataIndex: 'name', key: 'name' },
    { title: 'Цена', dataIndex: 'price', key: 'price' },
    {
      title: 'Действия',
      key: 'operation',
      render: () => (
        <Space size="middle">
          <Button
            icon={<AppstoreAddOutlined />}
            type="primary"
            onClick={() => setIsDrawer(true)}
          >
            Привязать услугу
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} expandable={{ expandedRowRender }} dataSource={data} />
      <Drawer
        title="Привязать услуги"
        width={720}
        visible={isDrawer}
        onClose={() => setIsDrawer(false)}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => setIsDrawer(false)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button type="primary">Submit</Button>
          </div>
        }
      >
        <Transfer
          dataSource={workList}
          render={(item) => item.title}
          oneWay
          pagination
          showSearch
          listStyle={{
            width: 300,
            height: 300,
          }}
          targetKeys={targetKeys}
          onChange={handleChange}
          titles={['Все работы', 'Привязанные']}
        />
      </Drawer>
    </>
  );
};

export default Prices;
