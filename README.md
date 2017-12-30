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