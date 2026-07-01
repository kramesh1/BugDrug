# Internal Audit: BugDrug Page

Date: 2026-07-01

Scope: root `index.html` app, antibacterial grid behavior, review-tab renderer, static clinical data objects, source links, route/filter behavior, organism search mappings, and learner-facing infectious disease notes.

## App Scope

BugDrug is now a conceptual antimicrobial review page with six main tabs:

- Bacterial coverage and syndrome review.
- HIV essentials.
- Other viral coverage.
- Hepatitis C.
- Fungal coverage.
- Solid organ transplant infection prevention by transplant type.

The tool remains educational only. It should not be used as a patient-care decision aid.

## Findings Addressed Before Expansion

- Route semantics: oral vancomycin was treated as generally PO-available even though its oral use is limited to non-systemic C. difficile colitis. Fixed by distinguishing `PO*` from systemic PO and excluding restricted oral routes from the systemic PO filter.
- Pneumonia terminology: the page used HCAP as a broad clinical category. Updated copy to HAP/VAP and resistant-pathogen risk factors, with HCAP described as an older term rather than a stand-alone trigger for broad therapy.
- Species search: MSSA search also highlighted MRSA, Enterococcus faecium also highlighted VSE, and Burkholderia was mapped to Stenotrophomonas. Updated mappings to avoid conflating susceptible and resistant phenotypes.
- Lower UTI agents: nitrofurantoin and oral fosfomycin notes could be read as systemic coverage. Added lower-tract-only cautions and culture-guided caveats; changed fosfomycin's Pseudomonas coverage from variable to lack of reliable coverage.
- Meningitis syndrome: Neisseria meningitidis lives in the broad "Other" cell, but the grid marked that cell only occasional. Updated to common for meningitis to match the explanatory note.
- Markup and copy hygiene: fixed malformed italics/bold tags, typos, and grammar in antibiotic and bacteria notes that could impair readability or rendering.

## Expansion Added

- Added top-level Bootstrap tabs for `Bacterial`, `HIV`, `Other Viral`, `Hep C`, `Fungal`, and `Transplant`.
- Added a reusable review-tab renderer driven by `COVERAGE_REVIEW_TOOLS` in `files/static_objects.js`.
- Added review callouts for threshold-heavy topics, including HIV OI prophylaxis, HCV simplified treatment caveats, and transplant infectious-risk framing.
- Added tokenized multi-term search for review tabs, so queries such as `lung mold` match rows containing both terms.
- Added responsive table containers so wide review matrices scroll internally rather than forcing whole-page overflow on mobile.
- Added a compact gram-stain lookup helper driven by `GRAM_STAIN_LOOKUP`.
- Simplified HIV and transplant tabs to reduce row and column density.
- Moved HCV content from `Other Viral` into a dedicated `Hep C` tab.
- Updated metadata, README, and source documentation to match the expanded antimicrobial scope.

## New Clinical Review Areas

### HIV

- ART, PrEP, PEP, and selected OI prophylaxis are summarized in a compact essentials table.
- PCP, Toxoplasma, and MAC thresholds are represented as high-yield teaching callouts.
- Prophylaxis thresholds were checked against NIH ClinicalInfo adult/adolescent OI guidance current to the May 27, 2026 update.

### Other Viral

- Influenza, COVID-19, HSV/VZV, CMV, and HBV coverage concepts are summarized.

### Hepatitis C

- HCV has a dedicated tab.
- Rows distinguish simplified noncirrhotic treatment, compensated cirrhosis, decompensated cirrhosis, retreatment, HIV/HCV coinfection, and HBV reactivation screening.
- HCV simplified treatment concepts were checked against AASLD/IDSA HCV Guidance pages last updated December 19, 2023.

### Fungal

- Major antifungal classes are summarized across Candida, Aspergillus, Mucorales, Cryptococcus, Pneumocystis, dimorphic fungi, and dermatophytes.
- Fungal source links include IDSA candidiasis, aspergillosis, cryptococcosis, and ECMM/MSG mucormycosis guidance.

### Transplant

- Added a simplified solid organ transplant prevention tab comparing heart, kidney, liver, and lung.
- Topics include CMV, PCP, Toxoplasma/donor serology, fungal prophylaxis, vaccines/exposures, induction intensity, CNI backbone, antimetabolite/steroids, CNI-sparing agents, CMV PCR, BK PCR, donor-derived virus testing, and rejection/interaction checks.
- Transplant data intentionally highlights center-dependent areas rather than presenting universal protocols.

### Gram-Stain Lookup

- Added a bacterial-tab helper for early gram-stain descriptors.
- Examples include gram-positive cocci in clusters, gram-positive cocci in pairs/chains, gram-negative diplococci, lactose-fermenting and lactose-negative gram-negative rods, coccobacilli, curved rods, gram-positive rods, branching rods, and yeast/fungal forms.
- This is a teaching differential only. Culture, rapid ID, susceptibility testing, specimen source, and clinical context remain required.

## Bacterial Grid Corrections (2026-07-01 review)

A second clinical accuracy pass found residual errors in the pre-existing bacterial grid and notes (inherited from the upstream fork). Corrected:

