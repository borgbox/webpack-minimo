//O output path trabalha com caminho absoluto e não com relativo
const path = require('path');

const config = {
    //Caminho pro arquivo inicial que inicia a aplicação
    entry: './src/index.js',
    //Definição do caminho onde será entregue o bundle e o nome do mesmo
    output: {
        path: path.resolve(__dirname, 'build'),
        filename:'bundle.js'
    }

};

module.exports = config;