import useAuth from "../../hooks/useAuth";


const AdminPage = () => {

    const { user } = useAuth();


    return (

        <div className="min-h-screen bg-gray-950 text-white p-10">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold text-cyan-400 mb-6">

                    Admin Dashboard

                </h1>

                <div className="bg-gray-900 rounded-2xl p-8 shadow-lg border border-cyan-500/20">

                    <h2 className="text-2xl font-semibold mb-4">

                        Welcome, {user?.full_name}

                    </h2>

                    <div className="space-y-3 text-lg">

                        <p>
                            <span className="font-semibold text-cyan-300">
                                Role:
                            </span>{" "}
                            {user?.role}
                        </p>

                        <p>
                            <span className="font-semibold text-cyan-300">
                                Email:
                            </span>{" "}
                            {user?.email}
                        </p>

                        <p>
                            <span className="font-semibold text-cyan-300">
                                Access Level:
                            </span>{" "}
                            Full Administrative Control
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminPage;