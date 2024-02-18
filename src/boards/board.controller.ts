import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardController {
    // boardService: BoardService;
    // constructor(boardService: BoardService) {
    //     this.boardService = boardService;
    // }

    constructor(private boardService: BoardService) {} // 접근 제한자(public, protected, private)를 생성자(constructor) 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됨
    
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        // @Body() body, // 모든 바디값이 들어감
        // @Body('title') title: string,
        // @Body('description') description: string
        @Body() createBoardDto: CreateBoardDto
    ): Promise<Board> {
        return this.boardService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(
        @Param('id') id: number
    ): Promise<Board> {
        return this.boardService.getBoardById(id);
    }



    // 인메모리용 소스코드
    // @Get()
    // getAllBoards(): Board[] {
    //     return this.boardService.getAllBoards();
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     // @Body() body, // 모든 바디값이 들어감
    //     // @Body('title') title: string,
    //     // @Body('description') description: string
    //     @Body() createBoardDto: CreateBoardDto
    // ): Board {
    //     return this.boardService.createBoard(createBoardDto);
    // }

    // @Get('/:id')
    // getBoardById(
    //     @Param('id') id: string
    // ): Board {
    //     return this.boardService.getBoardById(id);
    // }

    // @Delete('/:id')
    // deleteBoard(
    //     @Param('id') id: string
    // ): void {
    //     this.boardService.deleteBoard(id)
    // }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ): Board {
    //     return this.boardService.updateBoardStatus(id, status);
    // }
}
