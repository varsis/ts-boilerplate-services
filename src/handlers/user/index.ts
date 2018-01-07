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
import { UserResponse, UserUpdateRequest, PagedUserResponse, PagedResponse, UserCreateRequest } from '../../models'
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
  ): Promise<PagedResponse<UserResponse>> {
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
  ): Promise<UserResponse> {
    return this.userService.get(id)
  }

  @Post('/')
  @Security('APIKeyHeader')
  @Status(HttpStatusCodes.CREATED)
  public create (
    @Required()
    @BodyParams() user: UserCreateRequest,
  ): Promise<UserResponse> {
    return this.userService.create(user)
  }

  @Patch('/:id')
  @Security('APIKeyHeader')
  public update(
    @Required()
    @PathParams('id') id: string,
    @Required()
    @BodyParams() user: UserUpdateRequest,
  ): Promise<UserResponse> {
    return this.userService.update(id, user)
  }

  @Delete('/:id')
  @Security('APIKeyHeader')
  @Status(HttpStatusCodes.NO_CONTENT)
  public delete(
    @Required()
    @PathParams('id') id: string,
  ): Promise<void> { // TODO Type of response
    return this.userService.delete(id)
  }
}
