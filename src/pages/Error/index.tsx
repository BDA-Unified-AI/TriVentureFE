import { Result } from "antd";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <button className="btn">
            <Link to="/">Trở về trang chủ</Link>
          </button>
        }
      />
    </>
  );
};

export default ErrorPage;
