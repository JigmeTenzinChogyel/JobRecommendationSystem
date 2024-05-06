type ApplicationFragment = {
    id: number
    user: number
    job: number
    application_status: "accepted" | "rejected" | "processing"
    created_at: string
    updated_at: string
}

export type ApplicationResponse = ApplicationFragment

export type ApplicationCreate = {
    job_id: number
}
