import React, { useState, useMemo } from 'react';
import { Button, Card, Input, PageHeader, Toggle, Chip, Icon } from '../components/ui/primitives';
import { USERS, ASSIGNABLE_ROLES, PERMISSIONS, DEFAULT_PERMISSIONS, ROLE_TONES, ROLE_DESCRIPTIONS, flattenPermissionCapabilities, type PermissionCapability, type RoleKey } from '../data/mockData';

function Stat({ label, value, tone }: { label: string; value: string | number; tone?: string }) {
  return (
    <div>
      <div style={{ fontSize: 11, color: '#6A7282', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: tone === 'coral' ? '#FF6E6C' : '#1C192E', marginTop: 2 }}>{value}</div>
    </div>
  );
}

function PermCell({ on, activeRole, onClick }: { on: boolean; activeRole: boolean; onClick: () => void }) {
  return (
    <div style={{ display: 'inline-flex', padding: 3, borderRadius: 9999, outline: activeRole ? '2px solid #845EC2' : 'none', outlineOffset: 2 }}>
      <Toggle checked={on} onChange={onClick} size="sm" />
    </div>
  );
}

function capabilityMatches(capability: PermissionCapability, search: string): boolean {
  if (!search) return true;
  const q = search.toLowerCase();
  return capability.label.toLowerCase().includes(q)
    || Boolean(capability.description?.toLowerCase().includes(q))
    || Boolean(capability.children?.some(child => capabilityMatches(child, search)));
}

