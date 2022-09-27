import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Loading from "common/components/Loading";
import React, { memo, useState } from "react";
import { useCallback } from "react";
import * as Yup from "yup";

import "./globalStyle.scss";
import UserUpdateForm from "./UserUpdateForm";

function MainUserInfo({ userInfo }) {
  // useState
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [formData, setFormData] = useState([]);
  const [formInitialValues, setFormInitialValues] = useState({});
  const [formValidationSchema, setFormValidationSchema] = useState({});
  const [isShowPassword, setIsShowPassword] = useState(false);

  // useCallback
  const cbSetIsUpdateForm = useCallback((value) => setIsUpdateForm(value));

  //   handle functions
  const handleOnclickUpdatePassword = () => {
    setIsUpdateForm(true);

    setFormData([
      {
        title: "Mật khẩu hiện tại:",
        name: "currentPass",
        type: "password",
        isPassword: true,
      },
      {
        title: "Mật khẩu mới:",
        name: "newPass",
        type: "password",
        isPassword: true,
      },
      {
        title: "Mật khẩu xác nhận:",
        name: "matKhau",
        type: "password",
        isPassword: true,
      },
    ]);

    setFormValidationSchema(
      Yup.object({
        currentPass: Yup.string()
          .required("*Vui lòng nhập mật khẩu hiện tại!")
          .oneOf([userInfo.matKhau], "*Mật khẩu hiện tại không đúng!"),
        newPass: Yup.string()
          .required("*Vui lòng nhập mật khẩu mới!")
          .min(6, "*Mật khẩu phải có tối thiểu 6 ký tự"),
        matKhau: Yup.string()
          .required("*Vui lòng nhập mật khẩu xác nhận!")
          .oneOf(
            [Yup.ref("newPass"), null],
            "*Mật khẩu xác nhận chưa chính xác!"
          ),
      })
    );

    setFormInitialValues({
      currentPass: "",
      newPass: "",
      matKhau: "",
    });
  };

  const handleOnclickUpdateInfo = () => {
    // Open update form & set data + schema
    setIsUpdateForm(true);

    setFormData([
      {
        title: "Họ và tên:",
        name: "hoTen",
        type: "text",
      },
      {
        title: "email:",
        name: "email",
        type: "text",
      },
      {
        title: "Số điện thoại:",
        name: "soDT",
        type: "text",
      },
    ]);

    setFormValidationSchema(
      Yup.object({
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
      })
    );

    setFormInitialValues({
      hoTen: userInfo.hoTen,
      soDT: userInfo.soDT,
      email: userInfo.email,
    });
  };

  //   render functions
  const renderUserInfo = () => {
    if (!userInfo) return <Loading />;

    const { taiKhoan, matKhau, hoTen, email, soDT } = userInfo;

    return (
      <Box className="mainUserInfoForm">
        <Box className="group">
          <label htmlFor="taiKhoan">Tài khoản:</label>
          <input id="taiKhoan" type="text" value={taiKhoan} readOnly disabled />
        </Box>
        <FormControl
          className="group"
          sx={{ m: 1, width: "25ch" }}
          variant="filled"
        >
          <InputLabel htmlFor="matKhau">Mật khẩu:</InputLabel>
          <FilledInput
            readOnly
            id="matKhau"
            type={isShowPassword ? "text" : "password"}
            value={matKhau}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setIsShowPassword((prevState) => !prevState)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {isShowPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box className="group">
          <label htmlFor="hoTen">Họ và tên:</label>
          <input id="hoTen" type="text" value={hoTen} readOnly />
        </Box>
        <Box className="group">
          <label htmlFor="email">Email:</label>
          <input id="email" type="text" value={email} readOnly />
        </Box>
        <Box className="group">
          <label htmlFor="soDT">Số điện thoại:</label>
          <input id="soDT" type="text" value={soDT} readOnly />
        </Box>
        <Box className="group">
          <Button onClick={handleOnclickUpdateInfo}>Cập nhật thông tin</Button>
          <Button onClick={handleOnclickUpdatePassword}>Đổi mật khẩu</Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box className="mainUserInfo">
      {!isUpdateForm ? (
        renderUserInfo()
      ) : (
        <UserUpdateForm
          initialValues={formInitialValues}
          validationSchema={formValidationSchema}
          formData={formData}
          closeFormOnSubmit={cbSetIsUpdateForm}
        />
      )}
    </Box>
  );
}

export default memo(MainUserInfo);
