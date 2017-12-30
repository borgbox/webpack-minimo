import '../styles/image_viewer.css'
//Carrega as imagens em base64
//import grandeImagem from '../assets/1200x1200.jpg';
import pequenaImagem from '../assets/cloud-computing.png';

//const image = document.createElement('img');
//image.src = 'http://lorempixel.com/400/400';


/*No caso desta imagem, por ser muito grande o webpack vai inclui-la no bundle.
Neste caso vamos ter erro ao tentar localizar o arquivo para solucionar está situação
em webpack.config será necessária a configuração do atributo publicPath*/

/*const image1 = document.createElement('img');
image1.src = grandeImagem;

const image2 = document.createElement('img');
image2.src = pequenaImagem;

document.body.appendChild(image);
document.body.appendChild(image1);
document.body.appendChild(image2);*/

export default () => {
    const image2 = document.createElement('img');
    image2.src = pequenaImagem;
    document.body.appendChild(image2);
};