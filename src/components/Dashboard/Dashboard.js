import React from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  ApartmentOutlined,
  CreditCardOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { Reviews, Services, Works } from '../Sections';
import { ServiceCreate, ServiceEdit } from '../Sections/Services';
import { CreateWork } from '../Sections/Works';

const { Header, Sider, Content, Footer } = Layout;

const Dashboard = () => {
  const location = useLocation();
  const [, mainUrl] = location.pathname.split('/');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" style={{ height: '50px' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[mainUrl]}>
          <Menu.Item key="services" icon={<ApartmentOutlined />}>
            <Link to="/services">Услуги</Link>
          </Menu.Item>
          <Menu.Item key="works" icon={<CreditCardOutlined />}>
            <Link to="/works">Работы</Link>
          </Menu.Item>
          <Menu.Item key="reviews" icon={<SoundOutlined />}>
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
              <Route exact path="/services/edit/:id" component={ServiceEdit} />
              <Route exact path="/works/create" component={CreateWork} />
              <Route exact path="/works" component={Works} />
              <Route exact path="/reviews" component={Reviews} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2020 Space-site</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
