import User from 'src/user/entities/user.entity';

export interface IAccessUser {
  access_token: string;
  user: User;
}
