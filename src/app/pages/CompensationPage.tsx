import { useState } from 'react';
import { Button, Card, PageHeader, StatTile, Select, Toggle, Modal, Field, Input, Avatar } from '../components/ui/primitives';
import { COMPENSATION_RULES } from '../data/mockData';

const TOP_EARNERS = [
  { name: 'Marcus Reyes', initials: 'MR', notes: 84, gross: 1248.00 },
  { name: 'Yuki Schmidt', initials: 'YS', notes: 71, gross: 1102.50 },
  { name: 'Priya Shah', initials: 'PS', notes: 64, gross: 968.00 },
  { name: 'Ines Park', initials: 'IP', notes: 58, gross: 894.50 },
  { name: 'Kenji Watanabe', initials: 'KW', notes: 42, gross: 612.00 },
];

export function CompensationPage() {
  const [rules, setRules] = useState(COMPENSATION_RULES);
  const [editing, setEditing] = useState<typeof COMPENSATION_RULES[0] | null>(null);
  const [creating, setCreating] = useState(false);

  const activeRules = rules.filter(r => r.active);
  const avgRate = activeRules.length > 0 ? (activeRules.reduce((s, r) => s + r.rate, 0) / activeRules.length).toFixed(2) : '0.00';

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Compensation"
        subtitle="Per-note rates and bonuses paid out to scribes. Calculated when a provider signs a note."
        actions={<>
          <Button variant="secondary" icon="download">Export rates</Button>
          <Button variant="primary" icon="plus" onClick={() => setCreating(true)}>New rule</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Active rules" value={activeRules.length} tone="primary" icon="money" />
        <StatTile label="Avg rate / note" value={`$${avgRate}`} tone="mint" icon="activity" delta="▲ $0.20 vs last month" />
        <StatTile label="Notes paid this week" value="612" tone="blue" icon="fileText" delta="$8,420 total" />
        <StatTile label="Bonus eligible" value="34" tone="coral" icon="alert" delta="2 awaiting review" deltaTone="coral" />
      </div>

      <Card padding={0} style={{ marginBottom: 24 }}>
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
              <th style={{ padding: 12 }}>Active</th>
              <th style={{ padding: 12, width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {rules.map(r => (
              <tr key={r.id} style={{ borderTop: '1px solid #EEEEEE' }}>
                <td style={{ padding: '14px 20px', fontWeight: 600, fontSize: 14 }}>{r.name}</td>
                <td style={{ padding: 14, fontSize: 13 }}>{r.noteType}</td>
                <td style={{ padding: 14, fontSize: 13 }}>{r.specialty}</td>
                <td style={{ padding: 14, fontSize: 14, fontWeight: 700, fontFamily: 'JetBrains Mono', textAlign: 'right' }}>${r.rate.toFixed(2)}</td>
                <td style={{ padding: 14, fontSize: 13, fontFamily: 'JetBrains Mono', textAlign: 'right' }}>
                  {r.bonus ? <span style={{ color: '#29BB89', fontWeight: 700 }}>+${r.bonus.toFixed(2)}</span> : <span style={{ color: '#99A1AF' }}>—</span>}
                  {r.bonusReason && <div style={{ fontSize: 10, color: '#6A7282', fontFamily: 'Inter' }}>{r.bonusReason}</div>}
                </td>
                <td style={{ padding: 14 }}>
                  <Toggle checked={r.active} onChange={() => setRules(rules.map(x => x.id === r.id ? { ...x, active: !x.active } : x))} size="sm" />
                </td>
                <td style={{ padding: 14, textAlign: 'right' }}>
                  <Button variant="ghost" size="sm" onClick={() => setEditing(r)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card padding={0}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Top earners this week</h2>
        </div>
        <div style={{ padding: 22 }}>
          {TOP_EARNERS.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderTop: i ? '1px dashed #EEEEEE' : '0' }}>
              <Avatar initials={p.initials} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700 }}>${p.gross.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 6, background: '#F3F4F6', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ width: `${(p.gross / 1248) * 100}%`, height: '100%', background: '#00C9A7' }} />
                  </div>
                  <span style={{ fontSize: 11, color: '#6A7282', fontFamily: 'JetBrains Mono', whiteSpace: 'nowrap' }}>{p.notes} notes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {(editing || creating) && (
        <Modal open title={creating ? 'New rate rule' : 'Edit rate rule'} onClose={() => { setEditing(null); setCreating(false); }} width={520}
          footer={<><Button variant="secondary" onClick={() => { setEditing(null); setCreating(false); }}>Cancel</Button><Button variant="primary" icon="check" onClick={() => { setEditing(null); setCreating(false); }}>Save Rule</Button></>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Field label="Rule name" required><Input value={editing?.name || ''} placeholder="e.g. Standard note · Cardiology" /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Note type"><Select value={editing?.noteType || 'Standard'} onChange={() => {}} options={[{ value: 'Standard', label: 'Standard' }, { value: 'Admission H&P', label: 'Admission H&P' }, { value: 'Discharge', label: 'Discharge' }, { value: 'Specialty', label: 'Specialty' }]} /></Field>
              <Field label="Specialty"><Select value={editing?.specialty || 'All'} onChange={() => {}} options={[{ value: 'All', label: 'All specialties' }, { value: 'Internal Medicine', label: 'Internal Medicine' }, { value: 'Wound Care', label: 'Wound Care' }, { value: 'Cardiology', label: 'Cardiology' }]} /></Field>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label="Base rate ($)" required><Input value={editing?.rate?.toFixed(2) || ''} placeholder="12.50" /></Field>
              <Field label="Bonus ($)"><Input value={editing?.bonus?.toFixed(2) || ''} placeholder="0.00" /></Field>
            </div>
            <Field label="Bonus condition" hint="When should the bonus apply?"><Input value={editing?.bonusReason || ''} placeholder="e.g. Multi-system, ≥10 problems" /></Field>
          </div>
        </Modal>
      )}
    </main>
  );
}