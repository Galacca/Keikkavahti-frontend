export type UserState = {
  user: User;
};

type User = {
  id: string;
  name: string;
  token: string;
};

export default User;
