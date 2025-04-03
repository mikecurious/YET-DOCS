// src/components/ApiEndpoint.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import CodeBlock from './CodeBlock';
import RequestExample from './RequestExample';
import ResponseExample from './ResponseExample';

const EndpointContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: #fff;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.card};
`;

const EndpointHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Method = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  margin-right: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: white;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.small};
  background-color: ${({ method, theme }) => {
    switch (method) {
      case 'GET': return theme.colors.info;
      case 'POST': return theme.colors.success;
      case 'PUT': return theme.colors.warning;
      case 'DELETE': return theme.colors.error;
      default: return theme.colors.secondary;
    }
  }};
`;

const EndpointUrl = styled.div`
  font-family: ${({ theme }) => theme.fonts.code};
  font-size: ${({ theme }) => theme.fontSizes.body};
  word-break: break-all;
`;

const EndpointTitle = styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.h3};
`;

const EndpointDescription = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.6;
`;

const TabsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const TabButtons = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TabButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: transparent;
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => 
    active ? theme.colors.primary : 'transparent'};
  color: ${({ active, theme }) => 
    active ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ active }) => active ? 'bold' : 'normal'};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.codeBackground};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const ApiEndpoint = ({ endpoint }) => {
  const [activeTab, setActiveTab] = useState('request');
  
  const { name, request, response, description } = endpoint;
  const { method, url, body } = request;
  
  return (
    <EndpointContainer>
      <EndpointHeader>
        <Method method={method}>{method}</Method>
        <EndpointUrl>{url.raw}</EndpointUrl>
      </EndpointHeader>
      
      <EndpointTitle>{name}</EndpointTitle>
      
      <EndpointDescription 
        dangerouslySetInnerHTML={{ __html: description }}
      />
      
      <TabsContainer>
        <TabButtons>
          <TabButton 
            active={activeTab === 'request'} 
            onClick={() => setActiveTab('request')}
          >
            Request
          </TabButton>
          <TabButton 
            active={activeTab === 'response'} 
            onClick={() => setActiveTab('response')}
          >
            Response
          </TabButton>
          <TabButton 
            active={activeTab === 'example'} 
            onClick={() => setActiveTab('example')}
          >
            Example
          </TabButton>
        </TabButtons>
        
        <TabContent>
          {activeTab === 'request' && (
            <RequestExample request={request} />
          )}
          
          {activeTab === 'response' && (
            <ResponseExample response={response} />
          )}
          
          {activeTab === 'example' && (
            <CodeBlock
              code={body?.raw || '// No request body example available'}
              language="json"
            />
          )}
        </TabContent>
      </TabsContainer>
    </EndpointContainer>
  );
};

export default ApiEndpoint;