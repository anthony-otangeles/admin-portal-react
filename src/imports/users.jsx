// Admin Portal — Users page

function UsersPage({ users, setUsers, onOpenUser }) {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(new Set());
  const [inviteOpen, setInviteOpen] = useState(false);

  const filtered = users.filter(u => {
    if (query && !(`${u.name} ${u.email} ${u.dept}`.toLowerCase().includes(query.toLowerCase()))) return false;
    if (roleFilter !== 'all' && !u.roles.includes(roleFilter)) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    return true;
  });

  const allSelected = filtered.length > 0 && filtered.every(u => selected.has(u.id));
  const someSelected = filtered.some(u => selected.has(u.id));

  const toggleAll = () => {
    const s = new Set(selected);
    if (allSelected) filtered.forEach(u => s.delete(u.id));
    else filtered.forEach(u => s.add(u.id));
    setSelected(s);
  };
  const toggleOne = (id) => {
    const s = new Set(selected);
    if (s.has(id)) s.delete(id); else s.add(id);
    setSelected(s);
  };

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Users"
        subtitle="Create, edit, suspend, or delete users. Assign one or more roles per user."
        actions={
          <>
            <Button variant="secondary" icon="download">Export</Button>
            <Button variant="primary" icon="plus" onClick={() => setInviteOpen(true)}>Invite User</Button>
          </>
        }
      />

      <Card padding={0}>
        <div style={{ padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #EEEEEE', flexWrap: 'wrap' }}>
          <Input icon="search" placeholder="Search by name, email, or department" value={query} onChange={e => setQuery(e.target.value)} style={{ flex: 1, minWidth: 280 }} />
          <Select value={roleFilter} onChange={setRoleFilter} options={[
            { value: 'all', label: 'All roles' },
            ...ROLES.map(r => ({ value: r, label: r })),
          ]} width={170} />
          <Select value={statusFilter} onChange={setStatusFilter} options={[
            { value: 'all', label: 'All statuses' },
            { value: 'active', label: 'Active' },
            { value: 'invited', label: 'Invited' },
            { value: 'suspended', label: 'Suspended' },
          ]} width={160} />
        </div>

        {someSelected && (
          <div style={{ padding: '12px 20px', background: '#F5F2FD', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid #EEEEEE' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#67568C' }}>{[...selected].length} selected</span>
            <Button variant="secondary" size="sm" icon="shield">Assign roles</Button>
            <Button variant="secondary" size="sm" icon="facility">Set facilities</Button>
            <Button variant="secondary" size="sm" icon="mail">Resend invite</Button>
            <Button variant="danger" size="sm" icon="lock">Suspend</Button>
          </div>
        )}

        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter' }}>
          <thead>
            <tr style={{ fontSize: 12, color: '#6A7282', fontWeight: 600, textAlign: 'left', background: '#F9FAFB' }}>
              <th style={{ padding: '12px 12px 12px 20px', width: 40 }}>
                <Checkbox checked={allSelected} indeterminate={!allSelected && someSelected} onChange={toggleAll} />
              </th>
              <th style={th}>Name</th>
              <th style={th}>Roles</th>
              <th style={th}>Department</th>
              <th style={th}>Facilities</th>
              <th style={th}>Status</th>
              <th style={th}>2FA</th>
              <th style={{ ...th, paddingRight: 20 }}>Last active</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid #EEEEEE', cursor: 'pointer' }} onClick={() => onOpenUser(u)}>
                <td style={{ padding: '14px 12px 14px 20px' }} onClick={e => e.stopPropagation()}>
                  <Checkbox checked={selected.has(u.id)} onChange={() => toggleOne(u.id)} />
                </td>
                <td style={td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar initials={u.initials} size={36} bg="#99A1AF" />
                    <div>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: 12, color: '#6A7282' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={td}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {u.roles.map(r => <RoleChip key={r} role={r} />)}
                  </div>
                </td>
                <td style={td}>
                  <div>{u.dept}</div>
                  <div style={{ fontSize: 12, color: '#6A7282' }}>{u.spec}</div>
                </td>
                <td style={td}>
                  <span style={{ fontSize: 13 }}>{u.facilities.length} of {FACILITIES.length}</span>
                </td>
                <td style={td}>
                  <Chip tone={u.status === 'active' ? 'success' : u.status === 'invited' ? 'warn' : 'danger'}>
                    {u.status.toUpperCase()}
                  </Chip>
                </td>
                <td style={td}>
                  {u.mfa
                    ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#29BB89', fontSize: 12, fontWeight: 600 }}><Icon name="check" size={14} color="#29BB89" />ON</span>
                    : <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#C9302C', fontSize: 12, fontWeight: 600 }}><Icon name="alert" size={14} color="#C9302C" />OFF</span>}
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
    </main>
  );
}
const th = { padding: '12px 16px', fontWeight: 600 };
const td = { padding: '14px 16px', fontSize: 14, color: '#1C192E', verticalAlign: 'middle' };

function InviteModal({ open, onClose, onInvite }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Provider');
  const [facs, setFacs] = useState(['f1']);
  const [sendInvite, setSendInvite] = useState(true);
  const [requireMfa, setRequireMfa] = useState(true);

  const submit = () => {
    const initials = name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase() || 'NU';
    onInvite({
      id: 'u' + Date.now(), name: name || 'New User', email, initials,
      roles: [role], dept: 'Pending', spec: '—', phone: '—', status: 'invited',
      facilities: facs, lastActive: '—', mfa: requireMfa, joined: 'Pending',
    });
    setName(''); setEmail(''); setRole('Provider'); setFacs(['f1']);
  };

  const toggleFac = (f) => {
    setFacs(facs.includes(f) ? facs.filter(x => x !== f) : [...facs, f]);
  };

  return (
    <Modal open={open} onClose={onClose} title="Invite a New User" width={600}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="mail" onClick={submit}>Send Invitation</Button>
        </>
      }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="Full name" required>
          <Input placeholder="e.g. Dr. Avery Stone" value={name} onChange={e => setName(e.target.value)} />
        </Field>
        <Field label="Email address" required hint="The invitation will be sent to this address.">
          <Input icon="mail" placeholder="name@otangeles.com" value={email} onChange={e => setEmail(e.target.value)} />
        </Field>
        <Field label="Role" required hint="Each user has exactly one role. Super Admin is reserved for IT/operations and granted separately.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {ASSIGNABLE_ROLES.map(r => {
              const on = role === r;
              const t = ROLE_TONES[r];
              return (
                <button key={r} onClick={() => setRole(r)} style={{
                  padding: '14px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                  border: `1.5px solid ${on ? t.solid : '#E5E7EB'}`,
                  background: on ? t.bg : '#fff', color: on ? t.fg : '#6A7282', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  textAlign: 'center',
                }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: 9999,
                    border: `2px solid ${on ? t.solid : '#D1D5DC'}`,
                    background: '#fff',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  }}>
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
                <Checkbox checked={facs.includes(f.id)} onChange={() => toggleFac(f.id)} />
                <span style={{ fontSize: 14 }}>{f.name}</span>
              </label>
            ))}
          </div>
        </Field>
        <Field label="Onboarding">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SettingRow label="Send invitation email now" desc="Otherwise the invite is queued as a draft." checked={sendInvite} onChange={setSendInvite} />
            <SettingRow label="Require two-factor auth on first login" desc="Highly recommended for clinical roles." checked={requireMfa} onChange={setRequireMfa} />
          </div>
        </Field>
      </div>
    </Modal>
  );
}

function SettingRow({ label, desc, checked, onChange }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{desc}</div>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

// User detail drawer
function UserDrawer({ user, onClose, onUpdate, onDelete }) {
  if (!user) return null;
  const [tab, setTab] = useState('overview');
  const [draft, setDraft] = useState(user);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [signOpen, setSignOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // reset draft whenever opened user changes
  useEffect(() => { setDraft(user); setTab('overview'); setConfirmDelete(false); setSignOpen(false); }, [user.id]);

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(user), [draft, user]);
  const updateDraft = (patch) => setDraft(d => ({ ...d, ...patch }));

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const handleSave = () => {
    onUpdate(draft);
    showToast('Changes saved.');
  };
  const handleResetPwd = () => {
    showToast(`Password reset email sent to ${user.email}.`);
  };
  const handleSuspend = () => {
    const next = user.status === 'suspended' ? 'active' : 'suspended';
    const updated = { ...user, status: next };
    onUpdate(updated);
    setDraft(updated);
    showToast(next === 'suspended' ? 'User suspended.' : 'User reactivated.');
  };
  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 640, background: '#fff',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '-12px 0 24px -8px rgba(0,0,0,0.1)',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Avatar initials={draft.initials} size={44} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{draft.name}</div>
              <div style={{ fontSize: 12, color: '#6A7282' }}>{draft.email}</div>
            </div>
            {draft.status === 'suspended' && (
              <Chip tone="danger" style={{ marginLeft: 8 }}>Suspended</Chip>
            )}
            {dirty && (
              <span style={{ marginLeft: 8, fontSize: 11, color: '#B58420', fontWeight: 600 }}>● Unsaved</span>
            )}
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9999, background: 'transparent', border: 0, cursor: 'pointer' }}>
            <Icon name="x" size={18} color="#6A7282" />
          </button>
        </div>
        <div style={{ padding: '0 24px' }}>
          <Tabs tabs={[
            { id: 'overview', label: 'Overview' },
            { id: 'roles', label: 'Roles & Access' },
            { id: 'security', label: 'Security' },
            { id: 'activity', label: 'Activity' },
          ]} active={tab} onChange={setTab} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 24, position: 'relative' }}>
          {tab === 'overview' && <UserOverview draft={draft} updateDraft={updateDraft} />}
          {tab === 'roles' && <UserRoles draft={draft} updateDraft={updateDraft} />}
          {tab === 'security' && <UserSecurity draft={draft} updateDraft={updateDraft} />}
          {tab === 'activity' && <UserActivity user={user} />}
          {toast && (
            <div style={{
              position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
              background: '#1C192E', color: '#fff', padding: '10px 16px', borderRadius: 8,
              fontSize: 13, fontWeight: 500, boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              display: 'inline-flex', alignItems: 'center', gap: 8, zIndex: 5,
            }}>
              <Icon name="check" size={14} color="#00C9A7" />
              {toast}
            </div>
          )}
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="danger" icon="trash" onClick={() => setConfirmDelete(true)}>Delete user</Button>
          <div style={{ display: 'flex', gap: 8 }}>
            {user.roles.includes('Provider') && (
              <Button variant="secondary" icon="edit" onClick={() => setSignOpen(true)}>Sign on behalf</Button>
            )}
            <Button variant="secondary" icon="key" onClick={handleResetPwd}>Reset password</Button>
            <Button variant="secondary" icon="lock" onClick={handleSuspend}>{user.status === 'suspended' ? 'Reactivate' : 'Suspend'}</Button>
            <Button variant="primary" icon="check" onClick={handleSave} disabled={!dirty}>Save changes</Button>
          </div>
        </div>
      </div>

      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} title="Delete this user?" width={460}
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmDelete(false)}>Cancel</Button>
            <Button variant="danger" icon="trash" onClick={handleDelete}>Delete user</Button>
          </>
        }>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 9999, background: '#FDECEC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="alertTriangle" size={20} color="#C9302C" />
          </div>
          <div style={{ fontSize: 14, color: '#1C192E', lineHeight: '20px' }}>
            <strong>{user.name}</strong> will lose access immediately. Their audit history will remain for compliance, but they will no longer appear in active rosters or assignments. This cannot be undone.
          </div>
        </div>
      </Modal>

      <SignOnBehalfModal
        open={signOpen}
        onClose={() => setSignOpen(false)}
        provider={user}
        onConfirm={() => { setSignOpen(false); showToast(`Co-sign workspace opened for ${user.name}.`); }}
      />
    </div>
  );
}

