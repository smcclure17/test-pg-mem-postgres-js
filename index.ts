import { newDb } from "pg-mem"

const main = async () => {
    const db = newDb();
    const sql = db.adapters.createPostgresJsTag() as import('postgres').Sql;

    await sql`create table test(name text)`;
    await sql`insert into test values ('Alice'), ('Bob')`;

    const pattern = 'A%';
    const results = [...await sql`select * from test where name like ${pattern}`];
    console.log(results); // [{    name: "Alice",   }]

}

main().catch(e => { console.error(e) })
