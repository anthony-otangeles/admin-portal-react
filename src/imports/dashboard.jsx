// Admin Portal — Dashboard

function AdminDashboard({ onNav }) {
  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Hi, Sarah!"
        subtitle="Here's what's happening across all five facilities today."
        actions={
          <>
            <Button variant="secondary" icon="download">Export Report</Button>
            <Button variant="primary" icon="plus" onClick={() => onNav('users')}>Invite User</Button>
          </>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Total Users" value="187" delta="+4 this week" tone="primary" icon="users" />
        <StatTile label="Active Encounters" value="312" delta="28 unassigned" deltaTone="coral" tone="coral" icon="fileText" />
        <StatTile label="Avg Time-to-Start" value="14m" delta="▼ 18% vs last wk" tone="mint" icon="clock" />
        <StatTile label="Facilities Online" value="5 / 5" delta="All systems normal" tone="blue" icon="facility" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card padding={0}>
          <CardHeader title="Portal Activity · Last 7 Days" actions={<Button variant="secondary" size="sm">This week</Button>} />
          <ActivityChart />
        </Card>
        <Card padding={0}>
          <CardHeader title="Role Distribution" />
          <RoleDistribution />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        <Card padding={0}>
          <CardHeader title="Attention Required" actions={<Button variant="ghost" size="sm">View all</Button>} />
          <AttentionList onNav={onNav} />
        </Card>
        <Card padding={0}>
          <CardHeader title="Recent Configuration Changes" actions={<Button variant="ghost" size="sm" onClick={() => onNav('audit')}>Open audit log</Button>} />
          <RecentChanges />
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <ScribeOpsCard onNav={onNav} />
        <ProviderOpsCard />
        <ClerkOpsCard />
      </div>
    </main>
  );
}

function CardHeader({ title, actions }) {
  return (
    <div style={{ padding: '18px 22px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1C192E' }}>{title}</h2>
      {actions}
    </div>
  );
}

function ActivityChart() {
  // 7 days · 3 series. Inline SVG line chart.
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const provider = [62, 78, 71, 86, 92, 41, 38];
  const scribe = [54, 70, 68, 80, 84, 36, 30];
  const clerk = [42, 55, 49, 61, 64, 22, 18];
  const W = 760, H = 220, P = 32;
  const max = 100;
  const x = (i) => P + (i * (W - P * 2)) / (days.length - 1);
  const y = (v) => H - P - ((v / max) * (H - P * 2));
  const path = (arr) => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
  const area = (arr) => `${path(arr)} L${x(arr.length - 1)},${H - P} L${x(0)},${H - P} Z`;
  return (
    <div style={{ padding: 22 }}>
      <div style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 12, color: '#6A7282' }}>
        <Legend dot="#845EC2" label="Provider activity" />
        <Legend dot="#00C9A7" label="Scribe activity" />
        <Legend dot="#E9C05F" label="Clerk activity" />
        <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: 11 }}>actions / 100 users</span>
      </div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        {[0, 25, 50, 75, 100].map(g => (
          <g key={g}>
            <line x1={P} x2={W - P} y1={y(g)} y2={y(g)} stroke="#EEEEEE" />
            <text x={4} y={y(g) + 4} fontSize="10" fill="#99A1AF" fontFamily="Inter">{g}</text>
          </g>
        ))}
        <path d={area(clerk)} fill="#FFF8E6" opacity="0.6" />
        <path d={path(clerk)} stroke="#E9C05F" strokeWidth="2" fill="none" />
        <path d={area(scribe)} fill="#E7F5EF" opacity="0.6" />
        <path d={path(scribe)} stroke="#00C9A7" strokeWidth="2" fill="none" />
        <path d={area(provider)} fill="#F5F2FD" opacity="0.6" />
        <path d={path(provider)} stroke="#845EC2" strokeWidth="2.5" fill="none" />
        {provider.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#fff" stroke="#845EC2" strokeWidth="2" />)}
        {days.map((d, i) => <text key={i} x={x(i)} y={H - 8} fontSize="11" fill="#6A7282" textAnchor="middle" fontFamily="Inter">{d}</text>)}
      </svg>
    </div>
  );
}

function Legend({ dot, label }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
    <span style={{ width: 8, height: 8, borderRadius: 9999, background: dot }} />{label}
  </span>;
}

