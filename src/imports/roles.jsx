// Admin Portal — Roles & Permissions

function RolesPage() {
  const [activeRole, setActiveRole] = useState('Provider');
  const [matrix, setMatrix] = useState(DEFAULT_PERMISSIONS);
  const [search, setSearch] = useState('');
  const [hideMatched, setHideMatched] = useState(false);

  const counts = useMemo(() => {
    const c = {};
    ROLES.forEach(r => {
      c[r] = Object.values(matrix).filter(row => row[r]).length;
    });
    return c;
  }, [matrix]);

  const totalCaps = Object.keys(matrix).length;
  const memberCounts = USERS.reduce((acc, u) => {
    u.roles.forEach(r => { acc[r] = (acc[r] || 0) + 1; });
    return acc;
  }, {});

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Roles & Permissions"
        subtitle="Roles bundle capabilities. Multi-role users get the union of allows; an explicit deny on any role wins."
        actions={
          <>
            <Button variant="secondary" icon="copy">Duplicate role</Button>
            <Button variant="primary" icon="plus">New role</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Roles</h2>
            <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{ROLES.length} active</div>
          </div>
          <div style={{ padding: 8 }}>
            {ROLES.map(r => {
              const t = ROLE_TONES[r];
              const on = activeRole === r;
              return (
                <button key={r} onClick={() => setActiveRole(r)} style={{
                  width: '100%', padding: 12, borderRadius: 6, border: 0,
                  background: on ? t.bg : 'transparent', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start',
                  textAlign: 'left',
                  borderLeft: `3px solid ${on ? t.solid : 'transparent'}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1C192E' }}>{r}</span>
                    <Chip tone="neutral" style={{ background: '#fff' }}>{memberCounts[r] || 0}</Chip>
                  </div>
                  <div style={{ fontSize: 11, color: '#6A7282' }}>
                    {counts[r]}/{totalCaps} capabilities · {memberCounts[r] || 0} members
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <div>
          <Card padding={0} style={{ marginBottom: 16 }}>
            <div style={{ padding: 22, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, background: ROLE_TONES[activeRole].bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="shield" size={24} color={ROLE_TONES[activeRole].solid} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{activeRole}</h2>
                <div style={{ fontSize: 13, color: '#6A7282', marginTop: 4 }}>
                  {ROLE_DESCRIPTIONS[activeRole]}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 24, paddingLeft: 24, borderLeft: '1px solid #EEEEEE' }}>
                <Stat label="Capabilities" value={`${counts[activeRole]}/${totalCaps}`} />
                <Stat label="Members" value={memberCounts[activeRole] || 0} />
                <Stat label="Sensitive" value={Object.values(PERMISSIONS).flatMap(a => a.capabilities).filter(c => c.sensitive && matrix[c.id]?.[activeRole]).length} tone="coral" />
              </div>
            </div>
          </Card>

          <Card padding={0}>
            <div style={{ padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #EEEEEE' }}>
              <Input icon="search" placeholder="Filter capabilities" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1 }} />
              <SettingRow2 label="Compare across roles" checked={!hideMatched} onChange={v => setHideMatched(!v)} />
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter' }}>
                <thead>
                  <tr style={{ fontSize: 11, color: '#6A7282', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'left' }}>
                    <th style={{ padding: '14px 20px', width: '50%' }}>Capability</th>
                    {ROLES.map(r => (
                      <th key={r} style={{ padding: '14px 8px', textAlign: 'center', minWidth: 90 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          {r === activeRole && <span style={{ width: 6, height: 6, borderRadius: 9999, background: ROLE_TONES[r].solid }} />}
                          <span style={{ fontSize: 11, fontWeight: 600 }}>{r === 'Super Admin' ? 'Admin' : r}</span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map(area => (
                    <React.Fragment key={area.area}>
                      <tr style={{ background: '#F9FAFB' }}>
                        <td colSpan={ROLES.length + 1} style={{ padding: '10px 20px', fontSize: 12, fontWeight: 700, color: '#67568C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <Icon name={area.icon} size={14} color="#67568C" />
                            {area.area}
                          </span>
                        </td>
                      </tr>
                      {area.capabilities
                        .filter(c => !search || c.label.toLowerCase().includes(search.toLowerCase()))
                        .map(c => (
                          <tr key={c.id} style={{ borderTop: '1px solid #EEEEEE' }}>
                            <td style={{ padding: '12px 20px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#1C192E' }}>{c.label}</span>
                                {c.sensitive && <Chip tone="danger" style={{ fontSize: 10 }}>SENSITIVE</Chip>}
                              </div>
                              {c.description && <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{c.description}</div>}
                            </td>
                            {ROLES.map(r => {
                              const allowed = matrix[c.id]?.[r];
                              return (
                                <td key={r} style={{ padding: '12px 8px', textAlign: 'center' }}>
                                  <PermCell
                                    on={allowed}
                                    activeRole={r === activeRole}
                                    onClick={() => {
                                      const next = { ...matrix, [c.id]: { ...matrix[c.id], [r]: !allowed } };
                                      setMatrix(next);
                                    }}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}

const ROLE_DESCRIPTIONS = {
  'Super Admin': 'Full administrative access. Can manage every user, role, portal feature, and audit data.',
  'Provider': 'Clinicians who write and sign encounters. Owns the patient relationship.',
  'Scribe': 'Documents encounters on behalf of providers; cannot sign.',
  'Clerk': 'Operations role; admissions, scheduling, document routing, discharge requests.',
};

function Stat({ label, value, tone }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: tone === 'coral' ? '#FF6E6C' : '#1C192E', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function PermCell({ on, activeRole, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: 32, height: 32, borderRadius: 6, border: 0,
      background: on ? '#E7F5EF' : '#F9FAFB',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer',
      outline: activeRole ? '2px solid #845EC2' : 'none', outlineOffset: 2,
    }}>
      {on
        ? <Icon name="check" size={16} color="#29BB89" strokeWidth={3} />
        : <Icon name="minus" size={16} color="#D1D5DC" strokeWidth={3} />}
    </button>
  );
}

function SettingRow2({ label, checked, onChange }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7282', whiteSpace: 'nowrap', cursor: 'pointer' }}>
      <Toggle checked={checked} onChange={onChange} size="sm" />
      {label}
    </label>
  );
}

Object.assign(window, { RolesPage });
