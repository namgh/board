import { Body, Controller, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardRequest } from './dto/board.request';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(@Body() inputBoard: BoardRequest) {
    return this.boardService.addBoard(inputBoard);
  }
}
