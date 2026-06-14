"use client";

import { useState, useEffect, useCallback, useRef, Fragment } from "react";


/* === PHOTO LIBRARY — curated Unsplash IDs, all HQ, all free === */
const PHOTOS = {
  // Hero / card photos per destination
  "tk-hero":  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=85&fit=crop",   // Istanbul Bosphorus sunset
  "tk-card":  "https://images.unsplash.com/photo-1603202662747-00e33e7d1468?w=900&q=85&fit=crop",    // Cappadocia balloons
  "eg-hero":  "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1600&q=85&fit=crop",   // Pyramids of Giza aerial
  "eg-card":  "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=900&q=85&fit=crop",    // Nile at sunset
  "ge-hero":  "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600&q=85&fit=crop",   // Tbilisi old town
  "ge-card":  "https://images.unsplash.com/photo-1609941637575-8f97fcc25f88?w=900&q=85&fit=crop",    // Kazbegi mountains
  "db-hero":  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=85&fit=crop",   // Dubai skyline night
  "db-card":  "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=900&q=85&fit=crop",    // Dubai Marina sunset
  "tn-hero":  "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1600&q=85&fit=crop",     // Sidi Bou Said blue-white
  "tn-card":  "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=900&q=85&fit=crop",    // Tunisia coast
  "mr-hero":  "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=1600&q=85&fit=crop",     // Marrakech medina
  "mr-card":  "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=900&q=85&fit=crop",   // Chefchaouen blue city
  // Package hero/card images
  "sharm1":   "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1600&q=85&fit=crop",  // Red Sea resort
  "sharm2":   "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=900&q=85&fit=crop",      // Beach resort pool
  "ist-rj1":  "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=85&fit=crop",  // Istanbul
  "ist-rj2":  "https://images.unsplash.com/photo-1610419500789-d97ee9a33d2a?w=900&q=85&fit=crop",   // Istanbul card
  "bali1":    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85&fit=crop",  // Bali rice terrace
  "bali2":    "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=900&q=85&fit=crop",      // Bali temple
  "phuket1":  "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1600&q=85&fit=crop",  // Phuket limestone
  "phuket2":  "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&q=85&fit=crop",      // Phuket beach
  "spain1":   "https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=1600&q=85&fit=crop",    // Barcelona Sagrada Familia
  "spain2":   "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=900&q=85&fit=crop",     // Spain coast
  "umr1":     "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1600&q=85&fit=crop", // Makkah
  "umr2":     "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&q=85&fit=crop",  // Makkah card
  // Turkiye attractions
  "tk-a1":    "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=800&q=85&fit=crop",     // Hagia Sophia
  "tk-a2":    "https://images.unsplash.com/photo-1603202662747-00e33e7d1468?w=800&q=85&fit=crop",  // Cappadocia balloon
  "tk-a3":    "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=800&q=85&fit=crop",  // Blue Mosque
  "tk-a4":    "https://images.unsplash.com/photo-1589555786944-b94be87ef4a3?w=800&q=85&fit=crop",  // Pamukkale
  "tk-a5":    "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=800&q=85&fit=crop",  // Grand Bazaar
  "tk-a6":    "https://images.unsplash.com/photo-1589845948397-15b25d2e6201?w=800&q=85&fit=crop",  // Antalya
  // Egypt attractions
  "eg-a1":    "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&q=85&fit=crop",  // Pyramids
  "eg-a2":    "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=85&fit=crop",  // Egyptian museum artefacts
  "eg-a3":    "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=85&fit=crop",     // Karnak temple
  "eg-a4":    "https://images.unsplash.com/photo-1608649698755-a0f2d4f7609e?w=800&q=85&fit=crop",  // Valley of Kings
  "eg-a5":    "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=85&fit=crop",     // Red Sea coral reef
  "eg-a6":    "https://images.unsplash.com/photo-1590160418047-d1e72f7e0fdf?w=800&q=85&fit=crop",  // Abu Simbel
  // Georgia attractions
  "ge-a1":    "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=85&fit=crop",  // Tbilisi old town
  "ge-a2":    "https://images.unsplash.com/photo-1609941637575-8f97fcc25f88?w=800&q=85&fit=crop",  // Gergeti Trinity Church / Kazbegi
  "ge-a3":    "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=85&fit=crop",  // Narikala fortress Tbilisi
  "ge-a4":    "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?w=800&q=85&fit=crop",  // Sulfur baths dome
  "ge-a5":    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=85&fit=crop",  // Vineyard / wine
  "ge-a6":    "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=85&fit=crop",     // Cave city / cliffs
  // Dubai attractions
  "db-a1":    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85&fit=crop",  // Burj Khalifa
  "db-a2":    "https://images.unsplash.com/photo-1561622539-f64f2fccf6db?w=800&q=85&fit=crop",     // Dubai Mall
  "db-a3":    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=85&fit=crop",     // Palm Jumeirah aerial
  "db-a4":    "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800&q=85&fit=crop",  // Dubai Marina
  "db-a5":    "https://images.unsplash.com/photo-1623492701902-47dc207df5e4?w=800&q=85&fit=crop",  // Al Fahidi old Dubai
  "db-a6":    "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=85&fit=crop",  // Dubai desert dunes
  // Tunisia attractions
  "tn-a1":    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=85&fit=crop",     // Sidi Bou Said
  "tn-a2":    "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&q=85&fit=crop",  // Carthage coast
  "tn-a3":    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=85&fit=crop",     // Roman amphitheater
  "tn-a4":    "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=800&q=85&fit=crop",     // Medina souk
  "tn-a5":    "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800&q=85&fit=crop",  // Desert / dunes (Matmata)
  "tn-a6":    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=85&fit=crop",  // Sahara dunes
  // Morocco attractions
  "mr-a1":    "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=800&q=85&fit=crop",     // Marrakech square
  "mr-a2":    "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=800&q=85&fit=crop",  // Chefchaouen blue
  "mr-a3":    "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=85&fit=crop",     // Fes medina / tannery
  "mr-a4":    "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800&q=85&fit=crop",  // Hassan II mosque
  "mr-a5":    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=85&fit=crop",  // Sahara dunes Merzouga
  "mr-a6":    "https://images.unsplash.com/photo-1548884463-d4efe21bf5c3?w=800&q=85&fit=crop",     // Atlas mountains
  // Gallery strips
  "istanbul,bosphorus":       "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=700&q=80&fit=crop",
  "cappadocia,landscape":     "https://images.unsplash.com/photo-1603202662747-00e33e7d1468?w=700&q=80&fit=crop",
  "antalya,coast":            "https://images.unsplash.com/photo-1589845948397-15b25d2e6201?w=700&q=80&fit=crop",
  "pamukkale,white":          "https://images.unsplash.com/photo-1589555786944-b94be87ef4a3?w=700&q=80&fit=crop",
  "ephesus,ruins":            "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=700&q=80&fit=crop",
  "grand-bazaar,turkey":      "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=700&q=80&fit=crop",
  "turkish-tea":              "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=700&q=80&fit=crop",
  "hagia-sophia,interior":    "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=700&q=80&fit=crop",
  "pyramids,giza":            "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=700&q=80&fit=crop",
  "nile,felucca":             "https://images.unsplash.com/photo-1539768942893-daf53e448371?w=700&q=80&fit=crop",
  "luxor,karnak":             "https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=700&q=80&fit=crop",
  "sharm,beach":              "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=700&q=80&fit=crop",
  "egypt,sphinx":             "https://images.unsplash.com/photo-1590160418047-d1e72f7e0fdf?w=700&q=80&fit=crop",
  "egyptian-museum":          "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=700&q=80&fit=crop",
  "abu-simbel":               "https://images.unsplash.com/photo-1590160418047-d1e72f7e0fdf?w=700&q=80&fit=crop",
  "red-sea,diving":           "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=700&q=80&fit=crop",
  "tbilisi,skyline":          "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=700&q=80&fit=crop",
  "kazbegi,mountain":         "https://images.unsplash.com/photo-1609941637575-8f97fcc25f88?w=700&q=80&fit=crop",
  "georgian-wine":            "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=700&q=80&fit=crop",
  "tbilisi,old-quarter":      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=700&q=80&fit=crop",
  "khinkali,food":            "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=700&q=80&fit=crop",
  "georgia,monastery":        "https://images.unsplash.com/photo-1609941637575-8f97fcc25f88?w=700&q=80&fit=crop",
  "narikala,fortress":        "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=700&q=80&fit=crop",
  "kakheti,vineyards":        "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=700&q=80&fit=crop",
  "dubai,skyline":            "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80&fit=crop",
  "burj-khalifa,night":       "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80&fit=crop",
  "palm-jumeirah":            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=700&q=80&fit=crop",
  "dubai-marina,night":       "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=700&q=80&fit=crop",
  "dubai,desert":             "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=700&q=80&fit=crop",
  "dubai-mall":               "https://images.unsplash.com/photo-1561622539-f64f2fccf6db?w=700&q=80&fit=crop",
  "old-dubai,abra":           "https://images.unsplash.com/photo-1623492701902-47dc207df5e4?w=700&q=80&fit=crop",
  "atlantis-palm":            "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=700&q=80&fit=crop",
  "sidi-bou-said,blue":       "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=700&q=80&fit=crop",
  "carthage,roman":           "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=700&q=80&fit=crop",
  "tunis,medina":             "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=700&q=80&fit=crop",
  "el-jem,colosseum":         "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=700&q=80&fit=crop",
  "tunisia,sahara":           "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80&fit=crop",
  "tunisia,coast":            "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=700&q=80&fit=crop",
  "matmata,berber":           "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=700&q=80&fit=crop",
  "kairouan,mosque":          "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=700&q=80&fit=crop",
  "marrakech,medina":         "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=700&q=80&fit=crop",
  "chefchaouen,blue":         "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=700&q=80&fit=crop",
  "sahara,morocco":           "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=700&q=80&fit=crop",
  "fes,tannery":              "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=700&q=80&fit=crop",
  "atlas,mountains":          "https://images.unsplash.com/photo-1548884463-d4efe21bf5c3?w=700&q=80&fit=crop",
  "morocco,riad":             "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=700&q=80&fit=crop",
  "moroccan,tea":             "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=700&q=80&fit=crop",
  "ist1":     "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=85&fit=crop",
  "ist2":     "https://images.unsplash.com/photo-1610419500789-d97ee9a33d2a?w=900&q=85&fit=crop",
  "tb1":      "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1600&q=85&fit=crop",
  "tb2":      "https://images.unsplash.com/photo-1609941637575-8f97fcc25f88?w=900&q=85&fit=crop",
  "db1":      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=85&fit=crop",
  "db2":      "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=900&q=85&fit=crop",
  "mk1":      "https://images.unsplash.com/photo-1553697388-94e804e2f0f6?w=1600&q=85&fit=crop",
  "mk2":      "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=900&q=85&fit=crop",
  "tn1":      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1600&q=85&fit=crop",
  "tn2":      "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=900&q=85&fit=crop",
  "phk1":     "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=1600&q=85&fit=crop",
  "phk2":     "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&q=85&fit=crop",
  "um1":      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1600&q=85&fit=crop",
  "um2":      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=900&q=85&fit=crop",
  "essaouira,coast":          "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=700&q=80&fit=crop",
};

const FALLBACK = "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80&fit=crop";

const img = (kw, seed = "", w = 1600) => {
  if (seed && PHOTOS[seed]) return PHOTOS[seed];
  // Try keyword match
  for (const [k, v] of Object.entries(PHOTOS)) {
    if (k === kw || kw.includes(k) || k.includes(kw.split(",")[0])) return v;
  }
  return FALLBACK;
};
const imgSquare = (kw, seed = "", s = 800) => img(kw, seed, s);

/* ============ DESTINATIONS DATA ============ */
const DESTINATIONS = {
  turkiye: {
    id: "turkiye",
    name: "Türkiye",
    nameAr: "تركيا",
    tagline: "One country, two continents, infinite excuses to stay another day.",
    heroImage: img("istanbul,hagia-sophia,sunset", "tk-hero"),
    cardImage: img("cappadocia,balloon", "tk-card"),
    blurb: "From the bazaars of Istanbul to the moonscape of Cappadocia, Türkiye refuses to pick a side — Asia or Europe, ancient or modern, sacred or secular. It's all of them, and none of them, depending on the hour.",
    description: "Türkiye is the country that rewards travelers who stay an extra day. Istanbul alone needs a week — Aya Sofia, the Blue Mosque, the Bosphorus at dusk, baklava that ruins all other baklava. Then there's Cappadocia, where you wake up at 4 AM to ride a balloon over rock formations that look invented. Antalya for the Mediterranean. Pamukkale for the white cliffs. Trabzon for the Black Sea green. The flight from Amman is short, the visa is easy, and once you're there, you'll understand why every traveler we send keeps asking when they can go back.",
    bestTime: "April–June, September–October",
    visa: "On arrival or e-visa for Jordanians",
    flightTime: "~3 hours from Amman",
    currency: "Turkish Lira (TRY)",
    attractions: [
      { name: "Hagia Sophia", city: "Istanbul", image: img("hagia-sophia,istanbul", "tk-a1"), description: "Built in 537 AD, switched between cathedral and mosque seven times — and it shows. The dome alone is worth the trip." },
      { name: "Cappadocia Hot Air Balloons", city: "Nevşehir", image: img("cappadocia,balloon,sunrise", "tk-a2"), description: "The reason every honeymoon photo from Türkiye looks the same. Up at 4 AM, in the air by 5, back for breakfast by 8." },
      { name: "Blue Mosque", city: "Istanbul", image: img("blue-mosque,istanbul", "tk-a3"), description: "Six minarets, 20,000 hand-painted İznik tiles, and a quiet that finds you even in tourist season." },
      { name: "Pamukkale Travertines", city: "Denizli", image: img("pamukkale,turkey,thermal", "tk-a4"), description: "White calcium terraces filled with thermal water, formed over 2,000 years. Looks like a glacier. Feels like a spa." },
      { name: "Grand Bazaar", city: "Istanbul", image: img("grand-bazaar,turkey", "tk-a5"), description: "Over 4,000 shops in 61 covered streets — older than the United States by about 300 years." },
      { name: "Antalya Old Town (Kaleiçi)", city: "Antalya", image: img("antalya,old-town", "tk-a6"), description: "Roman walls, Ottoman houses, a marina that turns into a poem at sunset. The Mediterranean coast Türkiye-style." }
    ],
    experiences: [
      { ico: "♨", title: "Turkish Bath", description: "A real hammam — not the hotel version. Steam, scrub, soap, silence. Ninety minutes that re-set the calendar." },
      { ico: "⛵", title: "Bosphorus Cruise", description: "Watch Asia and Europe trade glances across the water. Best at sunset, with Turkish tea in hand." },
      { ico: "✈", title: "Balloon Flight", description: "Cappadocia at sunrise, 1,000 meters up. Worth every dinar. Worth every alarm clock." },
      { ico: "☕", title: "Turkish Coffee Reading", description: "Drink the coffee, flip the cup, let a stranger tell you what's coming. Legitimate fortune-telling, frankly fun." },
      { ico: "♨", title: "Whirling Dervishes", description: "A Sufi ceremony that's older than most countries. Music, motion, devotion. Catch a real one in Konya, not a tourist version." },
      { ico: "⌒", title: "Spice Market Walk", description: "The Egyptian Bazaar in Istanbul — saffron, dried roses, lokum, lokum, more lokum. Smell first, taste second, buy third." }
    ],
    gallery: ["istanbul,bosphorus", "cappadocia,landscape", "antalya,coast", "pamukkale,white", "ephesus,ruins", "grand-bazaar,turkey", "turkish-tea", "hagia-sophia,interior"]
  },
  egypt: {
    id: "egypt",
    name: "Egypt",
    nameAr: "مصر",
    tagline: "Where the desert collides with the sea, and history collides with the present.",
    heroImage: img("egypt,pyramids,giza", "eg-hero"),
    cardImage: img("egypt,nile,sunset", "eg-card"),
    blurb: "Egypt is the country every other ancient civilization was reading about. Pyramids, pharaohs, the Nile, the Red Sea — there's a reason it's been on the travel bucket list for 5,000 years.",
    description: "Cairo for the chaos and the museums. Giza for the pyramids and the silence in the desert. Luxor for the temples that make you feel small. Then Sharm El Sheikh, Hurghada, and the Red Sea coast — coral reefs that look like someone painted them, sunshine 360 days a year, resorts that range from quiet retreats to all-inclusive party towns. We package the boat to Sharm, the Royal Jordanian flight to Cairo, and everything in between.",
    bestTime: "October–April (cooler, less crowded)",
    visa: "On arrival for Jordanians ($25)",
    flightTime: "~2 hours from Amman",
    currency: "Egyptian Pound (EGP)",
    attractions: [
      { name: "Pyramids of Giza", city: "Cairo", image: img("giza,pyramid,sphinx", "eg-a1"), description: "The only one of the Seven Wonders of the Ancient World still standing. Built 4,500 years ago. Still impressive." },
      { name: "Egyptian Museum", city: "Cairo", image: img("egyptian-museum,artifacts", "eg-a2"), description: "Tutankhamun's tomb treasures, mummies, hieroglyphs — the archive of a civilization that invented archives." },
      { name: "Karnak Temple", city: "Luxor", image: img("karnak,temple,luxor", "eg-a3"), description: "The largest religious building ever made. Ten Notre-Dames could fit inside. The Hypostyle Hall has 134 columns." },
      { name: "Valley of the Kings", city: "Luxor", image: img("valley-kings,tombs", "eg-a4"), description: "The burial ground for 62 pharaohs including Tutankhamun. Tombs carved into limestone cliffs, painted in colors still vivid 3,000 years later." },
      { name: "Sharm El Sheikh Reefs", city: "South Sinai", image: img("sharm,coral-reef,diving", "eg-a5"), description: "Some of the best diving on Earth. Ras Mohammed National Park, Tiran Island, blue holes — a snorkel mask is enough to be amazed." },
      { name: "Abu Simbel", city: "Aswan", image: img("abu-simbel,egypt,temple", "eg-a6"), description: "Ramses II carved four 20-meter statues of himself into a cliff. Twice a year the rising sun lights up the inner sanctuary. He was, frankly, dramatic." }
    ],
    experiences: [
      { ico: "⛵", title: "Felucca on the Nile", description: "A traditional sailboat at sunset, no engine, no rush. Drink hibiscus tea while the riverbank turns gold." },
      { ico: "♨", title: "Camel Ride at Giza", description: "Yes, it's touristy. Yes, you should still do it. Five minutes around the pyramids on a camel beats not doing it." },
      { ico: "⌒", title: "Khan el-Khalili Bazaar", description: "Cairo's medieval shopping district — copper, silver, perfume oils, the best mint tea in Egypt." },
      { ico: "✈", title: "Hot Air Balloon Over Luxor", description: "Float over the Valley of the Kings at sunrise. The temples look even better from above." },
      { ico: "☻", title: "Snorkeling Ras Mohammed", description: "South Sinai's most famous reef — 1,000+ fish species, sharks (the friendly ones), and visibility that goes forever." },
      { ico: "✦", title: "Sound & Light at Karnak", description: "Karnak Temple, lit up after dark, narrating its own history. Cheesy in the best way." }
    ],
    gallery: ["pyramids,giza", "nile,felucca", "luxor,karnak", "sharm,beach", "egypt,sphinx", "egyptian-museum", "abu-simbel", "red-sea,diving"]
  },
  georgia: {
    id: "georgia",
    name: "Georgia",
    nameAr: "جورجيا",
    tagline: "The Caucasus secret the rest of the world is starting to figure out.",
    heroImage: img("tbilisi,georgia,old-town", "ge-hero"),
    cardImage: img("kazbegi,georgia,mountains", "ge-card"),
    blurb: "Georgia is what Eastern Europe and Western Asia produced when they had a child together. Mountain monasteries, sulfur baths, wine that's older than wine, and a hospitality culture that takes feeding you personally.",
    description: "Tbilisi is the heart — cobbled old town, Persian-style bath houses, a cable car over the river to a giant statue called Mother of Georgia. Then you head out: Kazbegi for the Trinity Church on a mountainside, Mtskheta for the religious capital, Kakheti for the wine regions (Georgia invented wine, 8,000 years ago, in clay vessels). Visa-free for Jordanians, three-hour flight, and prices that still feel like a rumor. We've sent travelers to Georgia who came back trying to figure out how to move there.",
    bestTime: "May–June, September–October",
    visa: "Visa-free for Jordanians (1 year)",
    flightTime: "~3 hours from Amman",
    currency: "Georgian Lari (GEL)",
    attractions: [
      { name: "Tbilisi Old Town", city: "Tbilisi", image: img("tbilisi,old-town,balconies", "ge-a1"), description: "Carved wooden balconies, sulfur baths, churches and synagogues a block apart. The whole city is a UNESCO conversation." },
      { name: "Gergeti Trinity Church", city: "Kazbegi", image: img("kazbegi,trinity-church", "ge-a2"), description: "A 14th-century church on a mountainside at 2,170m, with Mount Kazbek behind it. Two hours by car from Tbilisi, lifetime in your camera roll." },
      { name: "Narikala Fortress", city: "Tbilisi", image: img("narikala,fortress,tbilisi", "ge-a3"), description: "4th-century fortress overlooking Tbilisi. Take the cable car up. Walk down. Watch the city light up at dusk." },
      { name: "Sulfur Baths (Abanotubani)", city: "Tbilisi", image: img("sulfur-bath,tbilisi", "ge-a4"), description: "Domed baths fed by hot sulfur springs since the 5th century. Pushkin called them 'unique among Russian baths.' Pushkin knew." },
      { name: "Kakheti Wine Region", city: "Telavi", image: img("kakheti,wine,vineyard", "ge-a5"), description: "Where wine was invented. Visit family wineries, drink amber wine fermented in clay qvevri buried underground, eat khinkali with strangers." },
      { name: "Uplistsikhe Cave Town", city: "Gori", image: img("uplistsikhe,cave-city", "ge-a6"), description: "A city carved into a cliff face, 3,000 years old. Houses, churches, theatres — all hewn from rock." }
    ],
    experiences: [
      { ico: "♨", title: "Sulfur Bath Soak", description: "A 90-minute soak in a private domed bath, optional brutal scrub from a Georgian masseur called a 'mekise.' Worth it." },
      { ico: "⌖", title: "Wine Tasting in Qvevri", description: "Drink wine made the way it has been for 8,000 years — buried in clay vessels, no oak, no shortcuts." },
      { ico: "✦", title: "Supra Feast", description: "A Georgian feast led by a 'tamada' (toastmaster) — 20 toasts, infinite food, 100% chance you make new friends." },
      { ico: "⛟", title: "Drive the Military Highway", description: "From Tbilisi to Kazbegi, climbing through 2,300m mountain passes. The road is a destination. Bring snacks." },
      { ico: "♪", title: "Polyphonic Singing", description: "Catch a Georgian polyphonic choir — three independent vocal lines, recognized by UNESCO. It does something to your chest." },
      { ico: "★", title: "Cable Car & Funicular", description: "Three different aerial systems crisscross Tbilisi. Cheap, fast, the best skyline view in the Caucasus." }
    ],
    gallery: ["tbilisi,skyline", "kazbegi,mountain", "georgian-wine", "tbilisi,old-quarter", "khinkali,food", "georgia,monastery", "narikala,fortress", "kakheti,vineyards"]
  },
  dubai: {
    id: "dubai",
    name: "Dubai",
    nameAr: "دبي",
    tagline: "The future, served with a side of desert.",
    heroImage: img("dubai,burj-khalifa,skyline", "db-hero"),
    cardImage: img("dubai,marina,sunset", "db-card"),
    blurb: "Dubai is what happens when a city decides it's also going to be a theme park. Then a fashion capital. Then a financial hub. Then a beach. It's all four. It works.",
    description: "An hour and a half from Amman, no jet lag, world-class everything. The Burj Khalifa is the tallest building on Earth and you can stand on top of it. The Mall of the Emirates has an indoor ski slope. The Palm Jumeirah is shaped like a palm tree because someone said 'why not?' Old Dubai still exists too — the dhow harbor, the gold souk, the abra crossings of Dubai Creek for one dirham. We arrange the flights, the hotels (everything from desert resorts to skyline 5-stars), and the experiences.",
    bestTime: "November–March (cooler)",
    visa: "Visa on arrival for Jordanians",
    flightTime: "~3 hours from Amman",
    currency: "UAE Dirham (AED)",
    attractions: [
      { name: "Burj Khalifa", city: "Downtown Dubai", image: img("burj-khalifa,dubai", "db-a1"), description: "828 meters tall. The view from the 124th floor at sunset is exactly what they say it is. Book in advance." },
      { name: "Dubai Mall & Aquarium", city: "Downtown Dubai", image: img("dubai-mall,aquarium", "db-a2"), description: "1,200 stores, the world's largest indoor aquarium, an ice rink, and the Dubai Fountain. A small city pretending to be a mall." },
      { name: "Palm Jumeirah", city: "Dubai", image: img("palm-jumeirah,aerial", "db-a3"), description: "An artificial island shaped like a palm tree, visible from space. Atlantis is on the crown. The trunk is one big resort row." },
      { name: "Dubai Marina", city: "Dubai", image: img("dubai-marina,boats", "db-a4"), description: "A 3-kilometer canal lined with skyscrapers. Walk the promenade, eat seafood, watch yachts that cost more than apartments." },
      { name: "Old Dubai (Al Fahidi)", city: "Bur Dubai", image: img("al-fahidi,old-dubai", "db-a5"), description: "Wind-tower architecture, narrow alleys, the Dubai Museum in a 1787 fort. The city before the city." },
      { name: "Desert Safari Dunes", city: "Dubai Desert", image: img("dubai,desert,dunes", "db-a6"), description: "Forty minutes out of the city and you're in the Empty Quarter's edge. Dune-bashing, falcons, Bedouin camps under the stars." }
    ],
    experiences: [
      { ico: "✈", title: "Helicopter Tour", description: "Twelve minutes over Burj Khalifa, Palm Jumeirah, and the Marina. The most expensive way to see Dubai. Also the best." },
      { ico: "⛵", title: "Dhow Cruise on the Creek", description: "A traditional wooden boat through Old Dubai, dinner on board, the city skyline at night. Less flashy, more soulful." },
      { ico: "♨", title: "Desert Safari with Bedouin Dinner", description: "Dune-bashing 4×4, sandboarding, henna, falcon photos, a feast under tents. Touristy, yes. Magical, also yes." },
      { ico: "★", title: "Top of Burj Khalifa at Sunset", description: "The 124th-floor observation deck. Time it for sunset, watch Dubai turn from gold to neon in 20 minutes." },
      { ico: "☻", title: "Ski Dubai", description: "An indoor ski slope inside the Mall of the Emirates. It's 40°C outside. It's snowing inside. Both are real." },
      { ico: "⌒", title: "Gold & Spice Souks", description: "Cross Dubai Creek by abra (1 dirham), wander the gold souk, lose yourself in the spice souk. The Dubai before the skyline." }
    ],
    gallery: ["dubai,skyline", "burj-khalifa,night", "palm-jumeirah", "dubai-marina,night", "dubai,desert", "dubai-mall", "old-dubai,abra", "atlantis-palm"]
  },
  tunisia: {
    id: "tunisia",
    name: "Tunisia",
    nameAr: "تونس",
    tagline: "North Africa's quiet beauty — Roman ruins, Mediterranean blue, Saharan gold.",
    heroImage: img("sidi-bou-said,tunisia,blue-white", "tn-hero"),
    cardImage: img("tunisia,carthage", "tn-card"),
    blurb: "Tunisia is the Mediterranean before it got crowded. Cobalt-and-white villages, Roman amphitheaters older than most ruins in Italy, a Sahara you can sleep under, and food that's been quietly excellent for 3,000 years.",
    description: "Tunis the capital, with its medina a UNESCO site since 1979. Sidi Bou Said, the village where every door is blue and every wall is white — Paul Klee painted here, and you'll understand why. Carthage, where the Punic Wars happened, ruins meeting suburbs. Then south to El Djem's amphitheater (the third-largest the Romans ever built), Matmata's underground homes (Tatooine in Star Wars), and the Sahara at Douz. Quieter than Morocco, smaller than Egypt, and dramatically cheaper than both.",
    bestTime: "March–May, September–November",
    visa: "Visa-free for Jordanians (90 days)",
    flightTime: "~5 hours from Amman (via connection)",
    currency: "Tunisian Dinar (TND)",
    attractions: [
      { name: "Sidi Bou Said", city: "near Tunis", image: img("sidi-bou-said,blue-doors", "tn-a1"), description: "A Mediterranean cliffside village painted entirely blue and white by ministerial decree. The most photogenic mile in Tunisia." },
      { name: "Carthage Ruins", city: "Tunis", image: img("carthage,ruins,tunisia", "tn-a2"), description: "Founded 814 BC, destroyed by Rome, rebuilt by Rome, destroyed again. The Antonine Baths and Punic ports remain — a city beneath a city." },
      { name: "El Djem Amphitheater", city: "Mahdia Governorate", image: img("el-jem,amphitheater", "tn-a3"), description: "The largest Roman amphitheater in Africa, third-largest anywhere. 35,000 capacity. Walk inside without the Colosseum's queues." },
      { name: "Tunis Medina", city: "Tunis", image: img("tunis,medina,souk", "tn-a4"), description: "UNESCO site, 700 monuments inside. The Zitouna Mosque is the oldest in North Africa. The souks haven't changed since the 13th century." },
      { name: "Matmata Underground Homes", city: "Matmata", image: img("matmata,berber,tunisia", "tn-a5"), description: "Berber troglodyte homes carved into the desert ground — yes, Luke Skywalker's house in Star Wars was filmed here." },
      { name: "Sahara at Douz", city: "Douz", image: img("sahara,tunisia,dunes", "tn-a6"), description: "The 'Gateway to the Sahara' — camel treks, dune-camping, sunsets that ruin every sunset that follows." }
    ],
    experiences: [
      { ico: "♨", title: "Hammam in the Medina", description: "A traditional Tunisian hammam in Tunis — older, smaller, and quieter than the Turkish version. Locals only, mostly." },
      { ico: "✦", title: "Couscous Sunday", description: "Tunisian couscous is the original — coarser, spicier, served with lamb or fish. Every family has its own version." },
      { ico: "♨", title: "Sahara Camel Trek", description: "From Douz, camel into the dunes for one or two nights. Sleep in Bedouin tents. Wake up to silence." },
      { ico: "⛵", title: "Coastal Drive Hammamet to Mahdia", description: "Four hours along the Mediterranean — fishing villages, Roman ports, beach towns mostly empty in shoulder season." },
      { ico: "⌒", title: "Souk Shopping in Tunis", description: "Olive oil, dates, ceramics, leather. Tunisia's craft tradition is older and quieter than Morocco's. Bargain less, talk more." },
      { ico: "★", title: "Star Wars Filming Sites", description: "Yes, the original Tatooine. Mos Espa set is still standing in the Sahara near Tozeur. A pilgrimage for the curious." }
    ],
    gallery: ["sidi-bou-said,blue", "carthage,roman", "tunis,medina", "el-jem,colosseum", "tunisia,sahara", "tunisia,coast", "matmata,berber", "kairouan,mosque"]
  },
  morocco: {
    id: "morocco",
    name: "Morocco",
    nameAr: "المغرب",
    tagline: "Mountains, medinas, deserts, and the loudest blue you've ever seen.",
    heroImage: img("morocco,marrakech,medina", "mr-hero"),
    cardImage: img("chefchaouen,morocco,blue", "mr-card"),
    blurb: "Morocco is sensory overload as a national policy. Spice markets that hit you a block away, medinas where you'll get lost on purpose, mountain villages cut from the same stone they sit on, and a desert that swallows the sky.",
    description: "Marrakech for the souks and the Jemaa el-Fnaa square (snake charmers, storytellers, food stalls — UNESCO listed it as 'Intangible Cultural Heritage'). Fes for the medieval medina, the world's oldest university, and tanneries unchanged in 1,000 years. Chefchaouen, the blue city in the Rif Mountains, where every wall is some shade of indigo. Casablanca for the airport and the Hassan II Mosque. The Atlas Mountains for Berber villages and ski resorts you didn't know existed. The Sahara at Merzouga for the iconic dune camp under the stars.",
    bestTime: "March–May, September–November",
    visa: "Visa-free for Jordanians (90 days)",
    flightTime: "~6 hours from Amman (via connection)",
    currency: "Moroccan Dirham (MAD)",
    attractions: [
      { name: "Jemaa el-Fnaa Square", city: "Marrakech", image: img("marrakech,jemaa-el-fnaa", "mr-a1"), description: "The most famous square in Africa. By day, snake charmers and orange juice carts. By night, food stalls, musicians, storytellers — a 1,000-year-old performance." },
      { name: "Chefchaouen Blue City", city: "Chefchaouen", image: img("chefchaouen,blue-city", "mr-a2"), description: "A mountain town painted entirely in blue — every alley, every door, every staircase. The reason Instagram exists." },
      { name: "Fes el-Bali Medina", city: "Fes", image: img("fes,medina,tannery", "mr-a3"), description: "The largest car-free urban area in the world. 9,000 alleys. The Chouara Tanneries have been dyeing leather since the 11th century." },
      { name: "Hassan II Mosque", city: "Casablanca", image: img("hassan-ii-mosque,casablanca", "mr-a4"), description: "The largest mosque in Africa, with the world's tallest minaret (210m). Built partly over the Atlantic — the floor is glass over the ocean in places." },
      { name: "Sahara Dunes (Erg Chebbi)", city: "Merzouga", image: img("sahara,merzouga,dunes", "mr-a5"), description: "150-meter dunes the color of pumpkin spice. Camel into camp, sleep in Berber tents, watch the Milky Way without a city in sight." },
      { name: "Atlas Mountains", city: "near Marrakech", image: img("atlas-mountains,morocco,village", "mr-a6"), description: "Berber villages clinging to switchbacks. Toubkal is North Africa's highest peak (4,167m). You can ski here in winter — surprising, but true." }
    ],
    experiences: [
      { ico: "♨", title: "Hammam & Argan Massage", description: "A Moroccan hammam is the original full-body reset — black soap scrub, ghassoul clay, argan oil massage. Two hours that change your week." },
      { ico: "♨", title: "Cooking Class in Marrakech", description: "Tagine, couscous, pastilla, mint tea — taught in a riad kitchen by a Moroccan grandma who has opinions. You'll cook better forever." },
      { ico: "♨", title: "Sahara Camel Trek", description: "Camel into the dunes at sunset, sleep in luxury Berber camps, wake before dawn for the desert sunrise. Bucket list, deserved." },
      { ico: "⌒", title: "Souk Shopping in Fes", description: "Brass lanterns, leather babouches, hand-loomed rugs, saffron sold by the gram. Bargaining isn't optional, it's the activity." },
      { ico: "♪", title: "Gnawa Music Night", description: "A Sufi-rooted Moroccan music tradition — krakebs (metal castanets) and hypnotic basslines. Find a real night, not a hotel show." },
      { ico: "✦", title: "Jardin Majorelle", description: "Yves Saint Laurent's garden in Marrakech — cobalt blue, cactus, calm. A 30-minute escape from the medina chaos." }
    ],
    gallery: ["marrakech,medina", "chefchaouen,blue", "sahara,morocco", "fes,tannery", "atlas,mountains", "morocco,riad", "moroccan,tea", "essaouira,coast"]
  }
};

