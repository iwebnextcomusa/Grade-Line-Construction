/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ServiceDetail, ProjectItem, TestimonialItem } from "./types";

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "excavation",
    title: "Excavation",
    shortDesc: "Precision digging and earth-moving services for residential & commercial foundations, basements, and pools.",
    longDesc: "Grade Line Construction delivers professional excavation services using state-of-the-art heavy machinery and GPS-guided precision. Whether we are digging basements for custom home builds or carving out massive foundations for commercial developments in Tooele County, our team ensures correct structural footing, exact dimensions, and safe trenching compliant with all OSHA guidelines.",
    bulletPoints: [
      "Residential basement & foundation digging",
      "Commercial footing excavation",
      "Swimming pool cavity digging",
      "Retaining wall earth-moving",
      "Advanced slope & soil stabilization"
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?q=80&w=800&auto=format&fit=crop",
    iconName: "Shovel"
  },
  {
    id: "site-preparation",
    title: "Site Preparation",
    shortDesc: "Initial site evaluations, layout staking, and comprehensive ground preparation to begin construction.",
    longDesc: "A successful build starts from the ground up, and that means proper site preparation. We analyze soil conditions, handle vegetation removal, layout blueprints onto physical coordinates, and establish engineered site profiles. We prepare standard pads for residential housing, garages, barns, commercial facilities, and accessory dwelling units (ADUs).",
    bulletPoints: [
      "Professional home & building pad preparation",
      "Laser-guided elevation charting",
      "Soil compaction & testing prep",
      "Erosion control setup & silt fencing",
      "Sewer & drainage slope structuring"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    iconName: "Compass"
  },
  {
    id: "grading",
    title: "Grading",
    shortDesc: "Engineered slope leveling, finish grading, and surface drainage management to protect properties.",
    longDesc: "Incorrect grading is the number one cause of foundation water damage. Grade Line Construction specializes in rough and final grading, ensuring surface water flows safely away from your structures. Using advanced grader blades and laser systems, we achieve tight tolerances on properties across Grantsville, protecting your long-term property investment.",
    bulletPoints: [
      "Rough grading for subdivision plots & lots",
      "Finish grading for sod, turf, or seed prep",
      "Positive drainage slope correction",
      "Swale and burm carving for water management",
      "Soil aeration and distribution"
    ],
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
    iconName: "Layers"
  },
  {
    id: "land-clearing",
    title: "Land Clearing",
    shortDesc: "Removal of brush, trees, rocks, stumps, and old structures to recover usable building space.",
    longDesc: "Overgrown vegetation, boulders, and old footings can halt construction before it begins. Our land clearing services remove trees, underbrush, organic stumps, and debris. We recycle what we can on-site via mulching or arrange for fast, complete removal so your structural or agricultural project can move forward without visual or physical obstructions.",
    bulletPoints: [
      "Stump grinding and complete root extraction",
      "Large rock & boulder extraction & hauling",
      "Old structure & concrete demo & removal",
      "Agricultural brush hogging & reclamation",
      "Eco-conscious vegetation management"
    ],
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=800&auto=format&fit=crop",
    iconName: "Trees"
  },
  {
    id: "utility-trenching",
    title: "Utility Trenching",
    shortDesc: "Safe, deep excavation for water, power, gas, sewer, fiber optic, and electrical conduits.",
    longDesc: "We provide specialized utility trenching to hook up utilities to main lines, following strict depth, bedding, and warning-tape guidelines set by Utah municipalities. Our operators work carefully around existing pipelines, using accurate locators, to lay the foundation for sewer lines, water mains, power hookups, and telecommunication conduits.",
    bulletPoints: [
      "Water main & residential service trenching",
      "Sewer lateral runs & trench grading",
      "Electrical & power conduit preparation",
      "Gas line trenching & backfilling",
      "Underground drainage & French drain systems"
    ],
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    iconName: "GitCommit"
  },
  {
    id: "driveway-road-prep",
    title: "Driveway and Road Preparation",
    shortDesc: "Subgrade cutting, gravel layering, and compaction for direct driveway, private road, or parking layouts.",
    longDesc: "A road is only as good as the subgrade supporting it. We carve clean channels for driveways, farm trails, and private roads, followed by applying, shaping, and heavily compacting base gravel. This guarantees maximum load-bearing integrity and minimizes future runtime cracking, water puddling, or rutting under heavy equipment.",
    bulletPoints: [
      "Subgrade grading and soil stabilization base",
      "Aggregate / Road Base spreading & grading",
      "Compaction to engineering specs",
      "Culvert pipe installations under crossings",
      "Long-term drainage flow design alongside lanes"
    ],
    imageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=800&auto=format&fit=crop",
    iconName: "TrendingUp"
  },
  {
    id: "residential-construction",
    title: "Residential Construction",
    shortDesc: "Complete site preparation package support for custom home builders and residential property owners.",
    longDesc: "Our residential services package takes the stress out of starting a new custom home build. We work directly with home builders, draftsmen, and property owners from early-stage brush removal up through deep basement excavation, utility line layouts, custom gravel driveways, and the final look sweep so your landscapers can step onto a perfectly prepared slate.",
    bulletPoints: [
      "Custom home site work packages",
      "Footing and pad preparation for outbuildings & garages",
      "Yard leveling, reshaping, and terrace builds",
      "Septic field layout & deep excavation tank placement",
      "Home builder subcontractor partnerships"
    ],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    iconName: "Home"
  },
  {
    id: "commercial-construction",
    title: "Commercial Construction",
    shortDesc: "Large-scale site work, commercial foundation pads, commercial utilities, and civil grading services.",
    longDesc: "Grade Line Construction partners with commercial developers, civil contractors, and municipal planners to complete complex commercial site projects on schedule. We maintain a high standard of precision, rigorous safety safety protocols, and are equipped to execute high-volume structural pads, massive parking lot pre-grading, and heavy-duty utilities.",
    bulletPoints: [
      "Large commercial warehouse & retail pad prep",
      "Asphalt parking lot sub-base grading & prep",
      "Heavy-duty civil stormwater management ponds",
      "Mainline water & sewer installations",
      "Retaining wall base preparation and structural backfills"
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    iconName: "Briefcase"
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-1",
    title: "Grantsville Custom Home Site Work",
    category: "SitePrep",
    description: "Multi-acres custom site preparation, including wild sagebrush land clearing, basement excavation, gravel driveway creation, and finish contour grading.",
    location: "Grantsville, UT",
    completedYear: "2025",
    beforeImageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop", // wild dry site
    afterImageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop", // clean construction site
    highlights: [
      "1.5 Acres brush & rock completely cleared",
      "3,200 sq.ft. basement dug to exact blueprint depth in rocky soil",
      "250ft compressed road base gravel driveway with 18-inch culvert pipe",
      "Engineered pad matching 98% compaction specs"
    ]
  },
  {
    id: "project-2",
    title: "Commercial Pad & Parking Lot Grading",
    category: "Grading",
    description: "Precision leveling and slope correction for a new retail storefront, establishing safe runoff drains, parking lot subgrade compacted for asphalt.",
    location: "Tooele, UT",
    completedYear: "2025",
    beforeImageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop", // active building site preparation on bare soil
    afterImageUrl: "https://images.unsplash.com/photo-1605152276897-4f618f831968?q=80&w=800&auto=format&fit=crop", // leveled and compacted commercial subgrade pad with grading machinery
    highlights: [
      "GPS laser grading with less than 0.5-inch tolerance deviation",
      "Established standard swales directing stormwater to catch basins",
      "Imported 400 tons of structured road base material",
      "Prepped for 35,000 sq.ft of asphalt laying"
    ]
  },
  {
    id: "project-3",
    title: "Utility Main Trench & Sewer Hookups",
    category: "Utilities",
    description: "Deep trench excavation through high soil-density clay, placing sewer lines and primary heavy water conduit for a new residential development.",
    location: "Erda, UT",
    completedYear: "2024",
    beforeImageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop", // empty land block
    afterImageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop", // structured utility piping/trench
    highlights: [
      "800 Linear feet of safety-trench box dig",
      "Precise 1.5% sewer flow grade alignment",
      "Safe water-stop backfill & gravel packing",
      "Zero safety incidents or service interruptions"
    ]
  },
  {
    id: "project-4",
    title: "Acreage Brush Clearing & Farm Roads",
    category: "Clearing",
    description: "Reclaimed 5 acres of agricultural land overgrown with juniper trees and large boulders, cutting visual and solid farm trail linkages.",
    location: "Stansbury Park, UT",
    completedYear: "2024",
    beforeImageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop", // dense brush
    afterImageUrl: "https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=800&auto=format&fit=crop", // neat gravel farm path
    highlights: [
      "Extracted 42 large juniper tree stumps",
      "Moved over 80-tons of natural glacial boulders",
      "Formulated farm roads suitable for grain trucks",
      "Complete wood mulching on-site for custom land trails"
    ]
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "review-1",
    author: "Dan Harrison",
    role: "Custom Home Builder",
    location: "Grantsville, UT",
    rating: 5,
    text: "Claude and the Grade Line crew are hands down the most precise excavation contractors we've worked with in Utah. Their basements are always dug strictly on schedule, level, and on-line. Saves us massive headaches framing and pouring concrete. Highly recommend!",
    date: "April 2026"
  },
  {
    id: "review-2",
    author: "Sarah Jenkins",
    role: "Property Owner",
    location: "Tooele, UT",
    rating: 5,
    text: "We needed five acres cleared of large trees, boulders, and ancient structures for our dream estate. Grade Line was incredible! They cleared everything, graded a perfectly flat home pad, and cut a beautiful gravel driveway in just four days. Transparent estimate, no surprise fees—absolutely trustworthy.",
    date: "March 2026"
  },
  {
    id: "review-3",
    author: "Robert Miller",
    role: "Miller Dev Group",
    location: "Stansbury Park, UT",
    rating: 5,
    text: "For commercial site prep, Grade Line Construction checks all the boxes. Licensed, insured, highly safety-oriented, and equipped with serious heavy equipment. They completed our logistics site pad on schedule and hit our exact compaction rating targets on the first try.",
    date: "January 2026"
  },
  {
    id: "review-4",
    author: "Claude Miller",
    role: "Rancher",
    location: "Rush Valley, UT",
    rating: 5,
    text: "Had severe water pooling issues around our horse barns every spring. Claude came out, analyzed the slope, dug custom swales, and corrected the grade around all our barns. We just went through the spring runoff season, and the barn stays absolutely level and bone dry.",
    date: "May 2026"
  }
];

export const FAQS_DATA = [
  {
    q: "Are you licensed and insured in the state of Utah?",
    a: "Yes, Grade Line Construction is fully licensed and insured for both residential and commercial projects. Safety is our primary focus, and we carry comprehensive liability and workers' compensation coverage."
  },
  {
    q: "Do you offer free estimates or site evaluations?",
    a: "Absolutely! We provide free, comprehensive estimate packages in Grantsville and surrounding areas. For most properties, a quick site inspection by Claude allows us to draft an accurate, fixed-price quote outlining all materials, heavy machinery hours, and schedules."
  },
  {
    q: "How does grading protect my home from water damage?",
    a: "Proper grading establishes what we call 'positive slope', meaning the soil rises adjacent to your home and gently falls as it moves outward. This ensures rain, melting snow, and gutter water flow cleanly away from foundation walls rather than pooling and cracking your foundations or flooding basements."
  },
  {
    q: "What areas in Utah do you travel to?",
    a: "Based in Grantsville, Utah, we regularly serve clients across Tooele County (including Tooele City, Stansbury Park, Erda, Rush Valley, and Lake Point), Salt Lake County (West Valley, Salt Lake City, Herriman, South Jordan), and southern Utah regions depending on the project scope."
  }
];
