import { Outlet } from "react-router-dom";
import useReveal from "../hooks/useReveal";
import Header from "./Header";
import Footer from "./Footer";
import MobileDock from "./MobileDock";

export default function Layout() {
  useReveal();

  return (
    <>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="content">
        <Outlet />
      </main>
      <Footer />
      <MobileDock />
    </>
  );
}
