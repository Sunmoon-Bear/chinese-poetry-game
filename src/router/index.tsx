import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import PoemSelectPage from '../pages/poem-select';
import GamePage from '../pages/game';
import ErrorBoundary from '../components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/poem-select',
    element: <PoemSelectPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/game/:id',
    element: <GamePage />,
    errorElement: <ErrorBoundary />
  }
]);

export default router;