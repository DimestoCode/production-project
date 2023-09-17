export interface ILoginState {
    username: string;
    password: string;
    isLoading: boolean;
    error?: string;
}

export interface ILoginProps {
    error?: string;
    password: string;
    username: string;
    onChangePassword: (value: string) => void;
    onChangeUsername: (value: string) => void;
    onLoginClick: () => void;
    isLoading: boolean;
}
