// Admin Portal — Mock Data

const FACILITIES = [
  { id: 'f1', name: 'Niles Care Center', short: 'Niles', region: 'Niles, IL', address: '8333 W Golf Rd, Niles, IL 60714', beds: 142 },
  { id: 'f2', name: 'Brickyard — Merrillville', short: 'Brickyard MV', region: 'Merrillville, IN', address: '8401 Broadway, Merrillville, IN 46410', beds: 118 },
  { id: 'f3', name: 'Brickyard — Elkhart', short: 'Brickyard EK', region: 'Elkhart, IN', address: '2600 Toledo Rd, Elkhart, IN 46516', beds: 96 },
  { id: 'f4', name: 'Casa of Hobart', short: 'Casa Hobart', region: 'Hobart, IN', address: '700 E 8th St, Hobart, IN 46342', beds: 88 },
];

const USERS = [
  { id: 'u1', name: 'Dr. John Carter', email: 'john.carter@otangeles.com', initials: 'JC', roles: ['Provider'], dept: 'Internal Medicine', spec: 'Geriatrics', phone: '+1 (415) 555-0142', status: 'active', facilities: ['f1', 'f2'], lastActive: '2 min ago', mfa: true, joined: 'Mar 12, 2024' },
  { id: 'u2', name: 'Marcus Reyes', email: 'marcus.reyes@otangeles.com', initials: 'MR', roles: ['Scribe'], dept: 'Clinical Documentation', spec: 'Internal Med', phone: '+1 (415) 555-0188', status: 'active', facilities: ['f1', 'f2', 'f3'], lastActive: '14 min ago', mfa: true, joined: 'Jan 04, 2024' },
  { id: 'u3', name: 'Priya Shah', email: 'priya.shah@otangeles.com', initials: 'PS', roles: ['Scribe'], dept: 'Clinical Documentation', spec: 'Geriatrics', phone: '+1 (628) 555-0100', status: 'active', facilities: ['f1'], lastActive: '1 hr ago', mfa: false, joined: 'Aug 22, 2024' },
  { id: 'u4', name: 'Alicia Bennett', email: 'alicia.bennett@otangeles.com', initials: 'AB', roles: ['Clerk'], dept: 'Operations', spec: 'Front Desk', phone: '+1 (415) 555-0173', status: 'active', facilities: ['f3', 'f4'], lastActive: '3 hr ago', mfa: true, joined: 'Sep 10, 2023' },
  { id: 'u5', name: 'Sarah Avila', email: 'sarah.avila@otangeles.com', initials: 'SA', roles: ['Super Admin'], dept: 'IT / Admin', spec: '—', phone: '+1 (415) 555-0101', status: 'active', facilities: ['f1', 'f2', 'f3', 'f4'], lastActive: 'Now', mfa: true, joined: 'Aug 01, 2023' },
  { id: 'u6', name: 'Dr. Olivia Tran', email: 'olivia.tran@otangeles.com', initials: 'OT', roles: ['Provider'], dept: 'Internal Medicine', spec: 'Wound Care', phone: '+1 (415) 555-0166', status: 'active', facilities: ['f4'], lastActive: '8 hr ago', mfa: true, joined: 'Apr 18, 2024' },
  { id: 'u7', name: 'Kenji Watanabe', email: 'kenji.w@otangeles.com', initials: 'KW', roles: ['Clerk'], dept: 'Clinical Documentation', spec: 'Cross-trained', phone: '+1 (415) 555-0119', status: 'active', facilities: ['f4'], lastActive: '22 min ago', mfa: false, joined: 'Nov 30, 2024' },
  { id: 'u8', name: 'Brianna Lopez', email: 'brianna.lopez@otangeles.com', initials: 'BL', roles: ['Clerk'], dept: 'Operations', spec: 'Records', phone: '+1 (415) 555-0144', status: 'invited', facilities: ['f1'], lastActive: '—', mfa: false, joined: 'Pending' },
  { id: 'u9', name: 'Dr. Harold Greene', email: 'harold.greene@otangeles.com', initials: 'HG', roles: ['Provider'], dept: 'Internal Medicine', spec: 'Cardiology', phone: '+1 (415) 555-0177', status: 'suspended', facilities: ['f2'], lastActive: '4 d ago', mfa: true, joined: 'Feb 14, 2024' },
  { id: 'u10', name: 'Ines Park', email: 'ines.park@otangeles.com', initials: 'IP', roles: ['Scribe'], dept: 'Clinical Documentation', spec: 'Behavioral Health', phone: '+1 (415) 555-0155', status: 'active', facilities: ['f3', 'f4'], lastActive: '46 min ago', mfa: true, joined: 'Jul 02, 2024' },
  { id: 'u11', name: 'Tomás Rivera', email: 'tomas.rivera@otangeles.com', initials: 'TR', roles: ['Provider'], dept: 'Internal Medicine', spec: 'Hospitalist', phone: '+1 (415) 555-0192', status: 'active', facilities: ['f1', 'f4'], lastActive: 'Yesterday', mfa: true, joined: 'May 28, 2024' },
  { id: 'u12', name: 'Yuki Schmidt', email: 'yuki.schmidt@otangeles.com', initials: 'YS', roles: ['Scribe'], dept: 'Clinical Documentation', spec: 'Cardiology', phone: '+1 (415) 555-0181', status: 'active', facilities: ['f2'], lastActive: '32 min ago', mfa: true, joined: 'Oct 15, 2023' },
];

