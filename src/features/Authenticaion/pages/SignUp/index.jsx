import React, { useEffect, useRef } from "react";
import * as Yup from "yup";

import BasicForm from "common/components/BasisForm";
import BasicModal from "hoc/BasisModal";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSetSignInAction } from "features/Authenticaion/action";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import bgAuth from "assets/images/bgAuth.jpg";
import "./globalStyles.scss";
import instance from "app/instance";
import { movieId } from "app/constants";

function SignUp() {
  // useNavigate
  const navigate = useNavigate();
  // useState
  const [notify, setNotify] = useState("");
  const [initialValues, setInitialValues] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    email: "",
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
    try {
      await instance.request({
        url: "/api/QuanLyNguoiDung/DangKy",
        method: "POST",
        data: {
          ...values,
          maNhom: movieId,
        },
      });

      setNotify("Chúc mừng! Đăng ký thành công");
    } catch (error) {
      setNotify(error.response.data.content);
    } finally {
      setSubmitting(false);
      refNotifyModal.current.open();
    }
  }, []);

  const cbHandleOnCloseNotifyModal = useCallback(() => {
    if (notify === "Chúc mừng! Đăng ký thành công") navigate("/signIn");
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
    hoTen: Yup.string().required("*Họ và tên không được bỏ trống!"),
    email: Yup.string()
      .required("*Email không được bỏ trống!")
      .email("*Vui lòng nhập đúng định dạng email (*@*.* VD: vd@vd.com)"),
    soDT: Yup.string()
      .required("*Số điện thoại không được bỏ trống!")
      .matches(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
        "*Số điện thoại không đúng định dạng"
      )
      .min(10, "*Số điện thoại phải có ít nhất 10 ký tự"),
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
    {
      title: "Họ và tên:",
      name: "hoTen",
      type: "text",
    },
    {
      title: "Email:",
      name: "email",
      type: "text",
    },
    {
      title: "Số điện thoại:",
      name: "soDT",
      type: "text",
    },
  ];
  const subText = (
    <p>
      Đã có tài khoản? Nhấn vào <Link to="/signIn">đây</Link> để{" "}
      <Link to="/signIn">đăng nhập</Link>
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
          maxWidth: { xs: "100vw", sm: "sm" },
          width: "100%",
          backgroundImage:
            "linear-gradient(to bottom,rgba(20,50,93,.9),rgba(8,22,48,.9))",
          backgroundColor: "transparent",
          flexDirection: "column",
        }}
        handleOnClose={cbHandleOnCloseSignInModal}
      >
        <BasicForm
          className="signUpModal"
          initialValues={initialValues}
          validationSchema={validationSchema}
          handleOnSubmit={cbHandleOnSubmit}
          inputFormGroupsList={inputFormGroupsList}
          subText={subText}
          submitLabel="Đăng ký"
        />
        <p className="subText">test</p>
      </BasicModal>
      <BasicModal
        ref={refNotifyModal}
        costumeStyle={{
          maxWidth: { xs: "300px", sm: "sm" },
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

export default SignUp;
