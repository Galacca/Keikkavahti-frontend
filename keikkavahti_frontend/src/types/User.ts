export type UserState = {
    //user: { [id: string]: User };
    user: User
};

type User = {
    id: string,
    name: string,
    token: string
}

export default User