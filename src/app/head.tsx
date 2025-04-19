export default function Head() {
  return (
    <>
      <title>Royal Art Jewellers | Elegant Gold Jewelry</title>
      <meta
        name="description"
        content="Shop royal gold jewelry, rings, and bridal sets."
      />
      <meta
        name="keywords"
        content="gold jewelry, rings, bridal, royal art jewellers"
      />
      <meta name="robots" content="index, follow" />

      {/* Open Graph (OG) tags for social media sharing */}
      <meta property="og:title" content="Royal Art Jewellers" />
      <meta
        property="og:description"
        content="Elegant handcrafted gold jewelry"
      />
      <meta property="og:image" content="/og-image.jpg" />
      <meta property="og:url" content="https://royalartjewellers.vercel.app/" />
      <meta property="og:type" content="website" />

      {/* Optional: Favicon */}
      <link rel="icon" href="/favicon.ico" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JewelryStore",
          name: "Royal Art Jewellers",
          image: "https://royalartjewellers.vercel.app/og-image.jpg",
          url: "https://royalartjewellers.vercel.app",
          description: "Elegant handcrafted gold jewelry",
        })}
      </script>
    </>
  );
}
