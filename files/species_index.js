/**
 * @summary Curated dictionary mapping real clinical species (and common aliases)
 * to the bacteria/resistance CATEGORIES used by the bug-table SVG.
 *
 * The main tool groups organisms into 18 conceptual categories (GNR, ESBL, MRSA,
 * etc.). Clinicians, however, think in species names ("E. coli", "Pseudomonas").
 * This file bridges the two: searching a species name highlights the category
 * (or categories) it belongs to.
 *
 * Each entry:
 *   display    : Canonical name shown in the search results
 *   aliases    : Other strings that should match (abbreviations, common names)
 *   categories : One or more category IDs (must match a key in BACTERIA /
 *                a rect id in the SVG). The FIRST category is the primary one.
 *   note       : Short clarifying text shown with the result (optional)
 *
 * Category IDs (see static_objects.js BACTERIA):
 *   GNR PsA AmpC ESBL CRE Steno CRAB DTR
 *   MSSA MRSA SOSA Strep VSE VRE
 *   anaerobes Other PNA Zoo
 *
 * @license MIT  (see static_objects.js)
 */

const SPECIES_INDEX = [
    /* ---- Enterobacterales: "friendly" GNR (may also be AmpC / ESBL / CRE) ---- */
    { display: "Escherichia coli",      aliases: ["E. coli", "E coli"],            categories: ["GNR", "ESBL", "CRE"], note: "Common GNR; can harbor ESBL or CRE" },
    { display: "Klebsiella pneumoniae", aliases: ["K. pneumoniae", "Kleb pneumo"], categories: ["GNR", "ESBL", "CRE"], note: "Common GNR; classic ESBL/KPC host" },
    { display: "Klebsiella oxytoca",    aliases: ["K. oxytoca"],                   categories: ["GNR", "ESBL"],        note: "" },
    { display: "Proteus mirabilis",     aliases: ["Proteus"],                      categories: ["GNR", "ESBL"],        note: "" },
    { display: "Salmonella",            aliases: ["Salmonella enterica"],          categories: ["GNR"],                note: "" },
    { display: "Shigella",              aliases: [],                               categories: ["GNR"],                note: "" },
    { display: "Haemophilus influenzae", aliases: ["H. influenzae", "H flu", "Hib"], categories: ["GNR"],             note: "Non-fermenter exception; respiratory GNR" },
    { display: "Moraxella catarrhalis", aliases: ["Moraxella"],                    categories: ["GNR"],                note: "" },

    /* ---- AmpC producers (HECK Yes) ---- */
    { display: "Enterobacter cloacae",  aliases: ["Enterobacter"],                 categories: ["AmpC"],               note: "Inducible AmpC (HECK Yes)" },
    { display: "Citrobacter freundii",  aliases: ["Citrobacter"],                  categories: ["AmpC"],               note: "Inducible AmpC (HECK Yes)" },
    { display: "Klebsiella aerogenes",  aliases: ["Enterobacter aerogenes"],       categories: ["AmpC"],               note: "Inducible AmpC (HECK Yes)" },
    { display: "Hafnia alvei",          aliases: ["Hafnia"],                       categories: ["AmpC"],               note: "Inducible AmpC (HECK Yes)" },
    { display: "Serratia marcescens",   aliases: ["Serratia"],                     categories: ["AmpC", "GNR"],        note: "" },
    { display: "Morganella morganii",   aliases: ["Morganella"],                   categories: ["AmpC", "GNR"],        note: "" },
    { display: "Providencia",           aliases: [],                               categories: ["AmpC", "GNR"],        note: "" },
    { display: "Yersinia enterocolitica", aliases: ["Yersinia"],                   categories: ["AmpC", "GNR"],        note: "" },

    /* ---- Resistance phenotypes ---- */
    { display: "ESBL (extended-spectrum beta-lactamase)", aliases: ["ESBL", "CTX-M", "extended spectrum beta lactamase"], categories: ["ESBL"], note: "Resistance phenotype, esp. E. coli & Klebsiella" },
    { display: "CRE (carbapenem-resistant Enterobacterales)", aliases: ["CRE", "KPC", "carbapenem resistant", "NDM", "OXA-48", "VIM", "IMP"], categories: ["CRE"], note: "Resistance phenotype" },

    /* ---- Non-fermenting GNRs ---- */
    { display: "Pseudomonas aeruginosa", aliases: ["Pseudomonas", "PsA", "pseudo"], categories: ["PsA", "DTR"], note: "See DTR PsA for resistant strains" },
    { display: "DTR Pseudomonas",        aliases: ["DTR PsA", "MDR Pseudomonas", "difficult to treat pseudomonas"], categories: ["DTR"], note: "Difficult-to-treat resistance" },
    { display: "Stenotrophomonas maltophilia", aliases: ["Steno", "Stenotrophomonas", "S. maltophilia"], categories: ["Steno"], note: "" },
    { display: "Acinetobacter baumannii", aliases: ["Acinetobacter", "CRAB"],     categories: ["CRAB"],               note: "CRAB = carbapenem-resistant A. baumannii" },
    { display: "Burkholderia",           aliases: ["Burkholderia cepacia"],        categories: ["Steno"],              note: "Non-fermenter; treat similar to Steno/MDR" },

    /* ---- Staphylococci ---- */
    { display: "Staphylococcus aureus (MSSA)", aliases: ["MSSA", "Staph aureus", "S. aureus", "methicillin susceptible"], categories: ["MSSA", "MRSA"], note: "Confirm methicillin susceptibility" },
    { display: "Staphylococcus aureus (MRSA)", aliases: ["MRSA", "methicillin resistant staph aureus"], categories: ["MRSA"], note: "" },
    { display: "Staphylococcus epidermidis", aliases: ["S. epidermidis", "coag negative staph", "CoNS", "coagulase negative"], categories: ["SOSA"], note: "Coagulase-negative staph" },
    { display: "Staphylococcus lugdunensis", aliases: ["S. lugdunensis"],         categories: ["SOSA"],               note: "Behaves like Staph aureus" },
    { display: "Staphylococcus hominis",     aliases: ["S. hominis"],             categories: ["SOSA"],               note: "" },
    { display: "Staphylococcus capitis",     aliases: ["S. capitis"],             categories: ["SOSA"],               note: "" },
    { display: "Staphylococcus haemolyticus", aliases: ["S. haemolyticus"],       categories: ["SOSA"],               note: "" },
    { display: "Staphylococcus saprophyticus", aliases: ["S. saprophyticus"],     categories: ["Other"],              note: "Common cause of UTI" },

    /* ---- Streptococci ---- */
    { display: "Streptococcus pyogenes (Group A)", aliases: ["S. pyogenes", "GAS", "Group A strep"], categories: ["Strep"], note: "Beta-hemolytic" },
    { display: "Streptococcus agalactiae (Group B)", aliases: ["S. agalactiae", "GBS", "Group B strep"], categories: ["Strep"], note: "Beta-hemolytic" },
    { display: "Streptococcus pneumoniae", aliases: ["S. pneumoniae", "pneumococcus", "pneumococcal"], categories: ["Strep"], note: "Alpha-hemolytic" },
    { display: "Viridans group streptococci", aliases: ["viridans strep", "S. mitis", "S. sanguinis"], categories: ["Strep"], note: "" },
    { display: "Streptococcus anginosus group", aliases: ["S. anginosus", "milleri group", "S. intermedius", "S. constellatus"], categories: ["Strep"], note: "Abscess-forming" },

    /* ---- Enterococci ---- */
    { display: "Enterococcus faecalis", aliases: ["E. faecalis", "VSE"],          categories: ["VSE"],                note: "Usually less resistant than faecium" },
    { display: "Enterococcus faecium",  aliases: ["E. faecium", "VRE"],           categories: ["VRE", "VSE"],         note: "More often vancomycin-resistant" },

    /* ---- Anaerobes ---- */
    { display: "Bacteroides fragilis",  aliases: ["Bacteroides"],                 categories: ["anaerobes"],          note: "GN anaerobe; intra-abdominal" },
    { display: "Clostridioides difficile", aliases: ["C. difficile", "C diff", "Clostridium difficile"], categories: ["anaerobes"], note: "Colitis" },
    { display: "Clostridium perfringens", aliases: ["C. perfringens", "Clostridium"], categories: ["anaerobes"],      note: "Gas gangrene" },
    { display: "Actinomyces israelii",  aliases: ["Actinomyces"],                 categories: ["anaerobes"],          note: "Head/neck, thoracic, abdominal" },
    { display: "Peptostreptococcus",    aliases: ["peptostrep"],                  categories: ["anaerobes"],          note: "" },
    { display: "Prevotella",            aliases: [],                              categories: ["anaerobes"],          note: "" },
    { display: "Fusobacterium necrophorum", aliases: ["Fusobacterium", "Lemierre"], categories: ["anaerobes"],        note: "Lemierre syndrome" },

    /* ---- Other / not classified elsewhere ---- */
    { display: "Neisseria meningitidis", aliases: ["N. meningitidis", "meningococcus", "meningococcal"], categories: ["Other"], note: "Meningitis; treat with ceftriaxone" },
    { display: "Neisseria gonorrhoeae", aliases: ["N. gonorrhoeae", "gonococcus", "gonorrhea", "GC"], categories: ["Other"], note: "Consider in septic arthritis" },
    { display: "Listeria monocytogenes", aliases: ["Listeria"],                   categories: ["Other"],              note: "Meningitis in immunocompromised; ampicillin" },

    /* ---- Atypical pneumonia ---- */
    { display: "Mycoplasma pneumoniae", aliases: ["Mycoplasma", "walking pneumonia"], categories: ["PNA"],            note: "Atypical pneumonia" },
    { display: "Legionella pneumophila", aliases: ["Legionella"],                 categories: ["PNA"],                note: "Atypical pneumonia" },
    { display: "Chlamydia pneumoniae",  aliases: ["Chlamydophila pneumoniae"],    categories: ["PNA"],                note: "Atypical pneumonia" },
    { display: "Chlamydia psittaci",    aliases: ["psittacosis"],                 categories: ["PNA"],                note: "Bird exposure" },

    /* ---- Zoonotic & tick-borne ---- */
    { display: "Leptospira",            aliases: ["leptospirosis"],               categories: ["Zoo"],                note: "Zoonotic" },
    { display: "Brucella",              aliases: ["brucellosis"],                 categories: ["Zoo"],                note: "Zoonotic" },
    { display: "Coxiella burnetii",     aliases: ["Q fever", "Coxiella"],         categories: ["Zoo"],                note: "Q fever" },
    { display: "Bartonella",            aliases: ["cat scratch"],                 categories: ["Zoo"],                note: "" },
    { display: "Yersinia pestis",       aliases: ["plague"],                      categories: ["Zoo"],                note: "Plague" },
    { display: "Rickettsia",            aliases: ["Rocky Mountain spotted fever", "RMSF"], categories: ["Zoo"],       note: "Tick-borne" },
    { display: "Borrelia burgdorferi",  aliases: ["Lyme", "Lyme disease", "Borrelia"], categories: ["Zoo"],          note: "Lyme disease" },
    { display: "Anaplasma",             aliases: ["anaplasmosis"],                categories: ["Zoo"],                note: "Tick-borne" },
    { display: "Ehrlichia",             aliases: ["ehrlichiosis"],                categories: ["Zoo"],                note: "Tick-borne" },
    { display: "Francisella tularensis", aliases: ["tularemia", "Francisella"],   categories: ["Zoo"],                note: "" },
    { display: "Pasteurella multocida", aliases: ["Pasteurella", "cat bite", "dog bite"], categories: ["Zoo"],       note: "Animal bites" }
];
