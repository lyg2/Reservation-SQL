import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import {CoopMember} from '../../../common/tables/coop-member';
import * as pg from "pg";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/members/", (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
        .getAllMembers()
        .then((result: pg.QueryResult) => {
          const jardins: CoopMember[] = result.rows.map((coopMember: CoopMember) => ({
            idMember: coopMember.idMember,
            idBankAccount: coopMember.idBankAccount,
            memberName: coopMember.memberName,
            preferredParking: coopMember.preferredParking,
            memberPassword: coopMember.memberPassword,
            licenseNo: coopMember.licenseNo,
            entityType :coopMember.entityType,
            birthDate: coopMember.birthDate,
            lastAccidentDate: coopMember.lastAccidentDate,
            mailingAdress: coopMember.mailingAdress,
            email: coopMember.email,
            annualMembership : 0,
          } as CoopMember));
          res.json(jardins);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });

      });

    return router;

    
  }
}
