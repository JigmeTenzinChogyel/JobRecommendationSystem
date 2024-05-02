// user auth and services
export const LOGIN_URL = "user/login/"
export const REGISTER_URL = "user/register/"
export const REFRESH_URL = "token/refresh/"
export const ME_URL = "user/me/"
export const ME_UPDATE = "user/update/"

// resume services
export const RESUME_CREATE = "resumes/create/"
export const RESUME_UPDATE = "resumes/update/"
export const RESUME_DELETE = "resumes/delete/"
export const RESUME_ME = "resumes/me/"
export const RESUME_ID = (id: number) => `resumes/${id}/`;

// job services
export const JOB_CREATE = "jobs/create/"
export const JOB_UPDATE = (id: number) => `jobs/${id}/update/`
export const JOB_DELETE = (id: number) => `jobs/${id}/delete/`
export const JOB_DETAIL = (id: number) => `jobs/${id}/`
export const JOB_RECOMMENDATION = "jobs/recommended/"
export const JOB_RANDOM = "jobs/random/"
export const JOB_USER = "jobs/user/"

// company services
export const COMPANY_CREATE = "company/create/"
export const COMPANY_UPDATE = "company/update/"
export const COMPANY_DELETE = "company/delete/"
export const COMPANY_DETAIL = "company/"
export const COMPANY_USER = "company/user"
export const COMAPNY_ID = "company/<int:pk>/"