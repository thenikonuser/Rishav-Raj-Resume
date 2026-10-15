# ADOBE PORTFOLIO CONFIGURATION BLUEPRINT FOR WECLIK.IN
**Step-by-Step Implementation for Adobe Portfolio Editor**

---

## 1. Typography Setup (Free in Adobe Fonts)
In your Adobe Portfolio editor sidebar:
1. Go to **Edit Global Styles** $\rightarrow$ **Typography**.
2. **Headings (H1, H2, H3):**
   * Font Family: Search and select **Playfair Display**
   * Weight: Bold (700) or SemiBold (600)
   * Letter-spacing: +1px
3. **Body Text & Navigation:**
   * Font Family: Search and select **Montserrat**
   * Weight: Regular (400) / Medium (500)
   * Letter-spacing: +0.5px
   * Line height: 1.6

---

## 2. Color Palette Settings
In **Edit Global Styles** $\rightarrow$ **Colors & Backgrounds**:

### Base Site Background & Text
* **Site Background:** `#F8F5EC` (WECLIK Warm Ivory) or `#0E1116` (if using WELEAD Dark Studio Mode)
* **Header / Primary Text:** `#2E2F1E` (Olive Green) or `#FAFAF8`
* **Links & Hover Accents:** `#A8895E` (Muted Gold) or `#5C8DFF` (Steel Blue)

---

## 3. Navigation & Page Structure
In your Adobe Portfolio sidebar under **Manage Pages**, structure your site into two distinct pillars:

```text
├── WECLIK (Pillar 1: Luxury Weddings & Films)
│   ├── Luxury Destination Weddings (Gallery)
│   ├── Cinematic Wedding Films (Video / Gallery)
│   └── Emotional Moments & Rituals (Gallery)
│
├── WELEAD (Pillar 2: Fashion, Talent & Commercial)
│   ├── Fashion Editorials & Lookbooks (SWASS Couture, etc.)
│   ├── Actor & Model Casting Portfolios (Mumbai Look-Tests)
│   └── OTT Production Stills & Commercials
│
├── THE FILM RESUME (Custom Page / Embed)
│   └── Interactive 35mm Journey & Production Kit
│
└── BOOKINGS & CONTACT
    └── Mumbai Commission Rates & Inquiries (+91 98765 43210)
```

---

## 4. How to Embed the Film-Negative Interactive Resume in Adobe Portfolio
1. In Adobe Portfolio, click **Add Page** $\rightarrow$ **Custom Page**.
2. Title it: **"Career Journey // The Negative"**.
3. Click the `+` button on the canvas and choose **Embed**.
4. Paste this responsive iframe embed code:
   ```html
   <div style="position:relative; width:100%; min-height:850px; overflow:hidden; border-radius:4px; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
     <iframe 
       src="https://rishavraj-portfolio.vercel.app/" 
       style="position:absolute; top:0; left:0; width:100%; height:100%; border:none;" 
       allowfullscreen>
     </iframe>
   </div>
   ```
   *(Note: You can host `index.html` on Vercel, Netlify, or GitHub Pages in 2 minutes for free to get your embed URL).*

---

## 5. Publishing Checklist
1. Under **Settings** $\rightarrow$ **Domain Name**, verify that `weclik.in` is active.
2. In the bottom-left corner of the editor, click the green **"Publish Site"** button.
3. Test on mobile and desktop: `https://weclik.in`.
