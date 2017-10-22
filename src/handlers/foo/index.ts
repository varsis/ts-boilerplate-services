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
  Required,
} from 'ts-express-decorators'
import { Returns, Schema } from 'ts-express-decorators/swagger'
import { FooService } from '../../services'
import { FooResponse, FooCreateRequest, FooUpdateRequest, PagedFooResponse } from '../../models'
import { PagedResponse } from '../../models/paging'

@Controller('/foo')
export class FooHandler {

  constructor(private fooService: FooService){}

  @Get('/')
  @Returns(PagedFooResponse)
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
    @Required()
    @PathParams('id') id: string,
  ): Promise<FooResponse> {
    return this.fooService.get(id)
  }

  @Post('/')
  public create (
    @Required()
    @BodyParams() foo: FooCreateRequest,
  ): Promise<FooResponse> {
    return this.fooService.create(foo)
  }

  @Patch('/:id')
  public update(
    @Required()
    @PathParams('id') id: string,
    @Required()
    @BodyParams() foo: FooUpdateRequest,
  ): Promise<FooResponse> {
    return this.fooService.update(id, foo)
  }

  @Delete('/:id')
  public delete(
    @Required()
    @PathParams('id') id: string,
  ): Promise<void> { // TODO Type of response
    return this.fooService.delete(id)
  }
}
