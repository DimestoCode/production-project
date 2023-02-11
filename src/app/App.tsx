import { classNames } from "shared/lib/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/NavBar";
import "./styles/index.scss";

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames("app", { [theme]: true })}>
            <Navbar />
            <AppRouter />
        </div>
    );
};

export default App;
