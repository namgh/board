import { OmitType } from '@nestjs/mapped-types';
import { Board } from '../entities/board.entity';

export class BoardResponse extends OmitType(Board, ['deletedAt']) {}
