import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import PageLoading from "common/components/PageLoading";
import { appActionTypes } from "./actions";
import DefaultLayout from "common/hoc/DefaultLayout";
import BookingSeat from "features/booking/common/components/BookingSeats";
import UserInfo from "features/Authenticaion/common/components/UserInfo";
import CostumeLayout from "common/hoc/CostumeLayout";
import { PublicOutlet } from "./routeGuard";
import AuthOutlet from "./AuthOutlet";
import PrivateOutlet from "./PrivateOutlet";
import MainRoute from "./MainRoute";

// Route Components
const Home = lazy(() => import("features/booking/pages/Home"));
const PageNotFound = lazy(() => import("common/components/PageNotFound"));
const SignIn = lazy(() => import("features/Authenticaion/pages/SignIn"));
const SignUp = lazy(() => import("features/Authenticaion/pages/SignUp"));
const Details = lazy(() => import("features/booking/pages/Details"));

const App = () => {
  // useDispatch
  const dispatch = useDispatch();

  // Use Effect

  useEffect(() => {
    const movieThemeIsDark = JSON.parse(
      localStorage.getItem("movieThemeIsDark")
    );

    dispatch(appActionTypes.setIsDarkTheme(movieThemeIsDark));

    if (movieThemeIsDark) document.body.dataset.theme = "dark";
  });

  return (
    <div id="app">
      <Suspense fallback={<PageLoading />}>
        <MainRoute />
      </Suspense>
    </div>
  );
};

export default App;
