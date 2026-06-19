import type { SVGProps } from 'react';

export type IconProps = SVGProps<SVGSVGElement>;

export function AddIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="M10 4.167v11.666M4.167 10h11.666"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.667"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="m5 7.5 5 5 5-5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 12 12" {...props}>
      <path
        d="m4.5 2.5 3.5 3.5-3.5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 12 12" {...props}>
      <path
        d="m7.5 2.5-3.5 3.5 3.5 3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="10.667" r="5.333" fill="currentColor" opacity="0.75" />
      <path
        d="M6.667 27.333c.8-5.333 4.133-8 9.333-8s8.533 2.667 9.333 8"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

export function BrandPlaceholderIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.18" />
      <path
        d="M6.6 13.9c1.6-4.9 6.2-7.2 10.8-5.5-1.6 4.9-6.2 7.2-10.8 5.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M6.7 15.1c4.4 1.5 8.9-.3 10.9-4.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function InfoIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.75v5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="10" cy="5.75" r="1" fill="currentColor" />
    </svg>
  );
}

export function WarningIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="M9.12 3.45a1 1 0 0 1 1.76 0l7.22 12.96a1 1 0 0 1-.88 1.49H2.78a1 1 0 0 1-.88-1.49L9.12 3.45Z"
        fill="currentColor"
      />
      <path d="M10 7.4v4.6" stroke="#fff" strokeLinecap="round" strokeWidth="1.45" />
      <circle cx="10" cy="14.45" r="0.8" fill="#fff" />
    </svg>
  );
}

export function ErrorIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <circle cx="10" cy="10" r="8.25" fill="currentColor" />
      <path d="M10 5.9v5.2" stroke="#fff" strokeLinecap="round" strokeWidth="1.45" />
      <circle cx="10" cy="14.2" r="0.8" fill="#fff" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="m4.5 10.25 3.5 3.5 7.5-7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="m5.5 5.5 9 9M14.5 5.5l-9 9"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.75"
      />
    </svg>
  );
}

export function UploadIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M12 15V4m0 0 4 4m-4-4L8 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M5 15v2.5A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5V15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <path
        d="M6.5 3v3M13.5 3v3M4 7.5h12M5.5 4.5h9A1.5 1.5 0 0 1 16 6v8.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 14.5V6a1.5 1.5 0 0 1 1.5-1.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" {...props}>
      <circle cx="8.75" cy="8.75" r="5.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="m12.75 12.75 3.75 3.75"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.6"
      />
    </svg>
  );
}
