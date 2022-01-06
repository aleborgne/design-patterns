class PlugEU {
  adapter: ITarget

  constructor(adapter: ITarget) {
    this.adapter = adapter
  }

  setAdapter(adapter: ITarget) {
    this.adapter = adapter
  }
}

interface ITarget {
  plug(): void
}

type CompatiblePlug = PlugUS | PlugAsia

class Adapter implements ITarget {
  plugAdaptee: CompatiblePlug

  constructor(adaptee: CompatiblePlug) {
    this.plugAdaptee = adaptee
  }

  plug() {
    this.plugAdaptee.specificPlug()
  }
}

interface IAdaptee {
  specificPlug()
}

class PlugUS {
  specificPlug() {
    console.log('Plug the US way')
  }
}

class PlugAsia {
  specificPlug() {
    console.log('Plug the asian way')
  }
}

class PlugRussia {
  specificPlug() {
    console.log('Plug the russian way')
  }
}

export class AdapterPattern {

  static run() {
    console.log('\n*** Adapter Pattern')

    let europeanPlug = new PlugEU(new Adapter(new PlugUS()))

    europeanPlug.adapter.plug()
    europeanPlug.setAdapter(new Adapter(new PlugAsia()))
    europeanPlug.adapter.plug()
    europeanPlug.setAdapter(new Adapter(new PlugRussia()))
    europeanPlug.adapter.plug()

  }
}
