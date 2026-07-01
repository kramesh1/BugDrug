# Internal Audit: BugDrug Page

Date: 2026-06-30

Scope: root `index.html` app, antibacterial grid behavior, review-tab renderer, static clinical data objects, source links, route/filter behavior, organism search mappings, and learner-facing infectious disease notes.

## App Scope

BugDrug is now a conceptual antimicrobial review page with five main tabs:

- Bacterial coverage and syndrome review.
- HIV treatment and prophylaxis review.
- Other viral coverage, including HCV.
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

- Added top-level Bootstrap tabs for `Bacterial`, `HIV`, `Other Viral`, `Fungal`, and `Transplant`.
- Added a reusable review-tab renderer driven by `COVERAGE_REVIEW_TOOLS` in `files/static_objects.js`.
- Added review callouts for threshold-heavy topics, including HIV OI prophylaxis, HCV simplified treatment caveats, and transplant infectious-risk framing.
- Added tokenized multi-term search for review tabs, so queries such as `lung mold` match rows containing both terms.
- Added responsive table containers so wide review matrices scroll internally rather than forcing whole-page overflow on mobile.
- Updated metadata, README, and source documentation to match the expanded antimicrobial scope.

## New Clinical Review Areas

### HIV

- ART, PrEP, PEP, and selected OI prophylaxis are summarized at a conceptual level.
- PCP, Toxoplasma, MAC, TB/LTBI, and selected endemic fungal prophylaxis thresholds are represented as teaching callouts and broad coverage rows.
- Prophylaxis thresholds were checked against NIH ClinicalInfo adult/adolescent OI guidance current to the May 27, 2026 update.

### Other Viral and HCV

- Influenza, COVID-19, HSV/VZV, CMV, HBV, and HCV coverage concepts are summarized.
- HCV rows distinguish simplified noncirrhotic treatment, compensated cirrhosis, decompensated cirrhosis, retreatment, HIV/HCV coinfection, and HBV reactivation screening.
- HCV simplified treatment concepts were checked against AASLD/IDSA HCV Guidance pages last updated December 19, 2023.

### Fungal

- Major antifungal classes are summarized across Candida, Aspergillus, Mucorales, Cryptococcus, Pneumocystis, dimorphic fungi, and dermatophytes.
- Fungal source links include IDSA candidiasis, aspergillosis, cryptococcosis, and ECMM/MSG mucormycosis guidance.

### Transplant

- Added a solid organ transplant prevention tab comparing heart, kidney, liver, and lung.
- Topics include CMV, HSV/VZV, PCP, Toxoplasma, Candida, mold prophylaxis, HBV/HCV donor-recipient planning, vaccines, induction/maintenance immunosuppression, drug levels, CMV/BK/EBV monitoring, PHS donor-derived virus NAT, epidemiology-driven screening, and rejection-therapy reassessment.
- Transplant data intentionally highlights center-dependent areas rather than presenting universal protocols.

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
