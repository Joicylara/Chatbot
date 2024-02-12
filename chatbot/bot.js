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
    } else {
        await client.sendMessage(message.from, 'Sinto muito, mas não posso ajudar. Escolha uma das opções acima disponíveis.');
    }
    switch (body) {
        case '1':
            await client.sendMessage(message.from, 'Escolha a opção da sua dúvida:\nA. Matéria e aulas\nB. Horários\nC. Professor');
            break;
        case '2':
            await client.sendMessage(message.from, 'Escolha a opção da sua dúvida:\nD. Auxílio alimentação e auxílio moradia\nE. Auxílio transporte (intermunicipal)');
            break;
        case '3':
            await client.sendMessage(message.from, 'Grupo da coordenação do curso de Engenharia da Computação: https://chat.whatsapp.com/KIhscXpEfIl2Yu25P8Xyah');
            await client.sendMessage(message.from, 'Link do Sistema Unificado de Administração Pública (SUAP): https://suap.ifmt.edu.br/accounts/login/?next=/');
            await client.sendMessage(message.from, 'Link do AVA (Ambiente Virtual de Aprendizagem): https://ava.cba.ifmt.edu.br/');
            break;
        case '0':
            await client.sendMessage(message.from, 'Espero ter te ajudado de alguma forma :)');
            break;
        default:
            await client.sendMessage(message.from, 'Desculpe, mas não consegui entender sua mensagem.');
            break;
    }

   

});

client.initialize();
