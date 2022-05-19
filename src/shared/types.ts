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

export interface IRoom {
   id: number;
   roomName: string;
   capacity: number;
}

export interface ICourse {
   courseName: string;
   schedule: '1' | '2' | '3';
   amount: number;
   roomid?: number;
   id: number;
   duration: number;
   isSchedule: boolean;
   createdDate?: string;
}

export interface ISchedule {
   capacity: number;
   id: number;
   lichChan: Array<ICourse>;
   lichLe: Array<ICourse>;
   roomName: string;
}
