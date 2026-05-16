import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import CropBubble from "../pages/CropBubble";
import ChatWidget from "../user/ChatWidget";
import AdminHeader from "./AdminHeader";
import FarmerHeader from "./FarmerHeader";
// import FloatingWidget from "../pages/FloatingWidget";


export default function Layout() {
    const userType = sessionStorage.getItem("userType")

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

                {/* <FloatingWidget/> */}
                <ChatWidget />


                {/* <CropBubble /> */}
                <Footer />

            </div>


        </>
    )
}