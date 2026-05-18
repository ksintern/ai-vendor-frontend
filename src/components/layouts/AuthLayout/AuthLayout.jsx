import { useTheme } from "../../../context/ThemeContext";


const AuthLayout = ({
    subtitle,
    children
}) => {

    const theme = useTheme();

    return (

        <div
            className={`
                min-h-screen
                flex
                items-center
                justify-center
                px-6
                relative
                overflow-hidden
                ${theme.colors.background}
            `}
        >

            {/* BACKGROUND EFFECTS */}

            <div
                className="
                    absolute
                    top-[-100px]
                    right-[-100px]
                    w-[400px]
                    h-[400px]
                    bg-cyan-500/10
                    blur-3xl
                    rounded-full
                "
            />

            <div
                className="
                    absolute
                    bottom-[-120px]
                    left-[-100px]
                    w-[350px]
                    h-[350px]
                    bg-blue-600/10
                    blur-3xl
                    rounded-full
                "
            />


            {/* MAIN CONTENT */}

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-6xl
                    grid
                    lg:grid-cols-2
                    gap-10
                    items-center
                "
            >

                {/* LEFT SIDE */}

                <div className="hidden lg:block">

                    <div className="max-w-xl">

                        <p
                            className="
                                text-cyan-400
                                uppercase
                                tracking-[4px]
                                text-sm
                                mb-4
                            "
                        >

                            Enterprise AI Intelligence Platform

                        </p>

                        <h1
                            className="
                                text-6xl
                                font-bold
                                text-white
                                leading-tight
                                mb-6
                            "
                        >

                            AI Vendor Discovery Agent

                        </h1>

                        <p
                            className="
                                text-slate-400
                                text-lg
                                leading-relaxed
                                mb-10
                            "
                        >

                            Discover, benchmark, analyze,
                            and manage AI vendors through
                            intelligent recommendation systems
                            and enterprise-grade analytics.

                        </p>


                        {/* FEATURE CARDS */}

                        <div className="space-y-4">

                            <div
                                className="
                                    bg-white/5
                                    border
                                    border-white/10
                                    rounded-2xl
                                    p-5
                                "
                            >

                                <h3
                                    className="
                                        text-white
                                        font-semibold
                                        mb-2
                                    "
                                >

                                    AI-Powered Vendor Insights

                                </h3>

                                <p
                                    className="
                                        text-slate-400
                                        text-sm
                                    "
                                >

                                    Analyze vendor capabilities
                                    using intelligent AI workflows.

                                </p>

                            </div>


                            <div
                                className="
                                    bg-white/5
                                    border
                                    border-white/10
                                    rounded-2xl
                                    p-5
                                "
                            >

                                <h3
                                    className="
                                        text-white
                                        font-semibold
                                        mb-2
                                    "
                                >

                                    Smart Procurement Analytics

                                </h3>

                                <p
                                    className="
                                        text-slate-400
                                        text-sm
                                    "
                                >

                                    Compare and evaluate AI vendors
                                    using enterprise intelligence systems.

                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* RIGHT SIDE AUTH CARD */}

                <div
                    className={`
                        w-full
                        max-w-md
                        mx-auto

                        ${theme.colors.card}
                        ${theme.spacing.cardPadding}
                        ${theme.radius.card}
                    `}
                >

                    <div className="mb-8">

                        <h2
                            className="
                                text-4xl
                                font-bold
                                text-white
                                mb-3
                            "
                        >

                            Welcome

                        </h2>

                        <p
                            className={
                                theme.colors.textSecondary
                            }
                        >

                            {subtitle}

                        </p>

                    </div>

                    {children}

                </div>

            </div>

        </div>
    );
};

export default AuthLayout;