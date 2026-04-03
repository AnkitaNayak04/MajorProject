import React, { useState } from "react";

const galleryImages = [
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
  // "https://via.placeholder.com/400",
];

function GallerySection() {
  const [activeImage, setActiveImage] = useState(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-red-700">
            Gallery
          </h2>
          <div className="w-28 h-1 bg-red-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-3">
            Department activities & memories
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(img)}
              className="group cursor-pointer overflow-hidden
                         rounded-2xl shadow-lg hover:shadow-2xl
                         transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={img}
                  alt="Gallery"
                  className="w-full h-64 object-cover
                             transform group-hover:scale-110
                             transition duration-500"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-red-700/70
                                flex items-center justify-center
                                opacity-0 group-hover:opacity-100
                                transition">
                  <span className="text-white font-semibold text-lg">
                    View Image
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IMAGE MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/70 z-50
                     flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <div className="bg-white p-4 rounded-xl max-w-4xl">
            <img
              src={activeImage}
              alt="Preview"
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default GallerySection;
