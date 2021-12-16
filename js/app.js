"use strict";

class BingoGenerator {
    constructor() {
        this.generateButton = document.getElementById('generateButton');
        this.output = document.getElementById('output');
        this.gameString = "BINGO";
        this.number;
        this.numberHistory = [];

        this.generateButton.addEventListener('click', () => {
            this.update();
        });
    }

    update() {
        this.randomNumber();
        this.output.innerHTML = `
            <p>${this.number}</p>
            `;
        for(let i = 1; i < Math.min(6, this.numberHistory.length); i++) {
            this.output.innerHTML += `
                <span>${this.numberHistory[i]}</span>
            `;
            if(this.numberHistory.length < 6) {
            }
        }
    }

    randomNumber() {
        do {
            let randomNumber = Math.ceil(Math.random() * 15);
            let randomLetter = this.gameString[Math.floor(Math.random() * this.gameString.length)];
            switch (randomLetter) {
                case "B":
                    break;
                case "I":
                    randomNumber += 15;
                    break;
                case "N":
                    randomNumber += 30;
                    break;
                case "G":
                    randomNumber += 45;
                    break;
                case "O":
                    randomNumber += 60;
                    break;
                default:
                    break;
            }
            this.number = randomLetter + randomNumber;
            if (this.numberHistory.length >= 75) this.numberHistory = [];
        } while (this.numberHistory.includes(this.number));
        this.numberHistory.unshift(this.number);
    }
}

class CardGenerator {
    constructor() {
        this.output = document.getElementById('cardOutput');
        this.nodes = {
            b: [],
            i: [],
            n: [],
            g: [],
            o: [],
        };
        document.getElementById('generateCard').addEventListener("click", e => {
            this.generate();
        });
    }

    update() {
        let output = `
            <div class="card-header">
                <h2>Bingo</h2>
            </div>
            <div class="card-body">`;
        for (let key in this.nodes) {
            output += `
                <div class="bingo-column">
                <div class="col-header">${key.toUpperCase()}</div>`;
            this.nodes[key].forEach((el) => {
                if (typeof(el) === "string") el = el.toUpperCase();
                output += `<div class="col-item">${el}</div>`
            });
            output += "</div>"
        }
        output += "</div>"
        this.output.innerHTML = output;
        let cardsItems = document.querySelectorAll('.col-item');
        cardsItems.forEach((el) => {
            el.addEventListener('click', (ev) => {
                el.style.background = "#ff4400";
                el.style.color = "black";
            });
        });
    }

    generate() {
        this.nodes = {
            b: [],
            i: [],
            n: [],
            g: [],
            o: [],
        };
        ['b','i','n','g','o'].forEach((e, i) => {
            for(let j = 0; j < 5; j++) {
                if (i === 2 && j === 2) {
                    this.nodes[e].push("free");
                    continue;
                }
                let n;
                do {
                    n = Math.ceil(Math.random() * 15)+(15*i);
                } while (this.nodes[e].includes(n));
                this.nodes[e].push(n);
            }
        });
        this.update();
    }
}

let bingo = new BingoGenerator();
let cards = new CardGenerator();
let hostBoard = document.getElementById('generateMain');
let gameBoard = document.getElementById('gameBoardMain');

document.getElementById('displayGenerator').addEventListener('click', (ev) => {
    hostBoard.style.display = 'block';
    gameBoard.style.display = 'none';
});

document.getElementById('displayCard').addEventListener('click', (ev) => {
    hostBoard.style.display = 'none';
    gameBoard.style.display = 'block';
});