// Mock notifications shown in the header notification bell dropdown
const HEADER_NOTIFICATIONS = [
  { id: 'n1', kind: 'returned', title: 'Returned Encounter', who: 'Jane Doe', verb: 'has returned', enc: 'ENCT00000005', when: 'Just Now', unread: true, body: 'Marked needs revision — please review the assessment & plan section before resubmitting.' },
  { id: 'n2', kind: 'accepted', title: 'Encounter Accepted', who: 'John Smith', verb: 'has accepted', enc: 'ENCT00000004', when: '1h ago', unread: false },
  { id: 'n3', kind: 'accepted', title: 'Encounter Accepted', who: 'John Smith', verb: 'has accepted', enc: 'ENCT00000003', when: '1h ago', unread: false },
  { id: 'n4', kind: 'accepted', title: 'Encounter Accepted', who: 'John Smith', verb: 'has accepted', enc: 'ENCT00000002', when: '1h ago', unread: false },
  { id: 'n5', kind: 'accepted', title: 'Encounter Accepted', who: 'John Smith', verb: 'has accepted', enc: 'ENCT00000001', when: '1h ago', unread: false },
];

// Permission system — grouped capabilities
// Format: { area, capabilities: [{ id, label, description, defaults: { role: 'allow'|'deny'|'inherit' } }] }
const PERMISSIONS = [
  {
    area: 'Encounters', icon: 'fileText',
    capabilities: [
      { id: 'enc.view', label: 'View encounters', description: 'See encounters in lists and detail views' },
      { id: 'enc.create', label: 'Create encounter', description: 'Add a new encounter on a patient' },
      { id: 'enc.assign', label: 'Assign encounter to scribe', description: 'Route encounters into the scribe queue' },
      { id: 'enc.bulkAssign', label: 'Bulk assign encounters', description: 'Select multiple and assign at once' },
      { id: 'enc.start', label: 'Start an encounter', description: 'Begin documentation work on an encounter' },
      { id: 'enc.write', label: 'Write encounter note', description: 'Author HPI, ROS, PE, A&P, codes' },
      { id: 'enc.signOwn', label: 'Sign own encounter', description: 'Apply provider signature' },
      { id: 'enc.signOnBehalf', label: "Sign on another provider's behalf", description: 'Co-signature flow', sensitive: true },
      { id: 'enc.return', label: 'Return for revision', description: 'Send a note back to the scribe' },
      { id: 'enc.delete', label: 'Delete / void encounter', description: 'Permanent removal', sensitive: true },
    ],
  },
  {
    area: 'Patients', icon: 'patients',
    capabilities: [
      { id: 'pt.view', label: 'View patient list & charts' },
      { id: 'pt.create', label: 'Add patient' },
      { id: 'pt.edit', label: 'Edit patient demographics' },
      { id: 'pt.discharge', label: 'Initiate discharge request' },
      { id: 'pt.delete', label: 'Delete patient', sensitive: true },
    ],
  },
  {
    area: 'Schedules & Calendar', icon: 'schedules',
    capabilities: [
      { id: 'sch.viewOwn', label: 'View own schedule' },
      { id: 'sch.viewAll', label: 'View all provider schedules' },
      { id: 'sch.editOwn', label: 'Edit own shifts' },
      { id: 'sch.editAll', label: "Edit anyone's shifts" },
      { id: 'sch.templates', label: 'Manage calendar templates' },
    ],
  },
  {
    area: 'Calendar', icon: 'calendar',
    capabilities: [
      { id: 'cal.addShifts', label: 'Add Shifts' },
      { id: 'cal.createCalendarTemplate', label: 'Create Calendar Template' },
    ],
  },
  {
    area: 'Workflows', icon: 'workflow',
    capabilities: [
      { id: 'wf.medDocs', label: 'Identify & route medical documents' },
      { id: 'wf.discharge', label: 'Authorize discharge requests' },
      { id: 'wf.eRx', label: 'E-Prescribe' },
      { id: 'wf.eRxVoid', label: 'Void e-prescription', sensitive: true },
      { id: 'wf.medsReduction', label: 'Manage meds reduction' },
      { id: 'wf.flaggedVitals', label: 'Review flagged vitals' },
      { id: 'wf.labs', label: 'Review lab results' },
      { id: 'wf.rth', label: 'Review High-Risk RTH list' },
    ],
  },
  {
    area: 'Billing & Compensation', icon: 'money',
    capabilities: [
      { id: 'bill.view', label: 'View billing data' },
      { id: 'bill.editCodes', label: 'Edit ICD-10 / CPT codes' },
      { id: 'comp.viewOwn', label: 'View own earnings' },
      { id: 'comp.viewAll', label: 'View all earnings', sensitive: true },
      { id: 'comp.editRates', label: 'Edit per-note rates', sensitive: true },
    ],
  },
  {
    area: 'User & System Administration', icon: 'shield',
    capabilities: [
      { id: 'admin.users.view', label: 'View user directory' },
      { id: 'admin.users.create', label: 'Create users' },
      { id: 'admin.users.edit', label: 'Edit users' },
      { id: 'admin.users.delete', label: 'Delete users', sensitive: true },
      { id: 'admin.roles.edit', label: 'Edit roles & permissions', sensitive: true },
      { id: 'admin.portals.config', label: 'Configure portal features', sensitive: true },
      { id: 'admin.audit.view', label: 'View audit log', sensitive: true },
      { id: 'admin.notifications.config', label: 'Configure notification matrix' },
    ],
  },
];

