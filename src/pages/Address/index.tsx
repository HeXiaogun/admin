import { ExclamationCircleFilled } from "@ant-design/icons";
import { ProTable, type ActionType, type ProColumns } from "@ant-design/pro-components";
import { Button, message, Modal, Space } from "antd";
import { useRef, useState, useEffect } from "react";
import { addressData } from "./mock";
import AddModalForm from "./components/AddModalForm";
import EditModalForm from "./components/EditModalForm";

// Define the Address type
type Address = {
  id: number;
  addressName: string;
  detailedAddress: string;
  postalCode: string;
  contactPerson: string;
  contactPhone: string;
};

// 收获地址
const Address = () => {
  const actionRef = useRef<ActionType>();
  const [data, setData] = useState<Address[]>([]);
  const [filteredData, setFilteredData] = useState<Address[]>([]);
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  
  useEffect(() => {
    // Initialize with mock data
    setData(addressData);
    setFilteredData(addressData);
  }, []);

  // Create helper functions for data operations
  const addAddress = (newAddress: Omit<Address, 'id'>) => {
    const id = data.length > 0 ? Math.max(...data.map(item => item.id)) + 1 : 1;
    const updatedData = [...data, { ...newAddress, id }];
    setData(updatedData);
    handleSearch(searchParams, updatedData);
    return true;
  };
  
  const editAddress = (updatedAddress: Address) => {
    const updatedData = data.map(item => item.id === updatedAddress.id ? updatedAddress : item);
    setData(updatedData);
    handleSearch(searchParams, updatedData);
    return true;
  };
  
  const deleteAddress = (id: number) => {
    const updatedData = data.filter(item => item.id !== id);
    setData(updatedData);
    handleSearch(searchParams, updatedData);
  };
  
  /**
   * Handle search functionality
   * @param params Search parameters from the table
   * @param dataToSearch Data to search through
   */
  const handleSearch = (params: Record<string, any>, dataToSearch?: Address[]) => {
    const searchData = dataToSearch || data;
    let results = [...searchData];
    
    if (params.id) {
      results = results.filter(item => String(item.id).includes(String(params.id)));
    }
    
    // Add more searchable fields as needed
    // Example for addressName:
    if (params.addressName) {
      results = results.filter(item => 
        item.addressName.toLowerCase().includes(params.addressName.toLowerCase())
      );
    }
    
    setSearchParams(params);
    setFilteredData(results);
    
    return results;
  };
  
  //表格的列
  const columns: ProColumns<Address>[] = [
    {
      title: "用户id",
      dataIndex: "id",
      key: "id",
      render: (_, record) => <span>{record.id}</span>,
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
      render: (_, record: Address) => {
        return (
          <Space>
            <Button type={"primary"} danger onClick={() => handleDeAddress(record)}>
              删除
            </Button>
            <EditModalForm 
              values={record} 
              onSuccess={() => actionRef.current?.reload()}
              onSubmit={editAddress}
            />
          </Space>
        );
      },
    },
  ];

  /**
   * 分页查询
   * @param params { current, pageSize, ...searchParams }
   * @returns 
   */
  const handlePage = async (params: Record<string, any> & {
    current?: number;
    pageSize?: number;
  }) => {
    try {
      // Apply search filters
      const searchResults = handleSearch(params);
      
      const { current = 1, pageSize = 10 } = params;
      const startIndex = (current - 1) * pageSize;
      const paginatedData = searchResults.slice(startIndex, startIndex + pageSize);
      
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      return {
        data: paginatedData,
        success: true,
        total: searchResults.length,
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

  const handleDeAddress = async (item: Address) => {
    Modal.confirm({
      title: "你真的要删除这条数据吗？",
      icon: <ExclamationCircleFilled />,
      onOk: async () => {
        try {
          deleteAddress(item.id);
          message.success("删除成功");
          actionRef.current?.reload();
        } catch (error: any) {
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
          filterType: 'query',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          pageSize: 10,
          pageSizeOptions: [5, 10, 20, 30, 50],
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <AddModalForm 
            onSuccess={() => actionRef.current?.reload()} 
            onSubmit={addAddress}
          />
        ]}
      />
    </div>
  );
};

export default Address;