type JobFragment = {
    id: number
    user: number
    title: string
    summary: string
    description: string
    min_salary: number
    max_salary: number
    experience?: string[]
    skills?: string[]
    qualification?: string[]
    deadline: string
    job_file?: string
    created_at: string
    updated_at: string
}

export type JobResponse = JobFragment;

export type JobCreate = {
    title: string
    summary: string
    description: string
    min_salary: number
    max_salary: number
    job_file?: File
    deadline: Date
}

export type JobUpdate = {
    title?: string
    summary?: string
    description?: string
    min_salary?: number
    max_salary?: number
    experience?: string[]
    skills?: string[]
    qualification?: string[]
    deadline?: string
    job_file?: string
}