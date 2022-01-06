export class Memento {
  readonly state: any

  constructor(state) {
    this.state = state
  }

  getState(): any {
    return this.state
  }
}

export class Originator {
  private state: any

  constructor() {
  }

  setState(state: any) {
    this.state = state
  }
  getState(): any {
    return this.state
  }
  save(): Memento {
    return new Memento(this.state)
  }
  restore(memento: Memento): void {
    this.state = memento?.getState()
  }
}

export class CareTaker {
  mementoList: Memento[] = []

  constructor() {}

  addMemento(memento: Memento) {
    this.mementoList.push(memento)
  }
  getMemento(): Memento {
    return this.mementoList.pop()
  }
  getMementoList() {
    return this.mementoList
  }
}

export interface IMemento {
  originator: Originator
  caretaker: CareTaker
}

export abstract class ConcreteMemento implements IMemento {
  originator: Originator
  caretaker: CareTaker

  protected constructor() {
    this.caretaker = new CareTaker()
    this.originator = new Originator()
  }

  setState(state: any) {
    this.originator.setState(state)
  }

  save() {
    this.caretaker.addMemento(this.originator.save())
  }

  getState(): any {
    return this.originator.getState()
  }

  restore(): void{
    this.originator.restore(this.caretaker.getMemento())
  }
  display() {
    console.log('*** originator::state =>', this.getState())
    console.log('*** caretaker::memento =>', this.caretaker.getMementoList())
  }
}

// class MyMemento extends ConcreteMemento {
//   constructor() {
//     super()
//   }
// }

// let history = new MyMemento()
//
// history.setState('State A')
// history.save()
// history.display()
//
// history.setState('State B1')
// history.setState('State B2')
// history.save()
// history.display()
//
// history.restore()
// history.display()
//
// history.restore()
// history.display()
