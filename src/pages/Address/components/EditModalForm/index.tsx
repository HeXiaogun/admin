import { Button, Form, Input, message } from "antd";
import { ModalForm } from "@ant-design/pro-components";

type Props = {
  onSuccess?: () => void;
};

const EditModalForm = (props: Props) => {
  const { onSuccess, values } = props;

  /**
   * 提交表单
   * @param values
   */
  const handleFinish = async (values: Record<string, any>) => {
    try {
      console.log("表单提交的值:", values); // 打印提交的表单值
      message.success("添加成功");
      onSuccess?.();
      return true;
    } catch (e: any) {
      message.error(e.msg || e.message);
    }
  };

  return (
    <ModalForm
      layout={"horizontal"}
      labelCol={{ span: 3 }}
      title="新增地址"
      trigger={<Button type="primary">新增地址</Button>}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={handleFinish}
      initialValues={values}
    >
      <Form.Item
        label="地址名称"
        name="addressName"
        rules={[{ required: true, message: "请填写地址名称，最大字符长度为50！", max: 50 }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="详细地址" name="detailedAddress" rules={[{ required: true, message: "请填写详细地址！" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="邮政编码"
        name="postalCode"
        rules={[{ required: true, message: "请填写正确的邮政编码！", pattern: /^[0-9]{6}$/ }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="联系人" name="contactPerson" rules={[{ required: true, message: "请填写联系人姓名！" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="联系电话"
        name="contactPhone"
        rules={[{ required: true, message: "请填写正确的联系电话！", pattern: /^1[3-9]\d{9}$/ }]}
      >
        <Input />
      </Form.Item>
    </ModalForm>
  );
};

export default EditModalForm;
