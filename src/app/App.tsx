import { classNames } from "shared/lib/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";
import "./styles/index.scss";
import { Sidebar } from "widgets/Sidebar";
import { Suspense } from "react";

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames("app", { [theme]: true })}>
            <Suspense fallback="">
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
