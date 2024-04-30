export type JobType = {
    id?: number
    title: string;
    description: string;
    location: string;
    salary: number;
    deadline: string;
    experience: [string]
    skills: [string]
    qualification: [string]
    job_file?: string
};