type User = {
    id?: string;
    name?: string;
    email?: string;
};
export default function ProfileCard({ user }: {
    user: User;
}): import("react/jsx-runtime").JSX.Element;
export {};
