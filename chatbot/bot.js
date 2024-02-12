const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    const body = message.body.trim().toLowerCase();

    const greetings = ['bom dia', 'boa noite', 'oi', 'boa tarde'];
    if (greetings.includes(body)) {
        await client.sendMessage(message.from, 'Olá, seja bem-vindo(a)!\nComo posso te ajudar?');
        await client.sendMessage(message.from, 'Segue abaixo as opções:\n1. Dúvidas em relação a: matéria e aulas, horários e professor.\n2. Dúvidas sobre auxílio estudantil: auxílio alimentação, auxílio moradia (intermunicipal) e auxílio transporte.\n3. Outros\n0. Fim do atendimento');
        if (['1', '2', '3', '0'].includes(body)) {
            switch (body) {
                case '1':
                    await client.sendMessage(message.from, 'Escolha a opção da sua dúvida:\na. Matéria e aulas\na. Horários\nc. Professor');
                    if (['a', 'b', 'c'].includes(body)) {
                        switch (body.toLocaleLowerCase()) {
                            case 'a':
                                await client.sendMessage(message.from, 'Sobre matéria e aulas');
                                await client.sendMessage(message.from, '1) Primeiro acesse o TimeTable IFMT, e clique na aba sala de aula link: https://ifmtcba.edupage.org/timetable/ .\n 2) Pergunte no grupo(s) do seu curso se alguém sabe qual a sala dessa matéria que você está procurando.\n 3) Caso nenhuma das opções acima resolva o seu problema, procure a coordenação do seu curso.');
                                break;
                            case 'a':
                                await client.sendMessage(message.from, 'Sobre horário');
                                await client.sendMessage(message.from, 'Acesse o TimeTable IFMT link: https://ifmtcba.edupage.org/timetable/');
                                break;
                            case 'c':
                                await client.sendMessage(message.from, 'Sobre professores');
                                await client.sendMessage(message.from, 'Você deve conferir se o professor enviou no seu e-mail ou no SUAP, alguma mensagem sobre o horário da aula. Lembre-se que a tolerância de atraso é 15 min. Após esse tempo de tolerância de atraso se o professor ainda não tiver chegado, procure a coordenação do seu curso.');
                                break;
                            default:
                                await client.sendMessage(message.from, 'Opção inválida para a categoria "Matéria e aulas, horários e professor".');
                                break;
                        }
                        break;
                    }
                case '2':
                    await client.sendMessage(message.from, 'Escolha a opção da sua dúvida:\nD. Auxílio alimentação e auxílio moradia\nE. Auxílio transporte (intermunicipal)');
                    if (['d', 'e'].includes(body)) {
                        switch (body.toLocaleLowerCase()) {
                            case 'd':
                                await client.sendMessage(message.from, 'Sobre auxílio alimentação e moradia');
                                await client.sendMessage(message.from, 'Para solicitar auxílios estudantis você deve acompanhar o site dos campus onde é publicado os editais: https://cba.ifmt.edu.br/conteudo/pagina/Editais2024/. Para mais informações sobre os editais procure o departamento Coordenação de Assistência Estudantil e Inclusão (CAE) - Telefone para contato: https://api.whatsapp.com/send?phone=5565981630124');
                                break;
                            case 'e':
                                await client.sendMessage(message.from, 'Sobre cartão de transporte');
                                await client.sendMessage(message.from, 'Para mais informações entre em contato com a Diretoria de Extensão(DIEX) link: https://wa.me/556581612058');
                                break;
                            default:
                                await client.sendMessage(message.from, 'Opção inválida para a categoria "Auxílio alimentação e auxílio moradia, auxílio transporte (intermunicipal)".');
                                break;
                        }
                        break;
                    }

            }

        }
    } else {
        await client.sendMessage(message.from, 'Sinto muito, mas não posso ajudar. Escolha uma das opções acima disponíveis.');
    }


});

client.initialize();
