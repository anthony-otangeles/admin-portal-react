export type RoleKey = 'Super Admin' | 'Provider' | 'Scribe' | 'Clerk';
export type UserStatus = 'active' | 'invited' | 'suspended';

export interface Facility {
  id: string; name: string; short: string; region: string; address: string; beds: number;
}
export interface User {
  id: string; name: string; email: string; initials: string;
  roles: RoleKey[]; dept: string; spec: string; phone: string;
  status: UserStatus; facilities: string[]; lastActive: string; mfa: boolean; joined: string;
}
export interface AuditEntry {
  id: string; when: string; who: string; action: string; target: string;
  tone: 'warn' | 'success' | 'danger' | 'info' | 'neutral';
}
export interface Notification {
  id: string; kind: string; title: string; who: string; verb: string;
  enc: string; when: string; unread: boolean; body?: string;
}

export const FACILITIES: Facility[] = [
  { id: 'f1', name: 'Niles Care Center', short: 'Niles', region: 'Niles, IL', address: '8333 W Golf Rd, Niles, IL 60714', beds: 142 },
  { id: 'f2', name: 'Brickyard Healthcare - Merrillville Care Center', short: 'Brickyard MV', region: 'Merrillville, IN', address: '8401 Broadway, Merrillville, IN 46410', beds: 118 },
  { id: 'f3', name: 'Brickyard Healthcare - Elkhart Care Center', short: 'Brickyard EK', region: 'Elkhart, IN', address: '2600 Toledo Rd, Elkhart, IN 46516', beds: 96 },
  { id: 'f4', name: 'Casa of Hobart', short: 'Casa Hobart', region: 'Hobart, IN', address: '700 E 8th St, Hobart, IN 46342', beds: 88 },
];

