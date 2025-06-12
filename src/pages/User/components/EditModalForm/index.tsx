import { Button, Form, Input, message, Radio } from "antd";
import { ModalForm } from "@ant-design/pro-components";


type Props = {
  values?: any;
  onSuccess?: () => void;
  onUpdate?: (updatedUser: any) => void; // 新增
};

const EditModalForm = (props: Props) => {
  const { values, onSuccess, onUpdate } = props;

  // 手机号验证
  const validatorPhone = (_: any, data: string) => {
    if (!data) {
      return Promise.reject(new Error("手机号不能为空"));
    }
    const reg_tel =
      /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
    if (!reg_tel.test(data)) {
      return Promise.reject(new Error("请输入正确的手机号"));
    }
    return Promise.resolve();
  };

  // 邮箱验证（修复）
  const validatorEmail = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error("邮箱不能为空"));
    }

    const reg_email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg_email.test(value)) {
      return Promise.reject(new Error("请输入正确的邮箱"));
    }
    return Promise.resolve(); // 必须返回成功
  };
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
  const handleFinish = async (formUserValues: any) => {
    try {
      const updatedUser = {
        ...values,
        ...formUserValues,
        updateTime: formatDate(new Date()) 
      };
      
      // 调用父组件更新函数
      if (onUpdate) {
        onUpdate(updatedUser);
      }
      
      message.success("修改成功");
      if (onSuccess) onSuccess();
      return true;
    } catch (e: any) {
      message.error(e.message || e.msg);
      return false;
    }
  };

  return (
    <ModalForm
      layout={"horizontal"}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      title="修改用户信息"
      trigger={<Button type="primary">修改</Button>}
      modalProps={{
        destroyOnClose: true,
      }}
      onFinish={handleFinish}
      initialValues={values}
    >
      <Form.Item label="ID" name="id">
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="名称"
        name="name"
        rules={[
          {
            required: true,
            message: "请正确填写名称,最大字符12!",
            type: "string",
            max: 24,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[{ required: true, validator: validatorEmail }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="性别"
        name="gender"
        rules={[{ required: true, message: "请选择性别！" }]}
      >
        <Radio.Group
          options={[
            { value: 1, label: "男" },
            { value: 2, label: "女" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="手机号"
        name="phone"
        rules={[{ required: true, validator: validatorPhone }]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item label="角色" name="role">
        <Radio.Group
          options={[
            { value: 1, label: "普通用户" },
            { value: 2, label: "管理员" },
          ]}
        />
      </Form.Item>

      <Form.Item label="创建时间" name="createTime">
        <Input disabled />
      </Form.Item>

      <Form.Item label="更新时间" name="updateTime">
        <Input disabled />
      </Form.Item>
    </ModalForm>
  );
};

export default EditModalForm;