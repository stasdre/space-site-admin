import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table, Space, Drawer, Form, Input, Popconfirm } from 'antd';
import { LangsTabs } from '../../LangsTabs';
import { EditablePrice } from '../../EditablePrice';
import { getAll, deleteService } from '../../../api/services';

const renderPrice = (price) => {
  if (!price) return;
  return <EditablePrice price={price} />;
};

const ServiceLangs = ({ lang }) => {
  const [data, setData] = useState();
  const [selectedData, setSelectedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAll(lang).then(({ services }) => {
      setData(services);
      setIsLoading(false);
    });
  }, []);

  const handleChange = (selectedRowKeys, selectedRows) => {
    setSelectedData(selectedRows);
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

  const handleDelete = (id) => {
    console.log('Delete!!!', id);
    setIsLoading(true);
    deleteService(id)
      .then(() => {
        setData(data.filter((item) => item.id !== id && item));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const columns = [
    {
      title: 'Услуга',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена 1',
      dataIndex: 'column_1',
      key: 'column_1',
      render: renderPrice,
    },
    {
      title: 'Цена 2',
      dataIndex: 'column_2',
      key: 'column_2',
      render: renderPrice,
    },
    {
      title: 'Цена 3',
      dataIndex: 'column_3',
      key: 'column_3',
      render: renderPrice,
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data) => {
        const time = new Date(data);
        return time.toLocaleString('ru-RU');
      },
    },
    {
      title: 'Дата изменения',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (data) => {
        const time = new Date(data);
        return time.toLocaleString('ru-RU');
      },
    },
    {
      title: 'Активна',
      dataIndex: 'active',
      key: 'active',
      fixed: 'right',
    },
    {
      title: 'Действия',
      key: 'operation',
      fixed: 'right',
      render: (service) => (
        <Space size="middle">
          <Link to={`/services/edit/${service.id}`}>Изменить</Link>
          <Popconfirm
            title="Уверены что хотите удалить?"
            onConfirm={() => handleDelete(service.id)}
          >
            <a>Удалить</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Button disabled={selectedData.length === 0} onClick={() => setIsOpen(true)}>
          Обновить цены
        </Button>
      </Space>
      <Table
        columns={columns}
        scroll={{ x: 1350 }}
        rowKey={(record) => record.id}
        rowSelection={{ fixed: true, onChange: handleChange }}
        bordered
        dataSource={data}
        loading={isLoading}
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

export default LangsTabs(ServiceLangs);
