import Loading from "../../pages/Loading";
import { useAuth } from "../../providers/AuthProvider";
import Hero from "../Hero/Hero";
import { JobHeroData } from "../Hero/HeroData";

const JobWrapper = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Hero
          imageUrl={JobHeroData.imageUrl}
          heading={JobHeroData.heading}
          subHeading={JobHeroData.subHeading}
        />
        {children}
      </>
    );
  }

  if (user === "seeker") {
    return (
      <>
        <Hero
          imageUrl={JobHeroData.imageUrl}
          heading={JobHeroData.heading}
          subHeading={JobHeroData.subHeading}
        />
        {children}
      </>
    );
  }

  return (
    <>
      <Hero
        imageUrl={JobHeroData.imageUrl}
        heading={JobHeroData.heading}
        subHeading={JobHeroData.subHeading}
      />
      {children}
    </>
  );
};

export default JobWrapper;
