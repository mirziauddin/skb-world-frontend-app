import React from "react";
import { Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const plans = [
  {
    name: "HATCHLING PLAN",
    price: 29,
    features: [
      "Unlimited Support",
      "5GB Server Space",
      "2 Users per Project",
      "Email Integration",
      "Unlimited Download",
    ],
    unavailable: [3],
    bgColor: "bg-gradient-to-r from-purple-500 to-indigo-500",
  },
  {
    name: "BABY PLAN",
    price: 69,
    features: [
      "Unlimited Support",
      "10GB Server Space",
      "5 Users per Project",
      "Email Integration",
      "Unlimited Download",
    ],
    unavailable: [4],
    bgColor: "bg-gradient-to-r from-green-400 to-green-600",
  },
  {
    name: "PREMIUM PLAN",
    price: 99,
    features: [
      "Unlimited Support",
      "25GB Server Space",
      "10 Users per Project",
      "Email Integration",
      "Unlimited Download",
    ],
    unavailable: [],
    bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
  },
];

const PublicPremiumPurchase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-500 via-white-500 to-white-500 flex flex-col items-center justify-center py-10">
      {/* Introductory text component */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Plans & Pricing
        </h1>
        <p className="text-gray-500">
          Sample text. Lorem ipsum dolor sit amet, consectetur adipiscing elit
          nullam nunc justo sagittis suscipit ultrices.
        </p>
      </div>

      {/* Plans and Pricing component */}
      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 ${plan.bgColor}`}
          >
            <div className="text-white p-4 rounded-t-lg text-center text-xl font-bold mb-4">
              {plan.name}
            </div>
            <div className="text-center text-5xl font-bold text-gray-800 mb-4">
              ${plan.price}
            </div>
            <div className="text-center text-gray-500 mb-4">PER MONTH</div>
            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center justify-center">
                  {plan.unavailable.includes(idx) ? (
                    <CancelIcon color="error" />
                  ) : (
                    <CheckCircleIcon color="success" />
                  )}
                  <span className="ml-2 text-gray-800">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-center">
              <Button
                variant="contained"
                color="warning"
                className="bg-orange-500 hover:bg-orange-600"
              >
                CHOOSE PLAN
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicPremiumPurchase;
