import React from 'react';
import { Navigate } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import AccountView from './views/account/AccountView';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView';
import CustomerListView from './views/customerInfo/CustomerListView';
import NotFoundView from './views/errors/NotFoundView';
import Inventory from './views/inventory';
import ProductListView from './views/product/ProductListView';
import DashboardView from './views/reports/DashboardView';
import SettingsView from './views/settings/SettingsView';

const CustomRoutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default CustomRoutes;
