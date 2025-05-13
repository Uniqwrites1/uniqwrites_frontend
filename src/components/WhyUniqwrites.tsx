import React from "react";

const WhyUniqwrites = () => {
  return (
    <section className="px-6 py-10 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-lg font-bold mb-3">Why Parents Choose Us?</h3>
          <ul className="list-inside list-disc text-sm text-gray-700">
            <li>Trained and fully supported teachers</li>
            <li>Personalized curriculum and approach</li>
            <li>Full progress tracking by parents</li>
            <li>Best Prices</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-3">Why Teachers Love Us?</h3>
          <ul className="list-inside list-disc text-sm text-gray-700">
            <li>Empowered Through Training</li>
            <li>Real Opportunities, Not Just Promises</li>
            <li>A Thriving Community & Resource Hub</li>
            <li>Purpose-Driven Impact & Recognition</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyUniqwrites;
