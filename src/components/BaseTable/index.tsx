import { Table } from "antd";
import "./index.less";
import { ColumnsType, TablePaginationConfig, TableProps } from "antd/es/table";
import { TableRowSelection } from "antd/es/table/interface";

type Props<T> = {
  // 表格行的选择,复选
  rowSelection?: TableRowSelection<T> | undefined;
  // 表格行 key 的取值
  rowKey?: string;
  // 表格是否加载中
  loading?: boolean;
  // 数据源
  dataSource?: TableProps<T>["dataSource"];
  // 表格列的配置描述
  columns?: ColumnsType<T>;
  // 分页器
  pagination: false | TablePaginationConfig | undefined ;
};

const BaseTable = <T,>(props: Props<T>) => {
  const { rowSelection, rowKey, loading, dataSource, columns, pagination } =
    props;
  return (
    <Table
      rowSelection={rowSelection}
      rowKey={rowKey}
      loading={loading}
      dataSource={dataSource}
      columns={columns}
      pagination={pagination}
      scroll={{ x: 'max-content',y: 70 * 8 }}
      className="baseTable"
    />
  );
};
export default BaseTable;
