var webpack = require('webpack');
//O output path trabalha com caminho absoluto e não com relativo
const path = require('path');
//Gera o html já com a referência dos arquivos gerados no build
var HtmlWebpackPlugin = require('html-webpack-plugin');

/* Permite pegar a saída de qualquer loader e gerar um 
 * arquivo separado em vez de colocar tudo no mesmo bundle */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const VENDOR_LIBS = ['react'];

const config = {
    //Caminho pro arquivo inicial que inicia a aplicação
    //entry: './src/index.js',

    //Com a alteração abaixo iremos gerar arwuivos separados
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    //Definição do caminho onde será entregue o bundle e o nome do mesmo
    output: {
        path: path.resolve(__dirname, 'build'),
        //O nome vai vir do atributo entry que está sendo gerado, bundle ou vendor
        //filename: '[name].js',
        //Alterado para o abaixo para gerar um hash junto com o bundle
        filename: '[name].[chunkhash].js',
        //A linha abaixo foi alterada pois passamos a gera o html dentro da pasta build de forma dinâmica
        /*Parametro para os arquivos incluidos no bundle sejam renderizados*/
        //publicPath: 'build/'
    },

    //Acréscimo de module ou loaders como babel por exemplo
    module: {
        rules: [
            //Primeira regra ou loader, no caso babel
            {
                use: 'babel-loader',
                //Expressão regular p/ que o babel somente porcesso arquivo .js 
                test: /\.js$/,
                //Não executar para node_modules que já está em Vanilla javascript
                exclude: /node_modules/
            },
            //Loader para CSS
            {
                /*Use abaixo foi comentado pois vamos gerar o css num arquivo separado
                usando o loader do ExtractTextPlugin */
                //use:['style-loader','css-loader'],

                //Usando o loader abaixo o css será gerado num arquivo separado
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader'
                }),

                //Expressão regular p/ que o babel somente porcesso arquivo .css 
                test: /\.css$/
            },
            //Loader para imagens
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                //Abaixo a instrução do que fazer com os arquivos
                use: [
                    /* No loader url-loader será configurado a tamanho 
                       máximo de arquivo para ir para o bundle, caso o
                       tamanho seja ultrapssado um arquivo separado será gerado*/
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 40000
                        } //for passing extra option, if image is large than 40KB, save it as seperate file
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    /*Esse plugin pega tudo extraido o loader 
    ExtraxctTextPlugin e adiciona no arquivo style.css*/
    plugins: [new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            //name: 'vendor'
            //Alterado para names, pois a geração do manifest permite o browser diferneciar se houve mudança ou não
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
        })
    ]
 
};

module.exports = config;