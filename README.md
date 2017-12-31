#WEBPACK#

## Passo a Passo ##

### Criar arquivos .js com suas respectivas dependências

* index.js e sum.js

### Instalação webpack ###
* npm install --save-dev webpack@2.2.0-rc.0

### Criar arquivo de configuração ###
* Arquivo webpack.config.js

### Criar script em package.json ###
* "scripts": { "build":"webpack" }
* Para executar: npm run build

### Criar html para receber o bundle.js gerado ###
* index.html -> <script src="build/bundle.js"><script>

## Segunda etapa com loader ##

### Babel - Turn ES2015 into ES5 ###
#### Babel depende de 3 módulos ####
* babel-loader -> Realiza a compatibilidade com webpack
* babel-core   -> é quem gera os arquivos de saída
* babel-preset-env -> é quem indique para o babel as regras de sintaxe para conversão do código, e.g. ES2017/6/7.

* npm install --save-dev babel-loader babel-core babel-preset-env
#### Configurar módulos ####
* Acrescentar os módulos babel em webpack.config.js

#### Criar arquivo .babelrc
* Arquivo que indica para o babel que o mesmo deve usar os "presets" neste arquivo e que todos os .js devem usar esse conjunto de regras configurados nesse arquivo


### Terceira etapa migrar de CommonJS para ES2015 ###
* CommonJS:
** const sum = require('./sum');  
** module.exports = sum;

* ES2015
** import sum from './sum';
** export default sum;

### Quarta etapa loader para CSS ###
* criar dois arquivos image_viewer.js e image_viewer.css 
* Importar o arquivo css no js
* Instalar os módulos css-loader e style-loader -> npm install --save-dev style-loader css-loader
* css-loader resolve a questão dos imports
* style-loader pega os imports e adiciona ao html juntando tudo no bundle.js

## Separando o css do bundle para um arquivo seaprado ##
* npm install --save-dev extract-text-webpack-plugin@2.0.0-beta.4
* Permite pegar a saída de qualquer loader e gerar um arquivo separado
* Adicionar um tag link link no header do nosso html <link rel='stylesheet' href='build/style.css'>

### Quinta etapa loader para imagens ###
* Loader image-webpack-loader faz o redimensionamento da imagem
* Loader url-loader pega o resultado do loader anterior e inclui no bundle.js se a imagem for pequena, mas se for grande envia para o diretório de saída
* npm install --save-dev image-webpack-loader url-loader
* npm install --save-dev file-loader
* As imagens do projeto estão na pasta assets.
* No caso de imagens grandes, por ser muito grande o webpack vai inclui-la no bundle.
Neste caso vamos ter erro ao tentar localizar o arquivo para solucionar está situação
em webpack.config será necessária a configuração do atributo publicPath

### Sexta etapa split files ###
*    entry:{  bundle: './src/index.js', vendor: VENDOR_LIBS }
*    //Definição do caminho onde será entregue o bundle e o nome do mesmo
    output: {
        path: path.resolve(__dirname, 'build'),
        //O nome vai vir do atributo entry que está sendo gerado, bundle ou vendor
        filename: '[name].js',
        //Parametro para os arquivos incluidos no bundle sejam renderizados
        publicPath: 'build/'
    }

### Sétima otimizar a geração do vendor para evitar redundâncias ###
*     Biblioteca somente para o exemplo -> npm install react --save
*     plugins: [new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        })
    ]

### Oitavo passo plugin para atualizar o html ###
* A medida que novos arquivos sejam gerados pelo build o html precisa ser atualizado manualmente com esse plugin isto não é mais necessário. O html será automáticamente gerado
* npm install --save-dev html-webpack-plugin
* No webpakc.config => 
        var HtmlWebpackPlugin = require('html-webpack-plugin');

### Nono passo Limpar arquivos gerados ###
* npm install --save-dev rimraf 
* Adicionar em scripts o comando clean => "clean": "rimraf build"
* npm run clean
* Ao final atualizar o script build => "build": "npm run clean && webpack".

### Décimo passo Webpack dev server para automaticamente atualizar os arquvior ###
* Similar ao live reload, mas só cuida do lado client side
* Para termos o ambiente como um todo vamos precisar também do node server
* npm install --save-dev webpack-dev-server@2.2.0-rc.0
* Adicionar à script em package.json => "serve":"webpack-dev-server"
* webpack dev server gera os arquivos em memória quando é executado, ele não elimenta a pasta build, mas ainda assim gera e executa os arquivos

### Décimo primeiro passo Prepara para produção ###
* Em webpack.config adicionar na seção de plugins =>         new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
        })
* Em scripts em package.jso adicionar => "build:prod": "NODE_ENV=production npm run clean && webpack -p"
* Acima: NODE_ENV sinaliza a execução em PRD e o -p indica que queremos uma versão para produção minificado e uglificado 


### Publicar conteúdo stático ###
#### Surge ####
* surge.sh
* npm install -g surge
* surge -p dist => Sendo que dist correponde ao diretório onde estão os arquivos

#### AWS ####
* Logar no meu console AWS ir no meu nome => minhas credenciais de segurança => Access keys (Access key and Secret Access key ) => Create new access key => Show access key
* Criar arquivo .env com AWS_ACCESS_KEY_ID='minha chave gerada' e AWS_SECRET_ACCESS_KEY='minha chave secreta'
* npm install -g s3-website
* Criar bucket => s3-website create nomequalquer
* Depois do site criado dar o deploy com o caomando e o nome do diretório => s3-website deploy build
* Quando quiser eliminar apaga-se a chave e o bicket (Services=> Procuro por S3 => encontro o bucket e elimino em ações)

### Publicar servidores ###
* Instalar express => npm install --save express
#### Para DEV & PRD ####
* Instalar middleware intercepta as requisições e retorna uma versão compilada do js
 npm install --save-dev webpack-dev-middleware
* Criar arquivo serve.js seguir conforme exmplo neste projeto
* Para invocar o comando abaixo passando vaiáveis de ambiente em tempo de execução instale => npm install --save-dev cross-env 
* Adicionar e excutar o script => "build:server:prod": "cross-env NODE_ENV=production node server"

##### Publicar Heroku #####
* Criar arquivo Procfile sem extensão. Neste arquivo estão os comandos que serão executados pelo Heroku
