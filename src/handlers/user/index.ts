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
  Status,
  QueryParams,
  Res,
  Required,
} from 'ts-express-decorators'
import { Returns, Schema, Security } from 'ts-express-decorators/swagger'
import { User, UserUpdateRequest, PagedUserResponse, PagedResponse, UserCreateRequest } from '../../models'
import { UserService } from '../../services/user/index'

@Controller('/user')
export class UserHandler {

  constructor(private userService: UserService){}

  @Get('/')
  @Security('APIKeyHeader')
  @Returns(PagedUserResponse)
  public async list (
    @QueryParams('pageNumber') pageNumber: number = 0,
    @QueryParams('pageSize') pageSize: number = 20,
  ): Promise<PagedResponse<User>> {
      return {
        data: (await this.userService.list(pageNumber, pageSize)),
        pageNumber,
        pageSize,
      }
  }

  @Get('/:id')
  @Security('APIKeyHeader')
  public get (
    @Required()
    @PathParams('id') id: string,
  ): Promise<User> {
    return this.userService.get(id)
  }

  @Post('/')
  @Security('APIKeyHeader')
  @Status(HttpStatusCodes.CREATED)
  public create (
    @Required()
    @BodyParams() user: UserCreateRequest,
  ): Promise<User> {
    return this.userService.create(user)
  }

  @Patch('/:id')
  @Security('APIKeyHeader')
  public update(
    @Required()
    @PathParams('id') id: string,
    @Required()
    @BodyParams() user: UserUpdateRequest,
  ): Promise<User> {
    return this.userService.update(id, user)
  }

  @Delete('/:id')
  @Security('APIKeyHeader')
  @Status(HttpStatusCodes.NO_CONTENT)
  public async delete(
    @Required()
    @PathParams('id') id: string,
  ): Promise<any> { // TODO Type of response
    await this.userService.delete(id)
    return null
  }
}
