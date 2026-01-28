# Clear, not complex. — Website

A minimal, elegant personal website for writing, visuals, and products.

## Structure

```
├── index.html          # Homepage
├── writing.html        # Blog listing
├── visuals.html        # Visual gallery
├── products.html       # Product portfolio
├── about.html          # About page
├── contact.html        # Contact form
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Site functionality
├── images/             # All images
├── writing/            # Individual articles
├── visuals/            # Individual visual pages
├── products/           # Individual product pages
├── admin/              # Decap CMS
│   ├── index.html
│   └── config.yml
└── netlify.toml        # Netlify configuration
```

## Deployment to Netlify

### Option 1: Drag and Drop
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag this entire folder onto the deploy area
3. Your site is live!

### Option 2: GitHub Integration (Recommended for CMS)
1. Push this code to a GitHub repository
2. Connect the repo to Netlify
3. Enable Netlify Identity (Site Settings → Identity → Enable)
4. Enable Git Gateway (Identity → Services → Git Gateway)
5. Invite yourself as a user

## Using the CMS

Once deployed with GitHub + Netlify Identity:

1. Go to `yoursite.com/admin`
2. Sign in with your Netlify Identity
3. Start creating content!

### Content Types

- **Writing**: Blog articles with categories, featured images, and rich text
- **Visuals**: Infographics with images, tags, and descriptions
- **Products**: Portfolio items with status, links, and detailed pages

## Customisation

### Adding a Brand Colour

In `css/style.css`, add to the `:root` section:
```css
--accent: #your-color;
```

Then use it anywhere:
```css
.element {
    color: var(--accent);
}
```

### Contact Form

The contact form uses Netlify Forms. Submissions will appear in your Netlify dashboard under Forms.

To use a different service (Formspree, etc.), update the form action in `contact.html`.

## Development

No build tools required. Just edit the HTML/CSS/JS files directly.

For local preview, use any static server:
```bash
# Python
python -m http.server 8000

# Node
npx serve

# PHP
php -S localhost:8000
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Dark mode support (system preference + toggle)

## License

Your content. Your site. Do what you want with it.
