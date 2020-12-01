import { useEffect } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import { clearNotification } from '../../modules/Notification';

const Notification = ({ content, duration = 2, type = 'info', clearNotification }) => {
  const config = {
    content,
    duration,
    onClose: () => {
      clearNotification();
    },
  };

  useEffect(() => {
    switch (type) {
      case 'success':
        message.success({ ...config });
        break;
      case 'error':
        message.error({ ...config });
        break;
      case 'warning':
        message.warning({ ...config });
        break;
      case 'loading':
        message.loading({ ...config });
        break;

      default:
        message.info({ ...config });
        break;
    }
  });
  return null;
};

export default connect(null, { clearNotification })(Notification);
