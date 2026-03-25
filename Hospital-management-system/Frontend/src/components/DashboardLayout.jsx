function DashboardLayout({ title, children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">HMS</h2>
        <p className="text-sm opacity-80">Hospital Management</p>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-6">{title}</h1>

        <div className="bg-white rounded-xl shadow-md p-6 animate-fadeIn">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
