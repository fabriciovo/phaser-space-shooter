// JavaScript source code
var LEFT = 1;
var RIGHT = 2;

function Player(context, image, keyboard,fireballImage) {
	this.context = context;
	this.image = image;
	this.keyboard = keyboard;
	this.x = 96;
	this.y = 61;
	this.w = 8;
	this.h = 12;
	this.speedX = 1;
	this.dir = RIGHT;
	this.fireball = new Array();
	this.fireballImage = fireballImage;

}

Player.prototype = {
	update : function(){
		if (this.keyboard.press(KEY_LEFT) && this.x > 14) {
			this.dir = LEFT;
			this.speedX = -1;
			this.x += this.speedX ;

		 }
		 else if (this.keyboard.press(KEY_RIGHT) && 
			this.x < this.context.canvas.width - 20) {
			this.dir = RIGHT;
			this.speedX = 1;
			this.x += this.speedX;
		 }
	},
	draw : function(){
		this.context.drawImage(this.image, this.x , this.y);	

	},	
	power : function(){
		this.fireball.push(new Fireball(this.context, this.fireballImage, this.x, this.y+5, this.speedX * 3));
	},
	


}