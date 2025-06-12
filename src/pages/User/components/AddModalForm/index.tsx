// AddModalForm.tsx
import { Button, Form, Input, message, Radio } from "antd";
import { ModalForm } from "@ant-design/pro-components";

type Props = {
  onSuccess?: (values: any) => void;
};

const AddModalForm = (props: Props) => {
  const { onSuccess } = props;
  const [form] = Form.useForm();

  //手机号正则校验
  const validatorPhone = (_: any, data: string) => {
    if (!data) {
      return Promise.reject(new Error("手机号不能为空"));
    }
    const reg_tel = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
    if (!reg_tel.test(data)) {
      return Promise.reject(new Error("请输入正确的手机号"));
    }
    return Promise.resolve();
  };

  /**
   * 提交表单
   * @param values
   */
  const handleFinish = async (values: any) => {
    try {
      if (onSuccess) {
        onSuccess(values);
      }
      form.resetFields();
      return true;
    } catch (e: any) {
      message.error(e.msg || e.message);
      return false;
    }
  };

  return (
    <ModalForm
      form={form}
      layout={"horizontal"}
      labelCol={{ span: 3 }}
      title="新增用户"
      trigger={<Button type="primary">新增用户</Button>}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="名称"
        name="name"
        rules={[
          {
            required: true,
            message: "请正确填写名称,最大字符12!",
            type: "string",
            max: 12,
          },
        ]}
      >
        <Input />
      </Form.Item>

     

      <Form.Item label="性别" name="gender" rules={[{ required: true, message: "请选择你的性别！" }]}>
        <Radio.Group
          options={[
            { value: 1, label: "男" },
            { value: 2, label: "女" },
          ]}
        />
      </Form.Item>

      <Form.Item label="手机号" name="phone" rules={[{ required: true, validator: validatorPhone }]}>
        <Input />
      </Form.Item>
      <Form.Item label="角色" name="role" initialValue={1}>
        <Radio.Group
          options={[
            { value: 1, label: "普通用户" },
            { value: 2, label: "管理员" },
          ]}
        />
      </Form.Item>
    </ModalForm>
  );
};

export default AddModalForm;