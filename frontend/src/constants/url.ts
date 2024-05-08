// user auth and services
export const LOGIN_URL = "user/login/"
export const REGISTER_URL = "user/register/"
export const REFRESH_URL = "token/refresh/"
export const ME_URL = "user/me/"
export const ME_UPDATE = "user/update/"
export const USER = (id: number) => `user/${id}/`

// resume services
export const RESUME_CREATE = "resumes/create/"
export const RESUME_UPDATE = "resumes/update/"
export const RESUME_DELETE = "resumes/delete/"
export const RESUME_ME = "resumes/me/"
export const RESUME_ID = (id: number) => `resumes/${id}/`;
export const RESUME_RECOMMENDATION = "resumes/recommend"
export const RESUME_USER = "resumes/user"

// job services
export const JOB_CREATE = "jobs/create/"
export const JOB_UPDATE = (id: number) => `jobs/${id}/update/`
export const JOB_DELETE = (id: number) => `jobs/${id}/delete/`
export const JOB_DETAIL = (id: number) => `jobs/${id}/`
export const JOB_RECOMMENDATION = "jobs/recommended"
export const JOB_RANDOM = "jobs/random/"
export const JOB_USER = "jobs/user/"
export const JOB_BOOKMARK = "jobs/bookmark/"
export const JOB_SIMILAR = "jobs/similar"

// company services
export const COMPANY_CREATE = "company/create/"
export const COMPANY_UPDATE = "company/update/"
export const COMPANY_DELETE = "company/delete/"
export const COMPANY_DETAIL = "company/"
export const COMPANY_USER = "company/user"
export const COMAPNY_ID = "company/<int:pk>/"
export const COMAPNIES = "companies/"

// bookmark services
export const BOOKMARK_CREATE = "bookmarks/create/"
export const BOOKMARK_DELETE = (id: number) => `bookmarks/${id}/delete/`
export const BOOKMARK_JOB = "bookmarks/job"

// application services
export const APPLICATION_CREATE = "applications/create/"
export const APPLICATION_DELETE = (id: number) => `applications/${id}/delete/`
export const APPLICATION_JOB = "applications/job"
export const APPLICATIONS = "applications"

// stats services
export const STATS = "stats/"