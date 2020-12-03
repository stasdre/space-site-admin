import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Table } from 'antd';
import { workGetAllRequest, isLoading, works } from '../../../modules/Work';

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
    render: (WorkType) => (WorkType ? WorkType.name : ''),
  },
  {
    title: 'Действия',
    dataIndex: 'address',
    key: 'address',
  },
];

const Works = ({ workGetAllRequest, isLoading, works }) => {
  useEffect(() => {
    workGetAllRequest();
  }, []);

  return (
    <>
      <Link to="/works/create">
        <Button type="primary" size="large">
          Новая работа
        </Button>
      </Link>
      <Table loading={isLoading} columns={columns} dataSource={works} />
    </>
  );
};

export default connect(
  (state) => ({
    isLoading: isLoading(state),
    works: works(state),
  }),
  { workGetAllRequest }
)(Works);
