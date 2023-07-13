import { Suspense, useEffect } from "react";
import { useUserActions, useUserInitialized } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Loader } from "@/shared/ui/Loader";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { AppRouter } from "./providers/router";

const App = () => {
    const initialized = useUserInitialized();
    const { retrieveAuthDataFromStorage } = useUserActions();

    useEffect(() => {
        retrieveAuthDataFromStorage();
    }, [retrieveAuthDataFromStorage]);

    return (
        <div className={classNames("app")}>
            <Suspense
                fallback={
                    <div
                        style={{
                            display: "flex",
                            width: "100%",
                            height: "100vh",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Loader />
                    </div>
                }
            >
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {initialized && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
