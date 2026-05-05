import { Button, Card, PageHeader, StatTile, RoleChip } from '../components/ui/primitives';
import { FACILITIES } from '../data/mockData';

// Simple SVG bar chart helper
function BarChart({ data, color, height = 120 }: { data: { label: string; value: number }[]; color: string; height?: number }) {
  const max = Math.max(...data.map(d => d.value));
  const W = 640, H = height + 40, P = 8;
  const bw = (W - P * 2) / data.length - 6;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      {data.map((d, i) => {
        const bh = max > 0 ? (d.value / max) * height : 0;
        const x = P + i * ((W - P * 2) / data.length) + 3;
        const y = height - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={bh} fill={color} rx="4" opacity="0.85" />
            <text x={x + bw / 2} y={H - 8} fontSize="11" fill="#6A7282" textAnchor="middle" fontFamily="Inter">{d.label}</text>
            <text x={x + bw / 2} y={y - 4} fontSize="11" fill="#1C192E" textAnchor="middle" fontFamily="Inter" fontWeight="700">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
}

// Module-level constants — evaluated once on import, no re-render issues
const throughputData = FACILITIES.map((f, i) => ({
  label: f.short,
  value: [62, 48, 71, 54][i] ?? 50,
}));

const weekData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => ({
  label: d,
  value: [84, 92, 78, 96, 110, 48, 38][i],
}));

function KpiRow({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #EEEEEE' }}>
      <span style={{ fontSize: 13, color: '#6A7282' }}>{label}</span>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 16, fontWeight: 700 }}>{value}</div>
        <div style={{ fontSize: 11, color, fontWeight: 600 }}>{sub}</div>
      </div>
    </div>
  );
}

export function AnalyticsPage() {
  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader title="Analytics" subtitle="Cross-portal metrics. Drill into any tile for detailed breakdowns."
        actions={<><Button variant="secondary" icon="download">Export</Button><Button variant="primary" icon="filter">Filters</Button></>}
      />
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
            <BarChart data={throughputData} color="#845EC2" height={120} />
          </div>
        </Card>
        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Notes signed this week</h2>
          </div>
          <div style={{ padding: 22 }}>
            <BarChart data={weekData} color="#00C9A7" height={120} />
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <Card padding={0}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #EEEEEE', display: 'flex', alignItems: 'center', gap: 10 }}>
            <RoleChip role="Provider" /><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Provider Metrics</h3>
          </div>
          <div style={{ padding: 22 }}>
            <KpiRow label="W-RVU this week" value="1,184" sub="▲ 8% vs last wk" color="#29BB89" />
            <KpiRow label="Avg time-to-sign" value="2.4 hr" sub="▼ 12% vs last wk" color="#29BB89" />
            <KpiRow label="Open encounters" value="46" sub="Awaiting signature" color="#B58420" />
            <KpiRow label="Billing rejections" value="3.2%" sub="▼ 0.4% vs last wk" color="#29BB89" />
          </div>
        </Card>
        <Card padding={0}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #EEEEEE', display: 'flex', alignItems: 'center', gap: 10 }}>
            <RoleChip role="Scribe" /><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Scribe Metrics</h3>
          </div>
          <div style={{ padding: 22 }}>
            <KpiRow label="Notes completed" value="612" sub="▲ 14% vs last wk" color="#29BB89" />
            <KpiRow label="Avg completion time" value="42 min" sub="▼ 6% vs last wk" color="#29BB89" />
            <KpiRow label="Returns for revision" value="11" sub="▲ 3 this week" color="#FF6E6C" />
            <KpiRow label="Acceptance rate" value="94%" sub="▲ 2% vs last wk" color="#29BB89" />
          </div>
        </Card>
        <Card padding={0}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #EEEEEE', display: 'flex', alignItems: 'center', gap: 10 }}>
            <RoleChip role="Clerk" /><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Clerk Metrics</h3>
          </div>
          <div style={{ padding: 22 }}>
            <KpiRow label="New admissions" value="12" sub="+3 today" color="#29BB89" />
            <KpiRow label="Documents identified" value="31" sub="7 pending" color="#B58420" />
            <KpiRow label="Discharge requests" value="4" sub="Pending approval" color="#B58420" />
            <KpiRow label="Missed reg. visits" value="2" sub="Action required" color="#FF6E6C" />
          </div>
        </Card>
      </div>
    </main>
  );
}
