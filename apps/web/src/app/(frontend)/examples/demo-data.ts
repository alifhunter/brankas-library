/**
 * Fixture data for the Brankas Disbursements example console.
 *
 * The scenario: a business customer of Bank Sinarmas paying out to their
 * vendors and couriers through Brankas Open Finance. Every example screen
 * reads from this one dataset so the three screens tell a single story —
 * a payout you see queued on the overview is the same one you can find in
 * the transaction search and whose beneficiary appears in the directory.
 */

export type PayoutStatus = 'settled' | 'processing' | 'review' | 'failed';

export type Payout = {
  amount: number;
  bank: string;
  beneficiary: string;
  /** ISO date — kept as a string so server and client render identically. */
  date: string;
  id: string;
  method: 'Instant' | 'SKN' | 'RTGS';
  reference: string;
  status: PayoutStatus;
};

export type Beneficiary = {
  accountNumber: string;
  bank: string;
  id: string;
  initials: string;
  lastPaid: string | null;
  name: string;
  totalPaid: number;
  type: 'business' | 'individual';
  verified: 'verified' | 'pending' | 'unverified';
};

export const STATUS_COPY: Record<PayoutStatus, string> = {
  failed: 'Failed',
  processing: 'Processing',
  review: 'Needs review',
  settled: 'Settled',
};

export const STATUS_VARIANT: Record<
  PayoutStatus,
  'positive' | 'information' | 'warning' | 'negative'
> = {
  failed: 'negative',
  processing: 'information',
  review: 'warning',
  settled: 'positive',
};

export const BANKS = ['BCA', 'Mandiri', 'BNI', 'BRI', 'Permata', 'CIMB Niaga'] as const;

export const PAYOUTS: Payout[] = [
  {
    amount: 24_500_000,
    bank: 'BCA',
    beneficiary: 'PT Sumber Pangan Jaya',
    date: '2026-08-10',
    id: 'p-1',
    method: 'Instant',
    reference: 'DIS-20260810-0041',
    status: 'settled',
  },
  {
    amount: 8_750_000,
    bank: 'Mandiri',
    beneficiary: 'CV Karya Logistik',
    date: '2026-08-10',
    id: 'p-2',
    method: 'Instant',
    reference: 'DIS-20260810-0040',
    status: 'processing',
  },
  {
    amount: 152_000_000,
    bank: 'BNI',
    beneficiary: 'PT Andalan Distribusi',
    date: '2026-08-10',
    id: 'p-3',
    method: 'RTGS',
    reference: 'DIS-20260810-0039',
    status: 'review',
  },
  {
    amount: 3_200_000,
    bank: 'BRI',
    beneficiary: 'Siti Rahmawati',
    date: '2026-08-09',
    id: 'p-4',
    method: 'Instant',
    reference: 'DIS-20260809-0038',
    status: 'failed',
  },
  {
    amount: 46_800_000,
    bank: 'Permata',
    beneficiary: 'PT Mitra Niaga Utama',
    date: '2026-08-09',
    id: 'p-5',
    method: 'SKN',
    reference: 'DIS-20260809-0037',
    status: 'settled',
  },
  {
    amount: 12_400_000,
    bank: 'CIMB Niaga',
    beneficiary: 'Budi Hartono',
    date: '2026-08-09',
    id: 'p-6',
    method: 'Instant',
    reference: 'DIS-20260809-0036',
    status: 'settled',
  },
  {
    amount: 67_900_000,
    bank: 'BCA',
    beneficiary: 'PT Trans Cepat Indonesia',
    date: '2026-08-08',
    id: 'p-7',
    method: 'RTGS',
    reference: 'DIS-20260808-0035',
    status: 'settled',
  },
  {
    amount: 5_150_000,
    bank: 'Mandiri',
    beneficiary: 'Dewi Lestari',
    date: '2026-08-08',
    id: 'p-8',
    method: 'Instant',
    reference: 'DIS-20260808-0034',
    status: 'processing',
  },
  {
    amount: 31_000_000,
    bank: 'BNI',
    beneficiary: 'CV Bangun Sejahtera',
    date: '2026-08-08',
    id: 'p-9',
    method: 'SKN',
    reference: 'DIS-20260808-0033',
    status: 'failed',
  },
  {
    amount: 19_600_000,
    bank: 'BRI',
    beneficiary: 'PT Sumber Pangan Jaya',
    date: '2026-08-07',
    id: 'p-10',
    method: 'Instant',
    reference: 'DIS-20260807-0032',
    status: 'settled',
  },
  {
    amount: 88_250_000,
    bank: 'Permata',
    beneficiary: 'PT Andalan Distribusi',
    date: '2026-08-07',
    id: 'p-11',
    method: 'RTGS',
    reference: 'DIS-20260807-0031',
    status: 'review',
  },
  {
    amount: 2_400_000,
    bank: 'CIMB Niaga',
    beneficiary: 'Agus Setiawan',
    date: '2026-08-07',
    id: 'p-12',
    method: 'Instant',
    reference: 'DIS-20260807-0030',
    status: 'settled',
  },
];

