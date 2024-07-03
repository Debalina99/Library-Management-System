import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import BookDetails from "./component/Book/BookDetails";
import Books from "./component/Book/Books";
import Search from "./component/Book/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Wishlist from "./component/Wishlist/Wishlist";
import Shipping from "./component/Wishlist/Shipping";
import ConfirmRequest from "./component/Wishlist/ConfirmRequest";
import axios from "axios";
import Confirmation from "./component/Wishlist/Confirmation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import RequestSuccess from "./component/Wishlist/RequestSuccess";
import MyRequests from "./component/Request/MyRequests";
import RequestDetails from "./component/Request/RequestDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import BookList from "./component/Admin/BookList.js";
import NewBook from "./component/Admin/NewBook";
import UpdateBook from "./component/Admin/UpdateBook";
import RequestList from "./component/Admin/RequestList";
import ProcessRequest from "./component/Admin/ProcessRequest";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import BookReviews from "./component/Admin/BookReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/confirmation" component={Confirmation} />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/book/:id" component={BookDetails} />
        <Route exact path="/books" component={Books} />
        <Route path="/books/:keyword" component={Books} />

        <Route exact path="/search" component={Search} />

        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />

        <ProtectedRoute exact path="/account" component={Profile} />

        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />

        <Route exact path="/password/forgot" component={ForgotPassword} />

        <Route exact path="/password/reset/:token" component={ResetPassword} />

        <Route exact path="/login" component={LoginSignUp} />

        <Route exact path="/wishlist" component={Wishlist} />

        <Route exact path="/success" component={RequestSuccess} />

        <ProtectedRoute exact path="/shipping" component={Shipping} />

        {/* <ProtectedRoute exact path="/success" component={RequestSuccess} /> */}

        <ProtectedRoute exact path="/requests" component={MyRequests} />

        <ProtectedRoute exact path="/request/confirm" component={ConfirmRequest} />

        <ProtectedRoute exact path="/request/:id" component={RequestDetails} />

        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/books"
          isAdmin={true}
          component={BookList}
        />
        <ProtectedRoute
          exact
          path="/admin/book"
          isAdmin={true}
          component={NewBook}
        />

        <ProtectedRoute
          exact
          path="/admin/book/:id"
          isAdmin={true}
          component={UpdateBook}
        />
        <ProtectedRoute
          exact
          path="/admin/requests"
          isAdmin={true}
          component={RequestList}
        />

        <ProtectedRoute
          exact
          path="/admin/request/:id"
          isAdmin={true}
          component={ProcessRequest}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={BookReviews}
        />

        <Route
          component={
            window.location.pathname === "/process/confirmation" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
