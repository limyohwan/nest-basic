import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardController } from './board.controller';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    AuthModule
  ],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository]
})
export class BoardModule {}
