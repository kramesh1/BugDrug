/**
 * This file defines JSON data used in the text box (below the "bug table" in
 * the HTML file)
 *
 * @author Hunter Ratliff
 * @link https://github.com/HunterRatliff1/BugDrug
 *
 * Created on    : 2023-12-31
 * Last modified : 2024-02-07
 *
 * @license MIT
 * Copyright (c) 2023 Hunter Ratliff
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 */

/******************************************************************************\
 * COMMONTEXT
 * These are common bits of text used multiple times in this document
 \*****************************************************************************/
const COMMONTEXT = {
    MDR: '<b>Drug resistance:</b> As with all bacteria, the ' +
    'resistance patterns (ESBL, CRE, VRE) are not dictated by the source ' +
    'of the infection. So in a patient with a history of ESBL, you would ' +
    'want to cover ESBL, for example.',
    PNA: "<b>CAP vs HAP/VAP:</b> Reviewing the differences among " +
    "<i>community-acquired pneumonia</i> (CAP), <i>healthcare-associated " +
    "pneumonia</i> (HCAP), <i>hospital-acquired pneumonia</i> (HAP), and " +
    "<i>ventilator-associated pneumonia</i> (VAP) is beyond my scope. For " +
    "learners, it's more important to <b>think about validated risk factors</b>. " +
    "The older HCAP category is no longer used as a stand-alone reason for broad " +
    "coverage; instead, consider prior MRSA or <i>Pseudomonas</i> isolation, recent " +
    "hospitalization with IV antibiotics, severity, and local epidemiology.",
    aspiration: "<b>Anaerobes:</b> Historically, we used to use anaerobic coverage " +
    "for pneumonia, especially aspiration pneumonia. More recently, the " +
    "<a href='https://pubmed.ncbi.nlm.nih.gov/31573350/'>2019 ATS/IDSA guidelines</a> " +
    "have moved away from anaerobic coverage, <b>unless</b> a lung " +
    "abscess or empyema is suspected.",
    waitCx: "<b>Culture-guided treatment:</b> Whenever possible, it's very helpful " +
    "to obtain cultures before starting antibiotics. If a patient is clinically " +
    "stable (well appearing, non-septic, acceptable vital signs), consider waiting " +
    "until cultures have been obtained to start antibiotics. This is especially " +
    "important for tissue cultures (osteomyelitis, wounds) of <b>chronic</b> infections. ",
    susceptibility: `<span class='text-muted'>Antibiotic susceptibility may vary if there has been acquired resistance,
    so please inform your choice of antimicrobials based on the patient's current/prior cultures, risk factors, and your
    institutional antibiogram</span>`
};

/******************************************************************************\
 * ANTIBIOTICS
 * The "abxClass" should match the DOM id (used in the HTML file) for the list
 * it should be populated under
 *
 * Antibiotics are abbreviated based on the ASM's abbreviation conventions
 * https://journals.asm.org/abbreviations-conventions
 *
 * ----------------------------------- SCHEMA ----------------------------------
 * ANTIBIOTICS = {
 *  "DOM ID": {
 *      name: `A string to be displayed in the list, with a short name for the
 *             antibiotic`,
 *      fullName: `(optional) The HTML code to be used as the title of the info
 *             box. If left blank and examples are given, then the examples
 *             replace the blank string`,
 *      examples: { // Can be one or more objects with structure below
 *          "Generic name 1": {
 *              route: `(mandatory) String of the routes of administration`,
 *              trade: `(optional) Trade name for this antibiotic`,
 *              abbv:  `(optional) Abbreviation for the antibiotic`
 *          },
 *          "Generic name 2": {route: "...", trade:"...",abbv:"..."}
 *      },
 *      abxClass: `(mandatory) The DOM ID of the <ul> that the antibiotic should
 *                 fall under`,
 *      comments: `The HTML code to populate in the main part of the info box`
 *  },
 *  "Another DOM ID": "{...}"
 * }
 *
 \*****************************************************************************/
