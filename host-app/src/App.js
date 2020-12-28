import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Navigation = React.lazy(() => import('navigationApp/Navigation'));

const App = () => {
  return (
    <React.Suspense fallback="Loading...">
      <Router>
        <Navigation />
      </Router>
    </React.Suspense>
  );
};

export default App;
