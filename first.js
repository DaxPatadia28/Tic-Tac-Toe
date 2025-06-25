let boxes = document.querySelectorAll('.box');
let resetbtn = document.querySelector('.reset');
let winLine = document.querySelector('.win-line');

let turno = true;

const winpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log("box was clicked");
        if (turno) {
            box.innerText = 'O';
            turno = false;
        }
        else {
            box.innerText = 'X';    
            turno = true;
        }
        box.disabled = true;
        checkwin();
    });
});

const checkwin = () => {
    let isDraw = true;
    for (let i = 0; i < winpatterns.length; i++) {
        let pattern = winpatterns[i];
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 == pos2 && pos2 == pos3){
                showWinLine(i);
                setTimeout(() => {
                    alert(`Winner is ${pos1}`);
                }, 200);
                boxes.forEach(box => box.disabled = true);
                return;
            }
        }
    }
    
    boxes.forEach(box => {
        if (box.innerText === "") isDraw = false;
    });
    if (isDraw) {
        setTimeout(() => {
            alert("It's a draw!");
        }, 200);
        boxes.forEach(box => box.disabled = true);
    }
}

function showWinLine(patternIndex) {
    if (!winLine) return;
    winLine.style.display = 'block';
    winLine.className = 'win-line';
    if (patternIndex === 0) winLine.classList.add('horizontal-0');
    else if (patternIndex === 1) winLine.classList.add('horizontal-1');
    else if (patternIndex === 2) winLine.classList.add('horizontal-2');
    else if (patternIndex === 3) winLine.classList.add('vertical-0');
    else if (patternIndex === 4) winLine.classList.add('vertical-1');
    else if (patternIndex === 5) winLine.classList.add('vertical-2');
    else if (patternIndex === 6) winLine.classList.add('diagonal-0');
    else if (patternIndex === 7) winLine.classList.add('diagonal-1');
}

resetbtn.addEventListener('click', () => {
    boxes.forEach(box => {
        box.innerText = '';
        box.disabled = false;
    });
    turno = true;
    if (winLine) {
        winLine.style.display = 'none';
        winLine.className = 'win-line';
    }
});
