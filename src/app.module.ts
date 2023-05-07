import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './api/board/board.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BoardModule,
    ConfigModule.forRoot({ isGlobal: true }), //
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'my_mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'board',
      entities: [__dirname + '/api/**/*.entity.*'],
      synchronize: false,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
