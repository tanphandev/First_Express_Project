import { User } from "../../entities/user.entity";
import { dataSource } from "../../config/database/dataSource";
import { validate } from "class-validator";
import { DeleteResult, UpdateResult } from "typeorm";

class UserService {
  constructor(private userRepository = dataSource.getRepository(User)) {}

  async getAllUser(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({
        relations: ["posts", "articles", "comments"],
      });
      return users;
    } catch (e: any) {
      throw e;
    }
  }

  async getOneUserById(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        relations: ["posts", "articles", "comments"],
        where: {
          id,
        },
      });
      if (user) {
        return user;
      }
      return null;
    } catch (e: any) {
      throw e;
    }
  }

  async findOneUserbyEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email,
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

  async updateUser(id: string, username: string): Promise<UpdateResult> {
    try {
      return await this.userRepository.update(
        { id: id },
        {
          username: username,
        }
      );
    } catch (e: any) {
      throw e;
    }
  }

  async deleteUserById(id: string): Promise<DeleteResult> {
    try {
      return await this.userRepository.delete({
        id,
      });
    } catch (e: any) {
      throw e;
    }
  }
}

export default UserService;
