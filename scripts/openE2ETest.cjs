const { e2eManger } = require('./e2eManager.cjs')

const [_serverChild, _mockChild] = e2eManger.startBefore()
const [cyChild] = e2eManger.open()

cyChild.stdout.on('data', (data) => {
  console.log(data)
})

cyChild.on('disconnect', () => {
  console.log('연결이 갑자기 끊겼습니다.')
})

cyChild.on('close', () => {
  console.log('자식 프로세스가 종료되었습니다.')
})

cyChild.on('exit', (code) => {
  console.log(`child process exited with code ${code}`)
  e2eManger.stop(code)
})
