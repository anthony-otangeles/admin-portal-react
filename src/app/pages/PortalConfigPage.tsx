import { useState } from 'react';
import { Button, Card, PageHeader, Toggle, Icon } from '../components/ui/primitives';
import { PORTAL_FEATURES, ROLE_TONES, type PortalFeatureItem, type PortalFeatureSection } from '../data/mockData';

type PortalKey = 'Provider' | 'Scribe' | 'Clerk';

const PORTAL_COLORS: Record<PortalKey, { icon: string; preview: string }> = {
  Provider: { icon: 'shield',   preview: 'Dashboard, encounter queue, patients, workflows, metrics' },
  Scribe:   { icon: 'fileText', preview: 'Dashboard, encounter queue, patients, performance' },
  Clerk:    { icon: 'workflow', preview: 'Dashboard, encounter queue, patients, calendar, workflows' },
};

function isToggleable(item: PortalFeatureItem) {
  return item.toggleable !== false;
}

function setItemEnabledDeep(item: PortalFeatureItem, enabled: boolean): PortalFeatureItem {
  return {
    ...item,
    enabled,
    children: item.children?.map(child => setItemEnabledDeep(child, enabled)),
  };
}

function updateItem(items: PortalFeatureItem[], itemId: string, updater: (item: PortalFeatureItem) => PortalFeatureItem): PortalFeatureItem[] {
  return items.map(item => {
    if (item.id === itemId) return updater(item);
    if (!item.children) return item;
    return { ...item, children: updateItem(item.children, itemId, updater) };
  });
}

function countItems(items: PortalFeatureItem[], ancestorsEnabled = true) {
  return items.reduce((acc, item) => {
    const enabledHere = ancestorsEnabled && item.enabled;
    const childCounts = item.children ? countItems(item.children, enabledHere) : { enabled: 0, total: 0 };
    return {
      enabled: acc.enabled + (isToggleable(item) && enabledHere ? 1 : 0) + childCounts.enabled,
      total: acc.total + (isToggleable(item) ? 1 : 0) + childCounts.total,
    };
  }, { enabled: 0, total: 0 });
}

function collectVisibleItems(items: PortalFeatureItem[], depth = 0): Array<{ id: string; label: string; depth: number }> {
  return items.flatMap(item => {
    if (!item.enabled) return [];
    return [
      { id: item.id, label: item.label, depth },
      ...(item.children ? collectVisibleItems(item.children, depth + 1) : []),
    ];
  });
}

function FeatureRow({
  item,
  depth = 0,
  disabled,
  onToggle,
}: {
  item: PortalFeatureItem;
  depth?: number;
  disabled: boolean;
  onToggle: (itemId: string) => void;
}) {
  const hasToggle = isToggleable(item);
  const hasChildren = Boolean(item.children?.length);
  const isAccordion = Boolean(item.collapsible && hasChildren);
  const [open, setOpen] = useState(!isAccordion || Boolean(item.defaultOpen));
  const childDisabled = disabled || !item.enabled;

  return (
    <>
      <div style={{
        padding: '13px 20px',
        paddingLeft: 20 + depth * 28,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid #EEEEEE',
        gap: 16,
        background: depth ? '#FCFCFC' : 'transparent',
        opacity: disabled ? 0.62 : 1,
      }}
        onMouseEnter={e => (e.currentTarget.style.background = depth ? '#F8F8F8' : '#FAFAFA')}
        onMouseLeave={e => (e.currentTarget.style.background = depth ? '#FCFCFC' : 'transparent')}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {isAccordion && (
              <button
                type="button"
                onClick={() => setOpen(current => !current)}
                aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
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
                <Icon name={open ? 'chevronDown' : 'chevronRight'} size={14} color="#6A7282" />
              </button>
            )}
            {depth > 0 && <div style={{ width: 8, height: 1, background: '#D1D5DC', flexShrink: 0 }} />}
            <div style={{ fontSize: depth ? 13 : 14, fontWeight: depth ? 600 : 700, color: '#1C192E' }}>{item.label}</div>
            {isAccordion && (
              <span style={{ fontSize: 11, fontWeight: 700, color: '#99A1AF', fontFamily: 'JetBrains Mono' }}>
                {item.children?.length || 0}
              </span>
            )}
          </div>
          {item.desc && (
            <div style={{ fontSize: 12, color: '#6A7282', marginTop: 3, lineHeight: '18px' }}>{item.desc}</div>
          )}
        </div>
        {hasToggle && <Toggle checked={item.enabled} onChange={() => onToggle(item.id)} disabled={disabled} />}
      </div>
      {(!isAccordion || open) && item.children?.map(child => (
        <FeatureRow key={child.id} item={child} depth={depth + 1} disabled={childDisabled} onToggle={onToggle} />
      ))}
    </>
  );
}

