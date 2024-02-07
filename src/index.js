import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { Provider } from 'react-redux';
import App from './App';
import bankStore from './Stores/BankStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Perform or dispatch an action :  CREATE
bankStore.dispatch({type:"CREATE"});  

root.render(
  <React.StrictMode>
    {/* Step3: Use <Provider/>  to share the store to components */}
     <Provider store={bankStore}>
        <App  />
     </Provider>  
  </React.StrictMode>    
   
);