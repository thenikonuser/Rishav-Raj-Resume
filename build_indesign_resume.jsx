// ==============================================================================
// Adobe InDesign ExtendScript: "THE FILM NEGATIVE RESUME" - Rishav Raj
// Compatible with Adobe InDesign CC (All versions)
// How to run:
// 1. Open Adobe InDesign.
// 2. Go to Window > Utilities > Scripts.
// 3. Right-click "User" folder > Reveal in Finder / Explorer.
// 4. Paste this .jsx file into the Scripts Panel folder.
// 5. Double-click "build_indesign_resume.jsx" in the InDesign Scripts panel.
// ==============================================================================

#target indesign

function createFilmNegativeResume() {
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

    // 1. Create Document: A4 Portrait, 2 Pages, Facing Pages = False
    var doc = app.documents.add();
    with(doc.documentPreferences) {
        pageWidth = "210mm";
        pageHeight = "297mm";
        facingPages = false;
        pagesPerDocument = 2;
    }

    // 2. Color Swatches (CMYK & RGB equivalents for print and screen)
    function addColor(name, vals) {
        try {
            var col = doc.colors.item(name);
            col.name; // check existence
            return col;
        } catch(e) {
            var newCol = doc.colors.add();
            newCol.name = name;
            newCol.model = ColorModel.PROCESS;
            newCol.colorValue = vals;
            return newCol;
        }
    }

    var colMatteBlack = addColor("Film_MatteBlack", [75, 68, 67, 90]); // Rich dark
    var colFilmGray   = addColor("Film_DarkGray", [60, 50, 50, 40]);
    var colIvory      = addColor("Film_Ivory", [2, 3, 10, 0]);
    var colAmber      = addColor("Film_Amber", [0, 40, 100, 0]);
    var colOlive      = addColor("Film_Olive", [40, 10, 80, 20]);

    // 3. PAGE 1: Cinematic Header & Film Strip Timeline
    var page1 = doc.pages.item(0);

    // Dark Background on Page 1
    var bg1 = page1.rectangles.add();
    bg1.geometricBounds = ["0mm", "0mm", "297mm", "210mm"];
    bg1.fillColor = colMatteBlack;
    bg1.strokeWeight = 0;

    // Top Header Text Frame: Rishav Raj
    var headerFrame = page1.textFrames.add();
    headerFrame.geometricBounds = ["20mm", "20mm", "48mm", "190mm"];
    headerFrame.contents = "RISHAV RAJ\nVISUAL STORYTELLER | FASHION, EDITORIAL & LUXURY WEDDINGS\nISO 400 • 35MM CINEMATIC ARCHIVE • MUMBAI, INDIA";
    
    // Style Header Paragraphs
    try {
        headerFrame.paragraphs[0].pointSize = 28;
        headerFrame.paragraphs[0].fillColor = colIvory;
        headerFrame.paragraphs[0].tracking = 150;

        headerFrame.paragraphs[1].pointSize = 10;
        headerFrame.paragraphs[1].fillColor = colAmber;
        headerFrame.paragraphs[1].tracking = 100;

        headerFrame.paragraphs[2].pointSize = 8;
        headerFrame.paragraphs[2].fillColor = colOlive;
        headerFrame.paragraphs[2].tracking = 80;
    } catch(e) {}

    // Section 1: Film Negative Strip (Horizontal Frame Block)
    var stripTop = 54;
    var stripHeight = 85;

    // Outer Film Strip Border
    var filmStrip = page1.rectangles.add();
    filmStrip.geometricBounds = [stripTop + "mm", "15mm", (stripTop + stripHeight) + "mm", "195mm"];
    filmStrip.fillColor = doc.swatches.item("None");
    filmStrip.strokeColor = colFilmGray;
    filmStrip.strokeWeight = 1;

    // Sprockets Top & Bottom
    var sprockCount = 14;
    var sprockW = 8;
    var sprockH = 4;
    for (var i = 0; i < sprockCount; i++) {
        var sx = 18 + (i * 12.5);
        // Top Sprocket
        var spTop = page1.rectangles.add();
        spTop.geometricBounds = [(stripTop + 2) + "mm", sx + "mm", (stripTop + 2 + sprockH) + "mm", (sx + sprockW) + "mm"];
        spTop.fillColor = colFilmGray;
        spTop.strokeWeight = 0;

        // Bottom Sprocket
        var spBot = page1.rectangles.add();
        spBot.geometricBounds = [(stripTop + stripHeight - 6) + "mm", sx + "mm", (stripTop + stripHeight - 2) + "mm", (sx + sprockW) + "mm"];
        spBot.fillColor = colFilmGray;
        spBot.strokeWeight = 0;
    }

    // 3 Film Frame Placeholders inside strip
    var frames = [
        { id: "001", period: "OCT 2015", role: "MEOW Studio", sub: "Light Assistant & Fundamentals" },
        { id: "003", period: "JUN 2017", role: "WECLIK", sub: "Co-Founder & Creative Lead" },
        { id: "005", period: "JAN 2021", role: "Mumbai Fashion", sub: "SWASS Couture & Editorial" }
    ];

    var frameWidth = 52;
    var frameHeight = 65;
    for (var f = 0; f < frames.length; f++) {
        var fx = 20 + (f * 59);
        var fy = stripTop + 10;

        // Graphic Frame (for photo)
        var rect = page1.rectangles.add();
        rect.geometricBounds = [fy + "mm", fx + "mm", (fy + 44) + "mm", (fx + frameWidth) + "mm"];
        rect.strokeColor = colAmber;
        rect.strokeWeight = 0.5;
        rect.fillColor = colFilmGray;

        // Metadata Text Frame below photo
        var tf = page1.textFrames.add();
        tf.geometricBounds = [(fy + 46) + "mm", fx + "mm", (fy + frameHeight) + "mm", (fx + frameWidth) + "mm"];
        tf.contents = "FRAME " + frames[f].id + " // " + frames[f].period + "\n" + frames[f].role + "\n" + frames[f].sub;
        try {
            tf.paragraphs[0].pointSize = 7;
            tf.paragraphs[0].fillColor = colAmber;
            tf.paragraphs[1].pointSize = 9;
            tf.paragraphs[1].fillColor = colIvory;
            tf.paragraphs[2].pointSize = 6.5;
            tf.paragraphs[2].fillColor = doc.swatches.item("Paper");
        } catch(e) {}
    }

    // Section 2: Detailed Career Breakdown
    var careerHeader = page1.textFrames.add();
    careerHeader.geometricBounds = ["148mm", "20mm", "156mm", "190mm"];
    careerHeader.contents = "02 // CAREER CHAPTERS & MILESTONES";
    try {
        careerHeader.paragraphs[0].pointSize = 10;
        careerHeader.paragraphs[0].fillColor = colAmber;
        careerHeader.paragraphs[0].tracking = 120;
    } catch(e) {}

    var careerBody = page1.textFrames.add();
    careerBody.geometricBounds = ["158mm", "20mm", "275mm", "190mm"];
    careerBody.textFramePreferences.textColumnCount = 2;
    careerBody.textFramePreferences.textColumnGutter = "12mm";
    careerBody.contents = 
        "FRAME 001: MEOW STUDIO (Oct 2015)\n" +
        "Light Assistant. Mastered lighting theory, light modifiers, continuous vs strobe lights, Adobe Camera Raw, and strict commercial studio protocols.\n\n" +
        "FRAME 002: WEDDING PHOTOGRAPHY (Jan 2016)\n" +
        "Independent Traditional & Candid Photographer. Invested in Nikon D5500 DSLR system and speedlights. Perfected candid moments and true skin-tone retention.\n\n" +
        "FRAME 003: WECLIK — BUILDING A STORY (Jun 2017)\n" +
        "Co-Founder & Creative Lead. Scaled brand from 8 weddings in year one to 20+ luxury weddings per year. Handled client acquisitions, creative team management, and signature grading.\n\n" +
        "FRAME 004: FREELANCE & STUDIO COLLABS (2018–2020)\n" +
        "Collaborated with Photovale Studios, Wedding Moments Studio, and Shutterbox. Diversified into editorial portraiture, jewellery macros, and brand campaigns.\n\n" +
        "FRAME 005: MUMBAI — EDITORIAL & FASHION (Jan 2021)\n" +
        "Relocated to Mumbai. Led high-fashion campaigns for SWASS Couture, model agency look-tests in Versova/Bandra, and OTT video stills.\n\n" +
        "FRAME 006: CURRENT PRACTICE & CINEMATOGRAPHY (Present)\n" +
        "Flagship Nikon Z6 III mirrorless kit. Hybrid delivery: high-resolution fashion stills and cinematic 4K 10-bit video graded in DaVinci Resolve Studio.";

    try {
        careerBody.texts[0].pointSize = 8;
        careerBody.texts[0].leading = 12;
        careerBody.texts[0].fillColor = colIvory;
    } catch(e) {}

    // PAGE 2: Technical Kit, Software, Key Metrics & Contact
    var page2 = doc.pages.item(1);

    var bg2 = page2.rectangles.add();
    bg2.geometricBounds = ["0mm", "0mm", "297mm", "210mm"];
    bg2.fillColor = colMatteBlack;
    bg2.strokeWeight = 0;

    // Page 2 Header
    var p2Head = page2.textFrames.add();
    p2Head.geometricBounds = ["20mm", "20mm", "35mm", "190mm"];
    p2Head.contents = "03 // PRODUCTION SPECIFICATIONS & INDUSTRY CREDENTIALS";
    try {
        p2Head.paragraphs[0].pointSize = 12;
        p2Head.paragraphs[0].fillColor = colAmber;
        p2Head.paragraphs[0].tracking = 120;
    } catch(e) {}

    // 3 Column Layout for Kit, Software & Metrics
    var colY = 40;
    var colH = 130;
    var colW = 50;

    // Col 1: Hardware Kit
    var c1 = page2.textFrames.add();
    c1.geometricBounds = [colY + "mm", "20mm", (colY + colH) + "mm", (20 + colW) + "mm"];
    c1.contents = "CAMERA SYSTEMS & GLASS\n\n" +
        "• Nikon Z6 III (Mirrorless)\n" +
        "  6K RAW, 4K 120p, high dynamic range\n\n" +
        "• NIKKOR Z 35mm f/1.4\n" +
        "  Documentary & environmental\n\n" +
        "• NIKKOR Z 85mm f/1.8 S\n" +
        "  S-Line high-resolution beauty portraits\n\n" +
        "• NIKKOR Z 28–75mm f/2.8\n" +
        "  High-speed event & runway zoom\n\n" +
        "LIGHTING & GRIP\n\n" +
        "• Godox V1 Round-Head Flash\n" +
        "• Godox SK400 II Studio Strobes\n" +
        "• Godox SL60W Video Lights\n" +
        "• Octaboxes, Grids & Umbrellas";
    try {
        c1.paragraphs[0].pointSize = 9;
        c1.paragraphs[0].fillColor = colAmber;
        c1.texts[0].pointSize = 7.5;
        c1.texts[0].leading = 11;
        c1.texts[0].fillColor = colIvory;
    } catch(e) {}

    // Col 2: Software & Post Production
    var c2 = page2.textFrames.add();
    c2.geometricBounds = [colY + "mm", "75mm", (colY + colH) + "mm", (75 + colW) + "mm"];
    c2.contents = "POST-PRODUCTION SUITE\n\n" +
        "• Adobe Lightroom Classic\n" +
        "  RAW development & color science\n\n" +
        "• Adobe Photoshop & ACR\n" +
        "  Frequency separation & editorial beauty\n\n" +
        "• DaVinci Resolve Studio\n" +
        "  Cinema color grading & audio sync\n\n" +
        "• Adobe Premiere Pro\n" +
        "  Commercial reels & video edits\n\n" +
        "• Capture One Pro\n" +
        "  Tethered on-set shooting\n\n" +
        "COMPUTING & STORAGE\n\n" +
        "• MacBook Pro M1 Pro (16GB RAM)\n" +
        "• On-set redundant RAID storage";
    try {
        c2.paragraphs[0].pointSize = 9;
        c2.paragraphs[0].fillColor = colAmber;
        c2.texts[0].pointSize = 7.5;
        c2.texts[0].leading = 11;
        c2.texts[0].fillColor = colIvory;
    } catch(e) {}

    // Col 3: Key Milestones
    var c3 = page2.textFrames.add();
    c3.geometricBounds = [colY + "mm", "130mm", (colY + colH) + "mm", "190mm"];
    c3.contents = "PROVEN TRACK RECORD\n\n" +
        "• 500+ Shoots & Weddings\n" +
        "  Comprehensive portfolio across 8+ yrs\n\n" +
        "• 20+ Luxury Weddings / Year\n" +
        "  Led full crew & creative delivery\n\n" +
        "• Commercial Brand Credits\n" +
        "  SWASS Couture, VIMAAP Fashion,\n" +
        "  RC Films by RKS, Bihari Films\n\n" +
        "• Studio Partnerships\n" +
        "  Photovale, Wedding Moments,\n" +
        "  Crystal Eye & Shutterbox";
    try {
        c3.paragraphs[0].pointSize = 9;
        c3.paragraphs[0].fillColor = colAmber;
        c3.texts[0].pointSize = 7.5;
        c3.texts[0].leading = 11;
        c3.texts[0].fillColor = colIvory;
    } catch(e) {}

    // Page 2 Bottom: Contact Callout Box
    var contactBox = page2.rectangles.add();
    contactBox.geometricBounds = ["185mm", "20mm", "275mm", "190mm"];
    contactBox.fillColor = colFilmGray;
    contactBox.strokeColor = colAmber;
    contactBox.strokeWeight = 1;

    var contactText = page2.textFrames.add();
    contactText.geometricBounds = ["192mm", "25mm", "268mm", "185mm"];
    contactText.contents = "LET'S CREATE SOMETHING EXCEPTIONAL IN MUMBAI\n\n" +
        "Available for Editorial Fashion Campaigns, Luxury Weddings, Production Stills & Commercial Commissions.\n\n" +
        "PHONE: +91 98765 43210        EMAIL: rishavraj@gmail.com\n" +
        "PORTFOLIO: www.weclik.in       INSTAGRAM: @rishavrawvisuals\n" +
        "LINKEDIN: linkedin.com/in/rishavraj";
    try {
        contactText.paragraphs[0].pointSize = 14;
        contactText.paragraphs[0].fillColor = colAmber;
        contactText.paragraphs[0].tracking = 100;
        contactText.paragraphs[1].pointSize = 9.5;
        contactText.paragraphs[1].fillColor = colIvory;
        contactText.paragraphs[2].pointSize = 8.5;
        contactText.paragraphs[2].fillColor = doc.swatches.item("Paper");
    } catch(e) {}

    // Completed
}

createFilmNegativeResume();
