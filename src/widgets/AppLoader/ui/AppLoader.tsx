import { Loader } from "@/shared/ui/Loader";

export const AppLoader = () => {
    return (
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
    );
};
