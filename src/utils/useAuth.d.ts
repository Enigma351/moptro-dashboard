export type AuthUser = {
    id: string;
    name: string;
    email: string;
};
export declare function useAuth(): {
    user: AuthUser | null;
    loading: boolean;
};
