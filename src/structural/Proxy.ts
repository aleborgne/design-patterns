// Remote
// Virtual
// Protection

interface ISubject {
  request(): void
}

class RealSubject implements ISubject {
  constructor() {
    console.log("RealSubject instanciated")
  }

  request() {
    console.log('Do expensive operations')
  }
}

class ProxySubject implements ISubject {
  subject: RealSubject
  constructor() {
    console.log("ProxySubject instanciated")
  }

  request() {
    if (!this.subject) {
      this.subject = new RealSubject()
    }
    this.subject.request()
  }
}



export class ProxyPattern {
  static run() {
    console.log('\n*** Proxy Pattern')

    let proxy = new ProxySubject()
    proxy.request()
  }
}
