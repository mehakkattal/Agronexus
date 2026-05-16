import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FarmerHeader from "./FarmerHeader";
import { MoonLoader } from "react-spinners";
import CropBubble from "../pages/CropBubble";

import FarmerChatWidget from "../farmer/chat/FarmerChatWidget";
import AdminHeader from "./AdminHeader";
import Header from "./Header";


export default function FarmerLayout() {

    let isLogin = sessionStorage.getItem("isLogin")
    let userType = sessionStorage.getItem("userType")
    let nav = useNavigate()
    useEffect(() => {
        if (!isLogin || userType != 2) {
            toast.error("Please login to access this page")
            nav("/login")
        }
    }, [isLogin])

    const renderHeader = () => {
        
                switch (userType) {
        
                    case "1":   // Admin
                        return <AdminHeader />
        
                    case "2":   // Farmer
                        return <FarmerHeader />
        
                    case "3":   // Normal User
                        return <Header />
        
                    default:    // Not logged in
                        return <Header />
                }
            }
       





    return (
        <>


            <div className="layout-wrapper">
                {renderHeader()}
                <main className="layout-content">
                    <Outlet />
                </main>

                <FarmerChatWidget />


                <CropBubble />
                <Footer />

            </div>






        </>
    )
}