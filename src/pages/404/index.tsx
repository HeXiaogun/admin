import { Button, Result } from "antd";
import {  useNavigate } from "react-router-dom";

/**
 * 404页面
 * @returns 
 */
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="是不是迷路了亲~"
        extra={<Button type="primary" onClick={()=>navigate("/")}>立即返回</Button>}
      />
    </div>
  );
};

export default NotFoundPage;
