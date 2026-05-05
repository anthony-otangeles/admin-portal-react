import { useState } from 'react';
import { Button, Card, PageHeader, Select, Avatar, Chip, Toggle, Icon, RoleChip } from '../components/ui/primitives';
import { ROLES, ONBOARDING_STEPS } from '../data/mockData';

const IN_PROGRESS = [
  { name: 'Brianna Lopez', role: 'Clerk', step: 1, days: 9, stuck: true },
  { name: 'David Park', role: 'Scribe', step: 4, days: 2 },
  { name: 'Renee Ortiz', role: 'Provider', step: 5, days: 1 },
  { name: 'Tariq Hassan', role: 'Scribe', step: 3, days: 3 },
  { name: 'Mei Chen', role: 'Provider', step: 4, days: 1 },
];

function initialsFor(name: string) {
  return name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();
}

export function OnboardingPage() {
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
        {/* Flow config */}
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
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, marginBottom: 8, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, position: 'relative' }}>
                <div style={{ cursor: 'grab', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[0,1,2,3].map(j => <span key={j} style={{ width: 3, height: 3, borderRadius: 9999, background: '#D1D5DC', display: 'block' }} />)}
                </div>
                <div style={{ width: 36, height: 36, borderRadius: 9999, background: s.enabled ? '#F5F2FD' : '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${s.enabled ? '#845EC2' : '#D1D5DC'}`, color: s.enabled ? '#845EC2' : '#99A1AF', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {s.label}
                    {s.required && <Chip tone="primary" style={{ fontSize: 10 }}>REQUIRED</Chip>}
                  </div>
                </div>
                <Toggle checked={s.enabled} onChange={() => {
                  if (s.required) return;
                  setSteps(steps.map(x => x.id === s.id ? { ...x, enabled: !x.enabled } : x));
                }} size="sm" disabled={s.required} />
              </div>
            ))}
            <button style={{ width: '100%', padding: 14, borderRadius: 4, border: '2px dashed #D1D5DC', background: 'transparent', color: '#6A7282', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'Inter' }}>
              <Icon name="plus" size={14} color="#6A7282" /> Add custom step
            </button>
          </div>
        </Card>

        {/* In-progress */}
        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>In-progress invitations</h2>
            <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>5 invited · 3 active · 1 stuck &gt; 7 days</div>
          </div>
          <div style={{ padding: 16 }}>
            {IN_PROGRESS.map((p, i) => (
              <div key={i} style={{ padding: 14, marginBottom: 10, border: '1px solid #EEEEEE', borderRadius: 6, background: p.stuck ? '#FDECEC' : '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <Avatar initials={initialsFor(p.name)} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#6A7282', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}><RoleChip role={p.role} /> · invited {p.days}d ago</div>
                  </div>
                  {p.stuck && <Chip tone="danger">STUCK</Chip>}
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {steps.map((_, si) => (
                    <div key={si} style={{ flex: 1, height: 6, borderRadius: 9999, background: si < p.step ? '#29BB89' : si === p.step ? '#FFD12A' : '#F3F4F6' }} />
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <span style={{ fontSize: 12, color: '#6A7282' }}>Step {p.step + 1}/{steps.length} · {steps[Math.min(p.step, steps.length - 1)]?.label}</span>
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