function SignOnBehalfModal({ open, onClose, provider, onConfirm }) {
  if (!provider) return null;
  // Mock pending encounters waiting on this provider's signature
  const pending = [
    { id: 'E2218', patient: 'Mark Hubbard', dx: 'Recurrent UTI', age: '4h', status: 'Awaiting signature' },
    { id: 'E2204', patient: 'Renata Aguilar', dx: 'F/u CHF, med titration', age: '6h', status: 'Awaiting signature' },
    { id: 'E2189', patient: 'Doris Kim', dx: 'Annual physical, immunizations', age: '1d', status: 'Awaiting signature' },
  ];
  const [reason, setReason] = useState('Provider out — covering for clinical continuity');
  const [ack, setAck] = useState(false);
  return (
    <Modal open={open} onClose={onClose} title={`Sign on behalf of ${provider.name}`} width={620}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="edit" onClick={onConfirm} disabled={!ack || !reason.trim()}>
            Open co-sign workspace
          </Button>
        </>
      }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 12, borderRadius: 8, background: '#F5F2FD', border: '1px solid #E5DBFA' }}>
          <Icon name="shield" size={18} color="#67568C" />
          <div style={{ fontSize: 13, color: '#1C192E', lineHeight: '20px' }}>
            You hold the <strong>"Sign on another provider's behalf"</strong> capability via the Super Admin role. Every co-signed encounter records both signatures and your stated reason in the audit log.
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6A7282', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
            {pending.length} encounters awaiting {provider.name.split(' ').slice(-1)[0]}'s signature
          </div>
          <div style={{ border: '1px solid #EEEEEE', borderRadius: 8, overflow: 'hidden' }}>
            {pending.map((e, i) => (
              <div key={e.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                padding: '12px 14px', borderTop: i ? '1px solid #F3F4F6' : 0, fontSize: 13,
              }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, color: '#1C192E' }}>#{e.id} · {e.patient}</span>
                  <span style={{ color: '#6A7282', fontSize: 12 }}>{e.dx}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: '#99A1AF' }}>{e.age}</span>
                  <Chip tone="pending">PENDING</Chip>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Field label="Reason for co-signing" required hint="Captured verbatim in the audit log alongside the encounter.">
          <Input value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g. Provider on leave — covering for continuity" />
        </Field>

        <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: 12, borderRadius: 8, background: '#FFF8E6', border: '1px solid #FFE9A6', cursor: 'pointer' }}>
          <Checkbox checked={ack} onChange={() => setAck(!ack)} />
          <span style={{ fontSize: 13, color: '#1C192E', lineHeight: '20px' }}>
            I confirm I've reviewed the encounter content and that signing on behalf of <strong>{provider.name}</strong> is appropriate. This action will appear in the audit log under both my name and theirs.
          </span>
        </label>
      </div>
    </Modal>
  );
}