export const BENEFICIARIES: Beneficiary[] = [
  {
    accountNumber: '4021',
    bank: 'BCA',
    id: 'b-1',
    initials: 'SP',
    lastPaid: '2026-08-10',
    name: 'PT Sumber Pangan Jaya',
    totalPaid: 44_100_000,
    type: 'business',
    verified: 'verified',
  },
  {
    accountNumber: '7738',
    bank: 'Mandiri',
    id: 'b-2',
    initials: 'KL',
    lastPaid: '2026-08-10',
    name: 'CV Karya Logistik',
    totalPaid: 8_750_000,
    type: 'business',
    verified: 'verified',
  },
  {
    accountNumber: '1190',
    bank: 'BNI',
    id: 'b-3',
    initials: 'AD',
    lastPaid: '2026-08-10',
    name: 'PT Andalan Distribusi',
    totalPaid: 240_250_000,
    type: 'business',
    verified: 'pending',
  },
  {
    accountNumber: '6654',
    bank: 'BRI',
    id: 'b-4',
    initials: 'SR',
    lastPaid: '2026-08-09',
    name: 'Siti Rahmawati',
    totalPaid: 3_200_000,
    type: 'individual',
    verified: 'verified',
  },
  {
    accountNumber: '9082',
    bank: 'Permata',
    id: 'b-5',
    initials: 'MN',
    lastPaid: '2026-08-09',
    name: 'PT Mitra Niaga Utama',
    totalPaid: 46_800_000,
    type: 'business',
    verified: 'verified',
  },
  {
    accountNumber: '3317',
    bank: 'CIMB Niaga',
    id: 'b-6',
    initials: 'BH',
    lastPaid: '2026-08-09',
    name: 'Budi Hartono',
    totalPaid: 12_400_000,
    type: 'individual',
    verified: 'pending',
  },
  {
    accountNumber: '5521',
    bank: 'BCA',
    id: 'b-7',
    initials: 'TC',
    lastPaid: '2026-08-08',
    name: 'PT Trans Cepat Indonesia',
    totalPaid: 67_900_000,
    type: 'business',
    verified: 'verified',
  },
  {
    accountNumber: '8846',
    bank: 'Mandiri',
    id: 'b-8',
    initials: 'DL',
    lastPaid: '2026-08-08',
    name: 'Dewi Lestari',
    totalPaid: 5_150_000,
    type: 'individual',
    verified: 'unverified',
  },
  {
    accountNumber: '2205',
    bank: 'BNI',
    id: 'b-9',
    initials: 'BS',
    lastPaid: null,
    name: 'CV Bangun Sejahtera',
    totalPaid: 0,
    type: 'business',
    verified: 'unverified',
  },
];

/**
 * `IDR 1,250,000` — ISO code prefix, comma grouping, monospace at the call
 * site. Comma grouping (not Indonesian dot grouping) is the documented house
 * style so amounts read the same way in every locale the console ships to.
 */
export function idr(amount: number): string {
  return `IDR ${amount.toLocaleString('en-US')}`;
}

/** `BCA ••••4021` — the documented masked-account form. */
export function maskedAccount(bank: string, last4: string): string {
  return `${bank} ••••${last4}`;
}

/** `10 Aug 2026`, computed without `Date` so SSR and hydration always agree. */
export function formatDate(iso: string): string {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) {
    return iso;
  }
  return `${Number(day)} ${months[Number(month) - 1] ?? month} ${year}`;
}

/* ---------- Approvals queue ---------- */

export type ApprovalFlag = 'high-value' | 'unverified' | 'expiring';
export type ApprovalState = 'pending' | 'approved' | 'rejected';

