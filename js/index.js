// constant var
let inputDir ={x :0, y:0};
let speed=2;
let lastPaintTime=0;
let score=0;
let snkArr = [
    {x: 13, y: 15}
];
let gover=0;
food={x: 6, y: 7};
// g fuctn
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snk){
    // collide with body
    for (let i = 1; i < snkArr.length; i++) {
        if (snk[i].x === snk[0].x && snk[i].y === snk[0].y) {
            return true;
            
        }   
    }
    if (snk[0].x>=18 || snk[0].x<=0 || snk[0].y>=18 || snk[0].y<=0) {
        return true;
    }
}



function gameEngine(){
    // updating snak
    if (isCollide(snkArr)) {
        
        alert('Game Over press any key to continue');
        
        inputDir ={x:0, y:0};
        
        snkArr=[{x:13 , y:15}];
        score=0;
        speed=2;
    }
    
    // refresh food
    if(snkArr[0].y === food.y && snkArr[0].x ===food.x){
        score = score+5;
        if (score>val) {
            val=score;
            localStorage.setItem("highscore", JSON.stringify(val));
            hscore.innerHTML="highscore "+ val;
        }
        scoreBox.innerHTML="score "+ score;
        snkArr.unshift({x: snkArr[0].x + inputDir.x, y: snkArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
        if (score>0&&score%25===0) {
            speed=speed+1;
        }
    }
    

    for (let i = snkArr.length - 2; i>=0; i--) { 
        snkArr[i+1] = {...snkArr[i]};
    }

    snkArr[0].x += inputDir.x;
    snkArr[0].y += inputDir.y;

    
     
    // display the snake

    board.innerHTML = "";
    snkArr.forEach((e, index)=>{
        snkElement = document.createElement('div');
        snkElement.style.gridRowStart = e.y;
        snkElement.style.gridColumnStart = e.x;

        if(index === 0){
            snkElement.classList.add('head');
        }
        else{
            snkElement.classList.add('snake');
        }
        board.appendChild(snkElement);
    });
// food display
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

   
    
}



let highscore=localStorage.getItem("highscore");
if (highscore===null) {
    val=0;
    localStorage.setItem("highscore", JSON.stringify(val))  
}
else{
    val=JSON.parse(highscore);
    hscore.innerHTML="highscore "+val;
} 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir={x: 0 , y: 1} //start game
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x= 0;
            inputDir.y= 1;

            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;

            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x= 1;
            inputDir.y= 0;

            break;
    
        default:
            break;
    }

});
