import { useState, useRef, useEffect } from 'react';
import { ROLE_TONES } from '../../data/mockData';

// ===== DESIGN TOKENS =====
export const C = {
  primary: '#845EC2', primaryDark: '#67568C', primaryTint: '#F5F2FD',
  mint: '#00C9A7', mintDark: '#29BB89', mintTint: '#E7F5EF',
  coral: '#FF6E6C', coralTint: '#FFF3EF',
  pink: '#C34A7D', pinkTint: '#FFF3F8',
  blue: '#0081CF', blueTint: '#E6F3FB',
  gold: '#E9C05F', goldTint: '#FFF8E6',
  fg1: '#1C192E', fg2: '#6A7282', fg3: '#99A1AF',
  border: '#E5E7EB', divider: '#EEEEEE',
  surface: '#FFFFFF', canvas: '#F7F7F7', hover: '#F8F8F8',
};

// ===== ICON =====
const PATHS: Record<string, string> = {
  dashboard: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z',
  sliders: 'M4 21v-7 M4 10V3 M12 21v-9 M12 8V3 M20 21v-5 M20 12V3 M1 14h6 M9 8h6 M17 16h6',
  chart: 'M3 3v18h18 M7 14l4-4 4 4 5-5',
  bell: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0',
  history: 'M3 12a9 9 0 1 0 9-9 9.74 9.74 0 0 0-6.74 2.74L3 8 M3 3v5h5 M12 7v5l4 2',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z M21 21l-4.3-4.3',
  chevronDown: 'm6 9 6 6 6-6',
  chevronRight: 'm9 18 6-6-6-6',
  chevronUp: 'm18 15-6-6-6 6',
  chevronLeft: 'm15 18-6-6 6-6',
  plus: 'M12 5v14 M5 12h14',
  x: 'M18 6 6 18 M6 6l12 12',
  check: 'M20 6 9 17l-5-5',
  minus: 'M5 12h14',
  edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z',
  trash: 'M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6 M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M10 11v6 M14 11v6',
  copy: 'M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1',
  fileText: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z M14 2v6h6 M8 13h8 M8 17h8 M8 9h3',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3Z',
  more: 'M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z',
  alert: 'M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z M12 9v4 M12 17h.01',
  lock: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2Z M7 11V7a5 5 0 0 1 10 0v4',
  key: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777Zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4',
  mail: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2Z M22 6l-10 7L2 6',
  download: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3',
  facility: 'M3 21h18 M5 21V7l8-4v18 M19 21V11l-6-4',
  money: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
  activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
  calendar: 'M8 2v4 M16 2v4 M3 10h18 M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z M12 6v6l4 2',
  eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7 M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20 M12 16v-4 M12 8h.01',
  workflow: 'M3 6h13 M3 12h13 M3 18h13 M19 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M19 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  refresh: 'M3 12a9 9 0 0 1 15-6.7L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15 6.7L3 16 M3 21v-5h5',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
  play: 'm5 3 14 9-14 9V3Z',
  grip: 'M9 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M9 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M15 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2 M15 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2',
  toggle: 'M16 4H8a8 8 0 0 0 0 16h8a8 8 0 0 0 0-16Z M8 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  arrowUp: 'M12 19V5 M5 12l7-7 7 7',
  arrowDown: 'M12 5v14 M19 12l-7 7-7-7',
  star: 'm12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z',
};

interface IconProps { name: string; size?: number; color?: string; strokeWidth?: number; }
export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  const d = PATHS[name] || PATHS.dashboard;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {d.split(' M').map((p, i) => <path key={i} d={i ? 'M' + p : p} />)}
    </svg>
  );
}

