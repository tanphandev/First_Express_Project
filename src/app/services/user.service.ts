import { User } from "../../entities/user.entity";
import { dataSource } from "../../config/database/dataSource";
import { validate } from "class-validator";

class UserService {
  constructor(private userRepository = dataSource.getRepository(User)) {}
  async get(): Promise<User[] | null> {
    try {
      return await this.userRepository.find({});
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async findOneUserbyEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: email,
        },
        select: ["id", "password"],
      });
      if (user) {
        return user;
      }
      return null;
    } catch (e: any) {
      throw e;
    }
  }

  async createNewUser(newUser: User) {
    try {
      return await this.userRepository.save(newUser);
    } catch (e: any) {
      throw e;
    }
  }
}

export default UserService;
