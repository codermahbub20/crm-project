import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/User/user.interface';
import { User } from '../modules/User/user.model';
import AppError from '../Errors/AppError';
import CatchAsync from '../utils/CatchAsync';
import { HttpStatus } from 'http-status-ts';

const auth = (...requiredRoles: TUserRole[]) => {
  return CatchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;

    // console.log(decoded);

    const { role, email } = decoded;
    // console.log(role, userEmail);

    //   checking if the user is exists
    const user = await User.isUserExistByEmail(email);
    console.log(user);

    if (!user) {
      throw new AppError(HttpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    // const isDeleted = user?.isDeleted;

    // if (isDeleted) {
    //   throw new AppError(HttpStatus.FORBIDDEN, 'This user is deleted !');
    // }

    // checking if the user is blocked
    const userStatus = user?.isBlocked;

    if (userStatus === true) {
      throw new AppError(HttpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    // decoded undefined
    req.user = decoded as JwtPayload;
  });
};

export default auth;
