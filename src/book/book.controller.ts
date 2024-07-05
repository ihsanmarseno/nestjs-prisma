import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Book } from './book.model';
import { BookService } from './book.service';
import { Response } from 'express';

@Controller('api/v1/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBook(@Res() response: Response): Promise<void> {
    const result = await this.bookService.getAllBook();
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully get data!',
      result: result,
    });
  }

  @Post()
  async postBook(
    @Body() postData: Book,
    @Res() response: Response,
  ): Promise<void> {
    await this.bookService.createBook(postData);
    response.status(201).json({
      status: 'Ok!',
      message: 'Successfully created data!',
    });
  }

  @Get(':id')
  async getBook(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.bookService.getBook(id);
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully get data!',
      result: result,
    });
  }

  @Delete(':id')
  async deleteBook(
    @Param('id') id: number,
    @Res() response: Response,
  ): Promise<void> {
    await this.bookService.deleteBook(id);
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully deleted data!',
    });
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() data: Book,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.bookService.updateBook(id, data);
    response.status(200).json({
      status: 'Ok!',
      message: 'Successfully updated data!',
      result: result,
    });
  }
}
