import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetController {
  constructor(private repository: PetRepository) { }

  async criaPet(req: Request, res: Response): Promise<void> {
    const { nome, especie, dataDeNascimento, adotado, porte } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      res.status(400).json({ error: "Especie inválida" });
      return;
    }

    if (porte && !(porte in EnumPorte)) { // outra forma de testar Enum's
      res.status(400).json({ error: "Porte inválido" });
      return;
    }

    const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);
    const criaPet = await this.repository.criaPet(novoPet);
    res.status(201).json(novoPet);
  }

  async listaPet(req: Request, res: Response): Promise<void> {
    const listaDePets = await this.repository.listaPet();
    res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    );

    if (!success) {
      res.status(404).json({ message });
    }
    res.sendStatus(204);
  }

  async deletaPet(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      res.status(404).json({ message });
    }
    res.sendStatus(204);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, adotante_id } = req.params;

    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    );

    if (!success) {
      res.status(404).json({ message });
    }

    res.sendStatus(204);
  }

  async buscaPetPeloPorte(req: Request, res: Response) {
    const { porte } = req.query;
    const listaDePets = await this.repository.buscaPetPeloPorte(porte as EnumPorte);
    res.status(200).json(listaDePets);
  }

}
