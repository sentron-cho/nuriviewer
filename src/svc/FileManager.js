import { remote } from 'electron'
import XLSX from 'xlsx'
import fs from 'fs'

const showDialogFiles = (filters = []) => {
  const options = {
    properties: ['openFile'],
    filters: filters,
  }
  const files = remote.dialog.showOpenDialogSync(options)
  return files
}

const DATA_ROOT = 'C:/ModelMapper' + '/data' //remote.app.getAppPath() + '/data'
const PROJ_FILE_NAME = 'project.map'
const MAPPING_XML_FILE_NAME = 'mapping.xml'
const MAPPING_XLS_FILE_NAME = 'mapping.xls'

const creatDataRoot = (path = DATA_ROOT) => {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
  return path
}

const File = {
  DATA_ROOT: DATA_ROOT,
  PROJ_FILE_NAME: PROJ_FILE_NAME,
  MAPPING_XML_FILE_NAME: MAPPING_XML_FILE_NAME,
  MAPPING_XLS_FILE_NAME: MAPPING_XLS_FILE_NAME,

  openDialogFile: (filters = []) => {
    const files = showDialogFiles(filters)
    return files && files[0] ? files[0] : null
  },
  openTxtFile: (filters = [{ name: 'TXT', extensions: ['txt'] }]) => {
    const files = showDialogFiles(filters)
    return files && files[0] ? files[0] : null
  },
  readFile: (file) => {
    if (!file) return null

    // xml -> json으로 파싱
    const text = fs.readFileSync(file, { encoding: 'utf-8' }).toString()
    if (!text) return null

    return text
  },
  saveFile: (path = null, jsondata = {}) => {
    if (!path) path = DATA_ROOT
    // 디렉토리가 존재하지 않을 경우 에만 생성
    creatDataRoot(path)

    if (jsondata instanceof Object) jsondata = JSON.stringify(jsondata)
    const file = `${path}/${PROJ_FILE_NAME}`
    fs.writeFileSync(file, jsondata)
    return file
  },
  loadFile: (path = null) => {
    if (!path) path = DATA_ROOT
    // 디렉토리가 존재하지 않을 경우 에만 생성
    creatDataRoot(path)

    // if (jsondata instanceof Object) jsondata = JSON.stringify(jsondata)
    const text = fs.readFileSync(`${path}/${PROJ_FILE_NAME}`)
    const jsondata = JSON.parse(text)
    return jsondata
  },
  exportFile: (path = DATA_ROOT, jsons = []) => {
    // 디렉토리가 존재하지 않을 경우 에만 생성
    creatDataRoot(path)

    // var options = { ignoreComment: true, alwaysChildren: true }
    // const object = convert.xml2js(jsondata, options)
    let jsondata = jsons[0]
    var object = XLSX.utils.json_to_sheet(jsondata)
    const file = `${path}/${MAPPING_XML_FILE_NAME}`
    // fs.writeFileSync(file, object)
    XLSX.writeFile(object, file)
    return file
  },
  writeXlsFile: (path = DATA_ROOT, jsons = []) => {
    // 디렉토리가 존재하지 않을 경우 에만 생성
    creatDataRoot(path)

    // step 1. workbook 생성
    let wb = XLSX.utils.book_new()

    // step 2. 시트 만들기

    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.
    // var newWorksheet = XLSX.utils.aoa_to_sheet(getExcelData())
    jsons.forEach((json) => {
      const sdata = [
        ['protocal', json.protocol],
        ['deviceId', json.deviceId],
        ['version', json.version],
      ]
      let wsheet = XLSX.utils.aoa_to_sheet(sdata)
      XLSX.utils.book_append_sheet(wb, wsheet, `${json.deviceId} MAP INFO`)

      if (!json.componentDataSet) return

      const data = json.componentDataSet
      wsheet = XLSX.utils.json_to_sheet(data)
      XLSX.utils.book_append_sheet(wb, wsheet, `${json.deviceId} MAPPING`)
    })

    // step 4. 엑셀 파일 만들기
    const file = `${path}/${MAPPING_XLS_FILE_NAME}`
    XLSX.writeFile(wb, file)

    return file
  },
}

export default File
