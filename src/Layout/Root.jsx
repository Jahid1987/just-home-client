import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
