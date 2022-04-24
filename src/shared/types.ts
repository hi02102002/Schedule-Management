export interface IUser {
   id: number;
   roles: string[];
   accessToken: string;
   tokenType: string;
   userName: string;
   fullName: string;
}

export interface IRes<T> {
   status: string;
   message: string;
   data: T;
}
