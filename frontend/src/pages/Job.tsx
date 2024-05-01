import JobDisplay from "../components/job/JobDisplay";
import RecruiterJob from "../components/job/recruiter/RecruiterJob";
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
    <JobDisplay />
  );
};

export default Job;