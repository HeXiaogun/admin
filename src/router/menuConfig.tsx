import type { MenuProps } from "antd";
import { HomeOutlined } from "@ant-design/icons";
type MenuItem = Required<MenuProps>["items"][number];

/**
 * 导航菜单配置
 * @description 该菜单配置是给管理员使用的
 */
export const menuConfig: MenuItem[] = [
  {
    label: "用户管理",
    key: "/user",
    icon: <HomeOutlined />,
  },
];

/**
 * 普通用户菜单配置
 * @description 该菜单配置是给所有用户使用的
 */
export const commonUserMenu: MenuItem[] = [
  {
    label: "收货地址",
    key: "/address",
    icon: <HomeOutlined />,
  },
];
