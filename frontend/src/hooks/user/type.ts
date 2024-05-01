type UserFragment = {
    id: number
    email: string
    name: string
    user_role: "seeker" | "recruiter"
    bio?: string
    avatar?: string
    created_at: string
    updated_at: string
}

export type MeResponse = UserFragment;