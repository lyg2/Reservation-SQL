import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import {CoopMember} from '../../../common/tables/coop-member';
import {Reservation} from '../../../common/tables/reservation';
import * as pg from "pg";
import Types from "../types";
import { StatusCodes } from "http-status-codes";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/members/", (req: Request, res: Response, _: NextFunction) => {
      console.log('members');
        this.databaseService
        .getAllMembers()
        .then((result: pg.QueryResult) => {
          const coopMembers: CoopMember[] = result.rows.map((coopMember: CoopMember) => ({
            idmember: coopMember.idmember,
            idbankaccount: coopMember.idbankaccount,
            membername: coopMember.membername,
            preferredparking: coopMember.preferredparking,
            memberpassword: coopMember.memberpassword,
            licenseno: coopMember.licenseno,
            entitytype :coopMember.entitytype,
            birthdate: coopMember.birthdate,
            lastaccidentdate: coopMember.lastaccidentdate,
            mailingaddress: coopMember.mailingaddress,
            email: coopMember.email,
            annualmembership : coopMember.annualmembership,
          } as CoopMember));
          console.log(coopMembers);
          res.json(coopMembers);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });

      });
      router.get("/members/:name?", (req: Request, res: Response, _: NextFunction) => {
        console.log(req.params.name);
          this.databaseService
          .getMembersWithName(req.params.name)
          .then((result: pg.QueryResult) => {
            const coopMembers: CoopMember[] = result.rows.map((coopMember: CoopMember) => ({
              idmember: coopMember.idmember,
              idbankaccount: coopMember.idbankaccount,
              membername: coopMember.membername,
              preferredparking: coopMember.preferredparking,
              memberpassword: coopMember.memberpassword,
              licenseno: coopMember.licenseno,
              entitytype :coopMember.entitytype,
              birthdate: coopMember.birthdate,
              lastaccidentdate: coopMember.lastaccidentdate,
              mailingaddress: coopMember.mailingaddress,
              email: coopMember.email,
              annualmembership : coopMember.annualmembership,
            } as CoopMember));
            console.log(coopMembers);
            res.json(coopMembers);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
  
        });

    router.get("/reservations/", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getReservations()
        .then((result: pg.QueryResult) => {
          const reservations: Reservation[] = result.rows.map((reservation: Reservation) => ({
            reservedperiod : reservation.reservedperiod,
            idmember : reservation.idmember,
            licenseplate: reservation.licenseplate,
            requirements : reservation.requirements,
            idbill : reservation.idbill,
            fee : reservation.fee,
            odometerstart : reservation.odometerstart,
            odometerend : reservation.odometerend,
          } as Reservation));
          res.json(reservations);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });

      });

      router.post("/login/", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getIdPassword(req.body.idmember, req.body.memberpassword)
        .then((result: pg.QueryResult) => {
          if(result.rows.length===1) {
            res.status(StatusCodes.OK).json();
          }
          else {
            console.log('test');
            res.status(StatusCodes.FORBIDDEN).json();
          }
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
        });

      });

    return router;

    
  }
}
