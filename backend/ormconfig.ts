/*
Esse é o arquivo de configuração do TypeORM.
Aqui tem as variáveis de conexão com o banco de dados (desde a variável Type até a variável Database) 
bem como outras configurações possíveis para utilização da dependência.

Mais informações em: https://typeorm.io/#/using-ormconfig
*/

export default {
  /*
  As variávis usadas na conexão do banco são variáveis ambiente, feitas com o dotenv 
  
  Mais informações em: https://www.npmjs.com/package/dotenv
   */
  "type": process.env.TYPE,
  "host": process.env.HOST,
  "port": process.env.PORT,
  "username": process.env.USER,
  "password": process.env.PASSWORD,
  "database": process.env.DATABASE,
  "synchronize": false,
  "logging": true,
  //  Aqui é definido o repositório das entidades (arquivos que vão definir quais as tabelas, suas colunas e relacionamentos)
  "entities": [
    "./src/models/*.ts"
  ],
  // aqui é definido o repositório onde o TypeORM vai buscar as migrations para executá-las
  "migrations": [
     "./src/database/migrations/**/*.ts"
  ],
  // Aqui é definido o repositório onde o TypeORM vai criar automaticamente as migrations com a utilização de comando
  "cli": {
    "migrationsDir": "./src/database/migrations"
  },
  // Aqui é uma configuração para definir que Todas as tabelas terão esse prefixo em seus nomes
  "entityPrefix": [
    "inf_"
  ]
}