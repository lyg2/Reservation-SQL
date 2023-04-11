import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import { Car } from '../../../common/tables/car'
import {CoopMember} from '../../../common/tables/coop-member';
import { Parking } from '../../../common/tables/parking'
import {Reservation} from '../../../common/tables/reservation';
import {Share} from '../../../common/communication/share';
import * as pg from "pg";
import Types from "../types";
import { STATUS_CODES } from "http";
// import { StatusCodes } from "http-status-codes";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/members/:name?", async (req: Request, res: Response, _: NextFunction) => {
      // console.log('members');
      try {
        let members: CoopMember []=[];
        let filter = req.params.name;
        if(!req.params.name) {
          filter='';
        }
        const resultMembers = await this.databaseService.getMembersWithName(filter);
        members = resultMembers.rows as CoopMember [];
        const detailsPromises =members.map(async (member: CoopMember)=>{
          const resultMemberShip= await this.databaseService.getAnnualMemberShipById(member.idmember);
          member.annualmembership = resultMemberShip.rows[0]?.annualmembership as number|null;
          const resultShares = await this.databaseService.getSharesById(member.idmember);
          member.shares = resultShares.rows as Share [];
      });
      await Promise.all(detailsPromises);
      console.log(members);
      res.json(members);

      }
      catch (e) {
        console.error(e.stack);
      }
      
      });

      router.get("/members/drivers", (req: Request, res: Response, _: NextFunction) => {
        // console.log('members');
          this.databaseService
          .getDriverMembers()
          .then((result: pg.QueryResult) => {
            res.json(result.rows as CoopMember[]);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
        });

      router.get("/parkings/name", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getAllParkingNames()
        .then((result: pg.QueryResult) => {
          // console.log(result.rows as Parking[]);
          res.json(result.rows as Parking[]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });;
      });

      router.get("/cars/:name", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getCarsByParkingName(req.params.name)
        .then((result: pg.QueryResult) => {
          res.json(result.rows as Car[]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });;
      });

      router.get("/cars/:location/:firstPeriod/:secondPeriod", (req: Request, res: Response, _: NextFunction) => {
        // console.log('test1');
        // console.log(req.params.firstPeriod);
        this.databaseService
        .getFreeCars(req.params.location, req.params.firstPeriod, req.params.secondPeriod)
        .then((result: pg.QueryResult) => {
          res.json(result.rows as Car[]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });;
      });

      router.post("/reservation", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .postReservation(req.body)
        .then(() => {
          res.send(STATUS_CODES.NO_CONTENT);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });;
      });

    router.get("/reservations/", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getReservations()
        .then((result: pg.QueryResult) => {
          res.json(result.rows as Reservation[]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });

      });
    
      router.get("/reservations/:licensePlate", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getReservationsByLicensePlate(req.params.licensePlate)
        .then((result: pg.QueryResult) => {
          res.json(result.rows as Reservation[]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      });

      router.post("/cars/free", (req: Request, res: Response, _: NextFunction) => {
        // console.log(req.body);
        this.databaseService
        .getFreeCars(req.body.location, req.body.firstPeriod, req.body.secondPeriod)
        .then((result: pg.QueryResult) => {
          res.json(result.rows as Car[]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });;
      });

    return router;
  }
}
