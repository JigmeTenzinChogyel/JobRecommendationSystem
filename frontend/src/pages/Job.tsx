import Hero from "../components/Hero/Hero";
import { JobHeroData } from "../components/Hero/HeroData";
import RandomJobs from "../components/job/Randomjobs";
import RecommendedJobs from "../components/job/RecommendedJobs";
import RecruiterJobList from "../components/job/RecruiterJobList";
import useMeResume from "../hooks/useMeResume";
import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";

const Job = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { resume } = useMeResume();
  const isResume = resume?.resume_file;

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Hero {...JobHeroData} />
        <RandomJobs />
      </>
    );
  }

  if (user === "seeker") {
    return (
      <>
        <Hero {...JobHeroData} />
        {isResume ? <RecommendedJobs /> : <RandomJobs />}
      </>
    );
  }

  return (
    <>
      <Hero {...JobHeroData} />
      <RecruiterJobList />
    </>
  );
};

export default Job;