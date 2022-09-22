import Footer from "common/components/Footer";
import Header from "common/components/Header";
import React from "react";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default DefaultLayout;
