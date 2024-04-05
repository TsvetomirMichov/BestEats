import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { store } from './redux/store.tsx'
import { Provider } from 'react-redux'
import { authApiSlice } from './redux/auth/authApiSlice'
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './hooks/i18n.tsx'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={authApiSlice}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ApiProvider>
  </React.StrictMode>,
)
