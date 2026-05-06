import { useState } from 'react';
import type { ReactNode } from 'react';
import { Button, Card, PageHeader, Toggle, Icon } from '../components/ui/primitives';
import { FACILITIES } from '../data/mockData';

// ===== SHARED PRIMITIVES =====
function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#1C192E' }}>{title}</div>
      <div style={{ fontSize: 13, color: '#6A7282', marginTop: 3 }}>{desc}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 13, fontWeight: 500, color: '#374151', marginBottom: 6 }}>{children}</div>;
}

function TextInput({ value, onChange, placeholder, type = 'text', readOnly }: {
  value: string; onChange?: (v: string) => void; placeholder?: string; type?: string; readOnly?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={e => onChange?.(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: '100%', boxSizing: 'border-box',
        padding: '10px 12px', borderRadius: 6, fontSize: 14, color: readOnly ? '#6A7282' : '#1C192E',
        border: `1px solid ${focus ? '#845EC2' : '#D1D5DC'}`,
        background: readOnly ? '#F9FAFB' : '#fff',
        outline: 'none', fontFamily: 'Inter', transition: 'border 120ms',
      }}
    />
  );
}

function SelectInput({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', boxSizing: 'border-box', padding: '10px 36px 10px 12px',
          borderRadius: 6, fontSize: 14, color: '#1C192E', border: '1px solid #D1D5DC',
          background: '#fff', outline: 'none', fontFamily: 'Inter', appearance: 'none', cursor: 'pointer',
        }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <Icon name="chevronDown" size={14} color="#6A7282" />
      </div>
    </div>
  );
}

