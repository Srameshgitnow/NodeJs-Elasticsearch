// const client = require('../elasticClient');

// async function seedData() {
//   const articles = [
//     { title: "Breaking News", content: "Elections are coming", subtype: "news" },
//     { title: "New Affiliate Program", content: "Sign up now", subtype: "affiliate" },
//     { title: "Buy and Sell", content: "Marketplace open for everyone", subtype: "marketplace" }
//   ];

//   for (let i = 0; i < articles.length; i++) {
//     await client.index({
//       index: process.env.ES_INDEX,
//       body: articles[i]
//     });
//   }

//   await client.indices.refresh({ index: process.env.ES_INDEX });
//   console.log("Seeded data to Elasticsearch.");
// }

// seedData();

const { client } = require('../elasticClient');

async function seedData() {
  const articles = [
    { title: "Elections Coming Soon", content: "The national elections are around the corner.", subtype: "news" },
    { title: "Top Affiliate Offers", content: "Check out the best affiliate deals today.", subtype: "affiliate" },
    { title: "New Marketplace Launch", content: "Our marketplace is now live!", subtype: "marketplace" },
    { title: "Tech Trends 2025", content: "AI and quantum computing lead the future.", subtype: "news" },
    { title: "Join Affiliate Today", content: "Earn commission by promoting products.", subtype: "affiliate" },
    { title: "Buy & Sell Anything", content: "List your products in our marketplace.", subtype: "marketplace" },
    { title: "Health News", content: "New vaccine shows promising results.", subtype: "news" },
    { title: "Top Affiliate Platforms", content: "Choose the best for your audience.", subtype: "affiliate" },
    { title: "Marketplace Update", content: "Now with more categories and filters.", subtype: "marketplace" },
    { title: "Breaking Political News", content: "Prime minister announces reforms.", subtype: "news" },
    { title: "Affiliate Earnings Tips", content: "Boost your passive income.", subtype: "affiliate" },
    { title: "Marketplace for Services", content: "Buy and sell services like web design.", subtype: "marketplace" },
    { title: "Science Daily", content: "Black holes emit sound waves?", subtype: "news" },
    { title: "Affiliate Program Guide", content: "How to get started with affiliate marketing.", subtype: "affiliate" },
    { title: "Sell Fast", content: "Marketplace now has instant pay.", subtype: "marketplace" },
    { title: "Climate Report", content: "2025 expected to be hottest year yet.", subtype: "news" },
    { title: "Affiliate Webinar", content: "Learn how to build a 6-figure stream.", subtype: "affiliate" },
    { title: "Local Marketplace", content: "Focus on your neighborhood economy.", subtype: "marketplace" },
    { title: "News Flash", content: "Cyber attack impacts data centers.", subtype: "news" },
    { title: "Affiliate vs Dropshipping", content: "What’s better in 2025?", subtype: "affiliate" }
  ];

  // Optional: Delete old index and recreate
  try {
    await client.indices.delete({ index: process.env.ES_INDEX });
  } catch (err) {
    if (err.meta?.statusCode !== 404) throw err;
  }

  await client.indices.create({ index: process.env.ES_INDEX });

  for (const article of articles) {
    await client.index({
      index: process.env.ES_INDEX,
      body: article
    });
  }

  await client.indices.refresh({ index: process.env.ES_INDEX });
  console.log("✅ Seeded 20 articles into Elasticsearch.");
}

seedData().catch(console.error);
