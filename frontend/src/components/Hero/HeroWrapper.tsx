import Loading from "../../pages/Loading";
import { useAuth } from "../../providers/AuthProvider";
import Hero from "./Hero";
import { HomeHeroData, HomeHeroDataRecruiter, HomeHeroDataSeeker } from "./HeroData";

const HeroWrapper = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Hero {...HomeHeroData}/>
        {children}
      </>
    );
  }

  if (user?.user_role === "seeker") {
    return (
      <>
        <Hero {...HomeHeroDataSeeker}/>
        {children}
      </>
    );
  }

  return (
    <>
      <Hero {...HomeHeroDataRecruiter}/>
      {children}
    </>
  );
};

export default HeroWrapper;
