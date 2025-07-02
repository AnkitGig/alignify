
export function TrustedBySection() {
  const logoPartners = [
    "DELL", "zendesk", "Rakuten", "Pacific Funds", "NCR", "Lattice", "TED"
  ];

  return (
    <section className="relative z-10 py-16 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <p className="text-gray-400 mb-8">Trusted by teams at over 1,000 of the world's leading organizations</p>
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          {logoPartners.map((logo, index) => (
            <div key={index} className="text-gray-500 font-semibold text-lg">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
