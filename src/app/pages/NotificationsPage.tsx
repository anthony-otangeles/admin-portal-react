import { useState } from 'react';
import { Button, Card, PageHeader, Toggle, Icon } from '../components/ui/primitives';
import { NOTIFICATION_RULES_BY_ROLE, ROLE_TONES, type NotifRule } from '../data/mockData';

type RoleTab = 'Super Admin' | 'Provider' | 'Scribe' | 'Clerk';

const ROLE_TABS: { id: RoleTab; icon: string; color: string; tint: string; desc: string }[] = [
  { id: 'Super Admin', icon: 'shield',   color: '#845EC2', tint: '#F5F2FD', desc: 'Admin-wide system events — user changes, security alerts, audit activity.' },
  { id: 'Provider',   icon: 'user',      color: '#0081CF', tint: '#E6F3FB', desc: 'Clinical events relevant to providers — notes, billing, patient alerts.' },
  { id: 'Scribe',     icon: 'fileText',  color: '#29BB89', tint: '#E7F5EF', desc: 'Documentation events — encounter assignments, queue health, note status.' },
  { id: 'Clerk',      icon: 'workflow',  color: '#B58420', tint: '#FFF8E6', desc: 'Operations events — admissions, scheduling, discharges, coverage gaps.' },
];

export function NotificationsPage() {
  const [activeRole, setActiveRole] = useState<RoleTab>('Super Admin');
  const [rulesByRole, setRulesByRole] = useState<Record<string, NotifRule[]>>(
    () => Object.fromEntries(
      Object.entries(NOTIFICATION_RULES_BY_ROLE).map(([k, v]) => [k, v.map(r => ({ ...r }))])
    )
  );
  const [saved, setSaved] = useState(false);

  const rules = rulesByRole[activeRole] || [];

  const toggle = (i: number, key: 'inApp' | 'email') => {
    setRulesByRole(prev => {
      const next = { ...prev };
      next[activeRole] = prev[activeRole].map((r, idx) =>
        idx === i ? { ...r, [key]: !r[key] } : r
      );
      return next;
    });
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const rt = ROLE_TONES[activeRole];
  const tabInfo = ROLE_TABS.find(t => t.id === activeRole)!;

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Notifications"
        subtitle="Configure what triggers an email or in-app alert for each role. Changes apply to all users with that role."
        actions={
          <Button variant={saved ? 'successSolid' : 'primary'} icon="check" onClick={handleSave}>
            {saved ? 'Saved!' : 'Apply Changes'}
          </Button>
        }
      />

      {/* Role tab bar — same pill style as Portal Configuration */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, padding: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, width: 'fit-content' }}>
        {ROLE_TABS.map(tab => {
          const on = tab.id === activeRole;
          const t = ROLE_TONES[tab.id];
          return (
            <button key={tab.id} onClick={() => setActiveRole(tab.id)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '9px 18px', borderRadius: 4, cursor: 'pointer',
              border: 0,
              background: on ? t.bg : 'transparent',
              color: on ? t.fg : '#6A7282',
              fontFamily: 'Inter', fontSize: 13, fontWeight: 700,
              transition: 'all 120ms',
            }}>
              <Icon name={tab.icon} size={15} color={on ? t.fg : '#99A1AF'} />
              {tab.id}
            </button>
          );
        })}
      </div>

      {/* Role context banner */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 18px', background: rt.bg, border: `1px solid ${rt.solid}22`, borderRadius: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name={tabInfo.icon} size={18} color={rt.solid} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#1C192E' }}>{activeRole} — Notification Matrix</div>
          <div style={{ fontSize: 13, color: '#6A7282', marginTop: 2 }}>{tabInfo.desc}</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: rt.fg }}>
            {rules.filter(r => r.inApp).length} in-app &nbsp;·&nbsp; {rules.filter(r => r.email).length} email enabled
          </span>
          <button onClick={() => {
            setRulesByRole(prev => ({ ...prev, [activeRole]: prev[activeRole].map(r => ({ ...r, inApp: true, email: true })) }));
          }} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #E5E7EB', background: '#fff', color: '#6A7282', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
            Enable all
          </button>
          <button onClick={() => {
            setRulesByRole(prev => ({ ...prev, [activeRole]: prev[activeRole].map(r => ({ ...r, inApp: false, email: false })) }));
          }} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #E5E7EB', background: '#fff', color: '#6A7282', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
            Disable all
          </button>
        </div>
      </div>

      {/* Matrix table */}
      <Card padding={0}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter' }}>
          <thead>
            <tr style={{ fontSize: 11, color: '#6A7282', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'left', background: '#F9FAFB' }}>
              <th style={{ padding: '14px 20px' }}>Event</th>
              <th style={{ padding: 14, width: 120, textAlign: 'center' }}>In-App</th>
              <th style={{ padding: 14, width: 120, textAlign: 'center' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r, i) => (
              <tr key={i} style={{ borderTop: '1px solid #EEEEEE' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1C192E' }}>{r.event}</div>
                  <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{r.desc}</div>
                </td>
                <td style={{ padding: 14, textAlign: 'center' }}>
                  <Toggle checked={r.inApp} onChange={() => toggle(i, 'inApp')} size="sm" />
                </td>
                <td style={{ padding: 14, textAlign: 'center' }}>
                  <Toggle checked={r.email} onChange={() => toggle(i, 'email')} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div style={{ marginTop: 20, padding: 16, background: '#FFF8E6', border: '1px solid #FFE9A6', borderRadius: 8, display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 13, color: '#825E13', lineHeight: '20px' }}>
        <Icon name="info" size={18} color="#B58420" />
        <div>
          <strong style={{ color: '#1C192E' }}>Heads up:</strong> These are default notification preferences for the <strong>{activeRole}</strong> role. Changes made here apply to everyone assigned that role unless enforcement is locked by policy.
        </div>
      </div>
    </main>
  );
}
