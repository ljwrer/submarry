const path = require('path')
const fs = require('fs-extra')
const ora = require('ora');
const spinner = ora('Loading unicorns').start()
class SoapOpera {
  constructor (se, fileName) {
    this.fileName = fileName
    this.fileInfo = path.parse(this.fileName)
    this.se = se
  }

  /**
   *
   * @param subtitleMap {Map}
   */
  async marry(subtitleMap){
    spinner.info(`find soap opera: ${this.fileName}`)
    const matchSubtitle = subtitleMap.get(this.se)
    if(matchSubtitle){
      spinner.succeed(`find match subtitle: ${matchSubtitle}`)
      await this.rename(matchSubtitle)
    }else {
      spinner.warn('match subtitle not found')
    }
  }

  async rename(subtitle){
    const ext = path.extname(subtitle)
    const soapOperaPath = path.format({
      dir: this.fileInfo.dir,
      name: this.fileInfo.name,
      ext
    })
    if(subtitle !== soapOperaPath){
      spinner.info(`${subtitle} move to ${soapOperaPath}`)
      try{
        await fs.move(subtitle, soapOperaPath)
        spinner.succeed('move success')
      }catch (e) {
        spinner.fail('move fail')
      }
    }
  }

}
module.exports = SoapOpera