const ANTIBIOTICS = {
    /*** PENICILLINS
            AMP       PCN/Amox/Ampicillin
            NAF       Naf/Oxacillin/Dicloxacillin
            Unasyn    Ampicillin Sulbactam (Unasyn)
            Augmentin Amoxicillin-Clavulanate (Augmentin)
            Zosyn     Piperacillin-Tazobactam (Zosyn)
    ***/
    'NAF': {
        name: 'Naf/Oxacillin',
        fullName: 'Anti-staphylococcal penicillins',
        examples: {
            Nafcillin: {route: "IV/IM"},
            Oxacillin: {route: "IV"},
            Dicloxacillin: {route: "PO"}
        },
        abxClass: 'penicillins',
        comments: 'As the name implies, the anti-staphylococcal penicillins are the best treatment options for infections ' +
        "with Staphylococcus spp. For methicillin-<u>susceptible</u> strains of Staph. aureus (MSSA), especially severe " +
        "infections, outcomes are better if you use an anti-staphylococcal penicillin (or first generation cephalosporin)."
    },
    'AMP': {
        name: 'Amox / Amp',
        fullName: 'Aminopenicillins',
        examples: {
            Ampicillin: {route: "IV"},
            Amoxicillin: {route: "PO"}
        },
        abxClass: 'penicillins',
        comments: 'Both ampicillin & amoxicillin are great for strep coverage, and have very limited gram negative ' +
        "coverage (gram negative coverage improves with adding a beta-lactamase inhibitor; see <mark><b>Augmentin & Unasyn</b></mark>). " +
        "Ampicillin has activity against enterococci and <b><i>Listeria</i></b>"
    },
    'Augmentin': {
        name: 'Augmentin &trade;',
        fullName: '',
        examples: {"Amoxicillin-Clavulanate": {route: "PO", trade:"Augmentin", abbv:"AMX/CLA"}},
        abxClass: 'penicillins',
        comments: 'Augmentin adds the beta-lactamase inhibitor clavulanic acid to amoxicillin to give it more potent gram ' +
        "negative coverage. It is ideal for infections of the head/neck & sinusitis."
    },
    'Unasyn': {
        name: 'Unasyn &trade;',
        fullName: '',
        examples: {"Ampicillin-Sulbactam": {route: "IV", trade:"Unasyn", abbv:"AMP/SUL"}},
        abxClass: 'penicillins',
        comments: 'Unasyn adds the beta-lactamase inhibitor sulbactam to ampicillin to give it more potent gram ' +
        "negative coverage (though increasing resistance limits its use for intraabdominal infections). It is ideal for " +
        "infections of the head/neck.<br><br>" +
        "High dose <b>sulbactam</b> can be used to treat <mark><b><i>Acinetobacter</i></b></mark>. " +
        "Ampicillin alone has no activity against <i>Acinetobacter</i>, but unfortunately there isn't a commercially " +
        "available version of sulbactam alone (though there is Xacduro [Sulbactam/durlobactam])."
    },
    'Zosyn': {
        name: 'Zosyn &trade;',
        fullName: '',
        examples: {"Piperacillin-Tazobactam": {route: "IV", trade:"Zosyn", abbv:"PIP/TZB"}},
        abxClass: 'penicillins',
        comments: 'Has both <b><i>Pseudomonas</i></b> (from piperacillin) and <b>anaerobic</b> coverage, so it can be ' +
        "useful for empiric coverage of pneumonia with resistant-pathogen risk factors and intraabdominal infections. " +
        "It's a weak inducer of AmpC beta-lactamases, but is a good substrate (see <mark><b>AmpC</b></mark> for what " +
        "this means), so it's not ideal for AmpC-producing bacteria.<br><br>" +
        "There is some controversy regarding nephrotoxicity when combined with <mark><b>vancomycin</b></mark>. Vanco " +
        "is nephrotoxic alone and recent evidence is casting doubt on Vanc-Zosyn nephrotoxicity, so ask your ID " +
        "pharmacist their thoughts before using this combo."
    },

    /*** CEPHALOSPORINS
     * CFZ Cefazolin / Cephalexin (1G)
     * FOX Cefoxitin (2G)
     * CRO Ceftriaxone / Ceftazidime (3G)
     * FEP Cefepime (4G)
     * CPT Ceftaroline (5G)
    ***/
    'CFZ': {
        name: 'Cefazolin (1G)',
        fullName: '1st generation cephalosporins',
        examples: {
            Cefazolin: {route: "IV", trade: "Ancef"},
            Cephalexin: {route: "PO"}
        },
        abxClass: 'cephalosporins',
        comments: '<b>Drug of choice</b> for methicillin <b class="text-success">susceptible</b> staphylococcus. ' +
        "Has very limited gram negative coverage (<i>E coli, Klebsiella, Proteus mirabilis, Moraxella</i>), and only " +
        "when there is not resistance."
    },
    'FOX': {
        name: 'Cefoxitin (2G)',
        fullName: '2nd generation cephalosporins',
        examples: {Cefoxitin: {route: "IV"}},
        abxClass: 'cephalosporins',
        comments: 'Quite similar to first generations; a little less active for gram-positive cocci, but begins to ' +
        "have more gram negative coverage (notably <b><i>H influenzae</i></b>). Cefoxitin has some activity against " +
        "anaerobes, including <i>Bacteroides spp</i>, but I wouldn't count on it alone for anaerobic coverage."
    },
    'CRO': {
        name: 'Ceftriaxone (3G)',
        fullName: '3rd generation cephalosporins',
        examples: {
            Ceftriaxone: {route: "IV", trade: "Rocephin"},
            Ceftazidime: {route: "IV"},
            Cefdinir: {route: "PO", trade: "Omnicef"}
        },
        abxClass: 'cephalosporins',
        comments: 'Has solid gram negative coverage, unless there are beta-lactamases (AmpC, ESBL). <b>Ceftazidime has ' +
        "<i>Pseudomonas</i> coverage</b>, but the rest of the class does not.<br><br>Ceftriaxone is great for bacterial " +
        "meningitis (has <i>N meningitidis</i> coverage, but does lack Listeria spp. coverage)."
    },
    'FEP': {
        name: 'Cefepime (4G)',
        fullName: '4th generation cephalosporins',
        examples: {Cefepime: {route: "IV", trade: "Maxipime"}},
        abxClass: 'cephalosporins',
        comments: 'Broad spectrum antibiotic with activity against <i>Pseudomonas</i> and AmpC beta-lactamases (but not ' +
        "ESBLs). Lacks anaerobic or MRSA coverage (but does have better MSSA activity than 3rd generation cephalosporins)."
    },
    'CPT': {
        name: 'Ceftaroline (5G)',
        fullName: '5th generation cephalosporins',
        examples: {Ceftaroline: {route: "IV"}},
        abxClass: 'cephalosporins',
        comments: 'This is unique among the cephalosporins, since it has good ' +
        "<b>MRSA activity</b>. It does come at the cost of some gram negative " +
        "coverage (think of it as cefazolin/Ancef with MRSA activity). You " +
        "really should consult ID if you're thinking about using this one!"
    },

    /*** GRAM POSITIVES
     * VAN Vancomycin
     * LZD Linezolid
     * DAP Daptomycin
    ***/
    'VAN': {
        name: 'Vancomycin',
        fullName: 'Vancomycin',
        examples: {
            "Vancomycin": {route: "IV"},
            "Vancomycin*": {route: "PO for C diff"}},
        abxClass: 'gram-positives',
        comments: '<b>First line treatment</b> for methicillin-resistant <i>Staphylococcus spp</i>, including <b>MRSA</b> ' +
        "and most of the coagulase negative staph (* the oral formulation is used only for <i>Clostridioides difficile</i> " +
        "colitis AKA C diff; it does not provide systemic coverage)." +
        "<br><br>IV vancomycin is <b>nephrotoxic</b>. Observational studies have reported higher risk of AKI when " +
        "combined with Zosyn (pip/tazo), but this is controversial. It will cause a rash if administered too fast " +
        "(from histamine release), but this is not a true allergy. However, there is an association with DRESS syndrome, " +
        "so not all rashes with vanco are the same! "
    },
    'LZD': {
        name: 'Linezolid',
        fullName: '',
        examples: {Linezolid: {route: "IV or PO", trade: "Zyvox"}},
        abxClass: 'gram-positives',
        comments: 'Used for <i>Staph aureus</i> (especially MRSA) and Enterococcus (especially vancomycin-resistant ' +
        "<i>E. faecium</i>). Can use it orally since has great bioavailability.<br><br>" +
        "Has risk of <b>serotonin syndrome</b> if given with SSRI/SNRIs since it's a weak MAOI. Will also cause " +
        "myelosuppression (reversible) and peripheral neuropathy (irreversible) with long term use."
    },
    'DAP': {
        name: 'Daptomycin',
        fullName: '',
        examples: {Daptomycin: {route: "IV", trade: "Cubicin"}},
        abxClass: 'gram-positives',
        comments: 'Used for <i>Staph aureus</i> (especially MRSA) and Enterococcus (especially vancomycin-resistant ' +
        "<i>E. faecium</i>). Should <b>not be used for pneumonia</b> since surfactant inactivates it.<br><br>" +
        "" +
        "May cause <b>myopathy</b> so you should hold any statins and check a creatine kinase weekly."
    },

    /***  carbapenems
     * MEM Mero/Dori/Imipenem
     * ETP Ertapenem
    ***/
    'MEM': {
        name: 'Meropenem',
        fullName: '',
        examples: {
            Meropenem: {route: "IV", trade: "Merrem"},
            Doripenem: {route: "IV"},
            "Imipenem-Cilastatin": {route: "IV", trade: "Primaxin", abbv: "IPM-CLN"}
        },
        abxClass: 'carbapenems',
        comments: 'Carbapenems are the broadest of all beta-lactams and cover some of the most difficult bacteria that ' +
        "we frequently encounter (including <b>ESBLs</b>). Unfortunately, rates of resistance are increasing (<mark>see " +
        "<b>CREs</b></mark>) so they should only be used in the sickest of patients. Generally, if a patient has a " +
        "history of ESBL <u>but is immunocompetent and not septic</u>, don't just throw on meropenem without a reason " +
        "(this is how we get CREs). Carbapenem exposure also increase the risk of C diff and other bad infections " +
        "(e.g. <mark>stenotrophomonas</mark>).<br><br>"+
        "Carbapenems are also associated with increased risk of seizures, especially in meningitis (and inconveniently " +
        "decrease the levels of valproic acid). Imipenem has the highest risk. Doripenem isn't used as often since it " +
        "has worse outcomes (especially for pneumonia)."
    },
    'ETP': {
        name: 'Ertapenem',
        fullName: '',
        examples: {Ertapenem: {route: "IV/IM", trade: "Invanz"}},
        abxClass: 'carbapenems',
        comments: 'Similar to other carbapenems (<mark>see <b>meropenem</b></mark>), with a few exceptions:<br>' +
        "<ol><li>It has <b>once daily dosing</b>, which can be nice for OPAT. This is because it's so heavily bound to " +
        "albumin (thus it should not be used if a patient's albumin is &lt;2.5 g/dL). Can also be given IM</li>" +
        "<li>It does <b>not have <i>Pseudomonas</i></b> activity</li>" +
        "<li>It's the most susceptible to carbapenemases (among the carbapenems)</li>" +
        "</ol>"
    },

    /***  tetracyclines
     * DOX Doxycycline
     * MIN Minocycline
     * TGC Tigecycline
    ***/
    'DOX': {
        name: 'Doxycycline',
        fullName: '',
        examples: {Doxycycline: {route: "IV/PO"}},
        abxClass: 'tetracyclines',
        comments: "Doxycycline has broad applications: It's used to treat <b>zoonotic</b> (Leptospirosis, Brucella, " +
        "Q fever, Bartonella) and <b>tick-borne</b> (Rickettsia, Lyme, Babesiosis, Anaplasmosis/Ehrlichiosis) diseases, " +
        'as well as the <b>"atypical" pneumonias</b> (Mycoplasma, Legionella, Chlamydia). Doxy also has activity against ' +
        "Staph spp., including MRSA (though there can be resistance).<br><br>" +
        "Tetracyclines (like doxy) are also nice because they don't need to be renally dosed. However, while they achieve " +
        "good levels in tissues (e.g. skin, bone, lungs) they don't have very good penetration in the urine, CSF, or " +
        "bloodstream, so they should not be relied on for UTIs or bacteremia."
    },
    'MIN': {
        name: 'Minocycline',
        fullName: '',
        examples: {Minocycline: {route: "IV/PO"}},
        abxClass: 'tetracyclines',
        comments: `Minocycline is quite similar to doxycycline (see <mark><b>Doxycycline</b></mark> for overview of
        tetracyclines), but generally has broader activity than doxycycline (exception: doxycycline works better for
        some of the tick-borne & zoonotic diseases). Minocycline has good activity against some of the "bad bugs",
        namely <mark><i>Stenotrophomonas</i></mark> and <mark><i>Acinetobacter</i></mark>. It can have high rates of
        vestibular side effects (ataxia, vertigo) and turn the skin blue/grey.

        <br><br>Trivia fact: Minocycline is technically a disease-modifying antirheumatic drugs (DMARD) for rheumatoid
        arthritis, but please don't use it for that!`
    },
    'TGC': {
        name: 'Tigecycline',
        fullName: '',
        examples: {
            Tigecycline: {route: "IV", trade: "Tygacil"},
            Eravacycline: {route: "IV", trade: "Xerava"}
        },
        abxClass: 'tetracyclines',
        comments: `If you see ID using tigecycline, it's an indicator that things probably aren't going great. Despite
        tigecycline's broad activity (CRE, <i>Acinetobacter</i>, <i>Stenotrophomonas</i>), it's often not the best
        option for the patient; randomized trials have shown <b>increased mortality and higher rates of failure</b> for
        tigecycline vs other antibiotics. It therefore has a <b>black box warning</b> and the FDA advises us to
        only use Tigecycline "in situations when alternative treatments are not suitable". It also has high rates of
        GI side effects. Finally, despite its broad activity, it <b>lacks Pseudomonas coverage</b>.<br><br>

        <b>Eravacycline</b> is similar to tigecycline, but perhaps has fewer side effects. It's mainly used for
        intra-abdominal infections. It also has some activity for <i>Acinetobacter</i>`
    },

    /***  anaerobic-abx
     *  MTZ Metronidazole
     *  CLI Clindamycin
    ***/
    'MTZ': {
        name: 'Metronidazole',
        fullName: '',
        examples: {Metronidazole: {route: "PO/IV", trade:"Flagyl"}},
        abxClass: 'anaerobic-abx',
        comments: 'Metronidazole only covers anaerobes, but does a pretty good job when it comes to them! Traditionally, ' +
        'folks say to use metronidazole "below the diaphragm" due to its excellent activity against anaerobic gram ' +
        'negative bacilli (<i>Bacteroides fragilis</i>) and to use clindamycin "above the diaphragm" (metronidazole lacks ' +
        "activity against <i>Actinomyces</i>).<br><br>" +
        "Oral metronidazole has excellent bioavailability, so it's often used with another medication that covers gram " +
        "negatives (e.g. a fluoroquinolone) as an oral regimen for intraabdominal infections. Unlike clindamycin, which " +
        "can <i>cause</i> C diff colitis, metronidazole is sometimes used to <u>treat</u> C diff."
    },
    'CLI': {
        name: 'Clindamycin',
        fullName: '',
        examples: {Clindamycin: {route: "PO/IV"}},
        abxClass: 'anaerobic-abx',
        comments: 'Clindamycin is primarily used for anaerobic bacterial infections of the head & neck (has better ' +
        "activity against <i>Actinomyces israelii</i> & peptostreptococci compared to metronidazole). Conversely, rates " +
        "of resistance to <i>Bacteroides fragilis</i> are higher with clindamycin, so it's not used as much for " +
        "intraabdominal infections. Notably, has high rates of <b><i>C diff</i> colitis</b>, so consider another agent.<br><br>" +
        "The IV formulation is used to inhibit toxin production in necrotizing fasciitis & toxic shock syndrome, and " +
        "the topical form is used for bacterial vaginosis & acne. Has some activity against MRSA, but used less often " +
        "due to increasing resistance & side effect profile."
    },

    /***  other antibiotics
     * ATM      Aztreonam
     * Aminogly Amikacin/Gentamicin/Tobramycin
     * AZM      Erythro/Azithromycin
     * TMP-SMX  Trimethoprim / Sulfamethoxazole (Bactrim)
     * Quino    Flouroquinolones (Ciprofloxacin/Levofloxacin/Moxifloxacin)
     * NIT      Nitrofurantoin
     * FOF      Fosfomycin
     *
    ***/
    'ATM': {
        name: 'Aztreonam',
        fullName: '',
        examples: {Aztreonam: {route: "IV"}},
        abxClass: 'other-abx',
        comments: 'Aztreonam is a unique beta-lactam that is most often used in patients with a <b>true beta-lactam ("' +
        'penicillin") allergy</b>. It exclusively covers gram negative bugs, including <i>Pseudomonas</i>. ' +
        "It's a weak inducer of AmpC beta-lactamases, but is a good substrate (see <mark><b>AmpC</b></mark> for what " +
        "this means). This makes it similar to ceftriaxone or pip/tazo for AmpC coverage: Not great"
    },
    'Aminogly': {
        name: 'Aminoglycosides',
        fullName: '',
        examples: {
            Amikacin: {route: "IV"},
            Gentamicin: {route: "IV"},
            Tobramycin: {route: "IV"}
        },
        abxClass: 'other-abx',
        comments: `Aminoglycosides are used to treat gram negative infections, including <i>Pseudomonas</i>.
        Aminoglycosides have high rates of <b>nephrotoxicity & ototoxicity</b>, which limits their use in clinical
        practice<br><br>


        Note: Gentamicin can have a synergistic effect for many gram positives (Staph aureus, Enterococcus) when used
        with other antibiotics (but shouldn't be used for gram positives alone).
        `
    },
    'AZM': {
        name: 'Azithromycin',
        fullName: 'Macrolides',
        examples: {
            Azithromycin: {route: "PO/IV", trade: "Zithromax"},
            Erythromycin : {route: "PO/IV"}
        },
        abxClass: 'other-abx',
        comments: 'Macrolides are commonly used for treatment of bacterial pneumonia. A "Z-pak" is 500mg of azithromycin, ' +
        "followed by 250mg for 4 more days; it's also acceptable to do 500mg daily for 3 days. <br><br>" +
        "As a class, macrolides are associated with <b>QTc prolongation</b> and GI symptoms. In fact, erythromycin is more " +
        'so used for the pro-motility "side effects"; however, it ' + "shouldn't be used for more than 2 weeks since it " +
        "down-regulates motilin receptors. Finally there are many drug-drug interactions, especially with cardiac medications"
    },
    'TMPSMX': {
        name: 'Bactrim',
        fullName: '',
        examples: {"Trimethoprim-sulfamethoxazole": {
            route: "IV/PO", trade: "Bactrim", abbv: "TMP-SMX"
        }},
        abxClass: 'other-abx',
        comments: 'Bactrim has broad activity against many gram negative infections, including MDR bugs, such as ' +
        "<mark><i>Stenotrophomonas maltophilia</i></mark>, and Staph infections (including <b>MRSA</b>).<br><br>" +
        "Monitor renal function on TMP-SMX. It can cause <b>acute kidney injury</b> (AIN or ATN) and <b>hyperkalemia</b> " +
        "(from TMP blocking potassium secretion). Trimethoprim can also increase the serum creatinine independently " +
        "(without affecting the GFR) by competing with creatinine for secretion from the proximal renal tubules. TMP-SMX " +
        "also may cause <b>myelosuppression</b> & ITP, GI side effects, <b>SJS/TEN</b>, and other side effects." +
        "<br><br>Fun fact: In addition to treating bacterial infections, TMP-SMX has antifungal (<i>Pneumocystis " +
        "jiroveci</i>), antiparasitic (<i>Toxoplasma gondii</i>), and antimycobacterial (<i>Mycobacterium fortuitum</i>) " +
        "activity!"
    },
    'Quino': {
        name: 'Fluoroquinolones',
        fullName: 'Fluoroquinolones',
        examples: {
            Ciprofloxacin: {route: "PO/IV", trade: "Cipro"},
            Levofloxacin: {route: "PO/IV", trade: "Levaquin"},
            Moxifloxacin: {route: "PO/IV"}
        },
        abxClass: 'other-abx',
        comments: "<ul>" +
        "<li>Cipro doesn't have as good of gram positive activity (vs levo/moxi)</li>" +
        "<li>Pseudomonas activity: cipro &gt; levo &gt;&gt; moxi</li>" +
        "<li>Moxifloxacin is the only one with anaerobic coverage (especially intraabdominal)</li>" +
        '<li>For the "bad bugs", you can <b>sometimes</b> use Levofloxacin (<mark>Steno, Acinetobacter</mark>) or Cipro (<mark>Acinetobacter</mark>)</li>' +
        "</ul>" +
        "Associated with many side effects: <b>QT prolongation</b>, GI side effects (one of the highest rates of " +
        "<b><i>C diff</i></b>), achilles tendon ruptures, development of <b>aortic aneurysm</b>, worsening of myasthenia " +
        "gravis (to name a few)"

    },
    'NIT': {
        name: 'Nitrofurantoin',
        fullName: '',
        examples: {Nitrofurantoin: {route: "PO", trade: "Macrobid"}},
        abxClass: 'UTI-abx',
        comments: 'Nitrofurantoin is used to treat <b>uncomplicated lower</b> urinary tract infections, namely cystitis. It has ' +
        "little activity outside of the bladder, so should <b>not be used for pyelonephritis, prostatitis, or bacteremia</b>. " +
        "It is not reliable for <i>Proteus</i>, <i>Serratia</i>, or <i>Pseudomonas</i>.<br><br>" +
        "It can also be used for <b>UTI <u>prophylaxis</u></b>, although prolonged use can cause pulmonary fibrosis."
    },
    'FOF': {
        name: 'Fosfomycin',
        fullName: '',
        examples: {Fosfomycin: {route: "PO"}},
        abxClass: 'UTI-abx',
        comments: 'In the US, oral fosfomycin is mainly used for lower UTIs; it should not be used for pyelonephritis ' +
        "or bacteremia because systemic and renal-parenchymal levels are inadequate. Elsewhere the IV formulation is " +
        "available, which has broader uses. Oral activity is best established for <i>E. coli</i> cystitis, including " +
        "many ESBL isolates; activity against <i>Klebsiella</i>, AmpC producers, CRE, VRE, and <i>Pseudomonas</i> is more " +
        "variable and should be culture-guided.<br><br>" +
        "For uncomplicated cystitis, you can use a single dose, which makes it an attractive treatment option. However, " +
        "you should avoid using fosfomycin as empiric treatment when broader or invasive infection is possible. Always " +
        "use cultures to guide therapy when resistance or complicated infection is a concern."
    } ,
    /***  Extended spectrum
     * Vabomere      Meropenem-Vaborbactam
     * Recarbrio     Imipenem-Cilastatin-Relebactam
     * Zerbaxa       Ceftolozane-Tazobactam
     * Avycaz        Ceftazidime-Avibactam
     * Cefiderocol
     *
    ***/
    'Zerbaxa': {
        name: 'Zerbaxa &trade;',
        fullName: '',
        examples: {"Ceftolozane-Tazobactam": {route: "IV", trade:"Zerbaxa", abbv:"C/T"}},
        abxClass: 'extended', // cephalosporins
        comments: `Ceftolozane-Tazobactam is an antipseudomonal cephalosporin (ceftolozane) paired with tazobactam. The
        primary use of Zerbaxa is for <b>multidrug resistant Pseudomonas</b>. Unlike the other drugs in this section,
        it <span class="text-danger">lacks activity against CRE bugs</span>.<br><br>

        My memory trick for this one is that is shares the same beta-lactamase inhibitor as Zosyn (<b>Tazobactam</b>),
        which is also used for Pseudomonas. However, unlike Zosyn (pip/tazo), the tazobactam in Zerbaxa doesn't give it
        good enough anaerobic coverage, so metronidazole is still needed if you're trying to cover for intra-abdominal
        infections.`
    },
    'Vabomere': {
        name: 'Vabomere &trade;',
        fullName: '',
        examples: {"Meropenem-Vaborbactam": {route: "IV", trade:"Vabomere", abbv:"MEM/VAB"}},
        abxClass: 'extended', // carbapenems
        comments: `Vabomere adds vaborbactam to meropenem, which restores activity for enterobacterales that produce
        <b>KPC carbapenemases</b>, and is the drug of choice for these CREs (Ambler class A). It does not help with
        bugs producing MBLs (Ambler class B, e.g. NDM) or oxacillinases (Ambler class D, e.g. OXA), which means it
        doesn't expand the coverage of <span class="text-danger">meropenem resistant Pseudomonas</span> or Acinetobacter.`
    },
    'Recarbrio': {
        name: 'Recarbrio &trade;',
        fullName: '',
        examples: {"Imipenem-Cilastatin-Relebactam": {route: "IV", trade:"Recarbrio", abbv:"IPM/CLN/REL"}},
        abxClass: 'extended', // carbapenems
        comments: `Recarbrio "fixes" both of the "holes in coverage" of Zerbaxa & Vabomere, as it has activity against
        <b>both CRE and DTR Pseudomonas</b> (respectively). This makes it very similar to Avycaz (Ceftazidime-Avibactam),
        although unlike Avycaz, it doesn't have much activity against <span class="text-danger">OXA-48</span> (Ambler
        class D), but it does have anaerobic coverage.`
    },
    'Avycaz': {
        name: 'Avycaz &trade;',
        fullName: '',
        examples: {"Ceftazidime-Avibactam": {route: "IV", trade:"Avycaz", abbv:"CAZ/AVI"}},
        abxClass: 'extended', // cephalosporins
        comments: `Ceftazidime adds the novel beta-lactamase avibactam to expand coverage to DTR Pseudomonas and CRE,
        <b>including OXA carbapenemases</b> (unlike Recarbrio / Imipenem-Cilastatin-Relebactam). However, similar to
        all of the other antibiotics in this section (aside from cefiderocol), it lacks activity against <span class="text-danger">
        metallo-beta-lactamases</span> (Ambler class B, e.g. NDM).`
    },
    'Cefiderocol': {
        name: 'Cefiderocol',
        fullName: '',
        examples: {"Cefiderocol": {route: "IV", trade:"Fetroja", abbv:"FDC"}},
        abxClass: 'extended', // cephalosporins
        comments: `Cefiderocol has broad gram negative activity, including steno, Acinetobacter, DTR PsA, and CRE
        (including common mechanisms of resistance such as <b>MBLs</b>, porin deletions, etc). However, it has a label
        warning for higher all-cause mortality versus other antibiotics in critically ill patients.<br><br>

        <small>
        The mechanism of cefiderocol is highlighted by its brand name, <b class="text-danger">Fe</b><b class="text-info">troja</b>.
        Cefiderocol behaves and looks structurally similar to bacterial siderophores (molecules that bacteria release to
        scavenge for/chelate free ferric iron); it chelates iron ions (<b class="text-danger">Fe<sup>3+</sup></b>) and uses
        the same bacterial iron transport systems to enter bacteria. Once inside the bacteria, it dissociates from the
        iron and binds to PBPs (the so called "<b class="text-info">Troja</b>n Horse" strategy) to inhibit growth.</small>

        `
    },
    'Xacduro': {
        name: 'Xacduro &trade;',
        fullName: '',
        examples: {"Sulbactam-Durlobactam": {route: "IV", trade:"Xacduro"}},
        abxClass: 'penicillins', // penicillins
        comments: `Sulbactam-Durlobactam is a novel combination of two beta-lactamase inhibitors, sulbactam (which has
        antibacterial activity against <i>Acinetobacter</i>) and durlobactam (which prevents the breakdown of sulbactam).
        It's only current use is for treatment of infections with <mark><i>Acinetobacter baumannii</i></mark>.<br><br>

        Technically this doesn't fall under the category of penicillins since it contains only beta-lactamase inhibitors.`
    }




};

