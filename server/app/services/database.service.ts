import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";

@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4",
    password: "root",
    port: 5432,          // Attention ! Peut aussi être 5433 pour certains utilisateurs
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);

  async getAllMembers(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM CARSHARING_DB.CoopMember;`;
    const res = await client.query(queryText);
    console.log(res);
    client.release();
    return res;
  }

  async getMemberWithName(memberName: string) {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM CoopMember WHERE memberName = %${memberName}%;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }
}
