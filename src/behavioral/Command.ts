import { ConcreteMemento } from './Memento'

class CommandMemento extends ConcreteMemento {
  command: ICommand

  constructor() {
    super()
  }

  getState(): ICommand {
    return super.getState() as ICommand
  }
}

class Invoker {
  btnUp: ICommand
  btnRight: ICommand
  btnDown: ICommand
  btnLeft: ICommand
  history: CommandMemento

  constructor(commandUp: ICommand, commandRight: ICommand, commandDown: ICommand, commandLeft: ICommand) {
    this.btnUp = commandUp
    this.btnRight = commandRight
    this.btnDown = commandDown
    this.btnLeft = commandLeft

    this.history = new CommandMemento()
  }

  clickBtnUp() {
    console.log('EVENT::BTN::UP')
    this.btnUp.execute()
    this.history.setState(this.btnUp)
    this.history.save()
    // this.history.display()
  }

  clickBtnDown() {
    console.log('EVENT::BTN::DOWN')
    this.btnDown.execute()
    this.history.setState(this.btnDown)
    this.history.save()
    // this.history.display()
  }

  clickUndo() {
    console.log('EVENT::UNDO')
    this.history.restore()
    this.history.getState()?.undo()
    // this.history.display()
  }
}

interface Receiver {
  turnOn(): void
  turnOff(): void
  display(): void
}

class Light implements Receiver {
  isOn: boolean

  constructor(isOn: boolean = false) {
    this.isOn = isOn
  }

  turnOn() {
    this.isOn = true
  }
  turnOff() {
    this.isOn = false
  }
  display() {
    console.log('Light::isOn::', this.isOn)
  }
}

interface ICommand {
  execute(): void
  undo(): void
}

class TurnOnLightCommand implements ICommand {
  light: Light

  constructor(light: Light) {
    this.light = light
  }

  execute() {
    this.light.turnOn()
  }

  undo() {
    this.light.turnOff()
  }
}

class TurnOffLightCommand implements ICommand {
  light: Light

  constructor(light: Light) {
    this.light = light
  }

  execute() {
    this.light.turnOff()
  }

  undo() {
    this.light.turnOn()
  }
}


// Client

let light = new Light()
let turnOnLightCmd = new TurnOnLightCommand(light)
let turnOffLightCmd = new TurnOffLightCommand(light)

let remote = new Invoker(turnOnLightCmd, null, turnOffLightCmd, null)

light.display()
console.log('---')
console.log('*** Start commands')

remote.clickBtnUp()
light.display()

remote.clickBtnUp()
light.display()

remote.clickBtnDown()
light.display()

remote.clickBtnUp()
light.display()

console.log('---')
console.log('*** Start undos')

remote.clickUndo()
light.display()

remote.clickUndo()
light.display()

remote.clickUndo()
light.display()

remote.clickUndo()
light.display()