function RoleDistribution() {
  const data = [
    { role: 'Provider', count: 38, color: '#0081CF' },
    { role: 'Scribe', count: 70, color: '#00C9A7' },
    { role: 'Clerk', count: 76, color: '#E9C05F' },
    { role: 'Super Admin', count: 3, color: '#845EC2' },
  ];
  const total = data.reduce((s, d) => s + d.count, 0);
  let acc = 0;
  return (
    <div style={{ padding: 22 }}>
      <div style={{ position: 'relative', width: 180, height: 180, margin: '0 auto 16px' }}>
        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="50" cy="50" r="38" fill="none" stroke="#F3F4F6" strokeWidth="14" />
          {data.map((d, i) => {
            const dash = (d.count / total) * (2 * Math.PI * 38);
            const offset = -acc;
            acc += dash;
            return <circle key={i} cx="50" cy="50" r="38" fill="none" stroke={d.color}
              strokeWidth="14" strokeDasharray={`${dash} ${2 * Math.PI * 38}`} strokeDashoffset={offset} />;
          })}
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{total}</div>
          <div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600 }}>USERS</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.map(d => (
          <div key={d.role} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: d.color }} />
            <span style={{ flex: 1, color: '#1C192E', fontWeight: 600 }}>{d.role}</span>
            <span style={{ color: '#6A7282', fontFamily: 'JetBrains Mono', fontSize: 12 }}>{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttentionList({ onNav }) {
  const items = [
    { tone: 'danger', icon: 'alert', title: '3 users without two-factor auth', desc: 'Priya Shah, Kenji Watanabe, Brianna Lopez', cta: 'Review', target: 'users' },
    { tone: 'warn', icon: 'history', title: '1 onboarding stuck > 7 days', desc: 'Brianna Lopez — invited Apr 18, no progress past "Verify email"', cta: 'Resend', target: 'onboarding' },
    { tone: 'warn', icon: 'fileText', title: '28 encounters unassigned > 4 hours', desc: 'Mostly at Casa of Hobart', cta: 'Open queue', target: 'analytics' },
    { tone: 'info', icon: 'shield', title: '2 sensitive permissions need quarterly review', desc: '"Sign on another provider\'s behalf", "Edit per-note rates"', cta: 'Review', target: 'roles' },
  ];
  const tones = {
    danger: { bg: '#FDECEC', fg: '#C9302C' },
    warn: { bg: '#FFF8E6', fg: '#B58420' },
    info: { bg: '#F5F2FD', fg: '#67568C' },
  };
  return (
    <div>
      {items.map((it, i) => {
        const t = tones[it.tone];
        return (
          <div key={i} style={{ padding: '14px 22px', display: 'flex', gap: 14, alignItems: 'center', borderTop: i ? '1px solid #EEEEEE' : 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9999, background: t.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name={it.icon} size={16} color={t.fg} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{it.title}</div>
              <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{it.desc}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNav(it.target)}>{it.cta}</Button>
          </div>
        );
      })}
    </div>
  );
}

function RecentChanges() {
  return (
    <div>
      {AUDIT_ENTRIES.slice(0, 5).map((a, i) => {
        const tones = {
          warn: '#B58420', success: '#29BB89', danger: '#C9302C', info: '#67568C', neutral: '#6A7282',
        };
        return (
          <div key={a.id} style={{ padding: '12px 22px', display: 'flex', gap: 14, alignItems: 'flex-start', borderTop: i ? '1px solid #EEEEEE' : 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: 9999, background: tones[a.tone], marginTop: 8, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: '#1C192E' }}>
                <span style={{ fontWeight: 700 }}>{a.who}</span> · {a.action}
              </div>
              <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{a.target}</div>
            </div>
            <span style={{ fontSize: 11, color: '#99A1AF', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono' }}>{a.when}</span>
          </div>
        );
      })}
    </div>
  );
}

function ScribeOpsCard({ onNav }) {
  return (
    <Card padding={0}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <RoleChip role="Scribe" />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Scribe Operations</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onNav('analytics')}>Details</Button>
      </div>
      <div style={{ padding: 22 }}>
        <KpiRow label="Avg time-to-start" value="14 min" trend="▼ 18%" tone="mint" />
        <KpiRow label="Avg time-to-complete" value="42 min" trend="▼ 6%" tone="mint" />
        <KpiRow label="Acceptance rate" value="94%" trend="▲ 2%" tone="mint" />
        <KpiRow label="Returns for revision" value="11" trend="▲ 3" tone="coral" />
        <KpiRow label="Notes paid this week" value="$8,420" trend="" tone="primary" last />
      </div>
    </Card>
  );
}

function ProviderOpsCard() {
  return (
    <Card padding={0}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <RoleChip role="Provider" />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Provider Operations</h3>
        </div>
      </div>
      <div style={{ padding: 22 }}>
        <KpiRow label="Notes for signing" value="46" trend="" tone="primary" />
        <KpiRow label="Avg time-to-sign" value="2.4 hr" trend="▼ 12%" tone="mint" />
        <KpiRow label="W-RVU this week" value="1,184" trend="▲ 8%" tone="mint" />
        <KpiRow label="Flagged vitals open" value="9" trend="▲ 2" tone="coral" />
        <KpiRow label="High-Risk RTH" value="14" trend="" tone="primary" last />
      </div>
    </Card>
  );
}

function ClerkOpsCard() {
  return (
    <Card padding={0}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <RoleChip role="Clerk" />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Clerk Operations</h3>
        </div>
      </div>
      <div style={{ padding: 22 }}>
        <KpiRow label="New admissions" value="12" trend="+3 today" tone="primary" />
        <KpiRow label="Documents to identify" value="7" trend="" tone="coral" />
        <KpiRow label="Discharge requests pending" value="4" trend="" tone="primary" />
        <KpiRow label="Missed reg. visits" value="2" trend="" tone="coral" />
        <KpiRow label="Out-of-range vitals" value="6" trend="" tone="coral" last />
      </div>
    </Card>
  );
}

function KpiRow({ label, value, trend, tone, last }) {
  const tones = { mint: '#29BB89', coral: '#FF6E6C', primary: '#67568C' };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: last ? 0 : '1px dashed #EEEEEE' }}>
      <span style={{ fontSize: 13, color: '#6A7282' }}>{label}</span>
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 16, fontWeight: 700 }}>{value}</span>
        {trend && <span style={{ fontSize: 11, fontWeight: 600, color: tones[tone] }}>{trend}</span>}
      </span>
    </div>
  );
}

Object.assign(window, { AdminDashboard });
