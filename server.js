const express = require('express');
const path = require('path');

const app = express();

//Server routes devem vir antes do trecho abaixo sempre

if (process.env.NODE_ENV !== 'production') {
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    //Configuração para webpack para ambiente de desenvolvimento 
    app.use(webpackMiddleware(webpack(webpackConfig)));
    console.log('!!!!' + 'DEV' +  '!!!!' + process.env.NODE_ENV);
} else {
    //Serve os aruivos do diretório onde estão os arquivos bundle, vendor, html, css e etc.
    app.use(express.static('build'));
    //Recebe a requisição get para devolver a página index
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
    console.log(process.env.NODE_ENV);
}

app.listen( process.env.port || 3050, function () {
    console.log('App listening on port 3050!');
});