/******************************************************************************\
 * BACTERIA
 \*****************************************************************************/
const BACTERIA = {
    'GNR': {
        name: 'Non-resistant Enterobacterales (gut gram negative rods)',
        bugExamples: `Escherichia, Klebsiella, Proteus, Serratia, Citrobacter,
        Morganella, Enterobacter, Providencia, Shigella, Salmonella, Yersinia`,
        bugClass: 'GN',
        comments: `Gram negative bacilli (GNR) can be divided into three broad categories:
        <ol><li>
        <b>Enterobacterales</b> <small class="text-muted">(gut bacteria)</small> <small>But don't let the "gut bacteria"
        mislead you, as these bacteria often cause infections outside the gut too!</small>
        </li><li>
        <b>Non-enterobacterales</b> <small class="text-muted">(e.g. Bartonella, Vibrio, H flu, Lyme, Legionella, Pasteurella,
        Bordetella, Leptospira).</small> <small>Many of these are covered in the <mark>Zoonotic</mark> section, so
        ignore them for now</small>
        </li><li>
        <b>Non-fermenters</b> <small class="text-muted"> such as <mark>Pseudomonas</mark>, <mark>Stenotrophomonas</mark>,
        <mark>Acinetobacter</mark>, and Burkholderia.</small> <small>See their respective sections for details</small>
        </li></ol>

        When you're first starting out, you can think of the <b>majority of gram negative rods as enterobacterales</b>
        and focus on learning the "exceptions" (like <mark>Pseudomonas</mark>) . This section focuses on the
        enterobacterales that <b>intrinsically</b> have more <b>favorable</b> resistance patterns. If there is concern
        for <mark>ESBL or CRE</mark>, please see those respective sections. <i><small>` +
        COMMONTEXT.susceptibility + `.</i> <br>

        <u>Technical note</u>: The label for this category ("Friendly GNR") is a bit of an oversimplification, since it
        does ignore non-enterobacterales altogether. A more appropriate label would be <b>"enterobacterales at low risk
        of inducible AmpC &#946;-lactamase production and without chromosomal/plasmid-mediated resistance"</b> but
        that's a little wordy for a tool to teach medical students/interns about antibiotics!</small>`
    },
    'PsA': {
        name: 'Pseudomonas aeruginosa (susceptible)',
        bugExamples: '',
        bugClass: 'GN',
        comments: `Pseudomonas is a <b>nonfermenting gram negative rod</b> that can cause a variety of infections in
        both immunocompetent and immunocompromised patients. Treatment options include <b>antipseudomonal penicillins</b>
        (piperacillin-tazobactam; Zosyn), some <b>cephalosporins</b> (ceftazidime & cefepime), <b>aztreonam</b>, some
        <b>carbapenems</b> (meropenem & imipenem-cilastatin; ertapenem won't work), and <b>fluoroquinolones</b>
        (ciprofloxacin & levofloxacin).<br><br>

        This section focuses on strains of Pseudomonas that are generally susceptible to the above antibiotics. Because
        <i>Pseudomonas</i> can have a variety of resistance mechanisms, please see <mark>DTR PsA</mark> for strains of
        Pseudomonas that have resistance.<br><br>` +
        COMMONTEXT.susceptibility
    },
    'AmpC': {
        name: 'AmpC producers (HECK Yes)',
        bugExamples:
            `<b class=text-danger>H</b>afnia alvei,
            <b class=text-danger>E</b><b class="text-info">nterobacter cloacae</b>,
            <b class=text-danger>C</b><b class="text-info">itrobacter freundii</b>,
            <b class=text-danger>K</b><b class="text-info">lebsiella aerogenes</b>,
            <b class=text-danger>Ye</b>r<b class=text-danger>s</b>inia enterocolitica`,
        bugClass: 'GN',
        comments: `There are a subset of bacteria that have <b>inducible</b> &#946;-lactamase (&#946;L) production,
        meaning that when that bacteria is exposed to a beta-lactam antibiotic, it signals for the bacteria to produce
        the &#946;L (this is not to be confused with <i>constitutive</i> production of a &#946;L at baseline).
        The bacteria with inducible AmpC production have gone by many mnemonics over the years (ESCAPPM / SPACE / SPICE),
        but as of IDSA guidance, the most worrisome bacteria in this class are <b><i>Enterobacter cloacae</i></b>,
        <b><i>Citrobacter freundii</i></b>, and <b><i>Klebsiella aerogenes</i></b>.<br><br>

        Treatment of invasive infections with these bacteria should either be with cefepime or a carbapenem, as these
        agents do not heavily induce AmpC production and are more resistant to AmpC. Note: the "HECK Yes" list doesn't
        include bacteria that have non-inducible chromosomal AmpC production (e.g. <i>Acinetobacter
        baumannii</i>).

        <br><br>
        <table class="table table-sm">
        <thead>
          <tr>
            <th></th>
            <th scope="col">Strong Inducer</th>
            <th scope="col">Weak Inducer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Good substrate </th>
            <td>Aminopenicillins, 1 &amp; 2nd gen</td>
            <td>3rd gen, piperacillin, aztreonam</td>
          </tr>
          <tr>
            <th scope="row">Poor substrate</th>
            <td>Imipenem</td>
            <td>Cefepime, meropenem</td>
          </tr>
        </tbody>
        </table>
        Source: <a href="https://www.idstewardship.com/heck-yes-get-amped-updates-ampc-harboring-bacteria/">
        idstewardship.com's post on AmpC</a>, which adapted from MacDougall. J Pediatr Pharmacol Ther. 2011;16(1):23-30.`
    },
    'ESBL': {
        name: 'Extended-spectrum beta-lactamases',
        bugExamples: 'ESBL E coli, ESBL Klebsiella, ESBL Proteus',
        bugClass: 'GN',
        comments: `Moving up in the spectrum of "gram negative badness" we reach gram negative bacteria that produce
        extended-spectrum beta-lactamases (ESBLs). <b>ESBLs are enzymes that inactivate most penicillins, cephalosporins,
        and aztreonam</b>. The most common ESBL enzymes in the US (<b>CTX-M</b>) does not affect carbapenems nor
        non-&#946;-lactam antibiotics <small class='text-muted'>(e.g. TMP-SMX, fluoroquinolones, fosfomycin [for E coli
        UTI only]; </small><small>keep in mind the same risk factors that made the patient develop an ESBL means these
        antibiotics may not be effective either)</small>.<br><br>

        Any gram negative can  harbor ESBL genes; however, they are most prevalent in Escherichia coli, Klebsiella
        pneumoniae, Klebsiella oxytoca, and Proteus mirabilis. See section 1 of the
        <a href="https://doi.org/10.1093/cid/ciad527">2023 IDSA Guidance on the Treatment of Antimicrobial Resistant
        Gram-Negative Infections</a> for treatment details. Finally, it's important to distinguish colonization from
        true infection (which can be challenging)`
    },
    'CRE': {
        name: 'Carbapenem-Resistant Enterobacterales',
        bugExamples: '',
        bugClass: 'GN',
        comments: `Carbapenem-resistant (CR) enterobacterales are, as the name implies, resistant to carbapenems (for
        carbapenem-resistant Pseudomonas, see <mark>DTR PsA</mark>). Though not all CR is mediated via carbapenemase
        production, the most common carbapenemases in the United States are <b>KPCs</b> (Kleb pneumo carbapenemases,
        which don't exclusively occur in <i>K. pneumoniae</i>); others include NDMs, OXA-48s, VIMs, and IMPs.<br><br>

        At this point you're running out of antibiotics and  probably have already reached out to the infectious diseases
        team. For KPC producing CRE (Ambler class A), <b>Vabomere</b> (Meropenem-Vaborbactam) is an ideal choice
        <small>(preferred over Avycaz [Ceftazidime-Avibactam] since you're saving the Ambler class D activity)</small>.`
    },
    'Steno': {
        name: 'Stenotrophomonas maltophilia ("steno")',
        bugExamples: '',
        bugClass: 'GN',
        comments: `Stenotrophomonas is one of the "nonfermenting GNRs" that can be challenging to treat. It has
        an <b>impressive amount of intrinsic resistance</b>: chromosomal beta-lactamases hydrolyzes penicillins,
        cephalosporins, aztreonam, and carbapenems (oh and chromosomal resistance to aminoglycosides). This leaves you
        with Bactrim, fluoroquinolones, and tetracyclines (at baseline), and this is assuming that it hasn't developed
        efflux pumps to take these off of the table.<br><br>

        <b>There is no standard of care</b> treatment (please call ID). Therapy should be guided by cultures (and often
        use combination therapy). The best empiric agents are <b>tetracyclines</b> (mino, tige) and <b>Bactrim</b>.
        Additionally, although steno can cause severe infections, it can sometimes be a colonizing organism and not
        implicated in a true infection.

        <br><br>Note: In theory, the combination of ceftazidime-avibactam and aztreonam can be used. Avibactam blocks
        the L2 serine BL from hydrolyzing aztreonam (see question 6.6 of the 2023 IDSA guidelines).`
    },
    'CRAB': {
        name: 'Acinetobacter Species',
        bugExamples: 'CRAB = Carbapenem resistant <i>Acinetobacter baumannii</i>',
        bugClass: 'GN',
        comments: `Acinetobacter is a difficult to treat nosocomial opportunistic infection that can cause hospital-associated pneumonia, SSTI/wound
        infections/osteomyelitis, UTIs, meningitis, bacteremia, and more. It is one of the most resistant bacteria (along
        with the other nonfermenting GNRs), and <b>does not have a standard of care</b>.<br><br>

        Therapy should be guided by cultures. In cases where there is susceptibility to cefepime or meropenem, those
        agents should be used. In carbapenem resistant <i>Acinetobacter baumannii</i> (<b>CRAB</b>), potential agents
        include cefiderocol, minocycline/tigecycline (not for bacteremia), imipenem-cilastatin, fluoroquinolones, and
        sulbactam (see below).<br><br>

        Sulbactam has unique activity against Acinetobacter, so you can use <b>high dose Unasyn</b> (ampicillin has no
        activity, you're just using it for the sulbactam). You may also use the double beta-lactamase inhibitor, Xacduro
        (Sulbactam-Durlobactam); the durlobactam prevents degradation of sulbactam.`
    },
    'DTR': {
        name: 'Difficult-to-Treat Resistance Pseudomonas aeruginosa',
        bugExamples: '',
        bugClass: 'GN',
        comments: `As with all of the multidrug-resistant nonfermenting GNRs, using cultures (and an ID consult) are
        paramount for treatment. For empiric therapy of DTR-PsA (see note on terminology below), <b>Zerbaxa</b>
        (ceftolozane-tazobactam) is a reasonable option. Other options include Avycaz (ceftazidime-avibactam), Recarbrio
        (imipenem-cilastatin-relebactam), or cefiderocol, depending on the mechanism of resistance.<br><br>

        <u>Note on terminology</u>: the 2023 IDSA guidelines define multidrug-resistant (MDR) Pseudomonas as an isolate
        that is resistant to at least one antibiotic in three of the five following antibiotic classes: penicillins,
        cephalosporins, fluoroquinolones, aminoglycosides, and carbapenems. DTR is an isolate that is resistant to all
        antibiotics in all five classes.`
    },
    'MSSA': {
        name: 'Methicillin-susceptible Staph aureus',
        bugExamples: '',
        bugClass: 'GP',
        comments: `Staph aureus causes a variety of infections, including bacteremia/endocarditis, skin & soft tissue
        infections, osteomyelitis, septic arthritis, pneumonia, and healthcare associated infections (e.g. CLABSI).
        Please consult ID for all cases of Staph aureus bacteremia!<br><br>

        For MSSA, the first line agents for invasive infections (such as bacteremia) are cefazolin or nafcillin. The use
        of other beta-lactams (like ceftriaxone) has not been well studied and is not advised.`
    },
    'MRSA': {
        name: 'Methicillin-resistant Staph aureus',
        bugExamples: '',
        bugClass: 'GP',
        comments: `Staph aureus causes a variety of infections, including bacteremia/endocarditis, skin & soft tissue
        infections, osteomyelitis, septic arthritis, pneumonia, and healthcare associated infections (e.g. CLABSI).
        Please consult ID for all cases of Staph aureus bacteremia!`
    },
    'SOSA': {
        name: 'Staphylococcus spp other than Staph aureus',
        bugExamples: 'S epidermidis, S hominis, S capitis, <b class="text-info">S lugdunensis</b>, S caprae, S haemolyticus, S saprophyticus',
        bugClass: 'GP',
        comments: `Staph other than Staph aureus (SOSA) consist of the <b>coagulase-negative staph (CONS)</b> and <i>
        Staphylococcus saprophyticus</i> (which is covered under the <mark>Misc</mark> category)<br><br>

        Generally these common skin flora contaminate blood cultures, but suspect a true infection in cases with the
        patient has prosthetic devices/hardware, dialysis catheters (especially peritoneal), or indwelling vascular
        lines. These are often methicillin resistant bacteria. <i class="text-info">Staphylococcus lugdunensis</i> is
        an exception, as it behaves similar to Staph aureus and can cause severe infections.
        `
    },
    'Strep': {
        name: 'Streptococcus spp.',
        bugExamples: `S. pyogenes (GAS, &#946;), S. agalactiae (GBS, &#946;), S.  pneumoniae (&#593;), viridans group
        (&#593;), anginosus group (varies)`,
        bugClass: 'GP',
        comments: `The Streptococcus spp. are a confusing bunch of gram positive cocci <b>in chains</b>,  because we
        have multiple ways of classifying them (e.g. &#593;/&#946;/&#947; hemolysis or the Lancefield groups A-F).
        In the future I should make a schema for strep alone, but for now let's focus on a few of the highest yield
        species: <ul>
        <li>Group A (<i><b>S. pyogenes</b></i>) and other &#946; hemolytic strep can cause cellulitis, pharyngitis, bacteremia</li>
        <li><i><b>S. agalactiae</b></i> (Group B, &#946; hemolytic) can cause neonatal meningitis but also causes infections
        in older/immunocompromised adults</li>
        <li><i><b>S. pneumoniae</b></i> (&#593; hemolytic) can cause pneumonia, sinusitis, meningitis, bacteremia</li>
        <li>&#947;-hemolytic strep, formerly GDS, are now Enterococcus; <mark>see <b>VSE</b> & <b>VRE</b></mark></li>
        </ul>`
    },
    'VSE': {
        name: 'Vancomycin-sensitive Enterococcus',
        bugExamples: `Often <i>Enterococcus faec<b class="text-success">alis</b></i>, sometimes <i>E faec<b class="text-danger">ium</b></i>`,
        bugClass: 'GP',
        comments: `Enterococcus commonly causes hepatobiliary, urinary, and bloodstream infections. If it's isolated in
        the bloodstream there is a good chance they have endocarditis, which can be difficult to treat (it may be a good
        idea to consult ID, similar to Staph aureus bacteremia).<br><br>

        <i>E. <b class="text-danger">faecium</b></i> tends to have more resistance than <i>E. <b class="text-success">
        faecalis</b></i>, but exceptions do occur. ` + COMMONTEXT.susceptibility
    },
    'VRE': {
        name: 'Vancomycin-resistant Enterococcus',
        bugExamples: 'Often <i>Enterococcus faec<b class="text-danger">ium</b></i>, sometimes <i>E faec<b class="text-success">alis</b></i>',
        bugClass: 'GP',
        comments: `Enterococcus commonly causes hepatobiliary, urinary, and bloodstream infections. If it's isolated in
        the bloodstream there is a good chance they have endocarditis, which can be difficult to treat (it may be a good
        idea to consult ID, similar to Staph aureus bacteremia).<br><br>

        <i>E. <b class="text-danger">faecium</b></i> tends to have more resistance than <i>E. <b class="text-success">
        faecalis</b></i>, but exceptions do occur. ` + COMMONTEXT.susceptibility
    },
    'anaerobes': {
        name: 'Anaerobes',
        bugExamples: 'Bacteroides, Clostridium, Actinomyces, Peptostreptococci, Prevotella, Fusobacterium',
        bugClass: 'ana',
        comments: `

        <b><i>Bacteroides</i> spp</b> are gram negative anaerobes that are found in the colon and female reproductive
        tract and are often causative in intraabdominal abscesses, but can also cause abscesses outside of the abdomen.

        <b><i>Clostridium</i> spp</b> are spore forming gram positives that often cause colitis (<i>C difficile</i>) and
        gas gangrene (<i>C perfringens</i> and other Clostridium spp). <br><br>

        <b><i>Actinomyces</i> spp</b> are gram positives that colonize the GI tract that can cause head/neck, thoracic,
        and abdominal infections.

        <b><i>Peptostreptococcus</i></b> are gram positives that can cause chronic sinusitis/otitis media & pelvic
        inflammatory disease.

        <b><i>Prevotella</i></b> and <b><i>Fusobacterium necrophorum</i></b> are common gram negative causes of
        peritonsillar abscesses, and can be associated with internal jugular vein thrombosis (AKA Lemierre syndrome).
        `
    },
    'Other': {
        name: 'Not classified elsewhere / exceptions',
        bugExamples: '',
        bugClass: 'other',
        comments: `
        <b><i>Staphylococcus saprophyticus</i></b> technically falls under the "Staph other that staph aureus" or "coag
        negative staph" group, but it behaves differently so I categorized it here. It's a common cause of UTI and is
        generally susceptible to most antibiotics used to treat UTIs (except fosfomycin). Treatment options include
        Bactrim, Augmentin, most cephalosporins, and fluoroquinolones.<br><br>

        <b><i>Neisseria meningitidis</i></b> is an important cause of meningitis (as the name implies). Treatment of
        choice is ceftriaxone (ciprofloxacin is used for meningitis prophylaxis).<br><br>

        <b><i>Listeria monocytogenes</i></b> can cause meningitis and bacteremia in immunocompromised hosts. Treatment of
        choice is Ampicillin
        `
    },
    'PNA': {
        name: 'Atypical pneumonias',
        bugExamples: 'Mycoplasma pneumoniae, Legionella pneumophila, Chlamydia pneumoniae, Chlamydia psittaci',
        bugClass: 'atyp',
        comments: `Atypical pneumonias are called "atypical" because they do not grow well with traditional methods.
        This is in part because most of these bacteria lack cell walls. <i>C pneumoniae</i> often develops in younger
        children, whereas <i>C psittaci</i> is more associated with pet birds. <i>Mycoplasma</i> is the classic "walking
        pneumonia" and is generally less severe than <i>Legionella</i>.`
    },
    'Zoo': {
        name: 'Zoonotic & tick-borne bacteria',
        bugExamples: "<u>Zoonotic:</u> Leptospirosis, Brucella, Q fever, Bartonella, Yersinia pestis<br> " +
        "<u>Tick-borne:</u> Rickettsia, Lyme, Babesiosis, Anaplasmosis/Ehrlichiosis, Tularemia",
        bugClass: 'atyp',
        comments: `This is such a broad category and it's beyond the scope of this page to talk about all of the
        zoonotic & tick-borne pathogens (and their treatments). The important takeaway for learners is that
        tetracyclines, in particular <mark><b>doxycycline</b></mark> has activity against many of these bugs.`
    }
};

