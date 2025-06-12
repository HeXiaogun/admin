import React, { useState } from "react";
import { Form, Input, Button, Typography, message, Radio } from "antd";
import BottomWave from "../../components/SVGDecorations/BottomWave";
import TransactionBackground from "../../components/SVGDecorations/TransactionBackground";
import "./LoginPage.css";
import "../../components/SVGDecorations/TopWave.css";
import "../../components/SVGDecorations/BottomWave.css";
import { useNavigate } from "react-router-dom";
import useUserInfo from "@/hooks/useUserInfo";

const { Title, Paragraph } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      message.success("登录成功");
      // 登录成功后，存储 token 和用户信息
      sessionStorage.setItem("role", values.role);
      if (values.role === "admin") {
        // 如果是管理员,
        navigate("/address");
      } else {
        // 如果是普通用户,
        navigate("/address");
      }
      // 跳转到首页
    } catch (error) {
      message.error("登录失败，请检查用户名和密码");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        background: "#f5f5f5", // 更改为浅灰色背景，提升对比度
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden", // 确保背景图不会超出容器
      }}
    >
      {/* 背景图 */}
      <TransactionBackground />

      {/* 顶部波浪 */}
      {/* <TopWave /> */}

      {/* 登录表单 */}
      <div
        className="login-container"
        style={{
          position: "relative", // 确保登录框的定位
          zIndex: 2, // 提升登录框的层级，避免被背景覆盖
          background: "#ffffff", // 添加白色背景，突出登录框
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // 添加阴影效果
        }}
      >
        <Title level={2} className="login-title">
          后台管理系统
        </Title>
        <Paragraph className="login-description">
          欢迎使用后台管理系统，请登录以继续操作。确保您的用户名和密码正确无误。
        </Paragraph>
        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          className="login-form"
          initialValues={{
            phone: "18180788391",
            password: "123456",
          }}
        >
          <Form.Item name="phone" rules={[{ required: true, message: "请输入电话号码!" }]}>
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "请输入密码!" }]}>
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item name="role" initialValue={"user"}>
            <Radio.Group
              options={[
                { value: "user", label: "普通用户" },
                { value: "admin", label: "管理员" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-button"
              style={{ width: "100%" }} // 按钮宽度调整为 100%
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* 底部波浪 */}
      <BottomWave />
    </div>
  );
};

export default LoginPage;
