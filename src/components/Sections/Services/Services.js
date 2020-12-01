import { Link } from 'react-router-dom';
import { Button } from 'antd';

const Services = () => (
  <Link to="/services/create">
    <Button type="primary" size="large">
      Create new
    </Button>
  </Link>
);

export default Services;
