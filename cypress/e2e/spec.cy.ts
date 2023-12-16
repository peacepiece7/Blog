describe('렌딩 페이지', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('"Web Log"가 타이틀에 포함됩니다.', () => {
    cy.title().should('include', 'Web Log')
  })

  it('프로파일 이미지와 이름이 화면에 존재합니다.', () => {
    cy.findByAltText('profile')
    cy.contains('TaeUk Jung')
    cy.contains('Latest Logs')
  })

  it('5개 이상의 최신 포스트가 화면에 출력됩니다.', () => {
    cy.get('#postList').should('exist').children().should('have.length.greaterThan', 4)
    cy.get('#postList').children().first().should('contain', 'Created At')
    cy.get('#postList').children().first().should('contain', 'Tags')
  })

  it('포스트를 클릭하면 상세 페이지로 이동합니다.', () => {
    cy.get('#postList').should('exist').children().first().click()
    cy.url().should('include', '/log/')

    // * 로그 제목과 TOC가 존재해야합니다.
    cy.get('h1').should('exist')
    cy.contains('Table of Contents')

    // * title 태그에 포스트의 제목(h1)이 포함되어야 합니다.
    cy.should('exist', 'h1')
    cy.get('h1')
      .first()
      .invoke('text')
      .then((h1Text) => cy.title().should('include', h1Text))
  })

  it('네비게이션에서 Log를 클릭하면 "/logs" 페이지로 이동합니다.', () => {
    cy.get('nav').contains('Log').click()
    cy.url().should('include', '/logs')
    cy.get('h1')
      .invoke('text')
      .then((h1Text) => cy.wrap(h1Text.toLowerCase()).should('include', 'logs'))
  })

  it('네비게이션에서 Wiki를 클릭하면 "/wiki"페이지로 이동합니다.', () => {
    cy.get('nav').contains('Wiki').click()
    cy.url().should('include', '/wiki')
    cy.get('h1')
      .invoke('text')
      .then((h1Text) => cy.wrap(h1Text.toLowerCase()).should('include', 'wiki'))
  })
})
