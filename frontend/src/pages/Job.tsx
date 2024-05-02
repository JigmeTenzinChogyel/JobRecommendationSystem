import RecruiterJob from "../components/job/recruiter/RecruiterJob";
import SeekerJob from "../components/job/seeker/SeekerJob";
import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";

const Job = () => {

  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />
  }

  if(!user) {
    return <>no user</>
  }

  if(user.user_role === "recruiter") {
    return <RecruiterJob />
  }
  return (
    <SeekerJob />
  );
};

export default Job;