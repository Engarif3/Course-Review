/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  username: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'user' | 'admin';
  createdAt?: string;
  updatedAt?: string;
  passwordHistory: string[];
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByUserName(id: string): Promise<TUser>;
  isUserExistsByUserEmail(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
