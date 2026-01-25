import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="p-8">
            <h1>Map (Features/Map)</h1>
          </div>
        ),
      },
      {
        path: 'routes',
        element: (
          <div className="p-8">
            <h1>Routes (Features/Routes)</h1>
          </div>
        ),
      },
      {
        path: 'search',
        element: (
          <div className="p-8">
            <h1>Search (Features/Search)</h1>
          </div>
        ),
      },
    ],
  },
]);