/******************************************************************************\
 * SYNDROMES
 \*****************************************************************************/
const SYNDROMES = {
    'Empiric': {
        name: 'Empiric / Sepsis',
        fullName: 'Empiric treatment for sepsis',
        comments: `
        Sepsis is complicated and this tool doesn't take into account important factors (e.g. immunocompromise, prior
        micro data, antibiotic exposure)<br><br>

        This is just a suggestion for bugs that cause undifferentiated infections and that empiric antibiotics that are
        often used
        `
    },
    'UTI': {
        name: 'UTI',
        fullName: 'Urinary tract infection',
        comments:  `<i>Staphylococcus saprophyticus</i> can also cause UTIs. <i>Staph aureus</i> is <b>not normal</b>
        in the urine. If thought to be a true pathogen (not contaminant), you should suspect hematogenous seeding (e.g.
        bacteremia, renal abscess).<br><br>` + COMMONTEXT.MDR
    },
    'CAP': {
        name: 'CAP',
        fullName: 'Community acquired pneumonia',
        comments: COMMONTEXT.PNA + " <mark>Also see <b>HAP/VAP risk</b></mark><br><br>" + COMMONTEXT.aspiration
    },
    'HAP': {
        name: 'HAP/VAP risk',
        fullName: 'Hospital-acquired pneumonia / pneumonia with resistant-pathogen risk factors',
        comments: COMMONTEXT.PNA + " <mark>Also see <b>CAP</b></mark><br><br>" + COMMONTEXT.MDR
    },
    'SSTI': {
        name: 'Cellulitis / SSTI',
        fullName: 'Cellulitis and other skin/soft tissue infections',
        comments: `Common simple SSTIs include cellulitis, erysipelas, impetigo, ecthyma, folliculitis, furuncles,
        carbuncles, and abscesses. Classically, <b>purulent</b> infections are caused by <i>Staph aureus</i> and
        <b>nonpurulent</b> infections are caused by <i>beta-hemolytic strep</i>. Abscesses should be drained, in which
        case they often don't require antibiotics.<br><br>

        <b class='text-danger'>Notable exceptions not mentioned here:</b> <i>Pseudomonas</i> (folliculitis, ecthyma
        gangrenosum), <i>Vibrio</i> (seawater/seafood, hemorrhagic bullae), <i>Clostridium</i> (necrotizing fasciitis).
        Also see <mark><b>foot ulcer</b></mark> for deeper infections and <mark><b>septic arthritis</b></mark> if there
        is concern for joint involvement.
        `
    },
    'Foot': {
        name: 'Foot ulcer',
        fullName: 'Foot ulcers (with focus on diabetes)',
        comments:  `This is a complicated topic, but my (oversimplified) approach is in a stepwise manner:
        <ol><li>
        <b>Superficial inflammation: </b>Staph (including MRSA) and strep
        </li><li>
        <b>Fascia involved:</b> Add GNRs (and Pseudomonas if they have a history of such or recent antibiotics)
        </li><li>
        <b>Deep tissue involved:</b> Add anaerobes. Also <mark>see <b>osteomyelitis</b></mark> if the bone is involved.
        </li></ol>

        It is also paramount to check for peripheral <b>vascular disease</b> as many folks need revascularization
        (sometimes urgently).<br><br>
        ` + COMMONTEXT.waitCx
    },
    'Osteo': {
        name: 'Osteomyelitis',
        fullName: 'Osteomyelitis',
        comments: `This is an oversimplified approach to the <i>most common</i> causes of <b class='text-danger'>
        non-hematogenous</b>, osteomyelitis <b class='text-info'>in adults</b>. Anaerobes are generally more of a concern
        in chronic osteo (vs acute). <br><br>` +

        COMMONTEXT.waitCx + "<br><br>" +
        COMMONTEXT.MDR + ` For chronic OM, there is often drug resistance, making it all the more important to obtain
        cultures (if able) to guide long term antibiotics.<br><br>

        <b>Good orals:</b> Some antibiotics with decent oral bioavailability and bone penetration are
        <b class='text-success'>A</b><b>ugmentin</b> (Amoxicillin-clavulanic acid),
        <b class='text-success'>B</b><b>actrim</b> (TMP-SMX),
        <b class='text-success'>C</b><b>iprofloxacin</b> (fluoroquinolones generally),
        <b class='text-success'>D</b><b>oxycycline</b>, and
        <b class='text-success'>Z</b><b>yvox</b> (linezolid)
        `
    },
    'IAI': {
        name: 'IAI',
        fullName: 'Intra-abdominal infection (bowel flora)',
        comments: `Clinical scenarios include secondary peritonitis (bowel perforation, ischemic bowel, intraabdominal
        abscess), diverticulitis, ruptured appendix, etc. <b>Anaerobic coverage is a must</b> (for <i>Bacteroides</i>
        spp., but often polymicrobial) and a <b>surgical consult is indicated</b>.<br><br>

        Good oral options for uncomplicated cases (e.g. diverticulitis) include a fluoroquinolone (gram negatives) plus
        metronidazole (Flagyl, for anaerobes). These both have excellent oral bioavailability.
        `
    },
    'Hepatobiliary': {
        name: 'Hepatobiliary infections',
        fullName: 'Hepatobiliary stuff (cholangitis, cholecystitis, liver abscess)',
        comments: `Most common bacteria are enterobacteriaceae (gram negative rods) enterococcus, and anaerobes
        (Clostridium and Bacteroides spp). For many of these conditions antibiotics are not definitive therapy, and
        these folks need some kind of procedural intervention (cholecystectomy, percutaneous drain, ERCP). `
    },
    'SBP': {
        name: 'SBP',
        fullName: 'Spontaneous bacterial peritonitis',
        comments: `Seen in cirrhosis patients with ascites. Diagnostic criteria &#8805; 250 cells/uL from ascitic fluid.
        Cultures of ascitic fluid are often negative even in true infection. Most common treatment is ceftriaxone`
    },
    'Meningitis': {
        name: 'Meningitis',
        fullName: 'Bacterial meningitis (community acquired)',
        comments: `This covers <b class='text-danger'><u>immunocompetent</u></b> <b class='text-info'>adults</b> with
        acute community acquired <b>bacterial</b> meningitis. Meningitis does not fit well into the "bacteria" schema
        I've developed, so please read this text.<br><br>

        The two most common pathogens are <i>Strep. pneumoniae</i> and <i>Neisseria meningitidis</i>. The combo of ceftriaxone
        and vancomycin cover these two bacteria (vanco is needed for resistant strains of S. pneumoniae). <i>Listeria
        monocytogenes</i> should be considered in immunocompromised patients, pregnancy, and older adults (add ampicillin).
        <b>Dexamethasone</b> should be given 15-20 minutes <b>before the first dose of antibiotics</b>.
        `
    },
    'SA': {
        name: 'Septic arthritis',
        fullName: 'Septic arthritis',
        comments: `Most common pathogens are Staph aureus, Streptococcus sp., and gram negative rods. If sexually
        active, consider <i>Neisseria gonorrhoeae</i>`
    }

};