// ===== AVATAR =====
const PALETTE = ['#845EC2','#00C9A7','#0081CF','#FF6E6C','#C34A7D','#67568C','#29BB89','#B58420'];
function avatarColor(initials: string) {
  let h = 0;
  for (let i = 0; i < initials.length; i++) h = (h * 31 + initials.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}
interface AvatarProps { initials?: string; size?: number; bg?: string; }
export function Avatar({ initials = 'SA', size = 36 }: AvatarProps) {
  const iconSize = Math.round(size * 0.72);
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: '#9FA6B2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <svg
        viewBox="0 0 32 32"
        width={iconSize}
        height={iconSize}
        fill="none"
        aria-hidden="true"
        style={{ display: 'block', flexShrink: 0 }}
      >
        <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="2.6" />
        <circle cx="16" cy="12.4" r="4.6" stroke="white" strokeWidth="2.6" />
        <path
          d="M7.8 25.6c1.6-4.1 4.5-6.2 8.2-6.2s6.6 2.1 8.2 6.2"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ===== CHIP =====
const CHIP_TONES: Record<string, { bg: string; fg: string }> = {
  todo:    { bg: '#F5F2FD', fg: '#67568C' },
  review:  { bg: '#FDECEC', fg: '#C9302C' },
  signing: { bg: '#FFF3F8', fg: '#C34A7D' },
  signed:  { bg: '#E7F5EF', fg: '#29BB89' },
  voided:  { bg: '#F3F4F6', fg: '#6A7282' },
  pending: { bg: '#FFF8E6', fg: '#B58420' },
  info:    { bg: '#E6F3FB', fg: '#0081CF' },
  neutral: { bg: '#F3F4F6', fg: '#6A7282' },
  primary: { bg: '#F5F2FD', fg: '#67568C' },
  success: { bg: '#E7F5EF', fg: '#29BB89' },
  danger:  { bg: '#FDECEC', fg: '#C9302C' },
  warn:    { bg: '#FFF8E6', fg: '#B58420' },
};
interface ChipProps { tone?: string; children: React.ReactNode; style?: React.CSSProperties; }
export function Chip({ tone = 'neutral', children, style }: ChipProps) {
  const t = CHIP_TONES[tone] || CHIP_TONES.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 9999,
      background: t.bg, color: t.fg,
      fontSize: 12, fontWeight: 600, letterSpacing: '0.02em', fontFamily: 'Inter',
      ...style,
    }}>{children}</span>
  );
}

// ===== BUTTON =====
interface ButtonProps {
  variant?: 'primary'|'secondary'|'ghost'|'ghostNeutral'|'danger'|'dangerSolid'|'successSolid';
  icon?: string; iconRight?: string; children?: React.ReactNode;
  onClick?: () => void; style?: React.CSSProperties; size?: 'sm'|'md';
  disabled?: boolean; type?: 'button'|'submit';
}
export function Button({ variant = 'primary', icon, iconRight, children, onClick, style, size = 'md', disabled, type = 'button' }: ButtonProps) {
  const base: React.CSSProperties = {
    fontFamily: 'Inter', fontWeight: 600, fontSize: size === 'sm' ? 13 : 14, lineHeight: '20px',
    padding: size === 'sm' ? '6px 12px' : '10px 16px',
    borderRadius: 4, border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8,
    transition: 'all 150ms ease-out', opacity: disabled ? 0.5 : 1, whiteSpace: 'nowrap',
  };
  const variants: Record<string, React.CSSProperties> = {
    primary:      { background: '#00C9A7', color: '#fff' },
    secondary:    { background: '#fff', color: '#6A7282', borderColor: '#E5E7EB' },
    ghost:        { background: 'transparent', color: '#845EC2', borderColor: 'transparent' },
    ghostNeutral: { background: 'transparent', color: '#6A7282', borderColor: 'transparent' },
    danger:       { background: '#fff', color: '#C9302C', borderColor: '#E5A0A0' },
    dangerSolid:  { background: '#C9302C', color: '#fff' },
    successSolid: { background: '#29BB89', color: '#fff' },
  };
  const v = variants[variant];
  const iconColor = v.color as string;
  return (
    <button type={type} onClick={disabled ? undefined : onClick} style={{ ...base, ...v, ...style }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} color={iconColor} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} color={iconColor} />}
    </button>
  );
}

// ===== INPUT =====
interface InputProps {
  icon?: string; rightIcon?: string; placeholder?: string; value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string;
  style?: React.CSSProperties; height?: number; readOnly?: boolean;
}
export function Input({ icon, rightIcon, placeholder, value, onChange, type = 'text', style, height = 40, readOnly }: InputProps) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      border: `1px solid ${focus ? '#845EC2' : '#E5E7EB'}`,
      borderRadius: 5, padding: '0 14px', height, background: readOnly ? '#F9FAFB' : '#fff',
      boxSizing: 'border-box', ...style,
    }}>
      {icon && <Icon name={icon} size={16} color="#99A1AF" />}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder} readOnly={readOnly}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ flex: 1, border: 0, outline: 0, fontFamily: 'Inter', fontSize: 14, color: '#1C192E', minWidth: 0, background: 'transparent' }}
      />
      {rightIcon && <Icon name={rightIcon} size={16} color="#6A7282" />}
    </div>
  );
}

// ===== CARD =====
interface CardProps { children: React.ReactNode; style?: React.CSSProperties; padding?: number; }
export function Card({ children, style, padding = 20 }: CardProps) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding, ...style }}>
      {children}
    </div>
  );
}

