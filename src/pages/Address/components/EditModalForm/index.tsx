import { Modal, Form, Input, message, Button } from "antd";
import { useState, useEffect } from "react";

interface Props {
  values: any;
  onSuccess: () => void;
  onSubmit: (values: any) => boolean;
}

const EditModalForm = ({ values, onSuccess, onSubmit }: Props) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && values) {
      form.setFieldsValue(values);
    }
  }, [visible, values, form]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const formValues = await form.validateFields();
      const success = onSubmit({ ...values, ...formValues });
      
      if (success) {
        message.success("更新成功");
        setVisible(false);
        onSuccess();
      }
    } catch (error) {
      message.error("更新失败，请检查输入");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        编辑
      </Button>
      
      <Modal
        title="编辑地址"
        open={visible}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" initialValues={values}>
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

export default EditModalForm;