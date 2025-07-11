import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Reservation } from "../../../common/tables/reservation";

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
    const queryText: string = `SELECT * FROM CARSHARING_DB.CoopMember;`
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getMembersWithName(memberName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM CARSHARING_DB.CoopMember WHERE LOWER(memberName) LIKE $1 ;`
    const pattern: string [] = [`%${memberName}%`];
    const res = await client.query(queryText, pattern);
    client.release();
    return res;
  }

  async getAnnualMemberShipById(id: string) :Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const condition = `idMember = $1`;
    const queryText: string = `SELECT annualMemberShip FROM CARSHARING_DB.CarShareMember WHERE ${condition};`
    const values: string [] = [id];
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  async getSharesById(id: string) :Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const condition = `idMember = $1`;
    const queryText: string = `SELECT individualSum FROM CARSHARING_DB.CoopShare WHERE ${condition};`
    const values: string [] = [id];
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  async getDriverMembers():  Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM CARSHARING_DB.CoopMember WHERE licenseNo IS NOT NULL ;`;
    const res = await client.query(queryText);
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
    client.release();
    return res;
  }

  async getFreeCars(location: string, firstPeriod: string, secondPeriod: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const values = [location, firstPeriod,secondPeriod];
    let  queryText: string = `SET search_path TO CARSHARING_DB;`;
    await client.query(queryText);
    queryText = `SELECT DISTINCT Car.* 
    FROM Car
    WHERE parkingName = $1 AND 
    (licensePlate NOT IN (SELECT Reservation.licensePlate FROM Reservation NATURAL JOIN Car WHERE parkingName = $1) 
    OR licensePlate NOT IN (
      SELECT licensePlate FROM Reservation NATURAL JOIN Car WHERE parkingName = $1 
      AND ($2 <= (Reservation.reservedPeriod).periodStart AND $3 >= (Reservation.reservedPeriod).periodEnd) 
      OR ($2 <= (Reservation.reservedPeriod).periodStart AND $3 > (Reservation.reservedPeriod).periodStart)
      OR ($2 < (Reservation.reservedPeriod).periodEnd AND $3 >= (Reservation.reservedPeriod).periodEnd))
    );`
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  async postReservation(reservation: Reservation): Promise<void> {
    let requirements = reservation.requirements;
    if(requirements) {
      requirements=requirements.replace("'", "''");
    }
    const client = await this.pool.connect();
    const queryText: string = `SET search_path TO CARSHARING_DB;
    INSERT INTO Reservation(reservedPeriod, idMember, licensePlate, requirements)
    VALUES(${reservation.reservedperiod}, ${reservation.idmember}, '${reservation.licenseplate}', '${reservation.requirements}');`
    await client.query(queryText);
    client.release();
  }
}
