import {
    Menu
} from "lucide-react";

import useAuth from "../../../hooks/useAuth";

import { useTheme } from "../../../context/ThemeContext";


const Navbar = ({
    setSidebarOpen
}) => {

    const { user } = useAuth();

    const theme = useTheme();

    return (

        <header
            className="
                h-24

                border-b
                border-cyan-500/10

                bg-slate-950/50
                backdrop-blur-xl

                flex
                items-center
                justify-between

                px-5
                md:px-8
                lg:px-10
            "
        >

            {/* LEFT SECTION */}

            <div className="flex items-center gap-4">

                {/* MOBILE MENU BUTTON */}

                <button
                    onClick={() =>
                        setSidebarOpen(true)
                    }

                    className="
                        lg:hidden

                        p-3

                        rounded-2xl

                        bg-cyan-500/10
                        border
                        border-cyan-500/20

                        text-cyan-400

                        hover:bg-cyan-500/20

                        transition-all
                    "
                >

                    <Menu size={22} />

                </button>


                {/* TITLE */}

                <div>

                    <p
                        className="
                            text-cyan-400
                            uppercase
                            tracking-[3px]
                            text-[10px]
                            md:text-xs
                            mb-1
                        "
                    >

                        Enterprise AI Intelligence System

                    </p>

                    <h1
                        className="
                            text-xl
                            md:text-2xl
                            lg:text-3xl

                            font-bold
                            text-white
                        "
                    >

                        AI Vendor Discovery Agent

                    </h1>

                </div>

            </div>


            {/* RIGHT SECTION */}

            <div className="flex items-center gap-3 md:gap-5">

                {/* USER INFO */}

                <div className="text-right hidden sm:block">

                    <p
                        className="
                            text-white
                            font-semibold
                            text-base
                            md:text-lg
                        "
                    >

                        {user?.full_name}

                    </p>

                    <p
                        className={`
                            text-sm
                            ${theme.colors.textSecondary}
                        `}
                    >

                        @{user?.username}

                    </p>

                </div>


                {/* ROLE BADGE */}

                <div
                    className="
                        px-4
                        py-2

                        md:px-5
                        md:py-3

                        rounded-2xl

                        bg-cyan-500/10
                        border
                        border-cyan-500/20

                        text-cyan-400
                        text-xs
                        md:text-sm
                        font-medium
                    "
                >

                    {user?.role}

                </div>

            </div>

        </header>
    );
};

export default Navbar;