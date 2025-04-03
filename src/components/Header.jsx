// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const Navigation = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const NavItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/">
        <LogoImage src="/logo.svg" alt="Yet Kenya API" />
        Yet Kenya API Documentation
      </Logo>
      <Navigation>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/api-reference">API Reference</NavItem>
        <NavItem to="/guides">Guides</NavItem>
        <NavItem to="/support">Support</NavItem>
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;