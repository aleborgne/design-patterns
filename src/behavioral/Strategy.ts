interface IFlyBehavior {
  fly(): void
}

export class FlyLow implements IFlyBehavior {
  constructor() {}
  fly() {
    console.log('FLY::low')
  }
}

export class FlyFast implements IFlyBehavior {
  fly() {
    console.log('FLY::fast')
  }
}

interface IDuck  {
  flyBehavior: IFlyBehavior
}

export class Duck implements IDuck {
  flyBehavior: IFlyBehavior

  constructor(fb: IFlyBehavior) {
    this.flyBehavior = fb
  }

  fly() {
    this.flyBehavior.fly()
  }
}

export class DuckMallard extends Duck {
  constructor() {
    super(new FlyFast())
  }
}

let duck = new Duck(new FlyLow())
duck.fly()

let duckMallard = new DuckMallard()
duckMallard.fly()