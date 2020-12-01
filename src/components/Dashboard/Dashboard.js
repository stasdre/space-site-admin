import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ApartmentOutlined,
  CreditCardOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Reviews, Services, Works } from '../Sections';
import { ServiceCreate } from '../Sections/Services';

const { Header, Sider, Content, Footer } = Layout;

const Dashboard = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Sider>
      <div className="logo" style={{ height: '50px' }} />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<ApartmentOutlined />}>
          <Link to="/services">Услуги</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<CreditCardOutlined />}>
          <Link to="/works">Работы</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<SoundOutlined />}>
          <Link to="/reviews">Отзывы</Link>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout">
      <Header
        className="site-layout-sub-header-background"
        style={{ background: '#fff' }}
      >
        <MenuUnfoldOutlined />
      </Header>
      <Content style={{ margin: '24px 16px 0', background: '#fff' }}>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: '100%' }}
        >
          <Switch>
            <Route exact path="/services" component={Services} />
            <Route exact path="/services/create" component={ServiceCreate} />
            <Route exact path="/works" component={Works} />
            <Route exact path="/reviews" component={Reviews} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2020 Space-site</Footer>
    </Layout>
  </Layout>
);

export default Dashboard;
