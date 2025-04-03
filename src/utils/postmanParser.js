// src/utils/postmanParser.js
/**
 * A utility function to parse Postman collection data
 * into a more usable format for the documentation site
 */
export function parsePostmanCollection(collection) {
    const { info, item, auth } = collection;
    
    // Parse basic info
    const parsedInfo = {
      name: info.name,
      description: info.description,
      id: info._postman_id,
    };
    
    // Parse authentication
    const parsedAuth = auth ? {
      type: auth.type,
      details: auth[auth.type],
    } : null;
    
    // Parse endpoints
    const parsedItems = parseItems(item);
    
    return {
      info: parsedInfo,
      auth: parsedAuth,
      endpoints: parsedItems,
    };
  }
  
  function parseItems(items, parentPath = '') {
    const result = [];
  
    items.forEach(item => {
      // If this is a folder containing more items
      if (item.item) {
        const folderPath = parentPath ? `${parentPath}/${item.name}` : item.name;
        const subItems = parseItems(item.item, folderPath);
        
        result.push({
          type: 'folder',
          name: item.name,
          path: folderPath,
          description: item.description || '',
          items: subItems,
        });
      } 
      // If this is an actual endpoint
      else if (item.request) {
        const endpoint = {
          type: 'endpoint',
          name: item.name,
          path: parentPath ? `${parentPath}/${item.name}` : item.name,
          description: item.request.description || '',
          request: {
            method: item.request.method,
            url: item.request.url,
            headers: item.request.header || [],
            body: item.request.body || null,
          },
          response: item.response || [],
        };
        
        result.push(endpoint);
      }
    });
    
    return result;
  }
  
  /**
   * Flattens the nested structure into a simple array of endpoints
   * Useful for search functionality
   */
  export function flattenEndpoints(parsedCollection) {
    const flattened = [];
    
    function processItems(items) {
      items.forEach(item => {
        if (item.type === 'endpoint') {
          flattened.push(item);
        } else if (item.type === 'folder' && item.items) {
          processItems(item.items);
        }
      });
    }
    
    processItems(parsedCollection.endpoints);
    return flattened;
  }