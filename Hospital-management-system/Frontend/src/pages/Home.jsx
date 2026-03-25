import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-50">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            BetterLife Healthcare Platform
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            A modern hospital management system designed to simplify healthcare
            operations, improve patient experience, and empower medical professionals.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </Link>

            <Link
              to="/services"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-700 transition"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Choose BetterLife?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-green-600">
              Smart Appointments
            </h3>
            <p className="text-gray-600">
              Patients can easily book appointments while doctors manage schedules efficiently.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-green-600">
              Role-Based Dashboards
            </h3>
            <p className="text-gray-600">
              Separate dashboards for Admin, Doctors, and Patients for better control and security.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-green-600">
              Secure Medical Records
            </h3>
            <p className="text-gray-600">
              All patient records are securely managed and accessible only to authorized users.
            </p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Experience Better Healthcare Management
          </h2>

          <p className="text-gray-600 mb-6">
            Join BetterLife today and bring efficiency, transparency, and care
            together on one powerful platform.
          </p>

          <Link
            to="/login"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Login to BetterLife
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
