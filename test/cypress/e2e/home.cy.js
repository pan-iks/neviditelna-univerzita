// This test will pass when run against a clean Quasar project
describe('Landing', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  // test if json data loaded correctly
  it('has very important information', () => {
    cy.dataCy('heading')
      .should('contain', 'neviditelna-univerzita.cz')

    cy.dataCy('authinfo')
      .should('contain', 'Jan 15, 2021, 12:00:00 AM')

    cy.dataCy('event-create')
      .should('contain', 'Jan 14, 2002, 2:56:00 PM')
  })

  // verbose view
  it('has very important information', () => {
    cy.scrollTo('top')
    cy.get('[data-cy=verboseViewInactive]').should('exist')
    cy.get('[data-cy=verboseViewButton]').click({ force: true }) // cant get why is covered by another element but in cypress thumbnail is visible
    cy.wait(1000)
    cy.get('[data-cy=verboseViewInactive]').should('not.exist')
  })

  // open modal adn get secret
  it('has very important information', () => {
    // open modal get secret
    cy.get('[data-cy=secret]').click()
    cy.wait(1000)
    cy.get('[data-cy=secretModal]').should('contain', 'Password123')

    // secretModal
    cy.get('[data-cy=close-modal]').click()
    cy.get('[data-cy=secretModal]').should('not.exist')
  })
})

