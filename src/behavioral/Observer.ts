interface IObservable {
  observers: IObserver[]

  add(observer: IObserver)
  remove(observer: IObserver)
  notify()
}

interface IObserver {
  update()
}

class WeatherStation implements IObservable {
  observers: IObserver[] = []
  value: number

  add(o: IObserver) {
    this.observers.push(o)
  }
  remove(o: IObserver) {
    this.observers = this.observers.filter(observer => observer !== o)
  }
  notify() {
    for (let observer of this.observers) {
      observer.update()
    }
  }

  setValue(value: number) {
    this.value = value
    this.notify()
  }

  getValue() {
    return this.value
  }
 }

class ScreenDisplay implements IObserver {
  private station: WeatherStation
  private name: string

  constructor(station: WeatherStation, name: string) {
    this.station = station
    this.name = name
  }

  update() {
    console.log(`update::${this.name}`, this.station.getValue())
  }
}



let station: WeatherStation = new WeatherStation()
let screenDisplayA: ScreenDisplay = new ScreenDisplay(station, 'A')
let screenDisplayB: ScreenDisplay = new ScreenDisplay(station, 'B')
let screenDisplayC: ScreenDisplay = new ScreenDisplay(station, 'C')
station.add(screenDisplayA)
station.add(screenDisplayB)
station.add(screenDisplayC)

station.setValue(40)

station.remove(screenDisplayB)

station.setValue(100)


