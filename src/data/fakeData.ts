import { v4 } from "uuid";
import { Book } from "../types/Book";

export const fakeDataLivros: Book[] = [
    {
        id: v4(),
        title: 'O Imperialismo, Fase Superior do Capitalismo',
        author: 'V.I. Lenin',
        publishedYear: '1916',
        image: 'https://img.skoob.com.br/0BMrtZHw_ZTuneBSlflmPUYp21o=/600x0/center/top/filters:format(jpeg)/https://skoob.s3.amazonaws.com/livros/53170/IMPERIALISMO__FASE_SUPERIOR_DO_CAPITALI_1254760272B.jpg',
        level: "basic",
        shortDescription: 'Imperialismo: Fase Superior do Capitalismo, também traduzido como O Imperialismo: Fase Superior do Capitalismo e ainda Imperialismo, Estágio Superior do Capitalismo é um livro escrito por Vladimir Lenin.',
        freeBookLink: 'https://www.marxists.org/portugues/lenin/1916/imperialismo/index.htm',
        audiobookLink: '1',
        bookLink: '1',
        onlineBookLink: '1'
    },
    {
        id: v4(),
        title: 'O Imperialismo, Fase Superior do Capitalismo',
        author: 'V.I. Lenin',
        publishedYear: '1916',
        image: 'https://daks2k3a4ib2z.cloudfront.net/6399a758c48c613a4ad89fa1/6399c825541ccc216f87364d_IMPERIALISMO__FASE_SUPERIOR_DO_CAPITALI_1254760272B-p-500.jpg',
        level: "basic",
        shortDescription: 'Imperialismo: Fase Superior do Capitalismo, também traduzido como O Imperialismo: Fase Superior do Capitalismo e ainda Imperialismo, Estágio Superior do Capitalismo é um livro escrito por Vladimir Lenin.',
        freeBookLink: 'https://www.marxists.org/portugues/lenin/1916/imperialismo/index.htm'
    },
    {
        id: v4(),
        title: 'O Imperialismo, Fase Superior do Capitalismo',
        author: 'V.I. Lenin',
        publishedYear: '1916',
        image: 'https://daks2k3a4ib2z.cloudfront.net/6399a758c48c613a4ad89fa1/6399c825541ccc216f87364d_IMPERIALISMO__FASE_SUPERIOR_DO_CAPITALI_1254760272B-p-500.jpg',
        level: "basic",
        shortDescription: 'Imperialismo: Fase Superior do Capitalismo, também traduzido como O Imperialismo: Fase Superior do Capitalismo e ainda Imperialismo, Estágio Superior do Capitalismo é um livro escrito por Vladimir Lenin.',
        freeBookLink: 'https://www.marxists.org/portugues/lenin/1916/imperialismo/index.htm'
    },
]