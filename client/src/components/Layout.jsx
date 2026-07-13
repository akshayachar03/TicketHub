import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
