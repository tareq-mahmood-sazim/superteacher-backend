## Installation

Make sure you have `nvm` installed. Then, run the following commands:

```bash
$ nvm use
```

We use Node v20 by default.

```bash
$ yarn install
```
## Environment Variables
For local development and testing, please create the following files at the root of the project directory:

- `env.development.local`
- `env.test.local`

You can follow `env.example` to specify which env variables are needed for the project as a guideline, and the above two files can be created based off of this file.


## Conventions

### ORM
We use Mikro ORM. Please go through [the docs](https://mikro-orm.io/docs/fundamentals) as this ORM has a slight learning curve. But it's the best Node ORM out there that we could find.

### Separation of Concerns
- There should be four layers of separation:
    - Controller
    - Service
    - Repository
    - Serializer

### Entities
- Mikro ORM entities go to the `common/entities` folder.
- Each entity must extend from `BaseEntity` defined in `src/common/entities/base.entity.ts`

### Repositories
- Repositories extending from MikroORM's `EntityRepository` should be prefixed with `Custom`. They should be put in the `common` folder as they can be shared across the application. They support basic CRUD operations like `findOne` and `findAll`. See the `src/common/repositories` folder.
- You can create your own repositories per module that make use of the custom repositories in the `common` folder and do stuff like `create`, `update` and `delete`.

### Serialization
- Please extend your serializer class from `AbstractBaseSerializer` and specify the serialization options. We use MikroORM's `serializer` function under the hood, as it works the best with MikroORM's entities. Read the docs for a better understanding on how Mikro's serialization works.

### Tests
- If you create any helper functions, please write unit tests for them.
- E2E tests are mandatory.
- Service and controller unit tests are optional but highly encouraged.

## Localstack

We depend on localstack for local development to test out our integration with the S3 object storage. To set it up, make sure that your machine has:

- [Docker](https://docs.docker.com/desktop/)
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Now, you have to configure an AWS profile. Run the following command and enter dummy values for access key id and secret:

```bash
aws configure --profile localstack_dev

AWS Access Key ID []: foo 
AWS Secret Access Key []: bar
Default region name []: us-east-1
Default output format []: json

```

Next, make sure your localstack instance is running via `docker compose`

```bash
docker compose -f ./docker-compose.localstack.yml up
```

Next, you need to create the S3 bucket
```bash
AWS_PROFILE=localstack_dev aws --endpoint-url=http://localhost:4566 s3api create-bucket --bucket project-dev-bucket
```

Verify that the bucket was created using:

```bash
AWS_PROFILE=localstack_dev aws --endpoint-url=http://localhost:4566 s3api list-buckets
```

You should see this output:

```
{
    "Buckets": [
        {
            "Name": "project-dev-bucket",
            "CreationDate": "2024-01-04T15:56:22+00:00"
        }
    ],
    "Owner": {
        "DisplayName": "webfile",
        "ID": "75aa57f09aa0c8caeab4f8c24e99d10f8e7faeebf76c078efc7c6caea54ba06a"
    }
}
```


## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

When using localstack, please explicitly set your `AWS_PROFILE` variable in your shell configuration file, or write all commands like the following:

```
AWS_PROFILE=localstack_dev yarn run start:dev 
```

## Database Migrations

```bash
# Drop all tables, run all migrations, seed the db
$ yarn run db:migration:fresh:dev

# Drop all tables, run all migrations, doesn't seed the db
$ yarn run db:migration:fresh:test 

# Migrate up to latest
$ yarn run db:migration:up

# Migrate down by one
$ yarn run db:migration:down

# Create a new migration file (requires --name) (use --blank to skip autogeneration)
$ yarn run db:migration:create

# Seed database with dev variables and DatabaseSeeder
$ yarn run db:seed:dev

# Run all migrations and seeding with test variables
$ yarn run db:migration:test
```

## Commit Convention
``subject(ticket-code): message``

Valid subjects:
``build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test``

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
