import MainLayout from "../../components/layouts/MainLayout/MainLayout";

import useAuth from "../../hooks/useAuth";

import { useTheme } from "../../context/ThemeContext";


const DashboardPage = () => {

    const {
        user
    } = useAuth();

    const theme = useTheme();


    const stats = [

        {
            title: "Vendors Analyzed",
            value: "128",
            description: "AI vendors benchmarked"
        },

        {
            title: "AI Recommendations",
            value: "42",
            description: "Smart recommendations generated"
        },

        {
            title: "Search Sessions",
            value: "318",
            description: "Vendor discovery searches"
        },

        {
            title: "Saved Vendors",
            value: "24",
            description: "Bookmarked vendor profiles"
        },
    ];


    return (

        <MainLayout>

            {/* PAGE HEADER */}

            <div className="mb-10">

                <p
                    className="
                        text-cyan-400
                        uppercase
                        tracking-[3px]
                        text-sm
                        mb-3
                    "
                >

                    Vendor Intelligence Dashboard

                </p>

                <h1
                    className="
                        text-5xl
                        font-bold
                        text-white
                        mb-4
                    "
                >

                    Welcome back,
                    {" "}
                    {user?.full_name}

                </h1>

                <p
                    className={`
                        max-w-3xl
                        ${theme.colors.textSecondary}
                    `}
                >

                    Monitor AI vendor analytics,
                    intelligent recommendations,
                    procurement insights,
                    and enterprise discovery workflows
                    through your centralized AI platform.

                </p>

            </div>


            {/* STATS CARDS */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                "
            >

                {
                    stats.map((item) => (

                        <div
                            key={item.title}

                            className="
                                bg-slate-900/60
                                backdrop-blur-xl

                                border
                                border-cyan-500/10

                                rounded-3xl
                                p-6

                                shadow-2xl
                            "
                        >

                            <p
                                className="
                                    text-slate-400
                                    text-sm
                                    mb-3
                                "
                            >

                                {item.title}

                            </p>

                            <h2
                                className="
                                    text-4xl
                                    font-bold
                                    text-white
                                    mb-3
                                "
                            >

                                {item.value}

                            </h2>

                            <p
                                className="
                                    text-cyan-400
                                    text-sm
                                "
                            >

                                {item.description}

                            </p>

                        </div>
                    ))
                }

            </div>


            {/* AI INSIGHTS SECTION */}

            <div
                className="
                    mt-10

                    bg-slate-900/60
                    backdrop-blur-xl

                    border
                    border-cyan-500/10

                    rounded-3xl
                    p-8

                    shadow-2xl
                "
            >

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-white
                        mb-4
                    "
                >

                    AI Vendor Intelligence

                </h2>

                <p
                    className="
                        text-slate-400
                        leading-relaxed
                        max-w-4xl
                    "
                >

                    Your platform is configured with
                    enterprise-grade authentication,
                    protected routing,
                    role-based access control,
                    scalable UI architecture,
                    and intelligent vendor discovery foundations
                    ready for AI-powered integrations.

                </p>

            </div>

        </MainLayout>
    );
};

export default DashboardPage;