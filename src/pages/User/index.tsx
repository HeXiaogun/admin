import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  ProTable,
  type ActionType,
  type ProColumns,
} from "@ant-design/pro-components";
import { Button, message, Modal, Space } from "antd";
import { useRef, useState } from "react";
import AddModalForm from "./components/AddModalForm";
import EditModalForm from "./components/EditModalForm";

// 格式化日期为 YYYY-MM-DD HH:mm:ss
const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 初始用户数据
const initialAddressData = [
  {
    id: "1",
    name: "张三",
    age: 25,
    gender: 1,
    phone: "13812345678",
    role: 1,
  },
  {
    id: "2",
    name: "李四",
    age: 30,
    gender: 2,
    phone: "13987654321",
    role: 2,

  },
  {
    id: "3",
    name: "王五",
    age: 28,
    gender: 1,
    phone: "13712349876",
    role: 1,
  
  },
];

const User = () => {
  const actionRef = useRef<ActionType>();
  const [userData, setUserData] = useState(initialAddressData);

  //表格的列
  const columns: ProColumns<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
      render: (gender: number) => (gender === 1 ? "男" : "女"),
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    { 
      title: "邮箱",
       dataIndex: "email",
        key: "email" 
      },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role: number) => (role === 1 ? "普通用户" : "管理员"),
    },
   
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 300,
      search: false,
      render: (_, record: any) => {
        return (
          <Space>
            <Button
              type={"primary"}
              danger
              onClick={() => handleDeAddress(record)}
            >
              删除
            </Button>
            <EditModalForm
              values={record}
              onSuccess={() => actionRef.current?.reload()}
            ></EditModalForm>
          </Space>
        );
      },
    },
  ];

  /**
   * 分页查询
   * @param params
   * @returns
   */
  const handlePage = async (params: Record<string, any>) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        data: userData,
        success: true,
        total: userData.length,
      };
    } catch (error: any) {
      message.error(error.msg);
      return {
        data: [],
        success: true,
        total: 0,
      };
    }
  };

  const handleDeAddress = async (item: any) => {
    Modal.confirm({
      title: "你真的要删除这条数据吗？",
      icon: <ExclamationCircleFilled />,
      onOk: async () => {
        try {
          setUserData((prev) => prev.filter((user) => user.id !== item.id));
          message.success("删除成功");
          actionRef.current?.reload();
        } catch (error: any) {
          message.error(error.msg);
        }
      },
    });
  };

  // 处理新增用户
  const handleAddUser = (values: any) => {
    const newUser = {
      ...values,
      id: (userData.length + 1).toString(),
      createTime: formatDate(new Date()),
      updateTime: formatDate(new Date()),
    };

    setUserData((prev) => [...prev, newUser]);
    message.success("用户添加成功");
    actionRef.current?.reload();
  };

  return (
    <div>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={handlePage}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 10,
          pageSizeOptions: [10, 20, 30, 50],
          showQuickJumper: true,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <AddModalForm key="add" onSuccess={handleAddUser} />,
        ]}
      />
    </div>
  );
};

export default User;
