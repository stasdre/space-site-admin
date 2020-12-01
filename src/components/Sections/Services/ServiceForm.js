import { Form, Tabs, Input, Button, Space, Switch, Transfer } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TabPane } = Tabs;
const operations = (
  <>
    <Link to="/services">
      <Button>Отменить</Button>
    </Link>
    <Button type="primary" htmlType="submit">
      Сохранить
    </Button>
  </>
);

const handleSubmit = (values) => {
  console.log('SUBMIT!!!', values);
};

const ServiceForm = () => (
  <Form initialValues={{ isActive: true }} onFinish={handleSubmit}>
    <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
      <TabPane tab="Main" key="1">
        <Form.Item name="isActive">
          <Switch
            checkedChildren="Активна"
            unCheckedChildren="Не активна"
            defaultChecked
          />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Название обязательно' }]}
        >
          <Input placeholder="Название услуги" />
        </Form.Item>
        <Form.Item name="works">
          <Transfer titles={['Все работы', 'Привязанные']} />
        </Form.Item>
        <Form.Item name="reviews">
          <Transfer titles={['Все отзывы', 'Привязанные']} />
        </Form.Item>
      </TabPane>
      <TabPane tab="Описание" key="2">
        <Form.Item name="desc">
          <ReactQuill theme="snow" />
        </Form.Item>
        <Form.List name="advantage">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey, 'title']}
                    style={{ width: '300px' }}
                  >
                    <Input placeholder="Название" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Добавить преимущества
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </TabPane>
      <TabPane tab="Стоимость" key="3">
        <Form.List name="prices">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...field}
                    name={[field.name, 'title']}
                    fieldKey={[field.fieldKey, 'title']}
                    rules={[{ required: true, message: 'Заголовок обязателен' }]}
                  >
                    <Input placeholder="Заголовок" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'price']}
                    fieldKey={[field.fieldKey, 'price']}
                    rules={[{ required: true, message: 'Цена обязательна' }]}
                  >
                    <Input placeholder="Цена" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'additional']}
                    fieldKey={[field.fieldKey, 'additional']}
                  >
                    <Input placeholder="Дополнительно" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                  Добавить тарифный план
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </TabPane>
      <TabPane tab="Подробнее" key="4">
        <Form.Item name="more">
          <ReactQuill theme="snow" />
        </Form.Item>
      </TabPane>
    </Tabs>
  </Form>
);

export default ServiceForm;
