// src/pages/ApiReference.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import DocsSidebar from '../components/DocsSidebar';
import ApiEndpoint from '../components/ApiEndpoint';
import { parsePostmanCollection, flattenEndpoints } from '../utils/postmanParser';
import postmanCollection from '../data/postmanCollection';

// Parse the Postman collection
const parsedCollection = parsePostmanCollection(postmanCollection);
const allEndpoints = flattenEndpoints(parsedCollection);

const PageContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 64px);
`;

const ContentArea = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.body};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(252, 166, 0, 0.2);
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ApiReference = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  
  const handleSelectEndpoint = (endpoint) => {
    setSelectedEndpoint(endpoint);
  };
  
  // Filter endpoints based on search query
  const filteredEndpoints = allEndpoints.filter(endpoint => 
    endpoint.name.toLowerCase().includes(searchQuery) || 
    endpoint.path.toLowerCase().includes(searchQuery) ||
    endpoint.description.toLowerCase().includes(searchQuery)
  );
  
  return (
    <PageContainer>
      <DocsSidebar 
        collection={parsedCollection}
        onSelectEndpoint={handleSelectEndpoint}
        activeEndpoint={selectedEndpoint}
      />
      
      <ContentArea>
        <SearchBar
          type="text"
          placeholder="Search API endpoints..."
          value={searchQuery}
          onChange={handleSearch}
        />
        
        {selectedEndpoint ? (
          <ApiEndpoint endpoint={selectedEndpoint} />
        ) : filteredEndpoints.length > 0 ? (
          <>
            <SectionTitle>API Reference</SectionTitle>
            {filteredEndpoints.map(endpoint => (
              <ApiEndpoint key={endpoint.path} endpoint={endpoint} />
            ))}
          </>
        ) : (
          <EmptyState>
            <h3>No endpoints found</h3>
            <p>Try adjusting your search query or select an endpoint from the sidebar.</p>
          </EmptyState>
        )}
      </ContentArea>
    </PageContainer>
  );
};

export default ApiReference;