import { Application } from '../declarations';
import usuario from './usuario/usuario.service';
import locacao from './locacao/locacao.service';
import avaliacao from './avaliacao/avaliacao.service';
import imovel from './imovel/imovel.service';
import pacote from './pacote/pacote.service';
import anuncio from './anuncio/anuncio.service';
import duvida from './duvida/duvida.service';
import resposta from './resposta/resposta.service';
import relatorioService from './relatorio/relatorio.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(usuario);
  app.configure(locacao);
  app.configure(avaliacao);
  app.configure(imovel);
  app.configure(pacote);
  app.configure(anuncio);
  app.configure(duvida);
  app.configure(resposta);
  app.configure(relatorioService)
}
