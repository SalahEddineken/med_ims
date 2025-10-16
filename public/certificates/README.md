# Certificate Images

Place your certificate images in this folder.

## Instructions:

1. **Export your certificates as images** (PNG or JPG format recommended)
2. **Name them descriptively**, for example:
   - `google-data-analytics.png`
   - `ml-specialization.png`
   - `aws-certification.png`

3. **Update the certificate data** in `components/cv-section.tsx`:
   ```typescript
   const certificates = [
     {
       title: "Your Certificate Title",
       issuer: "Issuing Organization",
       date: "2024",
       link: "https://actual-certificate-verification-url.com",
       image: "/certificates/your-certificate-image.png",
     },
   ]
   ```

4. **Recommended image specifications:**
   - Format: PNG or JPG
   - Aspect Ratio: 4:3 (e.g., 1600x1200px)
   - Max file size: Keep under 500KB for optimal loading

## Tips:

- Use high-quality images for better presentation
- Ensure the certificate text is readable when displayed
- You can screenshot from the original platform or export PDFs as images
- Compress images if they're too large (use tools like TinyPNG)

## Example Structure:

```
public/
  └── certificates/
      ├── README.md (this file)
      ├── google-data-analytics.png
      ├── ml-specialization.png
      └── your-other-certificates.png
```

