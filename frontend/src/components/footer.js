import React, { useState, useEffect } from "react"
import "../Header.css"
import { useNavigate } from "react-router-dom"


export default function Footer() {
  
    return (
        <div className="footer">
            <h1>Questions?</h1>
            <div className="footer-text">
                Conatct us at 816-235-1301 or at email us at umkcsgs@umkc.edu
            </div>          
        </div>
      );
    };