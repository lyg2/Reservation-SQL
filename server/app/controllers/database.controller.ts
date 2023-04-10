import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import { DatabaseService } from "../services/database.service";
import { Car } from '../../../common/tables/car'
import {CoopMember} from '../../../common/tables/coop-member';
import { Parking } from '../../../common/tables/parking'
import {Reservation} from '../../../common/tables/reservation';
import * as pg from "pg";
import Types from "../types";
import { STATUS_CODES } from "http";
// import { StatusCodes } from "http-status-codes";

@injectable()
export class DatabaseController {
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    router.get("/members/", (req: Request, res: Response, _: NextFunction) => {
      // console.log('members');
        this.databaseService
        .getAllMembers()
        .then((result: pg.QueryResult) => {
          res.json(result.rows as CoopMember[]);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
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

      router.get("/members/:name", (req: Request, res: Response, _: NextFunction) => {
        // console.log(req.params.name);
          this.databaseService
          .getMembersWithName(req.params.name)
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

      // router.get("/cars", (req: Request, res: Response, _: NextFunction) => {
      //   this.databaseService
      //   .getAllCars()
      //   .then((result: pg.QueryResult) => {
      //     res.json(result.rows as Car[]);
      //   })
      //   .catch((e: Error) => {
      //     console.error(e.stack);
      //   });;
      // });

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
          res.send(STATUS_CODES.NO_CONTENT).json();
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

      // router.post("/login/", (req: Request, res: Response, _: NextFunction) => {
      //   this.databaseService
      //   .getIdPassword(req.body.idmember, req.body.memberpassword)
      //   .then((result: pg.QueryResult) => {
      //     if(result.rows.length===1) {
      //       res.status(StatusCodes.OK).json();
      //     }
      //     else {
      //       console.log('test');
      //       res.status(StatusCodes.FORBIDDEN).json();
      //     }
      //   })
      //   .catch((e: Error) => {
      //     console.error(e.stack);
      //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
      //   });

      // });

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
