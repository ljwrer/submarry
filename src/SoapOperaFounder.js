const glob = require('globby')
const seReg = require('./config').seReg
const SoapOpera = require('./SoapOpera')

class SoapOperaFounder {
  constructor () {
    this.soapOperaMap = new Map()
    this.subtitleMap = new Map()
  }

  scanMovie () {
    return glob('')
  }

  async scan(match, map){
    const files = await glob(match)
    for(const file of files){
      const result = seReg.exec(file)
      if(result){
        map.set(result[0].toLowerCase(), file)
      }
    }
  }

  async scanSubtitle () {
    return this.scan('*.(ass|srt)', this.subtitleMap)
  }



  async scanSoapOpera () {
    return this.scan('*.(mp4|avi|mkv)', this.soapOperaMap)
  }

  async marry () {
    for(const [se,soapOpera] of this.soapOperaMap){
      await new SoapOpera(se, soapOpera).marry(this.subtitleMap)
    }
  }

  async run(){
    await this.scanSoapOpera()
    await this.scanSubtitle()
    await this.marry()
  }
}

module.exports = SoapOperaFounder
