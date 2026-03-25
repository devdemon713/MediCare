function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="max-w-2xl mx-auto">
            Have questions or need support? Reach out to the BetterLife team.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h2>

          <p className="text-gray-600 mb-4">
            We are here to help hospitals, doctors, and patients with seamless
            healthcare management.
          </p>

          <div className="space-y-3 text-gray-700">
            <p><strong>Email:</strong> support@betterlife.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Location:</strong> India</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Send a Message
          </h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </section>
    </div>
  );
}

export default Contact;
