const dir = process.env.NODE_ENV === 'build' ? 'dist' : 'src'
const extension = process.env.NODE_ENV === 'build' ? 'js' : 'ts'

module.exports = [
  {
    name: "default",
    type: "postgres",
    host: "postgresDB",
    port: `${process.env.POSTGRES_PORT}`,
    username: `${process.env.POSTGRES_USER}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    database: `${process.env.NODE_ENV === 'test' ? 'testsDatabase' : 'WhyHome'}`,
    entities: [
      `./${dir}/**/infra/typeorm/entities/*.${extension}`
    ],
    migrations: [
      `./${dir}/shared/infra/typeorm/migrations/*.${extension}`
    ],
    cli: {
      "migrationsDir": `./${dir}/shared/infra/typeorm/migrations`
    }
  },
  {
    name: "mongo",
    type: "mongodb",
    host: "mongoDB",
    port: `${process.env.MONGODB_PORT}`,
    database: `${process.env.MONGODB_DATABASE}`,
    useUnifiedTopology: true,
    entities: [
      `./${dir}/**/infra/typeorm/schemas/*.${extension}`
    ]
  }
]
