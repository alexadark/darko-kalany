import { Project, GalleryItem, Service, PricingTier, Testimonial } from './types';
import { Camera, Video, Box, Layers, Film } from 'lucide-react';

export const NAVIGATION_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact', path: '/contact' },
];

export const CATEGORIES = [
  { id: 'all', label: 'All Work' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'fashion', label: 'Fashion & Editorial' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'brand', label: 'Brand Films' },
  { id: 'concept', label: 'Concept Art' },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Neo-Tokyo Penthouse',
    category: 'Real Estate',
    description: 'Hyper-realistic visualization of a luxury penthouse in a futuristic Tokyo.',
    image: 'https://picsum.photos/id/10/1200/800',
    year: '2025',
    client: 'Sotheby\'s International'
  },
  {
    id: '2',
    title: 'Vogue: Cyber Summer',
    category: 'Fashion',
    description: 'AI-generated editorial campaign for high summer fashion.',
    image: 'https://picsum.photos/id/64/1200/1600',
    year: '2024',
    client: 'Vogue Italia'
  },
  {
    id: '3',
    title: 'Obsidian Tower',
    category: 'Architecture',
    description: 'Conceptual design for a sustainable skyscraper in Dubai.',
    image: 'https://picsum.photos/id/48/1200/800',
    year: '2024',
    client: 'Emaar Properties'
  },
  {
    id: '4',
    title: 'Lumina Essence',
    category: 'Brand Films',
    description: 'Cinematic brand video for a luxury perfume line.',
    image: 'https://picsum.photos/id/325/1200/800',
    year: '2025',
    client: 'Lumina'
  },
  {
    id: '5',
    title: 'Urban Oasis',
    category: 'Real Estate',
    description: 'Biophilic interior design visualization for a wellness resort.',
    image: 'https://picsum.photos/id/56/1200/800',
    year: '2024',
    client: 'Aman Resorts'
  },
  {
    id: '6',
    title: 'Velvet & Void',
    category: 'Fashion',
    description: 'Avant-garde digital fashion collection showcase.',
    image: 'https://picsum.photos/id/100/1200/1600',
    year: '2025',
    client: 'Balenciaga'
  },
  {
    id: '7',
    title: 'Neon Drift',
    category: 'Brand Films',
    description: 'High-energy automotive commercial for an electric concept car.',
    image: 'https://picsum.photos/id/133/1200/800',
    year: '2025',
    client: 'Polestar'
  },
  {
    id: '8',
    title: 'Eco-Haven',
    category: 'Architecture',
    description: 'Modular housing concept for remote landscapes.',
    image: 'https://picsum.photos/id/234/1200/800',
    year: '2024',
    client: 'Dwell Magazine'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: '1', type: 'image', src: 'https://picsum.photos/id/12/800/1200', title: 'Minimalist Living', aspectRatio: 'portrait', category: 'real-estate' },
  { id: '2', type: 'image', src: 'https://picsum.photos/id/24/1200/800', title: 'Brutalist Exterior', aspectRatio: 'landscape', category: 'architecture' },
  { id: '3', type: 'image', src: 'https://picsum.photos/id/36/1000/1000', title: 'Silk Texture Study', aspectRatio: 'square', category: 'fashion' },
  { id: '4', type: 'image', src: 'https://picsum.photos/id/42/800/1200', title: 'Cyberpunk Portrait', aspectRatio: 'portrait', category: 'concept' },
  { id: '5', type: 'image', src: 'https://picsum.photos/id/56/1200/800', title: 'Desert Resort', aspectRatio: 'landscape', category: 'real-estate' },
  { id: '6', type: 'image', src: 'https://picsum.photos/id/67/1200/800', title: 'Neon Night', aspectRatio: 'landscape', category: 'brand' },
  { id: '7', type: 'image', src: 'https://picsum.photos/id/88/800/1200', title: 'Abstract Fluidity', aspectRatio: 'portrait', category: 'concept' },
  { id: '8', type: 'image', src: 'https://picsum.photos/id/91/1000/1000', title: 'Glass Facade', aspectRatio: 'square', category: 'architecture' },
];

export const SERVICES_DATA: Service[] = [
  {
    id: 'real-estate',
    title: 'AI Architectural Visuals',
    description: 'Hyper-realistic stills and fly-throughs for unbuilt properties.',
    icon: null, // Icons handled in component
    features: ['Interior Staging', 'Exterior Renders', '360° Tours']
  },
  {
    id: 'fashion',
    title: 'Fashion Editorials',
    description: 'Impossible locations and perfect lighting for campaigns.',
    icon: null,
    features: ['Virtual Models', 'Digital Garments', 'Surreal Sets']
  },
  {
    id: 'concept',
    title: 'Concept & Worldbuilding',
    description: 'Visual development for films, games, and brand universes.',
    icon: null,
    features: ['Environment Design', 'Character Concept', 'Moodboards']
  },
  {
    id: 'film',
    title: 'Cinematic Brand Films',
    description: 'AI-generated motion that looks more real than reality.',
    icon: null,
    features: ['Script to Screen', 'AI Animation', 'Sound Design']
  }
];

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Essentials',
    price: '$2,500',
    description: 'Perfect for single property listings or small capsule collections.',
    features: [
      '5 High-Res AI Images',
      '1 Short Video Loop (10s)',
      'Standard Licensing',
      '1 Revision Round',
      '7 Day Delivery'
    ]
  },
  {
    name: 'Signature',
    price: '$5,500',
    description: 'Comprehensive package for full marketing campaigns.',
    features: [
      '15 High-Res AI Images',
      '3 Cinematic Videos (30s total)',
      'Global Commercial License',
      '2 Revision Rounds',
      '14 Day Delivery',
      'Moodboard Development'
    ],
    isPopular: true
  },
  {
    name: 'Full Production',
    price: '$12,000+',
    description: 'End-to-end visual world building for major brands.',
    features: [
      'Unlimited Concepting',
      'Full Image Suite (30+)',
      '60s Hero Brand Film',
      'Full Buyout Rights',
      'Priority Support',
      'Dedicated Art Director'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "The visuals created by Darko Kalany Studio didn't just sell the property, they sold a lifestyle that didn't exist yet.",
    author: "Elena Vance",
    role: "CMO",
    company: "Apex Realty"
  },
  {
    id: '2',
    quote: "We saved $50k on production costs by using AI for our background plates. The result was indistinguishable from a location shoot.",
    author: "Marcus Thorne",
    role: "Creative Director",
    company: "Velvet Magazine"
  }
];