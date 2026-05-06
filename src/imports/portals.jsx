// Admin Portal — Portal Configuration

function PortalsPage() {
  const [activePortal, setActivePortal] = useState('Provider');
  const [features, setFeatures] = useState(PORTAL_FEATURES);

  const portalCount = features[activePortal].reduce((s, sec) => s + sec.items.length, 0);
  const portalEnabled = features[activePortal].reduce((s, sec) => s + sec.items.filter(i => i.enabled).length, 0);

  const toggle = (sectionIdx, itemIdx) => {
    const next = JSON.parse(JSON.stringify(features));
    const it = next[activePortal][sectionIdx].items[itemIdx];
    it.enabled = !it.enabled;
    setFeatures(next);
  };

  const tones = ROLE_TONES[activePortal];

  return (
    <main style={{ flex: 1, padding: 32, background: '#F7F7F7', overflowY: 'auto' }}>
      <PageHeader
        title="Portal Configuration"
        subtitle="Toggle features and sections within each portal. Disabled features are hidden for users who land on that portal."
        actions={
          <>
            <Button variant="secondary" icon="eye">Preview portal</Button>
            <Button variant="primary" icon="check">Publish changes</Button>
          </>
        }
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, padding: 4, background: '#fff', border: '1px solid #E5E7EB', borderRadius: 4, width: 'fit-content' }}>
        {Object.keys(features).map(p => {
          const on = activePortal === p;
          const t = ROLE_TONES[p];
          return (
            <button key={p} onClick={() => setActivePortal(p)} style={{
              padding: '10px 18px', borderRadius: 4, border: 0,
              background: on ? t.bg : 'transparent', color: on ? t.fg : '#6A7282',
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
              fontFamily: 'Inter',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 9999, background: on ? t.solid : '#D1D5DC' }} />
              {p} Portal
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {features[activePortal].map((sec, si) => (
            <Card key={sec.section} padding={0}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#1C192E' }}>{sec.section}</h3>
                  <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{sec.items.filter(i => i.enabled).length} of {sec.items.length} features enabled</div>
                </div>
                <Button variant="ghost" size="sm" icon="eye">Preview section</Button>
              </div>
              <div>
                {sec.items.map((it, ii) => (
                  <FeatureRow key={it.id} item={it} onToggle={() => toggle(si, ii)} accent={tones.solid} />
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 32, alignSelf: 'flex-start' }}>
          <PortalSummary portal={activePortal} enabled={portalEnabled} total={portalCount} />
          <PortalPreview portal={activePortal} features={features[activePortal]} />
        </div>
      </div>
    </main>
  );
}

function FeatureRow({ item, onToggle, accent }) {
  return (
    <div style={{ padding: '14px 20px', borderTop: '1px solid #EEEEEE', display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1C192E' }}>{item.label}</div>
        {item.desc && <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>{item.desc}</div>}
      </div>
      <Toggle checked={item.enabled} onChange={onToggle} accent={accent} />
    </div>
  );
}

function PortalSummary({ portal, enabled, total }) {
  const t = ROLE_TONES[portal];
  return (
    <Card style={{ background: t.bg, border: `1px solid ${t.solid}33` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: 9999, background: t.solid }} />
        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: t.fg }}>{portal} Portal</span>
      </div>
      <div style={{ fontSize: 36, fontWeight: 700, color: t.fg, lineHeight: 1 }}>{enabled} <span style={{ fontSize: 18, color: '#6A7282', fontWeight: 600 }}>/ {total}</span></div>
      <div style={{ fontSize: 13, color: '#6A7282', marginTop: 4 }}>features enabled</div>
      <div style={{ height: 6, background: '#fff', borderRadius: 9999, marginTop: 12, overflow: 'hidden' }}>
        <div style={{ width: `${(enabled / total) * 100}%`, height: '100%', background: t.solid }} />
      </div>
    </Card>
  );
}

function PortalPreview({ portal, features }) {
  return (
    <Card padding={0}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #EEEEEE' }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>What users see</h3>
        <div style={{ fontSize: 12, color: '#6A7282', marginTop: 2 }}>Live nav preview</div>
      </div>
      <div style={{ padding: 12, background: '#F7F7F7', minHeight: 320 }}>
        <div style={{ background: '#fff', borderRadius: 6, border: '1px solid #E5E7EB', padding: 12, fontSize: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: ROLE_TONES[portal].solid }} />
            <span style={{ fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', color: ROLE_TONES[portal].fg }}>{portal}</span>
          </div>
          {features.map(sec => (
            <div key={sec.section} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#99A1AF', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>{sec.section}</div>
              {sec.items.map(it => (
                <div key={it.id} style={{
                  padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 8,
                  opacity: it.enabled ? 1 : 0.35,
                  textDecoration: it.enabled ? 'none' : 'line-through',
                  color: it.enabled ? '#1C192E' : '#99A1AF',
                  fontSize: 12,
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: 9999, background: it.enabled ? ROLE_TONES[portal].solid : '#D1D5DC' }} />
                  {it.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

Object.assign(window, { PortalsPage });
