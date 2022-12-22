const canvas = document.querySelector("canvas");
var scoreEl = document.querySelector("#scoreEl");
canvas.width = window.innerWidth;
canvas.height =window.innerHeight;

var pauseGame= document.querySelector('.btn');


var c =canvas.getContext('2d');
var bigScoreEl = document.querySelector('#bigScoreEl');
var StartGame = document.querySelector('#StartGameBtn')
var container = document.querySelector(".container")
var powers = document.querySelector(".btn-2");

//Create  The er class ✅

function Player(x,y, radius,color){
  this.color = color;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.draw = ()=>{
   c.beginPath()
   c.arc(this.x, this.y, this.radius, 0,Math.PI*2,false)
   c.fillStyle = this.color;
   c.fill();
  
  };
}
const y = innerHeight/2;
const x = innerWidth/2;




//Create the projectile… Class 🤝
function Projectile(x,y, radius,color, velocity){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.velocity = velocity;
  this.color = color;
  
  
  this.draw = () => {
   c.beginPath();
   c.arc(this.x, this.y, this.radius, 0,Math.PI*2,false)
   c.fillStyle = this.color;
   c.fill();

  }
  this.update = ()=> {
    this.draw();
    this.x = this.x +  this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//The Enemy Class
function Enemy(x,y, radius,color, velocity){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.velocity = velocity;
  this.color = color;
  
  this.draw = () => {
   c.beginPath();
   c.arc(this.x, this.y, this.radius, 0,Math.PI*2,false)
   c.fillStyle = this.color;
   c.fill();
  
  }
  this.update = ()=> {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}

//The Particle class 
const friction = 0.99;

function Particle(x,y, radius,color, velocity){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.velocity = velocity;
  this.color = color;
  this.alpha = 1;
  
  this.draw = () => {
   c.save()
   c.globalAlpha = this.alpha;
   c.beginPath();
   c.arc(this.x, this.y, this.radius, 0,Math.PI*2,false)
   c.fillStyle = this.color;
   c.fill();
   c.restore();
 
  }
  this.update = ()=> {
    this.draw();
    this.velocity.x *= friction
    this.velocity.y *= friction
    this.x = this.x +  this.velocity.x;
    this.y = this.y + this.velocity.y;
    this.alpha -=0.01;
  }
}


/*unctionn Power(x,y,radius,velocity,color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.velocity = velocity;
  this.color = color;
    
  this.draw = () => {
   c.beginPath();
   c.arc(this.x, this.y, this.radius, 0,Math.PI*2,false)
   c.fillStyle = this.color;
   c.fill();
  
  }
  this.update = ()=>{
    this.draw()
    this.y -= 3
 
  }
  
}*/ function GiftBox(x,y,h,w,color){
  
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.color = color;
    
    this.draw = ()=>{
      c.fillStyle = this.color
      c.fillRect(this.x,this.y,this.h,this.w)
    }
    this.update = function (){
      this.draw();
      this.y +=1
    }
}
// The Arrays for storing particles
var player = new Player(x,y,10,'white');
   let  projectiles =[];
    let enemies = [];
    let  particles = []
    let score = 0
    let gifts = []
  
   
function resetGame(){
    
     //er = new er(x,y,10,'white');
     projectiles =[];
     particles = []
     score = 0 ;
     enemies =[]
     bigScoreEl.innerHTML = score;
     scoreEl.innerHTML = score
}    



//Spawning Enemy Function 

/*function spawnPower(){
  setInterval (()=>{
  var color =`hsl(${Math.random()*360},70%,50%)`
  var radius = 10
  var velocity = 3
  var x = innerWidth/2 
  var y = innerHeight - radius - 1;
   powers.(new Power(x,y,radius,velocity,color))
  },1000);
}*/

setInterval(function() {
      let w = 30  
    let h = 30  
    let x = (Math.random()*innerWidth) - w;
    let y = 0
    gifts.push(new GiftBox(x,y,h,w,"white"))
    
}, 20000);
function spawnEnemy() {
  setInterval(()=>{
    let radius = Math.random()*( 30 - 4) + 4 ;
    let x 
    let y 
    if(Math.random() < 0.5){
      x = Math.random() <0.5 ? 0 - radius:innerWidth+radius;
      y = Math.random() * innerHeight;
      
    }else{
      x =Math.random()*innerWidth;
      y = Math.random()<0.5 ? 0 - radius : innerHeight+radius;
      
    }
    let color = `hsl(${Math.random()*360},70%,50%)`;
    
    var angle = Math.atan2(innerHeight/2 - y, 
    innerWidth/2 - x);
    const velocity ={
    
    x: Math.cos(angle),
    y: Math.sin(angle) 
  }
    enemies.push(new Enemy (x,y, radius,color,velocity))
  }, 1000);
 
}

//Animation Loop
let animationId
function animate (){
  
  animationId = requestAnimationFrame(animate);
  
  c.fillStyle = 'rgba(0,0,0,0.1)'

  c.fillRect(0,0,innerWidth,innerHeight);
  
   player.draw();
   
   //Looping through particles array to update each particle 
   
   particles.forEach((particle,index)=>{
     //Removing particles from the screen after a specific amount of time 
     if (particle.alpha <=0){
       particles.splice(index,1);
       
       //If Not, Update --> Draw
     }else{
        particle.update();
     }
     })
    //Looping through the projectiles array...
 
  projectiles.forEach((projectile,index)=>{
    projectile.update();
    
    
 
  })
  projectiles.forEach((projectile, i) => {
        projectile.update();
        if (Math.floor(projectile.x) == 0 ||
          Math.floor(projectile.x) == innerWidth ||
          Math.floor(projectile.y) == 0 ||
          Math.floor(projectile.y) == innerHeight) {

          projectiles.splice(i, 1);
        }

      });
   
  //Looping through enemies Array
  enemies.forEach((enemy,eIndex)=>{
    enemy.update();

   //Distance between enemy and player
    let dist = Math.hypot(player.x - enemy.x , player.y - enemy.y)
   //End game 
    if (dist - player.radius - enemy.radius <= 1){
      cancelAnimationFrame(animationId)
    
      scoreEl.innerHTML = score
      
      container.style.display ="flex"
      bigScoreEl.innerHTML = score;
      location.reload()
    }
  //Projectile and Enemy collision
  
    projectiles.forEach((projectile,pIndex)=>{
   // Distance between enemy and projectile
      
      let dist = Math.hypot(projectile.x - enemy.x , projectile.y - enemy.y)
    
      if (dist - projectile.radius - enemy.radius <= 1) {
        //Creaing the particle Explosion
        //Increment Score 

         for (var i = 0; i < enemy.radius; i++) {
           particles.push(new Particle(enemy.x,enemy.y,1,enemy.color,{
             x: (Math.random()-0.5) * (Math.random() *8),
             y: (Math.random()-0.5)* (Math.random() *8)
           }))
         }
     //Reducing the size of larger enemies
         if(enemy.radius - 10 > 10){
           enemy.radius -=10
           score +=50
           scoreEl.innerHTML = score;
           projectiles.splice(pIndex,1)
         } 
         //Removing enemies and projectiles
         else{
        score +=100;
        scoreEl.innerHTML = score;
         enemies.splice(eIndex,1);
        projectiles.splice(pIndex,1);
         }
      }
  });
  
  });
      projectiles.forEach((projectile,i)=>{
        
        gifts.forEach((gift,j) =>{
    let dist = Math.hypot(projectile.x - gift.x , projectile.y - gift.y)
    
      if (dist - enemy.radius - gift.w  <=1 ) {
          projectiles.splice(i,1)
          gifts.splice(j,1)
      }
        })
      })
}

//Listening for click events
window.addEventListener("click", (event) =>{
  
  //Getting directions
  var angle = Math.atan2(event.clientY -  innerHeight/2, 
    event.clientX - innerWidth/2)

 
  const velocity ={
    
    x: Math.cos(angle)*5,
    y: Math.sin(angle)*5
  }
  //Creating projectiles
  projectiles.push(new Projectile(x,y, 4,'white',velocity));

  
});
StartGame.addEventListener('click',()=>{

  container.style.display = "none"
  resetGame();
  spawnEnemy();
  animate()
});

//Pause Game //

let pause = false

pauseGame.addEventListener('click', ()=>{
  pause = !pause;
  pause ? cancelAnimationFrame(animationId) : requestAnimationFrame(animate);
});

var destroy = 5;

powers.addEventListener('click',()=>{
  destroy--;
  
  if(destroy >=0 ){
    
  powers.innerHTML = destroy;
  
  for(i = 0 ; i < Math.PI*2 ; i+=0.09){
    
  var velocity = {
      x : Math.cos(i) * 7 ,
      y: Math.sin(i) * 7
      } 
    
  projectiles.push(new Projectile(innerWidth/2,innerHeight/2,2,"red",velocity))
  }
  }
  
});


