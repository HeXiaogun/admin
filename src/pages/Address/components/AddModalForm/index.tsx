import { Modal, Form, Input, message, Button } from "antd";
import { useState } from "react";

interface Props {
  onSuccess: () => void;
  onSubmit: (values: any) => boolean;
}

const AddModalForm = ({ onSuccess, onSubmit }: Props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();
      const success = onSubmit(values);
      
      if (success) {
        message.success("添加成功");
        setVisible(false);
        form.resetFields();
        onSuccess();
      }
    } catch (error) {
      message.error("添加失败，请检查输入");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        添加地址
      </Button>
      
      <Modal
        title="添加新地址"
        open={visible}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item 
            name="addressName" 
            label="地址名称" 
            rules={[{ required: true, message: '请输入地址名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="detailedAddress" 
            label="详细地址"
            rules={[{ required: true, message: '请输入详细地址' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item 
            name="postalCode" 
            label="邮政编码"
            rules={[{ required: true, message: '请输入邮政编码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="contactPerson" 
            label="联系人"
            rules={[{ required: true, message: '请输入联系人姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            name="contactPhone" 
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddModalForm;