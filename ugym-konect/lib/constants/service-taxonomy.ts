// Comprehensive Service Taxonomy for UGYM-KONECT

export const FITNESS_COACHING_SERVICES = [
  "Personal Trainer",
  "Strength & Conditioning Coach",
  "Group Class Instructor",
  "Yoga Instructor",
  "Pilates Instructor",
  "CrossFit Coach",
  "Calisthenics Coach",
  "HIIT Coach",
  "Aerobics Instructor",
  "Spin/Cycling Instructor",
  "Zumba Instructor",
  "Boxing Coach",
  "Kickboxing Coach",
  "MMA Coach",
  "Martial Arts Instructor (Taekwondo)",
  "Martial Arts Instructor (Karate)",
  "Martial Arts Instructor (Judo)",
  "Martial Arts Instructor (BJJ)",
  "Running Coach",
  "Triathlon Coach",
  "Swimming Coach",
  "Climbing Coach",
] as const

export const HEALTH_WELLNESS_SERVICES = [
  "Dietitian/Nutritionist",
  "Sports Nutritionist",
  "Physiotherapist",
  "Biokineticist",
  "Chiropractor",
  "Massage Therapist (Sports/Deep Tissue)",
  "Occupational Therapist",
  "Psychologist (Sports/Performance)",
  "Wellness Coach",
  "Sleep Coach",
  "Breathwork Coach",
  "Herbalist/Traditional Healer",
  "Naturopath",
  "Homeopath",
] as const

export const MEDICAL_SERVICES = [
  "GP (Sports Focus)",
  "Sports Physician",
  "Orthopedic Specialist",
  "Cardiologist (Sports Screening)",
  "Podiatrist",
  "Dermatologist (athlete-related)",
  "Endocrinologist (metabolism)",
] as const

export const TEAM_SPORTS_SERVICES = [
  "Soccer Club/Academy",
  "Rugby Club/Academy",
  "Cricket Club/Academy",
  "Basketball Club",
  "Netball Club",
  "Hockey Club",
  "Volleyball Club",
  "Athletics Club",
  "Esports Team Fitness Coaching",
  "Head Coach",
  "Assistant Coach",
  "Team Manager",
  "Physiotherapist (Team)",
  "Strength Coach (Team)",
  "Analyst/Scout",
] as const

export const SPECIALIST_SERVICES = [
  "Performance Analyst",
  "Sport Scientist",
  "Biomechanist",
  "Referee/Umpire Trainer",
  "Life Coach (Athletes)",
  "Injury Prevention Specialist",
] as const

export const SERVICE_CATEGORIES = {
  "Fitness & Coaching": FITNESS_COACHING_SERVICES,
  "Health & Wellness": HEALTH_WELLNESS_SERVICES,
  Medical: MEDICAL_SERVICES,
  "Team Sports": TEAM_SPORTS_SERVICES,
  Specialists: SPECIALIST_SERVICES,
} as const

export const ALL_SERVICES = [
  ...FITNESS_COACHING_SERVICES,
  ...HEALTH_WELLNESS_SERVICES,
  ...MEDICAL_SERVICES,
  ...TEAM_SPORTS_SERVICES,
  ...SPECIALIST_SERVICES,
] as const

export const SOUTH_AFRICAN_PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
] as const

export const MAJOR_CITIES = {
  Gauteng: ["Johannesburg", "Pretoria", "Sandton", "Randburg", "Roodepoort", "Germiston", "Benoni"],
  "Western Cape": ["Cape Town", "Stellenbosch", "Paarl", "George", "Worcester", "Hermanus"],
  "KwaZulu-Natal": ["Durban", "Pietermaritzburg", "Newcastle", "Richards Bay", "Ladysmith"],
  "Eastern Cape": ["Port Elizabeth", "East London", "Uitenhage", "King William's Town", "Grahamstown"],
  "Free State": ["Bloemfontein", "Welkom", "Kroonstad", "Bethlehem", "Sasolburg"],
  Limpopo: ["Polokwane", "Tzaneen", "Mokopane", "Thohoyandou", "Giyani"],
  Mpumalanga: ["Nelspruit", "Witbank", "Middelburg", "Secunda", "Standerton"],
  "Northern Cape": ["Kimberley", "Upington", "Kuruman", "De Aar", "Springbok"],
  "North West": ["Rustenburg", "Potchefstroom", "Klerksdorp", "Mahikeng", "Brits"],
} as const

export type ServiceType = (typeof ALL_SERVICES)[number]
export type ServiceCategory = keyof typeof SERVICE_CATEGORIES
export type Province = (typeof SOUTH_AFRICAN_PROVINCES)[number]
