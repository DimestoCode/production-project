import React, { Component, ErrorInfo, ReactNode } from "react";
import { PageError } from "@/widgets/PageError/ui/PageError";

interface IErrorBoundaryProps {
    children?: ReactNode;
}

interface IErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props: IErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    public static getDerivedStateFromError(): IErrorBoundaryState {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <PageError />;
        }

        return children;
    }
}

export { ErrorBoundary };
