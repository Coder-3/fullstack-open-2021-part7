import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: monospace;
  }

  h1 {
    padding: 15px;
  }

  h2 {
    padding: 5px;
  }

  button {
    padding: 5px 20px;
    border-radius: 2px;
    color: dimgray;
    border: 2px solid dimgray;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;
  height: 100%;

  @media only screen and (min-width: 600px) {
    margin-left: 150px;
    margin-right: 150px;
  } 
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: 750px) {
    flex-direction: row;
  }
`

export const ResponsiveInput = styled.input`
  margin-bottom: 5px;

  @media only screen and (min-width: 600px) {
    margin-right: 15px;
  }
`

export const Section = styled.section`
  margin: 15px;
`

export default GlobalStyle