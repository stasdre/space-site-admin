import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Space } from 'antd';
import ServiceLangs from './ServiceLangs';

const Services = () => {
  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        <Link to="/services/create">
          <Button type="primary" size="large">
            Create new
          </Button>
        </Link>
      </Space>
      <ServiceLangs />
    </>
  );
};

export default Services;
