import Enemy from "./Enemy";

class EnemySmall extends Enemy {
  constructor(scene, x, y, key, frame,damage, life, fireRate, velocity) {
    super(scene, x, y, key, frame, damage, life, fireRate, velocity);
    
  }


  update() {
    super.update()
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