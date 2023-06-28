# Prerequisites 
* `Node` -->  `v18.14.2` or later
* `Postgres`  --> `v3.3.5` or later


## Before starting application
After cloning the repository, run the following:

```shell
npm install
```

After installing all dependencies, next step is creating `.env` file for credentials

```shell
cp .env-example .env
```

#### Then fill the fields properly!


## Build application
```shell
npm build
```

## Starting application
#### NOTE: In order to get access to create new room you should be an admin. To insert admin's credentials, run following script:
```shell
npm run db:seed
```

During creation of rooms `request` should be sent with `Beaerer {yourToken}` auth token 

### Now you can start the application with the following script:
```shell
npm start
```

### In watch mode:
```shell
npm run start:dev
```

##### Please, check the logs, if the `[DataSource]` gives an error while initializing, open the `config.ts` file in `utils` folder and update the following with hard coded which fits you:
```ts
getDataSourceConfig(): DataSourceOptions {

        return {
            type: 'postgres' as any,
            host: process.env['DB_HOST'],
            port: parseInt(process.env['DB_PORT']),
            username: process.env['DB_USERNAME'],
            password: process.env['DB_PASSWORD'],
            database: process.env['DB_DATABASE'] || 'impactt',
            entities: [join(__dirname, `../**/entities/**.entity.{ts,js}`)],
            synchronize: true
        };
    
    }
```


### Remember:
##### `date` should be in format: `MM-yyyy-dd`

## Testing
```shell
npm run test:e2e
```
