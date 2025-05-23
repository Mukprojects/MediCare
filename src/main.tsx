
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import './index.css'

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);
