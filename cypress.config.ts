import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.PORT || 3000}`,
    defaultCommandTimeout: 30000, // 30 seconds
    setupNodeEvents(on, config) {
      on('after:run', () => {
        console.log("Killing 'npm run dev:test' and 'npm run mock'...")
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
