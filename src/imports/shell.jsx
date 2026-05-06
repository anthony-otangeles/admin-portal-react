// Admin Portal — Header + SideNav

function AdminHeader({ onSearch, onSwitchView }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(HEADER_NOTIFICATIONS);
  const unreadCount = notifs.filter(n => n.unread).length;

  // Close on outside click
  useEffect(() => {
    if (!profileOpen && !notifOpen) return;
    const onDoc = (e) => {
      if (!e.target.closest('[data-popover]')) {
        setProfileOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [profileOpen, notifOpen]);

  return (
    <div style={{
      height: 64, background: '#fff', borderBottom: '1px solid #E5E7EB',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 16,
      position: 'sticky', top: 0, zIndex: 20,
    }}>
      <img src="../assets/otangeles-logo.svg" height={30} style={{ display: 'block' }} alt="Otangeles" />
      <div style={{ width: 1, height: 28, background: '#E5E7EB', marginLeft: 4 }} />
      <div style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 400, color: '#6A7282', lineHeight: '20px' }}>Admin Portal</div>

      <div style={{
        marginLeft: 24, flex: 1, maxWidth: 520, background: '#F7F7F7',
        border: '1px solid #E5E7EB', borderRadius: 5, height: 40,
        display: 'flex', alignItems: 'center', gap: 10, padding: '0 14px',
        fontSize: 14, color: '#99A1AF',
      }}>
        <Icon name="search" size={16} color="#99A1AF" />
        Search users, roles, settings, audit log…
        <span style={{
          marginLeft: 'auto', fontSize: 11, color: '#99A1AF',
          border: '1px solid #E5E7EB', borderRadius: 4, padding: '1px 6px',
          background: '#fff', fontFamily: 'JetBrains Mono',
        }}>⌘K</span>
      </div>
      <div style={{ flex: 1 }} />

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 10px', borderRadius: 9999,
        background: '#E7F5EF', color: '#29BB89', fontSize: 12, fontWeight: 700,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#29BB89' }} />
        All Systems Operational
      </div>

      {/* Notifications bell */}
      <div data-popover style={{ position: 'relative' }}>
        <button onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }} style={{
          width: 40, height: 40, borderRadius: 9999,
          background: notifOpen ? '#F5F2FD' : '#fff',
          border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center',
          justifyContent: 'center', position: 'relative', cursor: 'pointer',
        }}>
          <Icon name="bell" size={18} color={notifOpen ? '#845EC2' : '#6A7282'} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute', top: 8, right: 8, width: 8, height: 8,
              borderRadius: 9999, background: '#C9302C', border: '2px solid #fff',
            }} />
          )}
        </button>
        {notifOpen && (
          <NotificationsDropdown
            notifs={notifs}
            onMarkAllRead={() => setNotifs(notifs.map(n => ({ ...n, unread: false })))}
          />
        )}
      </div>

      {/* Profile */}
      <div data-popover onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, marginLeft: 4, cursor: 'pointer' }}>
        <Avatar initials="SA" size={36} bg="#99A1AF" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 700, fontSize: 13, color: '#1C192E' }}>Sarah Avila</span>
          <span style={{ fontSize: 11, color: '#6A7282' }}>Super Admin</span>
        </div>
        <Icon name="chevronDown" size={16} color="#6A7282" />
        {profileOpen && (
          <div onClick={e => e.stopPropagation()} style={{
            position: 'absolute', top: 48, right: 0, width: 260,
            background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10,
            boxShadow: '0 12px 24px -8px rgba(28,25,46,0.12), 0 4px 8px -4px rgba(28,25,46,0.08)',
            zIndex: 30, overflow: 'hidden', animation: 'fadeIn 120ms ease-out',
          }}>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: '#99A1AF', fontWeight: 500 }}>Signed in as</div>
              <div style={{ fontSize: 14, color: '#1C192E', fontWeight: 600, marginTop: 4 }}>sarah.avila@otangeles.com</div>
            </div>
            <div style={{ height: 1, background: '#EEEEEE' }} />

            <div style={{ padding: '12px 16px 6px' }}>
              <div style={{ fontSize: 11, color: '#99A1AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Switch view</div>
              <div style={{ fontSize: 11, color: '#99A1AF', marginTop: 3, lineHeight: '15px' }}>Preview the product as another role. Read-only — actions are sandboxed.</div>
            </div>
            {[
              { role: 'Provider', icon: 'shield', tone: '#0081CF', tint: '#E6F3FB' },
              { role: 'Scribe', icon: 'fileText', tone: '#29BB89', tint: '#E7F5EF' },
              { role: 'Clerk', icon: 'workflow', tone: '#B58420', tint: '#FFF8E6' },
            ].map(r => (
              <button key={r.role} onClick={() => { setProfileOpen(false); onSwitchView && onSwitchView(r.role); }} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px',
                background: 'transparent', border: 0, fontFamily: 'Inter', fontSize: 13,
                fontWeight: 600, color: '#1C192E', cursor: 'pointer',
                textAlign: 'left', width: '100%',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{
                  width: 26, height: 26, borderRadius: 6, background: r.tint,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon name={r.icon} size={14} color={r.tone} />
                </span>
                <span style={{ flex: 1 }}>View as {r.role}</span>
                <Icon name="chevronRight" size={14} color="#99A1AF" />
              </button>
            ))}
            <div style={{ height: 1, background: '#EEEEEE', marginTop: 6 }} />

            <button style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
              background: 'transparent', border: 0, fontFamily: 'Inter', fontSize: 14,
              fontWeight: 600, color: '#C34A7D', borderRadius: 0, cursor: 'pointer',
              textAlign: 'left', width: '100%',
            }}>
              <Icon name="logout" size={16} color="#C34A7D" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationsDropdown({ notifs, onMarkAllRead }) {
  return (
    <div onClick={e => e.stopPropagation()} style={{
      position: 'absolute', top: 48, right: 0, width: 420,
      background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12,
      boxShadow: '0 16px 32px -10px rgba(28,25,46,0.16), 0 6px 12px -6px rgba(28,25,46,0.10)',
      zIndex: 30, overflow: 'hidden', animation: 'fadeIn 120ms ease-out',
      maxHeight: 'calc(100vh - 96px)', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1C192E' }}>Notifications</div>
        <button onClick={onMarkAllRead} style={{
          padding: '6px 12px', border: '1px solid #E5DBFA', borderRadius: 6,
          background: '#fff', color: '#845EC2', fontSize: 12, fontWeight: 600,
          cursor: 'pointer', fontFamily: 'Inter',
        }}>
          Mark All as Read
        </button>
      </div>
      <div style={{ overflowY: 'auto', borderTop: '1px solid #EEEEEE' }}>
        {notifs.map((n, i) => <NotifRow key={n.id} n={n} divider={i > 0} />)}
      </div>
      <div style={{ borderTop: '1px solid #EEEEEE', padding: '14px 20px', textAlign: 'center' }}>
        <button style={{
          background: 'transparent', border: 0, color: '#6A7282',
          fontSize: 13, fontWeight: 600, fontFamily: 'Inter', cursor: 'pointer',
        }}>
          Load More
        </button>
      </div>
    </div>
  );
}

function NotifRow({ n, divider }) {
  const isReturned = n.kind === 'returned';
  const iconBg = isReturned ? '#FFF3F8' : '#E7F5EF';
  const iconColor = isReturned ? '#C34A7D' : '#29BB89';
  return (
    <div style={{
      padding: '14px 20px',
      borderTop: divider ? '1px solid #F3F4F6' : 'none',
      display: 'flex', gap: 12, alignItems: 'flex-start',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 9999, background: iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <Icon name="activity" size={16} color={iconColor} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#1C192E' }}>{n.title}</span>
          <span style={{ fontSize: 12, color: '#99A1AF' }}>{n.when}</span>
          {n.unread && <span style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: 9999, background: '#29BB89' }} />}
        </div>
        <div style={{ fontSize: 13, color: '#1C192E', marginTop: 4, lineHeight: '20px' }}>
          {n.who} {n.verb} <strong>#{n.enc}</strong>.
        </div>
        {n.body && (
          <div style={{ fontSize: 13, color: '#6A7282', marginTop: 4, lineHeight: '20px' }}>
            {n.body}
          </div>
        )}
      </div>
    </div>
  );
}

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    ],
  },
  {
    label: 'People',
    items: [
      { id: 'users', label: 'Users', icon: 'users' },
      { id: 'roles', label: 'Roles & Permissions', icon: 'shield' },
      { id: 'onboarding', label: 'Onboarding', icon: 'key' },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'portals', label: 'Portal Configuration', icon: 'sliders' },
      { id: 'compensation', label: 'Compensation', icon: 'money' },
      { id: 'notifications', label: 'Notifications', icon: 'bell' },
      { id: 'facilities', label: 'Facilities', icon: 'facility' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { id: 'analytics', label: 'Analytics', icon: 'chart' },
      { id: 'audit', label: 'Audit Log', icon: 'history' },
    ],
  },
  {
    label: 'Personal',
    items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
];

function SideNav({ active, onNav }) {
  return (
    <aside style={{
      width: 260, background: '#fff',
      borderRight: '1px solid #E5E7EB', padding: 16,
      display: 'flex', flexDirection: 'column', gap: 4,
      height: 'calc(100vh - 64px)', position: 'sticky', top: 64,
      overflowY: 'auto', flexShrink: 0,
    }}>
      {NAV_GROUPS.map((g, gi) => (
        <div key={g.label} style={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: gi === 0 ? 0 : 12 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#99A1AF', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '6px 14px 4px' }}>
            {g.label}
          </div>
          {g.items.map(it => (
            <NavItem key={it.id} {...it} active={active === it.id} onClick={() => onNav(it.id)} />
          ))}
        </div>
      ))}
      <div style={{ flex: 1 }} />
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
    </aside>
  );
}

function NavItem({ icon, label, active, onClick }) {
  const [hover, setHover] = useState(false);
  const bg = active ? '#F8F8F8' : hover ? '#F8F8F8' : '#fff';
  const color = active ? '#00C9A7' : '#6A7282';
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 14px', borderRadius: 4,
        background: bg, color, border: 0, cursor: 'pointer',
        fontFamily: 'Inter', fontSize: 14, fontWeight: active ? 700 : 600,
        justifyContent: 'flex-start', textAlign: 'left',
        transition: 'background 120ms ease-out',
      }}>
      <Icon name={icon} size={18} color={color} />
      {label}
    </button>
  );
}

