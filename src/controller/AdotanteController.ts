import { Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) { }
  // AdotanteController.ts
  async criaAdotante(req: Request, res: Response): Promise<void> {
    try {
      const { nome, celular, endereco, foto, senha } = req.body;

      // Validações simples
      if (!nome || !senha) {
        res.status(400).json({ error: 'Nome e senha são obrigatórios' });
      }

      // Criação do novo adotante com os parâmetros corretos
      const novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

      await this.repository.criaAdotante(novoAdotante);
      res.status(201).json(novoAdotante);
    } catch (error) {
      console.error(error); // Log do erro para depuração
      res.status(500).json({ error: 'Erro ao criar o adotante' });
    }
  }

  async atualizaAdotante(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity
    );

    if (!success) {
      res.status(404).json({ message });
    }

    res.sendStatus(204);
  }

  async listaAdotantes(req: Request, res: Response) {
    const listaDeAdotantes = await this.repository.listaAdotantes();
    res.json(listaDeAdotantes);
  }

  async deletaAdotante(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id)
    );

    if (!success) {
      res.status(404).json({ message });
    }
    res.sendStatus(204);
  }

  async atualizaenderecoadotante(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaenderecoadotante(
      Number(id), req.body as EnderecoEntity
    );

    if (!success) {
      res.status(404).json({ message });
    }
    res.sendStatus(204);
  }


}