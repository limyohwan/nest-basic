import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from './board-status.enum';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }


    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardRepository.createBoard(createBoardDto);
    }

    async getBoardById(id: number): Promise<Board> {
        const foundBoard = await this.boardRepository.findOneBy({id});

        if (!foundBoard) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return foundBoard
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const foundBoard = await this.getBoardById(id);
        
        foundBoard.status = status;
        this.boardRepository.save(foundBoard);

        return foundBoard;
    }

    // 인메모리용 소스코드
    // private boards: Board[] = []

    // getAllBoards(): Board[] {
    //     return this.boards;
    // }

    // createBoard(createBoardDto: CreateBoardDto) {
    //     // const title = createBoardDto.title;
    //     // const {title, description} = createBoardDto;

    //     const board: Board = {
    //         id: uuid(),
    //         title: createBoardDto.title, // title: title => 타입명과 매개변수명이 동일하면 생략가능
    //         description: createBoardDto.description,
    //         status: BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    // getBoardById(id: string): Board {
    //     const foundBoard = this.boards.find((board) => board.id === id);

    //     if (!foundBoard) {
    //         throw new NotFoundException(`Can't find Board with id ${id}`);
    //     }

    //     return foundBoard;
    // }

    // deleteBoard(id: string): void {
    //     const foundBoard = this.getBoardById(id);
        
    //     this.boards = this.boards.filter((board) => board.id !== foundBoard.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}
