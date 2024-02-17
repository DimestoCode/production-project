import { Suspense, memo } from "react";
import { initializeAuthData, useUserInitialized } from "@/entities/User";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { AppRouter } from "./providers/router";
import { useActionEffect } from "@/shared/lib/hooks/useActionEffect/useActionEffect";
import { AppLoader } from "@/widgets/AppLoader";
import { ToggleFeatures } from "@/shared/lib/features";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout";
import { useAppToolbar } from "./lib/useAppToolbar";
import { withTheme } from "./providers/ThemeProvider/ui/ThemeProvider";

const App = memo(() => {
    const initialized = useUserInitialized();
    const toolbar = useAppToolbar();

    useActionEffect(initializeAuthData, !initialized);

    return initialized ? (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div className="app" id="app">
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
                <div className="app_redesigned" id="app">
                    <Suspense fallback={<AppLoaderLayout />}>
                        <MainLayout
                            content={<AppRouter />}
                            header={<Navbar />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
        />
    ) : (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <div className="app" id="app">
                    <AppLoader />
                </div>
            }
            on={
                <div className="app_redesigned" id="app">
                    <AppLoaderLayout />
                </div>
            }
        />
    );
});

export default withTheme(App);
