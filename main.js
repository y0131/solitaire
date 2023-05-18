// let tiledata = [
//     [0,0,1,1,1,0,0],
//     [0,0,1,1,1,0,0],
//     [1,1,1,1,1,1,1],
//     [1,1,1,2,1,1,1],
//     [1,1,1,1,1,1,1],
//     [0,0,1,1,1,0,0],
//     [0,0,1,1,1,0,0],
// ];

let tiledata = [
    [0,0,3,3,3,0,0],
    [0,0,3,3,3,0,0],
    [4,4,2,2,2,5,5],
    [4,4,2,1,2,5,5],
    [4,4,2,2,2,5,5],
    [0,0,6,6,6,0,0],
    [0,0,6,6,6,0,0],
];

let colors = [
    [],
    [182, 156, 129],
    [255, 255, 255],
    [200, 0, 0],
    [200, 200, 0],
    [0, 150, 0],
    [36, 111, 191],
]

let select = {
    x: 3,
    y: 3
}

let isShiftKey = false;
let oldIsUp = false;
let oldIsDown = false;
let oldIsLeft = false;
let oldIsRight = false;

function isType(x) {
    if(x === 0) return 0;
    if(x !== 1) return 2;
    return 1;
}

function move(ax, ay, s) {
    if(s) {
        let x = select.x;
        let y = select.y;

        if(isType(tiledata[y][x]) === 2&&
            isType(tiledata[y+ay][x+ax]) === 2 &&
            isType(tiledata[y+ay*2][x+ax*2]) === 1) {

            tiledata[y+ay*2][x+ax*2] = tiledata[y][x];
            tiledata[y][x] = 1;
            tiledata[y+ay][x+ax] = 1;
        }
    } else {
        select.x += ax;
        select.y += ay;

        if(select.x === -1) {
            select.x = 6;
        }

        if(select.x === 7) {
            select.x = 0;
        }

        if(select.y === -1) {
            select.y = 6;
        }

        if(select.y === 7) {
            select.y = 0;
        }
    }
}

function cal() {
    let isShiftKey = keyIsDown(SHIFT);
    let isUp = keyIsDown(UP_ARROW);
    let isDown = keyIsDown(DOWN_ARROW);
    let isLeft = keyIsDown(LEFT_ARROW);
    let isRight = keyIsDown(RIGHT_ARROW);

    if(!oldIsUp && isUp){
        move(0, -1, isShiftKey);
    }

    if(!oldIsRight && isRight){
        move(1, 0, isShiftKey);
    }

    if(!oldIsDown && isDown){
        move(0, 1, isShiftKey);
    }

    if(!oldIsLeft && isLeft){
        move(-1, 0, isShiftKey);
    }

    oldIsUp = isUp;
    oldIsDown = isDown;
    oldIsLeft = isLeft;
    oldIsRight = isRight;
}

function setup() {
    createCanvas(700, 700);
}

function draw() {
    cal();

    clear();
    background(63, 50, 33);

    noFill();
    stroke(255, 204, 0);
    rect((select.x * 100), (select.y * 100), 100, 100)

    tiledata.forEach((tiles, y) => {
        tiles.forEach((tile, x) => {
            noStroke();
            switch (tile) {
                case 0: break;
                default:
                    fill(...colors[tile])
                    ellipse((x * 100)+50, (y * 100)+50, 80);
                    break;
            }
        });
    });
}