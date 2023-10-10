import { User } from "../../entities/user.entity";
import { dataSource } from "../../config/database/dataSource";

class UserService {
  constructor(private userRepository = dataSource.getRepository(User)) {}
  async get(): Promise<User[] | null> {
    try {
      return await this.userRepository.find({});
    } catch (e: any) {
      console.log("error", e);
      throw new Error(e);
    }
  }

  async getOneBy(id: number): Promise<User | null> {
    try {
      return await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
    } catch (e: any) {
      console.log("error", e);
      throw new Error(e);
    }
  }

  //   public async add(data: any): Promise<User> {
  //     try {
  //       return;
  //     } catch (e: any) {
  //       throw new Error(e);
  //     }
  //   }
}

export default UserService;
