import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserContextProvider from './Components/Context/UserContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Components/Context/CartContext';
import WishListContextProvider from './Components/Context/WishListContext';
let queryClient =new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <WishListContextProvider>
    <CartContextProvider>
    <UserContextProvider>
        <QueryClientProvider client={queryClient}>
        <App />
        </QueryClientProvider>
    </UserContextProvider>
    </CartContextProvider>
    </WishListContextProvider>
    
);
