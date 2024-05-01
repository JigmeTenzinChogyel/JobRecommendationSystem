type CompanyFragment = {
    id: number
    user: number
    name: string
    email: string
    description: string
    city: string
    country: string
    logo: string
    created_at: string
    updated_at: string
}

export type CompanyResponse = CompanyFragment

export type CompanyCreateType = {
    name: string
    email: string
    description: string
    city: string
    country: string
    logo: File
}