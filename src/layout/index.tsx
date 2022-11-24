import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return <>
    <div>header</div>
    <div>
      <Link to="/hooks-code-mirror">hooks-code-mirror</Link>
    </div>
    <div>
      <Link to="/">home</Link>
    </div>
    <Link to="/test">test</Link>
    <Outlet />
  </>;
}

export default Layout