// Default permission matrix (cap.id -> role -> bool)
const ROLES = ['Super Admin', 'Provider', 'Scribe', 'Clerk'];
const ASSIGNABLE_ROLES = ['Provider', 'Scribe', 'Clerk']; // Roles a non-admin user can be assigned to (single-pick)

const DEFAULT_PERMISSIONS = (() => {
  const m = {};
  for (const area of PERMISSIONS) {
    for (const c of area.capabilities) {
      m[c.id] = { 'Super Admin': true, 'Provider': false, 'Scribe': false, 'Clerk': false };
    }
  }
  // Provider
  ['enc.view','enc.create','enc.assign','enc.start','enc.write','enc.signOwn','enc.return',
   'pt.view','pt.create','pt.edit','pt.discharge',
   'sch.viewOwn','sch.viewAll','sch.editOwn','sch.templates',
   'wf.medDocs','wf.discharge','wf.eRx','wf.eRxVoid','wf.medsReduction','wf.flaggedVitals','wf.labs','wf.rth',
   'bill.view'].forEach(k => m[k] && (m[k].Provider = true));
  // Scribe
  ['enc.view','enc.start','enc.write',
   'pt.view',
   'sch.viewOwn','sch.editOwn',
   'comp.viewOwn'].forEach(k => m[k] && (m[k].Scribe = true));
  // Clerk
  ['enc.view','enc.create','enc.assign','enc.bulkAssign',
   'pt.view','pt.create','pt.edit','pt.discharge',
   'sch.viewAll','sch.editAll','sch.templates',
   'cal.addShifts','cal.createCalendarTemplate',
   'wf.medDocs','wf.discharge'].forEach(k => m[k] && (m[k].Clerk = true));
  return m;
})();

