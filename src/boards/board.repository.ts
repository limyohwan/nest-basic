import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { BoardStatus } from "./board-status.enum";
import { Board } from "./board.entity";
import { CreateBoardDto } from "./dto/create-board.dto";

@Injectable()
export class BoardRepository extends Repository<Board> {
    constructor(dataSource: DataSource) {
        super(Board, dataSource.createEntityManager());
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        const savedBoard = await this.save(
            this.create({
                title: createBoardDto.title, // title: title => 타입명과 매개변수명이 동일하면 생략가능
                description: createBoardDto.description,
                status: BoardStatus.PUBLIC
            })
        );

        return savedBoard;
    }
}