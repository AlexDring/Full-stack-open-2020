/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('Login form is shown', function() {
    cy.contains('Login to the application')
    cy.get('#loginForm')
      .contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Logged in as Matti Luukkainen')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai23')
      cy.get('#password').type('salaine423423n')
      cy.get('#login-button').click()

      cy.get('.error').contains('invalid username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login('mluukkai', 'salainen')
      })

      it('A blog can be created', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('A blog can be created!')
        cy.get('#author').type('Blogman Dan')
        cy.get('#url').type('www.myblog.com')
        cy.get('button').contains('create').click()

        cy.get('.success').contains('A blog can be created! by Blogman Dan has been added')
        cy.get('#single-blog').contains('A blog can be created! Blogman Dan')
        cy.get('div#single-blog').should('have.length', 1)
      })
      it('A blog can be liked', function() {
        cy.createBlog('Like me!!', 'blogman dan','submitme.com' )

        cy.get('#single-blog').contains('Like me!! blogman dan').as('likedBlog')

        cy.get('@likedBlog')
          .get('.showButton')
          .click()
          .get('#like-button')
          .click()

        cy.get('@likedBlog')
          .get('.hiddenView')
          .contains('likes: 1')
      })
      describe('multiple blogs created', function () {
        beforeEach(function() {
          // cy.get('#visibility-show').contains('new blog').click()
          cy.createBlog('Blog 1', 'mluukkai','mluukkai.com' )
          cy.createBlog('Blog 2', 'mluukkai','mluukkai.com' )
          cy.createBlog('Blog 3', 'mluukkai','mluukkai.com' )
        })
        it('a blog can be deleted', function() {
          cy.get('.blogs')
            .contains('Blog 2')
            .get('button')
            .contains('show')
            .click()
            .get('.hiddenView')
            .contains('delete')
            .click()

          cy.get('div#single-blog').should('have.length', 2)
        })
        it('a user can\'t delete blogs created by other users', function() {
          const user = {
            name: 'Test',
            username: 'Admin',
            password: 'Test'
          }
          cy.request('POST', 'http://localhost:3003/api/users/', user)
          cy.contains('logout').click()
          cy.login('Admin', 'Test')

          cy.get('#single-blog').should('not.contain', 'delete')
        })
        it('the blogs are ordered according to likes with the blog with the most likes being first', function() {
          cy.clickLike('Blog 1').click().click().click().click()
          cy.clickLike('Blog 2').click().click().click()
          cy.clickLike('Blog 3').click().click().click().click().click().click()

          cy.get('.blogs>#single-blog').then((blogs) => {
            cy.get(blogs).eq(0).should('contain', 'likes: 6')
            cy.get(blogs).eq(1).should('contain', 'likes: 4')
            cy.get(blogs).eq(2).should('contain', 'likes: 3')
          })
        })
      })
    })
  })
})