/******************************************************************************\
 * COVERAGE REVIEW TOOLS
 *
 * Broad, teaching-oriented review matrices for non-bacterial antimicrobial
 * coverage. These are not dosing tables and are not intended for patient care.
 \*****************************************************************************/
const COVERAGE_REVIEW_TOOLS = {
    hiv: {
        title: 'HIV essentials',
        subtitle: 'A compact review of treatment, prevention, and the prophylaxis thresholds learners should recognize.',
        updated: '2026-07-01',
        columns: [
            {id: 'treatment', label: 'Treatment', hint: 'Role in ART for established HIV'},
            {id: 'prep', label: 'PrEP', hint: 'Pre-exposure prophylaxis'},
            {id: 'pep', label: 'PEP', hint: 'Post-exposure prophylaxis'},
            {id: 'hbv', label: 'HBV active', hint: 'Also active against hepatitis B'},
            {id: 'oi', label: 'OI prevention', hint: 'Opportunistic infection prophylaxis role'}
        ],
        callouts: [
            {
                title: 'ART big picture',
                text: 'Most initial ART is an INSTI-based complete regimen. Always check HIV RNA, resistance context, HBV status, pregnancy potential, interactions, and renal function.'
            },
            {
                title: 'PrEP and PEP',
                text: 'PrEP is prevention before exposure. PEP is urgent prevention after exposure and should start as soon as possible, using a full three-drug course when indicated.'
            },
            {
                title: 'OI thresholds',
                text: 'PCP: usually CD4 <200. Toxoplasma: IgG-positive and CD4 <100. MAC: selected CD4 <50 scenarios when ART is not promptly suppressive.'
            }
        ],
        groups: [
            {
                name: 'Treatment and prevention',
                agents: [
                    {
                        name: 'INSTI-based ART',
                        examples: 'BIC/FTC/TAF; DTG plus TAF/TDF + FTC/3TC',
                        coverage: {treatment: 'good', hbv: 'good'},
                        note: 'Common first-line pattern. Tenofovir plus FTC or 3TC adds HBV activity, which matters in HIV/HBV coinfection.'
                    },
                    {
                        name: 'Two-drug maintenance ART',
                        examples: 'DTG/3TC; long-acting CAB/RPV',
                        coverage: {treatment: 'some'},
                        note: 'Useful only in selected patients. Avoid simplification that drops HBV-active therapy when HBV treatment is needed.'
                    },
                    {
                        name: 'Boosted PI strategy',
                        examples: 'Darunavir/ritonavir or darunavir/cobicistat based',
                        coverage: {treatment: 'some'},
                        note: 'High resistance barrier, but boosting creates many drug interactions. Often a specialist-guided strategy.'
                    },
                    {
                        name: 'Oral PrEP',
                        examples: 'F/TDF; F/TAF for selected sexual exposures',
                        coverage: {prep: 'good', hbv: 'good'},
                        note: 'F/TDF is the broad oral PrEP workhorse. F/TAF is not used for receptive vaginal exposure and is not the injection-drug PrEP standard.'
                    },
                    {
                        name: 'Injectable PrEP',
                        examples: 'Long-acting cabotegravir',
                        coverage: {prep: 'good'},
                        note: 'Useful when daily oral adherence, renal disease, or patient preference makes oral PrEP less attractive.'
                    },
                    {
                        name: 'PEP regimen pattern',
                        examples: 'TDF/FTC plus DTG or RAL; other three-drug options',
                        coverage: {pep: 'good', hbv: 'good'},
                        note: 'Start promptly after a qualifying exposure. Do not delay the first dose for nonessential testing.'
                    }
                ]
            },
            {
                name: 'Common prophylaxis anchors',
                agents: [
                    {
                        name: 'TMP-SMX',
                        examples: 'Preferred PCP and Toxoplasma prophylaxis',
                        coverage: {oi: 'good'},
                        note: 'High-yield anchor: PCP at CD4 <200; Toxoplasma when IgG-positive and CD4 <100. Also covers several bacterial pathogens.'
                    },
                    {
                        name: 'PCP alternatives',
                        examples: 'Atovaquone, dapsone-based regimens, pentamidine',
                        coverage: {oi: 'some'},
                        note: 'Alternatives are narrower. Pentamidine does not protect against Toxoplasma; dapsone needs G6PD review.'
                    },
                    {
                        name: 'MAC prophylaxis',
                        examples: 'Azithromycin when indicated',
                        coverage: {oi: 'some'},
                        note: 'Only a narrow CD4 <50 scenario when ART is absent, viremic, or not expected to become suppressive promptly.'
                    },
                    {
                        name: 'Epidemiology-driven prevention',
                        examples: 'LTBI treatment; selected endemic fungal prophylaxis',
                        coverage: {oi: 'note'},
                        note: 'Use travel, residence, exposures, serologies, and local epidemiology. This is not a universal HIV prophylaxis bucket.'
                    }
                ]
            }
        ],
        sources: [
            {label: 'NIH ClinicalInfo HIV treatment guidelines', url: 'https://clinicalinfo.hiv.gov/en/guidelines/adult-and-adolescent-arv'},
            {label: 'CDC Clinical Guidance for PrEP, Apr. 30, 2026', url: 'https://www.cdc.gov/hivnexus/hcp/prep/index.html'},
            {label: 'CDC Clinical Guidance for PEP', url: 'https://www.cdc.gov/hivnexus/hcp/pep/index.html'},
            {label: 'NIH ClinicalInfo adult/adolescent OI chemoprophylaxis table, May 27, 2026', url: 'https://clinicalinfo.hiv.gov/en/guidelines/hiv-clinical-guidelines-adult-and-adolescent-opportunistic-infections/prophylaxis-prevent-first-episode?view=full'}
        ]
    },
    viral: {
        title: 'Other viral coverage',
        subtitle: 'Respiratory viruses, herpesviruses, CMV, and HBV. HCV has its own tab.',
        updated: '2026-07-01',
        columns: [
            {id: 'flu', label: 'Influenza A/B', hint: 'Treatment or post-exposure prophylaxis, depending on agent'},
            {id: 'covid', label: 'COVID-19', hint: 'Outpatient treatment role for high-risk patients'},
            {id: 'hsvVzv', label: 'HSV/VZV', hint: 'Mucocutaneous or uncomplicated disease'},
            {id: 'severeHsvVzv', label: 'Severe HSV/VZV', hint: 'CNS, disseminated, or hospitalized disease'},
            {id: 'cmv', label: 'CMV', hint: 'Treatment or suppression in selected immunocompromised hosts'},
            {id: 'resistantHerpes', label: 'Resistant herpesviruses', hint: 'Acyclovir-resistant HSV/VZV or resistant CMV'},
            {id: 'hbv', label: 'HBV', hint: 'Chronic hepatitis B activity'}
        ],
        groups: [
            {
                name: 'Respiratory viruses',
                agents: [
                    {
                        name: 'Oseltamivir',
                        examples: 'Oral neuraminidase inhibitor',
                        coverage: {flu: 'good'},
                        note: 'Common influenza option, including for hospitalized or high-risk patients.'
                    },
                    {
                        name: 'Baloxavir',
                        examples: 'Cap-dependent endonuclease inhibitor',
                        coverage: {flu: 'good'},
                        note: 'Single-dose option for uncomplicated influenza and selected post-exposure prophylaxis.'
                    },
                    {
                        name: 'Nirmatrelvir/ritonavir',
                        examples: 'Paxlovid',
                        coverage: {covid: 'good'},
                        note: 'Preferred oral outpatient COVID-19 option for high-risk patients when interactions can be managed.'
                    },
                    {
                        name: 'Remdesivir / molnupiravir',
                        examples: 'Alternative COVID-19 treatment patterns',
                        coverage: {covid: 'some'},
                        note: 'Remdesivir is IV and logistics-heavy; molnupiravir is an alternative when preferred options are not appropriate.'
                    }
                ]
            },
            {
                name: 'Herpesviruses and HBV',
                agents: [
                    {
                        name: 'Acyclovir family',
                        examples: 'Acyclovir, valacyclovir, famciclovir',
                        coverage: {hsvVzv: 'good', severeHsvVzv: 'some'},
                        note: 'Oral agents are common for mucocutaneous HSV/VZV. IV acyclovir is the severe/CNS/disseminated pattern.'
                    },
                    {
                        name: 'Ganciclovir family',
                        examples: 'Ganciclovir, valganciclovir',
                        coverage: {cmv: 'good'},
                        note: 'Main CMV treatment/suppression family. Marrow suppression and resistance become important in prolonged courses.'
                    },
                    {
                        name: 'Foscarnet / cidofovir',
                        examples: 'Resistant HSV or CMV salvage patterns',
                        coverage: {resistantHerpes: 'good', cmv: 'some'},
                        note: 'Useful for acyclovir-resistant HSV and selected resistant CMV, but toxicity often drives specialist management.'
                    },
                    {
                        name: 'Tenofovir or entecavir',
                        examples: 'HBV nucleos(t)ide analogues',
                        coverage: {hbv: 'good'},
                        note: 'High-barrier HBV agents. In HIV/HBV coinfection, tenofovir plus FTC or 3TC is usually part of a complete HIV regimen.'
                    }
                ]
            }
        ],
        sources: [
            {label: 'CDC influenza antiviral summary for clinicians, Mar. 10, 2026', url: 'https://www.cdc.gov/flu/hcp/antivirals/summary-clinicians.html'},
            {label: 'CDC COVID-19 outpatient treatment clinical care', url: 'https://www.cdc.gov/covid/hcp/clinical-care/outpatient-treatment.html'},
            {label: 'CDC STI Treatment Guidelines: Herpes', url: 'https://www.cdc.gov/std/treatment-guidelines/herpes.htm'},
            {label: 'NIH ClinicalInfo CMV disease guideline', url: 'https://clinicalinfo.hiv.gov/en/guidelines/adult-and-adolescent-opportunistic-infection/cytomegalovirus-disease'}
        ]
    },
    hcv: {
        title: 'Hepatitis C',
        subtitle: 'A simple review of common DAA patterns and the situations that need a more careful pathway.',
        updated: '2026-07-01',
        columns: [
            {id: 'simpleNoCirr', label: 'No cirrhosis', hint: 'Simplified treatment-naive noncirrhotic HCV'},
            {id: 'compCirr', label: 'Compensated cirrhosis', hint: 'Treatment-naive Child-Pugh A HCV'},
            {id: 'decomp', label: 'Decompensated', hint: 'Child-Pugh B/C or prior decompensation'},
            {id: 'retreat', label: 'Retreatment', hint: 'Selected DAA failure patterns'},
            {id: 'coinfection', label: 'HIV/HCV', hint: 'HCV treatment in HIV coinfection'},
            {id: 'hbvScreen', label: 'HBV screen', hint: 'HBV screening and reactivation concern'}
        ],
        callouts: [
            {
                title: 'Simplified treatment',
                text: 'Treatment-naive adults without cirrhosis often fit an 8-week G/P or 12-week SOF/VEL pathway. Compensated cirrhosis can still be simple, but genotype 3 and resistance details matter.'
            },
            {
                title: 'Do not oversimplify',
                text: 'Prior DAA therapy, decompensated cirrhosis, transplant history, pregnancy, HBsAg positivity, suspected HCC, and major interaction problems need a more detailed pathway.'
            },
            {
                title: 'Before DAAs',
                text: 'Check fibrosis/cirrhosis status, medication interactions, renal function, HBV serologies, HIV status, and whether retreatment rules apply.'
            }
        ],
        groups: [
            {
                name: 'Common regimen concepts',
                agents: [
                    {
                        name: 'Glecaprevir/pibrentasvir',
                        examples: 'Mavyret: NS3/4A protease inhibitor + NS5A inhibitor',
                        coverage: {simpleNoCirr: 'good', compCirr: 'good', decomp: 'bad', coinfection: 'some', hbvScreen: 'note'},
                        note: 'Pangenotypic simplified option. Avoid in decompensated cirrhosis and with several interacting ARVs.'
                    },
                    {
                        name: 'Sofosbuvir/velpatasvir',
                        examples: 'Epclusa: NS5B nucleotide polymerase inhibitor + NS5A inhibitor',
                        coverage: {simpleNoCirr: 'good', compCirr: 'good', decomp: 'some', coinfection: 'some', hbvScreen: 'note'},
                        note: 'Pangenotypic simplified option. In compensated cirrhosis, genotype 3 requires NS5A RAS review in the simplified algorithm.'
                    },
                    {
                        name: 'SOF/VEL + ribavirin',
                        examples: 'Decompensated cirrhosis pattern',
                        coverage: {decomp: 'good', coinfection: 'some', hbvScreen: 'note'},
                        note: 'Not a simplified regimen. Ribavirin adds toxicity, teratogenicity, and monitoring burden.'
                    },
                    {
                        name: 'SOF/VEL/VOX',
                        examples: 'Vosevi: NS5B + NS5A + NS3/4A',
                        coverage: {retreat: 'good', coinfection: 'some', hbvScreen: 'note'},
                        note: 'Important retreatment pattern after selected DAA failures. Not a routine first-line simplified choice.'
                    }
                ]
            },
            {
                name: 'Safety checks',
                agents: [
                    {
                        name: 'HIV/HCV interaction review',
                        examples: 'Boosters, NNRTIs, TDF exposure, acid suppression',
                        coverage: {coinfection: 'good'},
                        note: 'Treat HCV in people with HIV, but do not interrupt ART just to make DAA therapy easier.'
                    },
                    {
                        name: 'HBV screening before DAAs',
                        examples: 'HBsAg, anti-HBc, anti-HBs',
                        coverage: {hbvScreen: 'good'},
                        note: 'DAA therapy can unmask HBV reactivation risk. HBsAg-positive patients need HBV-directed management.'
                    }
                ]
            }
        ],
        sources: [
            {label: 'AASLD/IDSA HCV simplified treatment without cirrhosis', url: 'https://www.hcvguidelines.org/guidance/simplified-hcv-treatment-for-treatment-naive-adults-without-cirrhosis/'},
            {label: 'AASLD/IDSA HCV simplified treatment with compensated cirrhosis', url: 'https://www.hcvguidelines.org/guidance/simplified-hcv-treatment-algorithm-for-treatment-naive-adults-with-compensated-cirrhosis/'},
            {label: 'AASLD/IDSA HCV guidance for HIV/HCV coinfection', url: 'https://www.hcvguidelines.org/guidance/patients-with-hiv-hcv-coinfection/'}
        ]
    },
    fungal: {
        title: 'Fungal coverage',
        subtitle: 'Major antifungal classes and their broad organism roles.',
        updated: '2026-06-30',
        columns: [
            {id: 'mucosalCandida', label: 'Mucosal Candida', hint: 'Oropharyngeal, esophageal, vulvovaginal patterns'},
            {id: 'invasiveCandida', label: 'Invasive Candida', hint: 'Candidemia or invasive candidiasis'},
            {id: 'aspergillus', label: 'Aspergillus', hint: 'Invasive aspergillosis role'},
            {id: 'mucorales', label: 'Mucorales', hint: 'Mucormycosis role'},
            {id: 'cryptococcus', label: 'Cryptococcus CNS', hint: 'Cryptococcal meningitis/meningoencephalitis'},
            {id: 'pneumocystis', label: 'Pneumocystis', hint: 'PCP treatment/prophylaxis'},
            {id: 'dimorphic', label: 'Dimorphic fungi', hint: 'Histoplasma, Blastomyces, Coccidioides patterns'},
            {id: 'dermatophytes', label: 'Dermatophytes', hint: 'Tinea/onychomycosis patterns'}
        ],
        groups: [
            {
                name: 'Azoles',
                agents: [
                    {
                        name: 'Fluconazole',
                        examples: 'Diflucan',
                        coverage: {mucosalCandida: 'good', invasiveCandida: 'some', cryptococcus: 'some', dimorphic: 'some'},
                        note: 'Excellent oral bioavailability and useful for susceptible Candida and cryptococcal consolidation/suppression. No Aspergillus or Mucorales activity.'
                    },
                    {
                        name: 'Voriconazole',
                        examples: 'Vfend',
                        coverage: {aspergillus: 'good', invasiveCandida: 'some', dimorphic: 'some'},
                        note: 'Classic first-line mold-active azole for invasive aspergillosis. No Mucorales coverage; watch interactions, hepatotoxicity, visual effects, photosensitivity, and levels.'
                    },
                    {
                        name: 'Posaconazole',
                        examples: 'Noxafil',
                        coverage: {aspergillus: 'good', mucorales: 'good', dimorphic: 'some'},
                        note: 'Broad mold-active azole with Aspergillus and Mucorales activity; often used for prophylaxis in very high-risk hosts and as mucormycosis step-down/salvage.'
                    },
                    {
                        name: 'Isavuconazole',
                        examples: 'Cresemba',
                        coverage: {aspergillus: 'good', mucorales: 'good', dimorphic: 'some'},
                        note: 'Mold-active azole with Aspergillus and Mucorales activity. Compared with many azoles, it is notable for QT shortening rather than prolongation.'
                    },
                    {
                        name: 'Itraconazole',
                        examples: 'Sporanox',
                        coverage: {dimorphic: 'good', dermatophytes: 'some', aspergillus: 'some'},
                        note: 'Important oral option for endemic dimorphic fungi and some noninvasive mold contexts. Absorption, interactions, heart failure risk, and levels often matter.'
                    }
                ]
            },
            {
                name: 'Polyenes, echinocandins, and adjuncts',
                agents: [
                    {
                        name: 'Liposomal amphotericin B',
                        examples: 'L-AmB',
                        coverage: {invasiveCandida: 'some', aspergillus: 'some', mucorales: 'good', cryptococcus: 'good', dimorphic: 'good'},
                        note: 'Broadest practical antifungal backbone for severe endemic mycoses, cryptococcal induction, and mucormycosis. Toxicity and infusion issues are central limitations.'
                    },
                    {
                        name: 'Echinocandins',
                        examples: 'Micafungin, caspofungin, anidulafungin',
                        coverage: {invasiveCandida: 'good', aspergillus: 'some'},
                        note: 'Preferred initial pattern for many candidemia/invasive candidiasis scenarios. Aspergillus activity is not adequate as solo primary therapy; no Cryptococcus or Mucorales coverage.'
                    },
                    {
                        name: 'Flucytosine',
                        examples: '5-FC',
                        coverage: {cryptococcus: 'good', invasiveCandida: 'some'},
                        note: 'Mostly an adjunct, especially with amphotericin for cryptococcal meningitis induction. Resistance emerges quickly with monotherapy.'
                    },
                    {
                        name: 'TMP-SMX',
                        examples: 'Bactrim',
                        coverage: {pneumocystis: 'good'},
                        note: 'Primary treatment and prophylaxis agent for Pneumocystis jirovecii pneumonia; alternatives exist but are generally narrower or less effective.'
                    }
                ]
            },
            {
                name: 'Superficial fungal agents',
                agents: [
                    {
                        name: 'Terbinafine',
                        examples: 'Lamisil',
                        coverage: {dermatophytes: 'good'},
                        note: 'Strong dermatophyte activity and common oral option for onychomycosis. Not a systemic invasive-mold or Candida bloodstream agent.'
                    },
                    {
                        name: 'Nystatin / topical azoles',
                        examples: 'Local mucocutaneous therapy',
                        coverage: {mucosalCandida: 'some', dermatophytes: 'some'},
                        note: 'Useful for selected superficial infections only. These do not substitute for systemic therapy in invasive disease.'
                    }
                ]
            }
        ],
        sources: [
            {label: 'IDSA 2016 candidiasis guideline', url: 'https://www.idsociety.org/practice-guideline/candidiasis/'},
            {label: 'IDSA 2016 aspergillosis guideline', url: 'https://www.idsociety.org/practice-guideline/aspergillosis/'},
            {label: 'IDSA 2010 cryptococcal disease guideline', url: 'https://www.idsociety.org/practice-guideline/cryptococcal-disease/'},
            {label: 'ECMM/MSG global mucormycosis guideline, Lancet Infectious Diseases 2019', url: 'https://doi.org/10.1016/S1473-3099(19)30312-3'}
        ]
    },
    transplant: {
        title: 'Transplant essentials',
        subtitle: 'A compact solid organ transplant prevention reference by organ type.',
        updated: '2026-07-01',
        rowHeader: 'Topic',
        columns: [
            {id: 'heart', label: 'Heart', hint: 'Heart transplant reference'},
            {id: 'kidney', label: 'Kidney', hint: 'Kidney transplant reference'},
            {id: 'liver', label: 'Liver', hint: 'Liver transplant reference'},
            {id: 'lung', label: 'Lung', hint: 'Lung transplant reference'}
        ],
        callouts: [
            {
                title: 'Timeline matters',
                text: 'Early infections are often surgical, device, donor, or hospital-flora related. Months 1-6 are the classic opportunistic infection window. Late risk follows net immunosuppression and graft problems.'
            },
            {
                title: 'Net immunosuppression',
                text: 'Risk is more than a tacrolimus level: induction, rejection treatment, steroids, leukopenia, renal dysfunction, diabetes, devices, and local epidemiology all matter.'
            },
            {
                title: 'Center protocols win',
                text: 'CMV duration, fungal prophylaxis, and tacrolimus/mTOR targets vary by organ, time from transplant, rejection history, interactions, and center protocol.'
            }
        ],
        groups: [
            {
                name: 'Prevention',
                agents: [
                    {
                        name: 'CMV prevention',
                        examples: 'Valganciclovir prophylaxis or preemptive CMV PCR strategy',
                        coverage: {heart: 'good', kidney: 'good', liver: 'good', lung: 'good'},
                        note: 'D+/R- is highest risk. Lung recipients usually need the most aggressive prevention; other organs are often risk-stratified by serostatus and rejection therapy.'
                    },
                    {
                        name: 'PCP prophylaxis',
                        examples: 'TMP-SMX preferred; alternatives include atovaquone, dapsone, pentamidine',
                        coverage: {heart: 'good', kidney: 'good', liver: 'good', lung: 'good'},
                        note: 'Routine after solid organ transplant. Lung and some heart programs often continue longer; restart the conversation after rejection treatment.'
                    },
                    {
                        name: 'Toxoplasma / donor serology',
                        examples: 'Heart D+/R- is the classic Toxoplasma scenario',
                        coverage: {heart: 'good', kidney: 'note', liver: 'note', lung: 'note'},
                        note: 'Know donor/recipient serostatus. TMP-SMX usually covers Toxoplasma risk; heart transplant is the high-yield board-style association.'
                    },
                    {
                        name: 'Fungal prophylaxis',
                        examples: 'Candida risk in liver; mold risk in lung',
                        coverage: {heart: 'some', kidney: 'bad', liver: 'good', lung: 'good'},
                        note: 'Liver prophylaxis is often Candida/high-surgical-risk focused. Lung prophylaxis is mold-focused. Kidney transplant rarely needs routine fungal prophylaxis.'
                    },
                    {
                        name: 'Vaccines and exposures',
                        examples: 'Pre-transplant vaccines; food, water, travel, animal and soil counseling',
                        coverage: {heart: 'good', kidney: 'good', liver: 'good', lung: 'good'},
                        note: 'Vaccinate before transplant when possible. Live vaccines are generally avoided after transplant; exposure history guides additional testing.'
                    }
                ]
            },
            {
                name: 'Immunosuppression',
                agents: [
                    {
                        name: 'Induction intensity',
                        examples: 'Basiliximab versus ATG/alemtuzumab',
                        coverage: {heart: 'some', kidney: 'good', liver: 'some', lung: 'some'},
                        note: 'Lymphocyte-depleting induction increases opportunistic and viral risk more than basiliximab. Kidney transplant uses induction especially often.'
                    },
                    {
                        name: 'Calcineurin inhibitor backbone',
                        examples: 'Tacrolimus most common; cyclosporine alternative',
                        coverage: {heart: 'good', kidney: 'good', liver: 'good', lung: 'good'},
                        note: 'Drug-level targets are protocol-specific. Azoles and macrolides raise levels; rifamycins lower levels.'
                    },
                    {
                        name: 'Antimetabolite plus steroids',
                        examples: 'Mycophenolate; prednisone or pulse steroids',
                        coverage: {heart: 'good', kidney: 'good', liver: 'some', lung: 'good'},
                        note: 'Mycophenolate, valganciclovir, and TMP-SMX can all contribute to leukopenia. Steroid pulses increase infection risk and can reset prophylaxis needs.'
                    },
                    {
                        name: 'CNI-sparing agents',
                        examples: 'mTOR inhibitors; belatacept mainly kidney',
                        coverage: {heart: 'some', kidney: 'good', liver: 'some', lung: 'note'},
                        note: 'Use depends on organ and complications. Belatacept requires EBV-seropositive status because of PTLD risk.'
                    }
                ]
            },
            {
                name: 'Testing and monitoring',
                agents: [
                    {
                        name: 'CMV PCR monitoring',
                        examples: 'Preemptive strategy, breakthrough disease, or after prophylaxis',
                        coverage: {heart: 'good', kidney: 'good', liver: 'good', lung: 'good'},
                        note: 'High yield after prophylaxis ends, after rejection therapy, and when leukopenia limits valganciclovir.'
                    },
                    {
                        name: 'BK polyomavirus PCR',
                        examples: 'Plasma BK viral load surveillance',
                        coverage: {heart: 'bad', kidney: 'good', liver: 'bad', lung: 'bad'},
                        note: 'Kidney transplant issue. Rising BK plus graft dysfunction usually prompts immunosuppression reduction with the kidney team.'
                    },
                    {
                        name: 'Donor-derived virus testing',
                        examples: 'HIV, HBV, HCV NAT after transplant',
                        coverage: {heart: 'good', kidney: 'good', liver: 'good', lung: 'good'},
                        note: 'Post-transplant HIV, HBV, and HCV NAT is a core safety check. Liver recipients also need later HBV surveillance.'
                    },
                    {
                        name: 'Interaction and rejection checks',
                        examples: 'Drug levels; after ATG, alemtuzumab, pulse steroids, rituximab',
                        coverage: {heart: 'good', kidney: 'good', liver: 'good', lung: 'good'},
                        note: 'Many ID consults turn on interactions or recent rejection therapy. Reassess CMV, PCP, fungal, HBV, TB, and endemic risks whenever immunosuppression escalates.'
                    }
                ]
            }
        ],
        sources: [
            {label: 'AST IDCOP cytomegalovirus guidance in solid organ transplant recipients', url: 'https://doi.org/10.1111/ajt.15358'},
            {label: 'AST IDCOP Pneumocystis guidance in solid organ transplant recipients', url: 'https://doi.org/10.1111/ajt.15285'},
            {label: 'AST IDCOP fungal infections guidance in solid organ transplantation', url: 'https://doi.org/10.1111/ajt.15191'},
            {label: 'CDC / U.S. Public Health Service 2020 donor-derived HIV, HBV, HCV testing guideline', url: 'https://www.cdc.gov/mmwr/volumes/69/rr/rr6904a1.htm'},
            {label: 'KDIGO clinical practice guideline for care of kidney transplant recipients', url: 'https://kdigo.org/guidelines/transplant-recipient/'},
            {label: 'AASLD/AST long-term management of the successful adult liver transplant guideline', url: 'https://doi.org/10.1002/lt.23566'},
            {label: 'ISHLT Guidelines for the care of heart transplant recipients', url: 'https://www.ishlt.org/ishlt/media/documents/ISHLT_GL_LongTermCareOfHTxRecipients.pdf'},
            {label: 'ISHLT consensus document for care of lung transplant recipients', url: 'https://www.jhltonline.org/article/S1053-2498(21)02387-6/fulltext'}
        ]
    }
};

