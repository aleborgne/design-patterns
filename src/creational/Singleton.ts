
class Singleton {
  private static instance: Singleton

  private constructor() {

  }

  public static getInstance(): Singleton {
    if (this.instance == null) {
      this.instance = new Singleton()
    }

    return this.instance
  }

  public static checkTime() {
    let d = new Date()
    console.log(d.toString())
  }
}

console.log(Singleton.getInstance())
Singleton.checkTime()