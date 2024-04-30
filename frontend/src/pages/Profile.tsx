import Hero from "../components/Hero/Hero";
import { ProfileHeroData } from "../components/Hero/HeroData";

function Profile() {

    return (
        <>
            <Hero
                imageUrl={ProfileHeroData.imageUrl}
                heading={ProfileHeroData.heading}
                subHeading={ProfileHeroData.subHeading} 
                />
        </>
    )
}

export default Profile;