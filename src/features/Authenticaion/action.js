import { createAction } from "@reduxjs/toolkit";
import instance from "app/instance";

const authActionType = {
  setProfile: createAction("Authentication/SET_PROFILE"),
};

const fetchSetSignInAction = (data) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: data,
      });

      const profile = { ...res.data.content };
      delete profile.accessToken;

      localStorage.setItem("token", res.data.content.accessToken);

      dispatch(authActionType.setProfile({ ...profile }));

      return { ...profile };
    } catch (error) {
      return error.response.data.content;
    }
  };
};

const fetchGetProfileAction = async (dispatch) => {
  try {
    if (localStorage.getItem("token")) {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
      });

      dispatch(authActionType.setProfile(res.data.content));
    } else {
      dispatch(authActionType.setProfile(null));
    }
  } catch (error) {
    throw new Error(error);
  }
};

export { authActionType, fetchSetSignInAction, fetchGetProfileAction };
