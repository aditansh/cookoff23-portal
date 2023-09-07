import Navbar from "@/components/Navbar";
import Portal from "@/components/portal";
import React, { useEffect,useState } from "react";
import { useRouter } from "next/router";

export default function TestPortal() {
  const router = useRouter();
  const round = router.query.round;
  useEffect(() => {
    const handleBackButton = (e) => {
      e.preventDefault();
      alert("Back button is disabled on this page.");
      window.history.pushState(null, null, window.location.pathname);
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []);
  return (
    <>
      <main>
        <Navbar />
        <Portal />
      </main>
    </>
  );
}
