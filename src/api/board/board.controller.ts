import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardRequest } from './dto/board.request';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  createBoard(@Body() inputBoard: BoardRequest) {
    return this.boardService.addBoard(inputBoard);
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: number) {
    return this.boardService.deleteBoard(id);
  }
}
