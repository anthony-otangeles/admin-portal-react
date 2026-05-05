// Admin Portal — Compensation, Onboarding, Audit, Notifications, Facilities, Settings, Analytics

// =================== COMPENSATION ===================
function CompensationPage() {
  const [rules, setRules] = useState(COMPENSATION_RULES);
  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);

  const totalActive = rules.filter(r => r.active).length;
  const avgRate = (rules.filter(r => r.active).reduce((s, r) => s + r.rate, 0) / totalActive).toFixed(2);

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Compensation"
        subtitle="Per-note rates and bonuses paid out to scribes. Calculated when a provider signs a note."
        actions={
          <>
            <Button variant="secondary" icon="download">Export rates</Button>
            <Button variant="primary" icon="plus" onClick={() => setCreating(true)}>New rule</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Active rules" value={totalActive} tone="primary" icon="money" />
        <StatTile label="Avg rate / note" value={`$${avgRate}`} tone="mint" icon="activity" delta="▲ $0.20 vs last month" />
        <StatTile label="Notes paid this week" value="612" tone="blue" icon="fileText" delta="$8,420 total" />
        <StatTile label="Bonus eligible" value="34" tone="coral" icon="alert" delta="2 awaiting review" deltaTone="coral" />
      </div>

      <Card padding={0}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Per-note rate rules</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <Select value="all" onChange={() => {}} options={[{ value: 'all', label: 'All specialties' }]} width={180} />
            <Select value="all" onChange={() => {}} options={[{ value: 'all', label: 'All note types' }]} width={170} />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter' }}>
          <thead>
            <tr style={{ fontSize: 12, color: '#6A7282', fontWeight: 600, textAlign: 'left', background: '#F9FAFB' }}>
              <th style={{ padding: '12px 20px' }}>Rule name</th>
              <th style={{ padding: 12 }}>Note type</th>
              <th style={{ padding: 12 }}>Specialty</th>
              <th style={{ padding: 12, textAlign: 'right' }}>Base rate</th>
              <th style={{ padding: 12, textAlign: 'right' }}>Bonus</th>
              <th style={{ padding: 12 }}>Status</th>
              <th style={{ padding: 12, width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {rules.map(r => (
              <tr key={r.id} style={{ borderTop: '1px solid #EEEEEE' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600 }}>{r.name}</td>
                <td style={{ padding: 14, fontSize: 13 }}>{r.noteType}</td>
                <td style={{ padding: 14, fontSize: 13 }}>{r.specialty}</td>
                <td style={{ padding: 14, fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono', textAlign: 'right' }}>${r.rate.toFixed(2)}</td>
                <td style={{ padding: 14, fontSize: 13, fontFamily: 'JetBrains Mono', textAlign: 'right' }}>
                  {r.bonus ? <span style={{ color: '#29BB89', fontWeight: 700 }}>+${r.bonus.toFixed(2)}</span> : <span style={{ color: '#99A1AF' }}>—</span>}
                  {r.bonusReason && <div style={{ fontSize: 10, color: '#6A7282', fontFamily: 'Inter' }}>{r.bonusReason}</div>}
                </td>
                <td style={{ padding: 14 }}>
                  <Toggle checked={r.active} onChange={() => {
                    setRules(rules.map(x => x.id === r.id ? { ...x, active: !x.active } : x));
                  }} size="sm" />
                </td>
                <td style={{ padding: 14, textAlign: 'right' }}>
                  <Button variant="ghost" size="sm" onClick={() => setEditing(r)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card padding={0} style={{ marginTop: 24 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Top earners this week</h2>
        </div>
        <div style={{ padding: 22 }}>
          {[
            { name: 'Marcus Reyes', initials: 'MR', notes: 84, gross: 1248.00 },
            { name: 'Yuki Schmidt', initials: 'YS', notes: 71, gross: 1102.50 },
            { name: 'Priya Shah', initials: 'PS', notes: 64, gross: 968.00 },
            { name: 'Ines Park', initials: 'IP', notes: 58, gross: 894.50 },
            { name: 'Kenji Watanabe', initials: 'KW', notes: 42, gross: 612.00 },
          ].map((p, i) => {
            const max = 1248;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderTop: i ? '1px dashed #EEEEEE' : 0 }}>
                <Avatar initials={p.initials} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700 }}>${p.gross.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, height: 6, background: '#F3F4F6', borderRadius: 9999, overflow: 'hidden' }}>
                      <div style={{ width: `${(p.gross / max) * 100}%`, height: '100%', background: '#00C9A7' }} />
                    </div>
                    <span style={{ fontSize: 11, color: '#6A7282', fontFamily: 'JetBrains Mono', whiteSpace: 'nowrap' }}>{p.notes} notes</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {(editing || creating) && (
        <Modal open={true} onClose={() => { setEditing(null); setCreating(false); }} title={creating ? 'New rate rule' : 'Edit rate rule'} width={520}
          footer={
            <>
              <Button variant="secondary" onClick={() => { setEditing(null); setCreating(false); }}>Cancel</Button>
              <Button variant="primary" icon="check" onClick={() => { setEditing(null); setCreating(false); }}>Save rule</Button>
            </>
          }>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Rule name" required><Input value={editing?.name || ''} placeholder="e.g. Standard note · Cardiology" /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Note type">
                <Select value={editing?.noteType || 'Standard'} onChange={() => {}} options={[
                  { value: 'Standard', label: 'Standard' },
                  { value: 'Admission H&P', label: 'Admission H&P' },
                  { value: 'Discharge', label: 'Discharge' },
                  { value: 'Specialty', label: 'Specialty' },
                ]} />
              </Field>
              <Field label="Specialty">
                <Select value={editing?.specialty || 'All'} onChange={() => {}} options={[
                  { value: 'All', label: 'All specialties' },
                  { value: 'Internal Medicine', label: 'Internal Medicine' },
                  { value: 'Wound Care', label: 'Wound Care' },
                  { value: 'Cardiology', label: 'Cardiology' },
                ]} />
              </Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Base rate ($)" required><Input value={editing?.rate?.toFixed(2) || ''} placeholder="12.50" /></Field>
              <Field label="Bonus ($)"><Input value={editing?.bonus?.toFixed(2) || ''} placeholder="0.00" /></Field>
            </div>
            <Field label="Bonus condition" hint="When should the bonus apply?">
              <Input value={editing?.bonusReason || ''} placeholder="e.g. Multi-system, ≥10 problems" />
            </Field>
          </div>
        </Modal>
      )}
    </main>
  );
}

// =================== ONBOARDING ===================
function OnboardingPage() {
  const [steps, setSteps] = useState(ONBOARDING_STEPS);
  const [template, setTemplate] = useState('Provider');

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Onboarding"
        subtitle="Configure the steps every new user moves through, then track who's stuck where."
        actions={<Button variant="primary" icon="copy">Duplicate template</Button>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Onboarding flow</h2>
              <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>Drag to reorder</div>
            </div>
            <Select value={template} onChange={setTemplate} options={ROLES.map(r => ({ value: r, label: `${r} template` }))} width={180} />
          </div>
          <div style={{ padding: 16 }}>
            {steps.map((s, i) => (
              <div key={s.id} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: 14, marginBottom: 8,
                background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4,
                position: 'relative',
              }}>
                <div style={{ cursor: 'grab', color: '#D1D5DC', display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ width: 4, height: 4, borderRadius: 9999, background: '#D1D5DC' }} />
                  <span style={{ width: 4, height: 4, borderRadius: 9999, background: '#D1D5DC' }} />
                  <span style={{ width: 4, height: 4, borderRadius: 9999, background: '#D1D5DC' }} />
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: 9999, background: s.enabled ? '#F5F2FD' : '#F3F4F6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${s.enabled ? '#845EC2' : '#D1D5DC'}`,
                  color: s.enabled ? '#845EC2' : '#99A1AF',
                  fontSize: 13, fontWeight: 700,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {s.label}
                    {s.required && <Chip tone="primary" style={{ fontSize: 10 }}>REQUIRED</Chip>}
                  </div>
                </div>
                <Toggle checked={s.enabled} onChange={() => {
                  if (s.required) return;
                  setSteps(steps.map(x => x.id === s.id ? { ...x, enabled: !x.enabled } : x));
                }} size="sm" />
              </div>
            ))}
            <button style={{
              width: '100%', padding: 14, borderRadius: 4, border: '2px dashed #D1D5DC',
              background: 'transparent', color: '#6A7282', fontWeight: 600, fontSize: 13,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <Icon name="plus" size={14} color="#6A7282" /> Add custom step
            </button>
          </div>
        </Card>

        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>In-progress invitations</h2>
            <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>5 invited · 3 active · 1 stuck > 7 days</div>
          </div>
          <div style={{ padding: 16 }}>
            {[
              { name: 'Brianna Lopez', role: 'Clerk', step: 1, days: 9, stuck: true },
              { name: 'David Park', role: 'Scribe', step: 4, days: 2 },
              { name: 'Renee Ortiz', role: 'Provider', step: 6, days: 1 },
              { name: 'Tariq Hassan', role: 'Scribe', step: 3, days: 3 },
              { name: 'Mei Chen', role: 'Provider', step: 5, days: 1 },
            ].map((p, i) => (
              <div key={i} style={{ padding: 14, marginBottom: 10, border: '1px solid #EEEEEE', borderRadius: 6, background: p.stuck ? '#FDECEC' : '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar initials={p.name.split(' ').map(s => s[0]).join('')} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#6A7282' }}><RoleChip role={p.role} /> · invited {p.days}d ago</div>
                  </div>
                  {p.stuck && <Chip tone="danger">STUCK</Chip>}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {steps.map((_, si) => (
                    <div key={si} style={{
                      flex: 1, height: 6, borderRadius: 9999,
                      background: si < p.step ? '#29BB89' : si === p.step ? '#FFD12A' : '#F3F4F6',
                    }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <span style={{ fontSize: 12, color: '#6A7282' }}>Step {p.step + 1}/{steps.length} · {steps[Math.min(p.step, steps.length - 1)].label}</span>
                  <Button variant="ghost" size="sm" icon="mail">Resend</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

// =================== AUDIT ===================
function AuditPage() {
  const [filter, setFilter] = useState('all');
  const filtered = AUDIT_ENTRIES;

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Audit Log"
        subtitle="Every administrative action is logged here. Exports include user, IP, and resource ID."
        actions={
          <>
            <Button variant="secondary" icon="filter">Filters</Button>
            <Button variant="primary" icon="download">Export CSV</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Events today" value="47" tone="primary" icon="activity" />
        <StatTile label="Sensitive actions" value="3" tone="coral" icon="alert" delta="2 by Sarah Avila" />
        <StatTile label="Failed logins (24h)" value="2" tone="gold" icon="lock" />
        <StatTile label="Logged users" value="12" tone="blue" icon="users" delta="of 187 total" />
      </div>

      <Card padding={0}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Input icon="search" placeholder="Search by user, action, or target" style={{ flex: 1 }} />
          <Select value="all" onChange={() => {}} options={[
            { value: 'all', label: 'All events' },
            { value: 'sensitive', label: 'Sensitive only' },
            { value: 'auth', label: 'Authentication' },
            { value: 'admin', label: 'Admin changes' },
          ]} width={180} />
          <Select value="7d" onChange={() => {}} options={[
            { value: '24h', label: 'Last 24h' },
            { value: '7d', label: 'Last 7 days' },
            { value: '30d', label: 'Last 30 days' },
            { value: 'all', label: 'All time' },
          ]} width={150} />
        </div>
        <div>
          {filtered.map((a, i) => {
            const tones = {
              warn: { bg: '#FFF8E6', fg: '#B58420', icon: 'alert' },
              success: { bg: '#E7F5EF', fg: '#29BB89', icon: 'check' },
              danger: { bg: '#FDECEC', fg: '#C9302C', icon: 'lock' },
              info: { bg: '#F5F2FD', fg: '#67568C', icon: 'edit' },
              neutral: { bg: '#F3F4F6', fg: '#6A7282', icon: 'eye' },
            };
            const t = tones[a.tone];
            return (
              <div key={a.id} style={{ padding: '14px 20px', display: 'flex', gap: 14, alignItems: 'center', borderTop: i ? '1px solid #EEEEEE' : 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9999, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={t.icon} size={16} color={t.fg} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, color: '#1C192E' }}>
                    <span style={{ fontWeight: 700 }}>{a.who}</span> · {a.action}
                  </div>
                  <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2, fontFamily: 'JetBrains Mono' }}>{a.target}</div>
                </div>
                <span style={{ fontSize: 12, color: '#6A7282', fontFamily: 'JetBrains Mono', whiteSpace: 'nowrap' }}>{a.when}</span>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            );
          })}
        </div>
      </Card>
    </main>
  );
}

// =================== NOTIFICATIONS ===================
function NotificationsPage() {
  const [rules, setRules] = useState(NOTIFICATION_RULES['Super Admin']);

  const toggle = (i, key) => {
    const next = [...rules];
    next[i] = { ...next[i], [key]: !next[i][key] };
    setRules(next);
  };

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Notifications"
        subtitle="Decide what triggers an email or in-app alert. Per-user overrides are available in user profiles."
        actions={<Button variant="primary" icon="check">Save preferences</Button>}
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, padding: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, width: 'fit-content' }}>
        {ROLES.map(r => {
          const on = r === 'Super Admin';
          const t = ROLE_TONES[r];
          return (
            <button key={r} style={{
              padding: '10px 16px', borderRadius: 4, border: 0,
              background: on ? t.bg : 'transparent', color: on ? t.fg : '#6A7282',
              fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'Inter',
            }}>
              {r}
            </button>
          );
        })}
      </div>

      <Card padding={0}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter' }}>
          <thead>
            <tr style={{ fontSize: 11, color: '#6A7282', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'left', background: '#F9FAFB' }}>
              <th style={{ padding: '14px 20px' }}>Event</th>
              <th style={{ padding: 14, width: 100, textAlign: 'center' }}>In-App</th>
              <th style={{ padding: 14, width: 100, textAlign: 'center' }}>Email</th>
            </tr>
          </thead>
          <tbody>
            {rules.map((r, i) => (
              <tr key={i} style={{ borderTop: '1px solid #EEEEEE' }}>
                <td style={{ padding: '14px 20px' }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.event}</div>
                  <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{r.desc}</div>
                </td>
                <td style={{ padding: 14, textAlign: 'center' }}><Toggle checked={r.inApp} onChange={() => toggle(i, 'inApp')} size="sm" /></td>
                <td style={{ padding: 14, textAlign: 'center' }}><Toggle checked={r.email} onChange={() => toggle(i, 'email')} size="sm" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card style={{ marginTop: 20, background: '#FFF8E6', border: '1px solid #FFE9A6' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="info" size={18} color="#B58420" />
          <div style={{ fontSize: 13, color: '#825E13', lineHeight: '20px' }}>
            <strong style={{ color: '#1C192E' }}>Heads up:</strong> The Super Admin role inherits the full sitewide notification matrix from each portal (provider rejections, scribe queue health, etc.) PLUS the admin-specific events shown above. Toggle individual events here, or change cross-portal defaults in each portal's notification settings.
          </div>
        </div>
      </Card>
    </main>
  );
}

// =================== FACILITIES ===================
function FacilitiesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [manageId, setManageId] = useState(null);
  const manageFac = manageId ? FACILITIES.find(f => f.id === manageId) : null;

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader title="Facilities" subtitle="Add or edit the facilities your team can be assigned to."
        actions={<Button variant="primary" icon="plus" onClick={() => setShowAdd(true)}>Add New Facility</Button>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {FACILITIES.map(f => {
          const userCount = USERS.filter(u => u.facilities.includes(f.id)).length;
          return (
            <Card key={f.id} padding={0}>
              <div style={{ height: 88, background: 'linear-gradient(135deg, #F5F2FD 0%, #FFF3F8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #EEEEEE' }}>
                <Icon name="facility" size={36} color="#845EC2" />
              </div>
              <div style={{ padding: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{f.name}</div>
                <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{f.region}</div>
                {f.address && (
                  <div style={{ fontSize: 12, color: '#99A1AF', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Icon name="facility" size={12} color="#99A1AF" />
                    {f.address}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 24, marginTop: 16, paddingTop: 16, borderTop: '1px dashed #EEEEEE', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600 }}>Users</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{userCount}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600 }}>Beds</div>
                    <div style={{ fontSize: 18, fontWeight: 700 }}>{f.beds}</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <Button variant="secondary" size="sm" icon="settings" onClick={() => setManageId(f.id)}>Manage</Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      {showAdd && <FacilityModal title="Add New Facility" onClose={() => setShowAdd(false)} />}
      {manageFac && <FacilityModal title="Manage Facility" facility={manageFac} onClose={() => setManageId(null)} />}
    </main>
  );
}

function FacilityModal({ title, facility, onClose }) {
  const [name, setName] = useState(facility?.name || '');
  const [region, setRegion] = useState(facility?.region || '');
  const [address, setAddress] = useState(facility?.address || '');
  const [beds, setBeds] = useState(facility?.beds || '');
  return (
    <Modal open={true} title={title} onClose={onClose} footer={
      <>
        {facility && <Button variant="danger" icon="trash">Delete facility</Button>}
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="check" onClick={onClose}>{facility ? 'Save changes' : 'Add facility'}</Button>
        </div>
      </>
    }>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Facility name">
          <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Niles Care Center" />
        </Field>
        <Field label="City, State">
          <Input value={region} onChange={e => setRegion(e.target.value)} placeholder="e.g. Niles, IL" />
        </Field>
        <Field label="Address">
          <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Street, City, State ZIP" />
        </Field>
        <Field label="Bed count">
          <Input value={beds} onChange={e => setBeds(e.target.value)} placeholder="0" />
        </Field>
        {facility && (
          <Field label="Assigned users" hint="Users currently assigned to this facility.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, border: '1px solid #E5E7EB', borderRadius: 8, padding: 12, maxHeight: 220, overflowY: 'auto' }}>
              {USERS.filter(u => u.facilities.includes(facility.id)).map(u => (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
                  <Avatar initials={u.initials} size={28} bg="#99A1AF" />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</span>
                    <span style={{ fontSize: 11, color: '#6A7282' }}>{u.roles[0]}</span>
                  </div>
                </div>
              ))}
              {USERS.filter(u => u.facilities.includes(facility.id)).length === 0 && (
                <div style={{ fontSize: 13, color: '#99A1AF' }}>No users assigned yet.</div>
              )}
            </div>
          </Field>
        )}
      </div>
    </Modal>
  );
}

// =================== ANALYTICS ===================
function AnalyticsPage() {
  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader title="Analytics" subtitle="Cross-portal metrics. Drill into any tile for detailed breakdowns."
        actions={<><Button variant="secondary" icon="download">Export</Button><Button variant="primary" icon="filter">Filters</Button></>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Notes signed (week)" value="612" delta="▲ 12%" tone="primary" icon="fileText" />
        <StatTile label="W-RVU total" value="4,820" delta="▲ 8%" tone="mint" icon="activity" />
        <StatTile label="Avg time-to-sign" value="2.4 hr" delta="▼ 12%" tone="blue" icon="clock" />
        <StatTile label="Billing rejections" value="3.2%" delta="▼ 0.4%" tone="coral" deltaTone="mint" icon="money" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Encounter throughput by facility</h2>
          </div>
          <div style={{ padding: 22 }}>
            {FACILITIES.map(f => {
              const v = 40 + Math.floor(Math.random() * 60);
              return (
                <div key={f.id} style={{ marginBottom: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                    <span style={{ fontWeight: 600 }}>{f.short}</span>
                    <span style={{ fontFamily: 'JetBrains Mono', color: '#6A7282' }}>{v} / day</span>
                  </div>
                  <div style={{ height: 8, background: '#F3F4F6', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ width: `${v}%`, height: '100%', background: 'linear-gradient(90deg, #845EC2, #C34A7D)' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Documentation quality</h2>
          </div>
          <div style={{ padding: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <QualityRing label="Acceptance rate" value={94} color="#29BB89" />
            <QualityRing label="On-time signing" value={88} color="#0081CF" />
            <QualityRing label="Coding accuracy" value={97} color="#845EC2" />
            <QualityRing label="Returns rate" value={6} color="#FF6E6C" inverted />
          </div>
        </Card>
      </div>
    </main>
  );
}

function QualityRing({ label, value, color, inverted }) {
  const r = 36, c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 12 }}>
      <div style={{ position: 'relative', width: 100, height: 100 }}>
        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r={r} fill="none" stroke="#F3F4F6" strokeWidth="10" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10"
            strokeDasharray={`${dash} ${c}`} strokeLinecap="round" />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>
          {value}%
        </div>
      </div>
      <div style={{ fontSize: 12, color: '#6A7282', marginTop: 8, textAlign: 'center', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

// =================== SETTINGS ===================
function SettingsPage() {
  const [tab, setTab] = useState('profile');
  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader title="Settings" subtitle="Manage your account, preferences, and platform-wide controls." />
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ padding: '0 24px', borderBottom: '1px solid #E5E7EB' }}>
          <Tabs tabs={[
            { id: 'profile', label: 'Profile' },
            { id: 'notifications', label: 'Notifications' },
            { id: 'security', label: 'Security' },
            { id: 'preferences', label: 'Preferences' },
            { id: 'platform', label: 'Platform', badge: 'Super Admin' },
          ]} active={tab} onChange={setTab} />
        </div>
        <div style={{ padding: 28, maxWidth: 760 }}>
          {tab === 'profile' && <SettingsProfile />}
          {tab === 'notifications' && <SettingsNotifications />}
          {tab === 'security' && <SettingsSecurity />}
          {tab === 'preferences' && <SettingsPreferences />}
          {tab === 'platform' && <SettingsPlatform />}
        </div>
      </div>
    </main>
  );
}

function SettingsProfile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Avatar initials="SA" size={72} bg="#99A1AF" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Button variant="secondary" size="sm" icon="edit">Change photo</Button>
          <div style={{ fontSize: 12, color: '#99A1AF' }}>JPG or PNG, up to 4 MB.</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Field label="Full name"><Input value="Sarah Avila" onChange={() => {}} /></Field>
        <Field label="Title"><Input value="Super Admin · IT/Operations" onChange={() => {}} /></Field>
      </div>
      <Field label="Email"><Input value="sarah.avila@otangeles.com" icon="mail" onChange={() => {}} /></Field>
      <Field label="Phone"><Input value="+1 (415) 555-0101" onChange={() => {}} /></Field>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 12, borderTop: '1px solid #EEEEEE' }}>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary" icon="check">Save changes</Button>
      </div>
    </div>
  );
}

function SettingsNotifications() {
  const [rows, setRows] = useState([
    { label: 'Returned encounters', desc: 'When an encounter is returned to you for revision.', inApp: true, email: true },
    { label: 'Encounter accepted', desc: 'When a provider accepts your submitted documentation.', inApp: true, email: false },
    { label: 'Encounter signed', desc: 'When a clinician signs a note you scribed.', inApp: true, email: false },
    { label: 'New assignment', desc: 'When a new shift or patient is assigned to you.', inApp: true, email: true },
    { label: 'Mentions & comments', desc: 'When someone @-mentions you in a note.', inApp: true, email: true },
    { label: 'Daily digest', desc: 'A 7 AM summary of overnight activity.', inApp: false, email: true },
  ]);
  const set = (i, key, v) => setRows(rs => rs.map((r, idx) => idx === i ? { ...r, [key]: v } : r));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', padding: '8px 0', borderBottom: '1px solid #EEEEEE', fontSize: 11, color: '#99A1AF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        <div>Event</div>
        <div style={{ textAlign: 'center' }}>In-app</div>
        <div style={{ textAlign: 'center' }}>Email</div>
      </div>
      {rows.map((r, i) => (
        <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 80px', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F3F4F6' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1C192E' }}>{r.label}</div>
            <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{r.desc}</div>
          </div>
          <div style={{ textAlign: 'center' }}><Toggle checked={r.inApp} onChange={() => set(i, 'inApp', !r.inApp)} /></div>
          <div style={{ textAlign: 'center' }}><Toggle checked={r.email} onChange={() => set(i, 'email', !r.email)} /></div>
        </div>
      ))}
    </div>
  );
}

function SettingsSecurity() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SettingPanel title="Password" desc="Last changed 42 days ago.">
        <Button variant="secondary" icon="key">Change password</Button>
      </SettingPanel>
      <SettingPanel title="Two-factor authentication" desc="Authenticator app · Active">
        <Button variant="secondary" icon="shield">Reconfigure</Button>
      </SettingPanel>
      <SettingPanel title="Active sessions" desc="3 devices currently signed in.">
        <Button variant="ghost" icon="logout">Sign out other sessions</Button>
      </SettingPanel>
      <SettingPanel title="Recovery email" desc="sarah.recovery@otangeles.com">
        <Button variant="secondary" icon="edit">Update</Button>
      </SettingPanel>
    </div>
  );
}

function SettingPanel({ title, desc, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, border: '1px solid #E5E7EB', borderRadius: 8, gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1C192E' }}>{title}</div>
        <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{desc}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function SettingsPreferences() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SettingRow label="Use compact tables" desc="Show more rows per screen." checked={false} onChange={() => {}} />
      <SettingRow label="Show keyboard shortcuts" desc="Reveal ⌘+K hints throughout the app." checked={true} onChange={() => {}} />
      <SettingRow label="Auto-archive read notifications" desc="Move notifications older than 7 days to archive." checked={true} onChange={() => {}} />
      <SettingRow label="Reduce motion" desc="Minimise transitions and animations." checked={false} onChange={() => {}} />
    </div>
  );
}

function SettingsPlatform() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card style={{ background: '#F5F2FD', border: '1px solid #E5DBFA' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="shield" size={16} color="#67568C" />
          <div style={{ fontSize: 13, color: '#67568C', lineHeight: '20px' }}>
            <strong>Super Admin only.</strong> These controls affect every user across all portals. Changes are written to the audit log.
          </div>
        </div>
      </Card>
      <SettingPanel title="Org name" desc="Otangeles Health">
        <Button variant="secondary" icon="edit">Edit</Button>
      </SettingPanel>
      <SettingPanel title="Default new-user role" desc="Assigned when an invitation has no explicit role.">
        <Button variant="secondary" icon="edit">Scribe</Button>
      </SettingPanel>
      <SettingPanel title="Session timeout" desc="Auto-logout after inactivity (HIPAA: ≤ 30 min).">
        <Button variant="secondary" icon="clock">15 minutes</Button>
      </SettingPanel>
      <SettingPanel title="Audit log retention" desc="How long encounter & user activity is retained.">
        <Button variant="secondary" icon="history">7 years</Button>
      </SettingPanel>
      <SettingPanel title="Dismissed patient schedule retention" desc="Days before dismissed patient schedules are automatically deleted.">
        <Button variant="secondary" icon="calendar">7 days</Button>
      </SettingPanel>
      <SettingPanel title="Data export" desc="Download a complete export of all platform data.">
        <Button variant="secondary" icon="download">Request export</Button>
      </SettingPanel>
      <SettingPanel title="Danger zone" desc="Decommission this organization.">
        <Button variant="danger" icon="trash">Delete organization</Button>
      </SettingPanel>
    </div>
  );
}

Object.assign(window, { CompensationPage, OnboardingPage, AuditPage, NotificationsPage, FacilitiesPage, AnalyticsPage, SettingsPage });
