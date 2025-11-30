# MoodReads - Production Build

This directory contains the optimized, production-ready version of MoodReads.

## Contents

- `index.html` - Production HTML file (references minified assets)
- `styles.min.css` - Minified CSS (~30-40% smaller than source)
- `*.min.js` - Minified JavaScript modules (~40-50% smaller than source)

## File Sizes

### Before Minification (Development)
- CSS: ~12 KB
- JavaScript (total): ~15 KB
- **Total: ~27 KB**

### After Minification (Production)
- CSS: ~7 KB
- JavaScript (total): ~8 KB
- **Total: ~15 KB**

### After Gzip Compression (Server-side)
- CSS: ~2 KB
- JavaScript (total): ~3 KB
- **Total: ~5 KB** ✨

## Deployment

### Option 1: Static File Hosting

Upload all files in this directory to any static hosting service:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Drag and drop this folder
- **Vercel**: Deploy via CLI or Git integration
- **AWS S3**: Upload as static website

### Option 2: Local Testing

Serve the production build locally:

```bash
# From the project root
npm run serve

# Or use any static server
npx http-server dist -p 8000
```

Then visit: http://localhost:8000

## Server Configuration

### Enable Compression (Recommended)

**Nginx:**
```nginx
gzip on;
gzip_types text/css application/javascript;
gzip_min_length 1000;
```

**Apache (.htaccess):**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/css application/javascript
</IfModule>
```

### Set Cache Headers (Recommended)

**Nginx:**
```nginx
location ~* \.(css|js)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

**Apache (.htaccess):**
```apache
<FilesMatch "\.(css|js)$">
  Header set Cache-Control "max-age=31536000, public, immutable"
</FilesMatch>
```

## Performance Metrics

Expected performance with this build:

- **First Contentful Paint**: < 0.5s
- **Time to Interactive**: < 1s
- **Lighthouse Performance Score**: 95-100
- **Total Page Weight (gzipped)**: ~5 KB

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

All modern browsers with ES6 module support.

## Notes

- All JavaScript files use ES6 modules (native imports)
- No bundling required for HTTP/2 servers
- Source maps not included (add `--source-map` to terser for debugging)
- All functionality preserved from development build