Object.assign(window, { AdminHeader, SideNav, NAV_GROUPS, ImpersonationOverlay });

function ImpersonationOverlay({ role, onClose }) {
  if (!role) return null;
  const config = {
    Provider: { tone: '#0081CF', tint: '#E6F3FB', icon: 'shield', portal: 'Provider Portal',
      blurb: 'Author HPI/ROS/PE/A&P, sign your own encounters, manage your patient panel, and review billing rejections.',
      surfaces: ['My Encounters queue', 'Sign Note', 'Patient Panel', 'My Earnings', 'Notifications'] },
    Scribe: { tone: '#29BB89', tint: '#E7F5EF', icon: 'fileText', portal: 'Scribe Portal',
      blurb: 'Pick up unassigned encounters, draft notes from transcript + dictation, route to the assigned provider for sign-off.',
      surfaces: ['Unassigned Queue', 'Draft Note', 'Returned-for-Revision', 'My Productivity', 'Notifications'] },
    Clerk: { tone: '#B58420', tint: '#FFF8E6', icon: 'workflow', portal: 'Clerk Portal',
      blurb: 'Schedule and check in patients, capture demographics + insurance, manage facility rosters and shift coverage.',
      surfaces: ['Today\'s Schedule', 'Check-in', 'Patient Demographics', 'Coverage Board', 'Facility Roster'] },
  }[role];
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      animation: 'fadeIn 160ms ease-out',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 12, width: 540, overflow: 'hidden',
        boxShadow: '0 24px 48px -12px rgba(28,25,46,0.24)',
      }}>
        <div style={{ height: 6, background: config.tone }} />
        <div style={{ padding: '24px 28px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 10, background: config.tint,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={config.icon} size={22} color={config.tone} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#99A1AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Switch view</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1C192E' }}>Open the {config.portal}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#6A7282', lineHeight: '20px', marginBottom: 16 }}>
            You'll preview Otangeles as a {role}. {config.blurb} Your Super Admin session continues in this tab.
          </div>
          <div style={{
            border: '1px solid #EEEEEE', borderRadius: 8, padding: '12px 14px', marginBottom: 16,
            background: '#FAFAFA',
          }}>
            <div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>You'll see</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {config.surfaces.map(s => (
                <span key={s} style={{
                  padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
                  background: '#fff', color: '#1C192E', border: '1px solid #E5E7EB',
                }}>{s}</span>
              ))}
            </div>
          </div>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            padding: 12, borderRadius: 8, background: '#FFF8E6', border: '1px solid #FFE9A6',
            fontSize: 12, color: '#825E13', lineHeight: '18px',
          }}>
            <Icon name="info" size={16} color="#B58420" />
            <span><strong>Sandboxed.</strong> Any actions you take while viewing as {role} are dry-run only — nothing is written to the production audit log or clinical record.</span>
          </div>
        </div>
        <div style={{
          padding: '14px 24px', borderTop: '1px solid #EEEEEE',
          display: 'flex', justifyContent: 'flex-end', gap: 8, background: '#FAFAFA',
        }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" iconRight="chevronRight" onClick={onClose}>Open {role} view</Button>
        </div>
      </div>
    </div>
  );
}