/******************************************************************************\
 * GRAM STAIN LOOKUP
 *
 * Teaching-oriented possibilities from early microbiology descriptors. Culture,
 * MALDI/PCR, susceptibility testing, body site, and clinical context are needed
 * for real organism identification.
 \*****************************************************************************/
const GRAM_STAIN_LOOKUP = [
    {
        title: 'Gram-positive cocci in clusters',
        tags: ['positive', 'cocci', 'cluster', 'clusters', 'staph', 'grape'],
        examples: ['Staphylococcus aureus', 'Coagulase-negative staphylococci'],
        note: 'Classic staphylococcal morphology. Coagulase testing, culture source, and number of positive cultures matter.'
    },
    {
        title: 'Gram-positive cocci in pairs/chains',
        tags: ['positive', 'cocci', 'pair', 'pairs', 'chain', 'chains', 'strep'],
        examples: ['Streptococcus spp.', 'Enterococcus spp.', 'Streptococcus pneumoniae'],
        note: 'Chains suggest streptococci or enterococci. Lancet-shaped diplococci suggest pneumococcus.'
    },
    {
        title: 'Gram-negative diplococci',
        tags: ['negative', 'diplococci', 'diplococcus', 'cocci', 'neisseria'],
        examples: ['Neisseria meningitidis', 'Neisseria gonorrhoeae', 'Moraxella catarrhalis'],
        note: 'Source matters: CSF/blood raises meningococcus; genital specimens raise gonococcus; respiratory specimens may be Moraxella.'
    },
    {
        title: 'Gram-negative lactose-fermenting rods',
        tags: ['negative', 'rod', 'rods', 'bacilli', 'lactose', 'positive', 'fermenter', 'fermenting', 'pink'],
        examples: ['Escherichia coli', 'Klebsiella spp.', 'Enterobacter/Klebsiella aerogenes', 'Citrobacter spp.'],
        note: 'Think enteric gram-negative rods. Klebsiella/Enterobacter can appear mucoid; Citrobacter and Serratia may be slower lactose fermenters.'
    },
    {
        title: 'Gram-negative lactose-negative rods',
        tags: ['negative', 'rod', 'rods', 'bacilli', 'lactose', 'nonlactose', 'non-lactose', 'negative', 'nonfermenter', 'non-fermenter'],
        examples: ['Pseudomonas aeruginosa', 'Proteus spp.', 'Salmonella spp.', 'Shigella spp.', 'Morganella/Providencia', 'Acinetobacter spp.', 'Stenotrophomonas maltophilia'],
        note: 'This is a broad bucket. Oxidase, motility, odor/pigment, site, and biochemical or molecular ID narrow it quickly.'
    },
    {
        title: 'Gram-negative coccobacilli',
        tags: ['negative', 'coccobacilli', 'coccobacillus', 'short', 'small'],
        examples: ['Haemophilus influenzae', 'Acinetobacter spp.', 'Bordetella pertussis', 'Brucella spp.', 'Pasteurella multocida'],
        note: 'Clinical source and exposure history are essential: respiratory tract, animal bite, travel, or blood culture context changes the differential.'
    },
    {
        title: 'Curved gram-negative rods',
        tags: ['negative', 'curved', 'comma', 'rod', 'rods'],
        examples: ['Vibrio spp.', 'Campylobacter spp.', 'Helicobacter pylori'],
        note: 'Think diarrheal illness, seafood/saltwater exposure, or gastric disease depending on the clinical setting.'
    },
    {
        title: 'Gram-positive rods',
        tags: ['positive', 'rod', 'rods', 'bacilli'],
        examples: ['Bacillus spp.', 'Clostridium spp.', 'Listeria monocytogenes', 'Corynebacterium spp.', 'Cutibacterium acnes'],
        note: 'Can be pathogen or contaminant depending on source. Spore formation, anaerobic growth, and specimen type matter.'
    },
    {
        title: 'Branching gram-positive rods',
        tags: ['positive', 'branching', 'beaded', 'filamentous', 'rod', 'rods'],
        examples: ['Nocardia spp.', 'Actinomyces spp.'],
        note: 'Nocardia is aerobic and weakly acid-fast; Actinomyces is anaerobic and associated with chronic draining sinus-type infections.'
    },
    {
        title: 'Yeast or fungal forms on stain',
        tags: ['yeast', 'budding', 'hyphae', 'pseudohyphae', 'fungal', 'fungus'],
        examples: ['Candida spp.', 'Cryptococcus spp.', 'Mold forms depending on specimen'],
        note: 'Gram stain may show yeast, but fungal stains, antigen testing, culture, pathology, and host context usually do the real work.'
    }
];
