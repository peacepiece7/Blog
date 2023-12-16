const { e2eManger } = require('./e2eManager.cjs')

const [serverChild, mockChild] = e2eManger.startBefore()
const [cyChild] = e2eManger.start()

cyChild.stdout.on('data', (data) => {
  console.log(`stdout data: ${data}`)
})
// cyChild.stdout.on('error', (error) => {
//   console.log(`stdout error : ${error}`)
// })
// cyChild.stdout.on('pause', (data) => {
//   console.log(`stdout pause: ${data}`)
// })
// cyChild.stdout.on('close', (code) => {
//   console.log(`stdout close: ${code}`)
// })
// cyChild.stdout.on('end', (code) => {
//   console.log(`stdout end: ${code}`)
// })

// cyChild.stderr.on('error', (error) => {
//   console.log(`stderr error : ${error}`)
// })
// cyChild.stderr.on('pause', (data) => {
//   console.log(`stderr pause: ${data}`)
// })
// cyChild.stderr.on('close', (code) => {
//   console.log(`stderr close: ${code}`)
// })
// cyChild.stderr.on('end', (code) => {
//   console.log(`stderr end: ${code}`)
// })

// cyChild.on('error', (error) => {
//   console.log(`child process error with code ${error}`)
// })

// cyChild.on('message', (message) => {
//   console.log(`child process message with code ${message}`)
// })

// cyChild.on('close', (code) => {
//   console.log(`child process exited with code ${code}`)
//   e2eManger.stop()
// })