const SEED_DATA = {
  packages: [
    {
      id: "sharm-boat", category: "outbound", title: "Sharm El Sheikh", titleAr: "شرم الشيخ",
      subtitle: "By boat across the Red Sea — the slow way is the right way.",
      heroImage: img("sharm-el-sheikh,red-sea,resort", "sharm1"), cardImage: img("sharm-el-sheikh,beach", "sharm2"),
      country: "Egypt", duration: "3–4 nights", transport: "Boat & coach", priceFrom: 170, currency: "JOD",
      destination: "egypt",
      description: "Sharm El Sheikh sits at the southern tip of the Sinai Peninsula, where the desert collides with the Red Sea. Crystal water, coral reefs, and resorts that range from quiet to all-out. We bundle the boat tickets, the Amman–Aqaba transfer, the Taba crossing, and the hotel stay so you don't have to think about logistics — just about which sunset you want to remember.",
      includes: ["Boat tickets (round trip)", "Amman ↔ Aqaba ground transport", "Taba ↔ Sharm transfers", "Hotel stay with stated meal plan"],
      excludes: ["Personal expenses", "Taxes & resort fees", "Anything not listed in the program"],
      notes: "Child 4–6 (no bed): 75 JOD. Child 6–11 (coach + boat seat): 115 JOD. Infant: 25 JOD. Prices subject to change based on availability.",
      hotels: [
        { name: "Tivoli Hotel", stars: 4, image: img("egypt,resort,pool", "h1"), description: "4-star property in Sharm El Sheikh's Um El Sid plateau, relatively close to main beaches and central area.", pricing: [{ nights: 3, dbl: 170, sgl: 200, child: 140 }, { nights: 4, dbl: 185, sgl: 225, child: 150 }] },
        { name: "Dive Inn Resort", stars: 4, image: img("egypt,beach,resort", "h2"), description: "Comfortable resort with strong location near tourist services and easy beach access.", pricing: [{ nights: 3, dbl: 200, sgl: 255, child: 160 }, { nights: 4, dbl: 230, sgl: 300, child: 175 }] },
        { name: "Sharm Bride Resort Aqua & Spa", stars: 4, image: img("aqua-park,resort", "h3"), description: "Family-friendly resort in Nabq Bay packed with activities and entertainment.", pricing: [{ nights: 3, dbl: 210, sgl: 270, child: 165 }, { nights: 4, dbl: 240, sgl: 320, child: 180 }] },
        { name: "Amarina Sun Resort & Aqua Park", stars: 5, image: img("luxury-resort,pool", "h5"), description: "Standout 5-star resort in Nabq Bay — works for families, couples, and serious sun-seekers.", pricing: [{ nights: 3, dbl: 245, sgl: 325, child: 180 }, { nights: 4, dbl: 285, sgl: 395, child: 200 }] },
        { name: "AA Amwaj Resort & Casino", stars: 5, image: img("casino,luxury,resort", "h7"), description: "Plush 5-star in Nabq Bay — full-service luxury, casino on site.", pricing: [{ nights: 3, dbl: 260, sgl: 340, child: 190 }, { nights: 4, dbl: 305, sgl: 415, child: 215 }] },
        { name: "Renaissance Golden View", stars: 5, image: img("luxury-resort,sea-view", "h8"), description: "5-star Marriott property on Um El Sid — gold-tier service, gold-tier views.", pricing: [{ nights: 3, dbl: 325, sgl: 415, child: 220 }, { nights: 4, dbl: 395, sgl: 510, child: 255 }] },
        { name: "Cleopatra Luxury Resort", stars: 5, image: img("luxury,spa,resort", "h9"), description: "Standout luxury resort in Nabq Bay — one of Sharm's most polished options.", pricing: [{ nights: 3, dbl: 405, sgl: 590, child: 260 }, { nights: 4, dbl: 500, sgl: 745, child: 310 }] },
        { name: "Stella di Mare Beach Hotel & Spa", stars: 5, image: img("beachfront,luxury", "h10"), description: "Direct on Naama Bay's beach — 5-star polish with a spa attached.", pricing: [{ nights: 3, dbl: 425, sgl: 655, child: 270 }, { nights: 4, dbl: 525, sgl: 835, child: 325 }] }
      ]
    },
    {
      id: "istanbul-rj", category: "outbound", title: "Istanbul", titleAr: "اسطنبول",
      subtitle: "One city, two continents, infinite excuses to stay another day.",
      heroImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=85&fit=crop",
      cardImage: "https://images.unsplash.com/photo-1610419500789-d97ee9a33d2a?w=900&q=85&fit=crop",
      country: "Türkiye", duration: "3–7 nights", transport: "Royal Jordanian", priceFrom: 400, currency: "JOD",
      destination: "turkiye",
      description: "اسطنبول هي أكبر مدن تركيا وأحد أهم المدن في العالم من الناحية التاريخية والثقافية. تقع على ضفتي البوسفور، الرابط بين قارتين: أوروبا وآسيا، ما يجعلها مدينة فريدة تجمع بين الشرق والغرب. المدينة غنية بالمعالم التاريخية العريقة مثل آيا صوفيا، الجامع الأزرق (مسجد السلطان أحمد)، قصر توبكابي، وقصر دولمة بهجة.",
      includes: ["تذاكر طيران على متن الخطوط الاردنية عمان ↔ اسطنبول ↔ عمان", "مواصلات من والى المطار", "اقامة في الفندق المختار"],
      excludes: ["الوجبات (إلا إذا نص عليها الفندق)", "الجولات السياحية", "المصاريف الشخصية"],
      notes: "أسعار الأطفال: طفل من عمر 2 إلى 6 سنين: 300 دينار. رضيع: 100 دينار. الأسعار قابلة للتغيير حسب التوفر.",
      hotels: [
        { name: "Grand Milan", stars: 3, image: "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=600&q=80&fit=crop", description: "فندق ثلاث نجوم يقع في منطقة فاتح (Fatih) التاريخية في إسطنبول، بالقرب من أهم المعالم السياحية.", pricing: [{ nights: 3, dbl: 400, sgl: 430, child: 380 }, { nights: 4, dbl: 415, sgl: 455, child: 390 }, { nights: 5, dbl: 425, sgl: 475, child: 395 }, { nights: 6, dbl: 440, sgl: 500, child: 405 }, { nights: 7, dbl: 455, sgl: 525, child: 410 }] },
        { name: "Grand Liza, Elite Palace", stars: 3, image: "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=600&q=80&fit=crop", description: "فندق اقتصادي يقع في قلب إسطنبول القديمة (منطقة الفاتح)، وقريب جداً من أهم المعالم مثل السوق المسقوف والمسجد الأزرق.", pricing: [{ nights: 3, dbl: 410, sgl: 455, child: 385 }, { nights: 4, dbl: 425, sgl: 485, child: 395 }, { nights: 5, dbl: 400, sgl: 520, child: 400 }, { nights: 6, dbl: 455, sgl: 500, child: 410 }, { nights: 7, dbl: 470, sgl: 580, child: 415 }] },
        { name: "NL Amsterdam", stars: 4, image: "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=600&q=80&fit=crop", description: "فندق 4 نجوم مميز يقع في قلب مدينة إسطنبول، بجانب القنوات المائية الشهيرة، ويعتبر من أفضل الخيارات للسياح.", pricing: [{ nights: 3, dbl: 430, sgl: 470, child: 395 }, { nights: 4, dbl: 455, sgl: 505, child: 405 }, { nights: 5, dbl: 465, sgl: 535, child: 410 }, { nights: 6, dbl: 480, sgl: 565, child: 420 }, { nights: 7, dbl: 500, sgl: 600, child: 425 }] },
        { name: "Unique Suite Hotel", stars: 3, image: "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=600&q=80&fit=crop", description: "فندق اقتصادي (حوالي 3 نجوم) يقع في منطقة تقسيم – بيوغلو، وهي من أشهر المناطق السياحية في إسطنبول.", pricing: [{ nights: 3, dbl: 435, sgl: 500, child: 400 }, { nights: 4, dbl: 455, sgl: 540, child: 420 }, { nights: 5, dbl: 480, sgl: 580, child: 430 }, { nights: 6, dbl: 500, sgl: 620, child: 440 }, { nights: 7, dbl: 520, sgl: 665, child: 450 }] },
        { name: "Mekke Hotel", stars: 3, image: "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=600&q=80&fit=crop", description: "فندق 3 نجوم اقتصادي يقع في منطقة الفاتح – أكسراي في إسطنبول، خيار مناسب للمسافرين الباحثين عن موقع مركزي.", pricing: [{ nights: 3, dbl: 420, sgl: 460, child: 395 }, { nights: 4, dbl: 435, sgl: 485, child: 405 }, { nights: 5, dbl: 455, sgl: 515, child: 410 }, { nights: 6, dbl: 470, sgl: 540, child: 420 }, { nights: 7, dbl: 485, sgl: 570, child: 425 }] },
        { name: "Akyildiz", stars: 3, image: "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=600&q=80&fit=crop", description: "فندق اقتصادي 3 نجوم يقع في منطقة الفاتح – أكسراي في إسطنبول، خيار مناسب للمسافرين الباحثين عن إقامة اقتصادية.", pricing: [{ nights: 3, dbl: 415, sgl: 460, child: 420 }, { nights: 4, dbl: 430, sgl: 485, child: 430 }, { nights: 5, dbl: 445, sgl: 515, child: 445 }, { nights: 6, dbl: 460, sgl: 540, child: 460 }, { nights: 7, dbl: 470, sgl: 570, child: 475 }] },
        { name: "Style Hotel Sisli", stars: 3, image: "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=600&q=80&fit=crop", description: "فندق 3 نجوم يقع في منطقة شيشلي في إسطنبول، وهي منطقة حديثة ومليئة بالمولات والمطاعم.", pricing: [{ nights: 3, dbl: 440, sgl: 405, child: 395 }, { nights: 4, dbl: 460, sgl: 545, child: 405 }, { nights: 5, dbl: 480, sgl: 590, child: 410 }, { nights: 6, dbl: 505, sgl: 630, child: 420 }, { nights: 7, dbl: 525, sgl: 675, child: 425 }] },
        { name: "New Emin Hotel", stars: 4, image: "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=600&q=80&fit=crop", description: "يقع في منطقة الفاتح – إسطنبول القديمة، بالقرب من أهم المعالم السياحية مثل آيا صوفيا والمسجد الأزرق.", pricing: [{ nights: 3, dbl: 440, sgl: 505, child: 415 }, { nights: 4, dbl: 460, sgl: 550, child: 430 }, { nights: 5, dbl: 485, sgl: 590, child: 440 }, { nights: 6, dbl: 505, sgl: 635, child: 455 }, { nights: 7, dbl: 525, sgl: 680, child: 470 }] },
        { name: "Fuar Hotel", stars: 3, image: "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=600&q=80&fit=crop", description: "يقع في منطقة فاتح – أكسراي بإسطنبول، وهو خيار مناسب للمسافرين الذين يريدون إقامة بسيطة بموقع ممتاز مقابل سعر جيد.", pricing: [{ nights: 3, dbl: 435, sgl: 490, child: 420 }, { nights: 4, dbl: 455, sgl: 530, child: 430 }, { nights: 5, dbl: 475, sgl: 570, child: 445 }, { nights: 6, dbl: 490, sgl: 610, child: 460 }, { nights: 7, dbl: 510, sgl: 650, child: 475 }] },
        { name: "Holiday Inn Istanbul City — Topkapi", stars: 5, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop", description: "يقع في منطقة Topkapı (فاتح) بإسطنبول، بالقرب من شبكة المواصلات العامة (ترام والمترو).", pricing: [{ nights: 3, dbl: 460, sgl: 535, child: 440 }, { nights: 4, dbl: 490, sgl: 590, child: 460 }, { nights: 5, dbl: 515, sgl: 640, child: 480 }, { nights: 6, dbl: 545, sgl: 695, child: 505 }, { nights: 7, dbl: 575, sgl: 750, child: 525 }] },
        { name: "Mare Park Hotel", stars: 4, image: "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=600&q=80&fit=crop", description: "يقع في منطقة شيشلي أسطنبول، ويعتبر خيار جيد لمن يبحث عن إقامة مريحة مقابل سعر مناسب.", pricing: [{ nights: 3, dbl: 445, sgl: 515, child: 420 }, { nights: 4, dbl: 465, sgl: 560, child: 430 }, { nights: 5, dbl: 490, sgl: 505, child: 445 }, { nights: 6, dbl: 515, sgl: 650, child: 460 }, { nights: 7, dbl: 535, sgl: 700, child: 475 }] },
        { name: "Kaya Madrid Istanbul", stars: 3, image: "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=600&q=80&fit=crop", description: "يقع في منطقة أكسراي – الفاتح في إسطنبول، وهو خيار مناسب للمسافرين الذين يريدون موقعاً مركزياً قريباً من المعالم التاريخية.", pricing: [{ nights: 3, dbl: 425, sgl: 475, child: 395 }, { nights: 4, dbl: 445, sgl: 510, child: 405 }, { nights: 5, dbl: 460, sgl: 545, child: 410 }, { nights: 6, dbl: 475, sgl: 580, child: 420 }, { nights: 7, dbl: 495, sgl: 615, child: 425 }] },
        { name: "Istanbul Dora Hotel", stars: 4, image: "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=600&q=80&fit=crop", description: "يقع في منطقة شيشلي/تكسيم الحيوية في اسطنبول، خيار مناسب لمن يبحث عن موقع مركزي قريب من المعالم الرئيسية.", pricing: [{ nights: 3, dbl: 445, sgl: 510, child: 425 }, { nights: 4, dbl: 465, sgl: 550, child: 435 }, { nights: 5, dbl: 485, sgl: 595, child: 450 }, { nights: 6, dbl: 510, sgl: 635, child: 465 }, { nights: 7, dbl: 530, sgl: 680, child: 480 }] },
        { name: "Tango Hotel Sisli", stars: 4, image: "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=600&q=80&fit=crop", description: "يقع الفندق في منطقة شيشلي / Dolapdere القريبة من Osmanbey Metro Station، مما يسهل التنقل في المدينة.", pricing: [{ nights: 3, dbl: 460, sgl: 540, child: 435 }, { nights: 4, dbl: 485, sgl: 595, child: 440 }, { nights: 5, dbl: 515, sgl: 645, child: 470 }, { nights: 6, dbl: 540, sgl: 700, child: 485 }, { nights: 7, dbl: 565, sgl: 755, child: 505 }] },
        { name: "The City Hotel", stars: 3, image: "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=600&q=80&fit=crop", description: "فندق في منطقة أكسراي – الفاتح في إسطنبول، يعد خياراً بسيطاً ومريحاً للمسافرين ذوي الميزانية المحدودة.", pricing: [{ nights: 3, dbl: 445, sgl: 510, child: 410 }, { nights: 4, dbl: 465, sgl: 550, child: 425 }, { nights: 5, dbl: 485, sgl: 595, child: 435 }, { nights: 6, dbl: 510, sgl: 635, child: 445 }, { nights: 7, dbl: 530, sgl: 680, child: 455 }] },
        { name: "Glourios Hotel", stars: 4, image: "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=600&q=80&fit=crop", description: "فندق من فئة 4 نجوم يقع في منطقة السلطان أحمد (Laleli/Yeşiltulumba) وسط المدينة التاريخية.", pricing: [{ nights: 3, dbl: 455, sgl: 530, child: 425 }, { nights: 4, dbl: 480, sgl: 580, child: 435 }, { nights: 5, dbl: 505, sgl: 630, child: 450 }, { nights: 6, dbl: 530, sgl: 680, child: 465 }, { nights: 7, dbl: 555, sgl: 730, child: 480 }] },
        { name: "Burj Istanbul", stars: 3, image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80&fit=crop", description: "فندق صغير في قلب إسطنبول، منطقة بيوغلو بالقرب من شارع الاستقلال وميدان تقسيم.", pricing: [{ nights: 3, dbl: 460, sgl: 540, child: 425 }, { nights: 4, dbl: 485, sgl: 595, child: 435 }, { nights: 5, dbl: 515, sgl: 645, child: 450 }, { nights: 6, dbl: 540, sgl: 700, child: 465 }, { nights: 7, dbl: 565, sgl: 755, child: 480 }] },
        { name: "Four Side Hotel", stars: 4, image: "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=600&q=80&fit=crop", description: "فندق في منطقة شيشلي الحيوية بإسطنبول، موقع ممتاز قريب من محطتي Osmanbey و Şişli للمترو.", pricing: [{ nights: 3, dbl: 445, sgl: 510, child: 425 }, { nights: 4, dbl: 465, sgl: 550, child: 435 }, { nights: 5, dbl: 485, sgl: 595, child: 450 }, { nights: 6, dbl: 510, sgl: 635, child: 465 }, { nights: 7, dbl: 530, sgl: 680, child: 480 }] },
        { name: "Stera Hotel", stars: 4, image: "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=600&q=80&fit=crop", description: "يقع الفندق في منطقة بيوغلو القريبة من ميدان تقسيم وشارع الاستقلال الحيوي في إسطنبول.", pricing: [{ nights: 3, dbl: 460, sgl: 535, child: 425 }, { nights: 4, dbl: 485, sgl: 585, child: 435 }, { nights: 5, dbl: 510, sgl: 640, child: 450 }, { nights: 6, dbl: 535, sgl: 690, child: 465 }, { nights: 7, dbl: 560, sgl: 745, child: 480 }] },
        { name: "Akgun Hotel", stars: 5, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop", description: "فندق Akgün Istanbul Hotel, WorldHotels Elite يقع في منطقة طوب قابي (Topkapı) في قلب إسطنبول.", pricing: [{ nights: 3, dbl: 455, sgl: 530, child: 425 }, { nights: 4, dbl: 480, sgl: 580, child: 435 }, { nights: 5, dbl: 505, sgl: 630, child: 450 }, { nights: 6, dbl: 530, sgl: 680, child: 465 }, { nights: 7, dbl: 555, sgl: 735, child: 480 }] },
        { name: "Cartoon Hotel", stars: 5, image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80&fit=crop", description: "فندق Cartoon Hotel يقع في منطقة بيوغلو بالقرب من ميدان تكسيم وشارع الاستقلال الحيوي في قلب إسطنبول.", pricing: [{ nights: 3, dbl: 455, sgl: 530, child: 435 }, { nights: 4, dbl: 480, sgl: 580, child: 450 }, { nights: 5, dbl: 505, sgl: 630, child: 470 }, { nights: 6, dbl: 530, sgl: 680, child: 485 }, { nights: 7, dbl: 555, sgl: 730, child: 505 }] },
        { name: "Crestium Prime Taksim Spa", stars: 4, image: "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=600&q=80&fit=crop", description: "يقع الفندق في منطقة تقسيم (Beyoğlu)، بالقرب من شارع الاستقلال الحيوي وميدان تقسيم.", pricing: [{ nights: 3, dbl: 460, sgl: 540, child: 425 }, { nights: 4, dbl: 485, sgl: 595, child: 435 }, { nights: 5, dbl: 515, sgl: 645, child: 450 }, { nights: 6, dbl: 540, sgl: 700, child: 465 }, { nights: 7, dbl: 565, sgl: 755, child: 480 }] },
        { name: "Sorrisso Due / Sorrisso Istanbul", stars: 4, image: "https://images.unsplash.com/photo-1545231097-cbd4d81d8be4?w=600&q=80&fit=crop", description: "يقع الفندق في حي فاتح – لاله لي في إسطنبول، على بُعد خطوات قليلة من محطة الترام والمترو.", pricing: [{ nights: 3, dbl: 455, sgl: 530, child: 425 }, { nights: 4, dbl: 480, sgl: 580, child: 435 }, { nights: 5, dbl: 505, sgl: 630, child: 450 }, { nights: 6, dbl: 530, sgl: 680, child: 465 }, { nights: 7, dbl: 555, sgl: 730, child: 480 }] },
        { name: "Elite World Istanbul Taksim", stars: 5, image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80&fit=crop", description: "فندق 5 نجوم فاخر في قلب إسطنبول (منطقة تقسيم) مع موقع ممتاز جداً قريب من ميدان تقسيم.", pricing: [{ nights: 3, dbl: 530, sgl: 640, child: 465 }, { nights: 4, dbl: 580, sgl: 725, child: 495 }, { nights: 5, dbl: 630, sgl: 815, child: 520 }, { nights: 6, dbl: 680, sgl: 900, child: 550 }, { nights: 7, dbl: 730, sgl: 985, child: 580 }] },
        { name: "Biancho Pera", stars: 4, image: "https://images.unsplash.com/photo-1618480064605-e0dc08e5a6e9?w=600&q=80&fit=crop", description: "The Biancho Pera Hotel في إسطنبول – منطقة بيرا/بيوغلو بموقع ممتاز قريب من برج غلطة وشارع الاستقلال.", pricing: [{ nights: 3, dbl: 460, sgl: 540, child: 435 }, { nights: 4, dbl: 485, sgl: 595, child: 450 }, { nights: 5, dbl: 515, sgl: 645, child: 470 }, { nights: 6, dbl: 540, sgl: 700, child: 485 }, { nights: 7, dbl: 565, sgl: 755, child: 505 }] },
        { name: "The Green Park Hotel Taksim", stars: 4, image: "https://images.unsplash.com/photo-1610027572817-7a2b3ee08a51?w=600&q=80&fit=crop", description: "The Green Park Hotel Taksim يقع في منطقة تقسيم الحيوية في إسطنبول، بالقرب من محطة المترو والمواصلات العامة.", pricing: [{ nights: 3, dbl: 465, sgl: 550, child: 435 }, { nights: 4, dbl: 495, sgl: 605, child: 450 }, { nights: 5, dbl: 520, sgl: 665, child: 470 }, { nights: 6, dbl: 550, sgl: 720, child: 485 }, { nights: 7, dbl: 580, sgl: 780, child: 505 }] },
        { name: "The Parma Hotel Taksim", stars: 4, image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=600&q=80&fit=crop", description: "فندق 4 نجوم بموقع ممتاز جداً في قلب إسطنبول، على بُعد خطوات قليلة جداً من ميدان تقسيم وشارع الاستقلال.", pricing: [{ nights: 3, dbl: 485, sgl: 590, child: 455 }, { nights: 4, dbl: 520, sgl: 660, child: 480 }, { nights: 5, dbl: 555, sgl: 730, child: 505 }, { nights: 6, dbl: 590, sgl: 800, child: 530 }, { nights: 7, dbl: 625, sgl: 870, child: 555 }] },
        { name: "Ottoman Life Deluxe", stars: 5, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop", description: "فندق 5 نجوم يجمع بين الرفاهية العصرية والطابع التاريخي المستوحى من التراث العثماني.", pricing: [{ nights: 3, dbl: 470, sgl: 570, child: 470 }, { nights: 4, dbl: 500, sgl: 635, child: 500 }, { nights: 5, dbl: 530, sgl: 695, child: 530 }, { nights: 6, dbl: 560, sgl: 760, child: 560 }, { nights: 7, dbl: 590, sgl: 820, child: 590 }] },
        { name: "Mercure Bomonti", stars: 5, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop", description: "فندق ميركيور إسطنبول بومونتي 5 نجوم يقع في حي بومونتي – شيشلي في إسطنبول، من فنادق سلسلة Mercure العالمية.", pricing: [{ nights: 3, dbl: 500, sgl: 615, child: 435 }, { nights: 4, dbl: 535, sgl: 690, child: 455 }, { nights: 5, dbl: 575, sgl: 465, child: 470 }, { nights: 6, dbl: 615, sgl: 840, child: 485 }, { nights: 7, dbl: 650, sgl: 915, child: 505 }] },
        { name: "Pont Hotel Taksim", stars: 5, image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80&fit=crop", description: "يحتوي الفندق على عدد كبير من الغرف (~233) تشمل غرفاً قياسية، غرف ديلوكس، وأجنحة تنفيذية مع خيارات مختلفة.", pricing: [{ nights: 3, dbl: 525, sgl: 660, child: 475 }, { nights: 4, dbl: 570, sgl: 755, child: 505 }, { nights: 5, dbl: 615, sgl: 845, child: 535 }, { nights: 6, dbl: 660, sgl: 940, child: 565 }, { nights: 7, dbl: 710, sgl: 1030, child: 595 }] }
      ]    },
    {
      id: "tbilisi-package", category: "outbound", title: "Tbilisi", titleAr: "تبليسي",
      subtitle: "Wine, mountains, and a city carved out of charm.",
      heroImage: img("tbilisi,georgia,old-town", "tb1"), cardImage: img("kazbegi,georgia", "tb2"),
      country: "Georgia", duration: "4–7 nights", transport: "Direct flight", priceFrom: 425, currency: "JOD",
      destination: "georgia",
      description: "Georgia is the trip that tells you more about yourself than you expected. Tbilisi's old town, the wine villages of Kakheti, the mountain monastery at Kazbegi, sulfur baths that have been operating since the fifth century. Visa-free, three-hour flight, and a hospitality culture that takes feeding strangers personally.",
      includes: ["Direct flights (Amman ↔ Tbilisi ↔ Amman)", "Airport transfers", "Hotel stay in selected property", "Welcome briefing on local customs"],
      excludes: ["Meals (unless specified)", "Optional tours (Kazbegi, Kakheti, Mtskheta)", "Personal expenses"],
      notes: "Day-trip add-ons available: Kakheti wine tour, Kazbegi mountain trip, Mtskheta historic sites. Contact us for current rates.",
      hotels: []
    },
    {
      id: "dubai-package", category: "outbound", title: "Dubai", titleAr: "دبي",
      subtitle: "The future, served with a side of desert.",
      heroImage: img("dubai,burj-khalifa,skyline", "db1"), cardImage: img("dubai,marina", "db2"),
      country: "UAE", duration: "3–5 nights", transport: "Royal Jordanian", priceFrom: 380, currency: "JOD",
      destination: "dubai",
      description: "Ninety-minute flight, no jet lag, world-class everything. Burj Khalifa, Palm Jumeirah, the Dubai Mall, the desert at night — and yes, the indoor ski slope. We package the flights and hotels, and add experiences à la carte.",
      includes: ["Royal Jordanian flights", "Airport transfers", "Hotel stay", "Burj Khalifa fast-track entry option"],
      excludes: ["Meals (unless stated)", "Tours and experiences", "Personal expenses"],
      notes: "Desert safari, dhow cruise, and Burj Khalifa add-ons available. Family-friendly packages.",
      hotels: []
    },
    {
      id: "marrakech-package", category: "outbound", title: "Marrakech", titleAr: "مراكش",
      subtitle: "A city where every alley smells different.",
      heroImage: img("morocco,marrakech,medina", "mk1"), cardImage: img("chefchaouen,blue", "mk2"),
      country: "Morocco", duration: "5–7 nights", transport: "Connection flight", priceFrom: 750, currency: "JOD",
      destination: "morocco",
      description: "Morocco rewards a slower trip. Marrakech for the souks and the Jemaa el-Fnaa, Fes for the medieval medina, Chefchaouen for the blue, the Sahara for the silence. We can package any combination — riads in the medina or modern hotels outside it.",
      includes: ["Flights (Amman ↔ Marrakech via connection)", "Airport transfers", "Hotel/riad stay", "Welcome welcome-package and city briefing"],
      excludes: ["Visa fees if applicable", "Meals (unless stated)", "Day tours"],
      notes: "Multi-city itineraries available (Marrakech + Fes + Sahara). Sahara dune camp add-on highly recommended.",
      hotels: []
    },
    {
      id: "tunis-package", category: "outbound", title: "Tunis & Sidi Bou Said", titleAr: "تونس",
      subtitle: "The Mediterranean before it got crowded.",
      heroImage: img("sidi-bou-said,tunisia", "tn1"), cardImage: img("tunisia,carthage", "tn2"),
      country: "Tunisia", duration: "4–6 nights", transport: "Connection flight", priceFrom: 600, currency: "JOD",
      destination: "tunisia",
      description: "Tunisia is the quietest of the North African options — Roman amphitheaters older than the Colosseum, a Sahara that's emptier than Morocco's, blue-and-white villages on Mediterranean cliffs. Visa-free for Jordanians.",
      includes: ["Flights via connection", "Airport transfers", "Hotel stay (Tunis or Sidi Bou Said)", "Welcome briefing"],
      excludes: ["Meals (unless stated)", "Day tours (Carthage, El Djem, Sahara)", "Personal expenses"],
      notes: "Sahara extension available — three-day desert add-on from Douz. Star Wars filming-site tour available for fans.",
      hotels: []
    },
    {
      id: "bali-honeymoon", category: "honeymoon", title: "Bali", titleAr: "بالي",
      subtitle: "The first chapter of the rest of your life.",
      heroImage: img("bali,rice-terrace,sunset", "bali1"), cardImage: img("bali,beach,villa", "bali2"),
      country: "Indonesia", duration: "7 nights", transport: "International flight", priceFrom: 999, currency: "JOD",
      description: "Bali is what every honeymoon is trying to be when nobody's looking. Rice terraces, temple sunrises, beaches that don't ask anything of you. We'll handle the flights and the resort — you handle the each other.",
      includes: ["International flights (Amman ↔ Bali)", "7 nights at selected resort", "Airport transfers", "Honeymoon amenity package"],
      excludes: ["Visa fees", "Meals (unless stated)", "Tours & activities"],
      notes: "Honeymoon package — please contact us for current pricing and resort options.",
      hotels: []
    },
    {
      id: "phuket-honeymoon", category: "honeymoon", title: "Phuket", titleAr: "بوكيت",
      subtitle: "Thailand's southwestern shoulder, dressed for two.",
      heroImage: img("phuket,thailand,beach", "phk1"), cardImage: img("thailand,resort,beach", "phk2"),
      country: "Thailand", duration: "7 nights", transport: "International flight", priceFrom: 889, currency: "JOD",
      description: "Phuket has more sides than people give it credit for — the postcard beach version, the quiet north-coast retreats, and the food markets that change your idea of what a good meal is.",
      includes: ["International flights", "7 nights at selected resort", "Airport transfers", "Couples' welcome amenity"],
      excludes: ["Visa fees", "Meals (unless stated)", "Excursions"],
      notes: "Honeymoon package — please contact us for current pricing.",
      hotels: []
    },
    {
      id: "umrah-economy", category: "hajj", title: "Umrah Package", titleAr: "العمرة",
      subtitle: "A journey of meaning, planned with the care it deserves.",
      heroImage: img("mecca,kaaba,pilgrims", "um1"), cardImage: img("medina,prophet-mosque", "um2"),
      country: "Saudi Arabia", duration: "10 days", transport: "Direct flight + bus", priceFrom: 750, currency: "JOD",
      description: "Our Umrah packages handle the visa, the flights, the hotels in Makkah and Madinah, and the ground transport — so the journey itself can stay focused on what it's actually about.",
      includes: ["Umrah visa", "Direct flights to Madinah/Jeddah", "Hotels in Makkah & Madinah", "Air-conditioned bus transfers", "Ihram for men"],
      excludes: ["Meals (unless stated)", "Personal Zamzam beyond included allowance", "Optional Ziyarat tours"],
      notes: "Multiple departure dates available year-round. Premium and VIP packages also offered.",
      hotels: []
    }
  ]
};

const CATEGORIES = {
  outbound: { en: "Outbound Travel", ar: "السفر الخارجي", desc: "Curated international trips with transport, transfers, and hotel handled." },
  honeymoon: { en: "Honeymoons", ar: "شهر العسل", desc: "The first chapter of the rest of your life." },
  hajj: { en: "Hajj & Umrah", ar: "الحج والعمرة", desc: "A journey of meaning, planned with care." },
  special: { en: "Special Escapes", ar: "عروض خاصة", desc: "Limited-time offers for people who don't do tourist." }
};

const ADMIN_PASSWORD = "million2026";
const STORAGE_KEY = "million-packages-v3";

async function loadPackages() {
  try { const r = await window.storage.get(STORAGE_KEY); if (r && r.value) return JSON.parse(r.value); } catch (e) {}
  return SEED_DATA.packages;
}
async function savePackages(packages) {
  try { await window.storage.set(STORAGE_KEY, JSON.stringify(packages)); return true; } catch (e) { return false; }
}
async function resetPackages() {
  try { await window.storage.delete(STORAGE_KEY); } catch (e) {}
  return SEED_DATA.packages;
}

function parseRoute() {
  const h = (window.location.hash || "#/").replace(/^#/, "");
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return { name: "home" };
  if (parts[0] === "about") return { name: "about" };
  if (parts[0] === "gallery") return { name: "gallery" };
  if (parts[0] === "contact") return { name: "contact" };
  if (parts[0] === "admin") return { name: "admin" };
  if (parts[0] === "destinations") {
    if (parts.length === 1) return { name: "destinations" };
    if (parts.length === 2) return { name: "destination", id: parts[1] };
  }
  if (parts[0] === "offers") {
    if (parts.length === 1) return { name: "offers" };
    if (parts.length === 2) return { name: "offers-cat", category: parts[1] };
    if (parts.length === 3) return { name: "offer-detail", category: parts[1], id: parts[2] };
  }
  return { name: "home" };
}
function navigate(path) { window.location.hash = path; window.scrollTo(0, 0); }

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("in"), i * 60);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

/* ============ NAV ============ */
function Nav({ route }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isInner = route.name !== "home";
  useEffect(() => {
    const onS = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onS, { passive: true });
    onS();
    return () => window.removeEventListener("scroll", onS);
  }, []);
  const cls = `nav ${scrolled || isInner ? "scrolled" : ""} ${open ? "menu-open" : ""}`;
  const handle = (path) => (e) => { e.preventDefault(); setOpen(false); navigate(path); };

  return (
    <nav className={cls}>
      <a href="#/" onClick={handle("/")} className="nav-logo">
        <span className="badge-mini">M</span>
        <span className="word">MILLION</span>
      </a>
      <ul className="nav-links">
        <li><a href="#/" onClick={handle("/")} className={route.name === "home" ? "active" : ""}>Home</a></li>
        <li><a href="#/about" onClick={handle("/about")} className={route.name === "about" ? "active" : ""}>About</a></li>
        <li><a href="#/destinations" onClick={handle("/destinations")} className={route.name === "destinations" || route.name === "destination" ? "active" : ""}>Destinations</a></li>
        <li><a href="#/offers" onClick={handle("/offers")} className={route.name.startsWith("offers") || route.name === "offer-detail" ? "active" : ""}>Offers</a></li>
        <li><a href="#/gallery" onClick={handle("/gallery")} className={route.name === "gallery" ? "active" : ""}>Gallery</a></li>
        <li><a href="#/contact" onClick={handle("/contact")} className={route.name === "contact" ? "active" : ""}>Contact</a></li>
        <li><a href="https://m.me/million.jor" target="_blank" rel="noopener" className="nav-cta">Liberate Yourself</a></li>
      </ul>
      <button className="nav-mobile" onClick={() => setOpen(!open)} aria-label="Menu">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {open ? <path d="M6 6l12 12M6 18L18 6"/> : <Fragment><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></Fragment>}
        </svg>
      </button>
    </nav>
  );
}

function Footer() {
  const handle = (path) => (e) => { e.preventDefault(); navigate(path); };
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <div className="logo-block">
            <span className="badge-mini">M</span>
            <span className="word">MILLION</span>
          </div>
          <p>"You're an explorer, not a tourist." Vacations that change you — designed in Amman since 2018.</p>
        </div>
        <div className="footer-col">
          <h5>Site</h5>
          <ul>
            <li><a href="#/" onClick={handle("/")}>Home</a></li>
            <li><a href="#/about" onClick={handle("/about")}>About</a></li>
            <li><a href="#/destinations" onClick={handle("/destinations")}>Destinations</a></li>
            <li><a href="#/offers" onClick={handle("/offers")}>Offers</a></li>
            <li><a href="#/gallery" onClick={handle("/gallery")}>Gallery</a></li>
            <li><a href="#/contact" onClick={handle("/contact")}>Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Destinations</h5>
          <ul>
            {Object.values(DESTINATIONS).map(d => (
              <li key={d.id}><a href={`#/destinations/${d.id}`} onClick={handle(`/destinations/${d.id}`)}>{d.name}</a></li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Reach Us</h5>
          <ul>
            <li><a href="tel:00962799231231">+962 799 231 231</a></li>
            <li><a href="tel:00970599990455">+970 599 990 455</a></li>
            <li><a href="mailto:info@millionjo.com">info@millionjo.com</a></li>
            <li><a href="https://www.instagram.com/million.jor/" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://www.facebook.com/million.jor" target="_blank" rel="noopener">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Million Travel & Tourism. All rights reserved.</div>
        <div>
          <button onClick={handle("/admin")} style={{ background: "var(--gold)", color: "var(--navy)", border: "none", padding: "0.6rem 1.2rem", borderRadius: "4px", fontFamily: "var(--font-display)", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.05em" }} onMouseEnter={e => { e.target.style.background = "var(--gold-bright)"; e.target.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.target.style.background = "var(--gold)"; e.target.style.transform = "translateY(0)"; }}>
            🔐 Staff Access
          </button>
        </div>
      </div>
    </footer>
  );
}

function PageHero({ breadcrumb, title, accent, lede, bgImage, bgKeyword = "travel,explore" }) {
  const PAGE_PHOTOS = {
    "world-travel,destinations,collage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop",
    "amman,jordan,office": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&fit=crop",
    "world,travel,journey": "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=85&fit=crop",
    "travel,destinations,collage": "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop",
    "amman,office": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&fit=crop",
  };
  const bg = bgImage || PAGE_PHOTOS[bgKeyword] || "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=85&fit=crop";
  return (
    <section className="page-hero">
      <div className="page-hero-bg" style={{ backgroundImage: `url(${bg})` }}></div>
      <div className="page-hero-overlay"></div>
      <div className="page-hero-grain"></div>
      <div className="page-hero-content">
        <div className="breadcrumb reveal">
          {breadcrumb.map((b, i) => (
            <Fragment key={i}>
              {b.href ? <a href={`#${b.href}`} onClick={(e) => { e.preventDefault(); navigate(b.href); }}>{b.label}</a> : <span>{b.label}</span>}
              {i < breadcrumb.length - 1 && <span className="sep">/</span>}
            </Fragment>
          ))}
        </div>
        <h1 className="h-display reveal">{title} {accent && <span className="accent">{accent}</span>}</h1>
        {lede && <p className="lede reveal">{lede}</p>}
      </div>
    </section>
  );
}

function BookingCTA({ pkg }) {
  return (
    <section className="booking-cta">
      <div className="booking-cta-inner">
        <h3>Ready to <span className="accent">go</span>?</h3>
        <p>{pkg ? `Message us about ${pkg.title} and we'll send you availability for your dates.` : `Message us with your dates and the kind of trip you're after — we'll come back with options.`}</p>
        <a href="https://m.me/million.jor" target="_blank" rel="noopener" className="btn-primary">Start the Conversation <span className="arrow">→</span></a>
      </div>
    </section>
  );
}

/* ============ HOME ============ */
function HomePage({ packages }) {
  useReveal();
  const featured = Object.values(DESTINATIONS).slice(0, 3);

  return (
    <Fragment>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1800&q=85&fit=crop)` }}></div>
        <div className="hero-overlay"></div>
        <div className="hero-grain"></div>
        <div className="hero-line"></div>
        <div className="hero-coords">31.9539° N<br/>35.9106° E<br/>AMM · IST · TBS · CAI<br/>JO · TR · GE · EG</div>
        <div className="hero-grid">
          <div>
            <div className="eyebrow reveal" style={{ color: "var(--gold)", marginBottom: "2rem" }}>Million Travel · Est. 2018</div>
            <h1 className="h-display reveal">You're an<br/><span className="accent">explorer</span>,<br/>not a tourist.</h1>
            <p className="hero-tagline reveal">Google can plan a trip. We plan an escape. Whether you're chasing horizons or running a tight schedule, we build the kind of journey you'll actually remember.</p>
            <a href="https://m.me/million.jor" target="_blank" rel="noopener" className="btn-primary reveal">Liberate Yourself <span className="arrow">→</span></a>
          </div>
          <div style={{ alignSelf: "end" }} className="reveal">
            <div className="hero-meta">
              <div className="stat"><div className="num">07</div><div className="lbl">Years on the road</div></div>
              <div className="stat"><div className="num">365</div><div className="lbl">Days a year, on call</div></div>
            </div>
          </div>
        </div>
        <div className="scroll-cue"><span>Scroll</span><span className="line"></span></div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {Array(2).fill(0).map((_, idx) => (
            <Fragment key={idx}>
              <span className="marquee-item">You're an explorer, not a tourist</span>
              <span className="marquee-item">Vacations that change you</span>
              <span className="marquee-item">Liberate yourself</span>
              <span className="marquee-item">We know what Google doesn't</span>
              <span className="marquee-item">Seven years on the road</span>
            </Fragment>
          ))}
        </div>
      </div>

      <section className="section parch">
        <div className="container">
          <div className="sec-header">
            <h2 className="h-display reveal">Two kinds of <span className="accent">travelers</span>.<br/>Both welcome.</h2>
            <p className="reveal">Some people travel to disappear. Others travel to deliver. We've built Million for both — the escape artist and the operator. Pick your door.</p>
          </div>
          <div className="paths">
            <div className="path-card has-bg-1 reveal" onClick={() => navigate("/destinations")}>
              <div>
                <div className="path-num">01 · Leisure</div>
                <h3>Need to <span className="accent">disappear</span>?</h3>
                <p>You've earned the right to vanish for a week. We know where, when, and how — the spots that aren't on every Instagram feed, the timing that beats the crowds, the deals the algorithms hide.</p>
                <div className="path-tags"><span>Curated</span><span>Honeymoons</span><span>Family</span></div>
              </div>
              <span className="path-arrow">→</span>
            </div>
            <div className="path-card gold-card has-bg-2 reveal" onClick={() => navigate("/contact")}>
              <div>
                <div className="path-num">02 · Business</div>
                <h3>Traveling for <span className="accent">work</span>?</h3>
                <p>One trip, zero loose ends. We handle the logistics — flights, hotels, transfers, the meeting that runs late, the flight that gets moved. You handle the work.</p>
                <div className="path-tags"><span>Corporate</span><span>Conferences</span><span>Last-minute</span></div>
              </div>
              <span className="path-arrow">→</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section deep manifesto">
        <div className="manifesto-watermark">M.</div>
        <div className="container-narrow">
          <div className="eyebrow reveal" style={{ color: "var(--gold)", opacity: 0.7, marginBottom: "1rem" }}>Why Million</div>
          <h2 className="h-display reveal">When it comes to traveling, we know what <span className="accent">Google doesn't</span>.</h2>
          <div className="manifesto-body">
            <p className="reveal">Travel agents have a reputation. Most of it is deserved — the hard sell, the package that's "perfect" because it's the easiest to book, the destination that suspiciously matches their commission. We built Million on the opposite instinct.</p>
            <p className="reveal">Your trip belongs to you. Not to whatever's in season this quarter. Not to the algorithm. Not to us. We're here to make sure you come back changed — not just stamped.</p>
          </div>
          <div className="manifesto-stats">
            <div className="s reveal"><div className="n">7</div><div className="l">Years building journeys for the curious and the careful</div></div>
            <div className="s reveal"><div className="n">3</div><div className="l">Branches across Jordan and Palestine</div></div>
            <div className="s reveal"><div className="n">∞</div><div className="l">Trips that started a story worth telling</div></div>
          </div>
        </div>
      </section>

      <section className="section cream">
        <div className="container">
          <div className="sec-header">
            <div>
              <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>Destinations</div>
              <h2 className="h-display reveal">Where will <span className="accent">you</span> go?</h2>
            </div>
            <a href="#/destinations" onClick={(e) => { e.preventDefault(); navigate("/destinations"); }} className="btn-outline reveal">All destinations →</a>
          </div>
          <div className="dest-grid">
            {featured.map((d, i) => (
              <div key={d.id} className={`dest-card ${i === 0 ? "tall" : ""} reveal`} onClick={() => navigate(`/destinations/${d.id}`)}>
                <div className="img" style={{ backgroundImage: `url(${d.heroImage})` }}></div>
                <div className="overlay"></div>
                <div className="content">
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{d.name}</h3>
                  <p className="price-from">{d.tagline}</p>
                  <div className="country">{d.flightTime}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bone">
        <div className="container">
          <div className="sec-header" style={{ marginBottom: "3rem" }}>
            <h2 className="h-display reveal">However you <span className="accent">travel</span>,<br/>we've got the brief.</h2>
            <div></div>
          </div>
          <div className="cat-grid">
            {Object.entries(CATEGORIES).map(([key, cat], i) => (
              <div key={key} className="cat-tile reveal" onClick={() => navigate(`/offers/${key}`)}>
                <div>
                  <div className="cat-num">{String(i + 1).padStart(2, "0")}</div>
                  <h3>{cat.en}</h3>
                  <p>{cat.desc}</p>
                </div>
                <span className="cat-arrow">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section gold quote" style={{ position: "relative" }}>
        <div className="quote-mark">"</div>
        <div className="container-narrow" style={{ position: "relative", zIndex: 2 }}>
          <blockquote className="reveal">They didn't sell me a destination. They asked what I was running from, then planned the cure.</blockquote>
          <cite className="reveal">Rana S. — Traveled to Georgia, 2025</cite>
        </div>
      </section>

      <section className="section deep">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="eyebrow reveal" style={{ color: "var(--gold)", opacity: 0.7, marginBottom: "1rem" }}>Start Here</div>
              <h2 className="h-display reveal" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>Vacations that <span className="accent">change you</span>.</h2>
              <p className="reveal" style={{ fontSize: "1.1rem", lineHeight: 1.6, marginTop: "2rem", maxWidth: "36rem", color: "rgba(245, 237, 224, 0.85)", fontWeight: 300 }}>That's not a tagline. That's the brief we work to. Tell us where your head is — restless, overworked, curious, in love — and we'll build the trip from there.</p>
              <a href="https://m.me/million.jor" target="_blank" rel="noopener" className="btn-primary reveal" style={{ marginTop: "2.5rem" }}>Start the Conversation <span className="arrow">→</span></a>
            </div>
            <div className="contact-info">
              <div className="contact-block reveal"><div className="lbl">Headquarters</div><div className="val">Sharif Abdul Hamid Sharaf St.<br/>Building 91, Shmeisani, Amman</div></div>
              <div className="contact-block reveal"><div className="lbl">Direct</div><div className="val"><a href="tel:00962799231231">+962 799 231 231</a> · Jordan<br/><a href="tel:00970599990455">+970 599 990 455</a> · Palestine<br/><a href="mailto:info@millionjo.com">info@millionjo.com</a></div></div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

/* ============ DESTINATIONS LIST ============ */
function DestinationsListPage({ packages }) {
  useReveal();
  return (
    <Fragment>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Destinations" }]}
        title="Where will you"
        accent="go?"
        lede="Six destinations we know inside-out — from Türkiye to Morocco, the Caucasus to the Sahara. Each one curated by people who've been there, often, and know the difference between a tourist trap and a story worth telling."
        bgImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop"
      />
      <section className="section cream">
        <div className="container">
          <div className="country-grid">
            {Object.values(DESTINATIONS).map((d, i) => {
              const pkgCount = packages.filter(p => p.destination === d.id).length;
              return (
                <div key={d.id} className="country-card reveal" onClick={() => navigate(`/destinations/${d.id}`)}>
                  <div className="img" style={{ backgroundImage: `url(${d.heroImage})` }}></div>
                  <div className="overlay"></div>
                  <div className="content">
                    <div className="label">{String(i + 1).padStart(2, "0")} · {d.flightTime}</div>
                    <h3>{d.name}</h3>
                    <p>{d.tagline}</p>
                    <div className="meta-row">
                      <span>{pkgCount} {pkgCount === 1 ? "package" : "packages"}</span>
                      <span className="arrow-icon">→</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <BookingCTA />
    </Fragment>
  );
}

/* ============ DESTINATION DETAIL ============ */
function DestinationDetailPage({ id, packages }) {
  useReveal();
  const dest = DESTINATIONS[id];
  const relatedPackages = packages.filter(p => p.destination === id);

  if (!dest) {
    return (
      <Fragment>
        <PageHero breadcrumb={[{ label: "Home", href: "/" }, { label: "Destinations", href: "/destinations" }]} title="Destination not found" lede="The destination you're looking for may not be live yet." />
        <section className="section cream"><div className="container-narrow" style={{ textAlign: "center" }}><a href="#/destinations" onClick={(e) => { e.preventDefault(); navigate("/destinations"); }} className="btn-primary">All destinations</a></div></section>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="detail-hero">
        <div className="detail-hero-img" style={{ backgroundImage: `url(${dest.heroImage})` }}></div>
        <div className="overlay"></div>
        <div className="content">
          <div className="inner">
            <div className="breadcrumb">
              <a href="#/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
              <span className="sep">/</span>
              <a href="#/destinations" onClick={(e) => { e.preventDefault(); navigate("/destinations"); }}>Destinations</a>
              <span className="sep">/</span>
              <span>{dest.name}</span>
            </div>
            <h1 className="h-display">{dest.name}</h1>
            <p className="subtitle">{dest.tagline}</p>
          </div>
        </div>
      </div>

      <div className="detail-meta">
        <div className="detail-meta-grid">
          <div className="item"><div className="l">Best Time</div><div className="v">{dest.bestTime}</div></div>
          <div className="item"><div className="l">Visa</div><div className="v">{dest.visa}</div></div>
          <div className="item"><div className="l">Flight Time</div><div className="v">{dest.flightTime}</div></div>
          <div className="item"><div className="l">Currency</div><div className="v">{dest.currency}</div></div>
        </div>
      </div>

      <section className="detail-body">
        <div className="detail-body-inner">
          <div className="detail-section">
            <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>About {dest.name}</div>
            <h2 className="h-display reveal">{dest.blurb.split(".")[0]}<span className="accent">.</span></h2>
            <p className="reveal" style={{ marginTop: "1.5rem" }}>{dest.description}</p>
          </div>
        </div>
      </section>

      {/* ATTRACTIONS */}
      <section className="section bone">
        <div className="container">
          <div className="sec-header">
            <div>
              <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>Top Attractions</div>
              <h2 className="h-display reveal">Things you have to <span className="accent">see</span>.</h2>
            </div>
            <p className="reveal">The shortlist — six places we send every traveler to, in priority order. Save the rest for the second trip.</p>
          </div>
          <div className="attr-grid">
            {dest.attractions.map((a, i) => (
              <div key={i} className="attr-card reveal">
                <div className="attr-card-img" style={{ backgroundImage: `url(${a.image})` }}></div>
                <div className="attr-card-body">
                  <div className="ribbon">{a.city}</div>
                  <h4>{a.name}</h4>
                  <p>{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="section deep">
        <div className="container">
          <div className="sec-header">
            <div>
              <div className="eyebrow reveal" style={{ color: "var(--gold)", opacity: 0.7, marginBottom: "1rem" }}>Experiences</div>
              <h2 className="h-display reveal">Things you have to <span className="accent">do</span>.</h2>
            </div>
            <p className="reveal" style={{ color: "rgba(245, 237, 224, 0.78)" }}>The verbs, not the nouns. What separates a trip from a postcard — the local meals, the late nights, the things that get told and re-told.</p>
          </div>
          <div className="exp-grid">
            {dest.experiences.map((e, i) => (
              <div key={i} className="exp-card reveal">
                <div className="ico">{e.ico}</div>
                <h4>{e.title}</h4>
                <p>{e.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY STRIP */}
      <section className="section bone">
        <div className="container">
          <div className="sec-header" style={{ marginBottom: "2.5rem" }}>
            <div>
              <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>The Look</div>
              <h2 className="h-display reveal">{dest.name} in <span className="accent">photos</span>.</h2>
            </div>
            <a href="#/gallery" onClick={(e) => { e.preventDefault(); navigate("/gallery"); }} className="btn-outline reveal">More photos →</a>
          </div>
          <div className="gallery-strip">
            {dest.gallery.map((kw, i) => (
              <div key={i} className="gallery-strip-item reveal" style={{ backgroundImage: `url(${imgSquare(kw, `${dest.id}-g${i}`)})` }}></div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED PACKAGES */}
      {relatedPackages.length > 0 && (
        <section className="section cream">
          <div className="container">
            <div className="sec-header">
              <div>
                <div className="eyebrow reveal" style={{ marginBottom: "1rem" }}>Available Packages</div>
                <h2 className="h-display reveal">Trips to <span className="accent">{dest.name}</span>.</h2>
              </div>
              <a href="#/offers" onClick={(e) => { e.preventDefault(); navigate("/offers"); }} className="btn-outline reveal">All offers →</a>
            </div>
            <div className="pkg-list">
              {relatedPackages.map(p => (
                <article key={p.id} className="pkg-card reveal" onClick={() => navigate(`/offers/${p.category}/${p.id}`)}>
                  <div className="pkg-card-img">
                    <div className="pkg-card-img-inner" style={{ backgroundImage: `url(${p.cardImage || p.heroImage})` }}></div>
                    <div className="overlay-bottom">{p.country} · {p.duration}</div>
                  </div>
                  <div className="pkg-card-body">
                    <div className="pkg-card-cat">{CATEGORIES[p.category]?.en || p.category}</div>
                    <h3>{p.title}</h3>
                    <p className="pkg-sub">{p.subtitle}</p>
                    <div className="pkg-card-foot">
                      <div className="price">From <strong>{p.priceFrom}</strong> {p.currency}</div>
                      <span className="arrow">→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingCTA />
    </Fragment>
  );
}

/* ============ ABOUT ============ */
function AboutPage() {
  useReveal();
  return (
    <Fragment>
      <PageHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="The story behind"
        accent="Million."
        lede="Started in 2018 in Amman with a stubborn idea: that a travel agency could actually advocate for the traveler instead of the package. Seven years later, we've grown across three branches and two countries — and we're still working from that same brief."
        bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&fit=crop"
      />
      <section className="section cream">
        <div className="container-narrow">
          <div className="detail-section">
            <h2 className="h-display reveal">Why we <span className="accent">exist</span>.</h2>
            <p className="reveal">The travel industry runs on commissions. Most agencies are pointed at whatever package pays them best — your trip is incidental. We started Million because we wanted to build the opposite of that: an agency where the answer to "what should I book?" actually depends on what you want, not on what's easy to sell.</p>
            <p className="reveal">That sounds simple. It's not. It means we sometimes recommend things we don't make money on. It means we say "this destination isn't right for you." It means we plan trips for repeat customers who pay us less than first-timers. It's the only way we know how to build something that lasts.</p>
          </div>
          <div className="detail-section">
            <h2 className="h-display reveal">The <span className="accent">timeline</span>.</h2>
            <div className="timeline">
              <div className="timeline-item reveal"><div className="year">2018</div><h4>Million opens its doors</h4><p>Started in Amman with one office, three staff, and a single mission: leisure travel done honestly.</p></div>
              <div className="timeline-item reveal"><div className="year">2020</div><h4>Adding MICE & corporate</h4><p>Expanded into meetings, incentives, conferences, and exhibitions.</p></div>
              <div className="timeline-item reveal"><div className="year">2022</div><h4>Hajj & Umrah service line</h4><p>Launched a dedicated religious travel desk, with hotels in Makkah and Madinah and visa handling end-to-end.</p></div>
              <div className="timeline-item reveal"><div className="year">2024</div><h4>Hebron branch opens</h4><p>Expanded across the river to Palestine — opposite Adwa' Al-Madina Club.</p></div>
              <div className="timeline-item reveal"><div className="year">2026</div><h4>Three offices, two countries</h4><p>Headquarters in Shmeisani, second branch at the Seventh Circle, and a Palestine operation that's grown faster than we expected.</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="section deep">
        <div className="container">
          <div className="sec-header" style={{ marginBottom: "0" }}>
            <h2 className="h-display reveal">What we <span className="accent">do</span>.</h2>
            <p className="reveal">Six service lines, all run out of three offices. The transport division also operates as its own unit.</p>
          </div>
          <div className="services-grid">
            <div className="service-tile reveal"><div className="ico">✈</div><h4>Leisure Travel</h4><p>Where it all started. Curated trips, honest recommendations.</p></div>
            <div className="service-tile reveal"><div className="ico">⌂</div><h4>Hotel Reservations</h4><p>Direct rates and partner pricing across thousands of properties worldwide.</p></div>
            <div className="service-tile reveal"><div className="ico">★</div><h4>Honeymoons</h4><p>The first chapter of the rest of your life. We handle the page.</p></div>
            <div className="service-tile reveal"><div className="ico">۞</div><h4>Hajj & Umrah</h4><p>A journey of meaning, planned with the care it deserves.</p></div>
            <div className="service-tile reveal"><div className="ico">▤</div><h4>Visa Services</h4><p>Schengen, US, UK, and more — applications handled with the embassy directly.</p></div>
            <div className="service-tile reveal"><div className="ico">⛟</div><h4>Ground Transport</h4><p>Our own fleet of buses, sedans, and minivans. Available B2B.</p></div>
          </div>
        </div>
      </section>
      <BookingCTA />
    </Fragment>
  );
}

/* ============ OFFERS ============ */
function OffersPage({ packages, category }) {
  useReveal();
  const filtered = category ? packages.filter(p => p.category === category) : packages;
  const cat = category ? CATEGORIES[category] : null;

  return (
    <Fragment>
      <PageHero
        breadcrumb={category ? [{ label: "Home", href: "/" }, { label: "Offers", href: "/offers" }, { label: cat?.en || category }] : [{ label: "Home", href: "/" }, { label: "Offers" }]}
        title={category ? cat.en : "Choose your"}
        accent={category ? null : "adventure."}
        lede={category ? cat.desc : "Six service lines, dozens of destinations, and a small team that knows them all. Pick a category to start, or message us and we'll work backwards from your dates."}
        bgImage={
          category === "outbound" ? "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=85&fit=crop" :
          category === "honeymoon" ? "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&q=85&fit=crop" :
          category === "hajj" ? "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1600&q=85&fit=crop" :
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop"
        }
      />
      {!category && (
        <section className="section bone">
          <div className="container">
            <div className="cat-grid">
              {Object.entries(CATEGORIES).map(([key, c], i) => {
                const count = packages.filter(p => p.category === key).length;
                return (
                  <div key={key} className="cat-tile reveal" onClick={() => navigate(`/offers/${key}`)}>
                    <div>
                      <div className="cat-num">→ {String(i + 1).padStart(2, "0")} · {count} {count === 1 ? "offer" : "offers"}</div>
                      <h3>{c.en}</h3>
                      <p>{c.desc}</p>
                    </div>
                    <span className="cat-arrow">→</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {category && (
        <section className="section cream">
          <div className="container">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <h3>No active offers in this category.</h3>
                <p>We rotate offers regularly. Message us directly and we'll put together a custom plan.</p>
                <a href="https://m.me/million.jor" target="_blank" rel="noopener" className="btn-primary">Message us →</a>
              </div>
            ) : (
              <div className="pkg-list">
                {filtered.map(p => (
                  <article key={p.id} className="pkg-card reveal" onClick={() => navigate(`/offers/${p.category}/${p.id}`)}>
                    <div className="pkg-card-img">
                      <div className="pkg-card-img-inner" style={{ backgroundImage: `url(${p.cardImage || p.heroImage})` }}></div>
                      <div className="overlay-bottom">{p.country} · {p.duration}</div>
                    </div>
                    <div className="pkg-card-body">
                      <div className="pkg-card-cat">{CATEGORIES[p.category]?.en || p.category}</div>
                      <h3>{p.title}</h3>
                      <p className="pkg-sub">{p.subtitle}</p>
                      <div className="pkg-card-foot">
                        <div className="price">From <strong>{p.priceFrom}</strong> {p.currency}</div>
                        <span className="arrow">→</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
      <BookingCTA />
    </Fragment>
  );
}

/* ============ OFFER DETAIL ============ */

/* ============================================================
   PDF DOWNLOAD SECTION — on package detail page
   ============================================================ */
function generatePackagePdf(pkg) {
  // Build HTML string for the printable PDF
  const hotelRows = (pkg.hotels || []).map(h => {
    const priceRows = (h.pricing || []).map(r =>
      `<tr><td>${r.nights} nights</td><td>${r.dbl||"—"} ${pkg.currency}</td><td>${r.sgl||"—"} ${pkg.currency}</td><td>${r.child||"—"} ${pkg.currency}</td></tr>`
    ).join("");
    return `
      <div style="margin-bottom:1.5rem;border:1px solid #ddd;border-radius:4px;overflow:hidden;">
        <div style="background:#1a2d52;color:#f7f1e3;padding:0.75rem 1rem;display:flex;justify-content:space-between;align-items:center;">
          <strong style="font-size:1rem;">${h.name}</strong>
          <span style="color:#f4c430;font-size:0.9rem;">${"★".repeat(h.stars||0)}</span>
        </div>
        ${h.description ? `<p style="padding:0.75rem 1rem;font-size:0.85rem;color:#444;border-bottom:1px solid #eee;">${h.description}</p>` : ""}
        <table style="width:100%;border-collapse:collapse;font-size:0.82rem;">
          <thead><tr style="background:#f4f4f4;">
            <th style="padding:0.5rem 0.75rem;text-align:left;border-bottom:1px solid #ddd;">Nights</th>
            <th style="padding:0.5rem 0.75rem;text-align:center;border-bottom:1px solid #ddd;">DBL/TRP per person</th>
            <th style="padding:0.5rem 0.75rem;text-align:center;border-bottom:1px solid #ddd;">Single per person</th>
            <th style="padding:0.5rem 0.75rem;text-align:center;border-bottom:1px solid #ddd;">Child (6–11)</th>
          </tr></thead>
          <tbody>${priceRows}</tbody>
        </table>
      </div>`;
  }).join("");

  const includes = (pkg.includes||[]).map(i => `<li>${i}</li>`).join("");
  const excludes = (pkg.excludes||[]).map(i => `<li>${i}</li>`).join("");

  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    body{font-family:'Segoe UI',Arial,sans-serif;color:#1a2d52;margin:0;padding:0;}
    .header{background:#1a2d52;color:#f7f1e3;padding:2rem 2.5rem;display:flex;align-items:center;justify-content:space-between;}
    .logo{font-size:2rem;font-weight:700;letter-spacing:0.05em;}
    .logo span{color:#f4c430;}
    .tagline{font-size:0.8rem;letter-spacing:0.2em;text-transform:uppercase;opacity:0.7;margin-top:0.25rem;}
    .hero-bar{background:#f4c430;color:#1a2d52;padding:1.5rem 2.5rem;}
    .hero-bar h1{font-size:2rem;font-weight:700;margin:0;}
    .hero-bar .sub{font-size:0.95rem;opacity:0.75;margin-top:0.25rem;}
    .body{padding:2rem 2.5rem;}
    .meta-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;background:#f4f8ff;border-radius:6px;padding:1rem;margin-bottom:1.5rem;}
    .meta-item .lbl{font-size:0.65rem;letter-spacing:0.2em;text-transform:uppercase;color:#888;margin-bottom:0.2rem;}
    .meta-item .val{font-size:0.95rem;font-weight:600;}
    h2{font-size:1.2rem;color:#1a2d52;border-bottom:2px solid #f4c430;padding-bottom:0.4rem;margin:1.5rem 0 0.75rem;}
    ul{padding-left:1.25rem;}
    li{margin-bottom:0.3rem;font-size:0.88rem;}
    .footer{background:#111e3a;color:rgba(245, 237, 224,0.7);padding:1rem 2.5rem;font-size:0.75rem;display:flex;justify-content:space-between;margin-top:2rem;}
    @media print{body{margin:0;}button{display:none!important;}}
  </style>
  </head><body>
  <div class="header">
    <div>
      <div class="logo"><span>M</span>ILLION</div>
      <div class="tagline">You're an explorer, not a tourist</div>
    </div>
    <div style="text-align:right;font-size:0.8rem;opacity:0.7;">
      <div>millionjo.com</div>
      <div>info@million.com</div>
      <div>+962 799 231 231</div>
    </div>
  </div>
  <div class="hero-bar">
    <h1>${pkg.title} ${pkg.titleAr ? `/ ${pkg.titleAr}` : ""}</h1>
    <div class="sub">${pkg.subtitle||""}</div>
  </div>
  <div class="body">
    <div class="meta-grid">
      <div class="meta-item"><div class="lbl">Country</div><div class="val">${pkg.country||"—"}</div></div>
      <div class="meta-item"><div class="lbl">Duration</div><div class="val">${pkg.duration||"—"}</div></div>
      <div class="meta-item"><div class="lbl">Transport</div><div class="val">${pkg.transport||"—"}</div></div>
      <div class="meta-item"><div class="lbl">Starting from</div><div class="val">${pkg.priceFrom||"—"} ${pkg.currency||"JOD"}</div></div>
    </div>
    ${pkg.description ? `<h2>About this trip</h2><p style="font-size:0.9rem;line-height:1.6;">${pkg.description}</p>` : ""}
    ${includes ? `<h2>What's Included</h2><ul>${includes}</ul>` : ""}
    ${excludes ? `<h2>Not Included</h2><ul>${excludes}</ul>` : ""}
    ${pkg.notes ? `<h2>Important Notes</h2><p style="font-size:0.88rem;line-height:1.6;background:#fffbea;border-left:3px solid #f4c430;padding:0.75rem 1rem;">${pkg.notes}</p>` : ""}
    ${hotelRows ? `<h2>Hotels & Pricing</h2>${hotelRows}` : ""}
  </div>
  <div class="footer">
    <span>© ${new Date().getFullYear()} Million Travel & Tourism — Amman, Jordan</span>
    <span>Prices in ${pkg.currency||"JOD"} per person. Subject to availability.</span>
  </div>
  </body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => { win.focus(); win.print(); };
  }
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

function PdfDownloadSection({ pkg }) {
  if (!pkg) return null;
  const hasUpload = pkg.pdfBrochure?.data;
  return (
    <div style={{background:"var(--bone)",borderTop:"1px solid var(--line)",padding:"3rem 2.5rem",textAlign:"center"}}>
      <div style={{maxWidth:640,margin:"0 auto"}}>
        <p style={{fontFamily:"var(--font-display)",fontSize:"1.5rem",fontWeight:500,marginBottom:"0.5rem",letterSpacing:"-0.02em"}}>
          Take it with you. <span style={{fontStyle:"italic",color:"var(--rust)"}}>Download the details.</span>
        </p>
        <p style={{fontSize:"0.9rem",opacity:0.65,marginBottom:"1.75rem"}}>All hotels, pricing, inclusions and flight info in one document.</p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          {hasUpload && (
            <a href={pkg.pdfBrochure.data} download={pkg.pdfBrochure.name||`${pkg.title}-million-travel.pdf`} className="btn-primary" style={{display:"inline-flex",gap:"0.6rem",alignItems:"center"}}>
              ↓ Download Brochure PDF
            </a>
          )}
          <button onClick={() => generatePackagePdf(pkg)} className={hasUpload ? "btn-outline" : "btn-primary"} style={{display:"inline-flex",gap:"0.6rem",alignItems:"center"}}>
            🖨 {hasUpload ? "Print / Save as PDF" : "Generate & Download PDF"}
          </button>
        </div>
        {!hasUpload && <p style={{fontSize:"0.75rem",opacity:0.45,marginTop:"0.85rem"}}>Opens a print dialog — choose "Save as PDF" in your browser</p>}
      </div>
    </div>
  );
}

function OfferDetailPage({ packages, id }) {
  useReveal();
  const pkg = packages.find(p => p.id === id);
  const [openHotel, setOpenHotel] = useState(null);
  if (!pkg) {
    return (
      <Fragment>
        <PageHero breadcrumb={[{ label: "Home", href: "/" }, { label: "Offers", href: "/offers" }]} title="Offer not found" lede="Browse all current offers, or message us directly." />
        <section className="section cream"><div className="container-narrow" style={{ textAlign: "center" }}><a href="#/offers" onClick={(e) => { e.preventDefault(); navigate("/offers"); }} className="btn-primary">View all offers</a></div></section>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <div className="detail-hero">
        <div className="detail-hero-img" style={{ backgroundImage: `url(${pkg.heroImage})` }}></div>
        <div className="overlay"></div>
        <div className="content">
          <div className="inner">
            <div className="breadcrumb">
              <a href="#/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
              <span className="sep">/</span>
              <a href="#/offers" onClick={(e) => { e.preventDefault(); navigate("/offers"); }}>Offers</a>
              <span className="sep">/</span>
              <a href={`#/offers/${pkg.category}`} onClick={(e) => { e.preventDefault(); navigate(`/offers/${pkg.category}`); }}>{CATEGORIES[pkg.category]?.en}</a>
              <span className="sep">/</span>
              <span>{pkg.title}</span>
            </div>
            <h1 className="h-display">{pkg.title}</h1>
            <p className="subtitle">{pkg.subtitle}</p>
          </div>
        </div>
      </div>
      <div className="detail-meta">
        <div className="detail-meta-grid">
          <div className="item"><div className="l">Country</div><div className="v">{pkg.country}</div></div>
          <div className="item"><div className="l">Duration</div><div className="v">{pkg.duration}</div></div>
          <div className="item"><div className="l">Transport</div><div className="v">{pkg.transport}</div></div>
          <div className="item"><div className="l">From</div><div className="v">{pkg.priceFrom} {pkg.currency}</div></div>
        </div>
      </div>
      <section className="detail-body">
        <div className="detail-body-inner">
          <div className="detail-section">
            <h2 className="h-display reveal">About this <span className="accent">trip</span>.</h2>
            <p className="reveal">{pkg.description}</p>
            {pkg.destination && DESTINATIONS[pkg.destination] && (
              <p className="reveal" style={{ marginTop: "1rem" }}>
                <a href={`#/destinations/${pkg.destination}`} onClick={(e) => { e.preventDefault(); navigate(`/destinations/${pkg.destination}`); }} style={{ borderBottom: "1px solid var(--rust)", color: "var(--rust)" }}>
                  Learn more about {DESTINATIONS[pkg.destination].name} →
                </a>
              </p>
            )}
          </div>
          {pkg.includes && pkg.includes.length > 0 && (
            <div className="detail-section">
              <div className="detail-include reveal">
                <h4>What's included</h4>
                <ul>{pkg.includes.map((x, i) => <li key={i}>{x}</li>)}</ul>
              </div>
              {pkg.excludes && pkg.excludes.length > 0 && (
                <div className="detail-include exclude reveal">
                  <h4>Not included</h4>
                  <ul>{pkg.excludes.map((x, i) => <li key={i}>{x}</li>)}</ul>
                </div>
              )}
            </div>
          )}
          {pkg.notes && (
            <div className="detail-section">
              <h2 className="h-display reveal">Good to <span className="accent">know</span>.</h2>
              <p className="reveal">{pkg.notes}</p>
            </div>
          )}
        </div>
      </section>
      {pkg.hotels && pkg.hotels.length > 0 && (
        <section className="hotels-section">
          <div className="hotels-inner">
            <div className="hotels-header reveal">
              <div className="eyebrow" style={{ marginBottom: "1rem" }}>{pkg.hotels.length} options</div>
              <h2 className="h-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>Pick your <span className="accent">hotel</span>.</h2>
              <p style={{ marginTop: "1rem", maxWidth: "50rem", opacity: 0.7 }}>Click any row to see full pricing.</p>
            </div>
            {pkg.hotels.map((h, idx) => (
              <div key={idx} className={`hotel-row reveal ${openHotel === idx ? "open" : ""}`}>
                <div className="hotel-summary" onClick={() => setOpenHotel(openHotel === idx ? null : idx)}>
                  <div className="hotel-thumb" style={{ backgroundImage: `url(${h.image || pkg.heroImage})` }}></div>
                  <div className="hotel-info">
                    <h4>{h.name}</h4>
                    <div className="hotel-stars">{"★".repeat(h.stars)}{"☆".repeat(5 - h.stars)}</div>
                  </div>
                  <div className="hotel-from">From<br/><strong>{h.pricing[0]?.dbl} {pkg.currency}</strong></div>
                  <div className="hotel-toggle">↓</div>
                </div>
                <div className="hotel-detail">
                  <p>{h.description}</p>
                  <table className="price-table">
                    <thead><tr><th>Nights</th><th>DBL/TRP per person</th><th>Single per person</th><th>Child (6–11)</th></tr></thead>
                    <tbody>
                      {h.pricing.map((row, i) => (
                        <tr key={i}>
                          <td><strong>{row.nights} nights</strong></td>
                          <td className="price">{row.dbl ? `${row.dbl} ${pkg.currency}` : "—"}</td>
                          <td className="price">{row.sgl ? `${row.sgl} ${pkg.currency}` : "—"}</td>
                          <td className="price">{row.child ? `${row.child} ${pkg.currency}` : "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <PdfDownloadSection pkg={pkg} />
      <BookingCTA pkg={pkg} />
    </Fragment>
  );
}

/* ============ GALLERY ============ */
function GalleryPage() {
  useReveal();
  const tiles = [
    { name: "Türkiye", kw: "cappadocia,turkey" },
    { name: "Egypt", kw: "egypt,pyramids" },
    { name: "Georgia", kw: "tbilisi,georgia" },
    { name: "Türkiye", url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=700&q=85&fit=crop" },
    { name: "Egypt", url: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=700&q=85&fit=crop" },
    { name: "Georgia", url: "https://images.unsplash.com/photo-1609941637575-8f97fcc25f88?w=700&q=85&fit=crop" },
    { name: "Dubai", url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=85&fit=crop" },
    { name: "Morocco", url: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=700&q=85&fit=crop" },
    { name: "Tunisia", url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=700&q=85&fit=crop" },
    { name: "Greece", url: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=700&q=85&fit=crop" },
    { name: "Bali", url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=700&q=85&fit=crop" },
    { name: "Maldives", url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=700&q=85&fit=crop" },
    { name: "Phuket", url: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=700&q=85&fit=crop" },
    { name: "Cappadocia", url: "https://images.unsplash.com/photo-1603202662747-00e33e7d1468?w=700&q=85&fit=crop" },
    { name: "Rome", url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=700&q=85&fit=crop" },
  ];
  return (
    <Fragment>
      <PageHero breadcrumb={[{ label: "Home", href: "/" }, { label: "Gallery" }]} title="Trips that" accent="happened." lede="A small sample of where our travelers have been." bgImage="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop" />
      <section className="section cream">
        <div className="container">
          <div className="dest-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {tiles.map((t, i) => (
              <a key={i} href="https://www.instagram.com/million.jor/" target="_blank" rel="noopener" className="dest-card reveal" style={{ aspectRatio: "1/1" }}>
                <div className="img" style={{ backgroundImage: `url(${t.url})` }}></div>
                <div className="overlay"></div>
                <div className="content">
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontSize: "1.5rem" }}>{t.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <BookingCTA />
    </Fragment>
  );
}

/* ============ CONTACT ============ */
function ContactPage() {
  useReveal();
  return (
    <Fragment>
      <PageHero breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact" }]} title="Let's" accent="talk." lede="Three offices, two countries, one number that gets answered." bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&fit=crop" />
      <section className="section deep">
        <div className="container">
          <div className="contact-grid">
            <div>
              <h2 className="h-display reveal" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1.5rem" }}>The fastest way<br/>is <span className="accent">a message</span>.</h2>
              <p className="reveal" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "rgba(245, 237, 224, 0.85)", maxWidth: "36rem", marginBottom: "2rem" }}>Tell us your dates, your budget, and what kind of trip you're after — we'll come back with options.</p>
              <a href="https://m.me/million.jor" target="_blank" rel="noopener" className="btn-primary reveal">Message us on Messenger <span className="arrow">→</span></a>
              <div className="reveal" style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <a href="tel:00962799231231" className="btn-outline dark">Call Jordan</a>
                <a href="mailto:info@millionjo.com" className="btn-outline dark">Email us</a>
              </div>
            </div>
            <div className="contact-info">
              <div className="contact-block reveal"><div className="lbl">Headquarters · Amman</div><div className="val">Sharif Abdul Hamid Sharaf St.<br/>Building 91, Shmeisani</div></div>
              <div className="contact-block reveal"><div className="lbl">Seventh Circle Branch</div><div className="val">Princess Sumaya St.<br/>Building 24, Amman</div></div>
              <div className="contact-block reveal"><div className="lbl">Palestine · Hebron</div><div className="val">Opposite Adwa' Al-Madina Club</div></div>
              <div className="contact-block reveal"><div className="lbl">Direct lines</div><div className="val"><a href="tel:00962799231231">+962 799 231 231</a> · Jordan<br/><a href="tel:00970599990455">+970 599 990 455</a> · Palestine<br/><a href="mailto:info@millionjo.com">info@millionjo.com</a></div></div>
              <div className="contact-block reveal"><div className="lbl">Hours</div><div className="val">Sun–Thu, 9 AM – 6 PM<br/>Sat, 10 AM – 4 PM</div></div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

/* ============================================================
   CMS STORAGE KEYS
   ============================================================ */
const SEO_KEY      = "million-seo-v1";
const SETTINGS_KEY = "million-settings-v1";
const SECTIONS_KEY = "million-sections-v1";

const DEFAULT_SEO = {
  siteTitle: "Million Travel — You're an Explorer, Not a Tourist",
  metaDescription: "Million Travel — vacations that change you. Curated journeys to Türkiye, Egypt, Georgia, Dubai, Tunisia, Morocco and beyond.",
  ogTitle: "Million Travel",
  ogDescription: "Vacations that change you. Curated travel from Amman since 2018.",
  ogImage: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80&fit=crop",
  keywords: "travel agency Jordan, travel packages Amman, Türkiye trips, Egypt packages, Georgia tours, Dubai packages, honeymoon Jordan, Umrah packages",
  canonicalUrl: "https://millionjo.com",
  robots: "index, follow",
  twitterCard: "summary_large_image",
  schemaOrg: true,
};

const DEFAULT_SETTINGS = {
  heroPhoto: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1800&q=85&fit=crop",
  heroHeadline1: "You're an",
  heroAccent: "explorer",
  heroHeadline2: "not a tourist.",
  heroTagline: "Google can plan a trip. We plan an escape. Whether you're chasing horizons or running a tight schedule, we build the kind of journey you'll actually remember.",
  heroCta: "Liberate Yourself",
  heroCtaUrl: "https://m.me/million.jor",
  stat1Num: "07", stat1Label: "Years on the road",
  stat2Num: "365", stat2Label: "Days a year, on call",
  aboutPhoto: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&fit=crop",
  galleryPhoto: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop",
  contactPhoto: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&fit=crop",
  destinationsPhoto: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop",
  quoteText: "They didn't sell me a destination. They asked what I was running from, then planned the cure.",
  quoteAuthor: "Rana S. — Traveled to Georgia, 2025",
  manifesto1: "Travel agents have a reputation. Most of it is deserved — the hard sell, the package that's perfect because it's the easiest to book. We built Million on the opposite instinct.",
  manifesto2: "Your trip belongs to you. Not to whatever's in season this quarter. Not to the algorithm. Not to us. We're here to make sure you come back changed — not just stamped.",
  adminPassword: "million2026",
};

const DEFAULT_SECTIONS = [
  { id: "s1", type: "callout", enabled: true, title: "Special Offer", subtitle: "Limited time", body: "Book any international package before the end of the month and get free airport transfers included.", cta: "See Offers", ctaUrl: "#/offers", bgColor: "var(--gold)", textColor: "var(--navy-deep)", faqs: [] },
];

async function loadCmsData(key, def) {
  try { const r = await window.storage.get(key); if (r && r.value) return JSON.parse(r.value); } catch (e) {}
  return JSON.parse(JSON.stringify(def));
}
async function saveCmsData(key, data) {
  try { await window.storage.set(key, JSON.stringify(data)); return true; } catch (e) { return false; }
}


/* ════════════════════════════════════════════════════════════
   PRICE CALCULATOR — backend pricing engine
   Replicates the Excel calculation formula across all destinations.
   Formula pattern (from analyzing the workbook):
     Single: (single_rate × nights) × multiplier + ticket + extra
     Double: ((double_rate ÷ 2) × nights) × multiplier + ticket + extra
     Child:  (child_rate × nights) × multiplier + ticket + extra
   Final: MROUND to nearest 5 JOD
   Multiplier: 0.71 (most), 0.78 (Alanya)
   ════════════════════════════════════════════════════════════ */
const CALCULATOR_KEY = "million-calculator-v1";

function mround(v, m) {
  if (v == null || isNaN(v)) return null;
  return Math.round(v / m) * m;
}

function calcPrice(formula, rate, nights, ticket, extra) {
  if (rate == null || rate === "" || isNaN(Number(rate))) return null;
  const r = Number(rate), n = Number(nights)||0, t = Number(ticket)||0, e = Number(extra)||0;
  const m = formula.multiplier ?? 0.71;
  let result;
  switch (formula.style) {
    case "ticket_inside":
      result = ((r * n) + t) * m + e;
      break;
    case "plus_five":
      result = ((r * n) + 5) * m + t + e;
      break;
    case "standard":
    default:
      result = (r * n) * m + t + e;
  }
  return mround(result, 5);
}

function computeRowPrices(hotel, dest) {
  const out = {};
  dest.durations.forEach(d => {
    out[d.key] = {
      single: calcPrice(dest.formula, hotel.single, d.nights, hotel.ticket, hotel.extra),
      double: calcPrice(dest.formula, (Number(hotel.double)||0) / 2, d.nights, hotel.ticket, hotel.extra),
      child:  (hotel.child === "" || hotel.child == null) ? null : calcPrice(dest.formula, hotel.child, d.nights, hotel.ticket, hotel.extra),
    };
  });
  return out;
}

const CALC_DEFAULTS = [
  { key: "istanbul_eid", label: "Istanbul — Eid", icon: "🕌",
    formula: { style: "standard", multiplier: 0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"7n", label:"7 nights", nights:6 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 320 JOD | Child 6-12: as below",
    hotels: [
      { name:"Grand Milan",      stars:3, area:"Fatih",  single:42, double:42, child:15, ticket:0,   extra:20 },
      { name:"Grand Liza",       stars:3, area:"Fatih",  single:50, double:50, child:15, ticket:325, extra:20 },
      { name:"Palmiya Taksim",   stars:3, area:"Taksim", single:56, double:56, child:23, ticket:340, extra:20 },
      { name:"Istanbul Dora",    stars:4, area:"Sisli",  single:65, double:65, child:25, ticket:340, extra:20 },
      { name:"Atro Hotel",       stars:4, area:"Sisli",  single:62, double:62, child:20, ticket:340, extra:20 },
      { name:"Burj Istanbul",    stars:4, area:"Taksim", single:85, double:85, child:20, ticket:340, extra:20 },
      { name:"Manesol Galata",   stars:4, area:"Pera",   single:87, double:87, child:35, ticket:340, extra:20 },
      { name:"Point Hotel",      stars:5, area:"Taksim", single:145, double:145, child:45, ticket:340, extra:20 },
      { name:"Divan Hotel",      stars:5, area:"Taksim", single:285, double:285, child:55, ticket:340, extra:20 },
    ]},
  { key: "istanbul_reg", label: "Istanbul — Regular", icon: "🌙",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"7n", label:"7 nights", nights:6 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 280 JOD",
    hotels: [
      { name:"Grand Milan",       stars:3, area:"Fatih",  single:37, double:30, child:10, ticket:205, extra:20 },
      { name:"Grand Liza",        stars:3, area:"Fatih",  single:38, double:38, child:12, ticket:215, extra:20 },
      { name:"NL Amsterdam",      stars:3, area:"Fatih",  single:37, double:37, child:18, ticket:215, extra:20 },
      { name:"Istanbul Dora",     stars:4, area:"Sisli",  single:45, double:45, child:15, ticket:215, extra:20 },
      { name:"Actual Life Hotel", stars:4, area:"Sisli",  single:50, double:50, child:20, ticket:215, extra:20 },
      { name:"Taksim Express",    stars:4, area:"Taksim", single:63, double:63, child:20, ticket:220, extra:20 },
      { name:"Akgun Hotel",       stars:5, area:"Fatih",  single:55, double:55, child:20, ticket:215, extra:20 },
      { name:"Point Hotel",       stars:5, area:"Taksim", single:114, double:114, child:48, ticket:230, extra:20 },
    ]},
  { key: "antalya", label: "Antalya", icon: "🏖️",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"7n", label:"7 nights", nights:6 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 320 JOD",
    hotels: [
      { name:"Cender Hotel (HB)",        stars:4, area:"City Center", single:63, double:90, child:35, ticket:320, extra:36 },
      { name:"Belkon (All In)",          stars:4, area:"Belek",       single:70, double:92, child:34, ticket:300, extra:20 },
      { name:"Adonis Hotel (All In)",    stars:5, area:"Lara",        single:127, double:153, child:null, ticket:300, extra:20 },
      { name:"Grand Park Lara (Ultra)",  stars:4, area:"Lara",        single:175, double:205, child:84, ticket:300, extra:20 },
      { name:"Innvista (Ultra)",         stars:5, area:"Belek",       single:145, double:197, child:70, ticket:300, extra:20 },
      { name:"Royal Seginus (Ultra)",    stars:5, area:"Lara",        single:321, double:430, child:152, ticket:310, extra:20 },
      { name:"Titanic Mardan Palace",    stars:5, area:"Lara",        single:377, double:505, child:179, ticket:310, extra:20 },
    ]},
  { key: "alanya", label: "Alanya", icon: "🌊",
    formula: { style:"standard", multiplier:0.78 },
    durations: [
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"7n", label:"7 nights", nights:6 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 300 JOD",
    hotels: [
      { name:"Ozkaymak Incekum",        stars:5, area:"Alanya", single:146, double:146, child:52, ticket:210, extra:25 },
      { name:"Orange County",           stars:5, area:"Alanya", single:174, double:174, child:62, ticket:230, extra:25 },
      { name:"Justiniano Deluxe",       stars:5, area:"Alanya", single:181, double:205, child:73, ticket:230, extra:25 },
      { name:"Sidera Kirman Premium",   stars:5, area:"Alanya", single:181, double:244, child:86, ticket:230, extra:25 },
      { name:"Delphin Deluxe",          stars:5, area:"Alanya", single:240, double:320, child:112, ticket:310, extra:25 },
      { name:"Royal Alhambra",          stars:5, area:"Alanya", single:282, double:378, child:134, ticket:310, extra:25 },
    ]},
  { key: "sharm_eid", label: "Sharm — Eid", icon: "🤿",
    formula: { style:"plus_five", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 249 JOD",
    hotels: [
      { name:"Tivoli Hotel (S.ALL)",       stars:4, area:"Hadaba",    single:36, double:23, child:11.5, ticket:165, extra:0 },
      { name:"Dive In (S.ALL)",            stars:4, area:"Naama Bay", single:52, double:31, child:15.5, ticket:170, extra:0 },
      { name:"Sharm Bride (S.ALL)",        stars:5, area:"Nabq Bay",  single:58, double:35, child:17.5, ticket:175, extra:0 },
      { name:"Charmillion Aquapark",       stars:5, area:"Nabq Bay",  single:141, double:85, child:42.5, ticket:180, extra:0 },
      { name:"Albatros Palace (S.ALL)",    stars:5, area:"Montazah",  single:185, double:103, child:51.5, ticket:185, extra:0 },
    ]},
  { key: "sharm_reg", label: "Sharm — Regular", icon: "🏝️",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"7n", label:"7 nights", nights:6 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 249 JOD",
    hotels: [
      { name:"Seven Heavens",         stars:3, area:"Hadaba",    single:35, double:20, child:10, ticket:115, extra:0 },
      { name:"Tivoli Hotel",          stars:4, area:"Hadaba",    single:36, double:23, child:11.5, ticket:120, extra:0 },
      { name:"Sharm Bride",           stars:4, area:"Naama Bay", single:60, double:36, child:18, ticket:120, extra:0 },
      { name:"Parrotel Aquapark",     stars:5, area:"Nabq Bay",  single:88, double:53, child:26.5, ticket:120, extra:0 },
      { name:"AA Amwaj Resort",       stars:5, area:"Nabq Bay",  single:106, double:68, child:34, ticket:120, extra:0 },
      { name:"Cleopatra Luxury",      stars:5, area:"Nabq Bay",  single:146, double:88, child:44, ticket:125, extra:0 },
      { name:"Albatros Palace",       stars:5, area:"Montazah",  single:168, double:93, child:46.5, ticket:125, extra:0 },
    ]},
  { key: "hurghada", label: "Hurghada / El Gouna", icon: "☀️",
    formula: { style:"ticket_inside", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
    ],
    childAges: "Transport varies by area (10 JOD Hurghada / 17 JOD Sahl Hasheesh)",
    hotels: [
      { name:"King Tut Aquapark",         stars:4, area:"Hurghada",      single:63,  double:38,  child:20, ticket:200, extra:10 },
      { name:"Sun & Sea Aquapark",        stars:3, area:"Hurghada",      single:104, double:63,  child:32, ticket:220, extra:10 },
      { name:"Gravity Hotel",             stars:5, area:"Sahl Hasheesh", single:113, double:68,  child:36, ticket:220, extra:17 },
      { name:"Tropitel Sahl Hasheesh",    stars:5, area:"Sahl Hasheesh", single:146, double:88,  child:45, ticket:220, extra:17 },
      { name:"Pickalbatros Aqua Vista",   stars:4, area:"Hurghada",      single:174, double:99,  child:50, ticket:220, extra:10 },
      { name:"Pickalbatros Citadel",      stars:5, area:"Sahl Hasheesh", single:223, double:127, child:64, ticket:220, extra:17 },
    ]},
  { key: "trabzon", label: "Trabzon", icon: "🏔️",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"8n", label:"8 nights / 7n", nights:7 },
    ],
    childAges: "Child 6-12 rate applies",
    hotels: [
      { name:"Deryaman Hotel",   stars:3, area:"Trabzon", single:40,  double:40,  child:10, ticket:320, extra:45 },
      { name:"First Joy",        stars:4, area:"Trabzon", single:45,  double:45,  child:15, ticket:330, extra:45 },
      { name:"Aselia / Yildiz",  stars:4, area:"Trabzon", single:55,  double:55,  child:20, ticket:330, extra:45 },
      { name:"Novotel Hotel",    stars:5, area:"Trabzon", single:65,  double:65,  child:22, ticket:330, extra:45 },
      { name:"Grand Zorlu",      stars:5, area:"Trabzon", single:75,  double:75,  child:27, ticket:330, extra:45 },
      { name:"Ramada Plaza",     stars:5, area:"Trabzon", single:110, double:110, child:32, ticket:330, extra:45 },
      { name:"Radisson Blu",     stars:5, area:"Trabzon", single:110, double:110, child:42, ticket:330, extra:45 },
    ]},
  { key: "beirut", label: "Beirut", icon: "🌆",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"7n", label:"7 nights", nights:6 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 260 JOD",
    hotels: [
      { name:"Orient Queen",        stars:4, area:"Hamra",   single:60,  double:60,  child:25, ticket:270, extra:25 },
      { name:"Vanda Hotel & Spa",   stars:3, area:"Jounieh", single:65,  double:65,  child:25, ticket:290, extra:25 },
      { name:"Duroy Hotel",         stars:4, area:"Raouche", single:75,  double:75,  child:30, ticket:300, extra:25 },
      { name:"Plaza Hotel",         stars:4, area:"Hamra",   single:75,  double:75,  child:35, ticket:300, extra:25 },
      { name:"Imperial Hotel",      stars:4, area:"Raouche", single:90,  double:90,  child:25, ticket:300, extra:25 },
      { name:"Le Commodore",        stars:5, area:"Hamra",   single:100, double:100, child:32, ticket:300, extra:25 },
      { name:"Crowne Plaza",        stars:5, area:"Hamra",   single:130, double:130, child:28, ticket:300, extra:25 },
      { name:"Radisson Blu Martinez", stars:5, area:"Beirut", single:166, double:166, child:40, ticket:300, extra:25 },
      { name:"Movenpick Resort",    stars:5, area:"Raouche", single:332, double:300, child:61, ticket:300, extra:25 },
    ]},
  { key: "dubai", label: "Dubai", icon: "🏙️",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"7n", label:"7 nights", nights:6 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 280 JOD",
    hotels: [
      { name:"Alkhoory Executive",     stars:3, area:"Al Wasl",      single:42,  double:42,  child:30, ticket:350, extra:50 },
      { name:"Coral Deira",            stars:4, area:"Deira",        single:80,  double:80,  child:35, ticket:350, extra:50 },
      { name:"Citymax Al Barsha",      stars:3, area:"Al Barsha",    single:85,  double:85,  child:35, ticket:360, extra:50 },
      { name:"Mena Plaza Al Barsha",   stars:4, area:"Al Barsha",    single:90,  double:90,  child:35, ticket:360, extra:50 },
      { name:"Crowne Plaza SZR",       stars:5, area:"Sheikh Zayed", single:110, double:110, child:45, ticket:370, extra:50 },
      { name:"Avani Deira",            stars:5, area:"Deira",        single:120, double:120, child:null, ticket:370, extra:50 },
      { name:"Crowne Plaza Jumeirah",  stars:5, area:"Jumeirah",     single:160, double:160, child:45, ticket:370, extra:50 },
      { name:"Swissotel Al Murooj",    stars:5, area:"Downtown",     single:220, double:220, child:50, ticket:370, extra:50 },
      { name:"Hilton Dubai The Walk",  stars:5, area:"JBR",          single:325, double:325, child:65, ticket:380, extra:60 },
    ]},
  { key: "cairo", label: "Cairo", icon: "🐪",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"7n", label:"7 nights", nights:6 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 110 JOD | Child 2-6: 125 JOD",
    hotels: [
      { name:"Salma Hotel",             stars:3, area:"Cairo", single:46,  double:23,  child:21,  ticket:215, extra:70 },
      { name:"Aracan Pyramids",         stars:3, area:"Cairo", single:40,  double:25,  child:23,  ticket:225, extra:70 },
      { name:"Marwa Palace",            stars:4, area:"Cairo", single:55,  double:32,  child:29,  ticket:235, extra:70 },
      { name:"Cleopatra Hotel",         stars:4, area:"Cairo", single:75,  double:43,  child:41,  ticket:240, extra:70 },
      { name:"Sonesta Cairo",           stars:5, area:"Cairo", single:135, double:75,  child:73,  ticket:240, extra:70 },
      { name:"Hilton Cairo Grand Nile", stars:5, area:"Cairo", single:166, double:83,  child:80,  ticket:240, extra:70 },
      { name:"Sofitel Downtown",        stars:5, area:"Cairo", single:220, double:120, child:118, ticket:240, extra:70 },
    ]},
  { key: "dahab", label: "Dahab", icon: "🐠",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 200 JOD",
    hotels: [
      { name:"Ecotel Dahab",        stars:4, area:"Dahab", single:60,  double:36, child:18,   ticket:170, extra:115 },
      { name:"Retac Qunay",         stars:4, area:"Dahab", single:63,  double:38, child:19,   ticket:180, extra:115 },
      { name:"Tropitel Dahab Oasis",stars:4, area:"Dahab", single:80,  double:48, child:24,   ticket:185, extra:115 },
      { name:"Swiss Inn Dahab",     stars:4, area:"Dahab", single:88,  double:53, child:26.5, ticket:190, extra:115 },
      { name:"Safir Dahab Resort",  stars:5, area:"Dahab", single:104, double:63, child:31.5, ticket:190, extra:115 },
      { name:"Jaz Dahabeya",        stars:4, area:"Dahab", single:101, double:65, child:32.5, ticket:190, extra:115 },
    ]},
  { key: "fethiye", label: "Fethiye", icon: "⛵",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 280 JOD",
    hotels: [
      { name:"Yeniceri City Hotel",   stars:3, area:"Fethiye",  single:72,  double:52,  child:null, ticket:280, extra:57 },
      { name:"Malhun Hotel",          stars:3, area:"Fethiye",  single:62,  double:62,  child:28,   ticket:280, extra:57 },
      { name:"Nevada Hotel & Spa",    stars:3, area:"Fethiye",  single:74,  double:59,  child:34,   ticket:280, extra:57 },
      { name:"Tower Hotel",           stars:3, area:"Oludeniz", single:93,  double:93,  child:37,   ticket:280, extra:57 },
      { name:"Golden Life Blue Green",stars:4, area:"Fethiye",  single:105, double:105, child:53,   ticket:280, extra:57 },
      { name:"Alesta Yacht Hotel",    stars:5, area:"Fethiye",  single:138, double:116, child:51,   ticket:280, extra:57 },
      { name:"Belcekiz Beach Club",   stars:5, area:"Oludeniz", single:220, double:167, child:72,   ticket:280, extra:57 },
      { name:"Liberty Fabay",         stars:5, area:"Fethiye",  single:310, double:310, child:172,  ticket:280, extra:57 },
    ]},
  { key: "marmaris", label: "Marmaris", icon: "🛥️",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 280 JOD",
    hotels: [
      { name:"Reis Maris Hotel",  stars:3, area:"Marmaris", single:38,  double:38,  child:17,  ticket:280, extra:47 },
      { name:"Gold Kaya Hotel",   stars:3, area:"Marmaris", single:53,  double:53,  child:23,  ticket:280, extra:47 },
      { name:"Alkan Hotel",       stars:3, area:"Marmaris", single:66,  double:66,  child:30,  ticket:280, extra:47 },
      { name:"Club Munamar",      stars:4, area:"Icmeler",  single:77,  double:65,  child:35,  ticket:280, extra:47 },
      { name:"Grand Faros",       stars:4, area:"Marmaris", single:93,  double:93,  child:43,  ticket:280, extra:47 },
      { name:"Sun Maris City",    stars:4, area:"Marmaris", single:97,  double:97,  child:44,  ticket:280, extra:47 },
      { name:"Marti Resort Deluxe",stars:5, area:"Icmeler", single:273, double:218, child:123, ticket:280, extra:47 },
      { name:"Elegance Hotel",    stars:5, area:"Marmaris", single:310, double:235, child:140, ticket:280, extra:47 },
    ]},
  { key: "bodrum", label: "Bodrum", icon: "🏛️",
    formula: { style:"standard", multiplier:0.71 },
    durations: [
      { key:"4n", label:"4 nights", nights:3 },
      { key:"5n", label:"5 nights", nights:4 },
      { key:"6n", label:"6 nights", nights:5 },
      { key:"8n", label:"8 nights", nights:7 },
    ],
    childAges: "Child 0-2: 100 JOD | Child 2-6: 280 JOD",
    hotels: [
      { name:"Blue Marin Hotel",      stars:4, area:"Bodrum", single:59,  double:50,  child:28,  ticket:280, extra:57 },
      { name:"Costa Centro",          stars:3, area:"Bodrum", single:60,  double:60,  child:27,  ticket:280, extra:57 },
      { name:"Bodrum Beach Resort",   stars:4, area:"Bodrum", single:73,  double:73,  child:null, ticket:280, extra:57 },
      { name:"Kriss Hotel",           stars:3, area:"Bodrum", single:80,  double:80,  child:36,  ticket:280, extra:57 },
      { name:"Green Port Hotel",      stars:3, area:"Bodrum", single:102, double:102, child:46,  ticket:280, extra:57 },
      { name:"Anadolu Hotel",         stars:4, area:"Bodrum", single:128, double:128, child:58,  ticket:280, extra:57 },
      { name:"Charm Beach Bodrum",    stars:4, area:"Bodrum", single:150, double:150, child:60,  ticket:280, extra:57 },
      { name:"Kairaba Bodrum Imperial",stars:5, area:"Bodrum", single:253, double:253, child:115, ticket:280, extra:57 },
      { name:"Samara",                stars:5, area:"Bodrum", single:314, double:238, child:142, ticket:280, extra:57 },
    ]},
];

function PriceCalculatorTab({ onShowToast }) {
  const [destinations, setDestinations] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [search, setSearch] = useState("");
  const [showFormula, setShowFormula] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await loadCmsData(CALCULATOR_KEY, CALC_DEFAULTS);
      setDestinations(data);
      setActiveKey(data[0]?.key);
    })();
  }, []);

  const save = async (next) => {
    await saveCmsData(CALCULATOR_KEY, next);
    setDestinations(next);
  };

  const updateHotelField = (destKey, idx, field, value, isText) => {
    const next = destinations.map(d => {
      if (d.key !== destKey) return d;
      const hotels = d.hotels.map((h, i) => {
        if (i !== idx) return h;
        if (isText) return { ...h, [field]: value };
        if (value === "" || value == null) return { ...h, [field]: null };
        const num = Number(value);
        return { ...h, [field]: isNaN(num) ? null : num };
      });
      return { ...d, hotels };
    });
    save(next);
  };

  const addHotel = (destKey) => {
    const next = destinations.map(d => d.key !== destKey ? d : {
      ...d, hotels: [...d.hotels, { name:"New Hotel", stars:4, area:"", single:0, double:0, child:0, ticket:0, extra:0 }]
    });
    save(next);
    onShowToast("Hotel added ✓");
  };

  const removeHotel = (destKey, idx) => {
    if (!confirm("Remove this hotel?")) return;
    const next = destinations.map(d => d.key !== destKey ? d : { ...d, hotels: d.hotels.filter((_, i) => i !== idx) });
    save(next);
    onShowToast("Removed.");
  };

  const updateFormula = (destKey, field, value) => {
    const next = destinations.map(d => d.key !== destKey ? d : { ...d, formula: { ...d.formula, [field]: field === "multiplier" ? Number(value) : value } });
    save(next);
  };

  const resetDest = (destKey) => {
    if (!confirm("Reset this destination to default values? You'll lose any edits to this tab.")) return;
    const fresh = CALC_DEFAULTS.find(d => d.key === destKey);
    if (!fresh) return;
    const next = destinations.map(d => d.key === destKey ? JSON.parse(JSON.stringify(fresh)) : d);
    save(next);
    onShowToast("Reset to defaults ✓");
  };

  const exportText = (dest) => {
    let txt = `${dest.label}\n${"=".repeat(60)}\n`;
    dest.hotels.forEach(h => {
      txt += `\n${h.name} (${h.stars}★, ${h.area})\n`;
      txt += `  Base costs: Single=${h.single}, Double=${h.double}, Child=${h.child ?? "—"}, Ticket=${h.ticket}, Extra=${h.extra}\n`;
      const p = computeRowPrices(h, dest);
      dest.durations.forEach(dur => {
        const row = p[dur.key];
        txt += `  ${dur.label.padEnd(20)} → Single: ${row.single ?? "—"}  Double: ${row.double ?? "—"}  Child: ${row.child ?? "—"}\n`;
      });
    });
    txt += `\n\nGenerated ${new Date().toLocaleString()}\n${dest.childAges}\n`;
    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${dest.key}-prices-${new Date().toISOString().slice(0,10)}.txt`;
    a.click(); URL.revokeObjectURL(url);
    onShowToast("Exported ✓");
  };

  if (!destinations) return <div style={{ padding: "3rem", textAlign: "center", color: "var(--mist)" }}>Loading calculator…</div>;

  const active = destinations.find(d => d.key === activeKey) || destinations[0];
  const filtered = search ? active.hotels.filter(h => (h.name||"").toLowerCase().includes(search.toLowerCase()) || (h.area||"").toLowerCase().includes(search.toLowerCase())) : active.hotels;

  return (
    <Fragment>
      <TabHeader
        title="Price Calculator"
        subtitle="Auto-calculates package prices from hotel base costs — same formula as your Excel sheet, no external calculation needed."
        action={
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button className="admin-btn" onClick={() => setShowFormula(!showFormula)}>{showFormula ? "Hide" : "Show"} Formula</button>
            <button className="admin-btn" onClick={() => exportText(active)}>Export TXT</button>
            <button className="admin-btn" style={{ background: "rgba(184,69,31,0.1)", color: "var(--rust)" }} onClick={() => resetDest(activeKey)}>Reset Tab</button>
          </div>
        }
      />

      <div style={{ padding: "1.5rem 2.5rem 2.5rem" }}>
        {showFormula && (
          <div style={{ background: "var(--navy-deep)", color: "var(--cream)", padding: "1.25rem 1.5rem", borderRadius: "6px", marginBottom: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.7 }}>
            <p style={{ color: "var(--gold)", fontWeight: 600, marginBottom: "0.6rem", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.7rem" }}>Formula — {active.label}</p>
            {active.formula.style === "standard" && (
              <div>
                <div><strong>Single:</strong>  (single_rate × nights) × {active.formula.multiplier} + ticket + extra</div>
                <div><strong>Double:</strong>  ((double_rate ÷ 2) × nights) × {active.formula.multiplier} + ticket + extra</div>
                <div><strong>Child:</strong>   (child_rate × nights) × {active.formula.multiplier} + ticket + extra</div>
                <div><strong>Final:</strong>   round to nearest 5 (MROUND)</div>
              </div>
            )}
            {active.formula.style === "ticket_inside" && (
              <div>
                <div><strong>Pattern:</strong> ((rate × nights) + ticket) × {active.formula.multiplier} + extra</div>
                <div style={{ opacity: 0.7, marginTop: "0.3rem" }}>(Hurghada — ticket inside multiplier bracket)</div>
              </div>
            )}
            {active.formula.style === "plus_five" && (
              <div>
                <div><strong>Pattern:</strong> ((rate × nights) + 5) × {active.formula.multiplier} + ticket + extra</div>
                <div style={{ opacity: 0.7, marginTop: "0.3rem" }}>(Eid Sharm — +5 internal adjustment)</div>
              </div>
            )}
            <div style={{ marginTop: "0.9rem", paddingTop: "0.9rem", borderTop: "1px solid rgba(245,237,224,0.15)", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
              <span style={{ opacity: 0.7 }}>Multiplier:</span>
              <input type="number" step="0.01" value={active.formula.multiplier} onChange={e => updateFormula(activeKey, "multiplier", e.target.value)} style={{ width: "80px", padding: "0.4rem 0.6rem", background: "rgba(245,237,224,0.1)", border: "1px solid rgba(245,237,224,0.2)", color: "var(--cream)", borderRadius: "4px", fontFamily: "var(--font-mono)" }} />
              <span style={{ opacity: 0.7, marginLeft: "0.5rem" }}>Style:</span>
              <select value={active.formula.style} onChange={e => updateFormula(activeKey, "style", e.target.value)} style={{ padding: "0.4rem 0.6rem", background: "rgba(245,237,224,0.1)", border: "1px solid rgba(245,237,224,0.2)", color: "var(--cream)", borderRadius: "4px" }}>
                <option value="standard">standard</option>
                <option value="ticket_inside">ticket_inside</option>
                <option value="plus_five">plus_five</option>
              </select>
            </div>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid var(--line)" }}>
          {destinations.map(d => (
            <button key={d.key} onClick={() => { setActiveKey(d.key); setSearch(""); }} style={{
              padding: "0.55rem 0.9rem",
              borderRadius: "999px",
              border: "1px solid " + (activeKey === d.key ? "var(--navy)" : "var(--line-med)"),
              background: activeKey === d.key ? "var(--navy)" : "var(--bone)",
              color: activeKey === d.key ? "var(--gold)" : "var(--navy)",
              fontSize: "0.78rem",
              fontWeight: activeKey === d.key ? 600 : 500,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "all 0.2s",
            }}>
              <span>{d.icon}</span> {d.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 500 }}>{active.icon} {active.label}</h4>
            <p style={{ fontSize: "0.78rem", opacity: 0.6, marginTop: "0.2rem" }}>{active.childAges}</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input type="search" placeholder="Search hotel or area…" value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "0.5rem 0.8rem", border: "1px solid var(--line-med)", borderRadius: "4px", fontSize: "0.85rem", background: "var(--bone)", minWidth: "220px" }} />
            <button className="admin-btn" onClick={() => addHotel(activeKey)}>+ Add Hotel</button>
          </div>
        </div>

        <div style={{ overflowX: "auto", background: "var(--bone)", border: "1px solid var(--line)", borderRadius: "6px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem", minWidth: "1400px" }}>
            <thead>
              <tr style={{ background: "var(--navy)", color: "var(--cream)" }}>
                <th style={{ padding: "0.7rem 0.6rem", textAlign: "left", minWidth: "190px", borderRight: "1px solid rgba(245,237,224,0.15)" }}>Hotel</th>
                <th style={{ padding: "0.7rem 0.4rem", width: "50px" }}>★</th>
                <th style={{ padding: "0.7rem 0.4rem", minWidth: "95px" }}>Area</th>
                <th style={{ padding: "0.7rem 0.4rem", width: "70px", background: "var(--navy-mid)", borderLeft: "2px solid var(--gold)" }}>Single</th>
                <th style={{ padding: "0.7rem 0.4rem", width: "70px", background: "var(--navy-mid)" }}>Double</th>
                <th style={{ padding: "0.7rem 0.4rem", width: "70px", background: "var(--navy-mid)" }}>Child</th>
                <th style={{ padding: "0.7rem 0.4rem", width: "75px", background: "var(--navy-mid)" }}>Ticket</th>
                <th style={{ padding: "0.7rem 0.4rem", width: "65px", background: "var(--navy-mid)", borderRight: "2px solid var(--gold)" }}>Extra</th>
                {active.durations.map(dur => (
                  <th key={dur.key} colSpan={3} style={{ padding: "0.5rem 0.4rem", borderLeft: "1px solid rgba(245,237,224,0.15)", fontSize: "0.72rem" }}>
                    <div style={{ color: "var(--gold)", marginBottom: "0.2rem" }}>{dur.label}</div>
                    <div style={{ display: "flex", justifyContent: "space-around", fontSize: "0.65rem", opacity: 0.7, fontWeight: 400 }}>
                      <span>S</span><span>D</span><span>C</span>
                    </div>
                  </th>
                ))}
                <th style={{ padding: "0.7rem 0.4rem", width: "40px" }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((hotel) => {
                const idx = active.hotels.indexOf(hotel);
                const prices = computeRowPrices(hotel, active);
                return (
                  <tr key={idx} style={{ borderBottom: "1px solid var(--line)", background: idx % 2 === 0 ? "var(--bone)" : "var(--cream)" }}>
                    <td style={{ padding: "0.4rem 0.6rem", borderRight: "1px solid var(--line)" }}>
                      <input type="text" value={hotel.name||""} onChange={e => updateHotelField(activeKey, idx, "name", e.target.value, true)} style={calcInputStyle({ width: "175px", fontWeight: 500, textAlign: "left" })} />
                    </td>
                    <td style={{ padding: "0.4rem" }}>
                      <input type="number" value={hotel.stars ?? ""} onChange={e => updateHotelField(activeKey, idx, "stars", e.target.value)} style={calcInputStyle({ width: "40px" })} />
                    </td>
                    <td style={{ padding: "0.4rem" }}>
                      <input type="text" value={hotel.area||""} onChange={e => updateHotelField(activeKey, idx, "area", e.target.value, true)} style={calcInputStyle({ width: "85px", textAlign: "left" })} />
                    </td>
                    <td style={{ padding: "0.4rem", background: "rgba(244,196,48,0.06)", borderLeft: "2px solid var(--gold)" }}>
                      <input type="number" step="0.01" value={hotel.single ?? ""} onChange={e => updateHotelField(activeKey, idx, "single", e.target.value)} style={calcInputStyle({ width: "60px", background: "var(--bone)" })} />
                    </td>
                    <td style={{ padding: "0.4rem", background: "rgba(244,196,48,0.06)" }}>
                      <input type="number" step="0.01" value={hotel.double ?? ""} onChange={e => updateHotelField(activeKey, idx, "double", e.target.value)} style={calcInputStyle({ width: "60px", background: "var(--bone)" })} />
                    </td>
                    <td style={{ padding: "0.4rem", background: "rgba(244,196,48,0.06)" }}>
                      <input type="number" step="0.01" value={hotel.child ?? ""} onChange={e => updateHotelField(activeKey, idx, "child", e.target.value)} style={calcInputStyle({ width: "60px", background: "var(--bone)" })} />
                    </td>
                    <td style={{ padding: "0.4rem", background: "rgba(244,196,48,0.06)" }}>
                      <input type="number" step="0.01" value={hotel.ticket ?? ""} onChange={e => updateHotelField(activeKey, idx, "ticket", e.target.value)} style={calcInputStyle({ width: "65px", background: "var(--bone)" })} />
                    </td>
                    <td style={{ padding: "0.4rem", background: "rgba(244,196,48,0.06)", borderRight: "2px solid var(--gold)" }}>
                      <input type="number" step="0.01" value={hotel.extra ?? ""} onChange={e => updateHotelField(activeKey, idx, "extra", e.target.value)} style={calcInputStyle({ width: "55px", background: "var(--bone)" })} />
                    </td>
                    {active.durations.map(dur => {
                      const p = prices[dur.key];
                      return (
                        <Fragment key={dur.key}>
                          <td style={calcPriceCell()}>{p.single ?? "—"}</td>
                          <td style={calcPriceCell("strong")}>{p.double ?? "—"}</td>
                          <td style={calcPriceCell()}>{p.child ?? "—"}</td>
                        </Fragment>
                      );
                    })}
                    <td style={{ padding: "0.4rem", textAlign: "center" }}>
                      <button onClick={() => removeHotel(activeKey, idx)} title="Remove" style={{ background: "transparent", color: "var(--rust)", border: "none", cursor: "pointer", fontSize: "1rem", padding: "0.2rem 0.4rem" }}>✕</button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={9 + active.durations.length * 3} style={{ padding: "2rem", textAlign: "center", color: "var(--mist)" }}>No hotels match "{search}".</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "1.25rem", padding: "1rem 1.25rem", background: "var(--bone)", border: "1px solid var(--line)", borderRadius: "6px", display: "flex", gap: "2rem", flexWrap: "wrap", fontSize: "0.78rem" }}>
          <div><strong style={{ color: "var(--gold-warm)" }}>Yellow columns</strong> = your editable base costs</div>
          <div><strong>S / D / C</strong> = Single / Double (per person) / Child — auto-calculated</div>
          <div><strong>Currency:</strong> JOD · all prices rounded to nearest 5</div>
          <div style={{ opacity: 0.7 }}>Auto-saves as you type.</div>
        </div>
      </div>
    </Fragment>
  );
}

function calcInputStyle(extra) {
  return {
    padding: "0.35rem 0.4rem",
    border: "1px solid var(--line)",
    borderRadius: "3px",
    fontSize: "0.78rem",
    fontFamily: "var(--font-mono)",
    background: "var(--cream)",
    color: "var(--navy)",
    textAlign: "center",
    ...extra,
  };
}

function calcPriceCell(kind) {
  return {
    padding: "0.55rem 0.3rem",
    textAlign: "center",
    fontFamily: "var(--font-mono)",
    fontSize: kind === "strong" ? "0.82rem" : "0.75rem",
    fontWeight: kind === "strong" ? 700 : 600,
    color: "var(--navy)",
    background: kind === "strong" ? "rgba(14,31,61,0.08)" : "rgba(14,31,61,0.03)",
    borderLeft: "1px solid var(--line)",
  };
}



/* ════════════════════════════════════════════════════════════
   AD STUDIO TAB — Ad Studio fully embedded as base64 blob
   ════════════════════════════════════════════════════════════ */

function AdStudioTab() {
  const [pendingExport, setPendingExport] = useState(null);
  const [publishing, setPublishing] = useState(null);
  const [copied, setCopied] = useState(false);
  const [savedUrl, setSavedUrl] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.data && e.data.type === 'adstudio_export') {
        setPendingExport({ dataUrl: e.data.dataUrl, filename: e.data.filename });
        setPublishing(null);
        setCopied(false);
        setSavedUrl(null);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const dataUrlToBlob = (dataUrl) => {
    const [header, b64] = dataUrl.split(',');
    const mime = header.match(/:(.*?);/)[1];
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    return new Blob([bytes], { type: mime });
  };

  const triggerDownload = (dataUrl, filename) => {
    // Large PNG data: URLs can be rejected by browsers; download via an
    // object URL (Blob) instead, which has no length limit.
    try {
      const blob = dataUrlToBlob(dataUrl);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || 'million-ad.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch (e) {
      // Last-resort: open the image in a new tab so the user can save it.
      try {
        const w = window.open();
        if (w) w.document.write('<img src="' + dataUrl + '" style="max-width:100%">');
        else alert('Download blocked by the browser. Please allow pop-ups and retry.');
      } catch (_) {
        alert('Download failed: ' + (e.message || e));
      }
    }
  };

  const copyImageToClipboard = async (dataUrl) => {
    try {
      const blob = dataUrlToBlob(dataUrl);
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch(e) { await navigator.clipboard.writeText(dataUrl); }
  };

  const handleSaveToCloud = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/save-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrl: pendingExport.dataUrl, filename: pendingExport.filename }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setSavedUrl(data.url);
    } catch(e) {
      alert('Could not save to cloud: ' + e.message);
    }
    setSaving(false);
  };

  const handlePublish = async (platform) => {
    setPublishing(platform);
    setCopied(false);
    try {
      const blob = dataUrlToBlob(pendingExport.dataUrl);
      const file = new File([blob], pendingExport.filename, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Million Travel Ad' });
        setPendingExport(null);
      } else {
        await copyImageToClipboard(pendingExport.dataUrl);
        setCopied(true);
        const urls = { facebook: 'https://www.facebook.com/', instagram: 'https://www.instagram.com/' };
        setTimeout(() => window.open(urls[platform], '_blank'), 700);
      }
    } catch(e) { if (e.name !== 'AbortError') alert('Could not share: ' + e.message); }
    setPublishing(null);
  };

  return (
    <Fragment>
      <TabHeader
        title="Ad Studio"
        subtitle="Design promotional visuals — then publish directly to Facebook or Instagram, or download."
      />
      <div style={{ position: "relative", background: "var(--bone)" }}>
        <iframe src="/ad-studio.html"
            style={{ width: "100%", height: "calc(100vh - 118px)", border: "none", display: "block" }}
            title="Million Travel Ad Studio"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads allow-modals"
          />

        {pendingExport && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(10,20,40,0.78)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
            <div style={{ background: "var(--cream)", borderRadius: "10px", padding: "2rem", maxWidth: "480px", width: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.45)" }}>
              <div style={{ borderRadius: "6px", overflow: "hidden", marginBottom: "1.5rem", border: "1px solid var(--line)", lineHeight: 0 }}>
                <img src={pendingExport.dataUrl} alt="Ad preview" style={{ width: "100%", display: "block" }} />
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 500, marginBottom: "0.3rem" }}>Ready to publish</h3>
              <p style={{ fontSize: "0.82rem", color: "var(--mist)", marginBottom: "1.5rem" }}>
                {copied ? "✓ Image copied to clipboard — paste it into your post." : "Choose a platform, save to device, or upload to cloud."}
              </p>

              {savedUrl && (
                <div style={{ padding: "0.75rem 1rem", background: "rgba(14,31,61,0.06)", borderRadius: "5px", fontSize: "0.78rem", marginBottom: "1rem", border: "1px solid var(--line)", wordBreak: "break-all" }}>
                  <strong>Saved to cloud:</strong>{" "}
                  <a href={savedUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--navy)", textDecoration: "underline" }}>{savedUrl}</a>
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <button onClick={() => handlePublish('facebook')} disabled={!!publishing}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.25rem", background: "#1877F2", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", opacity: publishing === 'facebook' ? 0.7 : 1 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  {publishing === 'facebook' ? 'Opening Facebook…' : 'Publish to Facebook'}
                </button>
                <button onClick={() => handlePublish('instagram')} disabled={!!publishing}
                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1.25rem", background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", color: "#fff", border: "none", borderRadius: "6px", fontSize: "0.95rem", fontWeight: 600, cursor: "pointer", opacity: publishing === 'instagram' ? 0.7 : 1 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  {publishing === 'instagram' ? 'Opening Instagram…' : 'Publish to Instagram'}
                </button>
              </div>

              {copied && (
                <div style={{ padding: "0.7rem 1rem", background: "rgba(14,31,61,0.06)", borderRadius: "5px", fontSize: "0.78rem", marginBottom: "1rem", border: "1px solid var(--line)" }}>
                  <strong>Desktop:</strong> Image copied — open the platform, create a new post, and paste (Ctrl+V / Cmd+V).
                </div>
              )}

              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end", flexWrap: "wrap" }}>
                <button onClick={() => setPendingExport(null)}
                  style={{ padding: "0.6rem 1rem", background: "transparent", border: "1px solid var(--line-med)", color: "var(--navy)", borderRadius: "5px", fontSize: "0.85rem", cursor: "pointer" }}>
                  Close
                </button>
                <button onClick={handleSaveToCloud} disabled={saving || !!savedUrl}
                  style={{ padding: "0.6rem 1rem", background: savedUrl ? "var(--gold-soft)" : "var(--navy-mid)", color: savedUrl ? "var(--navy)" : "var(--cream)", border: "none", borderRadius: "5px", fontSize: "0.85rem", fontWeight: 600, cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}>
                  {saving ? "Saving…" : savedUrl ? "☁ Saved" : "☁ Save to Cloud"}
                </button>
                <button onClick={() => { triggerDownload(pendingExport.dataUrl, pendingExport.filename); setTimeout(() => setPendingExport(null), 300); }}
                  style={{ padding: "0.6rem 1rem", background: "var(--navy)", color: "var(--gold)", border: "none", borderRadius: "5px", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer" }}>
                  ↓ Download PNG
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}




function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState(""); const [err, setErr] = useState("");
  const handle = async (e) => {
    e.preventDefault();
    const settings = await loadCmsData(SETTINGS_KEY, DEFAULT_SETTINGS);
    if (pw === (settings.adminPassword || DEFAULT_SETTINGS.adminPassword)) onLogin();
    else setErr("Wrong password.");
  };
  return (
    <div className="login-shell">
      <div className="login-card">
        <div className="logo-block"><span className="badge-mini">M</span><span className="word">MILLION</span></div>
        <h2>CMS Access</h2>
        <p>Sign in to manage content, SEO, photos and packages.</p>
        <form onSubmit={handle}>
          <div className="form-group"><label>Password</label><input type="password" className="form-control" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus /></div>
          {err && <p style={{ color: "var(--rust)", fontSize: "0.85rem", marginBottom: "1rem" }}>{err}</p>}
          <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Enter CMS →</button>
        </form>
        <p style={{ marginTop: "1rem", fontSize: "0.8rem" }}><a href="#/" onClick={(e) => { e.preventDefault(); navigate("/"); }} style={{ textDecoration: "underline", opacity: 0.7 }}>← Back to site</a></p>
      </div>
    </div>
  );
}

function AdminPanel({ packages, onUpdate, onShowToast }) {
  const [tab, setTab] = useState("packages");
  const [seo, setSeo] = useState(null); const [settings, setSettings] = useState(null); const [sections, setSections] = useState(null); const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const [s, st, sec] = await Promise.all([loadCmsData(SEO_KEY, DEFAULT_SEO), loadCmsData(SETTINGS_KEY, DEFAULT_SETTINGS), loadCmsData(SECTIONS_KEY, DEFAULT_SECTIONS)]);
      setSeo(s); setSettings(st); setSections(sec); setLoaded(true);
    })();
  }, []);
  const saveSeo = async (d) => { await saveCmsData(SEO_KEY, d); setSeo(d); onShowToast("SEO saved ✓"); };
  const saveSettings = async (d) => { await saveCmsData(SETTINGS_KEY, d); setSettings(d); onShowToast("Settings saved ✓"); };
  const saveSections = async (d) => { await saveCmsData(SECTIONS_KEY, d); setSections(d); onShowToast("Sections saved ✓"); };
  const TABS = [
    { id: "packages", icon: "📦", label: "Packages" },
    { id: "calculator", icon: "🧮", label: "Price Calculator" },
    { id: "ad-studio", icon: "🎨", label: "Ad Studio" },
    { id: "seo", icon: "🔍", label: "SEO & Meta" },
    { id: "photos", icon: "🖼", label: "Photos" },
    { id: "sections", icon: "➕", label: "Sections" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];
  if (!loaded) return <div style={{ minHeight: "100vh", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cream)", fontFamily: "var(--font-display)", fontSize: "1.2rem", fontStyle: "italic" }}>Loading CMS…</div>;
  return (
    <div className="admin-shell">
      <div className="admin-bar">
        <h2><span className="badge-mini">M</span> Million CMS <span className="tag">v3</span></h2>
        <div className="admin-actions"><button className="admin-btn" onClick={() => navigate("/")}>← View Site</button></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "calc(100vh - 60px)" }}>
        <div style={{ background: "var(--navy-deep)", padding: "1.5rem 0", borderRight: "1px solid var(--line-dark)" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: "0.75rem", width: "100%", padding: "0.9rem 1.5rem", background: tab === t.id ? "rgba(244,196,48,0.12)" : "transparent", color: tab === t.id ? "var(--gold)" : "rgba(245, 237, 224,0.7)", borderLeft: tab === t.id ? "3px solid var(--gold)" : "3px solid transparent", fontSize: "0.82rem", letterSpacing: "0.05em", fontWeight: tab === t.id ? 600 : 400, transition: "all 0.2s", textAlign: "left" }}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
          <div style={{ margin: "1.5rem", borderTop: "1px solid var(--line-dark)", paddingTop: "1.5rem" }}>
            <p style={{ fontSize: "0.7rem", color: "rgba(245, 237, 224,0.4)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Stats</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(245, 237, 224,0.7)" }}>{packages.length} packages</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(245, 237, 224,0.7)", marginTop: "0.3rem" }}>{Object.keys(DESTINATIONS).length} destinations</p>
            <p style={{ fontSize: "0.8rem", color: "rgba(245, 237, 224,0.7)", marginTop: "0.3rem" }}>{(sections||[]).filter(s => s.enabled).length} active sections</p>
          </div>
        </div>
        <div style={{ background: "var(--cream)", overflowY: "auto" }}>
          {tab === "packages" && <PackagesTab packages={packages} onUpdate={onUpdate} onShowToast={onShowToast} />}
          {tab === "calculator" && <PriceCalculatorTab onShowToast={onShowToast} />}
          {tab === "ad-studio" && <AdStudioTab />}
          {tab === "seo"      && <SeoTab seo={seo} onSave={saveSeo} />}
          {tab === "photos"   && <PhotosTab settings={settings} onSave={saveSettings} />}
          {tab === "sections" && <SectionsTab sections={sections} onSave={saveSections} />}
          {tab === "settings" && <SettingsTab settings={settings} onSave={saveSettings} />}
        </div>
      </div>
    </div>
  );
}

function TabHeader({ title, subtitle, action }) {
  return (
    <div style={{ padding: "2rem 2.5rem 1.5rem", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
      <div><h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 500, letterSpacing: "-0.02em" }}>{title}</h3>{subtitle && <p style={{ fontSize: "0.9rem", opacity: 0.6, marginTop: "0.25rem" }}>{subtitle}</p>}</div>
      {action}
    </div>
  );
}

function CmsCard({ title, children, style }) {
  return (
    <div style={{ background: "var(--bone)", border: "1px solid var(--line)", borderRadius: "6px", marginBottom: "1.5rem", overflow: "hidden", ...style }}>
      {title && <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid var(--line)", fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 500, background: "var(--cream)" }}>{title}</div>}
      <div style={{ padding: "1.5rem" }}>{children}</div>
    </div>
  );
}

function PackagesTab({ packages, onUpdate, onShowToast }) {
  const [filter, setFilter] = useState("all"); const [editing, setEditing] = useState(null); const [creating, setCreating] = useState(false);
  const filtered = filter === "all" ? packages : packages.filter(p => p.category === filter);
  const handleSave = async (pkg) => {
    let next = creating ? [...packages, { ...pkg, id: pkg.id || `pkg-${Date.now()}` }] : packages.map(p => p.id === pkg.id ? pkg : p);
    await savePackages(next); onUpdate(next); setEditing(null); setCreating(false);
    onShowToast(creating ? "Package created ✓" : "Package saved ✓");
  };
  const handleDelete = async (id) => {
    if (!confirm("Delete this package?")) return;
    const next = packages.filter(p => p.id !== id); await savePackages(next); onUpdate(next); onShowToast("Deleted.");
  };
  const handleReset = async () => {
    if (!confirm("Reset all packages to seed data?")) return;
    const fresh = await resetPackages(); onUpdate(fresh); onShowToast("Reset to seed.");
  };
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(packages, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `million-packages-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url); onShowToast("Exported ✓");
  };
  const handleNew = () => {
    setEditing({ id: "", category: "outbound", title: "", titleAr: "", subtitle: "", heroImage: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=85&fit=crop", cardImage: "", country: "", duration: "", transport: "", priceFrom: 0, currency: "JOD", description: "", destination: "", includes: [], excludes: [], notes: "", hotels: [] });
    setCreating(true);
  };
  return (
    <div>
      <TabHeader title="Packages" subtitle={`${packages.length} packages total`} action={<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}><button className="admin-btn" onClick={handleExport}>↓ Export</button><button className="admin-btn danger" onClick={handleReset}>Reset seed</button><button className="admin-btn primary" onClick={handleNew}>+ New Package</button></div>} />
      <div style={{ padding: "1.5rem 2.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          {[["all", `All (${packages.length})`], ...Object.entries(CATEGORIES).map(([k,c]) => [k, `${c.en} (${packages.filter(p=>p.category===k).length})`])].map(([k,l]) => (
            <button key={k} onClick={() => setFilter(k)} style={{ padding: "0.4rem 1rem", borderRadius: "999px", border: "1px solid var(--line)", background: filter===k ? "var(--navy)" : "transparent", color: filter===k ? "var(--cream)" : "var(--navy)", fontSize: "0.8rem", fontWeight: 500, transition: "all 0.2s" }}>{l}</button>
          ))}
        </div>
        <table className="admin-table">
          <thead><tr><th style={{width:44}}>Img</th><th>Title</th><th>Category</th><th>Country</th><th>Price</th><th>Hotels</th><th>PDF</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan="7" style={{ textAlign: "center", padding: "3rem", opacity: 0.5 }}>No packages.</td></tr>}
            {filtered.map(p => (
              <tr key={p.id}>
                <td><div style={{ width: 40, height: 40, borderRadius: 4, backgroundImage: `url(${p.cardImage || p.heroImage})`, backgroundSize: "cover", backgroundPosition: "center", background: "var(--navy)" }}></div></td>
                <td><strong>{p.title}</strong><br/><span style={{ opacity: 0.5, fontSize: "0.78rem" }}>{(p.subtitle||"").slice(0,48)}{(p.subtitle||"").length>48?"…":""}</span></td>
                <td><span className="admin-cat-pill">{CATEGORIES[p.category]?.en || p.category}</span></td>
                <td>{p.country}</td>
                <td style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>{p.priceFrom} {p.currency}</td>
                <td>{p.hotels?.length || 0}</td><td>{p.pdfBrochure?.data ? <span title="PDF attached" style={{color:"var(--rust)",fontSize:"1.1rem"}}>📄</span> : <span style={{opacity:0.3,fontSize:"0.75rem"}}>—</span>}</td>
                <td><div className="row-actions"><button onClick={() => setEditing({ ...p })}>✏ Edit</button><button onClick={() => window.open(`#/offers/${p.category}/${p.id}`, "_blank")}>👁</button><button className="del" onClick={() => handleDelete(p.id)}>✕</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editing && <PackageEditor pkg={editing} isNew={creating} onSave={handleSave} onCancel={() => { setEditing(null); setCreating(false); }} />}
    </div>
  );
}

function SeoTab({ seo, onSave }) {
  const [form, setForm] = useState({ ...DEFAULT_SEO, ...seo });
  const u = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const score = [form.siteTitle, form.metaDescription, form.ogImage, form.keywords, form.canonicalUrl].filter(Boolean).length;
  return (
    <div>
      <TabHeader title="SEO & Meta Tags" subtitle="Control how your site appears in Google, social media and search results" />
      <div style={{ padding: "2rem 2.5rem" }}>
        <CmsCard title="SEO Health Score">
          <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", width: 80, height: 80 }}>
              <svg viewBox="0 0 36 36" style={{ width: 80, height: 80, transform: "rotate(-90deg)" }}>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--line)" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none" stroke={score >= 4 ? "#22c55e" : score >= 3 ? "var(--gold)" : "var(--rust)"} strokeWidth="3" strokeDasharray={`${score/5*100} 100`} strokeLinecap="round"/>
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 600 }}>{score*20}%</div>
            </div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", marginBottom: "0.3rem" }}>{score >= 5 ? "Excellent" : score >= 4 ? "Good" : score >= 3 ? "Fair" : "Needs work"}</p>
              <p style={{ fontSize: "0.82rem", opacity: 0.65 }}>{5-score} field{5-score!==1?"s":""} missing</p>
            </div>
            {[["Page Title", !!form.siteTitle],["Meta Description",!!form.metaDescription],["OG Image",!!form.ogImage],["Keywords",!!form.keywords],["Canonical URL",!!form.canonicalUrl]].map(([label,ok]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem" }}>
                <span style={{ color: ok ? "#22c55e" : "var(--rust)" }}>{ok ? "✓" : "✕"}</span> <span style={{ opacity: ok ? 1 : 0.55 }}>{label}</span>
              </div>
            ))}
          </div>
        </CmsCard>
        <CmsCard title="Google Search Preview">
          <div style={{ background: "white", padding: "1.25rem", borderRadius: "6px", border: "1px solid #dadce0", fontFamily: "Arial,sans-serif", maxWidth: 600 }}>
            <div style={{ fontSize: "0.78rem", color: "#5f6368", marginBottom: "0.2rem" }}>{form.canonicalUrl || "https://millionjo.com"}</div>
            <div style={{ fontSize: "1.1rem", color: "#1a0dab", marginBottom: "0.2rem" }}>{form.siteTitle || "Page Title"}</div>
            <div style={{ fontSize: "0.85rem", color: "#4d5156", lineHeight: 1.5 }}>{(form.metaDescription||"").slice(0,155)}{(form.metaDescription||"").length>155?"…":""}</div>
          </div>
          <p style={{ fontSize: "0.75rem", opacity: 0.5, marginTop: "0.6rem" }}>Title: {form.siteTitle.length}/60 · Description: {form.metaDescription.length}/155</p>
        </CmsCard>
        <CmsCard title="Social Share Preview">
          <div style={{ background: "#f0f2f5", padding: "0.75rem", borderRadius: "6px", maxWidth: 440 }}>
            {form.ogImage && <div style={{ width: "100%", aspectRatio: "1.91", backgroundImage: `url(${form.ogImage})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "4px 4px 0 0" }}></div>}
            <div style={{ background: "white", padding: "0.75rem 1rem", borderRadius: "0 0 4px 4px", borderTop: "1px solid #ccc" }}>
              <div style={{ fontSize: "0.7rem", color: "#606770", textTransform: "uppercase" }}>{(form.canonicalUrl||"").replace("https://","")}</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1d2129" }}>{form.ogTitle||form.siteTitle}</div>
              <div style={{ fontSize: "0.82rem", color: "#606770" }}>{form.ogDescription||form.metaDescription}</div>
            </div>
          </div>
        </CmsCard>
        <CmsCard title="Page Identity">
          <div className="form-group"><label>Page Title (≤60 chars)</label><input className="form-control" value={form.siteTitle} onChange={e => u("siteTitle", e.target.value)} maxLength={70}/><div style={{fontSize:"0.72rem",opacity:0.5,marginTop:"0.25rem",textAlign:"right"}}>{form.siteTitle.length}/60</div></div>
          <div className="form-group"><label>Meta Description (≤155 chars)</label><textarea className="form-control" rows="3" value={form.metaDescription} onChange={e => u("metaDescription", e.target.value)}/><div style={{fontSize:"0.72rem",opacity:0.5,marginTop:"0.25rem",textAlign:"right"}}>{form.metaDescription.length}/155</div></div>
          <div className="form-group"><label>Canonical URL</label><input className="form-control" value={form.canonicalUrl} onChange={e => u("canonicalUrl", e.target.value)} placeholder="https://millionjo.com"/></div>
          <div className="form-group"><label>Keywords (comma-separated)</label><textarea className="form-control" rows="2" value={form.keywords} onChange={e => u("keywords", e.target.value)}/></div>
          <div className="form-row">
            <div className="form-group"><label>Robots</label><select className="form-control" value={form.robots} onChange={e => u("robots", e.target.value)}><option value="index, follow">index, follow (recommended)</option><option value="noindex, follow">noindex, follow</option><option value="noindex, nofollow">noindex, nofollow</option></select></div>
            <div className="form-group"><label>Twitter Card</label><select className="form-control" value={form.twitterCard} onChange={e => u("twitterCard", e.target.value)}><option value="summary_large_image">summary_large_image</option><option value="summary">summary</option></select></div>
          </div>
        </CmsCard>
        <CmsCard title="Open Graph (Facebook / WhatsApp)">
          <div className="form-row">
            <div className="form-group"><label>OG Title</label><input className="form-control" value={form.ogTitle} onChange={e => u("ogTitle", e.target.value)}/></div>
            <div className="form-group"><label>OG Description</label><input className="form-control" value={form.ogDescription} onChange={e => u("ogDescription", e.target.value)}/></div>
          </div>
          <div className="form-group"><label>OG Image URL (1200×630px ideal)</label><input className="form-control" value={form.ogImage} onChange={e => u("ogImage", e.target.value)}/>{form.ogImage && <div style={{ marginTop: "0.5rem", height: 70, borderRadius: 4, backgroundImage: `url(${form.ogImage})`, backgroundSize: "cover" }}></div>}</div>
          <label style={{ display:"flex", alignItems:"center", gap:"0.6rem", fontWeight:400, textTransform:"none", letterSpacing:0, fontSize:"0.9rem", cursor:"pointer" }}>
            <input type="checkbox" checked={form.schemaOrg} onChange={e => u("schemaOrg", e.target.checked)} style={{width:16,height:16}}/> Include Schema.org JSON-LD (TravelAgency structured data)
          </label>
        </CmsCard>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button className="admin-btn" onClick={() => setForm({ ...DEFAULT_SEO })}>Reset defaults</button>
          <button className="admin-btn primary" onClick={() => onSave(form)}>Save SEO →</button>
        </div>
      </div>
    </div>
  );
}

function PhotosTab({ settings, onSave }) {
  const [form, setForm] = useState({ ...DEFAULT_SETTINGS, ...settings });
  const u = (f, v) => setForm(p => ({ ...p, [f]: v }));
  const FIELDS = [
    { key: "heroPhoto", label: "Home Hero Background", desc: "Full-screen background image on the home page", aspect: "21/7" },
    { key: "aboutPhoto", label: "About Page Hero", desc: "Background on the About page banner", aspect: "21/7" },
    { key: "galleryPhoto", label: "Gallery Page Hero", desc: "Background on the Gallery page banner", aspect: "21/7" },
    { key: "contactPhoto", label: "Contact Page Hero", desc: "Background on the Contact page banner", aspect: "21/7" },
    { key: "destinationsPhoto", label: "Destinations Page Hero", desc: "Background on the Destinations listing banner", aspect: "21/7" },
    { key: "ogImage", label: "Social Share Image (OG)", desc: "Shown when sharing on Facebook, WhatsApp, LinkedIn — 1200×630px", aspect: "1.91/1" },
  ];
  const PICKS = {
    heroPhoto: [
      { l: "Night traveler", u: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1800&q=85&fit=crop" },
      { l: "Istanbul dusk", u: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1800&q=85&fit=crop" },
      { l: "Cappadocia balloons", u: "https://images.unsplash.com/photo-1603202662747-00e33e7d1468?w=1800&q=85&fit=crop" },
      { l: "Desert dunes", u: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=1800&q=85&fit=crop" },
    ],
    aboutPhoto: [
      { l: "Road journey", u: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&fit=crop" },
      { l: "Explorer", u: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=85&fit=crop" },
    ],
    galleryPhoto: [
      { l: "World map", u: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop" },
      { l: "Camera", u: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=1600&q=85&fit=crop" },
    ],
    contactPhoto: [
      { l: "Road journey", u: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=85&fit=crop" },
      { l: "World map", u: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop" },
    ],
    destinationsPhoto: [
      { l: "World map", u: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=85&fit=crop" },
      { l: "Night traveler", u: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=85&fit=crop" },
    ],
    ogImage: [
      { l: "Explorer", u: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200&q=80&fit=crop" },
      { l: "Istanbul", u: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80&fit=crop" },
      { l: "Pyramids", u: "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=1200&q=80&fit=crop" },
    ],
  };
  return (
    <div>
      <TabHeader title="Photo Management" subtitle="Update background photos for every page and section" />
      <div style={{ padding: "2rem 2.5rem" }}>
        <div style={{ background: "rgba(244,196,48,0.1)", border: "1px solid rgba(244,196,48,0.4)", borderRadius: 6, padding: "0.85rem 1rem", marginBottom: "2rem", fontSize: "0.85rem", display: "flex", gap: "0.6rem" }}>
          <span>💡</span><span>Paste any Unsplash URL or image link. Get free photos at <strong>unsplash.com</strong> — right-click any photo and copy image address, or use the quick picks below.</span>
        </div>
        {FIELDS.map(f => (
          <CmsCard key={f.key} title={f.label}>
            <p style={{ fontSize: "0.83rem", opacity: 0.6, marginBottom: "0.75rem" }}>{f.desc}</p>
            {form[f.key] && <div style={{ width: "100%", aspectRatio: f.aspect, backgroundImage: `url(${form[f.key]})`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: 4, marginBottom: "0.75rem", border: "1px solid var(--line)" }}></div>}
            <input className="form-control" value={form[f.key]||""} onChange={e => u(f.key, e.target.value)} placeholder="https://images.unsplash.com/..." />
            {PICKS[f.key] && <div style={{ marginTop: "0.75rem" }}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.5, marginBottom: "0.5rem" }}>Quick picks</p>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {PICKS[f.key].map((s, i) => (
                  <button key={i} onClick={() => u(f.key, s.u)} style={{ display:"flex", alignItems:"center", gap:"0.4rem", padding:"0.3rem 0.6rem", border:"1px solid var(--line)", borderRadius:4, fontSize:"0.78rem", background: form[f.key]===s.u ? "var(--navy)" : "transparent", color: form[f.key]===s.u ? "var(--cream)" : "var(--navy)", transition:"all 0.2s" }}>
                    <div style={{ width:22, height:22, borderRadius:2, backgroundImage:`url(${s.u})`, backgroundSize:"cover" }}></div>{s.l}{form[f.key]===s.u?" ✓":""}
                  </button>
                ))}
              </div>
            </div>}
          </CmsCard>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn primary" onClick={() => onSave(form)}>Save Photos →</button>
        </div>
      </div>
    </div>
  );
}

function SectionsTab({ sections, onSave }) {
  const [list, setList] = useState(sections||[]); const [editing, setEditing] = useState(null);
  const TYPES = [
    { value: "callout", label: "📣 Callout Banner", desc: "Full-width announcement with headline, text and CTA" },
    { value: "promo", label: "🏷 Promo Card", desc: "Featured offer block with image, badge and price" },
    { value: "text", label: "📝 Text Block", desc: "Rich text section with title and body" },
    { value: "faq", label: "❓ FAQ", desc: "Accordion FAQ section" },
  ];
  const add = (type) => { const s = { id:`sec-${Date.now()}`, type, enabled:true, title:"New Section", subtitle:"", body:"", cta:"Learn More", ctaUrl:"#/offers", bgColor:"var(--gold)", textColor:"var(--navy-deep)", image:"", badge:"", price:"", faqs:[] }; const u=[...list,s]; setList(u); setEditing(s); };
  const toggle = (id) => setList(list.map(s => s.id===id ? {...s,enabled:!s.enabled} : s));
  const remove = (id) => { if(!confirm("Delete?")) return; setList(list.filter(s=>s.id!==id)); };
  const moveUp = (i) => { if(i===0) return; const u=[...list]; [u[i-1],u[i]]=[u[i],u[i-1]]; setList(u); };
  const moveDown = (i) => { if(i===list.length-1) return; const u=[...list]; [u[i],u[i+1]]=[u[i+1],u[i]]; setList(u); };
  const saveEdit = (s) => { setList(list.map(x => x.id===s.id ? s : x)); setEditing(null); };
  return (
    <div>
      <TabHeader title="Custom Sections" subtitle="Add banners, promos, FAQs to your homepage" />
      <div style={{ padding: "2rem 2.5rem" }}>
        <div style={{ background:"rgba(244,196,48,0.1)", border:"1px solid rgba(244,196,48,0.4)", borderRadius:6, padding:"0.85rem 1rem", marginBottom:"1.5rem", fontSize:"0.85rem", display:"flex", gap:"0.6rem" }}>
          <span>💡</span><span>Custom sections appear on the <strong>home page</strong>. Toggle visibility, reorder with arrows, or click Edit to customize content.</span>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize:"0.7rem", letterSpacing:"0.15em", textTransform:"uppercase", opacity:0.5, marginBottom:"0.6rem" }}>Add new section</p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            {TYPES.map(t => <button key={t.value} onClick={() => add(t.value)} style={{ padding:"0.6rem 1rem", border:"1px dashed var(--line)", borderRadius:6, fontSize:"0.82rem", background:"var(--bone)", textAlign:"left", transition:"all 0.2s" }}><div style={{fontWeight:600}}>{t.label}</div><div style={{opacity:0.6,fontSize:"0.75rem",marginTop:"0.2rem"}}>{t.desc}</div></button>)}
          </div>
        </div>
        {list.length===0 && <div style={{ textAlign:"center", padding:"4rem", opacity:0.4, fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:"1.2rem" }}>No sections yet. Add one above.</div>}
        {list.map((s,i) => (
          <div key={s.id} style={{ background:s.enabled?"var(--bone)":"rgba(0,0,0,0.04)", border:`1px solid ${s.enabled?"var(--line)":"rgba(0,0,0,0.08)"}`, borderRadius:6, padding:"1.25rem", marginBottom:"0.75rem", display:"flex", alignItems:"center", gap:"1rem", flexWrap:"wrap" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.25rem" }}>
              <button onClick={() => moveUp(i)} style={{ fontSize:"0.85rem", opacity:i===0?0.2:0.7, padding:"0.1rem 0.3rem" }}>▲</button>
              <button onClick={() => moveDown(i)} style={{ fontSize:"0.85rem", opacity:i===list.length-1?0.2:0.7, padding:"0.1rem 0.3rem" }}>▼</button>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", flexWrap:"wrap" }}>
                <span style={{ fontSize:"0.65rem", letterSpacing:"0.12em", textTransform:"uppercase", background:"var(--navy)", color:"var(--gold)", padding:"0.15rem 0.55rem", borderRadius:"999px", fontWeight:600 }}>{TYPES.find(t=>t.value===s.type)?.label||s.type}</span>
                <strong style={{ fontFamily:"var(--font-display)", fontSize:"1rem" }}>{s.title}</strong>
                {!s.enabled && <span style={{ fontSize:"0.72rem", opacity:0.5, fontStyle:"italic" }}>hidden</span>}
              </div>
              {s.body && <p style={{ fontSize:"0.8rem", opacity:0.55, marginTop:"0.25rem", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.body.slice(0,80)}{s.body.length>80?"…":""}</p>}
            </div>
            <div style={{ display:"flex", gap:"0.5rem", flexShrink:0 }}>
              <button onClick={() => toggle(s.id)} style={{ padding:"0.35rem 0.7rem", border:"1px solid var(--line)", borderRadius:4, fontSize:"0.78rem", background:s.enabled?"var(--navy)":"transparent", color:s.enabled?"var(--cream)":"var(--navy)" }}>{s.enabled?"👁 On":"Off"}</button>
              <button onClick={() => setEditing({...s})} style={{ padding:"0.35rem 0.7rem", border:"1px solid var(--line)", borderRadius:4, fontSize:"0.78rem" }}>✏ Edit</button>
              <button onClick={() => remove(s.id)} style={{ padding:"0.35rem 0.7rem", border:"1px solid rgba(201,81,46,0.3)", borderRadius:4, fontSize:"0.78rem", color:"var(--rust)" }}>✕</button>
            </div>
          </div>
        ))}
        <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"1.5rem" }}>
          <button className="admin-btn primary" onClick={() => onSave(list)}>Save Sections →</button>
        </div>
      </div>
      {editing && <SectionEditor section={editing} onSave={saveEdit} onCancel={() => setEditing(null)} />}
    </div>
  );
}

function SectionEditor({ section, onSave, onCancel }) {
  const [form, setForm] = useState({...section});
  const u = (f,v) => setForm(p => ({...p,[f]:v}));
  const updFaq = (i,f,v) => { const fa=[...(form.faqs||[])]; fa[i]={...fa[i],[f]:v}; u("faqs",fa); };
  const addFaq = () => u("faqs",[...(form.faqs||[]),{q:"",a:""}]);
  const remFaq = (i) => { const fa=[...(form.faqs||[])]; fa.splice(i,1); u("faqs",fa); };
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onCancel()}>
      <div className="modal">
        <div className="modal-head"><h3>Edit Section</h3><button className="modal-close" onClick={onCancel}>×</button></div>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group"><label>Section Title</label><input className="form-control" value={form.title} onChange={e => u("title",e.target.value)}/></div>
            <div className="form-group"><label>Subtitle / Badge</label><input className="form-control" value={form.subtitle||""} onChange={e => u("subtitle",e.target.value)}/></div>
          </div>
          {(form.type==="callout"||form.type==="text"||form.type==="promo") && <div className="form-group"><label>Body Text</label><textarea className="form-control" rows="4" value={form.body||""} onChange={e => u("body",e.target.value)}/></div>}
          {form.type==="promo" && <Fragment>
            <div className="form-row">
              <div className="form-group"><label>Badge</label><input className="form-control" value={form.badge||""} onChange={e => u("badge",e.target.value)} placeholder="Limited offer"/></div>
              <div className="form-group"><label>Price Display</label><input className="form-control" value={form.price||""} onChange={e => u("price",e.target.value)} placeholder="From 299 JOD"/></div>
            </div>
            <div className="form-group"><label>Image URL</label><input className="form-control" value={form.image||""} onChange={e => u("image",e.target.value)}/>{form.image && <div style={{marginTop:"0.5rem",height:70,borderRadius:4,backgroundImage:`url(${form.image})`,backgroundSize:"cover"}}></div>}</div>
          </Fragment>}
          {(form.type==="callout"||form.type==="promo") && <div className="form-row">
            <div className="form-group"><label>CTA Text</label><input className="form-control" value={form.cta||""} onChange={e => u("cta",e.target.value)}/></div>
            <div className="form-group"><label>CTA Link</label><input className="form-control" value={form.ctaUrl||""} onChange={e => u("ctaUrl",e.target.value)}/></div>
          </div>}
          <div className="form-row">
            <div className="form-group"><label>Background</label><select className="form-control" value={form.bgColor||"var(--bone)"} onChange={e => u("bgColor",e.target.value)}><option value="var(--gold)">Gold</option><option value="var(--navy)">Navy</option><option value="var(--navy-deep)">Deep Navy</option><option value="var(--bone)">Bone</option><option value="var(--cream)">Cream</option><option value="var(--rust)">Rust</option></select></div>
            <div className="form-group"><label>Text Color</label><select className="form-control" value={form.textColor||"var(--navy)"} onChange={e => u("textColor",e.target.value)}><option value="var(--navy-deep)">Dark</option><option value="var(--cream)">Light</option><option value="var(--gold)">Gold</option></select></div>
          </div>
          {form.type==="faq" && <div>
            <h4 style={{fontFamily:"var(--font-display)",marginBottom:"0.75rem",paddingBottom:"0.5rem",borderBottom:"1px solid var(--line)"}}>FAQ Items</h4>
            {(form.faqs||[]).map((faq,i) => (
              <div key={i} style={{background:"var(--bone)",border:"1px solid var(--line)",borderRadius:4,padding:"1rem",marginBottom:"0.75rem"}}>
                <div className="form-group"><label>Question</label><input className="form-control" value={faq.q} onChange={e => updFaq(i,"q",e.target.value)}/></div>
                <div style={{display:"flex",gap:"0.5rem"}}><div className="form-group" style={{flex:1}}><label>Answer</label><textarea className="form-control" rows="2" value={faq.a} onChange={e => updFaq(i,"a",e.target.value)}/></div><button className="admin-btn danger" onClick={() => remFaq(i)} style={{alignSelf:"flex-end",marginBottom:"1.25rem"}}>✕</button></div>
              </div>
            ))}
            <button className="admin-btn" onClick={addFaq}>+ Add Question</button>
          </div>}
        </div>
        <div className="modal-foot">
          <button className="admin-btn" onClick={onCancel}>Cancel</button>
          <button className="admin-btn primary" onClick={() => onSave(form)}>Save Section →</button>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ settings, onSave }) {
  const [form, setForm] = useState({...DEFAULT_SETTINGS,...settings});
  const u = (f,v) => setForm(p => ({...p,[f]:v}));
  const [tab, setTab] = useState("hero");
  const TABS = [{id:"hero",label:"Hero"},{id:"manifesto",label:"Manifesto"},{id:"quote",label:"Quote"},{id:"security",label:"Security"}];
  return (
    <div>
      <TabHeader title="Site Settings" subtitle="Edit hero copy, stats, quotes and security" />
      <div style={{ padding: "1.5rem 2.5rem" }}>
        <div style={{ display:"flex", gap:0, marginBottom:"1.5rem", borderBottom:"1px solid var(--line)", flexWrap:"wrap" }}>
          {TABS.map(t => <button key={t.id} onClick={() => setTab(t.id)} style={{ padding:"0.75rem 1.25rem", background:"transparent", color:"var(--navy)", fontSize:"0.8rem", letterSpacing:"0.08em", textTransform:"uppercase", fontWeight:tab===t.id?600:400, opacity:tab===t.id?1:0.5, borderBottom:tab===t.id?"2px solid var(--gold)":"2px solid transparent", marginBottom:-1, transition:"all 0.2s" }}>{t.label}</button>)}
        </div>
        {tab==="hero" && <Fragment>
          <CmsCard title="Hero Headline">
            <div className="form-row">
              <div className="form-group"><label>Line 1</label><input className="form-control" value={form.heroHeadline1} onChange={e => u("heroHeadline1",e.target.value)}/></div>
              <div className="form-group"><label>Accent Word (gold italic)</label><input className="form-control" value={form.heroAccent} onChange={e => u("heroAccent",e.target.value)}/></div>
            </div>
            <div className="form-group"><label>Line 2</label><input className="form-control" value={form.heroHeadline2} onChange={e => u("heroHeadline2",e.target.value)}/></div>
            <div className="form-group"><label>Tagline</label><textarea className="form-control" rows="3" value={form.heroTagline} onChange={e => u("heroTagline",e.target.value)}/></div>
          </CmsCard>
          <CmsCard title="CTA Button">
            <div className="form-row">
              <div className="form-group"><label>Button Text</label><input className="form-control" value={form.heroCta} onChange={e => u("heroCta",e.target.value)}/></div>
              <div className="form-group"><label>Button URL</label><input className="form-control" value={form.heroCtaUrl} onChange={e => u("heroCtaUrl",e.target.value)}/></div>
            </div>
          </CmsCard>
          <CmsCard title="Stats">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              <div className="form-group"><label>Stat 1 Number</label><input className="form-control" value={form.stat1Num} onChange={e => u("stat1Num",e.target.value)} placeholder="07"/></div>
              <div className="form-group"><label>Stat 1 Label</label><input className="form-control" value={form.stat1Label} onChange={e => u("stat1Label",e.target.value)}/></div>
              <div className="form-group"><label>Stat 2 Number</label><input className="form-control" value={form.stat2Num} onChange={e => u("stat2Num",e.target.value)} placeholder="365"/></div>
              <div className="form-group"><label>Stat 2 Label</label><input className="form-control" value={form.stat2Label} onChange={e => u("stat2Label",e.target.value)}/></div>
            </div>
          </CmsCard>
        </Fragment>}
        {tab==="manifesto" && <CmsCard title="Manifesto Section (dark section on home page)">
          <div className="form-group"><label>Paragraph 1</label><textarea className="form-control" rows="4" value={form.manifesto1} onChange={e => u("manifesto1",e.target.value)}/></div>
          <div className="form-group"><label>Paragraph 2</label><textarea className="form-control" rows="4" value={form.manifesto2} onChange={e => u("manifesto2",e.target.value)}/></div>
        </CmsCard>}
        {tab==="quote" && <CmsCard title="Quote Section (gold section on home page)">
          <div className="form-group"><label>Quote Text</label><textarea className="form-control" rows="4" value={form.quoteText} onChange={e => u("quoteText",e.target.value)}/></div>
          <div className="form-group"><label>Quote Attribution</label><input className="form-control" value={form.quoteAuthor} onChange={e => u("quoteAuthor",e.target.value)}/></div>
        </CmsCard>}
        {tab==="security" && <CmsCard title="Admin Password">
          <div style={{background:"rgba(201,81,46,0.08)",border:"1px solid rgba(201,81,46,0.25)",borderRadius:4,padding:"0.75rem 1rem",marginBottom:"1.25rem",fontSize:"0.84rem",color:"var(--rust)"}}>⚠️ Remember your new password before saving. There is no recovery option.</div>
          <div className="form-row">
            <div className="form-group"><label>New Password</label><input type="password" className="form-control" value={form.adminPassword} onChange={e => u("adminPassword",e.target.value)}/></div>
            <div className="form-group"><label>Confirm</label><input type="password" className="form-control" placeholder="Type again" onBlur={e => { if(e.target.value && e.target.value!==form.adminPassword) alert("Passwords do not match."); }}/></div>
          </div>
        </CmsCard>}
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <button className="admin-btn primary" onClick={() => onSave(form)}>Save Settings →</button>
        </div>
      </div>
    </div>
  );
}


/* ============================================================
   IMAGE & PDF UPLOAD HELPERS
   ============================================================ */
function fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

function ImageUploader({ label, desc, value, onChange, aspect }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) { alert("Please select an image file."); return; }
    if (file.size > 4 * 1024 * 1024) { alert("Image must be under 4MB."); return; }
    const b64 = await fileToBase64(file);
    onChange(b64);
  };

  const onDrop = (e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if(f) handleFile(f); };
  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  const isBase64 = value && value.startsWith("data:");
  const isUrl = value && value.startsWith("http");

  return (
    <div style={{marginBottom:"1.5rem"}}>
      <label style={{display:"block",fontSize:"0.7rem",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.4rem",fontWeight:600,color:"var(--navy)"}}>{label}</label>
      {desc && <p style={{fontSize:"0.82rem",opacity:0.6,marginBottom:"0.75rem"}}>{desc}</p>}

      {/* Preview */}
      {value && (
        <div style={{position:"relative",marginBottom:"0.75rem"}}>
          <div style={{width:"100%",aspectRatio:aspect||"16/7",backgroundImage:`url(${value})`,backgroundSize:"cover",backgroundPosition:"center",borderRadius:4,border:"1px solid var(--line)"}}></div>
          <button onClick={() => onChange("")} style={{position:"absolute",top:"0.5rem",right:"0.5rem",background:"rgba(201,81,46,0.9)",color:"white",border:"none",borderRadius:"50%",width:28,height:28,cursor:"pointer",fontSize:"1rem",display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>
          {isBase64 && <div style={{position:"absolute",bottom:"0.5rem",left:"0.5rem",background:"rgba(17,30,58,0.85)",color:"var(--gold)",fontSize:"0.65rem",letterSpacing:"0.12em",textTransform:"uppercase",padding:"0.2rem 0.5rem",borderRadius:3}}>📁 Uploaded file</div>}
          {isUrl && <div style={{position:"absolute",bottom:"0.5rem",left:"0.5rem",background:"rgba(17,30,58,0.85)",color:"var(--cream)",fontSize:"0.65rem",letterSpacing:"0.12em",textTransform:"uppercase",padding:"0.2rem 0.5rem",borderRadius:3}}>🔗 URL</div>}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={onDrop} onDragOver={onDragOver} onDragLeave={onDragLeave}
        onClick={() => inputRef.current.click()}
        style={{border:`2px dashed ${dragging?"var(--gold)":"var(--line)"}`,borderRadius:6,padding:"1.5rem",textAlign:"center",cursor:"pointer",background:dragging?"rgba(244,196,48,0.06)":"var(--bone)",transition:"all 0.2s",marginBottom:"0.75rem"}}
      >
        <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>📷</div>
        <p style={{fontSize:"0.85rem",fontWeight:500}}>Drop image here or <span style={{color:"var(--navy)",textDecoration:"underline"}}>click to browse</span></p>
        <p style={{fontSize:"0.75rem",opacity:0.5,marginTop:"0.25rem"}}>JPG, PNG, WebP — max 4MB</p>
        <input ref={inputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e => { if(e.target.files[0]) handleFile(e.target.files[0]); }} />
      </div>

      {/* URL fallback */}
      <div style={{display:"flex",gap:"0.5rem",alignItems:"center"}}>
        <div style={{fontSize:"0.75rem",opacity:0.5,whiteSpace:"nowrap"}}>or paste URL:</div>
        <input className="form-control" value={isUrl ? value : ""} onChange={e => onChange(e.target.value)} placeholder="https://images.unsplash.com/..." style={{fontSize:"0.82rem"}} />
      </div>
    </div>
  );
}

function PdfUploader({ value, onChange }) {
  const inputRef = useRef();
  const [name, setName] = useState(value?.name || "");

  const handleFile = async (file) => {
    if (!file || file.type !== "application/pdf") { alert("Please select a PDF file."); return; }
    if (file.size > 10 * 1024 * 1024) { alert("PDF must be under 10MB."); return; }
    const b64 = await fileToBase64(file);
    setName(file.name);
    onChange({ data: b64, name: file.name, size: file.size });
  };

  const download = () => {
    if (!value?.data) return;
    const a = document.createElement("a");
    a.href = value.data;
    a.download = value.name || "package.pdf";
    a.click();
  };

  const remove = () => { setName(""); onChange(null); };

  return (
    <div>
      <label style={{display:"block",fontSize:"0.7rem",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.4rem",fontWeight:600,color:"var(--navy)"}}>Package PDF Brochure</label>
      <p style={{fontSize:"0.82rem",opacity:0.6,marginBottom:"0.75rem"}}>Upload your package PDF — customers will see a Download button on the package page.</p>

      {value?.data ? (
        <div style={{display:"flex",alignItems:"center",gap:"1rem",background:"var(--bone)",border:"1px solid var(--line)",borderRadius:6,padding:"1rem 1.25rem"}}>
          <span style={{fontSize:"2rem"}}>📄</span>
          <div style={{flex:1}}>
            <p style={{fontWeight:600,fontSize:"0.9rem"}}>{value.name}</p>
            <p style={{fontSize:"0.75rem",opacity:0.55}}>{(value.size / 1024).toFixed(0)} KB</p>
          </div>
          <button onClick={download} className="admin-btn primary" style={{fontSize:"0.78rem"}}>↓ Preview</button>
          <button onClick={remove} className="admin-btn danger" style={{fontSize:"0.78rem"}}>✕ Remove</button>
        </div>
      ) : (
        <div onClick={() => inputRef.current.click()} style={{border:"2px dashed var(--line)",borderRadius:6,padding:"1.5rem",textAlign:"center",cursor:"pointer",background:"var(--bone)",transition:"all 0.2s"}}>
          <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>📄</div>
          <p style={{fontSize:"0.85rem",fontWeight:500}}>Click to upload PDF brochure</p>
          <p style={{fontSize:"0.75rem",opacity:0.5,marginTop:"0.25rem"}}>Max 10MB</p>
          <input ref={inputRef} type="file" accept="application/pdf" style={{display:"none"}} onChange={e => { if(e.target.files[0]) handleFile(e.target.files[0]); }} />
        </div>
      )}
    </div>
  );
}

function MediaTab({ form, u }) {
  return (
    <Fragment>
      <ImageUploader
        label="Hero Image"
        desc="Full-width banner shown on the package detail page"
        value={form.heroImage||""}
        onChange={v => u("heroImage", v)}
        aspect="16/7"
      />
      <ImageUploader
        label="Card Image"
        desc="Thumbnail shown in listing cards (defaults to hero if empty)"
        value={form.cardImage||""}
        onChange={v => u("cardImage", v)}
        aspect="4/3"
      />
      <div style={{borderTop:"1px solid var(--line)",paddingTop:"1.5rem",marginTop:"0.5rem"}}>
        <PdfUploader
          value={form.pdfBrochure||null}
          onChange={v => u("pdfBrochure", v)}
        />
      </div>
      <div style={{background:"rgba(244,196,48,0.1)",border:"1px solid rgba(244,196,48,0.4)",borderRadius:4,padding:"0.85rem 1rem",marginTop:"1.5rem",fontSize:"0.84rem",display:"flex",gap:"0.6rem"}}>
        <span>💡</span><span>You can also use <a href="https://unsplash.com" target="_blank" style={{textDecoration:"underline"}}>unsplash.com</a> for free HQ photos — paste the URL in the "or paste URL" field below each uploader.</span>
      </div>
    </Fragment>
  );
}

function PackageEditor({ pkg, isNew, onSave, onCancel }) {
  const [form, setForm] = useState(pkg);
  const u = (f,v) => setForm({...form,[f]:v});
  const updList = (f,i,v) => { const l=[...(form[f]||[])]; l[i]=v; u(f,l); };
  const remList = (f,i) => { const l=[...(form[f]||[])]; l.splice(i,1); u(f,l); };
  const addList = (f) => u(f,[...(form[f]||[]),""]); 
  const updHotel = (i,h) => { const hs=[...form.hotels]; hs[i]=h; u("hotels",hs); };
  const addHotel = () => u("hotels",[...(form.hotels||[]),{name:"New Hotel",stars:4,image:"",description:"",pricing:[{nights:3,dbl:0,sgl:0,child:0}]}]);
  const remHotel = (i) => { if(!confirm("Remove?")) return; const hs=[...form.hotels]; hs.splice(i,1); u("hotels",hs); };
  const submit = () => { if(!form.title.trim()){alert("Title required.");return;} onSave({...form,id:form.id||form.title.toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,40)}); };
  const [sec, setSec] = useState("basics");
  const SECS = [{id:"basics",label:"Basics"},{id:"media",label:"📷 Media & PDF"},{id:"content",label:"Content"},{id:"hotels",label:`Hotels (${form.hotels?.length||0})`},{id:"seo",label:"SEO"}];
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onCancel()}>
      <div className="modal" style={{maxWidth:940}}>
        <div className="modal-head"><h3>{isNew?"New Package":`Edit: ${form.title}`}</h3><button className="modal-close" onClick={onCancel}>×</button></div>
        <div style={{display:"flex",borderBottom:"1px solid var(--line)",background:"var(--cream)"}}>
          {SECS.map(s => <button key={s.id} onClick={() => setSec(s.id)} style={{padding:"0.85rem 1.25rem",fontSize:"0.78rem",letterSpacing:"0.08em",textTransform:"uppercase",fontWeight:sec===s.id?600:400,opacity:sec===s.id?1:0.5,borderBottom:sec===s.id?"2px solid var(--gold)":"2px solid transparent",marginBottom:-1,transition:"all 0.2s"}}>{s.label}</button>)}
        </div>
        <div className="modal-body">
          {sec==="basics" && <Fragment>
            <div className="form-row"><div className="form-group"><label>Title (English)</label><input className="form-control" value={form.title} onChange={e => u("title",e.target.value)}/></div><div className="form-group"><label>Title (Arabic)</label><input className="form-control" value={form.titleAr||""} onChange={e => u("titleAr",e.target.value)} dir="rtl"/></div></div>
            <div className="form-row-3"><div className="form-group"><label>Category</label><select className="form-control" value={form.category} onChange={e => u("category",e.target.value)}>{Object.entries(CATEGORIES).map(([k,c]) => <option key={k} value={k}>{c.en}</option>)}</select></div><div className="form-group"><label>Destination</label><select className="form-control" value={form.destination||""} onChange={e => u("destination",e.target.value)}><option value="">— None —</option>{Object.values(DESTINATIONS).map(d => <option key={d.id} value={d.id}>{d.name}</option>)}</select></div><div className="form-group"><label>URL Slug</label><input className="form-control" value={form.id||""} onChange={e => u("id",e.target.value.replace(/[^a-z0-9-]/gi,"-").toLowerCase())} placeholder="auto"/></div></div>
            <div className="form-group"><label>Subtitle</label><input className="form-control" value={form.subtitle||""} onChange={e => u("subtitle",e.target.value)}/></div>
            <div className="form-row-3"><div className="form-group"><label>Country</label><input className="form-control" value={form.country||""} onChange={e => u("country",e.target.value)}/></div><div className="form-group"><label>Duration</label><input className="form-control" value={form.duration||""} onChange={e => u("duration",e.target.value)} placeholder="3–4 nights"/></div><div className="form-group"><label>Transport</label><input className="form-control" value={form.transport||""} onChange={e => u("transport",e.target.value)}/></div></div>
            <div className="form-row"><div className="form-group"><label>Price From</label><input type="number" className="form-control" value={form.priceFrom||0} onChange={e => u("priceFrom",parseFloat(e.target.value)||0)}/></div><div className="form-group"><label>Currency</label><input className="form-control" value={form.currency||"JOD"} onChange={e => u("currency",e.target.value)}/></div></div>
          </Fragment>}
          {sec==="media" && <MediaTab form={form} u={u} />}
          {sec==="content" && <Fragment>
            <div className="form-group"><label>Description</label><textarea className="form-control" rows="6" value={form.description||""} onChange={e => u("description",e.target.value)}/></div>
            <div className="form-group"><label>Notes / Important Info</label><textarea className="form-control" rows="3" value={form.notes||""} onChange={e => u("notes",e.target.value)}/></div>
            <h4 style={{fontFamily:"var(--font-display)",fontSize:"1.05rem",margin:"1.5rem 0 0.75rem",paddingBottom:"0.5rem",borderBottom:"1px solid var(--line)"}}>✓ What's Included</h4>
            {(form.includes||[]).map((it,i) => <div key={i} style={{display:"flex",gap:"0.5rem",marginBottom:"0.5rem"}}><input className="form-control" value={it} onChange={e => updList("includes",i,e.target.value)}/><button className="admin-btn danger" onClick={() => remList("includes",i)}>×</button></div>)}
            <button className="admin-btn" onClick={() => addList("includes")}>+ Add inclusion</button>
            <h4 style={{fontFamily:"var(--font-display)",fontSize:"1.05rem",margin:"1.5rem 0 0.75rem",paddingBottom:"0.5rem",borderBottom:"1px solid var(--line)"}}>✕ Not Included</h4>
            {(form.excludes||[]).map((it,i) => <div key={i} style={{display:"flex",gap:"0.5rem",marginBottom:"0.5rem"}}><input className="form-control" value={it} onChange={e => updList("excludes",i,e.target.value)}/><button className="admin-btn danger" onClick={() => remList("excludes",i)}>×</button></div>)}
            <button className="admin-btn" onClick={() => addList("excludes")}>+ Add exclusion</button>
          </Fragment>}
          {sec==="hotels" && <Fragment>
            {(form.hotels||[]).map((h,i) => <HotelEditor key={i} hotel={h} onChange={nh => updHotel(i,nh)} onRemove={() => remHotel(i)}/>)}
            <button className="admin-btn primary" onClick={addHotel}>+ Add Hotel</button>
          </Fragment>}
          {sec==="seo" && <Fragment>
            <div style={{background:"rgba(244,196,48,0.1)",border:"1px solid rgba(244,196,48,0.4)",borderRadius:4,padding:"0.85rem 1rem",marginBottom:"1.5rem",fontSize:"0.84rem"}}>💡 These override the global SEO settings for this specific package page only.</div>
            <div className="form-group"><label>Custom Page Title (≤60 chars)</label><input className="form-control" value={form.seoTitle||""} onChange={e => u("seoTitle",e.target.value)} placeholder={`${form.title||"Package"} — Million Travel`}/><div style={{fontSize:"0.72rem",opacity:0.5,marginTop:"0.25rem",textAlign:"right"}}>{(form.seoTitle||"").length}/60</div></div>
            <div className="form-group"><label>Custom Meta Description (≤155 chars)</label><textarea className="form-control" rows="3" value={form.seoDescription||""} onChange={e => u("seoDescription",e.target.value)} placeholder={form.subtitle||(form.description||"").slice(0,120)}/><div style={{fontSize:"0.72rem",opacity:0.5,marginTop:"0.25rem",textAlign:"right"}}>{(form.seoDescription||"").length}/155</div></div>
            <div className="form-group"><label>SEO Keywords</label><input className="form-control" value={form.seoKeywords||""} onChange={e => u("seoKeywords",e.target.value)} placeholder={`${form.title} travel, ${form.country} trip, ${form.title} package Jordan`}/></div>
          </Fragment>}
        </div>
        <div className="modal-foot"><button className="admin-btn" onClick={onCancel}>Cancel</button><button className="admin-btn primary" onClick={submit}>{isNew?"Create Package →":"Save Changes →"}</button></div>
      </div>
    </div>
  );
}

function HotelEditor({ hotel, onChange, onRemove }) {
  const [open, setOpen] = useState(false);
  const u = (f,v) => onChange({...hotel,[f]:v});
  const updP = (i,f,v) => { const p=[...hotel.pricing]; p[i]={...p[i],[f]:parseFloat(v)||(f==="nights"?0:null)}; onChange({...hotel,pricing:p}); };
  const addP = () => onChange({...hotel,pricing:[...hotel.pricing,{nights:3,dbl:0,sgl:0,child:0}]});
  const remP = (i) => { const p=[...hotel.pricing]; p.splice(i,1); onChange({...hotel,pricing:p}); };
  return (
    <div className="hotel-edit">
      <div className="hotel-edit-head">
        <h5>{hotel.name||"Unnamed"} {"★".repeat(hotel.stars||0)}</h5>
        <div style={{display:"flex",gap:"0.5rem"}}><button className="admin-btn" onClick={() => setOpen(!open)}>{open?"▲ Collapse":"▼ Edit"}</button><button className="admin-btn danger" onClick={onRemove}>Remove</button></div>
      </div>
      {open && <Fragment>
        <div className="form-row"><div className="form-group"><label>Hotel Name</label><input className="form-control" value={hotel.name||""} onChange={e => u("name",e.target.value)}/></div><div className="form-group"><label>Stars</label><select className="form-control" value={hotel.stars||4} onChange={e => u("stars",parseInt(e.target.value))}>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n} star{n>1?"s":""}</option>)}</select></div></div>
        <div className="form-group"><label>Hotel Image URL</label><input className="form-control" value={hotel.image||""} onChange={e => u("image",e.target.value)} placeholder="https://images.unsplash.com/..."/>{hotel.image && <div style={{marginTop:"0.4rem",height:55,borderRadius:3,backgroundImage:`url(${hotel.image})`,backgroundSize:"cover"}}></div>}</div>
        <div className="form-group"><label>Description</label><textarea className="form-control" rows="2" value={hotel.description||""} onChange={e => u("description",e.target.value)}/></div>
        <div>
          <label style={{display:"block",fontSize:"0.7rem",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.4rem",fontWeight:600}}>Pricing Matrix</label>
          <div className="price-edit-head"><span>Nights</span><span>DBL/TRP</span><span>Single</span><span>Child 6–11</span><span></span></div>
          {hotel.pricing.map((row,i) => (<div key={i} className="price-edit-row"><input type="number" className="form-control" value={row.nights} onChange={e => updP(i,"nights",e.target.value)}/><input type="number" className="form-control" value={row.dbl||""} onChange={e => updP(i,"dbl",e.target.value)} placeholder="—"/><input type="number" className="form-control" value={row.sgl||""} onChange={e => updP(i,"sgl",e.target.value)} placeholder="—"/><input type="number" className="form-control" value={row.child||""} onChange={e => updP(i,"child",e.target.value)} placeholder="—"/><button className="admin-btn danger" onClick={() => remP(i)}>×</button></div>))}
          <button className="admin-btn" onClick={addP} style={{marginTop:"0.5rem"}}>+ Add row</button>
        </div>
      </Fragment>}
    </div>
  );
}



/* ============ APP ============ */
function App() {
  // SSR-safe default; real route resolved from window.location on mount.
  const [route, setRoute] = useState({ name: "home" });
  const [packages, setPackages] = useState(SEED_DATA.packages);
  const [loaded, setLoaded] = useState(false);
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const onHash = () => setRoute(parseRoute());
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    (async () => {
      const data = await loadPackages();
      setPackages(data);
      setLoaded(true);
    })();
  }, []);

  const showToast = useCallback((msg) => { setToast(msg); setTimeout(() => setToast(null), 2400); }, []);

  if (!loaded) {
    return <div style={{ minHeight: "100vh", background: "var(--navy)", color: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
      <div className="badge-mini" style={{ width: "60px", height: "60px", fontSize: "2rem", animation: "pulse 1.5s ease-in-out infinite" }}>M</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontStyle: "italic", opacity: 0.7 }}>Loading…</div>
    </div>;
  }

  if (route.name === "admin") {
    if (!adminAuthed) return <AdminLogin onLogin={() => setAdminAuthed(true)} />;
    return <Fragment><AdminPanel packages={packages} onUpdate={setPackages} onShowToast={showToast} />{toast && <div className="toast">{toast}</div>}</Fragment>;
  }

  let page;
  switch (route.name) {
    case "home": page = <HomePage packages={packages} />; break;
    case "about": page = <AboutPage />; break;
    case "destinations": page = <DestinationsListPage packages={packages} />; break;
    case "destination": page = <DestinationDetailPage id={route.id} packages={packages} />; break;
    case "offers": page = <OffersPage packages={packages} />; break;
    case "offers-cat": page = <OffersPage packages={packages} category={route.category} />; break;
    case "offer-detail": page = <OfferDetailPage packages={packages} category={route.category} id={route.id} />; break;
    case "gallery": page = <GalleryPage />; break;
    case "contact": page = <ContactPage />; break;
    default: page = <HomePage packages={packages} />;
  }

  return <Fragment><Nav route={route} />{page}<Footer />{toast && <div className="toast">{toast}</div>}</Fragment>;
}

export default App;
