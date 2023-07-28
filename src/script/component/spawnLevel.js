export const SpawnLevel = {
  level1: {
    general: ["singleBox", "singleCylinder"],
    single: ["singleBox", "singleCylinder"],
  },

  level2: {
    general: ["singleCone", "setBox", "setCone"],
    single: ["singleBox", "singleCylinder", "singleCone", "setBox", "setCone"],
  },

  level3: {
    general: ["setBox", "adjoinBox", "matrixCyliner", "moveSphere"],
    single: ["singleBox", "singleCylinder", "singleCone"],
  },

  level4: {
    general: [
      "setCone",
      "adjoinBox",
      "matrixCyliner",
      "matrixCone",
      "rotateBox",
      "moveSphere"
    ],

    single: [
      "singleTree",
      "singleBox",
      "singleCylinder",
      "singleCone",
      "setBox",
    ],
  },

  level5: {
    general: [
      "adjoinBox",
      "adjoinBox2",
      "matrixCyliner",
      "matrixCone",
      "rotateBox",
      "moveSphere"
    ],

    single: [
      "fallBox",
      "singleBox",
      "singleCylinder",
      "singleCone",
      "setBox",
      "setCone",
      "singleTree",
    ],
  },
};
