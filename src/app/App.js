import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./App.css";
import PageLoading from "common/components/PageLoading";
import { appActionTypes } from "./actions";
import DefaultLayout from "common/hoc/DefaultLayout";
import { fetchGetProfileAction } from "features/Authenticaion/action";
import BookingSeat from "features/booking/common/components/BookingSeats";

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

  useEffect(() => {
    dispatch(fetchGetProfileAction);
  }, [dispatch]);

  return (
    <div id="app">
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route
            path="/details/:movieId"
            element={
              <DefaultLayout>
                <Details />
              </DefaultLayout>
            }
          />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/booking/:movieScheduleId" element={<BookingSeat />} />
          {/* Others Link */}
          <Route
            path="*"
            element={
              <DefaultLayout>
                <PageNotFound />
              </DefaultLayout>
            }
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
