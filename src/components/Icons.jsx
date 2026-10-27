// Shared inline SVG icon set — sized via `size` prop, stroke follows currentColor.
import React from 'react'

const S = ({ size = 20, children, fill = 'none', stroke = 1.6, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

export const Search = (p) => (
  <S {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.2-3.2" />
  </S>
)
export const UserIcon = (p) => (
  <S {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5" />
  </S>
)
export const Heart = ({ filled, ...p }) => (
  <S {...p} fill={filled ? 'currentColor' : 'none'}>
    <path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 7.5 3c0 5-7.5 9.6-7.5 9.6Z" />
  </S>
)
export const Cart = (p) => (
  <S {...p}>
    <path d="M4 6h2.2l1.6 9.4a2 2 0 0 0 2 1.7h6.9a2 2 0 0 0 2-1.6L20 9H7" />
    <circle cx="10" cy="20" r="1.3" />
    <circle cx="17" cy="20" r="1.3" />
  </S>
)
export const Bag = (p) => (
  <S {...p}>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </S>
)
export const Menu = (p) => (
  <S {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </S>
)
export const Close = (p) => (
  <S {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
)
export const ArrowRight = (p) => (
  <S {...p}>
    <path d="M4 12h15" />
    <path d="m13 6 6 6-6 6" />
  </S>
)
export const ArrowLeft = (p) => (
  <S {...p}>
    <path d="M20 12H5" />
    <path d="m11 6-6 6 6 6" />
  </S>
)
export const Check = (p) => (
  <S {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </S>
)
export const CheckCircle = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.3 2.4 2.4 4.6-5" />
  </S>
)
export const Leaf = (p) => (
  <S {...p}>
    <path d="M20 4c-8 0-14 3.6-14 10a6 6 0 0 0 6 6c6.4 0 8-6 8-16Z" />
    <path d="M6 20c1.6-4.4 4.6-7.6 9-9.6" />
  </S>
)
export const Truck = (p) => (
  <S {...p}>
    <path d="M3 7h10v9H3z" />
    <path d="M13 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </S>
)
export const Refresh = (p) => (
  <S {...p}>
    <path d="M20 11a8 8 0 1 0-1.6 5.6" />
    <path d="M20 5v6h-6" />
  </S>
)
export const Shield = (p) => (
  <S {...p}>
    <path d="M12 3.5 19 6v6c0 4.3-3 7.5-7 8.5-4-1-7-4.2-7-8.5V6l7-2.5Z" />
    <path d="m9 12 2 2 4-4" />
  </S>
)
export const Headset = (p) => (
  <S {...p}>
    <path d="M5 14v-2a7 7 0 0 1 14 0v2" />
    <rect x="3" y="13" width="4" height="6" rx="1.6" />
    <rect x="17" y="13" width="4" height="6" rx="1.6" />
    <path d="M19 19v.6a2.4 2.4 0 0 1-2.4 2.4H13" />
  </S>
)
export const Flask = (p) => (
  <S {...p}>
    <path d="M10 3h4" />
    <path d="M10 3v6l-4.6 8A3 3 0 0 0 8 21h8a3 3 0 0 0 2.6-4L14 9V3" />
    <path d="M8 15h8" />
  </S>
)
export const Rabbit = (p) => (
  <S {...p}>
    <path d="M9 9c-1.6-3-1.4-6 .4-6.6 1.5-.5 2.6 1.6 3 4" />
    <path d="M15 9c1.6-3 1.4-6-.4-6.6-1.5-.5-2.6 1.6-3 4" />
    <path d="M8 13.5A4.5 4.5 0 0 1 12 10a4.5 4.5 0 0 1 4 3.5c0 3-1.8 5-4 5s-4-2-4-5Z" />
    <circle cx="10.6" cy="13.6" r=".7" fill="currentColor" stroke="none" />
    <circle cx="13.4" cy="13.6" r=".7" fill="currentColor" stroke="none" />
  </S>
)
export const Eco = (p) => (
  <S {...p}>
    <path d="M12 21c-4 0-7-3-7-7 0-5 4-9 9-9 3 0 5 2 5 4 0 5-4 6-7 6" />
    <path d="M12 21c0-4 2-7 5-8.5" />
  </S>
)
export const Sparkle = (p) => (
  <S {...p}>
    <path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9 12 3.5Z" />
  </S>
)
export const Play = (p) => (
  <S {...p} fill="currentColor" stroke="none">
    <path d="M9 6.5 17 12l-8 5.5v-11Z" />
  </S>
)
export const Plus = (p) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
)
export const Minus = (p) => (
  <S {...p}>
    <path d="M5 12h14" />
  </S>
)
export const ChevronDown = (p) => (
  <S {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </S>
)
export const ChevronRight = (p) => (
  <S {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </S>
)
export const Star = ({ filled = true, half = false, size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="halfg">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.6Z"
      fill={half ? 'url(#halfg)' : filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
)
export const Trash = (p) => (
  <S {...p}>
    <path d="M4 7h16" />
    <path d="M9 7V5h6v2" />
    <path d="M6.5 7 7.4 20h9.2L17.5 7" />
    <path d="M10.5 11v5M13.5 11v5" />
  </S>
)
export const Filter = (p) => (
  <S {...p}>
    <path d="M4 6h16M7 12h10M10 18h4" />
  </S>
)
export const Grid = (p) => (
  <S {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.6" />
    <rect x="13" y="4" width="7" height="7" rx="1.6" />
    <rect x="4" y="13" width="7" height="7" rx="1.6" />
    <rect x="13" y="13" width="7" height="7" rx="1.6" />
  </S>
)
export const List = (p) => (
  <S {...p}>
    <path d="M8 6h12M8 12h12M8 18h12" />
    <circle cx="4.5" cy="6" r="1" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="18" r="1" fill="currentColor" stroke="none" />
  </S>
)
export const PackageIcon = (p) => (
  <S {...p}>
    <path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" />
    <path d="M4 7.5 12 11l8-3.5M12 11v10" />
  </S>
)
export const Users = (p) => (
  <S {...p}>
    <circle cx="9" cy="8.5" r="3.4" />
    <path d="M3.5 19c.9-3 3-4.6 5.5-4.6S13.6 16 14.5 19" />
    <path d="M16 6.2a3.2 3.2 0 0 1 0 6M17.5 14.8c2 .7 3.3 2.2 3.9 4.2" />
  </S>
)
export const Chart = (p) => (
  <S {...p}>
    <path d="M4 20V10M10 20V5M16 20v-7M22 20H2" />
  </S>
)
export const Tag = (p) => (
  <S {...p}>
    <path d="M4 11.5V5h6.5L20 14.5 14.5 20 4 11.5Z" />
    <circle cx="8" cy="8.5" r="1.3" />
  </S>
)
export const Settings = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="3.2" />
    <path d="M19.4 14.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.2a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-3-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-3l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 2.9-1.2V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 3 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9h.2a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
  </S>
)
export const Bell = (p) => (
  <S {...p}>
    <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z" />
    <path d="M10.5 18a1.8 1.8 0 0 0 3 0" />
  </S>
)
export const Megaphone = (p) => (
  <S {...p}>
    <path d="M4 10v4a2 2 0 0 0 2 2h1l2 4h2l-1.5-4L18 19V5L8 9H6a2 2 0 0 0-2 1Z" />
  </S>
)
export const Box = (p) => (
  <S {...p}>
    <rect x="4" y="7" width="16" height="13" rx="2" />
    <path d="M4 11h16M9 7V5a3 3 0 0 1 6 0v2" />
  </S>
)
export const Layers = (p) => (
  <S {...p}>
    <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
    <path d="m4 12.5 8 4.5 8-4.5" />
    <path d="m4 17 8 4.5 8-4.5" />
  </S>
)
export const FileText = (p) => (
  <S {...p}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </S>
)
export const Instagram = (p) => (
  <S {...p}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r=".9" fill="currentColor" stroke="none" />
  </S>
)
export const Facebook = (p) => (
  <S {...p}>
    <path d="M14.5 8.5H17V5h-2.6C12.4 5 11 6.6 11 8.9V11H9v3.4h2V21h3.4v-6.6H17l.6-3.4h-3V9.2c0-.5.3-.7.9-.7Z" />
  </S>
)
export const Pinterest = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 20c-.6-1.6.4-5.4.9-7.4-.7-1.4.4-3.5 2.2-3.5 1.6 0 2 1.3 1.6 2.9-.4 1.5-1.2 3.3.3 4 1.4.6 3.4-.9 3.7-3.2.4-3-1.7-5.3-4.6-5.3-3.2 0-5.2 2.3-5.2 4.8 0 1 .4 2 1.1 2.5" />
  </S>
)
export const Youtube = (p) => (
  <S {...p}>
    <rect x="3" y="6" width="18" height="12" rx="4" />
    <path d="m11 9.8 4 2.2-4 2.2V9.8Z" fill="currentColor" />
  </S>
)
export const Twitter = (p) => (
  <S {...p}>
    <path d="M4 4.5 10.8 13 4.4 19.5h2.2l5-5.6 4.5 5.6H20l-7.2-8.9L18.9 4.5h-2.2l-4.5 5.1-4-5.1H4Z" />
  </S>
)
export const Dots = (p) => (
  <S {...p}>
    <circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </S>
)
export const MessageChat = (p) => (
  <S {...p}>
    <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-1 0-2-.15-2.9-.43L5 20l1.1-3.1A6.7 6.7 0 0 1 4 12.5C4 8.9 7.6 6 12 6s8 2.9 8 6.5Z" />
    <path d="M9 12h.01M12 12h.01M15 12h.01" />
  </S>
)
export const Mail = (p) => (
  <S {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 8 8 5 8-5" />
  </S>
)
export const Pin = (p) => (
  <S {...p}>
    <path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.4" />
  </S>
)
export const CreditCard = (p) => (
  <S {...p}>
    <rect x="3" y="6" width="18" height="12" rx="2.5" />
    <path d="M3 10h18M7 14.5h3" />
  </S>
)
export const Globe = (p) => (
  <S {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9.5h17M3.5 14.5h17" />
    <path d="M12 3c2.5 2.6 3.6 5.7 3.6 9s-1.1 6.4-3.6 9c-2.5-2.6-3.6-5.7-3.6-9S9.5 5.6 12 3Z" />
  </S>
)
export const MapPin = (p) => (
  <S {...p}>
    <path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.4" />
  </S>
)
export const Phone = (p) => (
  <S {...p}>
    <path d="M6.5 4h3l1.4 3.6-2 1.4a11 11 0 0 0 5.1 5.1l1.4-2 3.6 1.4v3a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z" />
  </S>
)
export const Share = (p) => (
  <S {...p}>
    <path d="M14 5.5 18.5 10 14 14.5" />
    <path d="M18.5 10H10a5 5 0 0 0-5 5v3.5" />
  </S>
)
export const Duplicate = (p) => (
  <S {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2.4" />
    <path d="M15 6.5A2.5 2.5 0 0 0 12.5 4H6.5A2.5 2.5 0 0 0 4 6.5v6A2.5 2.5 0 0 0 6.5 15" />
  </S>
)
export const Print = (p) => (
  <S {...p}>
    <path d="M7 9V4h10v5" />
    <rect x="4" y="9" width="16" height="7" rx="2" />
    <path d="M7 14h10v6H7z" />
  </S>
)
export const Eye = (p) => (
  <S {...p}>
    <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </S>
)
export const Logo = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <path
      d="M16 27c-5.5 0-9-4.6-9-10.4C7 9.6 12.4 4 22 4c3.6 0 5.6 2 5.6 4.6 0 5.8-4.8 7.4-8.6 7.4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M4 27c1.6-5 5-8.6 9.6-10.8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const EditIcon = (p) => (
  <S {...p}>
    <path d="m14.5 5.5 4 4M4 20l4.5-1L20 7.5a2.8 2.8 0 0 0-4-4L4.5 15Z" />
  </S>
)
