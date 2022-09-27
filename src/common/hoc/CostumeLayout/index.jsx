import { fetchGetProfileAction } from "features/Authenticaion/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { animateScroll as scroll } from "react-scroll";

function CostumeLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProfileAction);
    scroll.scrollToTop();
  });

  return <>{children}</>;
}

export default CostumeLayout;
