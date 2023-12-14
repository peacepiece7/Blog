describe('My First Test', () => {
  beforeEach(() => {
    cy.viewport(1200, 800)
    cy.visit('/')
  })

  it('renders', () => {
    cy.contains('TaeUk Jung')
    cy.contains('Latest Logs')
    cy.title().should('eq', 'Web Log')
  })
})
