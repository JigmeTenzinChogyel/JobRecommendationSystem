type BookmarkFragment = {
    id: number
    user: number
    job: number
    created_at: string
    updated_at: string
}

export type BookmarkResponse = BookmarkFragment

export type BookmarkCreate = {
    job_id: number
}