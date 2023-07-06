
export function ExplosionEffect() {

    var explosionEffect = pc.createScript("explosionEffect");
    
    explosionEffect.prototype.initialize = function () {
      // Gọi hàm tạo hiệu ứng nổ khi cần
      this.createExplosion();
    };
    // Tạo hạt nổ
    explosionEffect.prototype.createExplosion = function () {
      // Tạo một thực thể con để chứa hệ thống hạt
      var explosion = new pc.Entity();
      explosion.setPosition(this.entity.getPosition());
      this.app.root.addChild(explosion);
    
      // Thêm Component Particle System vào thực thể con
      var particleSystem = explosion.addComponent("particlesystem", {
        loop: false,
      });
    
      // Tùy chỉnh các tham số của hệ thống hạt như kích thước, thời gian sống và tốc độ
      particleSystem.duplicateParticleCount = 20;
      particleSystem.emitterExtents = new pc.Vec3(1, 1, 1);
      particleSystem.emitterRadius = 0.5;
      particleSystem.rate = 0.1;
      particleSystem.startSize = 0.5;
      particleSystem.startSpeed = 2;
      particleSystem.lifetime = 1.5;
    
      // Xóa thực thể con và Component Particle System sau khi kết thúc hiệu ứng nổ
      explosion.once("destroy", function () {
        explosion.destroy();
      });
      particleSystem.once("loopend", function () {
        explosion.destroy();
      });
    
      // Chạy hệ thống hạt
      particleSystem.reset();
      particleSystem.play();
    };
}

