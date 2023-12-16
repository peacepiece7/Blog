const { exec } = require('child_process')
const path = require('path')
const rimraf = require('rimraf')

class E2EManger {
  constructor() {
    this.devController = new AbortController()
    this.mockController = new AbortController()
    this.cyController = new AbortController()
  }

  #removeCache() {
    console.log('@@@@ e2e 테스트를 시작하기 전 기존 캐시를 모두 삭제합니다. @@@@')
    const nextjsBuildDir = path.resolve(__dirname, '../.next')
    const [success, error] = this.#removeDir(nextjsBuildDir)
    if (!success) {
      this.#errorInterceptor(
        '.next 디렉터리를 삭제하는 중 에러가 발생했습니다. 자세한 내역은 아래 내용을 참고해주세요',
        `PATH : ${nextjsBuildDir}`,
        error
      )
    }
  }

  /**
   * @returns [serverChild, mockChild]
   */
  startBefore() {
    this.#removeCache()
    console.log("Starting 'npm run dev:test' and 'npm run mock'...")
    const serverChild = exec('npm run dev:test', { signal: this.devController.signal }, (error) => {
      if (error) {
        this.#errorInterceptor(error)
      }
    })
    console.log(' devChild 가 실행되었습니다.')
    const mockChild = exec('npm run mock', { signal: this.mockController.signal }, (error) => {
      if (error) {
        this.#errorInterceptor(error)
      }
    })
    console.log('mockChild 가 실행되었습니다.')
    return [serverChild, mockChild]
  }

  start() {
    console.log('Starting Cypress...')
    const cyChild = exec('npm run cy:run', { signal: this.cyController.signal }, (error) => {
      if (error) {
        this.#errorInterceptor(error)
      }
    })
    return [cyChild]
  }

  async stop() {
    console.log('Stopping dev server and mock server...')
    this.devController.abort()
    this.mockController.abort()
    this.cyController.abort()
    removeDir(nextjsBuildDir)
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
    messages.forEach((message) => console.error(message))
    process.exit()
  }
}

const e2eManger = new E2EManger()
module.exports = { e2eManger }
