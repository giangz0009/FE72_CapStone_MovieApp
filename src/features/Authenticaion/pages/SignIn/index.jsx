import React, { useEffect, useRef } from "react";
import * as Yup from "yup";

import BasicForm from "common/components/BasisForm";
import BasicModal from "hoc/BasisModal";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGetProfileAction,
  fetchSetSignInAction,
} from "features/Authenticaion/action";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import bgAuth from "assets/images/bgAuth.jpg";
import "./globalStyles.scss";

function SignIn() {
  // useNavigate
  const navigate = useNavigate();
  // useState
  const [notify, setNotify] = useState("");
  const [initialValues, setInitialValues] = useState({
    taiKhoan: "",
    matKhau: "",
  });
  // useDispatch
  const dispatch = useDispatch();
  // useRef
  const refBasicModal = useRef();
  const refNotifyModal = useRef();

  // useEffect
  useEffect(() => {
    refBasicModal.current.open();
  }, []);

  // useCallback
  const cbHandleOnSubmit = useCallback(async (values, { setSubmitting }) => {
    const res = await dispatch(fetchSetSignInAction(values));
    setSubmitting(false);
    if (typeof res === "string") setNotify(res);
    else {
      setNotify("Chúc mừng! Đăng nhập thành công");
      dispatch(fetchGetProfileAction);
    }
    refNotifyModal.current.open();
  }, []);

  const cbHandleOnCloseNotifyModal = useCallback(() => {
    if (notify === "Chúc mừng! Đăng nhập thành công") navigate("/");
  }, [notify, navigate]);
  const cbHandleOnCloseSignInModal = useCallback(() => {
    navigate("/");
  }, []);

  // Basic Variable
  const validationSchema = Yup.object({
    taiKhoan: Yup.string().required("*Tài khoản không được bỏ trống!"),
    matKhau: Yup.string()
      .required("*Mật khẩu không được bỏ trống")
      .min(6, "Mật khẩu tối thiểu phải có 6 ký tự"),
  });
  const inputFormGroupsList = [
    {
      title: "Tài khoản:",
      name: "taiKhoan",
      type: "text",
    },
    {
      title: "Mật khẩu:",
      name: "matKhau",
      type: "password",
    },
  ];
  const subText = (
    <p>
      Chưa có tài khoản, nhấn vào <Link to="/signUp">đây</Link> để{" "}
      <Link to="/signUp">đăng ký</Link>
    </p>
  );

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: `url(${bgAuth})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BasicModal
        className="signInModal"
        isActiveOutClickEvent={false}
        ref={refBasicModal}
        costumeStyle={{
          maxWidth: { xs: "300px", sm: "sm" },
          width: "100%",
          backgroundImage:
            "linear-gradient(to bottom,rgba(20,50,93,.9),rgba(8,22,48,.9))",
          backgroundColor: "transparent",
          flexDirection: "column",
        }}
        handleOnClose={cbHandleOnCloseSignInModal}
      >
        <BasicForm
          className="signInModal"
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleOnSubmit={cbHandleOnSubmit}
          inputFormGroupsList={inputFormGroupsList}
          subText={subText}
          submitLabel="Đăng nhập"
        />
        <p className="subText">test</p>
      </BasicModal>
      <BasicModal
        ref={refNotifyModal}
        costumeStyle={{
          maxWidth: { xs: "100vw", sm: "sm" },
          width: "100%",
          backgroundColor: "var(--bg-color)",
          minHeight: 300,
        }}
        handleOnClose={cbHandleOnCloseNotifyModal}
      >
        <p style={{ fontSize: 16, color: "var(--font-color)" }}>{notify}</p>
      </BasicModal>
    </div>
  );
}

export default SignIn;
