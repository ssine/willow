export interface University {
  name: string
  abbreviations: string[]
  location?: {
    latitude: number
    longitude: number
  }
  csrankings_rank?: number
}

export interface TOEFLScore {
  reading: number | null
  listening: number | null
  speaking: number | null
  writing: number | null
  total: number | null
}

export interface GREScore {
  verbal: number | null
  quant: number | null
  AW: number | null
  total: number | null
}

export interface GPA {
  scale_4?: number
  scale_4_3?: number
  scale_100?: number
}

export interface Program {
  university: string
  name: string
  abbreviations: string[]
  timeline: {
    opening: string | null
    early_deadline: string | null
    final_deadline: string | null
  }
  TOEFL: {
    minimum: TOEFLScore
    institution_code: string
    department_code: string
  }
  GRE: {
    minimum: GREScore
    institution_code: string
    department_code: string
  }
  GPA: {
    minimum: GPA
  }
  cost: {
    semester: number
    tuition_per_semester: number
  }
  website: string
}

export interface PastUniversity {
  major: string
  gpa: GPA
  university_level: string
  university: string
}

export interface Applicant {
  id: string
  diploma: 'bachelor' | 'graduate'
  GRE: GREScore
  TOEFL: TOEFLScore
  bachelor: PastUniversity
  graduate?: PastUniversity
  background: string
}

export interface Application {
  applicant: string
  year: string
  university: string
  degree: string
  program: string
  semester: string
  result: "OFFER" | "AD" | "WL" | "REJ"
  country: string
  info: string
  url: string
  timeline: {
    inform_time: string
    submit_time: string
  }
}
