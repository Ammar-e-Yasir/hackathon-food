import React from 'react';
import Routes from './configs/routes';
import ContextProvider from './context/context';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
}

export default App;
