import { Service } from 'ts-express-decorators'
import { AutoIncrement, AllowNull, PrimaryKey, Table, Column, Unique, Model, DataType } from 'sequelize-typescript'

@Table({
  timestamps: true,
})
export class Foo extends Model<Foo> {

  // This can be done in a few ways
  /*
   * @Column({
   *  type: DataTypes.INTEGER,
   *  primaryKey: true,
   *  autoIncrement: true,
   *  allowNull: false,
   * })
   */

  // Or as below, using helper decorators
  // Type is inferenced see docs for details
  @AutoIncrement
  @PrimaryKey
  @AllowNull(false)
  @Column
  sequentialId: number

  @Unique
  @AllowNull(false)
  @Column(DataType.UUIDV4)
  id: string

  @Column
  bar: string
}
