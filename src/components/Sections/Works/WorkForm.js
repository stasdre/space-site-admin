import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Upload, Tabs } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LangsTabs } from '../../LangsTabs';

const { TabPane } = Tabs;
const { TextArea } = Input;

const WorkForm = ({ lang }) => {
  const [imgPrev, setImgPrev] = useState('');
  // useEffect(() => {
  //   workTypesRequest();
  // }, []);

  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane forceRender={true} tab="Meta" key="1">
          <Form.Item
            name={[lang, 'meta_title']}
            label="Meta title"
            // rules={[{ required: true, message: 'Title обязателен' }]}
          >
            <Input placeholder="Meta title" />
          </Form.Item>
          <Form.Item
            name={[lang, 'meta_desc']}
            label="Meta description"
            //rules={[{ required: true, message: 'Description обязателен' }]}
          >
            <TextArea rows={4} placeholder="Meta description" />
          </Form.Item>
          <Form.Item
            name={[lang, 'h1']}
            label="Заголовок h1"
            // rules={[{ required: true, message: 'h1 обязателен' }]}
          >
            <Input placeholder="Заголовок h1" />
          </Form.Item>
        </TabPane>
        <TabPane forceRender={true} tab="Main" key="2">
          <Form.Item
            name={[lang, 'url']}
            label="Ссылка"
            rules={[{ required: true, message: 'Сссылка обязательна' }]}
          >
            <Input placeholder="Ссылка" />
          </Form.Item>
          <Form.Item
            name={[lang, 'name']}
            label="Название"
            rules={[{ required: true, message: 'Название обязательно' }]}
          >
            <Input placeholder="Название работы" />
          </Form.Item>
          <Form.Item
            name={[lang, 'description']}
            label="Задачи проекта"
            //rules={[{ required: true, message: 'Description обязателен' }]}
          >
            <TextArea rows={4} placeholder="Задачи проекта" />
          </Form.Item>
          <Form.Item name={[lang, 'prev_img']} label="Превью" valuePropName="">
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
          <Form.Item name={[lang, 'img']} label="Фото" valuePropName="">
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
        </TabPane>
      </Tabs>
    </>
  );
};

export default connect((state) => ({}), null)(LangsTabs(WorkForm));
