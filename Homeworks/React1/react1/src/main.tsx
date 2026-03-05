import React from 'react';
import ReactDOM from 'react-dom/client';
import VehiculosManage from './VehiculosManage';
import InversionistasManage from './inversionistasManage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VehiculosManage />
    <InversionistasManage />
  </React.StrictMode>
)