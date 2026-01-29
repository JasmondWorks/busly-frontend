import { createBrowserRouter } from 'react-router-dom';
import ResponsiveLayout from '@/layouts/ResponsiveLayout';
import HomePage from '@/pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ResponsiveLayout />,
    children: [
      // Onboarding Routes
      {
        path: 'onboarding',
        async lazy() {
          const { default: OnboardingPage } = await import('@/pages/OnboardingPage');
          return { Component: OnboardingPage };
        },
      },
      {
        path: 'onboarding/location',
        async lazy() {
          const { default: LocationPermissionPage } =
            await import('@/pages/LocationPermissionPage');
          return { Component: LocationPermissionPage };
        },
      },
      {
        index: true,
        // Make sure to un-comment this if you want onboarding to be the first screen for new users
        // element: <Navigate to="/onboarding" replace />,
        // For development, keeping Home as index
        element: <HomePage />,
      },
      {
        path: 'routes',
        async lazy() {
          const { default: RoutesPage } = await import('@/pages/RoutesPage');
          return { Component: RoutesPage };
        },
      },
      {
        path: 'search',
        async lazy() {
          const { SearchPage } = await import('@/features/navigation');
          return { Component: SearchPage };
        },
      },
      {
        path: 'navigation/active',
        async lazy() {
          const { default: ActiveJourneyPage } = await import('@/pages/ActiveJourneyPage');
          return { Component: ActiveJourneyPage };
        },
      },
      {
        path: 'navigation/:stopId', // Dynamic route for stop decision e.g. /navigation/obalende
        async lazy() {
          const { default: StopDecisionPage } = await import('@/pages/StopDecisionPage');
          return { Component: StopDecisionPage };
        },
      },
      {
        path: 'saved',
        async lazy() {
          const { default: SavedPage } = await import('@/pages/SavedPage');
          return { Component: SavedPage };
        },
      },
      {
        path: 'profile',
        async lazy() {
          const { default: ProfilePage } = await import('@/pages/ProfilePage');
          return { Component: ProfilePage };
        },
      },
      {
        path: 'settings',
        async lazy() {
          const { default: SettingsPage } = await import('@/pages/SettingsPage');
          return { Component: SettingsPage };
        },
      },
      {
        path: 'contribute',
        async lazy() {
          const { default: ContributionHubPage } =
            await import('@/features/contribution/pages/ContributionHubPage');
          return { Component: ContributionHubPage };
        },
      },
      // Keeping the old monolithic one for reference or fallback

      {
        path: 'navigation',
        async lazy() {
          // Direct to Active Journey for Demo purposes
          const { default: ActiveJourneyPage } = await import('@/pages/ActiveJourneyPage');
          return { Component: ActiveJourneyPage };
        },
      },
    ],
  },
  // Driver Routes (Outside Passenger Layout)
  {
    path: '/driver',
    children: [
      {
        index: true,
        async lazy() {
          const { default: DriverDashboardPage } =
            await import('@/pages/driver/DriverDashboardPage');
          return { Component: DriverDashboardPage };
        },
      },
      {
        path: 'active/:routeId',
        async lazy() {
          const { default: DriverActiveRoutePage } =
            await import('@/pages/driver/DriverActiveRoutePage');
          return { Component: DriverActiveRoutePage };
        },
      },
      {
        path: 'learning/:routeId',
        async lazy() {
          const { default: DriverRouteLearningPage } =
            await import('@/pages/driver/DriverRouteLearningPage');
          return { Component: DriverRouteLearningPage };
        },
      },
      {
        path: 'vehicle-check',
        element: (
          <div className="p-10 font-bold text-2xl text-center">
            Vehicle Check Component (Placeholder)
          </div>
        ),
      },
    ],
  },
]);
