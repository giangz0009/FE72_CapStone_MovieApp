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
import { AuthOutlet, PrivateOutlet, PublicOutlet } from "./routeGuard";

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
        <Routes>
          <Route path="/" element={<PublicOutlet />}>
            <Route
              index
              element={
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              }
            />
            <Route
              path="details/:movieId"
              element={
                <DefaultLayout>
                  <Details />
                </DefaultLayout>
              }
            />
            <Route path="signIn" element={<AuthOutlet navigateTo="/" />}>
              <Route index element={<SignIn />} />
            </Route>
            <Route path="signUp" element={<SignUp />} />
            <Route
              path="*"
              element={
                <DefaultLayout>
                  <PageNotFound />
                </DefaultLayout>
              }
            />
            <Route
              path="booking"
              element={<PrivateOutlet navigateTo="/signIn" />}
            >
              <Route
                path=":movieScheduleId"
                element={
                  <CostumeLayout>
                    <BookingSeat />
                  </CostumeLayout>
                }
              />
            </Route>
            <Route
              path="userInfo"
              element={<PrivateOutlet navigateTo="/signIn" />}
            >
              <Route
                index
                element={
                  <DefaultLayout>
                    <UserInfo />
                  </DefaultLayout>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
