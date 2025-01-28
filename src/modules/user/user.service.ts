import { User } from './user.model';

const getAllFromDB = async () => {
  const result = await User.find();
  return result;
};

export const userService = {
  getAllFromDB,
};
