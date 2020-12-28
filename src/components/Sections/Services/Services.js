import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Space } from 'antd';

import { seviceGetAllRequest } from '../../../modules/Service';
import ServiceLangs from './ServiceLangs';

const Services = ({ seviceGetAllRequest }) => {
  useEffect(() => {
    seviceGetAllRequest();
  }, []);

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

export default connect(null, { seviceGetAllRequest })(Services);
