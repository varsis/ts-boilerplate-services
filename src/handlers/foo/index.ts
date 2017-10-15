import * as Express from 'express'
import * as HttpStatusCodes from 'http-status-codes'
import {
  BodyParams,
  Controller,
  Delete,
  Get,
  Patch,
  PathParams,
  Post,
  QueryParams,
  Res,
} from 'ts-express-decorators'
import { FooService } from '../../services'
import { FooResponse, PagedResponse, FooCreateRequest, FooUpdateRequest } from '../../interfaces'

@Controller('/foo')
export class FooHandler {

  constructor(private fooService: FooService){}

  @Get('/')
  public async list (
    @QueryParams('pageNumber') pageNumber: number = 0,
    @QueryParams('pageSize') pageSize: number = 20,
  ): Promise<PagedResponse<FooResponse>> {
      return {
        data: (await this.fooService.list(pageNumber, pageSize)),
        pageNumber,
        pageSize,
      }
  }

  @Get('/:id')
  public get (
    @PathParams('id') id: string,
  ): Promise<FooResponse> {
    return this.fooService.get(id)
  }

  @Post('/')
  public create (
    @BodyParams() foo: FooCreateRequest,
  ): Promise<FooResponse> {
    return this.fooService.create(foo)
  }

  @Patch('/:id')
  public update(
    @PathParams('id') id: string,
    @BodyParams() foo: FooUpdateRequest,
  ): Promise<FooResponse> {
    return this.fooService.update(id, foo)
  }

  @Delete('/:id')
  public delete(
    @PathParams('id') id: string,
  ): Promise<void> { // TODO Type of response
    return this.fooService.delete(id)
  }
}
