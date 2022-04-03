// Códigos de teclas - aqui vão todos os que forem necessários
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
var SPACE = 32;
var Z =90;
var ENTER = 13;


function Keyboard(element) {
   this.element = element;

   this.pressed = [];

   this.released = [];

   this.releaseFunc = [];

   var keyboard = this;

   element.addEventListener('keydown', function(event) {
      var key = event.keyCode; 
      keyboard.pressed[key] = true;

      if (keyboard.releaseFunc[key] && !keyboard.released[key]) {
          keyboard.released[key] = true;
          keyboard.releaseFunc[key] () ;
      }
   });

   element.addEventListener('keyup', function(event) {
      keyboard.pressed[event.keyCode] = false;
      keyboard.released[event.keyCode] = false;
   });
}
Keyboard.prototype = {
   press: function(key) {
      return this.pressed[key];
   },
   release: function(key, callback) {
      this.releaseFunc[key] = callback;
   }
}
