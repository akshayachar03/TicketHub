import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="mb-8 text-4xl font-bold">
          👤 My Profile
        </h1>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8">
          <div className="space-y-6">

            <div>
              <p className="text-slate-400">Name</p>

              <h2 className="text-2xl font-semibold">
                {user?.name}
              </h2>
            </div>

            <div>
              <p className="text-slate-400">Email</p>

              <h2 className="text-xl">
                {user?.email}
              </h2>
            </div>

            <div>
              <p className="text-slate-400">Role</p>

              <span className="rounded-lg bg-cyan-500 px-4 py-2 text-slate-900">
                {user?.role}
              </span>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;