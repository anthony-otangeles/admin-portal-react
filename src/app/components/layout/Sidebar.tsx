import { useState } from 'react';
import { NavLink } from 'react-router';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Icon } from '../ui/primitives';

const NAV_GROUPS = [
  { label: 'Overview', items: [{ id: '/', label: 'Dashboard', icon: 'dashboard', end: true }] },
  {
    label: 'People', items: [
      { id: '/users', label: 'Users', icon: 'users' },
      { id: '/roles', label: 'Roles & Permissions', icon: 'shield' },
      { id: '/onboarding', label: 'Onboarding', icon: 'key' },
    ],
  },
  {
    label: 'System', items: [
      { id: '/portals', label: 'Portal Configuration', icon: 'sliders' },
      { id: '/compensation', label: 'Compensation', icon: 'money' },
      { id: '/notifications', label: 'Notifications', icon: 'bell' },
      { id: '/facilities', label: 'Facilities', icon: 'facility' },
    ],
  },
  {
    label: 'Insights', items: [
      { id: '/analytics', label: 'Analytics', icon: 'chart' },
      { id: '/audit', label: 'Audit Log', icon: 'history' },
    ],
  },
  {
    label: 'Personal', items: [
      { id: '/settings', label: 'Settings', icon: 'settings' },
    ],
  },
];

function NavItem({ icon, label, active, collapsed }: { icon: string; label: string; active: boolean; collapsed: boolean }) {
  const [hover, setHover] = useState(false);
  const bg = active || hover ? '#F8F8F8' : '#fff';
  const color = active ? '#00C9A7' : '#6A7282';
  return (
    <div
      title={collapsed ? label : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 12,
        height: 40,
        padding: collapsed ? 0 : '0 14px', borderRadius: 4,
        background: bg, color, cursor: 'pointer',
        fontFamily: 'Inter', fontSize: 14,
        fontWeight: active ? 700 : 600,
        transition: 'background 120ms ease-out',
        userSelect: 'none',
      }}
    >
      <Icon name={icon} size={18} color={color} />
      {!collapsed && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>}
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside style={{
      width: collapsed ? 72 : 260,
      flexShrink: 0,
      background: '#fff',
      borderRight: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden',
      transition: 'width 180ms ease-out',
    }}>
      {/* Nav content */}
      <div style={{ padding: collapsed ? 12 : 16, display: 'flex', flexDirection: 'column', gap: 4, flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {NAV_GROUPS.map((g, gi) => (
          <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: gi === 0 ? 0 : collapsed ? 10 : 12 }}>
            {collapsed ? (
              gi > 0 && <div style={{ height: 1, background: '#EEEEEE', margin: '0 10px 8px' }} />
            ) : (
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#99A1AF',
                textTransform: 'uppercase', letterSpacing: '0.06em',
                padding: '6px 14px 4px',
              }}>
                {g.label}
              </div>
            )}
            {g.items.map(it => (
              <NavLink
                key={it.id}
                to={it.id}
                end={it.end}
                aria-label={it.label}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {({ isActive }) => (
                  <NavItem icon={it.icon} label={it.label} active={isActive} collapsed={collapsed} />
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        padding: collapsed ? 12 : 16,
        borderTop: '1px solid #EEEEEE',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flexShrink: 0,
      }}>
        {!collapsed && (
          <>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 12px', borderRadius: 8,
              background: '#E7F5EF', color: '#29BB89',
              fontSize: 12, fontWeight: 700, lineHeight: '18px',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#29BB89', flexShrink: 0 }} />
              <span>All Systems Operational</span>
            </div>

            <div style={{
              padding: 12, borderRadius: 8, background: '#F5F2FD',
              fontSize: 12, color: '#67568C', lineHeight: '18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, marginBottom: 4 }}>
                <Icon name="shield" size={14} color="#67568C" />
                Super Admin Mode
              </div>
              Every action here propagates across all portals. Changes are audited.
            </div>
          </>
        )}

        <div style={{
          borderTop: !collapsed ? '1px solid #EEEEEE' : '0',
          paddingTop: !collapsed ? 14 : 0,
          marginTop: !collapsed ? 6 : 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: 12,
        }}>
          {!collapsed && (
            <span style={{ fontSize: 12, color: '#99A1AF', whiteSpace: 'nowrap' }}>
              {'\u00A9'} 2026 Otangeles Note+
            </span>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? 'Expand side navigation' : 'Collapse side navigation'}
            title={collapsed ? 'Expand navigation' : 'Collapse navigation'}
          style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: '1px solid #D1D5DC',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              flexShrink: 0,
            }}
          >
            {collapsed
              ? <ChevronsRight size={24} color="#00C9A7" strokeWidth={2} />
              : <ChevronsLeft size={24} color="#00C9A7" strokeWidth={2} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
