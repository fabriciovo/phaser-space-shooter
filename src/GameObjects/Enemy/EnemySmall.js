import Enemy from "./Enemy";

class EnemySmall extends Enemy {
  constructor(scene, x, y, key, frame,) {
    super(scene, x, y, key, frame);
    
  }

  createBullet(){

  }

  update() {
    super.update()
  }

  power() {
    super.power()

  }

  animation() {
    super.animation()
  }

  hit(value){
    super.hit(value)

  }

  _destroy(){
    super._destroy()
  }


}

export default EnemySmall