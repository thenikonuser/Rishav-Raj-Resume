// ==============================================================================
// Adobe InDesign ExtendScript: "THE FILM NEGATIVE RESUME" - MASTER EDITION (v2)
// Designed for Rishav Raj — Photographer & Creative Director, Mumbai
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
    // PAGE 1: HEADER, NEW PORTRAIT, 35MM FILM REEL STRIP & BALANCED CAREER TIMELINE
    // ==========================================================================
    var page1 = doc.pages.item(0);

    var bg1 = page1.rectangles.add();
    bg1.geometricBounds = [0, 0, 297, 210];
    bg1.fillColor = colMatteBlack;
    bg1.strokeWeight = 0;

    // Header Left: Identity & Position
    var headerText = page1.textFrames.add();
    headerText.geometricBounds = [16, 18, 48, 148];
    headerText.textFramePreferences.autoSizingType = AutoSizingTypeEnum.OFF;
    headerText.contents = "RISHAV RAJ\nCREATIVE DIRECTOR & VISUAL STORYTELLER\nFASHION • LUXURY WEDDINGS • COMMERCIAL CINEMA\n35MM CINEMATIC ARCHIVE • MUMBAI, INDIA • WECLIK (weclik.in)";
    try {
        for (var h = 0; h < headerText.paragraphs.length; h++) {
            headerText.paragraphs[h].hyphenation = false;
        }
        headerText.paragraphs[0].pointSize = 27;
        headerText.paragraphs[0].fillColor = colIvory;
        safeFont(headerText.paragraphs[0], fontHeadline);
        headerText.paragraphs[0].tracking = 70;
        headerText.paragraphs[0].leading = 30;

        headerText.paragraphs[1].pointSize = 10;
        headerText.paragraphs[1].fillColor = colAmber;
        safeFont(headerText.paragraphs[1], fontSubhead);
        headerText.paragraphs[1].tracking = 100;
        headerText.paragraphs[1].leading = 14;

        headerText.paragraphs[2].pointSize = 7.5;
        headerText.paragraphs[2].fillColor = colIvory;
        safeFont(headerText.paragraphs[2], fontMeta);
        headerText.paragraphs[2].tracking = 90;
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
            desc: "Editorial Lookbook & Strobe Contrast"
        },
        {
            file: assetsDir + "/portfolio/neeli_nazakat/neeli_nazakat_1.jpg",
            tag: "FRAME 002 // 2021",
            title: "Neeli Nazakat",
            desc: "SWASS Couture & Fabric Texture Retention"
        },
        {
            file: assetsDir + "/portfolio/bhawana_raj/bhawana_raj_1.jpg",
            tag: "FRAME 003 // 2026",
            title: "WECLIK Weddings",
            desc: "Cinematic Luxury Heritage & Film Grading"
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
    // Section 2: Career Chapters & Milestones (2 Separate Balanced Columns)
    // --------------------------------------------------------------------------
    var timelineHeading = page1.textFrames.add();
    timelineHeading.geometricBounds = [145, 18, 152, 192];
    timelineHeading.contents = "02 // CAREER CHAPTERS & PRODUCTION MILESTONES";
    try {
        timelineHeading.paragraphs[0].pointSize = 9.5;
        timelineHeading.paragraphs[0].fillColor = colAmber;
        safeFont(timelineHeading.paragraphs[0], fontSubhead);
        timelineHeading.paragraphs[0].tracking = 140;
        timelineHeading.paragraphs[0].hyphenation = false;
    } catch(e) {}

    // Column 1 (Frames 001 - 003)
    var col1Left = 18;
    var col1Right = 100;
    var col2Left = 110;
    var col2Right = 192;
    var timeTop = 154;
    var timeBot = 282;

    var col1Text = page1.textFrames.add();
    col1Text.geometricBounds = [timeTop, col1Left, timeBot, col1Right];
    col1Text.contents = 
        "FRAME 001: MEOW STUDIO (Oct 2015)\n" +
        "Light Assistant. Mastered lighting physics, studio strobes, continuous lighting, parabolic modifiers, and raw digital negative curation under commercial deadlines.\n\n" +
        "FRAME 002: INDEPENDENT WEDDINGS (Jan 2016)\n" +
        "Traditional & Candid Lead. Delivered natural skin-tone rendition in challenging ambient lighting across landmark multi-day regional weddings.\n\n" +
        "FRAME 003: WECLIK — CO-FOUNDER (Jun 2017)\n" +
        "Creative Director. Co-founded WECLIK (weclik.in), scaling from boutique weddings to 20+ multi-day luxury weddings annually with bespoke cinematography.";

    // Column 2 (Frames 004 - 006)
    var col2Text = page1.textFrames.add();
    col2Text.geometricBounds = [timeTop, col2Left, timeBot, col2Right];
    col2Text.contents = 
        "FRAME 004: EDITORIAL & BRAND COLLABS (2018–2020)\n" +
        "Partnered with leading photo studios and textile brands across eastern India. Specialized in bridal couture lookbooks, jewellery macros, and brand campaigns.\n\n" +
        "FRAME 005: MUMBAI — FASHION & OTT STILLS (Jan 2021)\n" +
        "Relocated to Mumbai. Directed campaigns for SWASS Couture, Crave Hermit, model agency portfolios in Bandra/Versova, and cinema production stills.\n\n" +
        "FRAME 006: FLAGSHIP PRACTICE & 6K CINEMA (Present)\n" +
        "Nikon Z6 III flagship kit. Seamless dual-delivery: high-resolution advertising stills and 4K 10-bit cinematic video graded in DaVinci Resolve Studio.";

    function styleTimelineColumn(tf) {
        for (var p = 0; p < tf.paragraphs.length; p++) {
            var para = tf.paragraphs[p];
            para.hyphenation = false;
            if (para.contents.indexOf("FRAME") === 0) {
                para.pointSize = 8;
                para.fillColor = colAmber;
                safeFont(para, fontSubhead);
                para.spaceBefore = "3.5mm";
                para.spaceAfter = "1mm";
            } else {
                para.pointSize = 7.3;
                para.fillColor = colIvory;
                safeFont(para, fontBody);
                para.leading = 11;
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
    // PAGE 2: TECHNICAL ARSENAL, COMMERCIAL CLIENTS & BRAND ARCHITECTURE
    // ==========================================================================
    var page2 = doc.pages.item(1);

    var bg2 = page2.rectangles.add();
    bg2.geometricBounds = [0, 0, 297, 210];
    bg2.fillColor = colMatteBlack;
    bg2.strokeWeight = 0;

    var head2 = page2.textFrames.add();
    head2.geometricBounds = [16, 18, 25, 192];
    head2.contents = "03 // PRODUCTION CAPABILITIES & TECHNICAL ARSENAL";
    try {
        head2.paragraphs[0].pointSize = 9.5;
        head2.paragraphs[0].fillColor = colAmber;
        safeFont(head2.paragraphs[0], fontSubhead);
        head2.paragraphs[0].tracking = 140;
        head2.paragraphs[0].hyphenation = false;
    } catch(e) {}

    // 3 Clean Cards
    var colW = 54;
    var colGap = 6;

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
        "• Dual System Backup\n" +
        "  Nikon D810 / D5500 & high-speed CFexpress";

    var c2 = page2.textFrames.add();
    c2.geometricBounds = [28, 18 + colW + colGap, 142, 18 + (colW * 2) + colGap];
    c2.contents = "LIGHTING & COLOR\n\n" +
        "• Godox V1 Round-Head\n" +
        "  Natural magnetic falloff & high-speed sync\n\n" +
        "• Godox AD200 Pro Strobes\n" +
        "  Bare-bulb location punch with wireless TTL\n\n" +
        "• Parabolic Softboxes (120cm)\n" +
        "  Directional wrap for couture & beauty campaigns\n\n" +
        "• DaVinci Resolve Studio\n" +
        "  ACES color management, film LUT emulations\n\n" +
        "• Adobe Photoshop Classic\n" +
        "  Frequency separation & authentic fabric retention";

    var c3 = page2.textFrames.add();
    c3.geometricBounds = [28, 18 + ((colW + colGap) * 2), 142, 192];
    c3.contents = "COMMERCIAL PORTFOLIO\n\n" +
        "• 500+ Milestone Shoots\n" +
        "  Luxury weddings, fashion campaigns & films\n\n" +
        "• Reliance / Azorte\n" +
        "  Commercial catalog & retail campaign media\n\n" +
        "• SWASS Couture & Radhika\n" +
        "  Heritage sarees & high-fashion lookbooks\n\n" +
        "• Crave Hermit Production\n" +
        "  Multi-city branded content & advertising\n\n" +
        "• Talent Casting & OTT Stills\n" +
        "  Versova & Bandra actor look-tests & key stills";

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
                pLine.pointSize = 7.2;
                pLine.fillColor = colIvory;
                safeFont(pLine, fontBody);
                pLine.leading = 10.5;
            }
        } catch(e) {}
    }

    // Section 4: Brand Ecosystem
    var brandHeading = page2.textFrames.add();
    brandHeading.geometricBounds = [148, 18, 155, 192];
    brandHeading.contents = "04 // BRAND ECOSYSTEM & DIRECT COMMISSIONS";
    try {
        brandHeading.paragraphs[0].pointSize = 9.5;
        brandHeading.paragraphs[0].fillColor = colAmber;
        safeFont(brandHeading.paragraphs[0], fontSubhead);
        brandHeading.paragraphs[0].tracking = 140;
        brandHeading.paragraphs[0].hyphenation = false;
    } catch(e) {}

    var banner = page2.rectangles.add();
    banner.geometricBounds = [157, 18, 225, 192];
    banner.fillColor = colCardBg;
    banner.strokeColor = colDarkGray;
    banner.strokeWeight = 0.75;

    var bannerText = page2.textFrames.add();
    bannerText.geometricBounds = [161, 22, 221, 188];
    bannerText.contents = 
        "WE GROUP ARCHITECTURE\n\n" +
        "• WECLIK (weclik.in) — Luxury wedding documentation, bespoke films & pre-wedding stories.\n" +
        "• WELEAD GLOBAL — Fashion campaigns, advertising lookbooks, talent casting & commercial media.\n\n" +
        "COMMISSIONING IN MUMBAI & GLOBALLY\n" +
        "Available for high-value commercial assignments, fashion lookbooks, and luxury wedding films across Mumbai, Goa, Udaipur, and international destinations.\n\n" +
        "Interactive Digital Profile: https://resume.weclik.in • Portfolio: https://weclik.in\n" +
        "Direct Contact: connectwithrishav@gmail.com • +91 99342 30034";

    try {
        for (var bp = 0; bp < bannerText.paragraphs.length; bp++) {
            bannerText.paragraphs[bp].hyphenation = false;
        }
        bannerText.paragraphs[0].pointSize = 9;
        bannerText.paragraphs[0].fillColor = colAmber;
        safeFont(bannerText.paragraphs[0], fontSubhead);

        for (var b = 1; b < bannerText.paragraphs.length; b++) {
            var bPara = bannerText.paragraphs[b];
            bPara.pointSize = 7.4;
            bPara.fillColor = colIvory;
            safeFont(bPara, fontBody);
            bPara.leading = 11;
        }
    } catch(e) {}

    // Page 2 Bottom Visual
    var gearImgFile = new File(assetsDir + "/camera-gear.jpg");
    if (gearImgFile.exists) {
        var gPic = page2.rectangles.add();
        gPic.geometricBounds = [230, 18, 280, 192];
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
    foot2.contents = "PAGE 02 // TECHNICAL ARSENAL • DIRECT INQUIRIES: connectwithrishav@gmail.com";
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

    return "Successfully generated Master Film Negative Resume PDF!";
}

buildMasterFilmResume();
