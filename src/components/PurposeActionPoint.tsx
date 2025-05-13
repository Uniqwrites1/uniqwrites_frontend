export default function PurposeActionPoint() {
  return (
    <section className="my-16 px-6 py-10 bg-gray-100 rounded-xl shadow-sm">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Purpose Action Point (PAP)
          </h2>
          <p className="text-gray-600 mb-6">
            A purpose-driven 8-month learning experience to help students discover their calling, bridge academic gaps, and align with meaningful careers.
          </p>
          <a
            href="/purpose-action-point"
            className="inline-block bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition"
          >
            Learn More
          </a>
        </div>

        <div className="flex-1">
          <img
            src="/images/pap-placeholder.png"
            alt="Purpose Action Point"
            className="w-full h-auto rounded-md shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
