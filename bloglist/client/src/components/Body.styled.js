import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 15px;
  margin-right: 15px;

  @media only screen and (min-width: 600px) {
    margin-left: 150px;
    margin-right: 150px;
  }
`