import { useState } from 'react';
import { Button, Card, PageHeader, StatTile, Input, Select, Icon } from '../components/ui/primitives';
import { AUDIT_ENTRIES } from '../data/mockData';

export function AuditPage() {
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('all');
  const [rangeFilter, setRangeFilter] = useState('7d');

  const filtered = AUDIT_ENTRIES.filter(a => {
    if (!search) return true;
    return [a.who, a.action, a.target].join(' ').toLowerCase().includes(search.toLowerCase());
  });

  const tones: Record<string, { bg: string; fg: string; icon: string }> = {
    warn:    { bg: '#FFF8E6', fg: '#B58420', icon: 'alert' },
    success: { bg: '#E7F5EF', fg: '#29BB89', icon: 'check' },
    danger:  { bg: '#FDECEC', fg: '#C9302C', icon: 'lock' },
    info:    { bg: '#F5F2FD', fg: '#67568C', icon: 'edit' },
    neutral: { bg: '#F3F4F6', fg: '#6A7282', icon: 'eye' },
  };

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Audit Log"
        subtitle="Every administrative action is logged here. Exports include user, IP, and resource ID."
        actions={<><Button variant="secondary" icon="download">Export Log</Button><Button variant="secondary" icon="filter">Filters</Button></>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatTile label="Events today" value="47" tone="primary" icon="activity" />
        <StatTile label="Sensitive actions" value="3" tone="coral" icon="alert" delta="2 by Sarah Avila" deltaTone="coral" />
        <StatTile label="Failed logins (24h)" value="2" tone="gold" icon="lock" />
        <StatTile label="Logged users" value="12" tone="blue" icon="users" delta="of 187 total" />
      </div>

      <Card padding={0}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Input icon="search" placeholder="Search by user, action, or target" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, minWidth: 260 }} />
          <Select value={eventFilter} onChange={setEventFilter} options={[
            { value: 'all', label: 'All events' },
            { value: 'sensitive', label: 'Sensitive only' },
            { value: 'auth', label: 'Authentication' },
            { value: 'admin', label: 'Admin changes' },
          ]} width={180} />
          <Select value={rangeFilter} onChange={setRangeFilter} options={[
            { value: '24h', label: 'Last 24h' },
            { value: '7d', label: 'Last 7 days' },
            { value: '30d', label: 'Last 30 days' },
            { value: 'all', label: 'All time' },
          ]} width={150} />
        </div>
        <div>
          {filtered.map((a, i) => {
            const t = tones[a.tone];
            return (
              <div key={a.id} style={{ padding: '14px 20px', display: 'flex', gap: 14, alignItems: 'center', borderTop: i ? '1px solid #EEEEEE' : '0' }}>
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
          {filtered.length === 0 && (
            <div style={{ padding: 48, textAlign: 'center', color: '#99A1AF', fontSize: 14 }}>
              No events match your search.
            </div>
          )}
        </div>
      </Card>
    </main>
  );
}