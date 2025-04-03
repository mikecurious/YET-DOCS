// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #feb142 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.secondary};
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.h4};
  max-width: 800px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const GetStartedButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: white;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const FeatureCard = styled.div`
  background-color: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fontSizes.h4};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero>
        <HeroTitle>Yet Kenya API Documentation</HeroTitle>
        <HeroSubtitle>
          Robust and secure API designed to facilitate mobile money and card services, 
          including collections and disbursements.
        </HeroSubtitle>
        <GetStartedButton to="/api-reference">Get Started</GetStartedButton>
      </Hero>
      
      <SectionTitle>API Features</SectionTitle>
      
      <FeaturesGrid>
        <FeatureCard>
          <FeatureTitle>Mobile Money Integration</FeatureTitle>
          <FeatureDescription>
            Seamlessly integrate with Mpesa and other mobile money platforms for collections
            and disbursements.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureTitle>Card Payment Processing</FeatureTitle>
          <FeatureDescription>
            Process card payments with secure 3D Secure authentication and flexible payment options.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureTitle>Callback Notifications</FeatureTitle>
          <FeatureDescription>
            Receive real-time updates on transaction status through webhook callbacks.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureTitle>Transaction Tracking</FeatureTitle>
          <FeatureDescription>
            Track and query transaction status using unique identifiers and comprehensive reporting.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureTitle>Secure Authentication</FeatureTitle>
          <FeatureDescription>
            Implement token-based authentication for secure API access and data protection.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard>
          <FeatureTitle>High-Volume Support</FeatureTitle>
          <FeatureDescription>
            Built to handle high transaction volumes with reliability and performance.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
      
      <SectionTitle>Getting Started</SectionTitle>
      
      <p>
        To get started with the Yet Kenya API, you'll need to obtain your API credentials.
        Please contact Yet Kenya Limited to get your <strong>baseUrl</strong>, <strong>username</strong>, 
        <strong>password</strong>, and <strong>merchantId</strong>.
      </p>
      
      <p>
        Once you have your credentials, head over to the <Link to="/api-reference">API Reference</Link> section
        to explore the available endpoints and how to use them.
      </p>
    </HomeContainer>
  );
};

export default Home;