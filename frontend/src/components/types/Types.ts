export type LogInType = {
    email: string
    password: string
}

export type RegisterType = {
    email: string
    name: string
    password: string
    user_role: "seeker" | "recruiter"
    bio?: string
    avatar?: File
}

export type Me = {
    id: number
    name: string
    email: string
    user_type: "seeker" | "recruiter"
    created_at: string
    updated_at: string
}

export type Resume = {
    id: number
    user: number
    experience: []
    skills: []
    qualification: []
    resume_file: string
    created_at: string
    updated_at: string
}

export type Job = {
    id: number
    user: number
    title: string
    description: string
    location: string
    salary: number
    experience: []
    skills: []
    qualification: []
    deadline: string
    job_file: string
    created_at: string
    updated_at: string
}