// adotanteRouter.ts
import express, { Request, Response } from "express";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { AppDataSource } from "../config/dataSource";

const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req: Request, res: Response) => adotanteController.criaAdotante(req, res));

router.get("/", (req: Request, res: Response) => adotanteController.listaAdotantes(req, res));

router.put("/:id", (req: Request, res: Response) => adotanteController.atualizaAdotante(req, res));

router.delete("/:id", (req: Request, res: Response) => adotanteController.deletaAdotante(req, res));

router.patch("/:id", (req: Request, res: Response) => adotanteController.atualizaenderecoadotante(req, res));


export default router;