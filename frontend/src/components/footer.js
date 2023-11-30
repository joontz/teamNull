import React, { useState, useEffect } from "react";
import "../Header.css";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <h1></h1>
      <div className="footer-text">
        Questions? Conatct us at 816-235-1301 or email us at{" "}
        <a href="mailto:umkcsgs@umkc.edu" className="link-email">umkcsgs@umkc.edu</a>
      </div>
    </div>
  );
}
