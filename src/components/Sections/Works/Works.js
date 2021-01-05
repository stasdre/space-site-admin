import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Space } from 'antd';
import { workGetAllRequest } from '../../../modules/Work';
import WorksList from './WorksList';

const Works = ({ workGetAllRequest }) => {
  useEffect(() => {
    workGetAllRequest();
  }, []);

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Link to="/works/create">
          <Button type="primary" size="large">
            Новая работа
          </Button>
        </Link>
      </Space>
      <WorksList />
    </>
  );
};

export default connect(null, { workGetAllRequest })(Works);
