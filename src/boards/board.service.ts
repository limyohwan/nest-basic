import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
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
