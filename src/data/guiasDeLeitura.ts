export type GuideBook = {
    id: string,
    text: string,
    position: number,
}

export type GuiaDeLeitura = {
    id: number,
    title: string,
    slug: string,
    intro: string,
    initialLevel: 'basic' | 'intermediate' | 'advanced',
    finalLevel: 'basic' | 'intermediate' | 'advanced',
    livros: GuideBook[],
    createdBy: string[],
}

export const data: GuiaDeLeitura[] = [
    {
        id: 1,
        title: 'Comunismo: princípios básicos',
        slug: '1-comunismo-principios-basicos',
        intro: 'Do básico ao avançado para se entender como comunista',
        initialLevel: 'basic',
        finalLevel: 'advanced',
        livros: [
            { id: 'UbihWMgK4PkUW57Hw23u', text: 'Não é obrigatório, porém te da uma boa introdução para entender Marx, o livro só está disponível para venda.', position: 1 },
            { id: 'fxDLucw7doe6UCCSoFvA', text: 'Esse foi o primeiro programa da liga dos justos que por orientação de Engels e Marx virou a liga dos comunistas.', position: 2 },
            { id: 'Ncq8JyxLf8xQNRAFsebX', text: 'Para entender melhor as três fontes: filosofia, política e economia.', position: 3 },
            { id: 'SZHHNEeEpCdh5E5oX0cT', text: 'O manifesto foi o programa final da liga dos comunistas, tomado como referência para todo comunista.', position: 4 },
            { id: 'vxC0AQ50HK0c4Vb1PGoN', text: 'Para entender e distinguir o socialismo utópico do socialismo científico sob a perspectiva do materialismo.', position: 5 },
            { id: 'LevIdv7nkrZlk0b09ASw', text: 'Para entender de como o salário não está associado ao preço da mercadoria, ou seja, a explicação do valor e mais-valia; uma crítica sobre crítica da economia política.', position: 6 },
            { id: 'MqpX2Xsbu8PWIVRn3Ddc', text: 'Se tiver ousado para entender o capitalismo a fundo, esse é o livro.', position: 7 },
            { id: 'wqLlkEjPFaUtbDNpJ5mk', text: 'Uma opção se não leu o capital, é um livro mais simples, porém suficiente para ter uma ótima base da economia política.', position: 8 },
            { id: 'XEj2Pk6OVQ8d13X6Id4z', text: 'Uma compreensão apurada de materialismo histórico.', position: 9 },
            { id: 'khCKEfAFnGsLbVmkoLvv', text: 'É uma critica a um programa de unificação de partido, um ótimo exemplar para enteder o socialismo, a fase de transição para o comunismo.', position: 10 },
            { id: 'UdB25EbNYivxHYHTknoz', text: 'Ideia de partido, onde se originou a organização de partido leninista.', position: 11 },
            { id: 'iWjqBAeA5pYbrbKyWZCS', text: 'Para entender o papel do estado em uma revolução, como a classe trabalhadora deve gerir o estado, pra que serve e o que é o estado.', position: 12 },
            { id: 'N07F1fKLijcUBzz7rZ97', text: 'A "nova" fase do capitalismo, o imperialismo, dessa descoberta foi tirada e organizada a revolução russa.', position: 13 },
        ],
        createdBy: ['Soberana']
    },
]