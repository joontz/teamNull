import React, { useState, useEffect } from "react";
import "../App.css";
import Header from "../components/header";


export default function dashboard() {
  return (
    <div className="container">
      <Header />
      <text>only people who are logged in can see this</text>
    </div>
  );
}
