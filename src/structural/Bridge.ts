  interface ICoordinates {
    x: number
    y: number
  }

  interface ISize {
    w: number
    h: number
  }

  interface IColor {
    hexaCode: string
  }

  interface IShape {
    coordinates: ICoordinates
    size: ISize
    color: IColor
  }

  abstract class GraphicObject implements IShape {
    coordinates: ICoordinates
    size: ISize
    color: IColor

    constructor(coordinates: ICoordinates, size: ISize, color: IColor) {
      this.coordinates = coordinates
      this.size = size
      this.color = color
    }
  }

  class Square extends GraphicObject {

  }

  class Circle extends GraphicObject {

  }

  export class BridgePattern {
    static run() {
      console.log('\n*** Bridge Pattern')
      let sq1 = new Square({ x: 0, y: 0 }, { w: 10, h: 10 }, { hexaCode: '#FF0000' })
      let circle1 = new Circle({ x: 0, y: 0 }, { w: 10, h: 10 }, { hexaCode: '#FF0000' })
    }
  }
