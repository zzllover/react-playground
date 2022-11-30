import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return <div style={{height: "100%", overflow: "auto"}}>
    <div>header</div>
    <div>
      <Link to="/hooks-code-mirror">hooks-code-mirror</Link>
    </div>
    <div>
      <Link to="/">home</Link>
    </div>
    <Link to="/test">test</Link>
    <Outlet />
  </div>;
}

export default Layout