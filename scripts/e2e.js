import { exec } from 'child_process'

const devController = new AbortController()
const mockController = new AbortController()
const cyController = new AbortController()

on('before:run', () => {
  console.log("Starting 'npm run dev:test' and 'npm run mock'...")
  const _devChild = exec('npm run dev:test', { signal: devSignal }, (error) => {
    if (error) {
      console.error(error)
      process.exit()
    }
  })
  const _mockChild = exec('npm run mock', { signal: mockSignal }, (error) => {
    if (error) {
      console.error(error)
      process.exit()
    }
  })
})
