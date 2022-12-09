import { User, UserModel } from './user.model';

// Create New User
export function createUser(user: Partial<User>) {
  return UserModel.create(user);
}
// Find User By instagramId
export async function findUserByInstagramId(instagramId: User['instagramId']) {
  return UserModel.findOne({ instagramId });
}

// Find User By id
export async function findUserById(id: string) {
  return UserModel.findOne({ id });
}
