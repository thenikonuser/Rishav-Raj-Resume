// ==============================================================================
// Adobe Illustrator ExtendScript: "THE FILM NEGATIVE RESUME" - Rishav Raj
// Targets: Adobe Illustrator 2026 / CC
// Creates a new Native Illustrator Document with Layers, Film Frames & Typography
// ==============================================================================

#target illustrator

function buildIllustratorResume() {
    // 1. Create New Document: 1200 x 1697 pt (Portrait)
    var docPreset = new DocumentPreset();
    docPreset.width = 1200;
    docPreset.height = 1697;
    docPreset.colorMode = DocumentColorSpace.RGB;
    docPreset.title = "Rishav_Raj_Film_Negative_Resume";
    
    var doc = app.documents.addDocument(DocumentColorSpace.RGB, docPreset);

    // Helpers: Colors
    function makeRGB(r, g, b) {
        var c = new RGBColor();
        c.red = r;
        c.green = g;
        c.blue = b;
        return c;
    }

    var colMatteBlack = makeRGB(12, 12, 14);
    var colCardBg     = makeRGB(24, 24, 27);
    var colIvory      = makeRGB(254, 243, 199);
    var colAmber      = makeRGB(245, 158, 11);
    var colOlive      = makeRGB(101, 163, 13);
    var colGray       = makeRGB(161, 161, 170);
    var colDarkStroke = makeRGB(39, 39, 42);

    // 2. LAYER 1: Background
    var bgLayer = doc.layers[0];
    bgLayer.name = "01_Background";
    var bgRect = bgLayer.pathItems.rectangle(0, 0, 1200, 1697);
    bgRect.fillColor = colMatteBlack;
    bgRect.stroked = false;

    // 3. LAYER 2: Header & Branding
    var headerLayer = doc.layers.add();
    headerLayer.name = "02_Header";

    var titleText = headerLayer.textFrames.pointText([80, -90]);
    titleText.contents = "RISHAV RAJ";
    titleText.textRange.characterAttributes.size = 46;
    titleText.textRange.characterAttributes.fillColor = colIvory;

    var subText = headerLayer.textFrames.pointText([80, -125]);
    subText.contents = "VISUAL STORYTELLER • FASHION & EDITORIAL • CREATIVE DIRECTOR";
    subText.textRange.characterAttributes.size = 13;
    subText.textRange.characterAttributes.fillColor = colAmber;

    var metaText = headerLayer.textFrames.pointText([80, -145]);
    metaText.contents = "KODAK PORTRA 400 • 35MM CINEMATIC ARCHIVE • MUMBAI, INDIA";
    metaText.textRange.characterAttributes.size = 11;
    metaText.textRange.characterAttributes.fillColor = colGray;

    // Status Badge
    var badgeBox = headerLayer.pathItems.roundedRectangle(-75, 780, 340, 65, 4, 4);
    badgeBox.fillColor = colCardBg;
    badgeBox.strokeColor = colDarkStroke;
    badgeBox.strokeWidth = 1.5;

    var badgeText1 = headerLayer.textFrames.pointText([800, -95]);
    badgeText1.contents = "MUMBAI, MAHARASHTRA";
    badgeText1.textRange.characterAttributes.size = 14;
    badgeText1.textRange.characterAttributes.fillColor = colIvory;

    var badgeText2 = headerLayer.textFrames.pointText([800, -118]);
    badgeText2.contents = "ACTIVE BASE • COMMISSIONS OPEN";
    badgeText2.textRange.characterAttributes.size = 9;
    badgeText2.textRange.characterAttributes.fillColor = colOlive;

    // 4. LAYER 3: 35mm Film Strip & Sprockets
    var stripLayer = doc.layers.add();
    stripLayer.name = "03_Film_Strip";

    // Main Strip Container
    var stripRect = stripLayer.pathItems.rectangle(-190, 80, 1040, 360);
    stripRect.fillColor = makeRGB(0, 0, 0);
    stripRect.strokeColor = colDarkStroke;
    stripRect.strokeWidth = 2;

    // Draw Sprockets
    for (var s = 0; s < 15; s++) {
        var sx = 95 + (s * 67);
        // Top sprocket
        var spTop = stripLayer.pathItems.roundedRectangle(-200, sx, 28, 16, 3, 3);
        spTop.fillColor = colMatteBlack;
        spTop.strokeColor = colDarkStroke;
        spTop.strokeWidth = 1;

        // Bottom sprocket
        var spBot = stripLayer.pathItems.roundedRectangle(-524, sx, 28, 16, 3, 3);
        spBot.fillColor = colMatteBlack;
        spBot.strokeColor = colDarkStroke;
        spBot.strokeWidth = 1;
    }

    // Film Frames inside strip (Frames 001, 002, 003, 005)
    var chapters = [
        { num: "001", period: "OCT 2015", title: "MEOW Studio", role: "Light Assistant", note: "Lighting & Studio Setup" },
        { num: "002", period: "JAN 2016", title: "Weddings Lead", role: "Independent Shooter", note: "Nikon D5500 & Speedlight" },
        { num: "003", period: "JUN 2017", title: "WECLIK", role: "Co-Founder & Lead", note: "20+ Luxury Weddings / Yr" },
        { num: "005", period: "JAN 2021", title: "Mumbai Fashion", role: "Editorial Director", note: "SWASS Couture Campaigns" }
    ];

    for (var f = 0; f < chapters.length; f++) {
        var fx = 105 + (f * 250);
        var fBox = stripLayer.pathItems.roundedRectangle(-230, fx, 230, 280, 2, 2);
        fBox.fillColor = colCardBg;
        fBox.strokeColor = (f === 2 || f === 3) ? colAmber : colDarkStroke;
        fBox.strokeWidth = 1.5;

        // Image Placeholder Box
        var imgBox = stripLayer.pathItems.rectangle(-242, fx + 12, 206, 150);
        imgBox.fillColor = makeRGB(28, 25, 23);
        imgBox.strokeColor = colDarkStroke;
        imgBox.strokeWidth = 1;

        var imgLabel = stripLayer.textFrames.pointText([fx + 75, -315]);
        imgLabel.contents = "[ PHOTO " + chapters[f].num + " ]";
        imgLabel.textRange.characterAttributes.size = 10;
        imgLabel.textRange.characterAttributes.fillColor = colGray;

        // Metadata Text
        var fMeta = stripLayer.textFrames.pointText([fx + 14, -410]);
        fMeta.contents = "FRAME " + chapters[f].num + " • " + chapters[f].period;
        fMeta.textRange.characterAttributes.size = 9;
        fMeta.textRange.characterAttributes.fillColor = colAmber;

        var fTitle = stripLayer.textFrames.pointText([fx + 14, -432]);
        fTitle.contents = chapters[f].title;
        fTitle.textRange.characterAttributes.size = 15;
        fTitle.textRange.characterAttributes.fillColor = colIvory;

        var fRole = stripLayer.textFrames.pointText([fx + 14, -452]);
        fRole.contents = chapters[f].role + " | " + chapters[f].note;
        fRole.textRange.characterAttributes.size = 8.5;
        fRole.textRange.characterAttributes.fillColor = colGray;
    }

    // 5. LAYER 4: Technical Specifications & Experience Columns
    var contentLayer = doc.layers.add();
    contentLayer.name = "04_Production_Columns";

    // Column 1: Career Timeline
    var c1Title = contentLayer.textFrames.pointText([80, -600]);
    c1Title.contents = "01 // PRODUCTION JOURNEY";
    c1Title.textRange.characterAttributes.size = 13;
    c1Title.textRange.characterAttributes.fillColor = colAmber;

    var c1Content = contentLayer.textFrames.pointText([80, -635]);
    c1Content.contents = 
        "MEOW STUDIO (Oct 2015)\n" +
        "Light Assistant. Lighting fundamentals, studio strobes, continuous lights, ACR.\n\n" +
        "WECLIK — BRAND LEAD (Jun 2017)\n" +
        "Co-Founder & Creative Lead. Scaled brand to 20+ luxury weddings/year across India.\n\n" +
        "STUDIO COLLABORATIONS (2018–2020)\n" +
        "Collaborated with Photovale, Wedding Moments, Crystal Eye & Shutterbox.\n\n" +
        "MUMBAI EDITORIAL & FASHION (Jan 2021)\n" +
        "Campaigns for SWASS Couture, model agency look-tests, commercial OTT stills.\n\n" +
        "CURRENT PRACTICE (2024–Present)\n" +
        "Flagship Nikon Z6 III mirrorless kit. Hybrid stills & 4K cinema in DaVinci Resolve.";
    c1Content.textRange.characterAttributes.size = 9.5;
    c1Content.textRange.characterAttributes.fillColor = colIvory;

    // Column 2: Owned Gear Kit
    var c2Title = contentLayer.textFrames.pointText([450, -600]);
    c2Title.contents = "02 // OWNED HARDWARE KIT";
    c2Title.textRange.characterAttributes.size = 13;
    c2Title.textRange.characterAttributes.fillColor = colAmber;

    var c2Content = contentLayer.textFrames.pointText([450, -635]);
    c2Content.contents = 
        "CAMERA BODIES\n" +
        "• Nikon Z6 III (Mirrorless Flagship, 6K RAW, 4K 120p)\n" +
        "• Nikon D5500 (Legacy DSLR System)\n\n" +
        "NIKKOR Z OPTICS\n" +
        "• NIKKOR Z 35mm f/1.4 (Documentary & Environmental)\n" +
        "• NIKKOR Z 85mm f/1.8 S (S-Line Beauty Compression)\n" +
        "• NIKKOR Z 28–75mm f/2.8 (High-Pace Runway Zoom)\n\n" +
        "LIGHTING & GRIP\n" +
        "• Godox V1 Round-Head Flash (On-Camera / Off-Camera)\n" +
        "• Godox SK400 II AC Studio Strobes (x2)\n" +
        "• Godox SL60W Continuous LED Light\n" +
        "• Octaboxes, Stripboxes, Grids & C-Stands\n\n" +
        "ON-SET TETHERING & DATA\n" +
        "• Apple MacBook Pro M1 Pro (16GB RAM) + Redundant RAID";
    c2Content.textRange.characterAttributes.size = 9.5;
    c2Content.textRange.characterAttributes.fillColor = colIvory;

    // Column 3: Metrics & Software
    var c3Title = contentLayer.textFrames.pointText([820, -600]);
    c3Title.contents = "03 // METRICS & SOFTWARE";
    c3Title.textRange.characterAttributes.size = 13;
    c3Title.textRange.characterAttributes.fillColor = colAmber;

    var c3Content = contentLayer.textFrames.pointText([820, -635]);
    c3Content.contents = 
        "VERIFIED CREDENTIALS\n" +
        "• 500+ Total Shoots & Completed Events\n" +
        "• 8+ Years Commercial Industry Experience\n" +
        "• 20+ Luxury Weddings Delivered Annually\n\n" +
        "POST-PRODUCTION SUITE\n" +
        "• Adobe Lightroom Classic (Mastery)\n" +
        "• Adobe Photoshop & Camera Raw (Mastery)\n" +
        "• DaVinci Resolve Studio (Advanced Grading)\n" +
        "• Adobe Premiere Pro (Reel Editing)\n" +
        "• Capture One Pro (Tethered Production)\n\n" +
        "KEY CLIENT CREDITS\n" +
        "• SWASS Couture (Seasonal Lookbooks)\n" +
        "• VIMAAP Fashion & Designer Labels\n" +
        "• RC Films by RKS & Bihari Films\n" +
        "• Independent OTT Production Stills";
    c3Content.textRange.characterAttributes.size = 9.5;
    c3Content.textRange.characterAttributes.fillColor = colIvory;

    // 6. LAYER 5: Contact Banner
    var contactLayer = doc.layers.add();
    contactLayer.name = "05_Contact_Footer";

    var cBanner = contactLayer.pathItems.roundedRectangle(-1420, 80, 1040, 120, 4, 4);
    cBanner.fillColor = colCardBg;
    cBanner.strokeColor = colAmber;
    cBanner.strokeWidth = 1.5;

    var cHead = contactLayer.textFrames.pointText([110, -1450]);
    cHead.contents = "LET'S CREATE SOMETHING EXCEPTIONAL IN MUMBAI";
    cHead.textRange.characterAttributes.size = 18;
    cHead.textRange.characterAttributes.fillColor = colIvory;

    var cSub = contactLayer.textFrames.pointText([110, -1475]);
    cSub.contents = "Accepting Commissions for Fashion Lookbooks, OTT Unit Stills, High-Profile Weddings & Commercial Campaigns.";
    cSub.textRange.characterAttributes.size = 10;
    cSub.textRange.characterAttributes.fillColor = colGray;

    var cRow = contactLayer.textFrames.pointText([110, -1505]);
    cRow.contents = "PHONE: +91 98765 43210   |   EMAIL: rishavraj@gmail.com   |   PORTFOLIO: weclik.in   |   IG: @rishavrawvisuals";
    cRow.textRange.characterAttributes.size = 10;
    cRow.textRange.characterAttributes.fillColor = colAmber;
}

buildIllustratorResume();