- Babesiosis was listed as a doxycycline/tick-borne target in the `DOX` and `Zoo` notes. Removed: *Babesia* is an intra-erythrocytic protozoan treated with atovaquone+azithromycin or clindamycin+quinine, not doxycycline.
- Atypical-pneumonia note claimed "most of these bacteria lack cell walls." Reworded: only *Mycoplasma* truly lacks a cell wall; *Legionella* and *Chlamydia* have cell walls but stain/culture poorly.
- Cefazolin note listed *Moraxella* under its gram-negative coverage. Removed: most *M. catarrhalis* produce BRO beta-lactamase and resist first-generation cephalosporins.
- Grid grade fixes (synced in `files/CSV_data/antibiotics.csv` and `files/parseCSV.js`): ampicillin MSSA `some`→`bad` (staphylococcal penicillinase), ampicillin VSE `some`→`good` (drug of choice for *E. faecalis*), ceftriaxone Strep `some`→`good` (first-line for *S. pneumoniae*), cefepime AmpC `some`→`good` (aligns the grid with the AmpC and cefepime notes recommending cefepime).

Deferred as defensible judgment calls: meropenem `DTR=some`, syndrome-grid `com/occ` nuances, and the shared `MSSA=some` label across ampicillin-sulbactam / amoxicillin-clavulanate / piperacillin-tazobactam.

## Follow-up Audit Fixes (2026-07-01)

- Vendored Bootstrap 5.3.3 CSS and bundle JS under `files/vendor/` and switched `index.html` to local assets so tabs and modals are not dependent on CDN availability.
- Changed combination-view ranking so `note` cells are treated as caveats rather than coverage.
- Demoted nitrofurantoin and oral fosfomycin organism cells to `note` because their practical role is lower-tract urinary infection, not systemic organism coverage.
- Changed tigecycline vs `Steno` from `some` to `bad` and updated Stenotrophomonas notes to reflect current IDSA AMR guidance: cefiderocol/minocycline/TMP-SMX/levofloxacin combinations or ceftazidime-avibactam plus aztreonam, with tigecycline not counted on.
- Changed cefiderocol vs `CRAB` from `good` to `note` and updated CRAB notes to emphasize sulbactam-durlobactam plus meropenem or imipenem-cilastatin as preferred, high-dose ampicillin-sulbactam combination therapy as an alternative, and cefiderocol as refractory/limited-use combination therapy.
- Updated stale 2023 IDSA AMR bacterial-note links/references to the 2024 guidance.

## Source Categories Checked

- 2019 ATS/IDSA CAP guideline: https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults/
- 2016 ATS/IDSA HAP/VAP guideline: https://www.idsociety.org/practice-guideline/hap_vap/
- IDSA AMR gram-negative guidance: https://www.idsociety.org/practice-guideline/amr-guidance/
- IDSA SSTI guideline: https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/
- IDSA/ESCMID uncomplicated cystitis/pyelonephritis guideline: https://academic.oup.com/cid/article/52/5/e103/388285
- NIH ClinicalInfo HIV treatment and adult/adolescent opportunistic infection guidelines: https://clinicalinfo.hiv.gov/
- CDC PrEP, PEP, influenza antiviral, COVID-19 outpatient treatment, and STI herpes guidance: https://www.cdc.gov/
- AASLD/IDSA HCV Guidance: https://www.hcvguidelines.org/
- IDSA fungal guidelines: https://www.idsociety.org/practice-guideline/
- ECMM/MSG mucormycosis guideline: https://doi.org/10.1016/S1473-3099(19)30312-3
- AST Infectious Diseases Community of Practice solid organ transplant guidance, including CMV, PCP, and fungal infection guidance.
- CDC/U.S. Public Health Service donor-derived HIV/HBV/HCV testing guideline: https://www.cdc.gov/mmwr/volumes/69/rr/rr6904a1.htm
- KDIGO kidney transplant recipient guidance: https://kdigo.org/guidelines/transplant-recipient/
- AASLD/AST adult liver transplant management guidance.
- ISHLT heart and lung transplant care guidance.

## Residual Limitations

- The bacterial grid remains a conceptual learner abstraction; it does not encode full organism-level susceptibility logic.
- Some organism buckets are intentionally broad, especially "Other", "GNR", and "Zoo".
- Antimicrobial activity still depends on site of infection, source control, drug exposure, dose, pharmacokinetics, microbiology, local resistance, and host factors.
- HIV, HCV, fungal, and transplant tables are broad review aids, not comprehensive dosing or protocol references.
- Transplant prophylaxis duration, tacrolimus/mTOR trough goals, rejection-treatment workflows, and post-transplant testing schedules are highly center-specific.
- Drug interactions are under-specified by design; azoles, rifamycins, boosted antiretrovirals, calcineurin inhibitors, mTOR inhibitors, valganciclovir, TMP-SMX, and DAAs require patient-specific review.

## Verification Performed

- `node --check main_script.js`
- `node --check files/static_objects.js`
- Browser DOM checks for rendered review tabs, row counts, callouts, source links, and search/filter behavior.
- Browser console checks for warnings/errors.
- Mobile-width layout check confirming wide tables scroll inside their table container.
