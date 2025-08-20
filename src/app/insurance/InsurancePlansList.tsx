// app/insurance/InsurancePlansList.tsx

import SearchAndSort from "./SearchAndSort";


type InsurancePlan = {
  _id: string;
  type: string;
  title: string;
  coverage: string;
  premium: string;
  term: string;
  bannerUrl: string;
};

export default function InsurancePlansList({ plans }: { plans: InsurancePlan[] }) {
  return (
    <div className="w-full md:w-10/12 mx-auto mb-20">
      <div className="my-20">
        
          <h2 className="text-5xl font-bold mb-8 text-center">
            Our Insurance Plans
          </h2>
          <p className="text-center">
            InsureEase helps you find the perfect insurance plan quickly and easily. 
            Learn why Health Savings Accounts are a critical benefit in employee retention.
          </p>

          {/* Client-side search + sorting */}
          <SearchAndSort plans={plans} />
        
      </div>
    </div>
  );
}
