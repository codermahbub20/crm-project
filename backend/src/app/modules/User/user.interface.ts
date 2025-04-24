/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  name: string;
  id?: string;

  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isUserBlocked(userEmail: string): Promise<TUser | null>;
  isUserExistByEmail(email: string): Promise<TUser | null>;
}

export type TUserRole = keyof typeof USER_ROLE;
