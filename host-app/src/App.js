import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles, ThemeProvider } from '@electricjs/arc';

const Navigation = React.lazy(() => import('mfNavigation/NavigationService'));

const App = () => {
  return (
    <React.Suspense fallback="Loading Host">
    <GlobalStyles />
    <Router>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </Router>
    </React.Suspense>
  );
}

export default App;
