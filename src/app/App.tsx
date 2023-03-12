import { Suspense, useEffect } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Loader } from "widgets/Loader";
import { useDispatch } from "react-redux";
import { userActions } from "entities/User";
import { AppRouter } from "./providers/router";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.retrieveAuthDataFromStorage());
    }, [dispatch]);

    return (
        <div className={classNames("app")}>
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
