export type Product = {
  id: string
  name: string
  price: string
  priceNum: number
  category: string
  image: string
  shortDesc: string
  condition?: string[]
  specs?: string[]
  idealFor?: string[]
  features?: string[]
  sizes?: string[]
  colors?: string[]
  quote?: string
  /** Shown on homepage preview cards (pick 3 with homepageFeatured: true) */
  homepageFeatured?: boolean
}

export const storeProducts: Product[] = [
  {
    id: 'hp-elitebook-840',
    name: 'HP EliteBook 840 G6',
    price: '₦420,000',
    priceNum: 420000,
    category: 'UK Used Laptop',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&h=400&fit=crop',
    shortDesc: 'Premium business laptop for developers, students, and remote workers.',
    condition: ['Direct UK Used', 'Professionally Tested', 'Neat Appearance', 'Excellent Battery Health'],
    specs: ['Intel Core i5 8th Gen', '16GB RAM', '512GB NVMe SSD', '14" Full HD Display', 'Backlit Keyboard', 'Fingerprint Reader', 'USB-C & HDMI', 'Windows 11 Pro'],
    idealFor: ['Programming', 'Web Development', 'UI/UX Design', 'Microsoft Office', 'Data Analysis', 'Graphic Design'],
    homepageFeatured: true,
  },
  {
    id: 'dell-latitude-7420',
    name: 'Dell Latitude 7420',
    price: '₦540,000',
    priceNum: 540000,
    category: 'UK Used Laptop',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=400&fit=crop',
    shortDesc: 'Powerful ultrabook for professionals who need speed, portability, and reliability.',
    condition: ['Direct UK Used', 'Professionally Tested', 'Excellent Condition'],
    specs: ['Intel Core i7 11th Gen', '16GB RAM', '512GB SSD', '14" Full HD Display', 'USB-C Thunderbolt', 'HDMI', 'Fingerprint Reader', 'Windows 11 Pro'],
    idealFor: ['Software Engineering', 'Virtual Meetings', 'Video Editing', 'Machine Learning', 'Business Use'],
    homepageFeatured: true,
  },
  {
    id: 'lenovo-thinkpad-t490',
    name: 'Lenovo ThinkPad T490',
    price: '₦385,000',
    priceNum: 385000,
    category: 'UK Used Laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop',
    shortDesc: 'Legendary keyboard, legendary durability — perfect for developers and students.',
    condition: ['Direct UK Used', 'Professionally Tested'],
    specs: ['Intel Core i5 8th Gen', '16GB RAM', '256GB SSD', 'Full HD IPS Display', 'Spill Resistant Keyboard', 'Fingerprint Reader'],
    idealFor: ['Students', 'Developers', 'Data Work', 'Office Productivity'],
  },
  {
    id: 'laptop-stand',
    name: 'Adjustable Aluminium Laptop Stand',
    price: '₦18,500',
    priceNum: 18500,
    category: 'Accessory',
    image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=600&h=400&fit=crop',
    shortDesc: 'Improve posture and airflow. Works with any 10–17" laptop.',
    features: ['Adjustable Height', 'Foldable Design', 'Aluminium Alloy Build', 'Anti-Slip Silicone Pads', 'Supports 10–17" Laptops'],
    idealFor: ['Students', 'Remote Workers', 'Home Office Setup'],
  },
//   {
//     id: 'phone-stand',
//     name: 'Foldable Phone Stand',
//     price: '₦6,500',
//     priceNum: 6500,
//     category: 'Accessory',
//     image: 'https://images.unsplash.com/photo-1583394293214-0e813c633567?w=600&h=400&fit=crop',
//     shortDesc: 'Hands-free viewing for online classes, Zoom calls, and content creation.',
//     features: ['Adjustable Viewing Angle', 'Foldable & Lightweight', 'Fits Android & iPhone'],
//     idealFor: ['Online Classes', 'Zoom Meetings', 'Content Creation'],
//   },
  {
    id: 'wireless-mouse',
    name: 'Wireless Bluetooth Mouse',
    price: '₦13,500',
    priceNum: 13500,
    category: 'Accessory',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop',
    shortDesc: 'Silent, ergonomic, rechargeable. Works with Windows and macOS.',
    features: ['Silent Click', 'Rechargeable Battery', 'Ergonomic Design', 'USB Receiver', 'Bluetooth Connectivity'],
    idealFor: ['Productivity', 'Office Work', 'Students'],
    homepageFeatured: true,
  },
  {
    id: 'smart-fitness-watch',
    name: 'Smart Fitness Watch',
    price: '₦48,000',
    priceNum: 48000,
    category: 'Wearable',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
    shortDesc: 'Track health metrics and stay connected while staying productive.',
    features: ['Heart Rate Monitoring', 'Sleep Tracking', 'Step Counter', 'Call Notifications', 'Multiple Sports Modes', 'Long Battery Life'],
    idealFor: ['Health-Conscious Professionals', 'Students', 'Fitness Enthusiasts'],
  },
//   {
//     id: 'developer-hoodie',
//     name: 'Practicode Developer Hoodie',
//     price: '₦28,000',
//     priceNum: 28000,
//     category: 'Merch',
//     image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=400&fit=crop',
//     shortDesc: 'Premium cotton hoodie with exclusive Practicode branding.',
//     sizes: ['S', 'M', 'L', 'XL', 'XXL'],
//     colors: ['Black', 'White', 'Yellow'],
//     idealFor: ['Students', 'Instructors', 'Tech Enthusiasts'],
//     homepageFeatured: true,
//   },
  {
    id: 'practicode-tshirt',
    name: 'Practicode T-Shirt',
    price: '₦15,000',
    priceNum: 15000,
    category: 'Merch',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop',
    shortDesc: 'Premium-quality cotton. Perfect for tech events and everyday wear.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Multiple colours available'],
    idealFor: ['Everyday Wear', 'Tech Events', 'Hackathons'],
  },
  {
    id: 'tech-wall-frame',
    name: 'Inspirational Tech Wall Frame',
    price: '₦12,000',
    priceNum: 12000,
    category: 'Workspace',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop',
    shortDesc: 'Motivational dev-themed artwork to energise your workspace.',
    quote: '"Code. Build. Repeat." | "Stay Curious." | "Think Like a Developer."',
    features: ['Multiple Frame Sizes', 'Tech-Themed Artwork', 'Ready to Hang'],
    idealFor: ['Home Offices', 'Student Desks', 'Tech Spaces'],
  },
]

/** The three products shown on the homepage store preview */
export const homepageFeaturedProducts = storeProducts.filter(p => p.homepageFeatured)
