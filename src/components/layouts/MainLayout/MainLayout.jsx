import { useState } from "react";

import Navbar from "../Navbar/Navbar";

import Sidebar from "../Sidebar/Sidebar";

import { useTheme } from "../../../context/ThemeContext";


const MainLayout = ({
    children
}) => {

    const theme = useTheme();

    const [sidebarOpen, setSidebarOpen] =
        useState(false);


    return (

        <div
            className={`
                min-h-screen
                flex
                overflow-hidden
                relative

                ${theme.colors.background}
            `}
        >

            {/* MOBILE OVERLAY */}

            {
                sidebarOpen && (

                    <div
                        onClick={() =>
                            setSidebarOpen(false)
                        }

                        className="
                            fixed
                            inset-0
                            bg-black/60
                            backdrop-blur-sm
                            z-40

                            lg:hidden
                        "
                    />
                )
            }


            {/* SIDEBAR */}

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />


            {/* MAIN CONTENT */}

            <div
                className="
                    flex-1
                    flex
                    flex-col
                    overflow-hidden
                "
            >

                {/* NAVBAR */}

                <Navbar
                    setSidebarOpen={setSidebarOpen}
                />


                {/* PAGE AREA */}

                <main
                    className="
                        flex-1
                        overflow-y-auto

                        px-5
                        py-6

                        md:px-8
                        lg:px-14
                        lg:py-10
                    "
                >

                    <div className="max-w-[1600px]">

                        {children}

                    </div>

                </main>

            </div>

        </div>
    );
};

export default MainLayout;