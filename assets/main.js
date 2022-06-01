const sectionElement = document.querySelector('section');
let livesCount = 6;
const livesElement = document.getElementById('livesCount');
const rootElement = document.getElementById('root');
const imgDir = 'assets/imgs/';
const faces = () => [
    { imgSrc: `${imgDir}html.png` , name:'html'},
    { imgSrc: `${imgDir}html.png` , name:'html'},
    { imgSrc: `${imgDir}css.png` , name:'css'},
    { imgSrc: `${imgDir}css.png` , name:'css'},
    { imgSrc: `${imgDir}js.png` , name:'js'},
    { imgSrc: `${imgDir}js.png` , name:'js'},
    { imgSrc: `${imgDir}npm.png` , name:'npm'},
    { imgSrc: `${imgDir}npm.png` , name:'npm'},
    { imgSrc: `${imgDir}bootstrap.png` , name:'bootstrap'},
    { imgSrc: `${imgDir}bootstrap.png` , name:'bootstrap'},
    { imgSrc: `${imgDir}sass.png` , name:'sass'},
    { imgSrc: `${imgDir}sass.png` , name:'sass'}
];
// create all hearts 
let livesCountHearts = () => {
    livesElement.innerHTML = '';
    for(let x = 0; x < livesCount; x++){
        const heart = document.createElement('img');
        heart.src=`${imgDir}heart.png`;
        livesElement.appendChild(heart);
    }
}
// remove one heart when lose once
let liveLose = () => {
    let liveImgs = Array.from(livesElement.getElementsByTagName('img'));
    liveImgs[ liveImgs.length - 1].remove()
}
// start the game from here
let startGame = () =>{
    rootElement.innerHTML = '';
    // function to random the imgs 
    const randomize = () => {
        livesCountHearts()
        const facesRandom = faces();
        facesRandom.sort( () => Math.random() - 0.5 );
        return facesRandom;
    }

    const cardsRandom = randomize();

    // create cards for the count of imgs
    cardsRandom.forEach( item => {
        // create the body
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        const backImg = document.createElement('div');

        // show the img in the face of the card
        face.src = item.imgSrc;
        card.setAttribute('name',item.name);
        card.classList.add('card');
        back.classList.add('back');
        backImg.classList.add('backImg');
        face.classList.add('face');
        
        // create card as a parent
        card.appendChild(face);
        back.appendChild(backImg);
        card.appendChild(back);

        // show the card in the root parent
        rootElement.appendChild(card);

        // listener action when click flip the card
        card.addEventListener( 'click', e => {
            e.target.classList.add('toggleCard')
            checkCard(e)
        })
    })
}
const checkCard = e => {
    
    e.target.classList.add('flipped');
    
    const flippedCards = Array.from(document.getElementsByClassName('flipped'));
    const allCards = Array.from(document.getElementsByClassName('card'));

    // check if two cards flipped
    if( flippedCards.length === 2 ){

        // freeze control on cards while check
        allCards.forEach( item => item.style.pointerEvents = 'none' );         

        // check if two cards match
        // the match check
        if( flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name') ){
            flippedCards.forEach( item => item.style.pointerEvents = 'none' )
            if( document.getElementsByClassName('toggleCard').length === 12 ){
                setTimeout( () => {
                    alert( ' you win !' );
                    refreshGame(allCards)         
                },500)
            }
        }
        // the wrong check
        else{
            livesCount -= 1;
            liveLose()
            // check if game over
            if(livesCount === 0){
                setTimeout( () => {
                    alert( ' you lost !' );
                    refreshGame(allCards)         
                },500)
            }else{
                setTimeout( () => {
                    flippedCards.forEach( item => item.classList.remove('toggleCard'));         
                },1000)
            }
        }

        // remove flip class to new check another cards
        setTimeout( () => {
            allCards.forEach( item => item.classList.remove('flipped'));         
        },1000)

        // enable control on cards
        setTimeout( () => {
            allCards.forEach( item => item.style.pointerEvents = 'all' );               
        },1500)

    }

}
// refresh the game
const refreshGame = allCards =>{
    allCards.forEach( item => item.classList.remove('toggleCard') )
    livesCount = 6;
    livesCountHearts()
    startGame();
}
// fire the game to start
startGame();



