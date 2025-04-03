// src/styles/theme.js
const theme = {
    colors: {
      primary: '#fca600',     // Yellow
      secondary: '#000000',   // Black
      text: '#333333',
      background: '#ffffff',
      codeBackground: '#f5f5f5',
      sidebar: '#f8f8f8',
      border: '#e0e0e0',
      success: '#4caf50',
      error: '#f44336',
      warning: '#ff9800',
      info: '#2196f3',
    },
    fonts: {
      body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      code: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
    },
    fontSizes: {
      small: '0.875rem',
      body: '1rem',
      h1: '2.25rem',
      h2: '1.75rem',
      h3: '1.5rem',
      h4: '1.25rem',
      h5: '1.125rem',
      h6: '1rem',
    },
    breakpoints: {
      mobile: '480px',
      tablet: '768px',
      desktop: '1024px',
      wide: '1280px',
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem',
    },
    shadows: {
      card: '0 2px 8px rgba(0, 0, 0, 0.1)',
      popup: '0 4px 16px rgba(0, 0, 0, 0.2)',
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      pill: '999px',
    }
  };
  
  export default theme;