function UserOverview({ draft, updateDraft }) {
  const u = draft;
  const set = (k) => (e) => updateDraft({ [k]: e.target ? e.target.value : e });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Field label="Full name"><Input value={u.name} onChange={set('name')} /></Field>
      <Field label="Email"><Input value={u.email} icon="mail" onChange={set('email')} /></Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <Field label="Department"><Input value={u.dept} onChange={set('dept')} /></Field>
        <Field label="Specialization"><Input value={u.spec} onChange={set('spec')} /></Field>
      </div>
      <Field label="Phone"><Input value={u.phone} onChange={set('phone')} /></Field>
      <Field label="Joined" hint="System-set on first sign-in. Read-only.">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 12px', borderRadius: 6,
          border: '1px solid #E5E7EB', background: '#F9FAFB',
          fontSize: 14, color: '#6A7282', height: 40,
        }}>
          <Icon name="clock" size={14} color="#99A1AF" />
          <span>{u.joined}</span>
          <Icon name="lock" size={12} color="#99A1AF" style={{ marginLeft: 'auto' }} />
        </div>
      </Field>
    </div>
  );
}

function UserRoles({ draft, updateDraft }) {
  const user = draft;
  const toggleFac = (id) => {
    const has = user.facilities.includes(id);
    updateDraft({ facilities: has ? user.facilities.filter(f => f !== id) : [...user.facilities, id] });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Field label="Role" hint="Each user has exactly one role. Use the role picker below to change it.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {ASSIGNABLE_ROLES.map(r => {
            const on = user.roles[0] === r;
            const t = ROLE_TONES[r];
            return (
              <button key={r} onClick={() => updateDraft({ roles: [r] })} style={{
                padding: '14px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                border: `1.5px solid ${on ? t.solid : '#E5E7EB'}`,
                background: on ? t.bg : '#fff', color: on ? t.fg : '#6A7282', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>
                <span style={{
                  width: 16, height: 16, borderRadius: 9999,
                  border: `2px solid ${on ? t.solid : '#D1D5DC'}`,
                  background: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
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
              <Checkbox checked={user.facilities.includes(f.id)} onChange={() => toggleFac(f.id)} />
              <span style={{ fontSize: 14 }}>{f.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: '#99A1AF' }}>{f.region}</span>
            </label>
          ))}
        </div>
      </Field>
      <Card style={{ background: '#F5F2FD', border: '1px solid #E5DBFA' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="info" size={16} color="#67568C" />
          <div style={{ fontSize: 13, color: '#67568C', lineHeight: '20px' }}>
            <strong>Effective permissions for this user</strong><br />
            Computed from the <strong>{user.roles[0]}</strong> role intersected with facility access ({user.facilities.length} of {FACILITIES.length} facilities).
          </div>
        </div>
      </Card>
    </div>
  );
}

function UserSecurity({ draft, updateDraft }) {
  const user = draft;
  const [forceReset, setForceReset] = useState(false);
  const [restrict, setRestrict] = useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SettingRow label="Two-factor authentication" desc={user.mfa ? 'Active · Authenticator app' : 'Not enrolled — recommend enforcing.'} checked={user.mfa} onChange={() => updateDraft({ mfa: !user.mfa })} />
      <SettingRow label="Force password reset on next login" desc="User will be prompted to set a new password." checked={forceReset} onChange={() => setForceReset(v => !v)} />
      <SettingRow label="Restrict to known devices" desc="Block sign-ins from unrecognized devices." checked={restrict} onChange={() => setRestrict(v => !v)} />
      <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600 }}>Active sessions</div>
      <div style={{ border: '1px solid #E5E7EB', borderRadius: 8 }}>
        {[
          { device: 'MacBook Pro · Chrome', loc: 'San Francisco, CA', when: 'Now', current: true },
          { device: 'iPhone 15 · Safari', loc: 'San Francisco, CA', when: '2 hr ago' },
          { device: 'Windows · Edge', loc: 'San Jose, CA', when: 'Yesterday' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: i ? '1px solid #EEEEEE' : 0 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{s.device} {s.current && <Chip tone="success" style={{ marginLeft: 8 }}>CURRENT</Chip>}</div>
              <div style={{ fontSize: 12, color: '#6A7282' }}>{s.loc} · {s.when}</div>
            </div>
            {!s.current && <Button variant="ghostNeutral" size="sm">Revoke</Button>}
          </div>
        ))}
      </div>
    </div>
  );
}

