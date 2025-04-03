import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import CodeBlock from './components/CodeBlock';
import { GlobalStyles, theme } from './styles/globalStyles';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  background: #fff;
  padding: ${({ theme }) => theme.spacing.xl};
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  background: #fff;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

function App() {
  const sampleCode = `{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}`;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header>
        <h1>Yet Kenya API Documentation</h1>
      </Header>
      <Container>
        <Section>
          <h2>Authentication</h2>
          <p>To authenticate your requests, include your API key in the Authorization header:</p>
          <CodeBlock
            code={`Authorization: Bearer YOUR_API_KEY`}
            language="bash"
          />
          <h3>Example Response:</h3>
          <CodeBlock
            code={sampleCode}
            language="json"
          />
        </Section>
      </Container>
    </ThemeProvider>
  );
}

export default App;
