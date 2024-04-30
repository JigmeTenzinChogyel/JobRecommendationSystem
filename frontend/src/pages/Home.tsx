import { useAuth } from "../providers/AuthProvider";
import Loading from "./Loading";
import Hero from "../components/Hero/Hero";
import {
  HomeHeroData,
  HomeHeroDataRecruiter,
  HomeHeroDataSeeker,
} from "../components/Hero/HeroData";
import { useNavigate } from "react-router-dom";
import useMeResume from "../hooks/useMeResume";

function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { resume } = useMeResume();
  const navigate = useNavigate();
  const isCV = resume?.resume_file;

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return (
      <Hero
        minH="40vh"
        imageUrl={HomeHeroData.imageUrl}
        heading={HomeHeroData.heading}
        subHeading={HomeHeroData.subHeading}
        buttonName="Get Started"
        handleClick={() => navigate("/register")}
      />
    );
  }

  if (user === "seeker") {
    if (!isCV) {
      return (
        <Hero
          minH="40vh"
          imageUrl={HomeHeroDataSeeker.imageUrl}
          heading={HomeHeroDataSeeker.heading}
          subHeading={HomeHeroDataSeeker.subHeading}
          buttonName="Upload CV"
          handleClick={() => navigate("/register")}
        />
      );
    }

    return (
      <Hero
        minH="40vh"
        imageUrl={HomeHeroDataSeeker.imageUrl}
        heading={HomeHeroDataSeeker.heading}
        subHeading={HomeHeroDataSeeker.subHeading}
        buttonName="Check Jobs"
        handleClick={() => navigate("/job")}
      />
    );
  }

  return (
    <Hero
      minH="40vh"
      imageUrl={HomeHeroDataRecruiter.imageUrl}
      heading={HomeHeroDataRecruiter.heading}
      subHeading={HomeHeroDataRecruiter.subHeading}
      buttonName="Post Job"
      handleClick={() => navigate("/job/post")}
    />
  );
}

export default Home;
