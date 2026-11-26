export interface IstStatus {
  isOpen: boolean;
  label: string;
  subLabel: string;
  istTimeFormatted: string;
}

const OPEN_MINUTES = 10 * 60 + 30; // 10:30 AM IST
const CLOSE_MINUTES = 22 * 60; // 10:00 PM IST

export function getCafeIstStatus(now: Date = new Date()): IstStatus {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const hourPart = Number(parts.find((p) => p.type === 'hour')?.value ?? '12');
  const minutePart = Number(parts.find((p) => p.type === 'minute')?.value ?? '0');
  const normalizedHour = hourPart === 24 ? 0 : hourPart;
  const totalMinutes = normalizedHour * 60 + minutePart;

  const istTimeFormatted = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now);

  const isOpen = totalMinutes >= OPEN_MINUTES && totalMinutes < CLOSE_MINUTES;
  const minsUntilClose = CLOSE_MINUTES - totalMinutes;

  if (isOpen) {
    return {
      isOpen: true,
      label: 'Open Now',
      subLabel:
        minsUntilClose <= 45
          ? `Closing soon at 10:00 PM IST (${minsUntilClose}m left)`
          : 'Open today until 10:00 PM IST',
      istTimeFormatted,
    };
  }

  return {
    isOpen: false,
    label: 'Opens at 10:30 AM',
    subLabel: 'Daily 10:30 AM – 10:00 PM IST',
    istTimeFormatted,
  };
}

export type OrderServiceMode = 'Dine-In' | 'Takeout' | 'Delivery';

export interface OrderCartLine {
  name: string;
  price: number;
  quantity: number;
}

export function buildOrderWhatsAppUrl(params: {
  whatsappNumberDigits: string;
  items: OrderCartLine[];
  total: number;
  serviceMode: OrderServiceMode;
  guestName?: string;
  note?: string;
}): string {
  const { whatsappNumberDigits, items, total, serviceMode, guestName, note } = params;
  const lines = [
    '*New Order — Raj Cafe Dhawa*',
    `Service: ${serviceMode}`,
    guestName?.trim() ? `Guest: ${guestName.trim()}` : null,
    '',
    '*Items:*',
    ...items.map((item) => `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}`),
    '',
    `*Estimated Total: ₹${total}*`,
    note?.trim() ? `Note: ${note.trim()}` : null,
    '',
    'Sent via rajcafedhawa website',
  ].filter((line): line is string => line !== null);

  return `https://wa.me/${whatsappNumberDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function buildBookingWhatsAppUrl(params: {
  whatsappNumberDigits: string;
  guestName: string;
  guestsCount: string;
  preferredTime: string;
  seatingPreference: 'Private Cabin' | 'Open Group Booth';
  occasionNote?: string;
}): string {
  const {
    whatsappNumberDigits,
    guestName,
    guestsCount,
    preferredTime,
    seatingPreference,
    occasionNote,
  } = params;

  const lines = [
    '*Table / Cabin Reservation — Raj Cafe Dhawa*',
    `Name: ${guestName.trim() || 'Guest'}`,
    `Guests: ${guestsCount}`,
    `Preferred Time: ${preferredTime}`,
    `Seating: ${seatingPreference}`,
    occasionNote?.trim() ? `Note: ${occasionNote.trim()}` : null,
    '',
    'Please confirm availability. Thank you!',
  ].filter((line): line is string => line !== null);

  return `https://wa.me/${whatsappNumberDigits}?text=${encodeURIComponent(lines.join('\n'))}`;
}