export type ApprovalRequest = {
  amount: number;
  bank: string;
  beneficiary: string;
  /** Risk markers a reviewer filters on. A request can carry several. */
  flags: ApprovalFlag[];
  id: string;
  method: 'Instant' | 'SKN' | 'RTGS';
  reference: string;
  requestedAt: string;
  requestedBy: string;
  state: ApprovalState;
};

export const APPROVAL_FLAG_COPY: Record<ApprovalFlag, string> = {
  expiring: 'Expires today',
  'high-value': 'Above IDR 100M',
  unverified: 'Unverified beneficiary',
};

export const REQUESTERS = ['Rina Wijaya', 'Andi Pratama', 'Maya Kusuma', 'Doni Saputra'];

export const APPROVALS: ApprovalRequest[] = [
  {
    amount: 152_000_000,
    bank: 'BNI',
    beneficiary: 'PT Andalan Distribusi',
    flags: ['high-value', 'expiring'],
    id: 'a-1',
    method: 'RTGS',
    reference: 'DIS-20260810-0039',
    requestedAt: '2026-08-10',
    requestedBy: 'Andi Pratama',
    state: 'pending',
  },
  {
    amount: 88_250_000,
    bank: 'Permata',
    beneficiary: 'PT Andalan Distribusi',
    flags: ['expiring'],
    id: 'a-2',
    method: 'RTGS',
    reference: 'DIS-20260807-0031',
    requestedAt: '2026-08-07',
    requestedBy: 'Rina Wijaya',
    state: 'pending',
  },
  {
    amount: 31_000_000,
    bank: 'BNI',
    beneficiary: 'CV Bangun Sejahtera',
    flags: ['unverified'],
    id: 'a-3',
    method: 'SKN',
    reference: 'DIS-20260808-0033',
    requestedAt: '2026-08-08',
    requestedBy: 'Maya Kusuma',
    state: 'pending',
  },
  {
    amount: 210_400_000,
    bank: 'BCA',
    beneficiary: 'PT Trans Cepat Indonesia',
    flags: ['high-value'],
    id: 'a-4',
    method: 'RTGS',
    reference: 'DIS-20260810-0043',
    requestedAt: '2026-08-10',
    requestedBy: 'Andi Pratama',
    state: 'pending',
  },
  {
    amount: 6_750_000,
    bank: 'Mandiri',
    beneficiary: 'Dewi Lestari',
    flags: ['unverified'],
    id: 'a-5',
    method: 'Instant',
    reference: 'DIS-20260810-0044',
    requestedAt: '2026-08-10',
    requestedBy: 'Doni Saputra',
    state: 'pending',
  },
  {
    amount: 24_500_000,
    bank: 'BCA',
    beneficiary: 'PT Sumber Pangan Jaya',
    flags: [],
    id: 'a-6',
    method: 'Instant',
    reference: 'DIS-20260810-0041',
    requestedAt: '2026-08-10',
    requestedBy: 'Rina Wijaya',
    state: 'approved',
  },
  {
    amount: 46_800_000,
    bank: 'Permata',
    beneficiary: 'PT Mitra Niaga Utama',
    flags: [],
    id: 'a-7',
    method: 'SKN',
    reference: 'DIS-20260809-0037',
    requestedAt: '2026-08-09',
    requestedBy: 'Maya Kusuma',
    state: 'approved',
  },
  {
    amount: 67_900_000,
    bank: 'BCA',
    beneficiary: 'PT Trans Cepat Indonesia',
    flags: [],
    id: 'a-8',
    method: 'RTGS',
    reference: 'DIS-20260808-0035',
    requestedAt: '2026-08-08',
    requestedBy: 'Andi Pratama',
    state: 'approved',
  },
  {
    amount: 3_200_000,
    bank: 'BRI',
    beneficiary: 'Siti Rahmawati',
    flags: ['unverified'],
    id: 'a-9',
    method: 'Instant',
    reference: 'DIS-20260809-0038',
    requestedAt: '2026-08-09',
    requestedBy: 'Doni Saputra',
    state: 'rejected',
  },
  {
    amount: 12_900_000,
    bank: 'CIMB Niaga',
    beneficiary: 'Agus Setiawan',
    flags: [],
    id: 'a-10',
    method: 'Instant',
    reference: 'DIS-20260806-0029',
    requestedAt: '2026-08-06',
    requestedBy: 'Rina Wijaya',
    state: 'rejected',
  },
];
