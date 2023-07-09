export class Utils {
  static getChance(percent) {
    return Math.random() < percent;
  }

  static getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
  }

  static getColor(r = 255, g = 255, b = 255, a = 255) {
    return new pc.Color(r / 255, g / 255, b / 255, a / 255);
  }
  
}
