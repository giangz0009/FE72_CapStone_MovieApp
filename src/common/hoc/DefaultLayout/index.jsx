import Footer from "common/components/Footer";
import Header from "common/components/Header";
import { fetchGetProfileAction } from "features/Authenticaion/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function DefaultLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProfileAction);
    window.scrollTo(0, 0);
  });

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default DefaultLayout;
