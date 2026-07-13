import adminService from "../../services/admin.service";

function AdminNavbar() {
  const admin = adminService.getUser();

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-8 py-5">
      <h1 className="text-2xl font-bold text-white">
        DevOps TicketHub
      </h1>

      <div className="text-right">
        <p className="font-semibold text-white">
          {admin?.name}
        </p>

        <p className="text-sm text-cyan-400">
          Administrator
        </p>
      </div>
    </header>
  );
}

export default AdminNavbar;