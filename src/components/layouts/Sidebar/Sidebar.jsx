import {
    LayoutDashboard,
    User,
    Search,
    Settings,
    Bookmark,
    BrainCircuit,
    LogOut,
    X
} from "lucide-react";

import {
    useNavigate,
    useLocation
} from "react-router-dom";

import useAuth from "../../../hooks/useAuth";

import { useTheme } from "../../../context/ThemeContext";


const Sidebar = ({
    sidebarOpen,
    setSidebarOpen
}) => {

    const navigate = useNavigate();

    const location = useLocation();

    const { logout } = useAuth();

    const theme = useTheme();


    const handleNavigation = (path) => {

        navigate(path);

        setSidebarOpen(false);
    };


    const handleLogout = () => {

        logout();

        setSidebarOpen(false);
    };


    const menuItems = [

        {
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/dashboard",
        },

        {
            label: "Vendor Discovery",
            icon: <Search size={20} />,
            path: "/vendors",
        },

        {
            label: "AI Recommendations",
            icon: <BrainCircuit size={20} />,
            path: "/recommendations",
        },

        {
            label: "Saved Vendors",
            icon: <Bookmark size={20} />,
            path: "/saved-vendors",
        },

        {
            label: "Profile",
            icon: <User size={20} />,
            path: "/profile",
        },

        {
            label: "Settings",
            icon: <Settings size={20} />,
            path: "/settings",
        },
    ];


    return (

        <aside
            className={`
                fixed
                lg:static
                top-0
                left-0
                z-50

                w-[280px]
                min-h-screen

                border-r
                border-cyan-500/10

                bg-slate-950/90
                backdrop-blur-xl

                p-6

                transform
                transition-transform
                duration-300

                ${
                    sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
            `}
        >

            {/* MOBILE CLOSE BUTTON */}

            <div className="flex justify-end lg:hidden mb-6">

                <button
                    onClick={() =>
                        setSidebarOpen(false)
                    }

                    className="
                        p-3

                        rounded-2xl

                        bg-cyan-500/10
                        border
                        border-cyan-500/20

                        text-cyan-400
                    "
                >

                    <X size={20} />

                </button>

            </div>


            {/* LOGO */}

            <div className="mb-12">

                <p
                    className="
                        text-cyan-400
                        uppercase
                        tracking-[3px]
                        text-xs
                        mb-3
                    "
                >

                    Enterprise AI Platform

                </p>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-white
                        leading-tight
                    "
                >

                    AI Vendor
                    <br />

                    Discovery

                </h1>

                <p
                    className={`
                        mt-4
                        text-sm
                        leading-relaxed
                        ${theme.colors.textSecondary}
                    `}
                >

                    Intelligent AI vendor analytics
                    and enterprise discovery workflows.

                </p>

            </div>


            {/* NAVIGATION */}

            <div className="space-y-3">

                {
                    menuItems.map((item) => (

                        <button
                            key={item.label}

                            onClick={() =>
                                handleNavigation(item.path)
                            }

                            className={`
                                w-full

                                flex
                                items-center
                                gap-4

                                px-5
                                py-4

                                rounded-2xl

                                transition-all
                                duration-300

                                ${
                                    location.pathname === item.path

                                        ? `
                                            bg-cyan-500/15
                                            border
                                            border-cyan-500/20
                                            text-white
                                          `

                                        : `
                                            text-slate-300
                                            hover:bg-cyan-500/10
                                            hover:text-white
                                          `
                                }
                            `}
                        >

                            {item.icon}

                            <span className="font-medium">

                                {item.label}

                            </span>

                        </button>
                    ))
                }

            </div>


            {/* ACTIVE WORKSPACE */}

            <div
                className="
                    mt-10

                    bg-slate-900/70
                    border
                    border-cyan-500/10

                    rounded-3xl
                    p-5
                "
            >

                <p className="text-slate-400 text-sm mb-2">

                    Active Workspace

                </p>

                <h3 className="text-white font-semibold mb-1">

                    Enterprise Access

                </h3>

                <p className="text-cyan-400 text-sm">

                    AI Intelligence Enabled

                </p>

            </div>


            {/* LOGOUT */}

            <div className="mt-8">

                <button
                    onClick={handleLogout}

                    className="
                        w-full

                        flex
                        items-center
                        gap-4

                        px-5
                        py-4

                        rounded-2xl

                        text-red-300

                        hover:bg-red-500/10

                        transition-all
                        duration-300
                    "
                >

                    <LogOut size={20} />

                    Logout

                </button>

            </div>

        </aside>
    );
};

export default Sidebar;