import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckoutRoute(props) {
  const { currentUser } = useSelector((state) => state.authReducer);
  const { component: BookTickets, ...routeProps } = props;
  return (
    <Route {...routeProps} render={(propsInRoute) => {
      if (currentUser) {
        return <BookTickets {...propsInRoute} />
      }
      return (
        <Redirect
          to={{
            pathname: "/dangnhap",
            state: propsInRoute.location.state
          }}
        />
      )
    }} />
  )
}
export default CheckoutRoute;