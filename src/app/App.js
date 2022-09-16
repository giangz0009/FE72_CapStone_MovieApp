import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "common/components/Header";
import "./App.css";
import PageLoading from "common/components/PageLoading";
import { appActionTypes } from "./actions";
import Footer from "common/components/Footer";

// Route Components
const Home = lazy(() => import("features/booking/pages/Home"));
const PageNotFound = lazy(() => import("common/components/PageNotFound"));
const SignIn = lazy(() => import("features/Authenticaion/pages/SignIn"));
const SignUp = lazy(() => import("features/booking/pages/Home"));

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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </div>
  );
};

export default App;
