const {Client}=require('pg')

const client =new Client({
  host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '22051995',
    database: 'Courses'

})

client.connect()
module.exports=client;