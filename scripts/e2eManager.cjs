const { exec } = require('child_process')
const path = require('path')
const rimraf = require('rimraf')

class E2EManger {
  constructor() {
    this.devController = new AbortController()
    this.mockController = new AbortController()
    this.cyController = new AbortController()
  }

  /**
   * @description mock, front 서버를 실행합니다.
   * @returns [serverChild, mockChild]
   */
  startBefore() {
    this.#killProcess()
    this.#removeCacheData()
    console.log("🛠️ 'npm run dev:test'와 'npm run mock'를 실행합니다.\n")
    const serverChild = exec('npm run dev:test', { signal: this.devController.signal }, (error) => {
      if (error) {
        this.#errorInterceptor(error)
      }
    })

    console.log('✅ devChild 가 실행되었습니다.\n')
    const mockChild = exec('npm run mock', { signal: this.mockController.signal }, (error) => {
      if (error) {
        this.#errorInterceptor(error)
      }
    })

    console.log('✅ mockChild 가 실행되었습니다.\n')
    return [serverChild, mockChild]
  }

  /**
   * @description Cypress e2e 테스트를 시작합니다.
   */
  run() {
    console.log('🛠️ Cypress를 실행합니다. \n')
    const cyChild = exec('npm run cy:run', { signal: this.cyController.signal }, (error) => {
      if (error) {
        this.#errorInterceptor(error)
      }
    })
    return [cyChild]
  }

  /**
   * @description Cypress를 엽니다.
   */
  open() {
    console.log('🛠️ Cypress를 실행합니다. \n')
    const cyChild = exec('npm run cy:open', { signal: this.cyController.signal }, (error) => {
      if (error) {
        this.#errorInterceptor(error)
      }
    })
    return [cyChild]
  }

  stop(code = 0) {
    console.log('🛠️ 서버를 모두 종료합니다. \n')
    if (this.devController.signal.aborted) this.devController.abort()
    if (this.mockController.signal.aborted) this.mockController.abort()
    if (this.cyController.signal.aborted) this.cyController.abort()

    this.#removeCacheData()
    process.exit(code)
  }

  #removeCacheData() {
    console.log('🛠️ Next.js 캐시를 삭제합니다.\n')

    const nextjsBuildDir = path.resolve(__dirname, '../.next')

    const [successServer, errorServer] = this.#removeDir(`${nextjsBuildDir}/server`)
    const [successCache, errorCache] = this.#removeDir(`${nextjsBuildDir}/cache`)
    const [successStatic, errorStatic] = this.#removeDir(`${nextjsBuildDir}/static`)

    if (!successServer || !successCache || !successStatic) {
      this.#errorInterceptor(
        '.next 디렉터리를 삭제하는 중 에러가 발생했습니다. 자세한 내역은 아래 내용을 참고해주세요',
        `PATH : ${nextjsBuildDir}`,
        errorServer,
        errorCache,
        errorStatic
      )
    }
  }

  #removeDir(path) {
    try {
      rimraf.sync(path)
      return [true, null]
    } catch (e) {
      return [false, e]
    }
  }

  #errorInterceptor(...messages) {
    messages.forEach((message) => message ?? console.error(message))
    process.exit()
  }

  #killProcess(port = 3030) {
    console.log(`🛠️ port ${port} 를 사용하는 프로세스를 종료합니다.\n`)
    const command = process.platform === 'win32' ? `taskkill /F /IM ${port}` : `kill -9 ${port}`
    exec(command) // 윈도우에서는 port에 해당하는 프로세스가 없으면 에러가 발생하지만 중요하지 않으므로 무시합니다.
  }
}

const e2eManger = new E2EManger()
module.exports = { e2eManger }
