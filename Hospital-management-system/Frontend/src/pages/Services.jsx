function Services() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            Our Services
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            BetterLife provides a complete digital solution for managing
            hospital operations efficiently and securely.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Service 1 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Appointment Management
            </h3>
            <p className="text-gray-600">
              Patients can book appointments easily while doctors manage their
              schedules with real-time updates.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Role-Based Dashboards
            </h3>
            <p className="text-gray-600">
              Separate dashboards for Admin, Doctors, and Patients ensure
              controlled access and smooth workflows.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Patient Management
            </h3>
            <p className="text-gray-600">
              Admins can add, deactivate, and restore patients while maintaining
              complete patient records.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Doctor Management
            </h3>
            <p className="text-gray-600">
              Doctors can be created, managed, deactivated, and restored without
              deleting historical data.
            </p>
          </div>

          {/* Service 5 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Medical Records
            </h3>
            <p className="text-gray-600">
              Doctors can securely add and manage medical records linked to
              patient appointments.
            </p>
          </div>

          {/* Service 6 */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-600 mb-3">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              JWT-based authentication with protected routes ensures data
              security and role validation.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Services;
