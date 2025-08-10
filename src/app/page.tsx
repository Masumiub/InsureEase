import FAQs from "@/components/FAQs";
import Features from "@/components/Features";
import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import Points from "@/components/Points";


export default function Home() {
  return (
    <div>
      <div className="bg-blue-50">
        <div className="w-full md:w-10/12 mx-auto">
          <Header></Header>
        </div>
      </div>

      <div className="w-full md:w-10/12 mx-auto">
        <Features></Features>
      </div>

      <div className="bg-blue-50">
        <div className="w-full md:w-10/12 mx-auto">
          <Points></Points>
        </div>

      </div>

      <div className="w-full md:w-10/12 mx-auto">
        <Testimonials></Testimonials>
        <FAQs></FAQs>
      </div>


    </div>
  );
}
