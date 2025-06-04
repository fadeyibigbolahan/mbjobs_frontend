import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

const subscriptionPlans = [
  {
    name: "Free (Trial)",
    monthly: 0,
    features: [
      "14-day trial",
      "Max 50 members per organization",
      "Member Roles (Owner, Admin, Manager , Member)",
      "Membership Levels (Basic, Silver, Gold)",
      "Manual Approval of Members",
    ],
  },
  {
    name: "Basic Plan",
    monthly: 19,
    features: [
      "Max 200 members per organization",
      "Member Roles (Owner, Admin, Manager , Member)",
      "Membership Levels (Basic, Silver, Gold)",
      "Manual Approval of Members",
      "Advanced Filtering & Search",
      "Wallet & Points System",
      "Events Management (Basic Only)",
      "Export Members (CSV)",
      "Activity Logs (Recent Actions)",
      "Bulk Email to Members (200/month)",
    ],
  },
  {
    name: "Pro Plan",
    monthly: 49,
    features: [
      "Max 1,000 members per organization",
      "Member Roles (Owner, Admin, Manager , Member)",
      "Membership Levels (Basic, Silver, Gold)",
      "Manual Approval of Members",
      "Advanced Filtering & Search",
      "Wallet & Points System",
      "Events Management (Full Access)",
      "Export Members (CSV)",
      "Activity Logs (Recent Actions)",
      "Custom Branding",
      "Priority Support",
      "Bulk Email to Members (2,000/month)",
      "API Access (Rate-limited)",
    ],
  },
  {
    name: "Enterprise Plan",
    monthly: "Custom",
    price: "Custom Pricing",
    features: [
      "Unlimited members per organization",
      "Member Roles (Owner, Admin, Manager , Member)",
      "Membership Levels (Basic, Silver, Gold)",
      "Manual Approval of Members",
      "Advanced Filtering & Search",
      "Wallet & Points System",
      "Events Management (Full Access + Add-ons)",
      "Export Members (CSV)",
      "Activity Logs (Recent Actions)",
      "Custom Branding",
      "Dedicated Manager",
      "Bulk Email to Members (Unlimited + Custom SMTP)",
      "API Access (Full Access & Webhooks)",
    ],
  },
];

const Pricing = () => {
  const [subRange, setSubRange] = useState("Monthly");

  return (
    <section className="w-full min-h-screen flex flex-col items-center px-4 py-8 gap-4">
      <h2 className="font-kanit mb-4 text-center md:text-start w-full text-3xl font-semibold text-[#003366 ]">
        Choose a plan for your Organization.
      </h2>
      <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4">
        <p className="text-xs text-slate-500 w-[300px] text-center md:text-start">
          Get the right plan for your organization. Plan can be upgraded in the
          future.
        </p>
        <div className="flex justify-center items-center mt-5">
          <div className="w-full flex justify-center gap-2">
            <Button
              variant={subRange === "Monthly" ? "default" : "outline"}
              onClick={() => setSubRange("Monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={subRange === "Yearly" ? "default" : "outline"}
              onClick={() => setSubRange("Yearly")}
            >
              Yearly (Save 20%)
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:w-[80%]">
        {subscriptionPlans.map((plan, idx) => {
          const isCustom = plan.price === "Custom Pricing";
          let price = plan.monthly;

          if (
            subRange === "Yearly" &&
            !isCustom &&
            typeof plan.monthly === "number"
          ) {
            const monthlyTotal = plan.monthly * 12;
            const discounted = monthlyTotal * 0.8;
            price = {
              discounted,
              original: monthlyTotal,
            };
          }

          return (
            <PlanCard
              key={idx}
              name={plan.name}
              price={price}
              isCustom={isCustom}
              features={plan.features}
              subRange={subRange}
            />
          );
        })}
      </div>
    </section>
  );
};

const PlanCard = ({ name, price, features, isCustom, subRange }) => {
  let displayPrice;

  if (isCustom) {
    displayPrice = (
      <div className="font-kanit text-2xl font-semibold text-black">
        Custom Pricing
      </div>
    );
  } else if (typeof price === "object") {
    displayPrice = (
      <div className="flex items-baseline gap-2">
        <span className="font-kanit text-2xl font-semibold text-black">
          ${price.discounted.toFixed(0)}/year
        </span>
        <span className="font-kanit text-sm line-through text-gray-500">
          ${price.original.toFixed(0)}
        </span>
      </div>
    );
  } else {
    displayPrice = (
      <div className="flex items-baseline">
        <span className="font-kanit text-2xl font-semibold text-black">
          ${price}
        </span>
        <span className="font-kanit text-sm text-gray-500">
          /{subRange.toLowerCase()}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between md:h-[500px] h-[520px] w-full shadow-xl p-4 gap-4 border border-slate-200 rounded-lg">
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <div className="flex justify-start items-center w-full gap-2">
          <div className="flex justify-center items-center bg-blue-200 rounded-full w-[16px] h-[16px]">
            <div className="bg-blue-600 rounded-full w-[8px] h-[8px]"></div>
          </div>
          <p className="text-center text-sm font-semibold text-[#003366 ]">
            {name}
          </p>
        </div>
        <div className="w-full">{displayPrice}</div>
        <div className="flex flex-col justify-start items-start w-full gap-2 max-h-[350px] overflow-y-auto pr-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Play fill="#7A54A1" color="#7A54A1" size={10} />
              <p className="text-xs">{feature}</p>
            </div>
          ))}
        </div>
      </div>
      <Button className="w-full bg-white text-black border border-black hover:bg-black hover:text-white">
        {isCustom ? "Contact Us" : "Get Plan"}
      </Button>
    </div>
  );
};

export default Pricing;
