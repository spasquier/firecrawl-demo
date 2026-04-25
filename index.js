import Firecrawl from '@mendable/firecrawl-js';
import fs from 'fs/promises';
import path from 'path';
import { config as configDotenv } from 'dotenv';

configDotenv({quiet: true}); // Load environment variables from .env file
const firecrawl = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

const BASE_URL = 'https://guides.rubyonrails.org/v6.1/index.html';
const OUTPUT_ROOT = path.join(process.cwd(), 'scraped');
const SCRAPE_INDEX = false; // Set to true to scrape the index page and extract links

if (SCRAPE_INDEX) {
  // Scrape the page and get the markdown content
  const doc = await firecrawl.scrape(BASE_URL, { formats: ['markdown'] });
  const markdown = doc.markdown;
  // use fs to save file rails-index-v6.1.md in the OUTPUT_ROOT directory
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });
  await fs.writeFile(path.join(OUTPUT_ROOT, 'rails-index-v6.1.md'), markdown);

  // Read the file back from disk with node's fs module
  const savedContent = await fs.readFile(path.join(OUTPUT_ROOT, 'rails-index-v6.1.md'), 'utf-8');

  // Extract all links from the markdown content using a regex
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
  let match;
  const links = [];
  while ((match = linkRegex.exec(savedContent)) !== null) {
    links.push({ text: match[1], url: match[2] });
  }

  // For each link, scrape the page and save the markdown content
  // to a file named after the link text in the OUTPUT_ROOT directory
  for (const link of links) {
    try {
      const doc = await firecrawl.scrape(link.url, { formats: ['markdown'] });
      const markdown = doc.markdown;
      const filename = `${link.text.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
      await fs.writeFile(path.join(OUTPUT_ROOT, filename), markdown);
      console.log(`Saved ${filename}`);
    } catch (error) {
      console.error(`Error scraping ${link.url}:`, error);
    }
  }
} else {
  // Change the flag 
  console.log('Set SCRAPE_INDEX to true to scrape the index page and extract links');
}
