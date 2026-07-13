import { NavLink } from "react-router-dom";
import adminService from "../../services/admin.service";

function AdminSidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Movies",
      path: "/admin/movies",
    },
    {
      name: "Users",
      path: "/admin/users",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
    },
  ];

  const logout = () => {
    adminService.logout();
    window.location.href = "/admin/login";
  };

  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900">
      <div className="border-b border-slate-800 p-6">
        <h2 className="text-2xl font-bold text-cyan-400">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 p-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `mb-2 block rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-cyan-500 font-semibold text-slate-900"
                  : "text-white hover:bg-slate-800"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          onClick={logout}
          className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;