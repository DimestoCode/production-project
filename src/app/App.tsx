import { Suspense } from "react";
import { initializeAuthData, useUserInitialized } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { AppRouter } from "./providers/router";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { AppLoader } from "@/widgets/AppLoader";

const App = () => {
    const initialized = useUserInitialized();

    useActionEffect(initializeAuthData);

    return !initialized ? (
        <AppLoader />
    ) : (
        <div className={classNames("app")}>
            <Suspense fallback={<AppLoader />}>
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
