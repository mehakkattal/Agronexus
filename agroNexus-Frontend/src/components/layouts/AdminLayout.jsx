import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import CropBubble from "../pages/CropBubble";
import AdminChatWidget from "../admin/chat/AdminChatWidget";
import FarmerHeader from "./FarmerHeader";
import Header from "./Header";


export default function AdminLayout() {
    let isLogin = sessionStorage.getItem("isLogin")
    let userType = sessionStorage.getItem("userType")

    let nav = useNavigate()
    useEffect(() => {
        if (!isLogin || userType != 1) {
            toast.error("Please login to access this page")
            nav("/login")
        }
    }, [isLogin])
    
    
        // Decide which header to render
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


                <AdminChatWidget />

                {/* <CropBubble /> */}
                <Footer />

            </div>




        </>
    )
}

