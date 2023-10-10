import styled from "styled-components";

// Container main del footer

export const Main = styled.div`
  background: #d6ccc2;
  height: auto;
  width: 100vw;
  flex-shrink: 1;
  

  // Añadimos 2 mediaquery.

  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
  @media (max-width: 800px) {
    padding: 70px 30px;
  }
`;
// Container que envolverá la info del footer
export const Container = styled.div`
  padding: 2.6em;
  
`;
// Creamos las columnas.
export const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 25vw;
`;
// Creamos las filas.
export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;


  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
//Componente envoltorio para los links
export const LinkContainer = styled.div`
  display: inline;
`
//Creamos los links
export const FooterLink = styled.a`
margin: 0 1em;
  background-color: none;
  color: black;
  font-size: 1.2rem;
  text-decoration: none;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;

  &:hover {
    color: white;
  }
`;
// Creamos el HEADER del footer.
export const Heading = styled.p`
  font-size: 1.5rem;
  color: black;
  font-style: italic;
  margin: 1rem;
`;
