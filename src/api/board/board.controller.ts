import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { BoardService } from './board.service';
import { BoardRequest } from './dto/board.request';
import { BoardResponse } from './dto/board.response';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Post()
  createBoard(@Body() inputBoard: BoardRequest) {
    return this.boardService.addBoard(inputBoard);
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: number) {
    return this.boardService.deleteBoard(id);
  }

  @Post('/related')
  async relatedBoard(@Body('content') content: string) {
    const result = await this.elasticsearchService.search({
      index: 'board',
      query: {
        match: {
          content: {
            query: content,
            cutoff_frequency: 0.04,
            minimum_should_match: 2,
          },
        },
      },
    });
    return result.hits.hits.map((ele) => {
      const temp = JSON.stringify(ele);
      const el = JSON.parse(temp);
      const board = new BoardResponse();
      board.id = el._source.id;
      board.content = el._source.content;
      board.title = el._source.title;

      return board;
    });
  }
}
