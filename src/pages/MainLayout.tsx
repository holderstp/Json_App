import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <div>
        <header className="flex space-x-2 bg-slate-900 h-[60px] text-white items-center  pl-9 rounded-md">
          <div>
            <NavLink to="/users">Users</NavLink>
          </div>
          <div>
            <NavLink to="/photos">Photos</NavLink>
          </div>
        </header>
      </div>

      <main className="w-100%">
        <Outlet />
      </main>
    </div>
  );
};
export default MainLayout;