// Portal configuration — feature toggles per portal
const PORTAL_FEATURES = {
  Provider: [
    { section: 'Dashboard', items: [
      { id: 'p.dash.stickyNotes', label: 'Sticky Notes section', desc: 'Personal notes pinned to dashboard', enabled: true },
      { id: 'p.dash.wRvuTile', label: 'W-RVU performance tile', desc: 'Surface weekly RVU on landing', enabled: true },
    ]},
    { section: 'Encounters', items: [
      { id: 'p.enc.autoPullChart', label: 'Auto-pull from patient chart', desc: 'Pre-populate encounter from chart data', enabled: true },
      { id: 'p.enc.autoPullPrev', label: 'Auto-pull from previous encounter', desc: 'Carry forward findings & A&P', enabled: true },
      { id: 'p.enc.aiScribe', label: 'AI Scribe helper tab', desc: 'Suggested presets and language', enabled: true },
      { id: 'p.enc.signMobile', label: 'Sign-on-mobile signature pad', desc: 'Touch signature capture', enabled: false },
    ]},
    { section: 'Workflows', items: [
      { id: 'p.wf.eRx', label: 'E-Prescribe', desc: 'Outbound electronic prescription', enabled: true },
      { id: 'p.wf.medsReduction', label: 'Meds Reduction', desc: 'Gradual reduction tracking', enabled: true },
      { id: 'p.wf.flaggedVitals', label: 'Flagged Vitals', desc: 'Out-of-range vitals review', enabled: true },
      { id: 'p.wf.rth', label: 'High-Risk RTH', desc: 'Return-to-Hospital risk list', enabled: true },
    ]},
    { section: 'Metrics', items: [
      { id: 'p.met.wRvu', label: 'W-RVU Performance trends', desc: '', enabled: true },
      { id: 'p.met.rth', label: 'Return-to-Hospital trends', desc: '', enabled: true },
      { id: 'p.met.modifiers', label: 'Missing CPT Modifiers report', desc: '', enabled: true },
    ]},
  ],
  Scribe: [
    { section: 'Dashboard', items: [
      { id: 's.dash.stickyNotes', label: 'Sticky Notes section', desc: '', enabled: true },
      { id: 's.dash.activeEnc', label: 'Active Encounters list', desc: 'Continue working in-flight notes', enabled: true },
    ]},
    { section: 'Encounters', items: [
      { id: 's.enc.viewOthers', label: 'Toggle: Display only assigned to me', desc: 'Allow scribes to see others\' queues', enabled: true },
      { id: 's.enc.acceptReturn', label: 'Accept / Return assignments', desc: '', enabled: true },
      { id: 's.enc.aiScribe', label: 'AI Scribe helper tab', desc: '', enabled: true },
    ]},
    { section: 'Calendar', items: [
      { id: 's.cal.calendar', label: 'Calendar', desc: 'Actual calendar view with provider shifts and facility coverage.', enabled: true },
      { id: 's.cal.templates', label: 'Templates', desc: 'Reusable shift templates for the provider shift calendar.', enabled: true },
    ]},
    { section: 'Performance', items: [
      { id: 's.perf.earnings', label: 'Earnings panel', desc: 'Show personal compensation breakdown', enabled: true },
      { id: 's.perf.qualityMetrics', label: 'Quality metrics', desc: 'Acceptance rate, edits, kickbacks', enabled: true },
      { id: 's.perf.speedTrends', label: 'Speed trends graph', desc: 'Time-to-start and time-to-complete', enabled: true },
    ]},
  ],
  Clerk: [
    { section: 'Dashboard', items: [
      { id: 'c.dash.stickyNotes', label: 'Sticky Notes section', desc: '', enabled: true },
      { id: 'c.dash.docsReceived', label: 'Documents Received tile', desc: '', enabled: true },
      { id: 'c.dash.visitCandidates', label: 'Visit Candidates', desc: "System-generated list of patients who are candidates for a provider's visit for the day.", enabled: true },
    ]},
    { section: 'Encounters', items: [
      { id: 'c.enc.bulkAssign', label: 'Bulk assign encounters', desc: '', enabled: true },
      { id: 'c.enc.reassign', label: 'Re-assign across scribes', desc: '', enabled: true },
    ]},
    { section: 'Calendar', items: [
      { id: 'c.cal.addShift', label: 'Add Shift control', desc: 'Allow clerks to add provider shifts', enabled: true },
      { id: 'c.cal.templates', label: 'Templates editor', desc: '', enabled: true },
    ]},
    { section: 'Workflows', items: [
      { id: 'c.wf.medDocs', label: 'Medical Documents inbox', desc: '', enabled: true },
      { id: 'c.wf.discharge', label: 'Discharge Requests', desc: '', enabled: true },
    ]},
    { section: 'Directory', items: [
      { id: 'c.dir.addContact', label: 'Add custom contacts', desc: '', enabled: true },
    ]},
  ],
};

