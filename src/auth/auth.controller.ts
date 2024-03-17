import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    signup(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signup(authCredentialDto);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signin(authCredentialDto);
    }

    //middleware = 1.Pipes(유효성검증) 2.Filters(오류처리) 3.Guards(인증) 4.Interceptors(응답 매핑 및 캐시관리, 요청 로깅)
    //요청순서 middleware -> guard -> interceptor(before) -> pipe -> controller -> service -> interceptor(after) -> filter(if applicable) -> client 
    @Post('/test')
    test(@Req() req) {
        console.log(req)
    }

    @Post('/auth-test')
    @UseGuards(AuthGuard())
    authTest(@Req() req) {
        console.log(req)
    }
    
}
