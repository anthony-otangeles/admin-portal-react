import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Select, Checkbox, PageHeader, Tabs, Toggle, Field, Avatar, RoleChip, Chip, Icon, Modal } from '../components/ui/primitives';
import { USERS, FACILITIES, ROLES, ASSIGNABLE_ROLES, ROLE_TONES, type User, type RoleKey, type UserStatus } from '../data/mockData';
import { InviteModal } from '../components/InviteModal';

const th: React.CSSProperties = { padding: '12px 16px', fontWeight: 600 };
const td: React.CSSProperties = { padding: '14px 16px', fontSize: 14, color: '#1C192E', verticalAlign: 'middle' };

// ===== USER DRAWER TABS =====
function UserOverview({ draft, updateDraft }: { draft: User; updateDraft: (p: Partial<User>) => void }) {
  const set = (k: keyof User) => (e: React.ChangeEvent<HTMLInputElement>) => updateDraft({ [k]: e.target.value });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Field label="Full name"><Input value={draft.name} onChange={set('name')} /></Field>
      <Field label="Email"><Input value={draft.email} icon="mail" onChange={set('email')} /></Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Department"><Input value={draft.dept} onChange={set('dept')} /></Field>
        <Field label="Specialization"><Input value={draft.spec} onChange={set('spec')} /></Field>
      </div>
      <Field label="Phone"><Input value={draft.phone} onChange={set('phone')} /></Field>
      <Field label="Joined" hint="System-set on first sign-in. Read-only.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 6, border: '1px solid #E5E7EB', background: '#F9FAFB', fontSize: 14, color: '#6A7282', height: 40 }}>
          <Icon name="clock" size={14} color="#99A1AF" />
          <span>{draft.joined}</span>
        </div>
      </Field>
    </div>
  );
}

