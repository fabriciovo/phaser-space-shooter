// JavaScript source code



function Fireball(context, image, x, y, speed) {
	this.me = this;
	this.context = context;
	this.image = image;
	this.x = x;
	this.y = y;
	this.w = 8;
	this.h = 12;
    this.speedX = speed;
	this.isMoving = 0;

}


Fireball.prototype = {
	update : function(){
		this.x += this.speedX;
		if(this.damage){
			delete this.me;
		}
	},
	draw : function(){
		this.context.drawImage(this.image, this.x, this.y);

	}

}