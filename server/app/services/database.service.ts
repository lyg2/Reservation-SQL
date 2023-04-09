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
    const queryText: string = `SELECT * FROM (CARSHARING_DB.CoopMember NATURAL LEFT JOIN CARSHARING_DB.CarShareMember) NATURAL LEFT JOIN CARSHARING_DB.ShareMember ;`;
    const res = await client.query(queryText);
    console.log(res);
    client.release();
    return res;
  }

  async getMembersWithName(memberName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM (CARSHARING_DB.CoopMember NATURAL LEFT JOIN CARSHARING_DB.CarShareMember) NATURAL LEFT JOIN CARSHARING_DB.ShareMember WHERE LOWER(memberName) LIKE $1 ;`
    const pattern: string [] = [`%${memberName}%`];
    const res = await client.query(queryText, pattern);
    client.release();
    return res;
  }

  async getAllParkingNames(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT parkingName FROM CARSHARING_DB.Parking;`
    const res = await client.query(queryText);
    client.release();
    return res;
  }
  
  async getReservations(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM CARSHARING_DB.Reservation ;`;
    const res = await client.query(queryText);
    console.log(res.rows);
    client.release();
    return res;
  }

  async getIdPassword(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT idMember, memberPassword  FROM CARSHARING_DB.CoopMember;`
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getAllCars(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT licensePlate, parkingName, modelName, brand FROM CARSHARING_DB.Car;`
    const res = await client.query(queryText);
    client.release();
    return res;
  }
}
