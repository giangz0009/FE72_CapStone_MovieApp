import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import Loading from "common/components/Loading";
import React, { memo, useState } from "react";

import "./globalStyle.scss";

function MainUserInfo({ userInfo }) {
  // useState
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  //   handle functions

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
      </Box>
    );
  };

  return <Box className="mainUserInfo">{renderUserInfo()}</Box>;
}

export default memo(MainUserInfo);
