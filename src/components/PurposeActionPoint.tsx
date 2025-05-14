import { Link } from 'react-router-dom';

export default function PurposeActionPoint() {
  return (    <section className="my-16 px-6 py-12 bg-black rounded-xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.343 0L13.857 8.485 15.272 9.9l7.9-7.9h-.83zm5.657 0L19.514 8.485 20.93 9.9l8.485-8.485h-1.415zM32.372 0L26.03 6.343 27.444 7.757l6.343-6.343h-1.415zm4.242 0L28.03 8.586 29.444 10l8.485-8.485h-1.315zm3.657 0l-8.485 8.485 1.415 1.415L41.8 0h-1.415zm4.243 0L36.03 8.585 37.443 10 45.93 1.515 44.514 0zm3.657 0l-8.485 8.485L39.8 10l8.485-8.485L47.8 0zm4.242 0L43.558 8.485 44.973 9.9 52.8 2.072V0h-.758zM0 5.373l.828.828L2.243 5.03 0 2.787v2.586zm0 5.657l3.657 3.657-1.414 1.414L0 13.715v-2.685zm0 5.657l6.485 6.485-1.414 1.415L0 13.73v2.97zm0 5.657l9.314 9.313-1.415 1.415L0 19.514v2.828zm0 5.657L12.142 40.4l-1.414 1.414L0 30.93v-2.828zm0 5.657L14.97 45.83l-1.414 1.414L0 34.387v2.828zm0 5.657L17.8 51.2l-1.415 1.415L0 37.844v2.828zm0 5.657l20.627 20.627-1.414 1.414L0 41.3v2.828zm0 5.657l23.457 23.457-1.414 1.414L0 44.73v2.828zm0 5.657l26.284 26.284-1.414 1.414L0 48.157v2.828zm0 5.657l29.113 29.114-1.414 1.414L0 51.586v2.828zm0 5.657l31.94 31.94-1.414 1.415L0 55.014v2.828zM4.485 61L61 4.485 59.586 3.07 3.07 59.586 4.485 61zm5.657 0L61 10.142l-1.414-1.414L8.728 59.586 10.142 61zm5.657 0L61 15.8l-1.414-1.414-49.3 49.3L15.8 61zm5.657 0L61 21.456l-1.414-1.414-43.642 43.642L21.456 61zm5.657 0L61 27.113l-1.414-1.414L25.9 59.586 27.113 61zm5.657 0L61 32.77l-1.414-1.414L31.557 59.586 32.77 61zm5.657 0L61 38.427l-1.414-1.414L37.214 59.586 38.427 61zm5.657 0L61 44.084l-1.414-1.414L42.87 59.586 44.084 61zm5.657 0L61 49.74l-1.414-1.414L48.528 59.586 49.74 61zm5.657 0L61 55.398l-1.414-1.414L54.185 59.586 55.398 61zm5.657 0L61 61.056l-1.414-1.414L59.842 59.586 61.056 61z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E\")"
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Purpose Action Point (PAP)
          </h2>
          <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8">          <p className="text-gray-100 text-lg mb-8 leading-relaxed">
            A transformative 9-month learning journey designed to help students discover their true calling, 
            bridge academic gaps, and align their education with meaningful career paths. Join us in shaping 
            futures that matter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-yellow-400 text-xl font-bold mb-2">Discover</div>
              <p className="text-gray-200">Uncover your unique strengths and potential</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-yellow-400 text-xl font-bold mb-2">Learn</div>
              <p className="text-gray-200">Bridge gaps with targeted academic support</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
              <div className="text-yellow-400 text-xl font-bold mb-2">Grow</div>
              <p className="text-gray-200">Align education with meaningful careers</p>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/PurposeActionPoint"
              className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow hover:shadow-lg"
            >
              Learn More About PAP
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
