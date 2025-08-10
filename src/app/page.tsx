import FAQs from "@/components/FAQs";
import Features from "@/components/Features";
import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import Points from "@/components/Points";


export default function Home() {
  return (
    <div className="w-full md:w-10/12 mx-auto">
      <Header></Header>
      <Features></Features>
      <Points></Points>
      <Testimonials></Testimonials>
      <FAQs></FAQs>
    </div>
  );
}
