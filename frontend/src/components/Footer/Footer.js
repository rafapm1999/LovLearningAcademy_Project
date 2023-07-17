import React from "react";
import {
  Main,
  Container,
  Row,
  Column,
  LinkContainer,
  FooterLink,
  Heading,
} from "./FooterStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareTwitter,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

//Declaramos el footer y hacemos la estructura importando los elementos declarados
// en FooterStyles.js
const Footer = () => {
  return (
    <Main>
      <Container>
        <Row>
          <Column>
            <Heading>Socials</Heading>
            <LinkContainer>
              <FooterLink target="blank" href="https://www.github.com">
                <FontAwesomeIcon icon={faSquareTwitter} size="2xl" />
              </FooterLink>
              <FooterLink target="blank" href="https://www.instagram.com">
                <FontAwesomeIcon icon={faLinkedin} size="2xl" />
              </FooterLink>
              <FooterLink target="blank" href="https://www.facebook.com">
                <FontAwesomeIcon icon={faGithub} size="2xl" />
              </FooterLink>
            </LinkContainer>
          </Column>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="/about">Info</FooterLink>
          </Column>
          <Column>
            <Heading>Contact us</Heading>
            <FooterLink href="/contact">Contact form</FooterLink>
          </Column>
        </Row>
      </Container>
    </Main>
  );
};
export default Footer;
