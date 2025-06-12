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

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const initialAddressData = [
  {
    id: "1",
    name: "张三",

    gender: 1,
    phone: "13812345678",
    email: "27468002156@qq.com",
    role: 1,
    createTime: "2023-01-01 00:00:00",
    updateTime: "2023-01-02 00:00:00",
  },
  {
    id: "2",
    name: "李四",

    gender: 2,
    phone: "13987654321",
    email: "27468002156@qq.com",
    role: 2,
    createTime: "2023-01-01 00:00:00",
    updateTime: "2023-01-02 00:00:00",
  },
  {
    id: "3",
    name: "王五",

    gender: 1,
    phone: "13712349876",
    email: "27468002156@qq.com",
    role: 1,
    createTime: "2023-01-01 00:00:00",
    updateTime: "2023-01-02 00:00:00",
  },
];

const User = () => {
  const actionRef = useRef<ActionType>();
  const [userData, setUserData] = useState(initialAddressData);

  const columns: ProColumns<any>[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      hideInSearch: true,
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
      // 添加搜索表单配置
      valueType: "select",
      valueEnum: {
        1: { text: "男" },
        2: { text: "女" },
      },
    },
    {
      title: "手机号",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (role: number) => (role === 1 ? "普通用户" : "管理员"),
      valueType: "select",
      valueEnum: {
        1: { text: "普通用户" },
        2: { text: "管理员" },
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      hideInSearch: true,
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      hideInSearch: true,
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      fixed: "right",
      width: 300,
      search: false,
      render: (_, record: any) => (
        <Space>
          <Button type={"primary"} danger onClick={() => handleDelUser(record)}>
            删除
          </Button>
          <EditModalForm
            values={record}
            onUpdate={handleUpdateUser}
            onSuccess={() => actionRef.current?.reload()}
          />
        </Space>
      ),
    },
  ];

  const handlePage = async (params: Record<string, any>) => {
    try {
      const { current = 1, pageSize = 10, ...searchParams } = params;

      let filteredData = [...userData];

      Object.keys(searchParams).forEach((key) => {
        const value = searchParams[key];
        if (value !== undefined && value !== null && value !== "") {
          filteredData = filteredData.filter((item) => {
            if (key === "gender" || key === "role") {
              return item[key] === Number(value);
            }
            const itemValue = String(item[key] || "").toLowerCase();
            return itemValue.includes(String(value).toLowerCase());
          });
        }
      });

      // 分页
      const startIndex = (current - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageData = filteredData.slice(startIndex, endIndex);

      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        data: pageData,
        success: true,
        total: filteredData.length,
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

  const handleDelUser = async (item: any) => {
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
  //修改用户
  const handleUpdateUser = (updatedUser: any) => {
    setUserData((prevData) =>
      prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
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
