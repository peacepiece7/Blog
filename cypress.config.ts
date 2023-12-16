import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
    setupNodeEvents(on, config) {
      on('after:run', () => {
        console.log("Killing 'npm run dev:test' and 'npm run mock'...")
        console.log('CONFIG :', config)
        process.exit()
      })
    }
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
})