// Compensation — scribe rates
const COMPENSATION_RULES = [
  { id: 'r1', name: 'Standard Note · Medicine', noteType: 'Standard', specialty: 'Internal Medicine', rate: 12.50, bonus: 0, active: true },
  { id: 'r2', name: 'Complex Admission H&P', noteType: 'Admission H&P', specialty: 'All', rate: 22.00, bonus: 3.00, active: true, bonusReason: 'Multi-system, ≥10 problems' },
  { id: 'r3', name: 'Discharge Summary', noteType: 'Discharge', specialty: 'All', rate: 16.00, bonus: 0, active: true },
  { id: 'r4', name: 'Wound Care · Specialty', noteType: 'Standard', specialty: 'Wound Care', rate: 14.50, bonus: 1.50, active: true, bonusReason: 'Dressing change documentation' },
  { id: 'r5', name: 'ACP / Advance Care Planning', noteType: 'Specialty', specialty: 'All', rate: 18.00, bonus: 0, active: true },
  { id: 'r6', name: 'SVAF / Annual Wellness', noteType: 'Specialty', specialty: 'All', rate: 17.00, bonus: 0, active: false },
];

// Onboarding flow steps
const ONBOARDING_STEPS = [
  { id: 'invite', label: 'Email invitation', icon: 'mail', enabled: true, required: true },
  { id: 'verify', label: 'Verify email', icon: 'check', enabled: true, required: true },
  { id: 'password', label: 'Set password', icon: 'lock', enabled: true, required: true },
  { id: 'mfa', label: 'Enable two-factor auth', icon: 'shield', enabled: true, required: false },
  { id: 'profile', label: 'Complete profile', icon: 'user', enabled: true, required: true },
  { id: 'facilities', label: 'Confirm facility access', icon: 'facility', enabled: true, required: true },
  { id: 'tour', label: 'Onboarding Slideshow', icon: 'play', enabled: true, required: false },
];

