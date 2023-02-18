import PageNotFound from "common/components/PageNotFound";
import CostumeLayout from "common/hoc/CostumeLayout";
import DefaultLayout from "common/hoc/DefaultLayout";
import UserInfo from "features/Authenticaion/common/components/UserInfo";
import SignIn from "features/Authenticaion/pages/SignIn";
import SignUp from "features/Authenticaion/pages/SignUp";
import BookingSeat from "features/booking/common/components/BookingSeats";
import Details from "features/booking/pages/Details";
import Home from "features/booking/pages/Home";
import React from "react";
import AuthOutlet from "./AuthOutlet";
import PrivateOutlet from "./PrivateOutlet";
import { PublicOutlet } from "./routeGuard";

import { createHashRouter, RouterProvider } from "react-router-dom";

const declareRoute = [
  {
    element: <PublicOutlet />,
    children: [
      {
        path: "/",
        element: (
          <DefaultLayout>
            <Home />
          </DefaultLayout>
        ),
      },
      {
        path: "details/:movieId",
        element: (
          <DefaultLayout>
            <Details />
          </DefaultLayout>
        ),
      },
      {
        path: "signIn",
        element: <AuthOutlet navigateTo="/" children={<SignIn />} />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "*",
        element: (
          <DefaultLayout>
            <PageNotFound />
          </DefaultLayout>
        ),
      },
      {
        path: "booking/:movieScheduleId",
        element: (
          <PrivateOutlet
            navigateTo="/signIn"
            children={
              <CostumeLayout>
                <BookingSeat />
              </CostumeLayout>
            }
          />
        ),
      },
      {
        path: "userInfo",
        element: (
          <PrivateOutlet
            navigateTo="/signIn"
            children={
              <DefaultLayout>
                <UserInfo />
              </DefaultLayout>
            }
          />
        ),
      },
    ],
  },
];

const router = createHashRouter(declareRoute);

const MainRoute = () => {
  return <RouterProvider router={router} />;
};

export default MainRoute;
