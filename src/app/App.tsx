import { classNames } from "shared/lib/classNames";
import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
import { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useTheme } from "./providers/ThemeProvider";

import "./styles/index.scss";

const App = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames("app", { [theme]: true })}>
            <button onClick={toggleTheme}>Switch</button>
            <Link to="/">Main</Link>
            <Link to="/about">About</Link>
            <Suspense fallback={<div>LOading...</div>}>
                <Routes>
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/" element={<MainPage />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;
