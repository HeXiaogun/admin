import { Pagination } from "antd";
import "./index.less";

type Props = {
  // 数据总数
  total: number;
  // 页码改变的回调
  showSizeChanger?: boolean;
// 是否可以快速跳转至某页
  showQuickJumper?: boolean;
  // 用于显示数据总量
  showTotal?: (total: number) => React.ReactNode;
  // 页码改变的回调
  onChange?: (page: number, pageSize?: number | undefined) => void;
  // pageSize 变化的回调
  onShowSizeChange?: (current: number, size: number) => void;
};

const BasePage = (props: Props) => {
  const { total, onChange, onShowSizeChange } = props;
  return (
    <div className="basePage">
      <Pagination
        total={total}
        showSizeChanger
        showQuickJumper
        showTotal={(total) => `一共 ${total} 条数据`}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};
export default BasePage;
