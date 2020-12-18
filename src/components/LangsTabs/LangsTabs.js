import { connect } from 'react-redux';
import { Tabs } from 'antd';
import { langs } from '../../modules/Lang';
import styles from './LangsTabs.module.css';

const { TabPane } = Tabs;

const LangsTabs = (Component) => {
  const HOC = ({ langs, ...props }) => (
    <Tabs defaultActiveKey="1" type="card">
      {langs.map((lang) => (
        <TabPane
          tab={
            <span className={`${styles.langs} ${styles[lang.code]}`}>{lang.name}</span>
          }
          key={lang.id}
        >
          <Component {...props} lang={lang.code} />
        </TabPane>
      ))}
    </Tabs>
  );

  return connect(
    (state) => ({
      langs: langs(state),
    }),
    {}
  )(HOC);
};

export default LangsTabs;
