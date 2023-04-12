import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import { Car } from "../../../common/tables/car";
import { CoopMember } from "../../../common/tables/coop-member";
import { Parking } from "../../../common/tables/parking";
import { Reservation } from "../../../common/tables/reservation";
import { Share } from "../../../common/other/share";
import * as pg from "pg";
import Types from "../types";
import { STATUS_CODES } from "http";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService)
    private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get(
      "/members/:name?",
      async (req: Request, res: Response, _: NextFunction) => {
        try {
          let members: CoopMember[] = [];
          let filter = req.params.name;
          if (!req.params.name) {
            filter = "";
          }
          const drivers = req.query.drivers;
          if (drivers === "true") {
            const driversMembers =
              await this.databaseService.getDriverMembers();
            res.json(driversMembers.rows as CoopMember[]);
          } else {
            const resultMembers = await this.databaseService.getMembersWithName(
              filter
            );
            members = resultMembers.rows as CoopMember[];
            const detailsPromises = members.map(async (member: CoopMember) => {
              const resultMemberShip =
                await this.databaseService.getAnnualMemberShipById(
                  member.idmember
                );
              member.annualmembership = resultMemberShip.rows[0]
                ?.annualmembership as number | null;
              const resultShares = await this.databaseService.getSharesById(
                member.idmember
              );
              member.shares = resultShares.rows as Share[];
            });
            await Promise.all(detailsPromises);
            res.json(members);
          }
        } catch (e) {
          console.error(e.stack);
        }
      }
    );

    router.get(
      "/parkings/name",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getAllParkingNames()
          .then((result: pg.QueryResult) => {
            res.json(result.rows as Parking[]);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get(
      "/cars/free?",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getFreeCars(
            req.query.location as string,
            req.query.periodStart as string,
            req.query.periodEnd as string
          )
          .then((result: pg.QueryResult) => {
            res.json(result.rows as Car[]);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.post(
      "/reservation",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .postReservation(req.body)
          .then(() => {
            res.send(STATUS_CODES.NO_CONTENT);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    router.get(
      "/reservations/",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getReservations()
          .then((result: pg.QueryResult) => {
            res.json(result.rows as Reservation[]);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
