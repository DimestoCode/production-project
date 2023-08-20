import { Loader } from "@/shared/ui/deprecated/Loader";

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
