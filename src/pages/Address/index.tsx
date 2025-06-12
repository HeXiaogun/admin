import { ExclamationCircleFilled } from "@ant-design/icons";
import { ProTable, type ActionType, type ProColumns } from "@ant-design/pro-components";
import { Button, message, Modal, Space } from "antd";
import { useRef } from "react";
import styles from "./index.module.less";
import BaseButton from "@/components/BaseButton";
import { addressData } from "./mock";
import AddModalForm from "./components/AddModalForm";
import EditModalForm from "./components/EditModalForm";
// 收获地址
const Address = () => {
  const actionRef = useRef<ActionType>();
  //表格的列
  const columns: ProColumns<any>[] = [
    {
      title: "用户id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "地址名称",
      dataIndex: "addressName",
      key: "addressName",
      search: false,
    },
    {
      title: "详细地址",
      dataIndex: "detailedAddress",
      key: "detailedAddress",
      search: false,
    },
    {
      title: "邮政编码",
      dataIndex: "postalCode",
      key: "postalCode",
      search: false,
    },
    {
      title: "联系人",
      dataIndex: "contactPerson",
      key: "contactPerson",
      search: false,
    },
    {
      title: "联系电话",
      dataIndex: "contactPhone",
      key: "contactPhone",
      search: false,
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
            <Button type={"primary"} danger onClick={() => handleDeAddress(record)}>
              删除
            </Button>
            <EditModalForm values={record} onSuccess={() => actionRef.current?.reload()}></EditModalForm>
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
      const data = [...addressData];
      return {
        data: data,
        success: true,
        total: data.length,
      };
    } catch (error: any) {
      // 如果接口为其他状态码 ！=200 就会出错，用catch 抓住
      message.error(error.msg);
      return {
        data: [],
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: true,
        // 不传会使用 data 的长度，如果是分页一定要传
        total: 0,
      };
    }
  };

  const handleDeAddress = async (item) => {
    Modal.confirm({
      title: "你真的要删除这条数据吗？",
      icon: <ExclamationCircleFilled />,
      // content: 'Some descriptions',
      onOk: async () => {
        // 点击确认按钮的事件
        try {
          // 如果没有报错表示删除成功
          // 更新表格的数据
          message.success("删除成功");
          actionRef.current?.reload();
        } catch (error: any) {
          // 如果接口为其他状态码 ！=200 就会出错，用catch 抓住
          message.error(error.msg);
        }
      },
    });
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
        toolBarRender={() => [<AddModalForm onSuccess={() => actionRef.current?.reload()} />]}
      />
    </div>
  );
};

export default Address;
