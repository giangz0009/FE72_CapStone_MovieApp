import { fetchGetProfileAction } from "features/Authenticaion/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function CostumeLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetProfileAction);
    window.scrollTo(0, 0);
  });

  return <>{children}</>;
}

export default CostumeLayout;
