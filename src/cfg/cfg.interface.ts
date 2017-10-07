// Define Config values here
export interface Config {
  // Server Port
  readonly PORT?: string

  // Database Config
  readonly DATABASE?: string
  readonly DATABASE_HOST?: string
  readonly DATABASE_USER?: string
  readonly DATABASE_PASSWORD?: string
  readonly DATABASE_DIALECT?: string

  readonly API_KEY?: string

  readonly HANDLER_DEFAULTS?: HandlerDefaults

  readonly DISABLE_SEQUELIZE_LOGGING?: boolean
}

export interface HandlerDefaults {
  readonly pageSize?: number
  readonly contentType?: string
}
