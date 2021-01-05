import React, { lazy, Suspense } from 'react';
import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  ApartmentOutlined,
  CreditCardOutlined,
  SoundOutlined,
} from '@ant-design/icons';

const Reviews = lazy(() => import('../Sections/Reviews/Reviews'));

const Services = lazy(() => import('../Sections/Services/Services'));
const ServiceCreate = lazy(() => import('../Sections/Services/ServiceCreate'));
const ServiceEdit = lazy(() => import('../Sections/Services/ServiceEdit'));

const Works = lazy(() => import('../Sections/Works/Works'));
const WorkCreate = lazy(() => import('../Sections/Works/WorkCreate'));
const WorkEdit = lazy(() => import('../Sections/Works/WorkEdit'));

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
            <Suspense fallback={<div>Загрузка...</div>}>
              <Switch>
                <Route exact path="/services" component={Services} />
                <Route exact path="/services/create" component={ServiceCreate} />
                <Route exact path="/services/edit/:id" component={ServiceEdit} />

                <Route exact path="/works" component={Works} />
                <Route exact path="/works/create" component={WorkCreate} />
                <Route exact path="/works/edit/:id" component={WorkEdit} />

                <Route exact path="/reviews" component={Reviews} />
              </Switch>
            </Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2020 Space-site</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
