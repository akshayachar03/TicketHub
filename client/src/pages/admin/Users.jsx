import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import adminService from "../../services/admin.service";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadUsers(); }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers();
      setUsers(response.data);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  const handleRoleChange = async (user, role) => {
    await adminService.updateUser(user._id, { role });
    loadUsers();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await adminService.deleteUser(id);
    loadUsers();
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">User Management</h1>
        <input
          className="w-80 rounded-lg bg-slate-800 px-4 py-3"
          placeholder="Search users..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      {loading ? <p>Loading users...</p> : (
        <div className="overflow-hidden rounded-xl bg-slate-900">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Created</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id} className="border-t border-slate-800">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <select
                      className="rounded bg-slate-800 px-2 py-1"
                      value={user.role}
                      onChange={(e)=>handleRoleChange(user,e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <button
                      onClick={()=>handleDelete(user._id)}
                      className="rounded bg-red-600 px-3 py-2 hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length===0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

export default Users;