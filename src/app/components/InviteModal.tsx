import { useState } from 'react';
import { Button, Input, Checkbox, Field, Toggle, Modal } from './ui/primitives';
import { FACILITIES, ASSIGNABLE_ROLES, ROLE_TONES, type User, type RoleKey } from '../data/mockData';

interface InviteModalProps {
  open: boolean;
  onClose: () => void;
  onInvite?: (u: User) => void;
}

export function InviteModal({ open, onClose, onInvite }: InviteModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<RoleKey>('Provider');
  const [facs, setFacs] = useState(['f1']);
  const [sendInvite, setSendInvite] = useState(true);
  const [requireMfa, setRequireMfa] = useState(true);

  const submit = () => {
    const initials = name.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase() || 'NU';
    onInvite?.({
      id: 'u' + Date.now(),
      name: name || 'New User',
      email,
      initials,
      roles: [role],
      dept: 'Pending',
      spec: '—',
      phone: '—',
      status: 'invited',
      facilities: facs,
      lastActive: '—',
      mfa: requireMfa,
      joined: 'Pending',
    });
    setName(''); setEmail(''); setRole('Provider'); setFacs(['f1']);
    onClose();
  };

  const toggleFac = (f: string) =>
    setFacs(facs.includes(f) ? facs.filter(x => x !== f) : [...facs, f]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Invite a New User"
      width={600}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="mail" onClick={submit}>Send Invitation</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Field label="Full name" required>
          <Input placeholder="e.g. Dr. Avery Stone" value={name} onChange={e => setName(e.target.value)} />
        </Field>
        <Field label="Email address" required hint="The invitation will be sent to this address.">
          <Input icon="mail" placeholder="name@otangeles.com" value={email} onChange={e => setEmail(e.target.value)} />
        </Field>
        <Field label="Role" required hint="Each user has exactly one role.">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {ASSIGNABLE_ROLES.map(r => {
              const on = role === r;
              const t = ROLE_TONES[r];
              return (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    padding: '14px 12px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                    border: `1.5px solid ${on ? t.solid : '#E5E7EB'}`,
                    background: on ? t.bg : '#fff',
                    color: on ? t.fg : '#6A7282',
                    cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  }}
                >
                  <span style={{
                    width: 16, height: 16, borderRadius: 9999,
                    border: `2px solid ${on ? t.solid : '#D1D5DC'}`,
                    background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Send invitation email now</div>
                <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>Otherwise the invite is queued as a draft.</div>
              </div>
              <Toggle checked={sendInvite} onChange={setSendInvite} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Require two-factor auth on first login</div>
                <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>Highly recommended for clinical roles.</div>
              </div>
              <Toggle checked={requireMfa} onChange={setRequireMfa} />
            </div>
          </div>
        </Field>
      </div>
    </Modal>
  );
}
