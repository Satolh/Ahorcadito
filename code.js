/*
 * Crea un pequeño juego que consista en adivinar palabras en un número máximo de intentos:
 * - El juego comienza proponiendo una palabra aleatoria incompleta
 *   - Por ejemplo "m_ur_d_v", y el número de intentos que le quedan
 * - El usuario puede introducir únicamente una letra o una palabra (de la misma longitud que
 *   la palabra a adivinar)
 *   - Si escribe una letra y acierta, se muestra esa letra en la palabra. Si falla, se resta
 *     uno al número de intentos
 *   - Si escribe una resolución y acierta, finaliza el juego, en caso contrario, se resta uno
 *     al número de intentos
 *   - Si el contador de intentos llega a 0, el jugador pierde
 * - La palabra debe ocultar de forma aleatoria letras, y nunca puede comenzar ocultando más del 60%
 * - Puedes utilizar las palabras que quieras y el número de intentos que consideres
 */
const people = document.querySelector(".people")
// const head = document.querySelector(".head");
// const body = document.querySelector(".body");
// const leftArm = document.querySelector(".left-arm");
// const rightArm = document.querySelector(".right-arm");
// const leftLeg = document.querySelector(".left-leg");
// const rightLeg = document.querySelector(".right-leg");
const notificacion = document.querySelector(".notificacion") 
const containerPalabra = document.querySelector(".container-palabra");
const containerError = document.querySelector(".container-letras-error");
const containerPlayAgain = document.querySelector(".container-play-again");
const btnPlayAgain = document.querySelector(".btn-play-again");
const pWinOrLose = document.querySelector(".p-win-or-lose");
const palabrasRandom = ["River","Grande","Hormiga","Autopista","Heladera","Meseta"];
let teclasPresionadas = [];
let numeroDeIntentos = 1;
let palabraRandom = palabrasRandom[Math.floor( Math.random() * palabrasRandom.length)];
let letra;


const selectPalabraRandom = ()=>{
        for(let i = 0; i < palabraRandom.length; i++){
            letra = document.createElement("P");
            letra.classList.add("letra")
            letra.textContent = palabraRandom[i];
            containerPalabra.appendChild(letra);
        }
}
selectPalabraRandom();
    document.addEventListener("keydown",(event)=>{
        let  keyValue = event.key;
        let keyCode = keyValue.charCodeAt();
        if(keyCode >= 97 && keyCode <= 122){
        console.log("keyValue: " + keyValue);
        const letrasCoinciden = ()=>{
            for(let i = 0; i < palabraRandom.length; i++){
                let letrasSueltas = containerPalabra.children[i];
                if(keyValue == letrasSueltas.textContent.toLowerCase()){
                    letrasSueltas.classList.add("white");
                }
            }
        }
        letrasCoinciden();
        const letrasEquivocas = ()=>{
            if(palabraRandom.toLowerCase().includes(keyValue) == false 
            && numeroDeIntentos <= 6){
                let letraError = document.createElement("P");
                letraError.textContent = keyValue;
                containerError.appendChild(letraError);
                switch (numeroDeIntentos) {
                    case 1: 
                    let head = document.createElement("DIV");
                    people.appendChild(head);
                    head.classList.add("head")
                    break
                    case 2:
                        let body = document.createElement("DIV");
                        people.appendChild(body);
                        body.classList.add("body") 
                        break
                        case 3:
                            let leftArm = document.createElement("DIV");
                            people.appendChild(leftArm);
                            leftArm.classList.add("left-arm") 
                            break
                            case 4:
                                let rightArm = document.createElement("DIV");
                                people.appendChild(rightArm);
                                rightArm.classList.add("right-arm") 
                                break
                                case 5:
                                    let leftLeg = document.createElement("DIV");
                                    people.appendChild(leftLeg);
                                    leftLeg.classList.add("left-leg") 
                                    break
                                    case 6:
                                        let rightLeg = document.createElement("DIV");
                                        people.appendChild(rightLeg);
                                        rightLeg.classList.add("right-leg") 
                                        break
                                        default:
                                            break
                        }
                        numeroDeIntentos++
                        console.log(numeroDeIntentos)
                    }
                }
                const letrasYaPulsadas = ()=>{
                    if(teclasPresionadas.includes(keyValue) == false){
                        teclasPresionadas.push(keyValue)
                    }else{
                        notificacion.classList.add("show");
                        setTimeout(() => {
                            notificacion.classList.remove("show")
                        },1000);
                }
            }
            letrasYaPulsadas();
            letrasEquivocas();
            winOrLose()
            console.log(palabraRandom)
}else{
    event.preventDefault();
}
});
const winOrLose = ()=>{
    console.log(numeroDeIntentos)
    const elementos = document.querySelectorAll(".letra");
    const totalElementos = elementos.length;
    let contador = 1;
    
    for (let i = 1; i < totalElementos; i++) {
        if(elementos[i].classList.contains("white")){
            contador++;
    }
    }
    if(contador === totalElementos){
        containerPlayAgain.classList.add("display-flex");
        pWinOrLose.textContent = "YOU WIN";

    }else if(numeroDeIntentos == 7){
        console.log("hola: " + numeroDeIntentos)
        containerPlayAgain.classList.add("display-flex")
        pWinOrLose.textContent = "YOU LOSE";
    }
}


 btnPlayAgain.addEventListener("click", ()=>{
     containerPlayAgain.classList.toggle("display-flex")
     teclasPresionadas = [];
     console.log(teclasPresionadas)
     numeroDeIntentos = 1;
     while (containerPalabra.hasChildNodes()) {
        containerPalabra.removeChild(containerPalabra.firstChild);
     }
     while(people.hasChildNodes()){
        people.removeChild(people.firstChild)
     }
     palabraRandom = palabrasRandom[Math.floor( Math.random() * palabrasRandom.length)];
     selectPalabraRandom();
     containerError.textContent = "";
     winOrLose()
 })

