import RandomJobs from "../components/job/Randomjobs";
import RecruiterJob from "../components/job/recruiter/RecruiterJob";
import SeekerJob from "../components/job/seeker/SeekerJob";
import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";

const Job = () => {

  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />
  }

  if(!user) {
    return <RandomJobs />
  }

  if(user.user_role === "recruiter") {
    return <RecruiterJob />
  }
  return (
    <SeekerJob />
  );
};

export default Job;