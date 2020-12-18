import React, { useState } from 'react';
import {
  Form,
  Tabs,
  Input,
  InputNumber,
  Button,
  Space,
  Switch,
  Transfer,
  Upload,
} from 'antd';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { LangsTabs } from '../../LangsTabs';
import 'react-quill/dist/quill.snow.css';

const { TabPane } = Tabs;
const { TextArea } = Input;

const ServiceForm = ({ works, lang }) => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [imgPrev, setImgPrev] = useState('');

  const handleChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const handleVideoPreviewChange = (file) => {
    console.log('File!', file);
    return;
  };

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Meta" key="1">
        <Form.Item
          name={[lang, 'meta_title']}
          label="Meta title"
          rules={[{ required: true, message: 'Title обязателен' }]}
        >
          <Input placeholder="Meta title" />
        </Form.Item>
        <Form.Item
          name={[lang, 'meta_desc']}
          label="Meta description"
          rules={[{ required: true, message: 'Description обязателен' }]}
        >
          <TextArea rows={4} placeholder="Meta description" />
        </Form.Item>
        <Form.Item
          name={[lang, 'h1']}
          label="Заголовок h1"
          rules={[{ required: true, message: 'h1 обязателен' }]}
        >
          <Input placeholder="Заголовок h1" />
        </Form.Item>
      </TabPane>
      <TabPane tab="Блок с видео" key="2">
        <Form.Item name={[lang, 'h2']} label="Заголовок h2">
          <Input placeholder="Заголовок h2" />
        </Form.Item>
        <Form.Item name={[lang, 'video_name']} label="Заголовок видео">
          <Input placeholder="Заголовок видео" />
        </Form.Item>
        <Form.Item name={[lang, 'video_prev']} label="Превью" valuePropName="">
          <Upload
            listType="picture-card"
            accept="image/jpeg,image/jpg,image/png"
            beforeUpload={false}
            showUploadList={false}
            // onChange={handleVideoPreviewChange}
          >
            {imgPrev ? (
              <img src={imgPrev} alt="avatar" style={{ width: '100%' }} />
            ) : (
              <PlusOutlined />
            )}
          </Upload>
        </Form.Item>
        <Form.Item name={[lang, 'video_url']} label="Ссылка на видео">
          <Input placeholder="Ссылка на видео" />
        </Form.Item>
        <Form.Item name={[lang, 'description']} label="Описание">
          <ReactQuill theme="snow" />
        </Form.Item>
      </TabPane>
      <TabPane tab="Main" key="3">
        <Form.Item name={[lang, 'active']} initialValue={true} valuePropName="checked">
          <Switch checkedChildren="Активна" unCheckedChildren="Не активна" />
        </Form.Item>
        <Form.Item name={[lang, 'main_title']} label="Заголовок">
          <Input placeholder="Заголовок" />
        </Form.Item>
        <Form.Item
          name={[lang, 'name']}
          label="Название"
          rules={[{ required: true, message: 'Название обязательно' }]}
        >
          <Input placeholder="Название услуги" />
        </Form.Item>
        <Form.Item
          name={[lang, 'url']}
          label="URL"
          rules={[{ required: true, message: 'URL обязателен' }]}
        >
          <Input placeholder="URL" />
        </Form.Item>
        <Form.Item label="Работы" name={[lang, 'works']}>
          <Transfer
            dataSource={works}
            render={(item) => item.title}
            oneWay
            targetKeys={targetKeys}
            //onChange={handleChange}
            titles={['Все работы', 'Привязанные']}
          />
        </Form.Item>
        <Form.Item label="Отзывы" name={[lang, 'reviews']}>
          <Transfer oneWay titles={['Все отзывы', 'Привязанные']} />
        </Form.Item>
      </TabPane>
      <TabPane tab="Описание" key="4">
        <Form.Item
          name={[lang, 'desc_hash']}
          label="Hash"
          rules={[{ required: true, message: 'Hash обязателен' }]}
        >
          <Input placeholder="Hash" prefix="#" />
        </Form.Item>
        <Form.Item
          name={[lang, 'desc']}
          label="Текст описания"
          rules={[{ required: true, message: 'Текст обязателен' }]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>
        <Form.List name={[lang, 'advantage']} label="">
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
                    wrapperCol={{ span: 24 }}
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
      <TabPane tab="Цены" key="5">
        <Form.Item
          name={[lang, 'price_hash']}
          label="Hash"
          rules={[{ required: true, message: 'Hash обязателен' }]}
        >
          <Input placeholder="Hash" prefix="#" />
        </Form.Item>
        <Form.List name={[lang, 'price']}>
          {(fields, { add, remove }) => {
            return (
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
                      rules={[{ required: true, message: 'Название обязательно' }]}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input placeholder="Название" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'from']}
                      fieldKey={[field.fieldKey, 'from']}
                      valuePropName="checked"
                    >
                      <Switch checkedChildren="От" unCheckedChildren="От" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'price']}
                      fieldKey={[field.fieldKey, 'price']}
                      rules={[{ required: true, message: 'Неверная цена' }]}
                      wrapperCol={{ span: 24 }}
                    >
                      <InputNumber placeholder="Цена" prefix="$" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, 'promo']}
                      fieldKey={[field.fieldKey, 'promo']}
                      wrapperCol={{ span: 24 }}
                    >
                      <Input placeholder="Промо" />
                    </Form.Item>

                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    disabled={fields.length === 3}
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Добавить цену
                  </Button>
                </Form.Item>
              </>
            );
          }}
        </Form.List>
      </TabPane>
      <TabPane tab="Подробнее" key="6">
        <Form.Item
          name={[lang, 'more_hash']}
          label="Hash"
          rules={[{ required: true, message: 'Hash обязателен' }]}
        >
          <Input placeholder="Hash" prefix="#" />
        </Form.Item>
        <Form.Item
          name={[lang, 'more']}
          label="Текст"
          rules={[{ required: true, message: 'Текст обязателен' }]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>
      </TabPane>
    </Tabs>
  );
};

export default connect(null, null)(LangsTabs(ServiceForm));