// Right sidebar
function PortalSidebar({ portal, features }: { portal: PortalKey; features: PortalFeatureSection[] }) {
  const t = ROLE_TONES[portal];
  const totalEnabled = features.reduce((sum, s) => sum + countItems(s.items, s.enabled).enabled, 0);
  const totalAll = features.reduce((sum, s) => sum + countItems(s.items, s.enabled).total, 0);
  const visibleItems = features.flatMap(section => section.enabled ? collectVisibleItems(section.items) : []);
  const info = PORTAL_COLORS[portal];

  return (
    <div style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Summary card */}
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', background: t.bg, borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Icon name={info.icon} size={15} color={t.fg} />
            <span style={{ fontSize: 13, fontWeight: 700, color: t.fg }}>{portal} Portal</span>
          </div>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: t.fg, fontFamily: 'JetBrains Mono' }}>{totalEnabled}</span>
            <span style={{ fontSize: 14, color: '#99A1AF' }}>/ {totalAll} features enabled</span>
          </div>
          {/* Progress bar */}
          <div style={{ height: 6, background: '#EEEEEE', borderRadius: 9999, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ height: '100%', width: `${totalAll ? (totalEnabled / totalAll) * 100 : 0}%`, background: t.solid, borderRadius: 9999, transition: 'width 300ms ease-out' }} />
          </div>
          {/* Per-section breakdown */}
          {features.map(section => {
            const { enabled: on, total } = countItems(section.items, section.enabled);
            return (
              <div key={section.section} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: '#6A7282' }}>{section.section}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: on === total && section.enabled ? t.fg : '#99A1AF', fontFamily: 'JetBrains Mono' }}>
                  {on}/{total}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* What users see */}
      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #EEEEEE' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1C192E' }}>What users see</div>
          <div style={{ fontSize: 11, color: '#99A1AF', marginTop: 2 }}>{info.preview}</div>
        </div>
        <div style={{ padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 260, overflowY: 'auto' }}>
          {visibleItems.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, paddingLeft: item.depth * 10 }}>
              <div style={{ width: item.depth ? 4 : 6, height: item.depth ? 4 : 6, borderRadius: 9999, background: t.solid, marginTop: 6, flexShrink: 0, opacity: item.depth ? 0.58 : 1 }} />
              <span style={{ fontSize: 12, color: item.depth ? '#6A7282' : '#1C192E', lineHeight: '18px' }}>{item.label}</span>
            </div>
          ))}
          {totalEnabled === 0 && (
            <div style={{ fontSize: 12, color: '#99A1AF', textAlign: 'center', padding: '12px 0' }}>No features enabled</div>
          )}
        </div>
      </Card>

      {/* Info note */}
      <div style={{ padding: 12, background: '#FFF8E6', border: '1px solid #FFE9A6', borderRadius: 8, fontSize: 12, color: '#825E13', lineHeight: '18px', display: 'flex', gap: 8 }}>
        <Icon name="info" size={14} color="#B58420" />
        <span>Changes are <strong>live immediately</strong>. All {portal} users are affected.</span>
      </div>
    </div>
  );
}

export function PortalConfigPage() {
  const [activePortal, setActivePortal] = useState<PortalKey>('Provider');
  const [features, setFeatures] = useState<Record<string, PortalFeatureSection[]>>(PORTAL_FEATURES);
  const [saved, setSaved] = useState(false);

  const toggle = (itemId: string) => {
    setFeatures(prev => ({
      ...prev,
      [activePortal]: prev[activePortal].map(section => ({
        ...section,
        items: updateItem(section.items, itemId, item => setItemEnabledDeep(item, !item.enabled)),
      })),
    }));
  };

  const toggleSection = (sectionName: string, enabled: boolean) => {
    setFeatures(prev => ({
      ...prev,
      [activePortal]: prev[activePortal].map(section => (
        section.section === sectionName
          ? { ...section, enabled, items: section.items.map(item => setItemEnabledDeep(item, enabled)) }
          : section
      )),
    }));
  };

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const portals: { key: PortalKey; icon: string }[] = [
    { key: 'Provider', icon: 'shield' },
    { key: 'Scribe',   icon: 'fileText' },
    { key: 'Clerk',    icon: 'workflow' },
  ];

  const currentFeatures = features[activePortal] || [];

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Portal Configuration"
        subtitle="Enable or disable features per portal. Changes take effect immediately for all users of that role."
        actions={<>
          <Button variant="secondary" icon="history">View Changelog</Button>
          <Button variant={saved ? 'successSolid' : 'primary'} icon="check" onClick={handleSave}>
            {saved ? 'Applied!' : 'Apply Changes'}
          </Button>
        </>}
      />

      {/* Portal tab selector — same pill style across all pages */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, padding: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 6, width: 'fit-content' }}>
        {portals.map(p => {
          const on = activePortal === p.key;
          const t = ROLE_TONES[p.key];
          return (
            <button key={p.key} onClick={() => setActivePortal(p.key)} style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '9px 18px', borderRadius: 4,
              border: 0, background: on ? t.bg : 'transparent',
              color: on ? t.fg : '#6A7282', fontWeight: 700, fontSize: 13,
              cursor: 'pointer', fontFamily: 'Inter', transition: 'all 120ms',
            }}>
              <Icon name={p.icon} size={15} color={on ? t.fg : '#99A1AF'} />
              {p.key}
            </button>
          );
        })}
      </div>

      {/* 2-column: feature list + sidebar */}
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        {/* Main feature sections */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          {currentFeatures.map(section => {
            const { enabled: enabledCount, total } = countItems(section.items, section.enabled);
            return (
            <Card key={section.section} padding={0}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#1C192E' }}>{section.section}</h2>
                  <span style={{ fontSize: 12, color: '#99A1AF', fontFamily: 'JetBrains Mono' }}>
                    {enabledCount}/{total}
                  </span>
                </div>
                {section.toggleable && <Toggle checked={section.enabled} onChange={value => toggleSection(section.section, value)} />}
              </div>
              {section.items.map(item => (
                <FeatureRow key={item.id} item={item} disabled={!section.enabled} onToggle={toggle} />
              ))}
            </Card>
          );})}
        </div>

        {/* Right sidebar */}
        <PortalSidebar portal={activePortal} features={currentFeatures} />
      </div>
    </main>
  );
}
