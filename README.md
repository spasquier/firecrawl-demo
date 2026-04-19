# Firecrawl Demo Project
## Scrapping Ruby on Rails Guides to use in RAG

### Search the web first
**CLI**
```bash
firecrawl search "ruby on rails guides" --limit 5
```
**Node**
```javascript
// npm install @mendable/firecrawl-js
import Firecrawl from '@mendable/firecrawl-js';

const app = new Firecrawl({apiKey: process.env.FIRECRAWL_API_KEY});

// Perform a search:
app.search("firecrawl", { limit: 5 })

```

### Scrape a known page
**CLI**
```bash
firecrawl https://guides.rubyonrails.org/v8.1/getting_started.html --only-main-content
```
**Node**
```javascript
// npm install @mendable/firecrawl-js
import Firecrawl from '@mendable/firecrawl-js';

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY });

// Scrape a website:
app.scrape('https://guides.rubyonrails.org/v8.1/getting_started.html')

```


### Interact with live pages
**CLI**
```bash
firecrawl interact exec --prompt "Click link 'Active Record Basics'"
```

**Node**
```javascript
import Firecrawl from '@mendable/firecrawl-js';

const app = new Firecrawl({apiKey: process.env.FIRECRAWL_API_KEY});

// Scrape a page, then interact with it:
const result = await app.scrape("https://guides.rubyonrails.org/v8.1/getting_started.html");

await app.interact(result.metadata.scrapeId, {
  prompt: "Click link 'Active Record Basics'"
});

```