function PermissionRow({
  capability,
  depth,
  roles,
  matrix,
  activeRole,
  search,
  onToggle,
}: {
  capability: PermissionCapability;
  depth: number;
  roles: RoleKey[];
  matrix: Record<string, Record<string, boolean>>;
  activeRole: RoleKey;
  search: string;
  onToggle: (capabilityId: string, role: RoleKey) => void;
}) {
  const hasChildren = Boolean(capability.children?.length);
  const isCollapsible = Boolean(capability.collapsible && hasChildren);
  const [open, setOpen] = useState(!isCollapsible);
  const visible = capabilityMatches(capability, search);
  const showChildren = hasChildren && (search ? true : open);

  if (!visible) return null;

  if (hasChildren) {
    return (
      <>
        <tr style={{ borderTop: '1px solid #EEEEEE', background: depth ? '#FCFCFC' : '#fff' }}>
          <td colSpan={roles.length + 1} style={{ padding: '12px 20px', paddingLeft: 20 + depth * 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {isCollapsible && (
                <button
                  type="button"
                  onClick={() => setOpen(current => !current)}
                  aria-label={`${open ? 'Collapse' : 'Expand'} ${capability.label}`}
                  style={{
                    width: 24,
                    height: 24,
                    border: '1px solid #E5E7EB',
                    borderRadius: 4,
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    padding: 0,
                    flexShrink: 0,
                  }}
                >
                  <Icon name={showChildren ? 'chevronDown' : 'chevronRight'} size={14} color="#6A7282" />
                </button>
              )}
              {!isCollapsible && depth > 0 && <div style={{ width: 8, height: 1, background: '#D1D5DC', flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1C192E' }}>{capability.label}</div>
                {capability.description && <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{capability.description}</div>}
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#99A1AF', fontFamily: 'JetBrains Mono' }}>
                {flattenPermissionCapabilities(capability.children || []).length}
              </span>
            </div>
          </td>
        </tr>
        {showChildren && capability.children?.map(child => (
          <PermissionRow
            key={child.id}
            capability={child}
            depth={depth + 1}
            roles={roles}
            matrix={matrix}
            activeRole={activeRole}
            search={search}
            onToggle={onToggle}
          />
        ))}
      </>
    );
  }

  return (
    <tr style={{ borderTop: '1px solid #EEEEEE' }}>
      <td style={{ padding: '12px 20px', paddingLeft: 20 + depth * 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {depth > 0 && <div style={{ width: 8, height: 1, background: '#D1D5DC', flexShrink: 0 }} />}
          <span style={{ fontSize: 14, fontWeight: 600, color: '#1C192E' }}>{capability.label}</span>
          {capability.sensitive && <Chip tone="danger" style={{ fontSize: 10 }}>SENSITIVE</Chip>}
        </div>
        {capability.description && <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{capability.description}</div>}
      </td>
      {roles.map(role => {
        const allowed = Boolean(matrix[capability.id]?.[role]);
        return (
          <td key={role} style={{ padding: '12px 8px', textAlign: 'center' }}>
            <PermCell on={allowed} activeRole={role === activeRole} onClick={() => onToggle(capability.id, role)} />
          </td>
        );
      })}
    </tr>
  );
}

export function RoleManagement() {
  const [activeRole, setActiveRole] = useState<RoleKey>('Provider');
  const [matrix, setMatrix] = useState(DEFAULT_PERMISSIONS);
  const [search, setSearch] = useState('');
  const configurableRoles = ASSIGNABLE_ROLES;

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    configurableRoles.forEach(r => { c[r] = Object.values(matrix).filter(row => row[r]).length; });
    return c;
  }, [matrix, configurableRoles]);

  const totalCaps = Object.keys(matrix).length;
  const memberCounts = USERS.reduce((acc: Record<string, number>, u) => {
    u.roles.forEach(r => { acc[r] = (acc[r] || 0) + 1; });
    return acc;
  }, {});

  const sensitiveCount = PERMISSIONS
    .flatMap(a => flattenPermissionCapabilities(a.capabilities))
    .filter(c => c.sensitive && matrix[c.id]?.[activeRole]).length;

  const handleToggle = (capabilityId: string, role: RoleKey) => {
    const allowed = Boolean(matrix[capabilityId]?.[role]);
    setMatrix(prev => ({ ...prev, [capabilityId]: { ...prev[capabilityId], [role]: !allowed } }));
  };

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Roles & Permissions"
        subtitle="Roles bundle capabilities. Multi-role users get the union of allows; an explicit deny on any role wins."
        actions={<>
          <Button variant="secondary" icon="copy">Duplicate role</Button>
          <Button variant="primary" icon="plus">New role</Button>
        </>}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
        {/* Role list */}
        <Card padding={0}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Roles</h2>
            <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{configurableRoles.length} configurable</div>
          </div>
          <div style={{ padding: 8 }}>
            {configurableRoles.map(r => {
              const t = ROLE_TONES[r];
              const on = activeRole === r;
              return (
                <button key={r} onClick={() => setActiveRole(r)} style={{ width: '100%', padding: 12, borderRadius: 6, border: 0, background: on ? t.bg : 'transparent', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start', textAlign: 'left', borderLeft: `3px solid ${on ? t.solid : 'transparent'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#1C192E' }}>{r}</span>
                    <Chip tone="neutral" style={{ background: '#fff' }}>{memberCounts[r] || 0}</Chip>
                  </div>
                  <div style={{ fontSize: 11, color: '#6A7282' }}>{counts[r]}/{totalCaps} capabilities · {memberCounts[r] || 0} members</div>
                </button>
              );
            })}
            <div style={{ margin: '8px 4px 4px', padding: 12, background: '#FFF8E6', border: '1px solid #FFE9A6', borderRadius: 8, fontSize: 12, color: '#825E13', lineHeight: '18px', display: 'flex', gap: 8 }}>
              <Icon name="lock" size={14} color="#B58420" />
              <span>Super Admin permissions are protected from this editor to minimize lockout risk.</span>
            </div>
          </div>
        </Card>

        <div>
          {/* Role summary */}
          <Card padding={0} style={{ marginBottom: 16 }}>
            <div style={{ padding: 22, display: 'flex', gap: 20, alignItems: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: 12, background: ROLE_TONES[activeRole].bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="shield" size={24} color={ROLE_TONES[activeRole].solid} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{activeRole}</h2>
                <div style={{ fontSize: 13, color: '#6A7282', marginTop: 4 }}>{ROLE_DESCRIPTIONS[activeRole]}</div>
              </div>
              <div style={{ display: 'flex', gap: 24, paddingLeft: 24, borderLeft: '1px solid #EEEEEE' }}>
                <Stat label="Capabilities" value={`${counts[activeRole]}/${totalCaps}`} />
                <Stat label="Members" value={memberCounts[activeRole] || 0} />
                <Stat label="Sensitive" value={sensitiveCount} tone="coral" />
              </div>
            </div>
          </Card>

          {/* Permissions matrix */}
          <Card padding={0}>
            <div style={{ padding: '16px 20px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #EEEEEE' }}>
              <Input icon="search" placeholder="Filter capabilities" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1 }} />
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6A7282', whiteSpace: 'nowrap', cursor: 'pointer' }}>
                <Toggle checked={true} onChange={() => {}} size="sm" />
                Compare across roles
              </label>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter' }}>
                <thead>
                  <tr style={{ fontSize: 11, color: '#6A7282', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'left' }}>
                    <th style={{ padding: '14px 20px', width: '50%' }}>Capability</th>
                    {configurableRoles.map(r => (
                      <th key={r} style={{ padding: '14px 8px', textAlign: 'center', minWidth: 90 }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          {r === activeRole && <span style={{ width: 6, height: 6, borderRadius: 9999, background: ROLE_TONES[r].solid }} />}
                          <span style={{ fontSize: 11, fontWeight: 600 }}>{r}</span>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map(area => (
                    <React.Fragment key={area.area}>
                      <tr style={{ background: '#F9FAFB' }}>
                        <td colSpan={configurableRoles.length + 1} style={{ padding: '10px 20px', fontSize: 12, fontWeight: 700, color: '#67568C', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                            <Icon name={area.icon} size={14} color="#67568C" />
                            {area.area}
                          </span>
                        </td>
                      </tr>
                      {area.capabilities.map(capability => (
                        <PermissionRow
                          key={capability.id}
                          capability={capability}
                          depth={0}
                          roles={configurableRoles}
                          matrix={matrix}
                          activeRole={activeRole}
                          search={search}
                          onToggle={handleToggle}
                        />
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
