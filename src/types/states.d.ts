interface ICommonState {
  isLoading: boolean;
  error: any;
}

interface IAuthState extends ICommonState {
  user: IUser | undefined;
}

interface IRootState {
  auth: IAuthState;
}
