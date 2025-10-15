# CSS Not Loading - Troubleshooting Steps

If you're seeing the page without any formatting, follow these steps:

## 1. Check Browser Console

When running `npm run tauri dev`, open the developer tools and check for:
- CSS loading errors
- JavaScript errors
- Network errors loading assets

## 2. Clear Cache and Rebuild

```bash
# Clean everything
rm -rf dist node_modules/.vite

# Rebuild
npm run build
```

## 3. Verify CSS is Loading in Dev Mode

The issue might be with hot module replacement. Try:

```bash
# Stop any running dev server
# Then start fresh
npm run tauri dev
```

## 4. Check if CSS Variables are Defined

Open browser console and run:
```javascript
getComputedStyle(document.documentElement).getPropertyValue('--background')
```

Should return a color value like `oklch(100% 0 0)`.

## 5. Verify index.css is Being Imported

Check that `src/main.tsx` has:
```typescript
import "./index.css";
```

## 6. Check for Conflicting Styles

Make sure there are no other CSS files being imported that might override Tailwind.

## 7. Test with Simple Element

Add this temporarily to App.tsx to test if Tailwind is working:
```tsx
<div className="bg-red-500 text-white p-4">
  If this is red with white text, Tailwind is working!
</div>
```

## 8. Verify Vite Config

The vite.config.ts should have the path alias configured:
```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
```

## 9. Check Tailwind Config

Verify `tailwind.config.js` has the correct content paths:
```javascript
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
```

## 10. Restart Development Server

Sometimes a simple restart fixes hot-reload issues:
- Stop the dev server (Ctrl+C)
- Run `npm run tauri dev` again

## Common Issues

### Issue: White/Unstyled Page
**Cause**: CSS file not loading or PostCSS not processing Tailwind
**Fix**: Check browser console for 404 errors on CSS files

### Issue: Some Classes Work, Others Don't
**Cause**: Tailwind content paths not configured correctly
**Fix**: Ensure all component files are in the content array

### Issue: CSS Works in Build but Not Dev
**Cause**: Vite HMR issue
**Fix**: Restart dev server or clear Vite cache

## Still Having Issues?

1. Check that you're using the correct npm commands
2. Verify all dependencies are installed: `npm install`
3. Try running just the Vite server: `npm run dev` (opens on http://localhost:1420)
4. Check the terminal output for any errors