// Audit log
const AUDIT_ENTRIES = [
  { id: 'a1', when: 'Today 10:42', who: 'Sarah Avila', action: 'Updated permission', target: '"Sign on another provider\'s behalf" → Scribe: denied', tone: 'warn' },
  { id: 'a2', when: 'Today 09:18', who: 'Sarah Avila', action: 'Created user', target: 'Brianna Lopez · Clerk · Niles Care Center', tone: 'info' },
  { id: 'a3', when: 'Today 08:05', who: 'System', action: 'Notification rule', target: 'Billing rejection alerts: Email enabled for Provider', tone: 'info' },
  { id: 'a4', when: 'Yesterday 17:23', who: 'Sarah Avila', action: 'Compensation rule', target: 'Standard Note · Medicine: $12.00 → $12.50', tone: 'success' },
  { id: 'a5', when: 'Yesterday 16:41', who: 'Sarah Avila', action: 'Suspended user', target: 'Dr. Harold Greene · reason: HR review', tone: 'danger' },
  { id: 'a6', when: 'Yesterday 14:02', who: 'Sarah Avila', action: 'Toggled feature', target: 'Provider · Sign-on-mobile signature pad: OFF', tone: 'warn' },
  { id: 'a7', when: 'Apr 25 11:30', who: 'Sarah Avila', action: 'Assigned roles', target: 'Kenji Watanabe + Clerk (now Scribe + Clerk)', tone: 'info' },
  { id: 'a8', when: 'Apr 25 09:11', who: 'System', action: 'Login from new device', target: 'Marcus Reyes · iOS · San Francisco', tone: 'neutral' },
  { id: 'a9', when: 'Apr 24 15:55', who: 'Sarah Avila', action: 'Onboarding flow', target: 'Scribe template · added "MFA setup" step', tone: 'success' },
  { id: 'a10', when: 'Apr 24 10:09', who: 'Sarah Avila', action: 'Portal config', target: 'Scribe · Earnings panel: ON', tone: 'success' },
];

// Notification rules — admin matrix (extends sitewide CSV)
const NOTIFICATION_RULES = {
  'Super Admin': [
    { event: 'New user created', desc: 'When any admin creates a new user.', inApp: true, email: true },
    { event: 'User suspended or deleted', desc: 'When a user account is removed from the system.', inApp: true, email: true },
    { event: 'Role / permission changed', desc: 'When a role definition or permission is modified.', inApp: true, email: true },
    { event: 'Sensitive permission granted', desc: 'When a sensitive capability is added to a role.', inApp: true, email: true },
    { event: 'Compensation rule updated', desc: 'When a per-note rate or bonus is changed.', inApp: true, email: true },
    { event: 'Portal feature toggled', desc: 'When a feature flag flips ON or OFF.', inApp: true, email: false },
    { event: 'Failed login spike', desc: 'When > 5 failed logins occur on one account in 10 min.', inApp: true, email: true },
    { event: 'New device login (admin)', desc: 'When a Super Admin signs in from an unrecognized device.', inApp: true, email: true },
    { event: 'Audit log export', desc: 'When the audit log is exported.', inApp: true, email: true },
    { event: 'Onboarding stuck', desc: 'When an invited user has not completed onboarding in 7 days.', inApp: true, email: false },
    { event: 'Facility added / removed', desc: 'When the facility roster changes.', inApp: true, email: false },
    { event: 'Billing rejection volume high', desc: 'When billing rejections exceed threshold for any provider.', inApp: true, email: true },
    { event: 'Scribe queue backlog', desc: 'When unassigned encounter count crosses threshold.', inApp: true, email: false },
    { event: 'High-Risk RTH cluster', desc: 'When > N high-risk patients appear at one facility in 24 h.', inApp: true, email: true },
    { event: 'System alerts & updates', desc: 'Portal maintenance, feature updates, general alerts.', inApp: true, email: true },
  ],
};

Object.assign(window, {
  FACILITIES, USERS, PERMISSIONS, ROLES, DEFAULT_PERMISSIONS, HEADER_NOTIFICATIONS,
  PORTAL_FEATURES, COMPENSATION_RULES, ONBOARDING_STEPS,
  AUDIT_ENTRIES, NOTIFICATION_RULES,
});
