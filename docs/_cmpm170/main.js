title = "Harry's Game";

//vite build --base=/prototype-2-individual/

description = `test test`;

let pins;
let pins2;
let pins3;
let characterY = 95;
let characterX = 74;
let lifePoint = 10;
let nextFishDist;
let fishLine;
let lineLength = 5;
let projectileObj;
let retract = false;
let caughtFish = false;
let fishSpeed = 1;
let retractSpeed = 1;

characters = [
`
ccccc
c   c
c   c
ccccc
cc cc
cc cc
`,
`
bbbbb
lllll
blllb
llbll
`,
];

options = {};

function update() {
  if (!ticks) {
    pins = [vec(5, 50)];
    pins2 = vec(50, 70)
    pins3 = [vec(95, 50)]
    fishLine = {angle: 110, length: lineLength, pin: vec(53, 70)}
    projectileObj = {pin: vec(50, 70), color: "transparent"}

    nextFishDist = 100;

  }
  color("cyan");
  char("a", characterX, characterY);
  color("black");
  arc(40, 95, 30, 3, 0, -1)
  line(fishLine.pin, vec(fishLine.pin).addWithAngle(fishLine.angle, fishLine.length));
  color("green");
  rect(projectileObj.pin, 3)
  

  


  remove(pins, (p) => {
    p.x += fishSpeed
    color("yellow");
    if(box(p, 3).isColliding.rect.green){
      caughtFish = true;
      fishSpeed = 0;
      if(input.isJustPressed){
        fishLine.angle += 0.5;
        projectileObj.pin.y += retractSpeed
        if(p.y+0.5 < projectileObj.pin.y){
          p.y += retractSpeed;
        }
      }
      else{
        p.x += 0.005;  
      }
      if(p.x-4.5 > projectileObj.pin.x){
        caughtFish = false;
        fishSpeed = 1;
      }
      if(projectileObj.pin.y == pins2.y){
        addScore(1);
        caughtFish = false;
        fishSpeed = 1;
        
        return projectileObj.pin.y == pins2.y;
      }
    }
    
    let outOfBoundX = 102
    if(p.x > outOfBoundX){ 
      lifePoint -= 1;
      console.log(lifePoint);
      if(lifePoint == 0){
        lifePoint = 10;
        end("Game Over");
      }
    }
    return p.x > outOfBoundX;
  });

  let projectileSpeed = 2; 
    
  if(input.isPressed && retract == false && caughtFish == false){
    if(projectileObj.pin.y > 10 ){
      projectileObj.pin.y -= projectileSpeed;
    }
  }
  else{
    retract = true; 
    if(projectileObj.pin.y < pins2.y && caughtFish == false){
      fishLine.angle += 0.5;
      projectileObj.pin.y += 1;  
    }
    if(projectileObj.pin.y >= pins2.y){
      retract = false;
    }
  }

  nextFishDist -= fishSpeed;
  if(nextFishDist < 0){
    pins.push(vec(5, rnd(10,60)));
    nextFishDist += rnd(50, 100);
  }
}