import Firecrawl from '@mendable/firecrawl-js';
import { configDotenv } from 'dotenv';

configDotenv();

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

// Scrape a website:
app.scrape('https://guides.rubyonrails.org/v8.1/getting_started.html').then((result) => {
  console.log(result);
});
