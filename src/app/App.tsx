import { Suspense } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Loader } from "widgets/Loader";
import { useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/router";

import "./styles/index.scss";

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames("app", { [theme]: true })}>
            <Suspense fallback={<Loader />}>
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
