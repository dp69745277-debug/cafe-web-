export interface VibeHighlight {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  image?: string;
  featured?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  span?: 'tall' | 'wide' | 'square';
}

export const CAFE_DATA = {
  brandName: 'Raj Cafe Dhawa',
  shortBrand: 'Raj Cafe',
  hindiName: 'राज कैफे धावा',
  shortMark: 'RCD',
  tagline: 'Good Coffee, Great Food & Cozy Evenings.',
  heroEyebrow: 'DHAWA, JODHPUR • EST. HANGOUT SPOT',
  address: {
    floor: '2nd Floor (Above Dada Mirchi Masala)',
    street: 'Sinli Road, Dhawa, Dhawa I',
    cityStatePin: 'Jodhpur, Rajasthan – 342014',
    full: '2nd Floor (Above Dada Mirchi Masala), Sinli Road, Dhawa, Dhawa I, Jodhpur, Rajasthan – 342014',
    plusCode: '3P4W+XJR',
  },
  hours: {
    days: 'Monday – Sunday',
    window: '10:30 AM – 10:00 PM',
    short: 'Open Daily 10:30 AM – 10 PM',
  },
  contact: {
    primaryPhone: '+91 63764 94346',
    primaryPhoneHref: 'tel:+916376494346',
    secondaryPhone: '+91 86906 24346',
    secondaryPhoneHref: 'tel:+918690624346',
    whatsappDigits: '916376494346',
    whatsappUrl: 'https://wa.me/916376494346',
  },
  social: {
    instagramHandle: '@raj_cafe_dhawa',
    instagramUrl: 'https://www.instagram.com/raj_cafe_dhawa',
    instagramBadge: 'RCD 🥂',
  },
  google: {
    rating: 4.4,
    reviewsCountText: '10+ Google Reviews',
    budgetRange: '₹1–₹200',
    directionsUrl: 'https://maps.app.goo.gl/63cYUCAGaySZ6M3z9',
    reviewUrl:
      'https://search.google.com/local/writereview?placeid=ChIJbUgLPgArQjkRFY1CIr9cdLM',
    mapsEmbedUrl:
      'https://www.google.com/maps?q=Raj+Cafe+Dhawa,+Sinli+Road,+Dhawa,+Jodhpur,+Rajasthan+342014&output=embed',
  },
  amenities: [
    'Dine-in',
    'Private Curtained Cabins',
    'Cozy Group Booths',
    'Takeout',
    'Delivery',
    'No-Contact Delivery',
    'Curbside Pickup',
    'Drive-Through',
    'Free Parking',
    'UPI / NFC Payments',
  ],
  marqueeItems: [
    'FRESHLY BREWED COFFEE',
    'PRIVATE CABINS',
    'SCHEZWAN NOODLES',
    'WOOD-STYLE PIZZA',
    'COLD COFFEE',
    'OPEN DAILY 10:30 AM – 10 PM',
  ],
  heroImage:
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=85',
  cabinBookingImage:
    'https://images.unsplash.com/photo-1759301495161-31027c795358?auto=format&fit=crop&w=1200&q=85',
  vibeHighlights: [
    {
      id: 'private-cabins',
      eyebrow: '01 · Intimate Seating',
      title: 'Private Curtained Cabins',
      description:
        'Tucked-away wooden-slat cabins draped for privacy—designed for unhurried conversations, couples, small birthday surprises, and long evening catch-ups.',
      meta: 'Pre-book on WhatsApp · Zero cover charge',
      image:
        'https://images.unsplash.com/photo-1759301495161-31027c795358?auto=format&fit=crop&w=1200&q=85',
      featured: true,
    },
    {
      id: 'pocket-friendly',
      eyebrow: '02 · Crafted Fresh Daily',
      title: 'Freshly Made Street-to-Cafe Menu',
      description:
        'Every plate of Schezwan chowmein, hand-stretched pizza, creamy pasta, and chilled shake is made fresh to order at honest ₹1–₹200 café pricing.',
      meta: '100% Vegetarian Kitchen · ₹30 to ₹180',
    },
    {
      id: 'convenience',
      eyebrow: '03 · Zero Hassle',
      title: 'Dine-In, Takeout & Fast Delivery',
      description:
        'Pull in with free parking, grab curbside pickup or drive-through on Sinli Road, order no-contact delivery, and pay smoothly with UPI or NFC.',
      meta: 'Curbside · Drive-Through · Free Parking',
    },
    {
      id: 'evening-ambiance',
      eyebrow: '04 · 2nd Floor Escape',
      title: 'Warm Ambient Lighting & Music',
      description:
        'Step up above Dada Mirchi Masala into soft amber bulbs, roasted coffee aromas, curated playlists, and cozy group booths away from the highway buzz.',
      meta: 'Above Dada Mirchi Masala · Sinli Road',
      image:
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85',
    },
  ] as VibeHighlight[],
  galleryPhotos: [
    {
      id: 'g-1',
      title: 'Warm Edison Evenings',
      subtitle: 'Cozy 2nd-floor seating overlooking Sinli Road',
      image:
        'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85',
      span: 'tall',
    },
    {
      id: 'g-2',
      title: 'Wok-Tossed Schezwan',
      subtitle: 'Smoky, fiery chowmein tossed to order',
      image:
        'https://images.unsplash.com/photo-1789990662414-f607ba6405f3?auto=format&fit=crop&w=1200&q=85',
      span: 'square',
    },
    {
      id: 'g-3',
      title: 'Freshly Brewed Craft',
      subtitle: 'Hot espresso & chilled signature shakes',
      image:
        'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=85',
      span: 'square',
    },
    {
      id: 'g-4',
      title: 'Wood-Style Loaded Pizza',
      subtitle: 'Golden crust, bubbling mozzarella & crisp veggies',
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85',
      span: 'wide',
    },
    {
      id: 'g-5',
      title: 'Private Cabin Booths',
      subtitle: 'Quiet wooden corners for friends & celebrations',
      image:
        'https://images.unsplash.com/photo-1759301495161-31027c795358?auto=format&fit=crop&w=1200&q=85',
      span: 'square',
    },
    {
      id: 'g-6',
      title: 'Chocolate Oreo & Cold Coffee',
      subtitle: 'Thick, frosty café classics for Dhawa afternoons',
      image:
        'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=85',
      span: 'square',
    },
  ] as GalleryPhoto[],
};
