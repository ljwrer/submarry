const glob = require('globby')
const SoapOpera = require('SoapOpera')

class SoapOperaFounder {
  constructor () {
    this.soapOperaList = []
    this.subtitles = []
  }

  scanMovie () {
    return glob('*.(mp4|avi|mkv)')
  }

  async scanSubtitle () {
    this.subtitles = await glob('*.(ass|srt)')
  }

  isSoapOpera (fileName) {
    const seReg = /s\d+e\d+/i
    return seReg.test(fileName)
  }

  async scanSoapOpera () {
    const files = await this.scanMovie()
    const soapOperaFiles = files.filter(this.isSoapOpera)
    this.soapOperaList = soapOperaFiles.map(file => new SoapOpera(file))
  }

  marry () {
    this.soapOperaList.forEach(soapOpera => soapOpera.marry(this.subtitles))
  }

  async run(){
    await this.scanSoapOpera()
    await this.scanSubtitle()
    this.marry()
  }
}
