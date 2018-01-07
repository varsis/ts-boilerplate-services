import { Service } from 'ts-express-decorators'
import { EntityFactory } from '../../entity/factory'
import { User } from '../../entity/User'
import { UserNotFound } from '../../errors'
import { IUserCreateRequest, IUserUpdateRequest } from '../../interfaces'

@Service()
export class UserService {
  public user: typeof User
  constructor(
    private entities: EntityFactory,
  ) {
    this.user = entities.User
  }

  public async create(user: IUserCreateRequest): Promise<User> {
    const createUser = this.user.create(user)
    return createUser.save()
  }
  public async update(id: string, userUpdate: IUserUpdateRequest): Promise<User> {
    const user = await this.get(id)
    await this.user.updateById(id, userUpdate)
    const updatedUser = await this.get(id)
    return updatedUser
  }
  public async list(pageNumber: number, pageSize: number): Promise<User[]> {
    return this.user.find({
      take: pageSize,
      skip: pageNumber * pageSize,
    })
  }
  public async delete(id: string): Promise<void> {
    await (await this.get(id)).remove()
  }
  public async get(id: string): Promise<User> {
    const user = await this.user.findOneById(id)
    if (!user) throw new UserNotFound()
    return user
  }
}
