import { JournalArticle } from '../types';

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-of-watchmaking',
    title: 'The Art of Watchmaking: Precision in Every Second',
    category: 'HOROLOGY',
    readTime: '4 MIN READ',
    date: 'OCTOBER 2025',
    author: 'Henri Laurent, Master Horologist',
    image: '/images/journal/movement.webp',
    excerpt: 'Inside the quiet ateliers of Le Locle, where micro-mechanics transcend engineering to become pure kinetic sculpture.',
    quote: 'A mechanical watch does not merely count seconds; it captures the human pulse of craftsmanship and patience.',
    content: [
      'In a world dominated by digital speed, mechanical watchmaking remains a sacred sanctuary of deliberateness. Each ARVÉN calibre begins not on a silicon wafer, but with high-precision metallurgy, micro-milling, and the ancient art of hand-finishing.',
      'From the delicate balance wheel oscillating at 28,800 vibrations per hour to the mirror-polished anglage on every bridge, our watchmakers devote up to 140 hours to each individual movement. Tolerances are measured in microns—one tenth the thickness of a human hair.',
      'When you hold an ARVÉN, you hold the synthesis of three centuries of Swiss horological heritage, refined for the modern connoisseur.'
    ]
  },
  {
    id: 'language-of-time',
    title: 'The Language of Time: Proportions, Light & Materials',
    category: 'DESIGN PHILOSOPHY',
    readTime: '6 MIN READ',
    date: 'NOVEMBER 2025',
    author: 'Elena Vance, Head of Aesthetic Direction',
    image: '/images/journal/design.webp',
    excerpt: 'How the interplay of champagne dials, warm gold bevels, and tactile leather creates an emotional heirloom.',
    quote: 'True luxury whisperers through proportion, the weight of gold against skin, and the quiet satisfaction of a perfect bezel.',
    content: [
      'Design at ARVÉN is a disciplined study in restraint. We believe that timelessness is achieved not by what you add, but by what you choose not to disturb. The dial of an ARVÉN timepiece is treated as an architectural space.',
      'We selected warm champagne, ivory, and soft sand undertones rather than stark clinical whites. When natural sunlight strikes the double-domed sapphire crystal, it ignites a warm, radiant shimmer that shifts across different hours of the day.',
      'Paired with Italian vegetable-tanned calfskin that patinas uniquely to its wearer, every ARVÉN becomes a personalized reflection of its owner’s journey.'
    ]
  },
  {
    id: 'inside-automatic-movement',
    title: 'Inside the Automatic Movement: The Kinetic Soul',
    category: 'MECHANICS',
    readTime: '5 MIN READ',
    date: 'DECEMBER 2025',
    author: 'Marc Dubois, Technical Director',
    image: '/images/journal/gear.webp',
    excerpt: 'Understanding the self-winding oscillating rotor, the escapement mechanism, and the perpetual heartbeat on your wrist.',
    quote: 'The wearer provides the energy, the watch provides the cadence. A symbiotic relationship that never requires a battery.',
    content: [
      'An automatic watch is essentially an engine powered by your own life in motion. The slightest gesture of your wrist turns an eccentric heavy metal rotor, storing potential energy in the mainspring via a miniature reduction gear train.',
      'Our Calibre AV-101 and AV-202 column-wheel architectures feature 28 synthetic ruby jewels that reduce friction virtually to zero at high-wear pivots.',
      'Through the sapphire exhibition caseback, one can witness the hypnotic oscillation of the balance spring—a rhythmic heartbeat beating 4 times every second with unwavering precision.'
    ]
  }
];
