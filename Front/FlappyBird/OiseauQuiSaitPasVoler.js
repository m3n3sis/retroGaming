// FROM FROM SCRATCH YOUTUBE

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./image/OiseauImg.png";

// general settings

let gamePlaying = false;
const gravity = .5; // gravité de l'oiseau
const speed = 6.2; // vitesse de déplacement des poteaux
const size = [51, 36]; // taille de l'oiseau
const jump = -8.5; // saut de l'oiseau
const cTench = (canvas.width / 10); // const de 1 dixieme du canvas pour mettre l'oiseau au bord gauche à 10% de l'écran

// pipe settings (poteaux)
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => (Math.random() * ((canvas.height - (pipeGap + pipeWidth)) - pipeWidth)) + pipeWidth;

let index = 0, // permet de créer l'effet d'obtique
    bestScore = 0, // score fin de partie
    currentScore = 0, // score de début
    pipes = [], //array avec tous les poteaux
    fligth,
    flyHeight;

const setup = () => {
    currentScore = 0;
    flight = jump;
    flyHeight = (canvas.height / 2) - (size[1] / 2);

    pipes = Array(3).fill().map((a, i) => [canvas.width + (i * (pipeGap + pipeWidth)), pipeLoc()]); // Array(3).fill() permet de créer plusieurs éléments
}

// permet de lancer le rendu
const render = () => {
    index++;
    // background
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width), 0, canvas.width, canvas.height);

    if (gamePlaying) {
        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTench, flyHeight, ...size);
        flight += gravity;
        flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]); // canvas.height - size[1]); permet d'éviter que l'oiseau disparaisse de l'écran vers le bas

    } else {

        ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, ((canvas.width / 2) - size[0] / 2), flyHeight, ...size); // drawImage (image, sx(decoupe horizontal de l'image), sy(decoupe vertical de l'image), sLargeur)
        flyHeight = (canvas.height / 2) - (size[1] / 2);

        ctx.fillText("Meilleur score : " + bestScore, 55, 245);
        ctx.fillText("Cliquez pour jouer", 48, 535);
        ctx.font = "bold 30px courier";
    }

    // pipe display
    if (gamePlaying) {
        pipes.map(pipe => {
            pipe[0] -= speed;

            // top pipe
            ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);

            // bottom pipe
            ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

            if (pipe[0] <= -pipeWidth) {
                currentScore++;
                bestScore = Math.max(bestScore, currentScore);

                // remove pipe + creer un nouveau pipe
                pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]];
            }

            // if hit the pipe, end
            if ([
                    pipe[0] <= cTench + size[0],
                    pipe[0] + pipeWidth >= cTench,
                    pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]
                ].every(elem => elem)) {
                gamePlaying = false;
                setup();
            }
        })
    }

    document.getElementById("bestScore").innerHTML = "Meilleur : " + bestScore;
    document.getElementById("currentScore").innerHTML = "Meilleur : " + currentScore;

    setTimeout(render, 30);
}

setup();
img.onload = render;
document.addEventListener("click", () => gamePlaying = true);
window.onclick = () => flight = jump;
clearTimeout(timeout);