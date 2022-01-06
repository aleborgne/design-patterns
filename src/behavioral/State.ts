
class LightContext {
  state: State

  constructor() {
    console.log('\n ***** LIGHT *****')
    this.state = new LightStateOff(this)
    this.display()
  }

  public switchOn() {
    this.state.switchOn()
    this.display()
  }
  public switchOff() {
    this.state.switchOff()
    this.display()
  }
  changeState(state: State) {
    this.state = state
  }
  display() {
    console.log('State:', this.state)
  }

}

interface State {
  switchOn()
  switchOff()
}

abstract class ConcreteState implements State  {
  context: LightContext

  constructor(context: LightContext) {
    this.context = context
  }

  switchOn() {
    throw new Error('Already ON')
  }

  switchOff() {
    throw new Error('Already OFF')
  }
}

class LightStateOn extends ConcreteState {
  switchOff() {
    this.context.changeState(new LightStateOff(this.context))
  }

}

class LightStateOff extends ConcreteState {
  switchOn() {
    this.context.changeState(new LightStateOn(this.context))
  }
}

let light = new LightContext()

const execute = (context, action) => {
  try {
    context[action]()
  } catch (e) {
    console.error(e.toString())
  }
}

execute(light, 'switchOn')
execute(light, 'switchOff')
execute(light, 'switchOff')
execute(light, 'switchOn')










function annotateName(target, name, desc) {
  var method = desc.value;
  desc.value = function () {
    var prevMethod = this.currentMethod;
    this.currentMethod = name;
    method.apply(this, arguments);
    this.currentMethod = prevMethod;
  }
}

class Toaster implements ToasterOperations {
  state: ToasterState

  constructor() {
    console.log('\n ***** TOASTER *****')
    this.state = new IdleState()
    this.display()
  }

  insertBread(): void {
    this.state = this.state.insertBread()
    this.display()
  }

  pullLever(): void {
    this.state = this.state.pullLever()
    this.display()
  }

  ejectBread(): void {
    this.state = this.state.ejectBread()
    this.display()
  }

  removeBread(): void {
    this.state = this.state.removeBread()
    this.display()
  }
  display() {
    console.log('State:', this.state)
  }
}

interface ToasterOperations {
  insertBread(): void
  pullLever(): void
  ejectBread(): void
  removeBread(): void
}

abstract class ToasterState implements ToasterOperations  {
  currentMethod: string

  @annotateName
  insertBread(): ToasterState {
    throw new Error(`Cannot do ${this.currentMethod}`)
  }

  @annotateName
  pullLever(): ToasterState {
    throw new Error(`Cannot do ${this.currentMethod}`)
  }

  @annotateName
  ejectBread(): ToasterState {
    throw new Error(`Cannot do ${this.currentMethod}`)
  }

  @annotateName
  removeBread(): ToasterState {
    throw new Error(`Cannot do ${this.currentMethod}`)
  }
}

class IdleState extends ToasterState {
  public insertBread(): ToasterState {
    return new BreadInsertedState()
  }
}

class BreadInsertedState extends ToasterState {
  public pullLever(): ToasterState {
    return new ToastingState()
  }
}

class ToastingState extends ToasterState {
  public ejectBread(): ToasterState {
    return new BreadEjectedState()
  }
}

class BreadEjectedState extends ToasterState {
  public removeBread(): ToasterState {
    return new IdleState()
  }
}

let toaster = new Toaster()

execute(toaster, 'insertBread')
execute(toaster, 'pullLever')
execute(toaster, 'ejectBread')
execute(toaster, 'removeBread')

execute(toaster, 'pullLever')
execute(toaster, 'removeBread')

