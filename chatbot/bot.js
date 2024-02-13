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
    const greetings = ['bom dia', 'boa noite', 'oi', 'boa tarde', 'olá', 'ola'];

    if (greetings.includes(body)) {
        await client.sendMessage(message.from, 'Olá, seja bem-vindo(a)!\nComo posso te ajudar?');
        await client.sendMessage(message.from, 'Segue abaixo as opções:\n1. Dúvidas em relação a: matéria e aulas, horários e professor.\n2. Dúvidas sobre auxílio estudantil: auxílio alimentação, auxílio moradia e auxílio transporte.\n3. Outros\n0. Fim do atendimento');
    } else if (['1', '2', '3', '0'].includes(body)) {
        switch (body) {
            case '1':
                await client.sendMessage(message.from, 'Escolha a opção da sua dúvida:\na. Matéria e aulas\nb. Horários\nc. Professor');
                break;
            case '2':
                await client.sendMessage(message.from, 'Escolha a opção da sua dúvida:\nd. Auxílio alimentação e auxílio moradia\ne. Auxílio transporte');
                break;
            case '3':
                await client.sendMessage(message.from, 'Alguns links importantes');
                await client.sendMessage(message.from, 'Grupo da coordenação do curso de Engenharia da Computação: https://chat.whatsapp.com/KIhscXpEfIl2Yu25P8Xyah');
                await client.sendMessage(message.from, 'Link do Sistema Unificado de Administração Pública (SUAP): https://suap.ifmt.edu.br/accounts/login/?next=/');
                await client.sendMessage(message.from, 'Link do AVA (Ambiente Virtual de Aprendizagem): https://ava.cba.ifmt.edu.br/');
                break;
            case '0':
                await client.sendMessage(message.from, 'Espero ter te ajudado de alguma forma :)');
                break;
        }
    } else {
        switch (body) {
            case 'a':
                await client.sendMessage(message.from, 'Sobre matéria e aulas');
                await client.sendMessage(message.from, '1) Primeiro acesse o TimeTable IFMT, e clique na aba sala de aula link: https://ifmtcba.edupage.org/timetable/ .\n 2) Pergunte no grupo(s) do seu curso se alguém sabe qual a sala dessa matéria que você está procurando.\n 3) Caso nenhuma das opções acima resolva o seu problema, procure a coordenação do seu curso.');
                break;
            case 'b':
                await client.sendMessage(message.from, 'Sobre horário');
                await client.sendMessage(message.from, 'Acesse o TimeTable IFMT link: https://ifmtcba.edupage.org/timetable/');
                break;
            case 'c':
                await client.sendMessage(message.from, 'Sobre professores');
                await client.sendMessage(message.from, 'Você deve conferir se o professor enviou no seu e-mail ou no SUAP, alguma mensagem sobre o horário da aula. Lembre-se que a tolerância de atraso é 15 min. Após esse tempo de tolerância de atraso se o professor ainda não tiver chegado, procure a coordenação do seu curso.');
                break;
            case 'd':
                await client.sendMessage(message.from, 'Sobre auxílio alimentação e moradia');
                await client.sendMessage(message.from, 'Para solicitar auxílios estudantis você deve acompanhar o site dos campus onde é publicado os editais: https://cba.ifmt.edu.br/conteudo/pagina/Editais2024/. Para mais informações sobre os editais procure o departamento Coordenação de Assistência Estudantil e Inclusão (CAE) - Telefone para contato: https://api.whatsapp.com/send?phone=5565993098260');
                break;
            case 'e':
                await client.sendMessage(message.from, 'Sobre cartão de transporte');
                await client.sendMessage(message.from, 'Para transporte municipal : Diretoria de Extensão (DIEX) link: https://api.whatsapp.com/send?phone=556581630068 \nPara auxilio transporte intermunicipal : Coordenação de Assistência Estudantil (CAE) link: https://api.whatsapp.com/send?phone=5565993098260');
                break;
            default:
                await client.sendMessage(message.from, 'Sinto muito, mas parece que não tenho a opção que você está procurando neste momento. Estou em constante evolução,espero poder ajudá-lo melhor no futuro. Você tem alguma outra pergunta ou preocupação que eu possa ajudar a resolver?');
                break;
        }
    }
});

client.initialize();