// ===== TOGGLE =====
interface ToggleProps { checked: boolean; onChange?: (v: boolean) => void; size?: 'sm'|'md'; disabled?: boolean; }
export function Toggle({ checked, onChange, size = 'md', disabled }: ToggleProps) {
  const w = size === 'sm' ? 32 : 40, h = size === 'sm' ? 18 : 22, k = size === 'sm' ? 14 : 18;
  return (
    <button onClick={() => !disabled && onChange && onChange(!checked)} style={{
      width: w, height: h, borderRadius: 9999, border: 0,
      background: checked ? '#845EC2' : '#D1D5DC',
      position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer', padding: 0,
      transition: 'background 150ms ease-out', opacity: disabled ? 0.5 : 1, flexShrink: 0,
    }}>
      <span style={{
        position: 'absolute', top: 2, left: checked ? w - k - 2 : 2,
        width: k, height: k, borderRadius: 9999, background: '#fff',
        transition: 'left 150ms ease-out', boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }} />
    </button>
  );
}

// ===== CHECKBOX =====
interface CheckboxProps { checked: boolean; indeterminate?: boolean; onChange?: (v: boolean) => void; disabled?: boolean; }
export function Checkbox({ checked, indeterminate, onChange, disabled }: CheckboxProps) {
  return (
    <button onClick={() => !disabled && onChange && onChange(!checked)} style={{
      width: 18, height: 18, borderRadius: 4,
      border: `1.5px solid ${checked || indeterminate ? '#845EC2' : '#D1D5DC'}`,
      background: checked || indeterminate ? '#845EC2' : '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer', padding: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      opacity: disabled ? 0.5 : 1,
    }}>
      {checked && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
      {indeterminate && !checked && <Icon name="minus" size={12} color="#fff" strokeWidth={3} />}
    </button>
  );
}

// ===== SELECT =====
interface SelectOption { value: string; label: string; }
interface SelectProps { value: string; onChange: (v: string) => void; options: SelectOption[]; style?: React.CSSProperties; width?: number | string; }
export function Select({ value, onChange, options, style, width = 200 }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const opt = options.find(o => o.value === value) || options[0];
  return (
    <div ref={ref} style={{ position: 'relative', width, flexShrink: 0, ...style }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', height: 40, padding: '0 14px',
        background: '#fff', border: '1px solid #E5E7EB', borderRadius: 5,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontFamily: 'Inter', fontSize: 14, color: '#1C192E', cursor: 'pointer',
      }}>
        <span>{opt?.label || 'Select'}</span>
        <Icon name="chevronDown" size={16} color="#6A7282" />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 44, left: 0, right: 0,
          background: '#fff', border: '1px solid #E5E7EB', borderRadius: 8,
          boxShadow: '0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)',
          padding: 4, zIndex: 50, maxHeight: 280, overflowY: 'auto',
        }}>
          {options.map(o => (
            <div key={o.value} onClick={() => { onChange(o.value); setOpen(false); }} style={{
              padding: '8px 12px', borderRadius: 4, cursor: 'pointer',
              background: o.value === value ? '#F5F2FD' : 'transparent',
              color: o.value === value ? '#67568C' : '#1C192E',
              fontWeight: o.value === value ? 600 : 400, fontSize: 14,
            }}>{o.label}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== PAGE HEADER =====
interface PageHeaderProps {
  title: string; subtitle?: string;
  actions?: React.ReactNode; breadcrumbs?: string[];
}
export function PageHeader({ title, subtitle, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: 28 }}>
      {breadcrumbs && (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 8, fontSize: 12, color: '#6A7282' }}>
          {breadcrumbs.map((b, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {i > 0 && <Icon name="chevronRight" size={12} color="#99A1AF" />}
              {b}
            </span>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: '#845EC2', fontFamily: 'Montserrat, Inter, sans-serif' }}>{title}</h1>
          {subtitle && <p style={{ margin: '6px 0 0', fontSize: 14, color: '#6A7282', lineHeight: '20px' }}>{subtitle}</p>}
        </div>
        {actions && <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>{actions}</div>}
      </div>
    </div>
  );
}

// ===== TABS =====
interface Tab { id: string; label: string; count?: number; badge?: string; }
interface TabsProps { tabs: Tab[]; active: string; onChange: (id: string) => void; }
export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid #E5E7EB', gap: 4 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          padding: '12px 16px', background: 'transparent', border: 0, cursor: 'pointer',
          fontFamily: 'Inter', fontSize: 14, fontWeight: 600,
          color: active === t.id ? '#845EC2' : '#6A7282',
          borderBottom: `2px solid ${active === t.id ? '#845EC2' : 'transparent'}`,
          marginBottom: -1, display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          {t.label}
          {t.count !== undefined && (
            <span style={{
              background: active === t.id ? '#F5F2FD' : '#F3F4F6',
              color: active === t.id ? '#67568C' : '#6A7282',
              borderRadius: 9999, padding: '1px 8px', fontSize: 11, fontWeight: 700,
            }}>{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ===== STAT TILE =====
interface StatTileProps { label: string; value: string | number; delta?: string; deltaTone?: string; icon?: string; tone?: string; }
export function StatTile({ label, value, delta, deltaTone = 'mint', icon, tone = 'primary' }: StatTileProps) {
  const TONES: Record<string, { bar: string; tint: string }> = {
    primary: { bar: '#845EC2', tint: '#F5F2FD' },
    coral:   { bar: '#FF6E6C', tint: '#FFF3EF' },
    mint:    { bar: '#00C9A7', tint: '#E7F5EF' },
    blue:    { bar: '#0081CF', tint: '#E6F3FB' },
    gold:    { bar: '#E9C05F', tint: '#FFF8E6' },
    pink:    { bar: '#C34A7D', tint: '#FFF3F8' },
  };
  const t = TONES[tone] || TONES.primary;
  return (
    <Card style={{ padding: 16, display: 'flex', gap: 12, alignItems: 'center', minWidth: 0 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: t.tint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name={icon || 'activity'} size={20} color={t.bar} />
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 12, color: '#6A7282', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#1C192E', lineHeight: 1.1, marginTop: 2 }}>{value}</div>
        {delta && <div style={{ fontSize: 11, color: deltaTone === 'mint' ? '#29BB89' : '#FF6E6C', fontWeight: 600, marginTop: 2 }}>{delta}</div>}
      </div>
    </Card>
  );
}

// ===== EMPTY STATE =====
interface EmptyStateProps { icon?: string; title: string; body?: string; action?: React.ReactNode; }
export function EmptyState({ icon = 'fileText', title, body, action }: EmptyStateProps) {
  return (
    <div style={{ padding: 48, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: '#6A7282' }}>
      <div style={{ width: 56, height: 56, borderRadius: 9999, background: '#F5F2FD', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={26} color="#845EC2" />
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#1C192E' }}>{title}</div>
      {body && <div style={{ fontSize: 14, maxWidth: 360 }}>{body}</div>}
      {action}
    </div>
  );
}

// ===== MODAL =====
interface ModalProps { open: boolean; onClose: () => void; title: string; children: React.ReactNode; footer?: React.ReactNode; width?: number; }
export function Modal({ open, onClose, title, children, footer, width = 560 }: ModalProps) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width, maxWidth: '90vw', maxHeight: '85vh', background: '#fff', borderRadius: 16,
        boxShadow: '0 4px 6px -4px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontFamily: 'Inter', fontSize: 16, fontWeight: 700, color: '#1C192E' }}>{title}</h2>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 9999, background: 'transparent', border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="x" size={18} color="#6A7282" />
          </button>
        </div>
        <div style={{ padding: 24, overflowY: 'auto', flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: '16px 24px', borderTop: '1px solid #EEEEEE', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>{footer}</div>}
      </div>
    </div>
  );
}

// ===== FIELD =====
interface FieldProps { label: string; hint?: string; children: React.ReactNode; required?: boolean; }
export function Field({ label, hint, children, required }: FieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: '#1C192E', fontFamily: 'Inter' }}>
        {label}{required && <span style={{ color: '#FF6E6C', marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {hint && <div style={{ fontSize: 12, color: '#6A7282' }}>{hint}</div>}
    </div>
  );
}

// ===== ROLE CHIP =====
interface RoleChipProps { role: string; style?: React.CSSProperties; }
export function RoleChip({ role, style }: RoleChipProps) {
  const t = ROLE_TONES[role] || ROLE_TONES['Provider'];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 10px', borderRadius: 9999,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.02em', fontFamily: 'Inter', ...style,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 9999, background: t.solid }} />
      {role}
    </span>
  );
}

// ===== CARD HEADER =====
interface CardHeaderProps { title: string; actions?: React.ReactNode; }
export function CardHeader({ title, actions }: CardHeaderProps) {
  return (
    <div style={{ padding: '18px 22px', borderBottom: '1px solid #EEEEEE', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1C192E' }}>{title}</h2>
      {actions}
    </div>
  );
}
