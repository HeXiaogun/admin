import { Button, Form, Input, message, Radio } from "antd";
import { ModalForm } from "@ant-design/pro-components";

type Props = {
  // 看这里,主要新增变动,values 表示我们回显的数据,数据由父组件传入
  values?: any;
  onSuccess?: () => void;
};

/**
 * 用户信息修改弹窗
 * @param props
 * @returns
 */
const EditModalForm = (props: Props) => {
  const { values, onSuccess } = props;

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

  //年龄校验
  const validatorAge = (_: any, data: string) => {
    if (!data) {
      return Promise.reject(new Error("年龄不能为空"));
    }
    const reg_age = /^(1[4-9]|[2-9]\d|1[01]\d|120)$/;
    if (!reg_age.test(data)) {
      return Promise.reject(new Error("请输入正确的年龄"));
    }
    return Promise.resolve();
  };

  /**
   * 提交表单
   * @param values
   */
  const handleFinish = async (formUserValues: any) => {
    try {
      const newUser = {
        ...values,
        ...formUserValues,
      };
      message.success("修改成功");
      onSuccess?.();
      return true;
    } catch (e: any) {
      message.error(e.message || e.msg);
    }
  };

  return (
    <>
      <ModalForm
        layout={"horizontal"}
        labelCol={{ span: 3 }}
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
          rules={[{ required: true, message: "请正确填写你的,最大字符12!", type: "string", max: 24 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="年龄" name="age" rules={[{ required: true, validator: validatorAge }]}>
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
    </>
  );
};

export default EditModalForm;
