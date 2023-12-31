import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage";
import Login from "./pages/loginPage";
import Apply from "./pages/apply";
import Faq from "./pages/faq";
import Signup from "./pages/signupPage";
import Search from "./pages/search";
import Dashboard from "./pages/dashboard";
import RequireAuth from "./RequireAuth";
import RequireAdmin from "./RequireAdmin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/apply"
          element={
            <RequireAuth>
              <Apply />
            </RequireAuth>
          }
        />
        {/* <Route path="/apply" element={<Apply />} /> */}
        <Route path="/faq" element={<Faq />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/search"
          element={
            <RequireAdmin>
              <Search />
            </RequireAdmin>
          }
        />
        {/* <Route path="/search" element={<Search />} /> */}
        <Route
          path="/dashboard"
          element={
            <RequireAdmin>
              <Dashboard />
            </RequireAdmin>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
