// src/components/CodeBlock.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';

// Register languages
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('bash', bash);

const CodeBlockContainer = styled.div`
  position: relative;
  margin: ${({ theme }) => theme.spacing.md} 0;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 0 !important;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 14px !important;
`;

const CopyButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  font-size: 12px;
  opacity: 0.8;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`;

const CodeBlock = ({ code, language = 'json' }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <CodeBlockContainer>
      <StyledSyntaxHighlighter
        language={language}
        style={vs2015}
        showLineNumbers
      >
        {code}
      </StyledSyntaxHighlighter>
      
      <CopyButton onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </CopyButton>
    </CodeBlockContainer>
  );
};

export default CodeBlock;