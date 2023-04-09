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

  async getReservationsByLicensePlate(licensePlate: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();

    const condition = "licensePlate = $1 AND (reservedPeriod).periodEnd > $2";
    const now = "NOW()"
    const values = [licensePlate, now];
    // Verity that we only take reservation for which have for which the the current date is after the reserved period.
    const queryText: string = `SELECT * FROM CARSHARING_DB.Reservation WHERE ${condition};`;
    const res = await client.query(queryText, values);
    console.log(res.rows);
    client.release();
    return res;
  }

  async getIdPassword(id: string, password: string): Promise<pg.QueryResult> {
    console.log(id);
    console.log(password);
    const condition = "idMember = $1 AND memberPassword = $2";
    const values = [id, password];
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM CARSHARING_DB.CoopMember WHERE ${condition};`
    const res = await client.query(queryText, values);
    console.log(res.rows);
    client.release();
    return res;
  }

  async getAllCars(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT licensePlate, parkingName, modelName, brand FROM CARSHARING_DB.Car;`
    // TODO: verify that cars are not already reserved
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getCarsByParkingName(parkingName : string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const condition = "parkingName = $1";
    const values = [parkingName]
    const queryText: string = `SELECT licensePlate, parkingName, modelName, brand FROM CARSHARING_DB.Car WHERE ${condition};`
    // TODO: verify that cars are not already reserved
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }
}