// ===== TAB: PROFILE =====
function ProfileTab() {
  const [name, setName] = useState('Sarah Avila');
  const [email, setEmail] = useState('sarah.avila@otangeles.com');
  const [phone, setPhone] = useState('+1 (415) 555-0101');
  const [dept, setDept] = useState('IT / Admin');
  const [spec, setSpec] = useState('—');

  return (
    <div>
      <SectionHeader
        title="Profile Information"
        desc="View and manage your personal account details."
      />
      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 28px' }}>
          <div>
            <FieldLabel>Full Name</FieldLabel>
            <TextInput value={name} onChange={setName} />
          </div>
          <div>
            <FieldLabel>Email Address</FieldLabel>
            <TextInput value={email} onChange={setEmail} type="email" />
          </div>
          <div>
            <FieldLabel>Phone Number</FieldLabel>
            <TextInput value={phone} onChange={setPhone} />
          </div>
          <div>
            <FieldLabel>System Role</FieldLabel>
            <TextInput value="Super Admin" readOnly />
          </div>
          <div>
            <FieldLabel>Department</FieldLabel>
            <TextInput value={dept} onChange={setDept} />
          </div>
          <div>
            <FieldLabel>Specialization</FieldLabel>
            <TextInput value={spec} onChange={setSpec} />
          </div>
        </div>

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid #EEEEEE' }}>
          <FieldLabel>Account Status</FieldLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div style={{ width: 20, height: 20, borderRadius: 9999, background: '#E7F5EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="check" size={12} color="#29BB89" />
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#00C9A7' }}>Active &amp; Verified</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ===== TAB: SECURITY =====
function SecurityTab() {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [mfa, setMfa] = useState(true);

  const sessions = [
    { device: 'MacBook Pro — Chrome', loc: 'San Francisco, CA', ip: '192.168.1.1', when: 'Active Now', current: true },
    { device: 'MacBook Pro — Chrome', loc: 'San Francisco, CA', ip: '192.168.1.1', when: 'Last active: 2 hours ago' },
  ];

  return (
    <div>
      <SectionHeader
        title="Security Settings"
        desc="Manage your password, authentication, and active sessions."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        {/* Password */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <Icon name="key" size={18} color="#6A7282" />
            <span style={{ fontSize: 15, fontWeight: 700 }}>Password</span>
          </div>
          <div style={{ fontSize: 13, color: '#6A7282', marginBottom: 20 }}>Update your password to keep your account secure.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <FieldLabel>Current Password</FieldLabel>
              <TextInput type="password" value={currentPwd} onChange={setCurrentPwd} />
            </div>
            <div>
              <FieldLabel>New Password</FieldLabel>
              <TextInput type="password" value={newPwd} onChange={setNewPwd} />
            </div>
            <div>
              <FieldLabel>Confirm New Password</FieldLabel>
              <TextInput type="password" value={confirmPwd} onChange={setConfirmPwd} />
            </div>
            <button style={{
              padding: '10px 20px', borderRadius: 6, border: 0, background: '#00C9A7', color: '#fff',
              fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter', alignSelf: 'flex-start',
            }}>
              Update Password
            </button>
          </div>
        </Card>

        {/* 2FA + Sessions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Icon name="lock" size={16} color="#6A7282" />
                  <span style={{ fontSize: 15, fontWeight: 700 }}>Two-Factor Authentication (2FA)</span>
                </div>
                <div style={{ fontSize: 13, color: '#6A7282' }}>Add an extra layer of security to your account. We'll ask for a code in addition to your password.</div>
              </div>
              <Toggle checked={mfa} onChange={setMfa} />
            </div>
          </Card>

          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Icon name="dashboard" size={16} color="#6A7282" />
              <span style={{ fontSize: 15, fontWeight: 700 }}>Active Sessions</span>
            </div>
            <div style={{ fontSize: 13, color: '#6A7282', marginBottom: 16 }}>Devices that are currently logged into your account.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sessions.map((s, i) => (
                <div key={i} style={{
                  padding: '12px 14px', borderRadius: 8,
                  border: `1px solid ${s.current ? '#00C9A7' : '#E5E7EB'}`,
                  background: s.current ? '#F0FDF9' : '#fff',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <Icon name="dashboard" size={18} color={s.current ? '#00C9A7' : '#99A1AF'} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1C192E' }}>{s.device}</div>
                    <div style={{ fontSize: 12, color: '#6A7282' }}>{s.loc} &nbsp;·&nbsp; IP: {s.ip}</div>
                    <div style={{ fontSize: 12, color: s.current ? '#00C9A7' : '#99A1AF', fontWeight: 600, marginTop: 2 }}>{s.when}</div>
                  </div>
                  {!s.current && (
                    <button style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#C9302C', background: 'transparent', border: 0, cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'Inter' }}>
                      <Icon name="logout" size={14} color="#C9302C" /> Logout
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ===== TAB: PREFERENCES =====
function PreferencesTab() {
  const [defaultFacility, setDefaultFacility] = useState('f1');
  const [timeRange, setTimeRange] = useState('week');
  const [timeFormat, setTimeFormat] = useState('24h');
  const [zoom, setZoom] = useState('100');

  const zoomOptions = [
    { value: '100', label: '100%', desc: 'Original platform density.' },
    { value: '90',  label: '90%',  desc: 'Shows more sections at once with smaller controls.' },
    { value: '85',  label: '85%',  desc: 'Recommended default for smaller scribe screens.' },
    { value: '80',  label: '80%',  desc: 'Shows more sections at once with smaller controls.' },
  ];

  return (
    <div>
      <SectionHeader
        title="Application Preferences"
        desc="Customize your portal experience and defaults."
      />

      {/* 2-column top row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Workspace Defaults */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Icon name="facility" size={16} color="#6A7282" />
            <span style={{ fontSize: 15, fontWeight: 700 }}>Workspace Defaults</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <FieldLabel>Default Facility</FieldLabel>
              <SelectInput
                value={defaultFacility}
                onChange={setDefaultFacility}
                options={[{ value: '', label: 'Select location' }, ...FACILITIES.map(f => ({ value: f.id, label: f.name }))]}
              />
              <div style={{ fontSize: 12, color: '#6A7282', marginTop: 4 }}>This facility will be selected by default for this workspace.</div>
            </div>
            <div>
              <FieldLabel>Default Time Range for Metrics</FieldLabel>
              <SelectInput
                value={timeRange}
                onChange={setTimeRange}
                options={[
                  { value: 'week', label: '⏱ This Week' },
                  { value: '30d',  label: 'Last 30 Days' },
                  { value: '90d',  label: 'Last 90 Days' },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Time Settings */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Icon name="clock" size={16} color="#6A7282" />
            <span style={{ fontSize: 15, fontWeight: 700 }}>Time Settings</span>
          </div>
          <div>
            <FieldLabel>Time Format</FieldLabel>
            <SelectInput
              value={timeFormat}
              onChange={setTimeFormat}
              options={[
                { value: '24h', label: '24-hour (00:00)' },
                { value: '12h', label: '12-hour (12:00 AM)' },
              ]}
            />
            <div style={{ fontSize: 12, color: '#6A7282', marginTop: 4 }}>Medical documentation typically uses 24-hour time.</div>
          </div>
        </Card>
      </div>

      {/* Display Zoom */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Icon name="sliders" size={16} color="#6A7282" />
          <span style={{ fontSize: 15, fontWeight: 700 }}>Display Zoom</span>
        </div>
        <div style={{ fontSize: 13, color: '#6A7282', marginBottom: 16 }}>Adjust interface density for your workstation. Changes apply immediately on this browser.</div>

        {/* Current selection callout */}
        <div style={{ background: '#F3F4F6', borderRadius: 8, padding: '14px 16px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#6A7282', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Current Selection</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#845EC2', fontFamily: 'JetBrains Mono' }}>{zoom}%</div>
          <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{zoomOptions.find(z => z.value === zoom)?.desc}</div>
        </div>

        {/* Option cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {zoomOptions.map(opt => {
            const selected = zoom === opt.value;
            return (
              <button key={opt.value} onClick={() => setZoom(opt.value)} style={{
                padding: '16px', borderRadius: 8, cursor: 'pointer', textAlign: 'left',
                border: `1.5px solid ${selected ? '#845EC2' : '#E5E7EB'}`,
                background: selected ? '#F5F2FD' : '#fff',
                fontFamily: 'Inter',
              }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: selected ? '#845EC2' : '#1C192E', fontFamily: 'JetBrains Mono', marginBottom: 6 }}>{opt.label}</div>
                <div style={{ fontSize: 11, color: '#6A7282', lineHeight: '16px' }}>{opt.desc}</div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ===== TAB: PLATFORM (Super Admin) =====
function PlatformTab() {
  const [orgName, setOrgName] = useState('Otangeles Health');
  const [orgDomain, setOrgDomain] = useState('otangeles.com');
  const [mfaEnforced, setMfaEnforced] = useState(true);
  const [ssoEnabled, setSsoEnabled] = useState(false);
  const [auditRetention, setAuditRetention] = useState('365');
  const [sessionTimeout, setSessionTimeout] = useState('480');
  const [dismissedScheduleRetentionDays, setDismissedScheduleRetentionDays] = useState('7');
  const [ipAllowlist, setIpAllowlist] = useState(false);
  const [apiAccess, setApiAccess] = useState(true);
  const [webhooks, setWebhooks] = useState(false);
  const dismissedScheduleRetentionLabel = dismissedScheduleRetentionDays || '7';

  const SettingRow = ({ label, desc, checked, onChange }: { label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #EEEEEE', gap: 16 }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        {desc && <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{desc}</div>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );

  return (
    <div>
      <SectionHeader
        title="Platform Administration"
        desc="Organization-level configuration for the Otangeles Admin Portal. Changes affect all users across all portals."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Org Identity */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Icon name="facility" size={16} color="#6A7282" />
            <span style={{ fontSize: 15, fontWeight: 700 }}>Organization Identity</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <FieldLabel>Organization Name</FieldLabel>
              <TextInput value={orgName} onChange={setOrgName} />
            </div>
            <div>
              <FieldLabel>Email Domain</FieldLabel>
              <TextInput value={orgDomain} onChange={setOrgDomain} />
              <div style={{ fontSize: 12, color: '#6A7282', marginTop: 4 }}>Users must have this domain to sign in.</div>
            </div>
          </div>
        </Card>

        {/* Session & Access */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Icon name="clock" size={16} color="#6A7282" />
            <span style={{ fontSize: 15, fontWeight: 700 }}>Session & Access</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <FieldLabel>Session Timeout (minutes)</FieldLabel>
              <SelectInput
                value={sessionTimeout}
                onChange={setSessionTimeout}
                options={[
                  { value: '60', label: '60 min — Short' },
                  { value: '240', label: '240 min — Standard' },
                  { value: '480', label: '480 min — Extended (8 hr)' },
                ]}
              />
              <div style={{ fontSize: 12, color: '#6A7282', marginTop: 4 }}>Applies to all portals. Clinical roles may require shorter timeouts.</div>
            </div>
            <div>
              <FieldLabel>Audit Log Retention (days)</FieldLabel>
              <SelectInput
                value={auditRetention}
                onChange={setAuditRetention}
                options={[
                  { value: '90',  label: '90 days' },
                  { value: '180', label: '180 days' },
                  { value: '365', label: '365 days (recommended)' },
                  { value: '730', label: '730 days' },
                ]}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Schedule retention */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Icon name="calendar" size={16} color="#6A7282" />
          <span style={{ fontSize: 15, fontWeight: 700 }}>Schedule Retention</span>
        </div>
        <div style={{ fontSize: 13, color: '#6A7282', marginBottom: 16 }}>Controls how long dismissed patient schedules remain available before automatic deletion.</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 320px) 1fr', gap: 20, alignItems: 'start' }}>
          <div>
            <FieldLabel>Dismissed Patient Schedule Retention (days)</FieldLabel>
            <TextInput
              type="number"
              value={dismissedScheduleRetentionDays}
              onChange={value => setDismissedScheduleRetentionDays(value.replace(/\D/g, ''))}
            />
            <div style={{ fontSize: 12, color: '#6A7282', marginTop: 4 }}>Default is 7 days.</div>
          </div>
          <div style={{ padding: '14px 16px', borderRadius: 8, background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6A7282', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>Current Policy</div>
            <div style={{ fontSize: 14, color: '#1C192E', lineHeight: '20px' }}>
              Patient schedules in the Dismissed tab will be deleted after <strong>{dismissedScheduleRetentionLabel} {dismissedScheduleRetentionLabel === '1' ? 'day' : 'days'}</strong>.
            </div>
          </div>
        </div>
      </Card>

      {/* Security policies */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Icon name="shield" size={16} color="#6A7282" />
          <span style={{ fontSize: 15, fontWeight: 700 }}>Security Policies</span>
        </div>
        <div style={{ fontSize: 13, color: '#6A7282', marginBottom: 4 }}>Platform-wide security enforcement applied to all roles.</div>
        <SettingRow label="Enforce Two-Factor Authentication" desc="All users must set up 2FA before accessing any portal." checked={mfaEnforced} onChange={setMfaEnforced} />
        <SettingRow label="SSO / SAML Integration" desc="Allow sign-in via your organization's identity provider." checked={ssoEnabled} onChange={setSsoEnabled} />
        <SettingRow label="IP Allowlist" desc="Restrict access to specific IP ranges. Useful for on-premise deployments." checked={ipAllowlist} onChange={setIpAllowlist} />
      </Card>

      {/* Integrations */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <Icon name="workflow" size={16} color="#6A7282" />
          <span style={{ fontSize: 15, fontWeight: 700 }}>Integrations & API</span>
        </div>
        <div style={{ fontSize: 13, color: '#6A7282', marginBottom: 4 }}>Control external system access and data pipelines.</div>
        <SettingRow label="API Access" desc="Allow external systems to connect via the Otangeles REST API." checked={apiAccess} onChange={setApiAccess} />
        <SettingRow label="Webhooks" desc="Push real-time events to external endpoints (e.g., HRIS, billing)." checked={webhooks} onChange={setWebhooks} />
        <div style={{ paddingTop: 14, display: 'flex', justifyContent: 'flex-start' }}>
          <button style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #E5E7EB', background: '#fff', color: '#6A7282', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
            Manage API Keys
          </button>
        </div>
      </Card>
    </div>
  );
}

// ===== SETTINGS PAGE =====
const SETTINGS_TABS = [
  { id: 'profile',       label: 'Profile' },
  { id: 'security',      label: 'Security' },
  { id: 'preferences',   label: 'Preferences' },
  { id: 'platform',      label: 'Platform' },
];

export function SettingsPage() {
  const [tab, setTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Settings"
        subtitle="Manage your profile, security preferences, and workspace defaults."
        actions={
          <Button variant={saved ? 'successSolid' : 'primary'} icon="check" onClick={handleSave}>
            {saved ? 'Applied!' : 'Apply Changes'}
          </Button>
        }
      />

      {/* Pill-style tabs — same pattern as Portal Configuration */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, padding: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, width: 'fit-content' }}>
        {SETTINGS_TABS.map(t => {
          const on = tab === t.id;
          const isPlatform = t.id === 'platform';
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '9px 18px', borderRadius: 4, border: 0, cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 13, fontWeight: on ? 700 : 500,
              background: on ? (isPlatform ? '#F5F2FD' : '#F5F2FD') : 'transparent',
              color: on ? (isPlatform ? '#845EC2' : '#67568C') : '#6A7282',
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'all 120ms',
            }}>
              {isPlatform && <Icon name="shield" size={13} color={on ? '#845EC2' : '#99A1AF'} />}
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>
        {tab === 'profile'       && <ProfileTab />}
        {tab === 'security'      && <SecurityTab />}
        {tab === 'preferences'   && <PreferencesTab />}
        {tab === 'platform'      && <PlatformTab />}
      </div>
    </main>
  );
}
