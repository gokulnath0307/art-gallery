const navigation = {
  gallery: [
    { name: "Current Exhibitions", href: "#" },
    { name: "Upcoming Events", href: "#" },
    { name: "Permanent Collection", href: "#" },
    { name: "Past Exhibitions", href: "#" },
  ],
  visit: [
    { name: "Plan Your Visit", href: "#" },
    { name: "Buy Tickets", href: "#" },
    { name: "Add your Arts", href: "/member-login" },
    { name: "Venue Rental", href: "#" },
  ],
  support: [
    { name: "Donate", href: "#" },
    { name: "Volunteer", href: "#" },
    { name: "Sponsorship", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white mt-10 bottom-0">
      <div className="mx-auto max-w-8xl px-6 py-20 border border-t-gray-200">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <a href="/" className="text-xl font-bold text-gray-800">
            ArtGallery
          </a>

          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">Gallery</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.gallery.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">Visit</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.visit.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-gray-900">Support</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
