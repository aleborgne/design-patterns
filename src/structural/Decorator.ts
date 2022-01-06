
abstract class Mind {
  knowledge: string[] = []

  constructor() {
  }

  public abstract getKnowledge()
  public display() {
    console.log("Knowledge", this.getKnowledge())
  }
}

class EmptyMind extends Mind {
  knowledge: string[] = ["basics"]

  getKnowledge() {
    return this.knowledge
  }
}

class AverageMind extends Mind {
  knowledge: string[] = ["basics", "literature"]

  getKnowledge() {
    return this.knowledge
  }
}

abstract class StudyDecorator extends Mind {

  abstract getKnowledge()
}


class StudyScience extends StudyDecorator {
  mind: Mind

  constructor(mind: Mind) {
    super()
    this.mind = mind
  }

  getKnowledge(): string[] {
    console.log('Do some stuff')
    return [
      ...this.mind.getKnowledge(),
      'science'
    ]
  }
}

export class DecoratorPattern {
  static run() {
    console.log('\n*** Decorator Pattern')

    let mindA = new EmptyMind()
    mindA.display()

    let mindB = new StudyScience(mindA)
    mindB.display()

    let mindC = new StudyScience(new StudyScience(new AverageMind()))
    mindC.display()
  }
}
