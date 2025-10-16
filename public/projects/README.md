# Project Images

This directory should contain screenshots of your data analysis projects.

## Required Images

Add the following images to this folder:

### 1. COVID-19 Algeria Project
**File name:** `covid-19-algeria.png`
- Screenshot of your COVID-19 dashboard/visualization
- Recommended size: 1200x800px (16:9 aspect ratio)
- Format: PNG or JPG

### 2. Algeria Solar Potential Project
**File name:** `solar-potential-algeria.png`
- Screenshot of your solar energy analysis visualization
- Recommended size: 1200x800px (16:9 aspect ratio)
- Format: PNG or JPG

### 3. Road Safety Analysis Project
**File name:** `road-safety-algeria.png`
- Screenshot of your road safety dashboard
- Recommended size: 1200x800px (16:9 aspect ratio)
- Format: PNG or JPG

### 4. Youth Unemployment Project
**File name:** `youth-unemployment-algeria.png`
- Screenshot of your unemployment trends visualization
- Recommended size: 1200x800px (16:9 aspect ratio)
- Format: PNG or JPG

### 5. Economic Crossroads Project
**File name:** `algeria-economic-crossroads.png`
- Screenshot of your economic analysis visualization
- Recommended size: 1200x800px (16:9 aspect ratio)
- Format: PNG or JPG

## How to Capture Project Screenshots

1. **Visit your project pages:**
   - https://salaheddineken.github.io/COVID-19-in-Algeria-2020-/
   - https://salaheddineken.github.io/Algeria-s-Solar-Potentia/
   - https://salaheddineken.github.io/Algerian-Road-Safety/
   - https://salaheddineken.github.io/Algeria-s-Youth-Employment/
   - https://salaheddineken.github.io/Algeria-Economic-Crossroads/

2. **Take screenshots:**
   - Use Windows Snipping Tool or Snip & Sketch (Win + Shift + S)
   - Capture the main visualization/dashboard area
   - Try to get a clean, full view of your work

3. **Save files:**
   - Save to this directory: `d:\archive\public\projects\`
   - Use the exact file names listed above
   - PNG format is preferred for charts/visualizations

4. **Update the code:**
   After adding your images, update `components/projects-section.tsx`:
   ```typescript
   image: "/projects/covid-19-algeria.png",
   image: "/projects/solar-potential-algeria.png",
   image: "/projects/road-safety-algeria.png",
   image: "/projects/youth-unemployment-algeria.png",
   image: "/projects/algeria-economic-crossroads.png",
   ```

5. **Rebuild your site:**
   ```bash
   npm run build
   firebase deploy
   ```

## Current Status

✅ Temporary placeholder images are being used
❌ Actual project screenshots need to be added

## Tips for Great Screenshots

- **Good lighting**: Make sure visualizations are clearly visible
- **Clean background**: Remove unnecessary UI elements if possible
- **Focus on data**: Capture the most impressive part of your analysis
- **Consistent size**: Try to keep all images the same aspect ratio
- **High quality**: Use at least 1200px width for clarity

## Alternative: Use Existing Images

If you want to use the current placeholder images permanently, you don't need to do anything. They're already showing relevant data analysis visuals.

