import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import {CoopMember} from '../../../common/tables/coop-member';
import * as pg from 'pg';
import Types from '../types';
import { Parking } from '../../../common/tables/parking'

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
          const coopMember: CoopMember[] = result.rows.map((coopMember: CoopMember) => ({
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
          console.log(coopMember);
          res.json(coopMember);
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
          const coopMember: CoopMember[] = result.rows.map((coopMember: CoopMember) => ({
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
          console.log(coopMember);
          res.json(coopMember);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      });

      router.get("/parkings/name", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getAllParkingNames()
        .then((result: pg.QueryResult) => {
          console.log(result.rows as Parking[]);
          res.json(result.rows as Parking[]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });;
      });

    return router;    
  }
}
