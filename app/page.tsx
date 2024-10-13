import HeroSection from "./home/HeroSection";
import PostsSection from "./home/PostsSection";
import CalloutSection from "./home/CalloutSection";

export default function Home() {
  return (
    <>
      <HeroSection/> 
      <div className="container">
          
        <PostsSection/>
      </div> 
     
      <CalloutSection/>
    </>      
  );
}
