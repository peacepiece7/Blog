describe('/ visit rending page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('renders coorectly', () => {
    cy.contains('TaeUk Jung')
    cy.contains('Latest Logs')
    cy.title().should('eq', 'Web Log')
  })
})
