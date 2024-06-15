import { BadRequest } from '@feathersjs/errors';
import { Application, Params } from '@feathersjs/feathers';
import mysql from 'mysql2/promise';

export class RelatorioService {
    app: Application;
    pool: mysql.Pool;

    constructor(options: { app: Application }) {
        this.app = options.app;
        this.pool = mysql.createPool({
            // Configurações do banco de dados MySQL
            host: 'localhost',
            port: 3307,
            user: 'root',
            password: 'alunofatec',
            database: 'leased'
        });
    }

    async relatorioLocacoes(params: Params) {
        const dataInicio = params.query?.dataInicio
        const dataFim = params.query?.dataFim

        if (!dataInicio || !dataFim) {
            throw new BadRequest('Datas de início e fim são obrigatórias.');
        }

        const connection = await this.pool.getConnection();
        try {
            const [rows] = await connection.execute('CALL relatorio(?, ?)', [dataInicio, dataFim]);

            const relatorio = rows;

            return relatorio;
        } finally {
            connection.release();
        }
    }
}
//Exemplo rota de teste -> http://localhost:3030/relatorio?dataInicio=2024/06/05&dataFim=2024/06/07
export default function (app: Application): void {
    const relatorioService = new RelatorioService({ app });
    app.use('/relatorio', {
        async find(params: Params) {
            return relatorioService.relatorioLocacoes(params);
        }
    });
}
