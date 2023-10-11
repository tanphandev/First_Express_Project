import { dataSource } from "../../config/database/dataSource";
import { User } from "../../entities/user.entity";

class AuthService {
  constructor(private userRepository = dataSource.getRepository(User)) {}
  
}
