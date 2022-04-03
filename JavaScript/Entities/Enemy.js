    

function Enemy(context,image, x, y) {
  var min=0.5; 
  var max=2;  
  var random = Math.random() * (+max - +min) + +min; 
  this.context = context;
  this.image = image;
  this.x = x;
  this.y = y;
  this.w = 8;
  this.h = 12;
  this.speedX = random;
  this.damage = false;

}

Enemy.prototype = {
	update : function(){
    this.x += this.speedX;
    
    //check borders
    if(this.x <= 10) {
      this.x = 10;
      //element.speedY = element.speedY * -1;
      this.speedX *= -1;
    }
    else if(this.x >= 192 - 23) {
      this.x = 192 - 23;
      this.speedX *= -1;
    }
	},
	draw : function(){
    this.context.drawImage(this.image, this.x, this.y);

  }

}

