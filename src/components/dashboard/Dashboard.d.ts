type AuthUser = {
    id: string;
    name: string;
    email: string;
};
export default function Dashboard({ user, }: {
    user: AuthUser;
}): import("react/jsx-runtime").JSX.Element;
export {};