function UserRoles({ draft, updateDraft }: { draft: User; updateDraft: (p: Partial<User>) => void }) {
  const toggleFac = (id: string) => {
    const has = draft.facilities.includes(id);
    updateDraft({ facilities: has ? draft.facilities.filter(f => f !== id) : [...draft.facilities, id] });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Field label="Role" hint="Each user has exactly one role.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {ASSIGNABLE_ROLES.map(r => {
            const on = draft.roles[0] === r; const t = ROLE_TONES[r];
            return (
              <button key={r} onClick={() => updateDraft({ roles: [r] })} style={{ padding: '14px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700, border: `1.5px solid ${on ? t.solid : '#E5E7EB'}`, background: on ? t.bg : '#fff', color: on ? t.fg : '#6A7282', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 16, height: 16, borderRadius: 9999, border: `2px solid ${on ? t.solid : '#D1D5DC'}`, background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {on && <span style={{ width: 8, height: 8, borderRadius: 9999, background: t.solid }} />}
                </span>
                {r}
              </button>
            );
          })}
        </div>
      </Field>
      <Field label="Assigned Facilities">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, border: '1px solid #E5E7EB', borderRadius: 8, padding: 12 }}>
          {FACILITIES.map(f => (
            <label key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', cursor: 'pointer' }}>
              <Checkbox checked={draft.facilities.includes(f.id)} onChange={() => toggleFac(f.id)} />
              <span style={{ fontSize: 14 }}>{f.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#99A1AF' }}>{f.region}</span>
            </label>
          ))}
        </div>
      </Field>
      <div style={{ padding: 16, background: '#F5F2FD', border: '1px solid #E5DBFA', borderRadius: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="info" size={16} color="#67568C" />
          <div style={{ fontSize: 13, color: '#67568C', lineHeight: '20px' }}>
            <strong>Effective permissions for this user</strong><br />
            Computed from the <strong>{draft.roles[0]}</strong> role intersected with facility access ({draft.facilities.length} of {FACILITIES.length} facilities).
          </div>
        </div>
      </div>
    </div>
  );
}

function UserSecurity({ draft, updateDraft }: { draft: User; updateDraft: (p: Partial<User>) => void }) {
  const [forceReset, setForceReset] = useState(false);
  const [restrict, setRestrict] = useState(true);
  const sessions = [
    { device: 'MacBook Pro · Chrome', loc: 'San Francisco, CA', when: 'Now', current: true },
    { device: 'iPhone 15 · Safari', loc: 'San Francisco, CA', when: '2 hr ago' },
    { device: 'Windows · Edge', loc: 'San Jose, CA', when: 'Yesterday' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {[
        { label: 'Two-factor authentication', desc: draft.mfa ? 'Active · Authenticator app' : 'Not enrolled — recommend enforcing.', checked: draft.mfa, onChange: () => updateDraft({ mfa: !draft.mfa }) },
        { label: 'Force password reset on next login', desc: 'User will be prompted to set a new password.', checked: forceReset, onChange: () => setForceReset(v => !v) },
        { label: 'Restrict to known devices', desc: 'Block sign-ins from unrecognized devices.', checked: restrict, onChange: () => setRestrict(v => !v) },
      ].map(row => (
        <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <div><div style={{ fontSize: 14, fontWeight: 600 }}>{row.label}</div><div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{row.desc}</div></div>
          <Toggle checked={row.checked} onChange={row.onChange} />
        </div>
      ))}
      <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600 }}>Active Sessions</div>
      <div style={{ border: '1px solid #E5E7EB', borderRadius: 8 }}>
        {sessions.map((s, i) => (
          <div key={i} style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: i ? '1px solid #EEEEEE' : '0' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.device} {s.current && <Chip tone="success" style={{ marginLeft: 8, fontSize: 10 }}>CURRENT</Chip>}</div>
              <div style={{ fontSize: 12, color: '#6A7282' }}>{s.loc} · {s.when}</div>
            </div>
            {!s.current && <Button variant="ghostNeutral" size="sm">Revoke</Button>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== USER ACTIVITY TAB =====
const ACTIVITY_TYPES: Record<string, { icon: string; color: string; bg: string }> = {
  login:    { icon: 'key',      color: '#29BB89', bg: '#E7F5EF' },
  logout:   { icon: 'logout',   color: '#6A7282', bg: '#F3F4F6' },
  failed:   { icon: 'alert',    color: '#C9302C', bg: '#FDECEC' },
  signed:   { icon: 'edit',     color: '#845EC2', bg: '#F5F2FD' },
  checkin:  { icon: 'facility', color: '#29BB89', bg: '#E7F5EF' },
  checkout: { icon: 'clock',    color: '#B58420', bg: '#FFF8E6' },
  role:     { icon: 'shield',   color: '#0081CF', bg: '#E6F3FB' },
  facility: { icon: 'facility', color: '#E9C05F', bg: '#FFF8E6' },
  password: { icon: 'lock',     color: '#B58420', bg: '#FFF8E6' },
  invite:   { icon: 'mail',     color: '#00C9A7', bg: '#E7F5EF' },
};

function noteActivityLabel(role: RoleKey) {
  if (role === 'Provider') return 'Notes signed';
  if (role === 'Scribe') return 'Notes completed';
  if (role === 'Clerk') return 'Notes assigned';
  return 'Admin actions';
}

function UserActivity({ user }: { user: User }) {
  const [filter, setFilter] = useState<'all'|'auth'|'clinical'|'admin'>('all');
  const primaryRole = user.roles[0];
  const noteMetricLabel = noteActivityLabel(primaryRole);
  const primaryFacility = FACILITIES.find(f => user.facilities.includes(f.id))?.name || 'assigned facility';
  const providerPresenceEvents = primaryRole === 'Provider'
    ? [
        { type: 'checkin',  label: 'Checked in',  detail: primaryFacility,                time: '8:58 AM',  tags: ['Provider portal'] },
        { type: 'checkout', label: 'Checked out', detail: `${primaryFacility} · 4h 42m`, time: '1:40 PM',  tags: ['Provider portal'] },
      ]
    : [];

  const filterMap: Record<string, string[]> = {
    all:      ['login','logout','failed','signed','checkin','checkout','role','facility','password','invite'],
    auth:     ['login','logout','failed','password'],
    clinical: ['signed','checkin','checkout'],
    admin:    ['role','facility','invite'],
  };

  const allGroups = [
    {
      date: 'TODAY', events: [
        { type: 'logout',   label: 'Signed out',            detail: 'Session ended after 6h 18m',                      time: '2:58 PM',  tags: [] },
        ...providerPresenceEvents.slice(1),
        { type: 'signed',   label: 'Signed 2 notes',        detail: 'Encounter batch — St. Agnes Medical',             time: '11:03 AM', tags: ['Batch #B-0413'] },
        { type: 'signed',   label: 'Signed 4 notes',        detail: 'Encounter batch — Casa of Hobart',                time: '9:15 AM',  tags: ['Batch #B-0412'] },
        ...providerPresenceEvents.slice(0, 1),
        { type: 'login',    label: 'Signed in',             detail: 'MacBook Pro · Chrome · San Francisco, CA',        time: '8:42 AM',  tags: ['IP 192.168.1.1', 'Trusted device'] },
      ],
    },
    {
      date: 'YESTERDAY', events: [
        { type: 'failed',   label: 'Failed login attempt',  detail: 'Incorrect password · Windows · Edge · San Jose',  time: '8:01 AM',  tags: ['IP 10.12.5.88'] },
        { type: 'login',    label: 'Signed in',             detail: 'iPhone 15 · Safari · San Francisco, CA',          time: '7:55 AM',  tags: ['IP 192.168.1.2', 'Trusted device'] },
      ],
    },
    {
      date: 'APR 24', events: [
        { type: 'password', label: 'Password changed',      detail: 'Changed via account settings',                    time: '3:12 PM',  tags: [] },
      ],
    },
    {
      date: 'APR 20', events: [
        { type: 'facility', label: 'Facility access updated', detail: `${user.facilities.length} facilities assigned`, time: '10:01 AM', tags: [] },
        { type: 'role',     label: 'Role updated',          detail: `Assigned to ${user.roles[0]} by Super Admin`,     time: '10:00 AM', tags: ['Sarah Avila'] },
      ],
    },
    {
      date: 'APR 18', events: [
        { type: 'invite',   label: 'Invitation sent',       detail: `Invite emailed to ${user.email}`,                 time: '2:30 PM',  tags: [] },
      ],
    },
  ];

  const visibleGroups = allGroups
    .map(g => ({ ...g, events: g.events.filter(e => filterMap[filter].includes(e.type)) }))
    .filter(g => g.events.length > 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {[
          { label: 'Sessions this month', value: '18', icon: 'key',      color: '#845EC2', bg: '#F5F2FD' },
          { label: noteMetricLabel,       value: '94', icon: 'edit',     color: '#00C9A7', bg: '#E7F5EF' },
          { label: 'Failed logins',       value: '1',  icon: 'alert',    color: '#C9302C', bg: '#FDECEC' },
        ].map(s => (
          <div key={s.label} style={{ background: s.bg, borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={s.icon} size={15} color={s.color} />
            </span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1C192E', lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#6A7282', marginTop: 1 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: 6 }}>
        {(['all','auth','clinical','admin'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 13px', borderRadius: 9999, border: `1.5px solid ${filter === f ? '#845EC2' : '#E5E7EB'}`,
            background: filter === f ? '#F5F2FD' : '#fff',
            color: filter === f ? '#67568C' : '#6A7282',
            fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter',
          }}>
            {f === 'all' ? 'All Events' : f === 'auth' ? 'Authentication' : f === 'clinical' ? 'Clinical' : 'Admin Changes'}
          </button>
        ))}
      </div>

      {/* Timeline */}
      {visibleGroups.length === 0 ? (
        <div style={{ padding: '32px 0', textAlign: 'center', color: '#99A1AF', fontSize: 13 }}>No events match this filter.</div>
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Continuous vertical line */}
          <div style={{ position: 'absolute', left: 15, top: 0, bottom: 0, width: 2, background: '#E5E7EB', zIndex: 0 }} />

          {visibleGroups.map((group, gi) => (
            <div key={group.date}>
              {/* Date group header */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingLeft: 44, paddingRight: 4,
                paddingTop: gi === 0 ? 0 : 20, paddingBottom: 10,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#99A1AF', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{group.date}</span>
                <span style={{ fontSize: 11, color: '#C4C9D4', fontFamily: 'JetBrains Mono' }}>{group.events.length} event{group.events.length !== 1 ? 's' : ''}</span>
              </div>

              {/* Events */}
              {group.events.map((e, ei) => {
                const t = ACTIVITY_TYPES[e.type];
                const isLast = gi === visibleGroups.length - 1 && ei === group.events.length - 1;
                return (
                  <div key={ei} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingBottom: isLast ? 4 : 18, position: 'relative' }}>
                    {/* Icon circle — sits on the line */}
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: t.bg, border: `2px solid #fff`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, position: 'relative', zIndex: 1,
                      boxShadow: '0 0 0 1.5px #E5E7EB',
                    }}>
                      <Icon name={t.icon} size={14} color={t.color} />
                    </div>

                    {/* Event content */}
                    <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#1C192E' }}>{e.label}</span>
                        <span style={{ fontSize: 11, color: '#99A1AF', fontFamily: 'JetBrains Mono', flexShrink: 0 }}>{e.time}</span>
                      </div>
                      <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{e.detail}</div>
                      {e.tags.length > 0 && (
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 7 }}>
                          {e.tags.map(tag => (
                            <span key={tag} style={{
                              padding: '2px 8px', borderRadius: 4,
                              background: '#F3F4F6', border: '1px solid #E5E7EB',
                              fontSize: 11, color: '#6A7282', fontFamily: 'JetBrains Mono',
                            }}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== SIGN ON BEHALF MODAL =====
function SignOnBehalfModal({ user, open, onClose, onConfirm }: { user: User; open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Sign on Behalf" width={500}
      footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button variant="primary" icon="edit" onClick={onConfirm}>Start Session</Button></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 16px', background: '#F5F2FD', border: '1px solid #E5DBFA', borderRadius: 10 }}>
          <Avatar initials={user.initials} size={44} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{user.name}</div>
            <div style={{ fontSize: 12, color: '#6A7282' }}>{user.email} · {user.roles[0]}</div>
          </div>
        </div>
        <div style={{ fontSize: 14, color: '#1C192E', lineHeight: '22px' }}>
          You are about to open a <strong>supervised signing session</strong> as <strong>{user.name}</strong>. Any notes signed during this session will be co-attributed to you as the supervising administrator.
        </div>
        <div style={{ padding: 14, background: '#FFF8E6', border: '1px solid #FFE9A6', borderRadius: 8, display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13, color: '#825E13', lineHeight: '19px' }}>
          <Icon name="alert" size={16} color="#B58420" />
          <div><strong>Audited action.</strong> This session will be logged in the Audit Log with your credentials, a timestamp, and all documents signed.</div>
        </div>
        <div style={{ fontSize: 13, color: '#6A7282', lineHeight: '20px' }}>
          This action is only available for users in the <strong>Provider</strong> role. The session will expire after 30 minutes of inactivity or when you explicitly close it.
        </div>
      </div>
    </Modal>
  );
}

// ===== MANAGE MENU =====
function ManageMenu({ user, onSignOnBehalf, onResetPassword, onSuspend, onClose }: {
  user: User; onSignOnBehalf: () => void; onResetPassword: () => void; onSuspend: () => void; onClose: () => void;
}) {
  const isSuspended = user.status === 'suspended';
  const items = [
    { icon: 'eye', label: 'Sign on Behalf', desc: 'Open supervised signing session', color: '#845EC2', onClick: onSignOnBehalf, disabled: user.roles[0] !== 'Provider' },
    { icon: 'key', label: 'Reset Password', desc: 'Send a password-reset email to user', color: '#0081CF', onClick: onResetPassword },
    { icon: 'lock', label: isSuspended ? 'Reactivate User' : 'Suspend User', desc: isSuspended ? 'Restore access for this user' : 'Temporarily block access', color: isSuspended ? '#29BB89' : '#B58420', onClick: onSuspend },
  ];
  return (
    <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', bottom: 52, right: 0, width: 280, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, boxShadow: '0 -8px 24px -8px rgba(28,25,46,0.12)', zIndex: 10, overflow: 'hidden' }}>
      <div style={{ padding: '10px 16px 6px', fontSize: 11, fontWeight: 700, color: '#99A1AF', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #EEEEEE' }}>
        Manage User
      </div>
      {items.map(it => (
        <button key={it.label} disabled={it.disabled} onClick={() => { onClose(); it.onClick(); }} style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: 'transparent',
          border: 0, fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: it.disabled ? '#D1D5DC' : '#1C192E',
          cursor: it.disabled ? 'not-allowed' : 'pointer', textAlign: 'left', width: '100%',
        }}
          onMouseEnter={e => { if (!it.disabled) e.currentTarget.style.background = '#F9FAFB'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
          <span style={{ width: 32, height: 32, borderRadius: 8, background: it.disabled ? '#F3F4F6' : `${it.color}18`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={it.icon} size={15} color={it.disabled ? '#D1D5DC' : it.color} />
          </span>
          <div>
            <div>{it.label}</div>
            <div style={{ fontSize: 11, color: '#99A1AF', fontWeight: 400 }}>{it.disabled ? 'Provider role only' : it.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ===== USER DRAWER =====
function UserDrawer({ user, onClose, onUpdate, onDelete }: { user: User | null; onClose: () => void; onUpdate: (u: User) => void; onDelete: (id: string) => void }) {
  const [tab, setTab] = useState('overview');
  const [draft, setDraft] = useState<User | null>(user);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [signOnBehalfOpen, setSignOnBehalfOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { setDraft(user); setTab('overview'); setConfirmDelete(false); setManageOpen(false); }, [user?.id]);

  if (!user || !draft) return null;
  const dirty = JSON.stringify(draft) !== JSON.stringify(user);
  const updateDraft = (p: Partial<User>) => setDraft(d => d ? { ...d, ...p } : d);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2400); };

  const handleSave = () => { onUpdate(draft); showToast('Changes applied.'); };
  const handleResetPwd = () => { setManageOpen(false); showToast(`Password reset email sent to ${user.email}.`); };
  const handleSuspend = () => {
    const next: UserStatus = user.status === 'suspended' ? 'active' : 'suspended';
    const updated = { ...user, status: next };
    onUpdate(updated); setDraft(updated);
    showToast(next === 'suspended' ? 'User suspended.' : 'User reactivated.');
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100 }}>
      <div onClick={e => e.stopPropagation()} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 640, background: '#fff', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '-12px 0 24px -8px rgba(0,0,0,0.1)' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar initials={draft.initials} size={44} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{draft.name}</div>
              <div style={{ fontSize: 12, color: '#6A7282' }}>{draft.email}</div>
            </div>
            {draft.status === 'suspended' && <Chip tone="danger" style={{ marginLeft: 8 }}>Suspended</Chip>}
            {dirty && <span style={{ marginLeft: 8, fontSize: 11, color: '#B58420', fontWeight: 600 }}>● Unsaved</span>}
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9999, background: 'transparent', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={18} color="#6A7282" />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ padding: '0 24px' }}>
          <Tabs tabs={[{ id: 'overview', label: 'Overview' }, { id: 'roles', label: 'Roles & Access' }, { id: 'security', label: 'Security' }, { id: 'activity', label: 'Activity' }]} active={tab} onChange={setTab} />
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, position: 'relative' }}>
          {tab === 'overview' && <UserOverview draft={draft} updateDraft={updateDraft} />}
          {tab === 'roles' && <UserRoles draft={draft} updateDraft={updateDraft} />}
          {tab === 'security' && <UserSecurity draft={draft} updateDraft={updateDraft} />}
          {tab === 'activity' && <UserActivity user={user} />}
          {toast && (
            <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: '#1C192E', color: '#fff', padding: '10px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', display: 'inline-flex', alignItems: 'center', gap: 8, zIndex: 5, whiteSpace: 'nowrap' }}>
              <Icon name="check" size={14} color="#00C9A7" />{toast}
            </div>
          )}
        </div>

        {/* Footer — exactly 3 buttons */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <Button variant="danger" icon="trash" onClick={() => setConfirmDelete(true)}>Delete User</Button>
          <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
            {/* Manage button with popup */}
            <div style={{ position: 'relative' }}>
              <Button variant="secondary" iconRight="chevronDown" onClick={() => setManageOpen(v => !v)}>Manage</Button>
              {manageOpen && (
                <ManageMenu
                  user={user}
                  onSignOnBehalf={() => setSignOnBehalfOpen(true)}
                  onResetPassword={handleResetPwd}
                  onSuspend={handleSuspend}
                  onClose={() => setManageOpen(false)}
                />
              )}
            </div>
            <Button variant="primary" icon="check" onClick={handleSave} disabled={!dirty}>Apply Changes</Button>
          </div>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete this user?" width={460}
        footer={<><Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button><Button variant="dangerSolid" icon="trash" onClick={() => { onDelete(user.id); onClose(); }}>Delete User</Button></>}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 9999, background: '#FDECEC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="alert" size={20} color="#C9302C" />
          </div>
          <div style={{ fontSize: 14, color: '#1C192E', lineHeight: '20px' }}>
            <strong>{user.name}</strong> will lose access immediately. Their audit history will remain for compliance, but they will no longer appear in active rosters or assignments. This cannot be undone.
          </div>
        </div>
      </Modal>

      {/* Sign on behalf modal */}
      <SignOnBehalfModal user={user} open={signOnBehalfOpen} onClose={() => setSignOnBehalfOpen(false)} onConfirm={() => { setSignOnBehalfOpen(false); showToast(`Signing session opened as ${user.name}.`); }} />
    </div>
  );
}

// ===== MAIN PAGE =====
export function UserManagement() {
  const [users, setUsers] = useState<User[]>(USERS);
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [inviteOpen, setInviteOpen] = useState(false);
  const [openUser, setOpenUser] = useState<User | null>(null);

  const filtered = users.filter(u => {
    if (query && !(`${u.name} ${u.email} ${u.dept}`.toLowerCase().includes(query.toLowerCase()))) return false;
    if (roleFilter !== 'all' && !u.roles.includes(roleFilter as RoleKey)) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    return true;
  });

  const allSelected = filtered.length > 0 && filtered.every(u => selected.has(u.id));
  const someSelected = filtered.some(u => selected.has(u.id));
  const toggleAll = () => { const s = new Set(selected); if (allSelected) filtered.forEach(u => s.delete(u.id)); else filtered.forEach(u => s.add(u.id)); setSelected(s); };
  const toggleOne = (id: string) => { const s = new Set(selected); if (s.has(id)) s.delete(id); else s.add(id); setSelected(s); };

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Users"
        subtitle="Create, edit, suspend, or delete users. Assign one or more roles per user."
        actions={<>
          <Button variant="secondary" icon="download">Export</Button>
          <Button variant="primary" icon="plus" onClick={() => setInviteOpen(true)}>Invite User</Button>
        </>}
      />
      <Card padding={0}>
        <div style={{ padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #EEEEEE', flexWrap: 'wrap' }}>
          <Input icon="search" placeholder="Search by name, email, or department" value={query} onChange={e => setQuery(e.target.value)} style={{ flex: 1, minWidth: 280 }} />
          <Select value={roleFilter} onChange={setRoleFilter} options={[{ value: 'all', label: 'All Roles' }, ...ROLES.map(r => ({ value: r, label: r }))]} width={170} />
          <Select value={statusFilter} onChange={setStatusFilter} options={[{ value: 'all', label: 'All Statuses' }, { value: 'active', label: 'Active' }, { value: 'invited', label: 'Invited' }, { value: 'suspended', label: 'Suspended' }]} width={160} />
        </div>
        {someSelected && (
          <div style={{ padding: '12px 20px', background: '#F5F2FD', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #EEEEEE' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#67568C' }}>{[...selected].length} selected</span>
            <Button variant="secondary" size="sm" icon="shield">Assign Roles</Button>
            <Button variant="secondary" size="sm" icon="facility">Set Facilities</Button>
            <Button variant="secondary" size="sm" icon="mail">Resend Invite</Button>
            <Button variant="danger" size="sm" icon="lock">Suspend</Button>
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter' }}>
          <thead>
            <tr style={{ fontSize: 12, color: '#6A7282', fontWeight: 600, textAlign: 'left', background: '#F9FAFB' }}>
              <th style={{ padding: '12px 12px 12px 20px', width: 40 }}><Checkbox checked={allSelected} indeterminate={!allSelected && someSelected} onChange={toggleAll} /></th>
              <th style={th}>Name</th>
              <th style={th}>Roles</th>
              <th style={th}>Department</th>
              <th style={th}>Facilities</th>
              <th style={th}>Status</th>
              <th style={th}>2FA</th>
              <th style={{ ...th, paddingRight: 20 }}>Last Active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid #EEEEEE', cursor: 'pointer' }} onClick={() => setOpenUser(u)}
                onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '14px 12px 14px 20px' }} onClick={e => e.stopPropagation()}><Checkbox checked={selected.has(u.id)} onChange={() => toggleOne(u.id)} /></td>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar initials={u.initials} size={36} />
                    <div><div style={{ fontWeight: 600 }}>{u.name}</div><div style={{ fontSize: 12, color: '#6A7282' }}>{u.email}</div></div>
                  </div>
                </td>
                <td style={td}><div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>{u.roles.map(r => <RoleChip key={r} role={r} />)}</div></td>
                <td style={td}><div>{u.dept}</div><div style={{ fontSize: 12, color: '#6A7282' }}>{u.spec}</div></td>
                <td style={td}><span style={{ fontSize: 13 }}>{u.facilities.length} of {FACILITIES.length}</span></td>
                <td style={td}>
                  <Chip tone={u.status === 'active' ? 'success' : u.status === 'invited' ? 'warn' : 'danger'}>
                    {u.status.charAt(0).toUpperCase() + u.status.slice(1)}
                  </Chip>
                </td>
                <td style={td}>
                  {u.mfa
                    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#29BB89', fontSize: 12, fontWeight: 600 }}><Icon name="check" size={14} color="#29BB89" />On</span>
                    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#C9302C', fontSize: 12, fontWeight: 600 }}><Icon name="alert" size={14} color="#C9302C" />Off</span>}
                </td>
                <td style={{ ...td, fontSize: 12, color: '#6A7282', paddingRight: 20 }}>{u.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '14px 20px', borderTop: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: '#6A7282' }}>
          <span>Showing {filtered.length} of {users.length} users</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="secondary" size="sm" icon="chevronLeft">Prev</Button>
            <Button variant="secondary" size="sm" iconRight="chevronRight">Next</Button>
          </div>
        </div>
      </Card>
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} onInvite={(u) => { setUsers([u, ...users]); setInviteOpen(false); }} />
      <UserDrawer user={openUser} onClose={() => setOpenUser(null)} onUpdate={(u) => setUsers(users.map(x => x.id === u.id ? u : x))} onDelete={(id) => { setUsers(users.filter(u => u.id !== id)); setOpenUser(null); }} />
    </main>
  );
}