export const USERS: User[] = [
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

export const ROLES: RoleKey[] = ['Super Admin', 'Provider', 'Scribe', 'Clerk'];
export const ASSIGNABLE_ROLES: RoleKey[] = ['Provider', 'Scribe', 'Clerk'];

export const ROLE_TONES: Record<string, { bg: string; fg: string; solid: string }> = {
  'Super Admin': { bg: '#F5F2FD', fg: '#67568C', solid: '#845EC2' },
  'Provider':    { bg: '#E6F3FB', fg: '#0081CF', solid: '#0081CF' },
  'Scribe':      { bg: '#E7F5EF', fg: '#29BB89', solid: '#00C9A7' },
  'Clerk':       { bg: '#FFF8E6', fg: '#B58420', solid: '#E9C05F' },
};

export const ROLE_DESCRIPTIONS: Record<string, string> = {
  'Super Admin': 'Full administrative access. Can manage every user, role, portal feature, and audit data.',
  'Provider':    'Clinicians who write and sign encounters. Owns the patient relationship.',
  'Scribe':      'Documents encounters on behalf of providers; cannot sign.',
  'Clerk':       'Operations role; admissions, scheduling, document routing, discharge requests.',
};

export interface PermissionCapability {
  id: string;
  label: string;
  description?: string;
  roles?: RoleKey[];
  sensitive?: boolean;
  collapsible?: boolean;
  children?: PermissionCapability[];
}

export interface PermissionArea {
  area: string;
  icon: string;
  capabilities: PermissionCapability[];
}

const ALL_PORTAL_ROLES: RoleKey[] = ['Provider', 'Scribe', 'Clerk'];
const PROVIDER_ONLY: RoleKey[] = ['Provider'];
const PROVIDER_AND_SCRIBE: RoleKey[] = ['Provider', 'Scribe'];
const PROVIDER_AND_CLERK: RoleKey[] = ['Provider', 'Clerk'];
const CLERK_ONLY: RoleKey[] = ['Clerk'];

export const PERMISSIONS: PermissionArea[] = [
  { area: 'Encounters', icon: 'fileText', capabilities: [
    { id: 'enc.view', label: 'View an Encounter', description: 'See encounter details from queues, lists, and patient context.', roles: ALL_PORTAL_ROLES },
    { id: 'enc.add', label: 'Add an Encounter', description: 'Create a new encounter for a patient.', roles: PROVIDER_AND_CLERK },
    { id: 'enc.assignToScribe', label: 'Assign an Encounter to a Scribe', description: 'Route an encounter into a scribe queue.', roles: CLERK_ONLY },
    { id: 'enc.bulkAssign', label: 'Bulk Assign Encounters', description: 'Select and assign multiple encounters at once.', roles: CLERK_ONLY },
    { id: 'enc.start', label: 'Start an Encounter', description: 'Begin work on an encounter.', roles: PROVIDER_AND_SCRIBE },
    { id: 'enc.editWrite', label: 'Edit or Write an Encounter', description: 'Edit encounter content and write documentation sections.', roles: PROVIDER_AND_SCRIBE },
    { id: 'enc.returnRevision', label: 'Return an Encounter for Revision', description: 'Send documentation back for correction or completion.', roles: PROVIDER_ONLY },
    { id: 'enc.startQa', label: 'Start QA for an Encounter', description: 'Begin quality review for an encounter.', roles: PROVIDER_AND_SCRIBE },
    { id: 'enc.review', label: 'Review an Encounter', description: 'Review encounter documentation, status, and supporting details.', roles: ALL_PORTAL_ROLES },
    { id: 'enc.sign', label: 'Sign an Encounter', description: 'Apply a provider signature to finalize an encounter.', roles: PROVIDER_ONLY },
    { id: 'enc.delete', label: 'Delete an Encounter', description: 'Remove an encounter from the active record.', roles: PROVIDER_AND_SCRIBE, sensitive: true },
  ]},
  { area: 'Patients', icon: 'users', capabilities: [
    { id: 'pt.add', label: 'Add a Patient', description: 'Create a new patient record.', roles: PROVIDER_AND_CLERK },
    { id: 'pt.addDischargeRequest', label: 'Add a Discharge Request for a Patient', description: 'Create a discharge request from the patient record.', roles: PROVIDER_AND_CLERK },
    { id: 'pt.interactions', label: 'Interactions', description: 'Patient interaction actions grouped by surface.', collapsible: true, children: [
      { id: 'pt.interactions.encounters', label: 'Encounters', description: 'Encounter actions available from patient interactions.', children: [
        { id: 'pt.interactions.encounters.add', label: 'Add an Encounter', description: 'Create an encounter from the patient interactions panel.', roles: PROVIDER_AND_CLERK },
      ]},
      { id: 'pt.interactions.schedules', label: 'Schedules', description: 'Scheduling actions available from patient interactions.', children: [
        { id: 'pt.interactions.schedules.add', label: 'Add a Schedule', description: 'Create a patient schedule entry.', roles: PROVIDER_AND_CLERK },
      ]},
    ]},
    { id: 'pt.chart', label: 'Patient Chart', description: 'Patient chart editing permissions.', collapsible: true, children: [
      { id: 'pt.chart.general', label: 'Add/Edit General', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.contacts', label: 'Add/Edit Contacts', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.history', label: 'Add/Edit History', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.vitals', label: 'Add/Edit Vitals', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.labResults', label: 'Add/Edit Lab Results', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.medications', label: 'Add/Edit Medications', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.problems', label: 'Add/Edit Problems', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.reviewOfSystems', label: 'Add/Edit Review of Systems', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.physicalExam', label: 'Add/Edit Physical Exam', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.adtRecords', label: 'Add/Edit ADT Records', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.allergies', label: 'Add/Edit Allergies', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.immunizations', label: 'Add/Edit Immunizations', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.skinWound', label: 'Add/Edit Skin / Wound', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.advancedDirectives', label: 'Add/Edit Advanced Directives', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.coverageInfo', label: 'Add/Edit Coverage Info', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.careTeam', label: 'Add/Edit Care Team', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.progressNotes', label: 'Add/Edit Progress Notes', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.carePlan', label: 'Add/Edit Care Plan', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.patientPortal', label: 'Add/Edit Patient Portal', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.assessments', label: 'Add/Edit Assessments', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.attachments', label: 'Add/Edit Attachments', roles: ALL_PORTAL_ROLES },
      { id: 'pt.chart.scheduleAudits', label: 'Add/Edit Schedule Audits', roles: ALL_PORTAL_ROLES },
    ]},
  ]},
  { area: 'Schedules', icon: 'clock', capabilities: [
    { id: 'sched.patientSchedule', label: 'Patient Schedule', description: 'Patient schedule actions and encounter generation.', collapsible: true, children: [
      { id: 'sched.patientSchedule.add', label: 'Add a Schedule', description: 'Create a patient schedule entry.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.patientSchedule.followUp', label: 'Schedule a Follow-up Visit', description: 'Schedule a follow-up visit from the patient schedule.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.patientSchedule.generateEncounters', label: 'Generate Encounters', description: 'Generate encounters from selected patient schedules.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.patientSchedule.addEncounter', label: 'Add Encounter', description: 'Create an encounter from this patient schedule.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.patientSchedule.update', label: 'Update Schedule', description: 'Edit patient schedule details.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.patientSchedule.dismiss', label: 'Dismiss', description: 'Dismiss the patient schedule.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.patientSchedule.bulkDismiss', label: 'Bulk Dismiss', description: 'Select and dismiss multiple patient schedules at once.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.patientSchedule.restore', label: 'Restore', description: 'Restore a dismissed patient schedule.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.patientSchedule.delete', label: 'Delete', description: 'Delete the patient schedule.', roles: PROVIDER_AND_CLERK },
    ]},
    { id: 'sched.missedRegVisits', label: 'Missed Reg. Visits', description: 'Missed regulatory visit scheduling actions.', collapsible: true, children: [
      { id: 'sched.missedRegVisits.add', label: 'Add a Schedule', description: 'Create a schedule entry for a missed regulatory visit.', roles: PROVIDER_AND_CLERK },
      { id: 'sched.missedRegVisits.followUp', label: 'Schedule a Follow-up Visit', description: 'Schedule a follow-up visit for a missed regulatory visit.', roles: PROVIDER_AND_CLERK },
    ]},
  ]},
  { area: 'Calendar', icon: 'calendar', capabilities: [
    { id: 'cal.addShifts', label: 'Add Shifts', description: 'Create provider shift entries on the calendar.', roles: CLERK_ONLY },
    { id: 'cal.createCalendarTemplate', label: 'Create Calendar Template', description: 'Create reusable calendar templates for provider shifts.', roles: CLERK_ONLY },
  ]},
  { area: 'Workflows', icon: 'workflow', capabilities: [
    { id: 'wf.medDocs.identifyRoute', label: 'Identify and Route Medical Documents', description: 'Classify incoming medical documents and route them to the right queue.', roles: CLERK_ONLY },
    { id: 'wf.medDocs.markReviewed', label: 'Mark Medical Documents as Reviewed', description: 'Mark routed medical documents as reviewed.', roles: PROVIDER_ONLY },
    { id: 'wf.discharge.manage', label: 'Authorize, Hold/Decline, Restore, or Delete a Discharge Request', description: 'Manage discharge request decisions and lifecycle actions.', roles: PROVIDER_AND_CLERK },
    { id: 'wf.ePrescribe.manageOrders', label: 'Order Medication, View Order, Reorder, Delete, or Edit Existing E-Prescribe Orders', description: 'Manage medication ordering actions in E-Prescribe.', roles: PROVIDER_ONLY },
    { id: 'wf.medsReduction.manage', label: 'Update, Discontinue, or Delete a Medication for Reduction', description: 'Manage medication reduction changes.', roles: PROVIDER_ONLY },
    { id: 'wf.flaggedVitals.reviewIntervene', label: 'Review and Intervene on Flagged Vitals', description: 'Review flagged vitals and record interventions.', roles: PROVIDER_ONLY },
    { id: 'wf.diagnostics.markReviewed', label: 'View and Mark Diagnostic/Imaging Results as Reviewed', description: 'Review diagnostic or imaging results and mark them reviewed.', roles: PROVIDER_ONLY },
    { id: 'wf.highRiskRth.reviewIntervene', label: 'Review and Intervene on High-Risk RTH', description: 'Review high-risk return-to-hospital cases and record interventions.', roles: PROVIDER_ONLY },
  ]},
];

export function flattenPermissionCapabilities(capabilities: PermissionCapability[]): PermissionCapability[] {
  return capabilities.flatMap(capability => (
    capability.children ? flattenPermissionCapabilities(capability.children) : [capability]
  ));
}

export const DEFAULT_PERMISSIONS: Record<string, Record<string, boolean>> = (() => {
  const m: Record<string, Record<string, boolean>> = {};
  PERMISSIONS
    .flatMap(area => flattenPermissionCapabilities(area.capabilities))
    .forEach(capability => {
      m[capability.id] = { 'Super Admin': true, 'Provider': false, 'Scribe': false, 'Clerk': false };
      capability.roles?.forEach(role => { m[capability.id][role] = true; });
    });
  return m;
})();

export interface PortalFeatureItem {
  id: string;
  label: string;
  desc: string;
  enabled: boolean;
  toggleable?: boolean;
  collapsible?: boolean;
  defaultOpen?: boolean;
  children?: PortalFeatureItem[];
}

export interface PortalFeatureSection {
  section: string;
  enabled: boolean;
  toggleable?: boolean;
  items: PortalFeatureItem[];
}

const PATIENT_FEATURES: PortalFeatureItem[] = [
  { id: 'patients.toolbar', label: 'Patient Table Toolbar', desc: 'Facility selector, patient counter, search, and filters for the patient list.', enabled: true },
  { id: 'patients.listTable', label: 'Patient List Table', desc: 'Sortable patient roster with demographics, facility, admission status, and care context.', enabled: true },
  {
    id: 'patients.overview',
    label: 'Patient Overview',
    desc: 'Summary surface for demographics, current stay, interactions, and chart access.',
    enabled: true,
    toggleable: false,
    children: [
      {
        id: 'patients.overview.interactions',
        label: 'Interactions',
        desc: 'Shows patient-specific activity and scheduled touchpoints.',
        enabled: true,
        collapsible: true,
        children: [
          { id: 'patients.overview.interactions.encounters', label: 'Encounters', desc: 'Encounter history and active documentation tied to the patient.', enabled: true },
          { id: 'patients.overview.interactions.schedules', label: 'Patient Schedules', desc: 'Upcoming and historical patient schedule entries.', enabled: true },
        ],
      },
      {
        id: 'patients.overview.chart',
        label: 'Patient Chart',
        desc: 'Clinical chart tabs available from the patient overview.',
        enabled: true,
        collapsible: true,
        children: [
          { id: 'patients.chart.general', label: 'General', desc: 'Core demographics and primary patient identifiers.', enabled: true },
          { id: 'patients.chart.contacts', label: 'Contacts', desc: 'Responsible parties, family contacts, and communication preferences.', enabled: true },
          { id: 'patients.chart.history', label: 'History', desc: 'Relevant medical, surgical, social, and family history.', enabled: true },
          { id: 'patients.chart.vitals', label: 'Vitals', desc: 'Recent and historical vital-sign records.', enabled: true },
          { id: 'patients.chart.labResults', label: 'Lab Results', desc: 'Completed and pending lab result summaries.', enabled: true },
          { id: 'patients.chart.medications', label: 'Medications', desc: 'Active medication list and medication history.', enabled: true },
          { id: 'patients.chart.problems', label: 'Problems', desc: 'Active and resolved problem list.', enabled: true },
          { id: 'patients.chart.ros', label: 'Review of Systems', desc: 'Documented review of systems details.', enabled: true },
          { id: 'patients.chart.physicalExam', label: 'Physical Exam', desc: 'Physical exam findings and reusable exam documentation.', enabled: true },
          { id: 'patients.chart.adtRecords', label: 'ADT Records', desc: 'Admission, discharge, and transfer records.', enabled: true },
          { id: 'patients.chart.allergies', label: 'Allergies', desc: 'Allergy list, reactions, and severity details.', enabled: true },
          { id: 'patients.chart.immunizations', label: 'Immunizations', desc: 'Immunization status and vaccine history.', enabled: true },
          { id: 'patients.chart.skinWound', label: 'Skin / Wound', desc: 'Skin assessments, wound details, and related follow-up.', enabled: true },
          { id: 'patients.chart.advancedDirectives', label: 'Advanced Directives', desc: 'Code status, directives, and decision-maker documentation.', enabled: true },
          { id: 'patients.chart.coverageInfo', label: 'Coverage Info', desc: 'Insurance, payer, and coverage information.', enabled: true },
          { id: 'patients.chart.careTeam', label: 'Care Team', desc: 'Assigned provider, facility staff, and care coordination contacts.', enabled: true },
          { id: 'patients.chart.progressNotes', label: 'Progress Notes', desc: 'Clinical progress notes and documentation history.', enabled: true },
          { id: 'patients.chart.carePlan', label: 'Care Plan', desc: 'Goals, interventions, and care plan updates.', enabled: true },
          { id: 'patients.chart.patientPortal', label: 'Patient Portal', desc: 'Portal access status and patient-facing communication details.', enabled: true },
          { id: 'patients.chart.assessments', label: 'Assessments', desc: 'Clinical assessments, scores, and screening outputs.', enabled: true },
          { id: 'patients.chart.attachments', label: 'Attachments', desc: 'Uploaded documents, images, and supporting files.', enabled: true },
          { id: 'patients.chart.scheduleAudits', label: 'Schedule Audits', desc: 'Schedule change history and audit details.', enabled: true },
        ],
      },
    ],
  },
];

const cloneFeatureItems = (portal: string, items: PortalFeatureItem[], enabledOverride?: boolean): PortalFeatureItem[] =>
  items.map(item => ({
    ...item,
    id: `${portal}.${item.id}`,
    enabled: enabledOverride ?? item.enabled,
    children: item.children ? cloneFeatureItems(portal, item.children, enabledOverride) : undefined,
  }));

const patientFeatures = (portal: string): PortalFeatureItem[] => cloneFeatureItems(portal, PATIENT_FEATURES);

const SCHEDULE_FEATURES: PortalFeatureItem[] = [
  { id: 'schedules.patientSchedule', label: 'Patient Schedule', desc: 'Patient-level schedule view for visits, appointments, and planned follow-up.', enabled: true },
  { id: 'schedules.missedRegulatoryVisits', label: 'Missed Regulatory Visits', desc: 'Tracks required regulatory visits that were missed or still need completion.', enabled: true },
];

const CALENDAR_FEATURES: PortalFeatureItem[] = [
  { id: 'calendar.calendar', label: 'Calendar', desc: 'Actual calendar view with provider shifts and facility coverage.', enabled: true },
  { id: 'calendar.templates', label: 'Templates', desc: 'Reusable shift templates for the provider shift calendar.', enabled: true },
];

const WORKFLOW_FEATURES: PortalFeatureItem[] = [
  { id: 'workflows.medicalDocuments', label: 'Medical Documents', desc: 'Receive, identify, and route incoming medical documents.', enabled: true },
  { id: 'workflows.dischargeRequests', label: 'Discharge Requests', desc: 'Initiate, review, and track discharge request workflows.', enabled: true },
  { id: 'workflows.ePrescribe', label: 'E-Prescribe', desc: 'Outbound electronic prescription workflow.', enabled: true },
  { id: 'workflows.medsReduction', label: 'Meds Reduction', desc: 'Gradual medication reduction tracking and follow-up.', enabled: true },
  { id: 'workflows.flaggedVitals', label: 'Flagged Vitals', desc: 'Out-of-range vital sign review queue.', enabled: true },
  { id: 'workflows.labResults', label: 'Lab Results', desc: 'Lab result review and follow-up workflow.', enabled: true },
  { id: 'workflows.highRiskRth', label: 'High-Risk RTH', desc: 'Return-to-hospital risk list and escalation workflow.', enabled: true },
];

const workflowFeatures = (portal: string, enabled: 'all' | 'none' | string[]): PortalFeatureItem[] =>
  WORKFLOW_FEATURES.map(item => ({
    ...item,
    id: `${portal}.${item.id}`,
    enabled: enabled === 'all' || (Array.isArray(enabled) && enabled.includes(item.id)),
  }));

const METRIC_FEATURES: PortalFeatureItem[] = [
  { id: 'metrics.providerWrvu', label: 'Provider W-RVU Performance', desc: 'Provider productivity and W-RVU trend view.', enabled: true },
  { id: 'metrics.providerRth', label: 'Provider Return-to-Hospital', desc: 'Provider return-to-hospital trends and risk movement.', enabled: true },
  { id: 'metrics.providerOpenEncounters', label: 'Provider Open Encounters', desc: 'Open encounter counts and aging by provider.', enabled: true },
  { id: 'metrics.missingCorrectCptModifiers', label: 'Missing Correct CPT Modifiers', desc: 'Flags encounters with missing or incorrect CPT modifier details.', enabled: true },
];

const MY_PERFORMANCE_FEATURES: PortalFeatureItem[] = [
  { id: 'myPerformance.statTiles', label: 'Stat Tiles', desc: 'At-a-glance scribe performance totals.', enabled: true },
  { id: 'myPerformance.earningsProductivity', label: 'Earnings & Productivity', desc: 'Earnings, completed notes, and productivity summary.', enabled: true },
  { id: 'myPerformance.speedTrends', label: 'Speed Trends', desc: 'Time-to-start and time-to-complete trends.', enabled: true },
  { id: 'myPerformance.sectionBreakdown', label: 'Section Breakdown', desc: 'Documentation output broken down by note section.', enabled: true },
  { id: 'myPerformance.qualityMetrics', label: 'Quality Metrics', desc: 'Acceptance rate, edits, and returned-note quality signals.', enabled: true },
];

const DIRECTORY_FEATURES: PortalFeatureItem[] = [
  { id: 'directory.directory', label: 'Directory', desc: 'Facility contacts, providers, and custom contact entries.', enabled: true },
];

const PROVIDER_SETTINGS: PortalFeatureItem[] = [
  { id: 'settings.profile', label: 'Profile', desc: 'Provider profile and account details.', enabled: true },
  { id: 'settings.workAssignments', label: 'Work Assignments', desc: 'Facility coverage and assigned work preferences.', enabled: true },
  {
    id: 'settings.encounters',
    label: 'Encounters',
    desc: 'Encounter defaults and documentation preferences.',
    enabled: true,
    children: [
      { id: 'settings.encounters.autoPullChart', label: 'Auto-Pull from Patient Chart', desc: 'Pre-populate encounter sections from available patient chart data.', enabled: true },
      { id: 'settings.encounters.autoPullPrevious', label: 'Auto-Pull from Previous Encounter', desc: 'Carry forward relevant details from the patient\'s prior encounter.', enabled: true },
    ],
  },
  { id: 'settings.notifications', label: 'Notifications', desc: 'Provider notification delivery preferences.', enabled: true },
  {
    id: 'settings.security',
    label: 'Security',
    desc: 'Password, sessions, and authentication settings.',
    enabled: true,
    children: [
      { id: 'settings.security.changePassword', label: 'Change Password', desc: 'Allow users to update their account password.', enabled: true },
      { id: 'settings.security.twoFactorAuthentication', label: 'Two-Factor Authentication', desc: 'Allow users to manage two-factor authentication setup.', enabled: true },
      { id: 'settings.security.activeSessions', label: 'Active Sessions', desc: 'Show currently active devices and session controls.', enabled: true },
    ],
  },
  {
    id: 'settings.preferences',
    label: 'Preferences',
    desc: 'Display, workflow, and portal preferences.',
    enabled: true,
    children: [
      { id: 'settings.preferences.workspaceDefaults', label: 'Workspace Defaults', desc: 'Default facility, metrics range, and workspace startup options.', enabled: true },
      { id: 'settings.preferences.timeSettings', label: 'Time Settings', desc: 'Time format and related scheduling display preferences.', enabled: true },
      { id: 'settings.preferences.displayZoom', label: 'Display Zoom', desc: 'Interface density and zoom preferences for the portal.', enabled: true },
    ],
  },
  { id: 'settings.signature', label: 'Signature', desc: 'Provider signature settings for signed encounters.', enabled: true },
];

const SCRIBE_SETTINGS: PortalFeatureItem[] = [
  { id: 'settings.profile', label: 'Profile', desc: 'Scribe profile and account details.', enabled: true },
  { id: 'settings.workAssignments', label: 'Work Assignments', desc: 'Assigned providers, facilities, and work queue defaults.', enabled: true },
  {
    id: 'settings.encounters',
    label: 'Encounters',
    desc: 'Encounter documentation preferences.',
    enabled: true,
    children: [
      { id: 'settings.encounters.autoPullChart', label: 'Auto-Pull from Patient Chart', desc: 'Pre-populate encounter sections from available patient chart data.', enabled: true },
      { id: 'settings.encounters.autoPullPrevious', label: 'Auto-Pull from Previous Encounter', desc: 'Carry forward relevant details from the patient\'s prior encounter.', enabled: true },
    ],
  },
  { id: 'settings.notifications', label: 'Notifications', desc: 'Scribe notification delivery preferences.', enabled: true },
  {
    id: 'settings.security',
    label: 'Security',
    desc: 'Password, sessions, and authentication settings.',
    enabled: true,
    children: [
      { id: 'settings.security.changePassword', label: 'Change Password', desc: 'Allow users to update their account password.', enabled: true },
      { id: 'settings.security.twoFactorAuthentication', label: 'Two-Factor Authentication', desc: 'Allow users to manage two-factor authentication setup.', enabled: true },
      { id: 'settings.security.activeSessions', label: 'Active Sessions', desc: 'Show currently active devices and session controls.', enabled: true },
    ],
  },
  {
    id: 'settings.preferences',
    label: 'Preferences',
    desc: 'Display, workflow, and portal preferences.',
    enabled: true,
    children: [
      { id: 'settings.preferences.workspaceDefaults', label: 'Workspace Defaults', desc: 'Default facility, metrics range, and workspace startup options.', enabled: true },
      { id: 'settings.preferences.timeSettings', label: 'Time Settings', desc: 'Time format and related scheduling display preferences.', enabled: true },
      { id: 'settings.preferences.displayZoom', label: 'Display Zoom', desc: 'Interface density and zoom preferences for the portal.', enabled: true },
    ],
  },
];

const CLERK_SETTINGS: PortalFeatureItem[] = [
  { id: 'settings.profile', label: 'Profile', desc: 'Clerk profile and account details.', enabled: true },
  { id: 'settings.workAssignments', label: 'Work Assignments', desc: 'Facility coverage and operational assignment preferences.', enabled: true },
  { id: 'settings.notifications', label: 'Notifications', desc: 'Clerk notification delivery preferences.', enabled: true },
  {
    id: 'settings.security',
    label: 'Security',
    desc: 'Password, sessions, and authentication settings.',
    enabled: true,
    children: [
      { id: 'settings.security.changePassword', label: 'Change Password', desc: 'Allow users to update their account password.', enabled: true },
      { id: 'settings.security.twoFactorAuthentication', label: 'Two-Factor Authentication', desc: 'Allow users to manage two-factor authentication setup.', enabled: true },
      { id: 'settings.security.activeSessions', label: 'Active Sessions', desc: 'Show currently active devices and session controls.', enabled: true },
    ],
  },
  {
    id: 'settings.preferences',
    label: 'Preferences',
    desc: 'Display, workflow, and portal preferences.',
    enabled: true,
    children: [
      { id: 'settings.preferences.workspaceDefaults', label: 'Workspace Defaults', desc: 'Default facility, metrics range, and workspace startup options.', enabled: true },
      { id: 'settings.preferences.timeSettings', label: 'Time Settings', desc: 'Time format and related scheduling display preferences.', enabled: true },
      { id: 'settings.preferences.displayZoom', label: 'Display Zoom', desc: 'Interface density and zoom preferences for the portal.', enabled: true },
    ],
  },
];

export const PORTAL_FEATURES: Record<string, PortalFeatureSection[]> = {
  Provider: [
    { section: 'Dashboard', items: [
      { id: 'p.dash.admissionsTiles', label: 'Admissions & Discharge Tiles', desc: 'Purple stat tiles: New Admissions, Recent Discharge, Discharge Request', enabled: true },
      {
        id: 'p.dash.criticalAlerts',
        label: 'Critical Alerts & SLA Risk',
        desc: 'High-urgency panels for clinical follow-up and SLA-sensitive work.',
        enabled: true,
        children: [
          { id: 'p.dash.criticalAlerts.diagnosticResults', label: 'Diagnostic Results', desc: 'Flags new or abnormal diagnostic findings that need provider review.', enabled: true },
          { id: 'p.dash.criticalAlerts.recentVitals', label: 'Recent Vitals', desc: 'Shows latest vital-sign changes and abnormal readings from assigned facilities.', enabled: true },
          { id: 'p.dash.criticalAlerts.rthAlerts', label: 'RTH Alerts', desc: 'Highlights return-to-hospital risk signals and unresolved escalation warnings.', enabled: true },
          { id: 'p.dash.criticalAlerts.openEncounter', label: 'Open Encounter', desc: 'Shows open encounter volume needing review, documentation, or signature.', enabled: true },
        ],
      },
      {
        id: 'p.dash.clinicalWork',
        label: "Today's Clinical & Facility Work",
        desc: "Today's operational view for rounds, visits, and scheduled patient work.",
        enabled: true,
        children: [
          { id: 'p.dash.clinicalWork.facilitiesToVisit', label: 'Facilities to Visit', desc: "Lists facilities on the provider's route with visit priority and pending workload.", enabled: true },
          { id: 'p.dash.clinicalWork.patientSchedules', label: 'Patient Schedules', desc: 'Shows scheduled patient appointments, rounds, and visit windows for today.', enabled: true },
        ],
      },
      { id: 'p.dash.stickyNotes', label: 'Sticky Notes Section', desc: 'Capture key details and mental shortcuts for documentation flow', enabled: false },
    ], enabled: true, toggleable: true },
    { section: 'Encounter', items: [
      { id: 'p.enc.helperTab', label: 'Helper Tab', desc: 'Displays previous encounters for each section to support documentation continuity.', enabled: true },
      { id: 'p.enc.subHeader', label: 'Encounter Sub Header', desc: 'Encounter-level header with patient, facility, status, and assignment context.', enabled: true },
      { id: 'p.enc.queueListTable', label: 'Encounter Queue/List Table', desc: 'Queue table for open, assigned, returned, and signing-ready encounters.', enabled: true },
    ], enabled: true, toggleable: true },
    { section: 'Patients', items: patientFeatures('p'), enabled: true, toggleable: true },
    { section: 'Schedules', items: cloneFeatureItems('p', SCHEDULE_FEATURES), enabled: true, toggleable: true },
    { section: 'Calendar', items: cloneFeatureItems('p', CALENDAR_FEATURES), enabled: true, toggleable: true },
    { section: 'Workflows', items: workflowFeatures('p', 'all'), enabled: true, toggleable: true },
    { section: 'Metrics', items: cloneFeatureItems('p', METRIC_FEATURES), enabled: true, toggleable: true },
    { section: 'Directory', items: cloneFeatureItems('p', DIRECTORY_FEATURES, false), enabled: false, toggleable: true },
    { section: 'Settings', items: cloneFeatureItems('p', PROVIDER_SETTINGS), enabled: true, toggleable: true },
  ],
  Scribe: [
    { section: 'Dashboard', items: [
      { id: 's.dash.statsTiles', label: 'Stats Tiles', desc: 'Scheduled Today, Active Encounters, For Revision, In Billing', enabled: true },
      { id: 's.dash.todaySchedule', label: "Today's Schedule", desc: 'Next scheduled encounters with Accept / Return / Start actions', enabled: true },
      { id: 's.dash.activeEnc', label: 'Active Encounters List', desc: 'Continue working in-flight notes', enabled: true },
      { id: 's.dash.stickyNotes', label: 'Sticky Notes Section', desc: 'Capture key details and mental shortcuts for documentation flow', enabled: true },
    ], enabled: true, toggleable: true },
    { section: 'Encounter', items: [
      { id: 's.enc.helperTab', label: 'Helper Tab', desc: 'Displays previous encounters for each section to support documentation continuity while drafting.', enabled: true },
      { id: 's.enc.tableToolbar', label: 'Encounter Table Toolbar', desc: 'Facility selector, encounter counter, search, and filters for the encounter table.', enabled: true },
      { id: 's.enc.queueListTable', label: 'Encounter Queue/List Table', desc: 'Queue table for assigned, in-progress, returned, and ready-for-review encounters.', enabled: true },
    ], enabled: true, toggleable: true },
    { section: 'Patients', items: patientFeatures('s'), enabled: true, toggleable: true },
    { section: 'Schedules', items: cloneFeatureItems('s', SCHEDULE_FEATURES, false), enabled: false, toggleable: true },
    { section: 'Calendar', items: cloneFeatureItems('s', CALENDAR_FEATURES), enabled: true, toggleable: true },
    { section: 'My Performance', items: cloneFeatureItems('s', MY_PERFORMANCE_FEATURES), enabled: true, toggleable: true },
    { section: 'Workflows', items: workflowFeatures('s', 'none'), enabled: false, toggleable: true },
    { section: 'Directory', items: cloneFeatureItems('s', DIRECTORY_FEATURES, false), enabled: false, toggleable: true },
    { section: 'Settings', items: cloneFeatureItems('s', SCRIBE_SETTINGS), enabled: true, toggleable: true },
  ],
  Clerk: [
    { section: 'Dashboard', items: [
      { id: 'c.dash.admissionsTiles', label: 'Admissions & Discharge Tiles', desc: 'Purple stat tiles: New Admissions, Recent Discharge, Discharge Request', enabled: true },
      { id: 'c.dash.statsTiles', label: 'Stat Tiles', desc: 'Open Encounters, For Revision, In Billing, Documents Received, and Patients Admitted.', enabled: true },
      { id: 'c.dash.stickyNotes', label: 'Sticky Notes Section', desc: 'Capture key details and mental shortcuts for documentation flow', enabled: true },
    ], enabled: true, toggleable: true },
    { section: 'Encounter', items: [
      { id: 'c.enc.tableToolbar', label: 'Encounter Table Toolbar', desc: 'Facility selector, encounter counter, search, and filters for the encounter table.', enabled: true },
      { id: 'c.enc.queueListTable', label: 'Encounter Queue/List Table', desc: 'Queue table for unassigned, assigned, returned, and billing-ready encounters.', enabled: true },
    ], enabled: true, toggleable: true },
    { section: 'Patients', items: patientFeatures('c'), enabled: true, toggleable: true },
    { section: 'Schedules', items: cloneFeatureItems('c', SCHEDULE_FEATURES), enabled: true, toggleable: true },
    { section: 'Calendar', items: cloneFeatureItems('c', CALENDAR_FEATURES), enabled: true, toggleable: true },
    { section: 'Workflows', items: workflowFeatures('c', ['workflows.medicalDocuments', 'workflows.dischargeRequests']), enabled: true, toggleable: true },
    { section: 'Directory', items: cloneFeatureItems('c', DIRECTORY_FEATURES), enabled: true, toggleable: true },
    { section: 'Settings', items: cloneFeatureItems('c', CLERK_SETTINGS), enabled: true, toggleable: true },
  ],
};

export const COMPENSATION_RULES = [
  { id: 'r1', name: 'Standard Note · Medicine', noteType: 'Standard', specialty: 'Internal Medicine', rate: 12.50, bonus: 0, active: true },
  { id: 'r2', name: 'Complex Admission H&P', noteType: 'Admission H&P', specialty: 'All', rate: 22.00, bonus: 3.00, active: true, bonusReason: 'Multi-system, ≥10 problems' },
  { id: 'r3', name: 'Discharge Summary', noteType: 'Discharge', specialty: 'All', rate: 16.00, bonus: 0, active: true },
  { id: 'r4', name: 'Wound Care · Specialty', noteType: 'Standard', specialty: 'Wound Care', rate: 14.50, bonus: 1.50, active: true, bonusReason: 'Dressing change documentation' },
  { id: 'r5', name: 'ACP / Advance Care Planning', noteType: 'Specialty', specialty: 'All', rate: 18.00, bonus: 0, active: true },
  { id: 'r6', name: 'SVAF / Annual Wellness', noteType: 'Specialty', specialty: 'All', rate: 17.00, bonus: 0, active: false },
];

export const ONBOARDING_STEPS = [
  { id: 'invite', label: 'Email invitation', icon: 'mail', enabled: true, required: true },
  { id: 'accept', label: 'Accept Invitation', icon: 'check', enabled: true, required: true },
  { id: 'password', label: 'Set password', icon: 'lock', enabled: true, required: true },
  { id: 'mfa', label: 'Enable two-factor auth', icon: 'shield', enabled: true, required: false },
  { id: 'profile', label: 'Complete profile', icon: 'user', enabled: true, required: true },
  { id: 'tour', label: 'Onboarding Slideshow', icon: 'play', enabled: true, required: false },
];

export const AUDIT_ENTRIES: AuditEntry[] = [
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

export const NOTIFICATION_RULES = [
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
];

export type NotifRule = { event: string; desc: string; inApp: boolean; email: boolean };

export const NOTIFICATION_RULES_BY_ROLE: Record<string, NotifRule[]> = {
  'Super Admin': NOTIFICATION_RULES,
  'Provider': [
    { event: 'Note ready to sign', desc: 'When a scribe completes a note and routes it for signature.', inApp: true, email: false },
    { event: 'Note returned for revision', desc: 'When you return a note back to the scribe.', inApp: true, email: false },
    { event: 'Billing rejection received', desc: 'When a claim is rejected for one of your notes.', inApp: true, email: true },
    { event: 'Missing CPT modifier', desc: 'When a note is flagged for a missing or incorrect modifier.', inApp: true, email: false },
    { event: 'Flagged vitals alert', desc: 'When out-of-range vitals are recorded for your patient.', inApp: true, email: true },
    { event: 'Lab results available', desc: 'When lab results arrive for a patient on your panel.', inApp: true, email: false },
    { event: 'eRx confirmation', desc: 'When a prescription is successfully transmitted to the pharmacy.', inApp: true, email: false },
    { event: 'High-risk RTH alert', desc: 'When a patient on your panel is flagged as high-risk RTH.', inApp: true, email: true },
    { event: 'Schedule change', desc: 'When a shift is added, modified, or removed on your calendar.', inApp: true, email: true },
    { event: 'Weekly earnings summary', desc: 'End-of-week breakdown of W-RVU and compensation.', inApp: false, email: true },
  ],
  'Scribe': [
    { event: 'Encounter assigned to me', desc: 'When a clerk or admin routes an encounter to your queue.', inApp: true, email: false },
    { event: 'Encounter picked up (unassigned queue)', desc: 'When you claim an unassigned encounter from the pool.', inApp: true, email: false },
    { event: 'Note returned for revision', desc: 'When a provider sends your note back with revision notes.', inApp: true, email: true },
    { event: 'Note accepted / signed', desc: 'When a provider signs off on your completed note.', inApp: true, email: false },
    { event: 'Queue health alert', desc: 'When the unassigned encounter backlog exceeds threshold.', inApp: true, email: false },
    { event: 'New patient check-in', desc: 'When a patient you are assigned to is checked in.', inApp: true, email: false },
    { event: 'Productivity milestone', desc: 'When you hit a weekly note-count milestone.', inApp: true, email: false },
    { event: 'Weekly earnings summary', desc: 'End-of-week breakdown of notes completed and pay.', inApp: false, email: true },
    { event: 'Schedule change', desc: 'When a shift is added, modified, or removed on your calendar.', inApp: true, email: true },
    { event: 'System alerts & updates', desc: 'Portal maintenance, feature updates, general alerts.', inApp: true, email: false },
  ],
  'Clerk': [
    { event: 'New admission', desc: 'When a new patient is admitted to a facility you cover.', inApp: true, email: false },
    { event: 'Patient check-in complete', desc: 'When a patient check-in is finalized.', inApp: true, email: false },
    { event: 'Discharge request submitted', desc: 'When a provider initiates a discharge request.', inApp: true, email: true },
    { event: 'Discharge request approved', desc: 'When a discharge request is approved by the attending.', inApp: true, email: false },
    { event: 'Medical document received', desc: 'When a new document arrives in the inbox for routing.', inApp: true, email: false },
    { event: 'Encounter unassigned (backlog)', desc: 'When encounters go unassigned beyond the SLA threshold.', inApp: true, email: true },
    { event: 'Missed registration visit', desc: 'When a scheduled registration visit is not completed.', inApp: true, email: true },
    { event: 'Schedule conflict detected', desc: 'When two providers are double-booked on the same shift.', inApp: true, email: false },
    { event: 'Coverage gap alert', desc: 'When no scribe is scheduled for an upcoming provider shift.', inApp: true, email: true },
    { event: 'System alerts & updates', desc: 'Portal maintenance, feature updates, general alerts.', inApp: true, email: false },
  ],
};

export const HEADER_NOTIFICATIONS: Notification[] = [
  { id: 'n1', kind: 'returned', title: 'Returned Encounter', who: 'Jane Doe', verb: 'has returned', enc: 'ENCT00000005', when: 'Just Now', unread: true, body: 'Marked needs revision — please review the assessment & plan section before resubmitting.' },
  { id: 'n2', kind: 'accepted', title: 'Encounter Accepted', who: 'John Smith', verb: 'has accepted', enc: 'ENCT00000004', when: '1h ago', unread: false },
  { id: 'n3', kind: 'accepted', title: 'Encounter Accepted', who: 'John Smith', verb: 'has accepted', enc: 'ENCT00000003', when: '1h ago', unread: false },
  { id: 'n4', kind: 'accepted', title: 'Encounter Accepted', who: 'John Smith', verb: 'has accepted', enc: 'ENCT00000002', when: '1h ago', unread: false },
  { id: 'n5', kind: 'accepted', title: 'Encounter Accepted', who: 'John Smith', verb: 'has accepted', enc: 'ENCT00000001', when: '1h ago', unread: false },
];
