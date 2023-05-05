import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardRequest } from './dto/board.request';
import { BoardResponse } from './dto/board.response';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async addBoard(inputBoard: BoardRequest) {
    const board = await this.boardRepository.save({
      title: inputBoard.title,
      content: inputBoard.content,
    });
    const result = new BoardResponse();
    result.id = board.id;
    result.content = board.content;
    result.createdAt = board.createdAt;
    result.title = board.title;
    result.updatedAt = board.updatedAt;

    return result;
  }

  async deleteBoard(id: number) {
    const result = await this.boardRepository.softDelete({ id });
    return result.affected ? true : false;
  }
}
