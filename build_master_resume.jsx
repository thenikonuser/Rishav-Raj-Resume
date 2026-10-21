// ==============================================================================
// Adobe InDesign ExtendScript: "THE FILM NEGATIVE RESUME" - MASTER AI EDITION
// Designed for Rishav Raj — Photographer, Creative Director & AI-Augmented Producer
// Compatible with Adobe InDesign 2026 / CC
// ==============================================================================

#target indesign

function buildMasterFilmResume() {
    app.scriptPreferences.userInteractionLevel = UserInteractionLevels.NEVER_INTERACT;

    // 1. Close existing docs if untitled or matching
    for (var d = app.documents.length - 1; d >= 0; d--) {
        if (app.documents[d].name.indexOf("Rishav_Raj") !== -1 || app.documents[d].name.indexOf("Untitled") !== -1) {
            try { app.documents[d].close(SaveOptions.NO); } catch(e) {}
        }
    }

    // 2. Setup Document: 2 Pages A4 Portrait
    var doc = app.documents.add();
    doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
    doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;

    with(doc.documentPreferences) {
        pageWidth = "210mm";
        pageHeight = "297mm";
        facingPages = false;
        pagesPerDocument = 2;
    }

    // Colors
    function getOrCreateColor(name, vals) {
        try {
            var col = doc.colors.item(name);
            col.name;
            return col;
        } catch(e) {
            var newCol = doc.colors.add();
            newCol.name = name;
            newCol.model = ColorModel.PROCESS;
            newCol.colorValue = vals;
            return newCol;
        }
    }

    var colMatteBlack = getOrCreateColor("Film_MatteBlack", [75, 68, 67, 92]); // #0A0A0C
    var colDarkGray   = getOrCreateColor("Film_DarkGray", [65, 55, 55, 60]);   // #202024
    var colIvory      = getOrCreateColor("Film_Ivory", [2, 3, 10, 0]);         // #F8F5EC
    var colAmber      = getOrCreateColor("Film_Amber", [0, 42, 100, 0]);       // #F59E0B
    var colOlive      = getOrCreateColor("Film_Olive", [30, 20, 20, 40]);      // #A1A1AA
    var colCardBg     = getOrCreateColor("Film_CardBg", [70, 65, 65, 80]);      // #141417

    var fontHeadline = "Playfair Display\tBold";
    var fontSubhead  = "Montserrat\tSemiBold Italic";
    var fontMeta     = "Montserrat\tRegular";
    var fontBody     = "Helvetica Neue\tRegular";
    var fontBodyBold = "Helvetica Neue\tBold";

    function safeFont(tf, fontName) {
        try { tf.appliedFont = app.fonts.item(fontName); } catch(e) {}
    }

    var assetsDir = "/Users/test/Desktop/MUMBAI/rishav-raj-portfolio/assets";

    // ==========================================================================
    // PAGE 1: HEADER, PORTRAIT, 35MM FILM REEL STRIP & AI-AUGMENTED CAREER TIMELINE
    // ==========================================================================
    var page1 = doc.pages.item(0);

    var bg1 = page1.rectangles.add();
    bg1.geometricBounds = [0, 0, 297, 210];
    bg1.fillColor = colMatteBlack;
    bg1.strokeWeight = 0;

    // Header Left: Identity & AI-Integrated Title
    var headerText = page1.textFrames.add();
    headerText.geometricBounds = [15, 18, 50, 148];
    headerText.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
    headerText.contents = "RISHAV RAJ\nCREATIVE DIRECTOR & VISUAL STORYTELLER\nCOMMERCIAL ADVERTISING • LUXURY WEDDINGS • AI-AUGMENTED PRODUCTION\n35MM CINEMATIC ARCHIVE • MUMBAI, INDIA • WECLIK (weclik.in)";
    try {
        for (var h = 0; h < headerText.paragraphs.length; h++) {
            headerText.paragraphs[h].hyphenation = false;
        }
        headerText.paragraphs[0].pointSize = 27;
        headerText.paragraphs[0].fillColor = colIvory;
        safeFont(headerText.paragraphs[0], fontHeadline);
        headerText.paragraphs[0].tracking = 70;
        headerText.paragraphs[0].leading = 29;

        headerText.paragraphs[1].pointSize = 9.5;
        headerText.paragraphs[1].fillColor = colAmber;
        safeFont(headerText.paragraphs[1], fontSubhead);
        headerText.paragraphs[1].tracking = 100;
        headerText.paragraphs[1].leading = 14;

        headerText.paragraphs[2].pointSize = 7.5;
        headerText.paragraphs[2].fillColor = colIvory;
        safeFont(headerText.paragraphs[2], fontMeta);
        headerText.paragraphs[2].tracking = 85;
        headerText.paragraphs[2].leading = 11;

        headerText.paragraphs[3].pointSize = 7;
        headerText.paragraphs[3].fillColor = colOlive;
        safeFont(headerText.paragraphs[3], fontMeta);
        headerText.paragraphs[3].tracking = 80;
        headerText.paragraphs[3].leading = 10;
    } catch(e) {}

    // Header Right: Portrait Image inside Film Negative Badge
    var portraitFile = new File(assetsDir + "/rishav-portrait.jpg");
    if (portraitFile.exists) {
        var pBorder = page1.rectangles.add();
        pBorder.geometricBounds = [14, 154, 48, 194];
        pBorder.fillColor = colDarkGray;
        pBorder.strokeColor = colAmber;
        pBorder.strokeWeight = 0.75;

        var pFrame = page1.rectangles.add();
        pFrame.geometricBounds = [15.5, 155.5, 46.5, 192.5];
        pFrame.fillColor = colMatteBlack;
        pFrame.strokeWeight = 0;
        pFrame.place(portraitFile);
        try {
            pFrame.fit(FitOptions.FILL_PROPORTIONALLY);
            pFrame.fit(FitOptions.CENTER_CONTENT);
        } catch(e) {}

        var pBadge = page1.textFrames.add();
        pBadge.geometricBounds = [49, 154, 53, 194];
        pBadge.contents = "MUMBAI // 2026";
        try {
            pBadge.paragraphs[0].pointSize = 6;
            pBadge.paragraphs[0].fillColor = colOlive;
            safeFont(pBadge.paragraphs[0], fontMeta);
            pBadge.paragraphs[0].justification = Justification.CENTER_ALIGN;
            pBadge.paragraphs[0].tracking = 120;
        } catch(e) {}
    }

    // --------------------------------------------------------------------------
    // 35mm Film Strip (Horizontal Frame Block)
    // --------------------------------------------------------------------------
    var stripTop = 55;
    var stripHeight = 84;
    var stripLeft = 14;
    var stripRight = 196;

    var filmStrip = page1.rectangles.add();
    filmStrip.geometricBounds = [stripTop, stripLeft, stripTop + stripHeight, stripRight];
    filmStrip.fillColor = colCardBg;
    filmStrip.strokeColor = colDarkGray;
    filmStrip.strokeWeight = 0.75;

    // Sprocket Holes
    var sprockCount = 14;
    var sprockW = 8;
    var sprockH = 3.8;
    for (var i = 0; i < sprockCount; i++) {
        var sx = 18 + (i * 12.6);
        var spTop = page1.rectangles.add();
        spTop.geometricBounds = [stripTop + 2.2, sx, stripTop + 2.2 + sprockH, sx + sprockW];
        spTop.fillColor = colMatteBlack;
        spTop.strokeWeight = 0;

        var spBot = page1.rectangles.add();
        spBot.geometricBounds = [stripTop + stripHeight - 6, sx, stripTop + stripHeight - 6 + sprockH, sx + sprockW];
        spBot.fillColor = colMatteBlack;
        spBot.strokeWeight = 0;
    }

    // Rebate Text
    var rebateText = page1.textFrames.add();
    rebateText.geometricBounds = [stripTop + 1.5, stripLeft + 2, stripTop + 6.5, stripRight - 2];
    rebateText.contents = "KODAK PORTRA 400 • 35MM EXP 36 • DX BARCODE 400-36 • SAFETY FILM • EMULSION 2026";
    try {
        rebateText.paragraphs[0].pointSize = 5.5;
        rebateText.paragraphs[0].fillColor = colAmber;
        safeFont(rebateText.paragraphs[0], fontMeta);
        rebateText.paragraphs[0].tracking = 140;
        rebateText.paragraphs[0].hyphenation = false;
    } catch(e) {}

    // 3 Visual Frames Inside Strip
    var frameItems = [
        {
            file: assetsDir + "/portfolio/retro_rachna/retro_rachna_1.jpg",
            tag: "FRAME 001 // 2017",
            title: "Retro Rachna",
            desc: "Studio Lighting & Raw Emulsion Foundations"
        },
        {
            file: assetsDir + "/portfolio/neeli_nazakat/neeli_nazakat_1.jpg",
            tag: "FRAME 002 // 2021",
            title: "Neeli Nazakat",
            desc: "SWASS Couture • AI Set & Fabric Retention"
        },
        {
            file: assetsDir + "/portfolio/bhawana_raj/bhawana_raj_1.jpg",
            tag: "FRAME 003 // 2026",
            title: "WECLIK Weddings",
            desc: "Bespoke Cinema • Evoto AI Batch Grading"
        }
    ];

    var fW = 54;
    var fY = stripTop + 9;

    for (var f = 0; f < frameItems.length; f++) {
        var fX = 20 + (f * 59);

        var gFrame = page1.rectangles.add();
        gFrame.geometricBounds = [fY, fX, fY + 44, fX + fW];
        gFrame.strokeColor = colAmber;
        gFrame.strokeWeight = 0.5;
        gFrame.fillColor = colDarkGray;

        var curFile = new File(frameItems[f].file);
        if (curFile.exists) {
            gFrame.place(curFile);
            try {
                gFrame.fit(FitOptions.FILL_PROPORTIONALLY);
                gFrame.fit(FitOptions.CENTER_CONTENT);
            } catch(e) {}
        }

        var cap = page1.textFrames.add();
        cap.geometricBounds = [fY + 46, fX, fY + 68, fX + fW];
        cap.contents = frameItems[f].tag + "\n" + frameItems[f].title + "\n" + frameItems[f].desc;
        try {
            for (var c = 0; c < cap.paragraphs.length; c++) cap.paragraphs[c].hyphenation = false;
            cap.paragraphs[0].pointSize = 6.5;
            cap.paragraphs[0].fillColor = colAmber;
            safeFont(cap.paragraphs[0], fontMeta);

            cap.paragraphs[1].pointSize = 8.5;
            cap.paragraphs[1].fillColor = colIvory;
            safeFont(cap.paragraphs[1], fontHeadline);

            cap.paragraphs[2].pointSize = 6.5;
            cap.paragraphs[2].fillColor = colOlive;
            safeFont(cap.paragraphs[2], fontBody);
        } catch(e) {}
    }

    // --------------------------------------------------------------------------
    // Section 2: Career Chapters & AI-Integrated Milestones (2 Balanced Columns)
    // --------------------------------------------------------------------------
    var timelineHeading = page1.textFrames.add();
    timelineHeading.geometricBounds = [145, 18, 152, 192];
    timelineHeading.contents = "02 // CAREER TIMELINE & AI INTEGRATION (2015 — 2026)";
    try {
        timelineHeading.paragraphs[0].pointSize = 9.5;
        timelineHeading.paragraphs[0].fillColor = colAmber;
        safeFont(timelineHeading.paragraphs[0], fontSubhead);
        timelineHeading.paragraphs[0].tracking = 140;
        timelineHeading.paragraphs[0].hyphenation = false;
    } catch(e) {}

    // Column 1 (Frames 001 - 003: Foundational Era to Commercial Growth)
    var col1Left = 18;
    var col1Right = 101;
    var col2Left = 109;
    var col2Right = 192;
    var timeTop = 154;
    var timeBot = 282;

    var col1Text = page1.textFrames.add();
    col1Text.geometricBounds = [timeTop, col1Left, timeBot, col1Right];
    col1Text.contents = 
        "FRAME 001: MEOW STUDIO (Oct 2015)\n" +
        "Light Assistant. Mastered lighting physics, parabolic modifiers, optical falloff, color temperature, and strict studio digital negative asset handling protocols.\n\n" +
        "FRAME 002: INDEPENDENT WEDDINGS (Jan 2016)\n" +
        "Lead Traditional & Candid Photographer. Perfected candid documentary timing, authentic skin tones under erratic ambient lighting, and high-volume event curation.\n\n" +
        "FRAME 003: WECLIK — BUILDING SCALE (Jun 2017–2021)\n" +
        "Co-Founder & Creative Lead. Scaled WECLIK (weclik.in) from regional weddings to 20+ multi-day luxury weddings annually with cinematic film grading and studio teams.";

    // Column 2 (Frames 004 - 006: Mainstream AI, Scripting, Automation & Direction)
    var col2Text = page1.textFrames.add();
    col2Text.geometricBounds = [timeTop, col2Left, timeBot, col2Right];
    col2Text.contents = 
        "FRAME 004: ADOBE CC AI & EVOTO ADOPTION (2022–2023)\n" +
        "Early adopter of Adobe Firefly & Photoshop Generative Fill for commercial set extensions and backdrop synthesis. Integrated Evoto AI for batch frequency separation, facial landmark refinement, and AI masking across massive 1000+ photo deliveries.\n\n" +
        "FRAME 005: AI AD COPYWRITING & PRE-LIGHTING (2024)\n" +
        "Used ChatGPT & Google Gemini as creative writing collaborators for commercial ad copies (e.g. craft beer brand expansion campaign from Goa to Bombay). Integrated 3D virtual lighting software to simulate studio diagrams, lighting ratios, and modifiers before arriving on set.\n\n" +
        "FRAME 006: BESPOKE STUDIO SOFTWARE & HYBRID DIRECTION (2025–2026)\n" +
        "Engineered custom Python RAW-matching software using Google Antigravity & DeepSeek to automate client album selections from terabytes of archives. Explored generative video (Sora/Runway) for B-roll animatics alongside flagship Nikon Z6 III 6K RAW cinema production.";

    function styleTimelineColumn(tf) {
        for (var p = 0; p < tf.paragraphs.length; p++) {
            var para = tf.paragraphs[p];
            para.hyphenation = false;
            if (para.contents.indexOf("FRAME") === 0) {
                para.pointSize = 8;
                para.fillColor = colAmber;
                safeFont(para, fontSubhead);
                para.spaceBefore = "3.2mm";
                para.spaceAfter = "1mm";
            } else {
                para.pointSize = 7.1;
                para.fillColor = colIvory;
                safeFont(para, fontBody);
                para.leading = 10.6;
            }
        }
    }

    try { styleTimelineColumn(col1Text); } catch(e) {}
    try { styleTimelineColumn(col2Text); } catch(e) {}

    // Page 1 Footer Bar
    var foot1 = page1.textFrames.add();
    foot1.geometricBounds = [285, 18, 292, 192];
    foot1.contents = "PAGE 01 // FILM REEL ARCHIVE • INTERACTIVE TIMELINE: https://resume.weclik.in";
    try {
        foot1.paragraphs[0].pointSize = 6.5;
        foot1.paragraphs[0].fillColor = colOlive;
        safeFont(foot1.paragraphs[0], fontMeta);
        foot1.paragraphs[0].justification = Justification.RIGHT_ALIGN;
        foot1.paragraphs[0].hyphenation = false;
    } catch(e) {}


    // ==========================================================================
    // PAGE 2: HARDWARE ARSENAL, AI & COMPUTATIONAL SUITE & BRAND COMMISSIONS
    // ==========================================================================
    var page2 = doc.pages.item(1);

    var bg2 = page2.rectangles.add();
    bg2.geometricBounds = [0, 0, 297, 210];
    bg2.fillColor = colMatteBlack;
    bg2.strokeWeight = 0;

    var head2 = page2.textFrames.add();
    head2.geometricBounds = [16, 18, 25, 192];
    head2.contents = "03 // PRODUCTION ARSENAL & AI COMPUTATIONAL WORKFLOW";
    try {
        head2.paragraphs[0].pointSize = 9.5;
        head2.paragraphs[0].fillColor = colAmber;
        safeFont(head2.paragraphs[0], fontSubhead);
        head2.paragraphs[0].tracking = 140;
        head2.paragraphs[0].hyphenation = false;
    } catch(e) {}

    // 3 Cards: Hardware, AI Post/Retouching/3D, and AI Scripting/Engineering
    var colW = 54;
    var colGap = 6;

    // Card 1: Camera & Optics
    var c1 = page2.textFrames.add();
    c1.geometricBounds = [28, 18, 142, 18 + colW];
    c1.contents = "CAMERA & OPTICS\n\n" +
        "• Nikon Z6 III (Mirrorless)\n" +
        "  6K N-RAW, 4K 120p cinema, 14-stop dynamic range\n\n" +
        "• NIKKOR Z 35mm f/1.4\n" +
        "  Documentary reportage & low-light editorial\n\n" +
        "• NIKKOR Z 85mm f/1.8 S\n" +
        "  S-Line high-resolution beauty portraits\n\n" +
        "• NIKKOR Z 28–75mm f/2.8\n" +
        "  Runway, fast event zooms & commercial coverage\n\n" +
        "• Godox V1 & AD200 Pro Strobes\n" +
        "  Location lighting with wireless TTL & deep parabolics";

    // Card 2: AI Retouching, 3D Pre-Lighting & Generative Vision
    var c2 = page2.textFrames.add();
    c2.geometricBounds = [28, 18 + colW + colGap, 142, 18 + (colW * 2) + colGap];
    c2.contents = "AI RETOUCHING & PRE-VIS\n\n" +
        "• Evoto AI (Batch Retouching)\n" +
        "  Automated frequency separation, skin-texture retention & smart facial masking\n\n" +
        "• Adobe Firefly & Generative Fill\n" +
        "  Rapid set extension, background reconstruction & conceptual ideation\n\n" +
        "• 3D Virtual Studio Lighting\n" +
        "  Full 3D diagramming of light placement, modifiers & camera angles before shoot day\n\n" +
        "• Generative Video (Sora / Runway)\n" +
        "  Exploring conceptual product animatics & B-roll";

    // Card 3: AI Copywriting, Tool Engineering & LLMs
    var c3 = page2.textFrames.add();
    c3.geometricBounds = [28, 18 + ((colW + colGap) * 2), 142, 192];
    c3.contents = "AI SCRIPTING & CODE\n\n" +
        "• Bespoke RAW Culling Tool\n" +
        "  Built with Google Antigravity & DeepSeek to auto-match client JPEG picks to master RAWs\n\n" +
        "• DeepSeek Open-Source LLMs\n" +
        "  Local scripting, data processing, workflow automation & code architecture\n\n" +
        "• ChatGPT & Google Gemini\n" +
        "  Commercial ad copywriting, pitch treatments, and creative script doctoring\n\n" +
        "• DaVinci Resolve Studio\n" +
        "  AI Magic Mask, Neural Depth Map, ACES color";

    var cards = [c1, c2, c3];
    for (var k = 0; k < cards.length; k++) {
        try {
            for (var cpI = 0; cpI < cards[k].paragraphs.length; cpI++) {
                cards[k].paragraphs[cpI].hyphenation = false;
            }
            var cp = cards[k].paragraphs[0];
            cp.pointSize = 8.5;
            cp.fillColor = colAmber;
            safeFont(cp, fontSubhead);
            cp.tracking = 100;

            for (var m = 1; m < cards[k].paragraphs.length; m++) {
                var pLine = cards[k].paragraphs[m];
                pLine.pointSize = 7.1;
                pLine.fillColor = colIvory;
                safeFont(pLine, fontBody);
                pLine.leading = 10.3;
            }
        } catch(e) {}
    }

    // Section 4: Brand Ecosystem & Commercial Production Case Studies
    var brandHeading = page2.textFrames.add();
    brandHeading.geometricBounds = [148, 18, 155, 192];
    brandHeading.contents = "04 // BRAND ECOSYSTEM & COMMERCIAL COMMISSIONS";
    try {
        brandHeading.paragraphs[0].pointSize = 9.5;
        brandHeading.paragraphs[0].fillColor = colAmber;
        safeFont(brandHeading.paragraphs[0], fontSubhead);
        brandHeading.paragraphs[0].tracking = 140;
        brandHeading.paragraphs[0].hyphenation = false;
    } catch(e) {}

    var banner = page2.rectangles.add();
    banner.geometricBounds = [157, 18, 226, 192];
    banner.fillColor = colCardBg;
    banner.strokeColor = colDarkGray;
    banner.strokeWeight = 0.75;

    var bannerText = page2.textFrames.add();
    bannerText.geometricBounds = [161, 22, 222, 188];
    bannerText.contents = 
        "WE GROUP ARCHITECTURE & AI PRODUCTION EDGE\n\n" +
        "• WECLIK (weclik.in) — Luxury wedding cinematography, high-volume bespoke curation & heirloom photobooks.\n" +
        "• WELEAD GLOBAL — Fashion campaigns, advertising lookbooks, talent casting & AI-augmented commercial productions.\n\n" +
        "COMMERCIAL CASE STUDY & CAMPAIGN DIRECTION\n" +
        "Craft Beer Goa-to-Bombay Expansion: Developed full advertising concept, using AI as an editorial critic to refine hooks, narrative tension, and regional tone. Delivered end-to-end commercial pitch and visual storyboard.\n\n" +
        "Interactive Digital Profile: https://resume.weclik.in • Portfolio: https://weclik.in\n" +
        "Direct Contact: connectwithrishav@gmail.com • +91 99342 30034";

    try {
        for (var bp = 0; bp < bannerText.paragraphs.length; bp++) {
            bannerText.paragraphs[bp].hyphenation = false;
        }
        bannerText.paragraphs[0].pointSize = 8.8;
        bannerText.paragraphs[0].fillColor = colAmber;
        safeFont(bannerText.paragraphs[0], fontSubhead);

        for (var b = 1; b < bannerText.paragraphs.length; b++) {
            var bPara = bannerText.paragraphs[b];
            bPara.pointSize = 7.3;
            bPara.fillColor = colIvory;
            safeFont(bPara, fontBody);
            bPara.leading = 10.8;
        }
    } catch(e) {}

    // Page 2 Bottom Visual
    var gearImgFile = new File(assetsDir + "/camera-gear.jpg");
    if (gearImgFile.exists) {
        var gPic = page2.rectangles.add();
        gPic.geometricBounds = [231, 18, 280, 192];
        gPic.fillColor = colDarkGray;
        gPic.strokeColor = colAmber;
        gPic.strokeWeight = 0.5;
        gPic.place(gearImgFile);
        try {
            gPic.fit(FitOptions.FILL_PROPORTIONALLY);
            gPic.fit(FitOptions.CENTER_CONTENT);
        } catch(e) {}
    }

    var foot2 = page2.textFrames.add();
    foot2.geometricBounds = [285, 18, 292, 192];
    foot2.contents = "PAGE 02 // PRODUCTION ARSENAL • DIRECT INQUIRIES: connectwithrishav@gmail.com";
    try {
        foot2.paragraphs[0].pointSize = 6.5;
        foot2.paragraphs[0].fillColor = colOlive;
        safeFont(foot2.paragraphs[0], fontMeta);
        foot2.paragraphs[0].justification = Justification.RIGHT_ALIGN;
        foot2.paragraphs[0].hyphenation = false;
    } catch(e) {}

    // 4. Save and Export PDF
    var inddDest = new File("/Users/test/Desktop/MUMBAI/rishav-raj-portfolio/Rishav_Raj_Film_Reel_Resume_Master.indd");
    doc.save(inddDest);

    var pdfDest = new File("/Users/test/Desktop/MUMBAI/rishav-raj-portfolio/Rishav_Raj_Film_Reel_Resume_Print.pdf");
    doc.exportFile(ExportFormat.PDF_TYPE, pdfDest);

    app.pngExportPreferences.pngExportRange = PNGExportRangeEnum.EXPORT_RANGE;
    app.pngExportPreferences.exportResolution = 150;

    app.pngExportPreferences.pageString = "1";
    doc.exportFile(ExportFormat.PNG_FORMAT, new File("/Users/test/Desktop/MUMBAI/rishav-raj-portfolio/resume_preview_page1.png"));

    app.pngExportPreferences.pageString = "2";
    doc.exportFile(ExportFormat.PNG_FORMAT, new File("/Users/test/Desktop/MUMBAI/rishav-raj-portfolio/resume_preview_page2.png"));

    return "Successfully generated Master AI Film Negative Resume PDF!";
}

buildMasterFilmResume();
