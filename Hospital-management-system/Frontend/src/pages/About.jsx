function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Header Section */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            About BetterLife
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            BetterLife is a modern healthcare management platform designed to
            simplify hospital operations and improve patient care through
            technology.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            Our mission is to provide hospitals and clinics with a reliable,
            secure, and easy-to-use system that enhances efficiency and ensures
            better patient outcomes.
          </p>
          <p className="text-gray-600">
            BetterLife focuses on automation, role-based access, and secure data
            handling to ensure smooth healthcare operations.
          </p>
        </div>

        {/* Right */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            What We Offer
          </h2>
          <ul className="space-y-3 text-gray-600">
            <li>✔ Role-based dashboards for Admin, Doctors, and Patients</li>
            <li>✔ Secure appointment booking and management</li>
            <li>✔ Digital medical records and patient history</li>
            <li>✔ Doctor and patient lifecycle management</li>
            <li>✔ Scalable MERN-stack architecture</li>
          </ul>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Why BetterLife?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Trust & Security
              </h3>
              <p className="text-gray-600">
                We prioritize data security and role-based access to protect
                sensitive medical information.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Efficiency
              </h3>
              <p className="text-gray-600">
                Automation reduces manual work and improves hospital workflow
                efficiency.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Modern Technology
              </h3>
              <p className="text-gray-600">
                Built using the MERN stack for scalability, performance, and
                maintainability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
