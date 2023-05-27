import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { getUserInitialized, userActions } from "@/entities/User";
import { Loader } from "@/shared/ui/Loader/Loader";
import { AppRouter } from "./providers/router";

const App = () => {
    const dispatch = useDispatch();
    const initialized = useSelector(getUserInitialized);

    useEffect(() => {
        dispatch(userActions.retrieveAuthDataFromStorage());
    }, [dispatch]);

    return (
        <div className={classNames("app")}>
            <Suspense fallback={<Loader />}>
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
