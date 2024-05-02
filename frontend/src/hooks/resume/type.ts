type ResumeFragment = {
    id: number
    resume_file: string
    experience?: string[]
    skills?: string[]
    qualification?: string[]
    created_at: string
    updated_at: string
}

export type createResumeType = {
    resume_file: File
}
export type resumeResponseType = ResumeFragment
export type updateResumeType = {
    resume_file?: File
    experience?: string[]
    skills?: string[]
    qualification?: string[]
}