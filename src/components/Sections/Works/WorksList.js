import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Table, Space, Popconfirm } from 'antd';

import { works, isLoading, workDeleteRequest } from '../../../modules/Work';
import { LangsTabs } from '../../LangsTabs';

const WorksList = ({ lang, works, isLoading, workDeleteRequest }) => {
  const handleDelete = (id) => {
    workDeleteRequest(id);
  };

  const columns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Тип',
      dataIndex: 'WorkType',
      key: 'WorkType',
    },
    {
      title: 'Действия',
      key: 'operation',
      fixed: 'right',
      render: (work) => (
        <Space size="middle">
          <Link to={`/works/edit/${work.id}`}>Изменить</Link>
          <Popconfirm
            title="Уверены что хотите удалить?"
            onConfirm={() => handleDelete(work.id)}
          >
            <Button type="link">Удалить</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        bordered
        dataSource={works[lang] || []}
        loading={isLoading}
      />
    </>
  );
};

export default connect(
  (state) => ({
    works: works(state),
    isLoading: isLoading(state),
  }),
  { workDeleteRequest }
)(LangsTabs(WorksList));
