import { Outlet } from 'react-router';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1C192E',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <TopBar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <Sidebar />
        <main style={{ flex: 1, background: '#F7F7F7', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
