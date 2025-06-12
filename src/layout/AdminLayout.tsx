import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import type { MenuProps } from "antd";
import { Button, ConfigProvider, Flex, Layout, Menu, message, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { commonUserMenu, menuConfig } from "../router/menuConfig";
import zhCN from "antd/locale/zh_CN";
// for date-picker i18n
import "dayjs/locale/zh-cn";
const { Header, Content, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const AdminLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const defaultSelectedKeys = [window.location.pathname];

  const [menu, setMenu] = useState<any[]>([]);

  // 获取当前角色的菜单
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (!role) {
      navigate("/login");
    }
    if (role === "admin") {
      // 如果是管理员, 则显示管理员菜单
      setMenu([...menuConfig, ...commonUserMenu]);
    } else {
      // 如果是普通用户, 则只显示普通用户菜单
      setMenu([...commonUserMenu]);
    }
  }, []);

  // 判断角色权限
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    // 如果是普通用户
    const isUser = role === "user";
    if (!isUser) return;
    // 判断当前路径是否 是普通用户路由下的路径
    const hasPre = menuConfig.some((item) => location.pathname.startsWith(item.key as any));
    if (hasPre) {
      // 如果不是普通用户路由下的路径, 则跳转到首页
      message.error("没有权限访问该页面");
      navigate("/404");
    }
  }, [location.pathname]);

  const logout = async () => {
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  /**
   *  菜单点击事件
   * @param menu
   */
  const handleMenuClick: MenuProps["onClick"] = (menu) => {
    // 因为菜单可能是多层嵌套的, 所以我们只取最后一层的key
    navigate(menu.keyPath[menu.keyPath.length - 1]);
  };
  // 100vh -8px - 64px -24px
  return (
    <Layout hasSider>
      <Sider style={siderStyle}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          items={menu}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Flex justify="end" align="center" style={{ marginRight: "100px", height: "100%" }}>
            <Button type={"link"} onClick={logout}>
              退出登录
            </Button>
          </Flex>
        </Header>
        <Content className={styles.content}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ConfigProvider locale={zhCN}>
              <Outlet />
            </ConfigProvider>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
