import { Suspense } from "react";
import { initializeAuthData, useUserInitialized } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { AppRouter } from "./providers/router";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { AppLoader } from "@/widgets/AppLoader";
import { ToggleFeatures } from "@/shared/lib/features";
import { MainLayout } from "@/shared/layouts/MainLayout";

const App = () => {
    const initialized = useUserInitialized();

    useActionEffect(initializeAuthData);

    return initialized ? (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div className={classNames("app")} id="app">
                    <Suspense fallback={<AppLoader />}>
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
            on={
                <div className={classNames("app_redesigned")} id="app">
                    <Suspense fallback={<AppLoader />}>
                        <MainLayout
                            content={<AppRouter />}
                            header={<Navbar />}
                            sidebar={<Sidebar />}
                            // toolbar={<div></div>}
                        />
                    </Suspense>
                </div>
            }
        />
    ) : (
        <AppLoader />
    );
};

export default App;
