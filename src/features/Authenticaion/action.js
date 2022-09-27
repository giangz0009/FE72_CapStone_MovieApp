import { createAction } from "@reduxjs/toolkit";
import instance from "app/instance";

const authActionType = {
  setProfile: createAction("Authentication/SET_PROFILE"),
};

const fetchChangeProfile = (data) => {
  return async (dispatch, getState) => {
    try {
      const currProfile = { ...getState().authentication.profile };
      delete currProfile.loaiNguoiDung;
      delete currProfile.thongTinDatVe;

      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "PUT",
        data: {
          ...currProfile,
          ...data,
        },
      });

      dispatch(fetchGetProfileAction);

      return {
        heading: "Thông báo",
        content: "Cập nhật thành công!",
        cancelBtn: "Ok",
      };
    } catch (error) {
      return {
        heading: "Thông báo",
        content: "Có lỗi xảy ra!",
        cancelBtn: "Ok",
      };
    }
  };
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

export {
  authActionType,
  fetchSetSignInAction,
  fetchGetProfileAction,
  fetchChangeProfile,
};
