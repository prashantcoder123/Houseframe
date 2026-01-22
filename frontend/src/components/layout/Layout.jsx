import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsappFloat from "../ui/WhatsappFloat";

export default function Layout() {
  return (
<div className="min-h-screen text-white bg-gradient-to-br from-[#020617] via-[#020f2e] to-[#020617] relative overflow-hidden">
  {/* BACKGROUND GLOW */}
<div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[140px]" />
<div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px]" />

      <Navbar />
      <Outlet />
            <WhatsappFloat />

      <Footer />
    </div>
  );
}