function UserActivity({ user }) {
  const [filter, setFilter] = useState('all');
  const [range, setRange] = useState('7d');

  // Generate role-flavored activity history
  const allEvents = useMemo(() => generateActivityForUser(user), [user.id]);
  const filtered = allEvents.filter(e => filter === 'all' || e.category === filter);

  // Group by day
  const groups = {};
  filtered.forEach(e => {
    if (!groups[e.day]) groups[e.day] = [];
    groups[e.day].push(e);
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginBottom: 8, alignItems: 'center' }}>
        <Select value={range} onChange={setRange} options={[
          { value: '24h', label: 'Last 24 hours' },
          { value: '7d', label: 'Last 7 days' },
          { value: '30d', label: 'Last 30 days' },
          { value: 'all', label: 'All time' },
        ]} width={150} />
        <Button variant="ghost" size="sm" icon="download">Export</Button>
      </div>
      <div style={{ display: 'flex', gap: 4, padding: 3, background: '#F3F4F6', borderRadius: 6, marginBottom: 16, width: '100%' }}>
        {[
          { id: 'all', label: 'All', count: allEvents.length },
          { id: 'auth', label: 'Auth', count: allEvents.filter(e => e.category === 'auth').length },
          { id: 'clinical', label: 'Clinical', count: allEvents.filter(e => e.category === 'clinical').length },
          { id: 'admin', label: 'Admin', count: allEvents.filter(e => e.category === 'admin').length },
          { id: 'data', label: 'Data', count: allEvents.filter(e => e.category === 'data').length },
        ].map(t => (
          <button key={t.id} onClick={() => setFilter(t.id)} style={{
            flex: 1, padding: '7px 10px', borderRadius: 4, border: 0,
            background: filter === t.id ? '#fff' : 'transparent',
            color: filter === t.id ? '#1C192E' : '#6A7282',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            boxShadow: filter === t.id ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            {t.label} <span style={{
              background: filter === t.id ? '#F3F4F6' : '#fff',
              color: '#6A7282', borderRadius: 9999, padding: '0 6px', fontSize: 10,
            }}>{t.count}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        <ActMetric label="Sessions" value={allEvents.filter(e => e.action === 'Signed in').length} icon="key" />
        <ActMetric label="Clinical actions" value={allEvents.filter(e => e.category === 'clinical').length} icon="fileText" tone="primary" />
        <ActMetric label="Last active" value={user.lastActive} icon="clock" small />
        <ActMetric label="Total events" value={allEvents.length} icon="activity" />
      </div>

      {Object.keys(groups).length === 0 && (
        <EmptyState icon="history" title="No matching activity" body="Try widening the date range or clearing the category filter." />
      )}

      {Object.entries(groups).map(([day, events]) => (
        <div key={day} style={{ marginBottom: 18 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
            position: 'sticky', top: 0, background: '#fff', padding: '4px 0', zIndex: 1,
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#67568C', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{day}</span>
            <span style={{ flex: 1, height: 1, background: '#EEEEEE' }} />
            <span style={{ fontSize: 11, color: '#99A1AF', fontFamily: 'JetBrains Mono' }}>{events.length} events</span>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: 17, top: 8, bottom: 8, width: 2, background: '#F3F4F6' }} />
            {events.map((e, i) => <ActivityRow key={i} event={e} />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function ActMetric({ label, value, icon, tone = 'neutral', small }) {
  const tones = {
    primary: { bg: '#F5F2FD', fg: '#67568C' },
    neutral: { bg: '#F9FAFB', fg: '#6A7282' },
  };
  const t = tones[tone];
  return (
    <div style={{ padding: 12, background: t.bg, borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name={icon} size={12} color={t.fg} />
        <span style={{ fontSize: 11, color: t.fg, fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ fontSize: small ? 13 : 18, fontWeight: 700, color: '#1C192E' }}>{value}</div>
    </div>
  );
}

function ActivityRow({ event }) {
  const tones = {
    auth: { bg: '#E6F3FB', fg: '#0081CF' },
    clinical: { bg: '#F5F2FD', fg: '#67568C' },
    admin: { bg: '#FFF3EF', fg: '#FF6E6C' },
    data: { bg: '#E7F5EF', fg: '#29BB89' },
    system: { bg: '#F3F4F6', fg: '#6A7282' },
  };
  const t = tones[event.category];
  return (
    <div style={{ display: 'flex', gap: 12, marginBottom: 4, alignItems: 'flex-start', paddingLeft: 0 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 9999, background: t.bg, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1, position: 'relative',
        border: '3px solid #fff',
      }}>
        <Icon name={event.icon} size={14} color={t.fg} />
      </div>
      <div style={{ flex: 1, minWidth: 0, padding: '8px 12px', background: '#F9FAFB', borderRadius: 6, marginTop: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#1C192E' }}>{event.action}</span>
          <span style={{ fontSize: 11, color: '#99A1AF', fontFamily: 'JetBrains Mono', whiteSpace: 'nowrap' }}>{event.time}</span>
        </div>
        <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{event.detail}</div>
        {event.meta && (
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {event.meta.map((m, i) => (
              <span key={i} style={{
                fontSize: 10, fontFamily: 'JetBrains Mono', color: '#6A7282',
                background: '#fff', padding: '2px 6px', borderRadius: 4, border: '1px solid #EEEEEE',
              }}>{m}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function generateActivityForUser(user) {
  const role = user.roles[0];
  const facName = FACILITIES.find(f => user.facilities.includes(f.id))?.short || 'Niles Care Center';
  const out = [];
  const push = (day, time, action, detail, category, icon, meta) =>
    out.push({ day, time, action, detail, category, icon, meta });

  // Today
  push('Today', '10:42', 'Signed in', `${facName} workstation · iOS Safari`, 'auth', 'key', ['IP 10.0.42.18', 'Trusted device']);

  if (role === 'Provider') {
    push('Today', '10:50', 'Started encounter', 'Marjorie Bell · MRN 0034-201 · Routine follow-up', 'clinical', 'fileText', ['Encounter #E-44912']);
    push('Today', '11:18', 'Signed encounter', 'Marjorie Bell · A&P updated, 4 problems', 'clinical', 'check', ['Encounter #E-44912', '0.97 wRVU']);
    push('Today', '11:42', 'E-prescribed', 'Lisinopril 10mg · qty 30 · refills 3 → CVS Sunnyvale', 'clinical', 'edit', ['Rx #91240']);
    push('Today', '13:05', 'Reviewed flagged vital', 'Adam Linda · BP 168/92 systolic flag', 'clinical', 'alert');
    push('Today', '14:30', 'Co-signed encounter', 'Note authored by Marcus Reyes (Scribe)', 'clinical', 'check', ['Encounter #E-44897']);
    push('Today', '15:12', 'Returned for revision', 'Note for Harold Chen → Priya Shah · "Add wound care detail"', 'clinical', 'edit', ['Encounter #E-44903']);
    push('Today', '16:48', 'Updated profile', 'Phone number updated', 'data', 'user');
  } else if (role === 'Scribe') {
    push('Today', '10:55', 'Accepted assignment', 'Encounter from Dr. John Carter · Niles Care Center', 'clinical', 'check', ['Encounter #E-44915']);
    push('Today', '11:22', 'Started encounter', 'Adam Linda · Hospital follow-up', 'clinical', 'fileText', ['Encounter #E-44915']);
    push('Today', '12:14', 'Submitted note', 'Sent to Dr. Carter for signature', 'clinical', 'check', ['Encounter #E-44915', '$12.50 earned']);
    push('Today', '13:01', 'Used AI Scribe suggestion', 'Pulled prior A&P + RFV from chart', 'clinical', 'edit');
    push('Today', '14:25', 'Note returned for revision', 'Dr. Tran requested wound documentation detail', 'clinical', 'alert', ['Encounter #E-44890']);
    push('Today', '15:18', 'Resubmitted note', 'Encounter #E-44890 with revisions', 'clinical', 'check');
    push('Today', '16:30', 'Started encounter', 'Yvonne Park · Discharge summary', 'clinical', 'fileText', ['Encounter #E-44922']);
  } else if (role === 'Clerk') {
    push('Today', '10:48', 'Created patient', 'Linda Park · MRN 0035-118 · Niles Care Center', 'data', 'plus', ['New admission']);
    push('Today', '11:05', 'Routed medical document', 'Lab results (CBC, BMP) → Dr. Olivia Tran', 'data', 'fileText', ['Doc #D-2241']);
    push('Today', '12:20', 'Bulk assigned encounters', '6 encounters → Marcus Reyes (Scribe)', 'clinical', 'edit', ['Casa of Hobart']);
    push('Today', '13:40', 'Authorized discharge request', 'Harold Chen → Home with home health', 'clinical', 'check', ['Discharge #DC-441']);
    push('Today', '14:55', 'Edited shift template', 'Weekend coverage · Casa of Hobart', 'admin', 'edit');
    push('Today', '15:30', 'Added contact', 'Pharmacy · Sunny Pharmacy 415-555-0188', 'data', 'plus');
  } else if (role === 'Super Admin') {
    push('Today', '10:42', 'Updated permission', '"Sign on another provider\'s behalf" → Scribe: denied', 'admin', 'shield', ['Sensitive']);
    push('Today', '11:15', 'Created user', 'Brianna Lopez · Clerk · Niles Care Center', 'admin', 'plus');
    push('Today', '12:30', 'Toggled feature', 'Provider · Sign-on-mobile signature pad: OFF', 'admin', 'sliders');
    push('Today', '14:08', 'Updated comp rule', 'Standard Note · Medicine: $12.00 → $12.50', 'admin', 'money');
    push('Today', '15:55', 'Exported audit log', 'Last 30 days · 2,184 events', 'admin', 'download', ['Sensitive']);
  }

  // Yesterday
  push('Yesterday', '08:14', 'Signed in', 'MacBook Pro · Chrome · San Francisco, CA', 'auth', 'key', ['New device']);
  if (role === 'Provider') {
    push('Yesterday', '09:30', 'Signed encounter', 'Walter Chu · Wound care follow-up', 'clinical', 'check', ['0.85 wRVU']);
    push('Yesterday', '11:42', 'Signed encounter', 'Edna Goldman · Annual wellness visit', 'clinical', 'check', ['1.50 wRVU']);
    push('Yesterday', '14:10', 'Reviewed lab results', 'Hemoglobin A1c · 7.2% · acted on', 'clinical', 'fileText');
    push('Yesterday', '16:22', 'Failed sign-in', '1 attempt · wrong password', 'auth', 'alert');
    push('Yesterday', '16:24', 'Signed in', 'Password reset successful', 'auth', 'key');
  } else if (role === 'Scribe') {
    push('Yesterday', '09:10', 'Submitted note', 'Walter Chu encounter', 'clinical', 'check', ['$12.50 earned']);
    push('Yesterday', '11:08', 'Submitted note', 'Edna Goldman encounter', 'clinical', 'check', ['$17.00 earned']);
    push('Yesterday', '13:30', 'Returned assignment', 'Out of specialty scope · routed to Yuki', 'clinical', 'edit');
    push('Yesterday', '15:48', 'Used AI Scribe suggestion', '12 suggestions accepted, 3 declined', 'clinical', 'edit');
  } else if (role === 'Clerk') {
    push('Yesterday', '09:00', 'Edited patient demographics', 'Walter Chu · phone updated', 'data', 'edit');
    push('Yesterday', '10:42', 'Identified medical document', 'Imaging report (chest X-ray) → Dr. Carter', 'data', 'fileText');
    push('Yesterday', '13:15', 'Created encounter', 'Walk-in: BP check · Niles Care Center', 'clinical', 'plus');
    push('Yesterday', '15:30', 'Added shift', 'Dr. Tran · Sat Apr 26 · 8a-4p', 'admin', 'plus');
  } else if (role === 'Super Admin') {
    push('Yesterday', '17:23', 'Suspended user', 'Dr. Harold Greene · reason: HR review', 'admin', 'lock', ['Sensitive']);
    push('Yesterday', '14:02', 'Toggled feature', 'Provider · Sign-on-mobile signature pad: OFF', 'admin', 'sliders');
  }
  push('Yesterday', '17:55', 'Signed out', 'Session ended after 9h 41m', 'auth', 'lock');

  // Apr 25
  push('Apr 25', '08:02', 'Signed in', 'iPhone 15 · Safari · San Francisco, CA', 'auth', 'key');
  if (role === 'Provider') {
    push('Apr 25', '10:18', 'Signed encounter', 'Routine 4 patients · all signed', 'clinical', 'check', ['4 encounters', '3.8 wRVU']);
    push('Apr 25', '14:30', 'High-risk RTH review', '2 patients flagged · dispositioned', 'clinical', 'alert');
  } else if (role === 'Scribe') {
    push('Apr 25', '10:00', 'Started shift', 'Took 8 encounters in queue', 'clinical', 'fileText');
    push('Apr 25', '15:15', 'Speed metric', 'Avg time-to-complete: 38 min (▼6%)', 'system', 'activity');
  } else if (role === 'Clerk') {
    push('Apr 25', '11:30', 'Bulk assigned encounters', '12 encounters across 3 scribes', 'admin', 'edit');
    push('Apr 25', '14:00', 'Reviewed flagged vitals queue', '4 cleared, 2 escalated', 'clinical', 'alert');
  } else if (role === 'Super Admin') {
    push('Apr 25', '11:30', 'Assigned roles', 'Kenji Watanabe · changed from Scribe + Clerk → Scribe', 'admin', 'shield');
    push('Apr 25', '09:11', 'Login from new device', 'Marcus Reyes · iOS · San Francisco', 'auth', 'alert');
  }

  // Apr 24
  push('Apr 24', '08:14', 'Signed in', 'MacBook Pro · Chrome', 'auth', 'key');
  push('Apr 24', '10:30', 'Updated profile photo', 'New avatar uploaded', 'data', 'edit');
  if (role === 'Provider' || role === 'Scribe') {
    push('Apr 24', '13:48', 'Viewed earnings panel', 'Reviewed this-week breakdown', 'data', 'eye');
  }

  // Older
  push('Apr 23', '08:08', 'Signed in', 'MacBook Pro · Chrome', 'auth', 'key');
  push('Apr 23', '09:30', 'Password changed', 'Self-service via account settings', 'auth', 'lock');
  push('Apr 22', '08:10', 'Signed in', 'MacBook Pro · Chrome', 'auth', 'key');
  push('Apr 22', '14:22', 'Enabled two-factor auth', 'Authenticator app set up', 'auth', 'shield', ['Recommended']);

  return out;
}

Object.assign(window, { UsersPage, UserDrawer, SettingRow });
