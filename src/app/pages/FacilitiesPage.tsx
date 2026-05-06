import { useState } from 'react';
import { Button, Card, PageHeader, Avatar, Modal, Field, Input, Icon } from '../components/ui/primitives';
import { USERS, FACILITIES, type Facility } from '../data/mockData';

function FacilityModal({ title, facility, onClose }: { title: string; facility?: Facility; onClose: () => void }) {
  const [name, setName] = useState(facility?.name || '');
  const [region, setRegion] = useState(facility?.region || '');
  const [address, setAddress] = useState(facility?.address || '');
  const [beds, setBeds] = useState(String(facility?.beds || ''));
  const assigned = facility ? USERS.filter(u => u.facilities.includes(facility.id)) : [];

  return (
    <Modal open title={title} onClose={onClose}
      footer={<>
        {facility && <Button variant="danger" icon="trash">Delete facility</Button>}
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="check" onClick={onClose}>{facility ? 'Apply Changes' : 'Add Facility'}</Button>
        </div>
      </>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Field label="Facility name"><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Niles Care Center" /></Field>
        <Field label="City, State"><Input value={region} onChange={e => setRegion(e.target.value)} placeholder="e.g. Niles, IL" /></Field>
        <Field label="Address"><Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Street, City, State ZIP" /></Field>
        <Field label="Bed count"><Input value={beds} onChange={e => setBeds(e.target.value)} placeholder="0" /></Field>
        {facility && (
          <Field label="Assigned users" hint="Users currently assigned to this facility.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, border: '1px solid #E5E7EB', borderRadius: 8, padding: 12, maxHeight: 220, overflowY: 'auto' }}>
              {assigned.length === 0 ? (
                <div style={{ fontSize: 13, color: '#99A1AF' }}>No users assigned yet.</div>
              ) : assigned.map(u => (
                <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
                  <Avatar initials={u.initials} size={28} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
                    <div style={{ fontSize: 11, color: '#6A7282' }}>{u.roles[0]}</div>
                  </div>
                </div>
              ))}
            </div>
          </Field>
        )}
      </div>
    </Modal>
  );
}

export function FacilitiesPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [manageId, setManageId] = useState<string | null>(null);
  const manageFac = manageId ? FACILITIES.find(f => f.id === manageId) : undefined;
  const sortedFacilities = [...FACILITIES].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader title="Facilities" subtitle="Add or edit the facilities your team can be assigned to."
        actions={<Button variant="primary" icon="plus" onClick={() => setShowAdd(true)}>Add New Facility</Button>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {sortedFacilities.map(f => {
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
                    <Icon name="facility" size={12} color="#99A1AF" />{f.address}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 24, marginTop: 16, paddingTop: 16, borderTop: '1px dashed #EEEEEE', alignItems: 'center' }}>
                  <div><div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600 }}>Users</div><div style={{ fontSize: 18, fontWeight: 700 }}>{userCount}</div></div>
                  <div><div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600 }}>Beds</div><div style={{ fontSize: 18, fontWeight: 700 }}>{f.beds}</div></div>
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
