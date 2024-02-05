import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    // boardsService: BoardsService;
    // constructor(boardsService: BoardsService) {
    //     this.boardsService = boardsService;
    // }

    constructor(private boardsService: BoardsService) {} // 접근 제한자(public, protected, private)를 생성자(constructor) 파라미터에 선언하면 접근 제한자가 사용된 생성자 파라미터는 암묵적으로 클래스 프로퍼티로 선언됨
    
    @Get()
    getAllBoards() {
        return this.boardsService.getAllBoards();
    }

}
