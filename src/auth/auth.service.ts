import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signup(authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(authCredentialDto);
    }

    async signin(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        const {username, password} = authCredentialDto;
        const user = await this.userRepository.findOne({where : {username}});

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload = {username};
            const accessToken = await this.jwtService.sign(payload);
            
            return {accessToken};
        } else {
            throw new UnauthorizedException('login fail');
        } 
    }
}
