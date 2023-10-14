import { dataSource } from "../../../ormconfig";
import { User } from "../../entities/user.entity";

class AuthService {
  constructor(private userRepository = dataSource.getRepository(User)) {}
}
