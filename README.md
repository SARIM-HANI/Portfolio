# Portfolio Website

A modern, responsive portfolio website built with vanilla HTML, CSS, and JavaScript. Features a clean design with light/dark mode support, dynamic project loading, and search/filter functionality.

## Features

- ✅ Responsive design (mobile and desktop)
- ✅ Light and dark mode toggle (saves preference in localStorage)
- ✅ Dynamic project loading from JSON file
- ✅ Search projects by title or description
- ✅ Filter projects by tech stack
- ✅ Smooth scrolling navigation
- ✅ Mobile-friendly hamburger menu
- ✅ Clean, modern UI with smooth animations

## Project Structure

```
Portfolio/
│
├── index.html          # Main HTML file
├── style.css           # All styling (CSS variables for themes)
├── app.js              # JavaScript functionality
├── data/
│   └── projects.json   # Project data (edit this to add/update projects)
├── projects/           # Source code for featured projects
│   ├── sbom/           # SBOM Creation Tool (Python, Flask)
│   └── construction/   # Construction Monitoring (Python, Rasterio)
└── README.md           # This file
```

## Project Pages

Each featured project has a dedicated page with workflow diagrams and descriptions:

- **projects/sbom/index.html** — SBOM Creation Tool (Capstone project)
- **projects/construction/index.html** — Construction Progress Monitoring (Research Assistant work)

Workflow SVG diagrams in `assets/images/` help new visitors quickly understand each project.

## Editing Project Data

To add or update projects, edit the `data/projects.json` file. The JSON structure should follow this format:

```json
{
  "projects": [
    {
      "title": "Project Title",
      "description": "Project description goes here...",
      "techStack": ["Technology 1", "Technology 2", "Technology 3"],
      "github": "https://github.com/username/repo",
      "demo": "https://live-demo-url.com",
      "image": "path/to/image.jpg"
    }
  ]
}
```

### Field Descriptions:

- **title** (required): Project title
- **description** (required): Project description
- **techStack** (optional): Array of technology names used in the project
- **github** (optional): Link to GitHub repository
- **demo** (optional): Link to live demo (set to `null` if not available)
- **image** (optional): Path to project image (set to `null` if not available)
- **codePath** (optional): Relative path to project code folder (e.g. `projects/sbom`). Adds a "View Code" link.

**Note:** All fields except `title` and `description` can be set to `null` if not available.

## Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser (you can double-click it)
3. For testing with a local server (recommended), you can use:
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`
   - VS Code: Use the Live Server extension

## Deploying to GitHub Pages

### Method 1: Using GitHub Repository Settings (Recommended)

1. **Create a GitHub repository** (or use an existing one)
   - Go to GitHub and create a new repository
   - Name it (e.g., `portfolio` or `your-username.github.io`)

2. **Upload your files**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section (in the left sidebar)
   - Under **Source**, select **main** branch (or **master** if that's your default)
   - Select **/ (root)** folder
   - Click **Save**

4. **Access your site**
   - Your site will be available at: `https://your-username.github.io/your-repo-name/`
   - If you named your repo `your-username.github.io`, it will be at: `https://your-username.github.io/`

### Method 2: Using GitHub Actions (Optional)

You can also set up GitHub Actions for automatic deployment, but it's not necessary since this is a static site.

## Customization

### Changing Colors and Theme

Edit the CSS variables in `style.css` at the top of the file:

```css
:root {
    /* Light Theme Colors */
    --bg-primary: #ffffff;
    --accent-primary: #0066cc;
    /* ... more variables ... */
}
```

### Updating Personal Information

Edit the content in `index.html`:
- Hero section: Name, title, description
- About section: Bio, education, skills
- Contact section: Location, email, phone
- Footer: Links to social profiles

### Adding Images

1. Create an `images` folder in your repository
2. Add your project images to this folder
3. Update `projects.json` with the image paths (e.g., `"image": "images/project1.jpg"`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- All paths are relative, so the site will work on GitHub Pages
- No build step required - pure vanilla HTML, CSS, and JavaScript
- The theme preference is saved in localStorage
- Projects are loaded dynamically using `fetch()` API

## License

This project is open source and available for personal use.

---

**Created by:** Mohammed Sarim Hani  
**Last Updated:** 2025
