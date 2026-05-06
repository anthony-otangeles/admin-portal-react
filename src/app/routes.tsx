import { createBrowserRouter } from 'react-router';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { UserManagement } from './pages/UserManagement';
import { RoleManagement } from './pages/RoleManagement';
import { OnboardingPage } from './pages/OnboardingPage';
import { PortalConfigPage } from './pages/PortalConfigPage';
import { CompensationPage } from './pages/CompensationPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AuditPage } from './pages/AuditPage';
import { SettingsPage } from './pages/SettingsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'users', Component: UserManagement },
      { path: 'roles', Component: RoleManagement },
      { path: 'onboarding', Component: OnboardingPage },
      { path: 'portals', Component: PortalConfigPage },
      { path: 'compensation', Component: CompensationPage },
      { path: 'notifications', Component: NotificationsPage },
      { path: 'facilities', Component: FacilitiesPage },
      { path: 'analytics', Component: AnalyticsPage },
      { path: 'audit', Component: AuditPage },
      { path: 'settings', Component: SettingsPage },
    ],
  },
]);
