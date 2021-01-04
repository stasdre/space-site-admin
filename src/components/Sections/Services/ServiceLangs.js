import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Table, Space, Popconfirm, Drawer } from 'antd';

import { services, isLoading, seviceDeleteRequest } from '../../../modules/Service';
import { isLoading as priceIsLoading } from '../../../modules/Price';
import { LangsTabs } from '../../LangsTabs';
import { EditablePrice } from '../../EditablePrice';
import { PriceDrawer } from '../../PriceDrawer';

const renderPrice = (price) => {
  if (!price) return;
  return <EditablePrice price={price} />;
};

const ServiceLangs = ({
  lang,
  services,
  isLoading,
  priceIsLoading,
  seviceDeleteRequest,
}) => {
  const [selectedData, setSelectedData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (selectedRowKeys, selectedRows) => {
    setSelectedData(selectedRows);
  };

  const handleDelete = (id) => {
    seviceDeleteRequest(id);
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
            <Button type="link">Удалить</Button>
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
        scroll={{ x: 1420 }}
        rowKey={(record) => record.id}
        rowSelection={{ fixed: true, onChange: handleChange }}
        bordered
        dataSource={services[lang] || []}
        loading={isLoading || priceIsLoading}
      />
      <Drawer
        title="Обновление цен"
        width={720}
        visible={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <PriceDrawer
          lang={lang}
          selectedData={selectedData}
          setIsOpen={(p) => setIsOpen(p)}
        />
      </Drawer>
    </>
  );
};

export default connect(
  (state) => ({
    services: services(state),
    isLoading: isLoading(state),
    priceIsLoading: priceIsLoading(state),
  }),
  { seviceDeleteRequest }
)(LangsTabs(ServiceLangs));
