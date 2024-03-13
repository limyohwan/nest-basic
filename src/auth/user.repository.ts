import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
        const {username, password} = authCredentialDto;
        const user = this.create({username, password});
        
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException("Existing username");
            }

            throw new InternalServerErrorException();
        }
    }
}