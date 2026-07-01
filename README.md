# BugDrug

BugDrug is a static teaching tool for conceptual antimicrobial coverage review. It began as an antibacterial grid adapted from [bugdrugdx.com](https://bugdrugdx.com/) and the original [HunterRatliff1/BugDrug](https://github.com/HunterRatliff1/BugDrug) project, and now includes additional review tabs for HIV, other antivirals, antifungals, and solid organ transplant infection prevention.

This is for medical education only. It is intentionally simplified, is not comprehensive, and must not be used as a patient-care decision aid. Antimicrobial decisions require patient-specific assessment, source control, site of infection, dosing, current and prior microbiology, local antibiograms, allergies, pregnancy status, immune status, renal/hepatic function, drug interactions, transplant-team protocols, and specialist input when appropriate.

## Use

Open `index.html` in a browser, or run a local static server from the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://[::1]:8000/` or `http://localhost:8000/`.

## Tabs

- `Bacterial`: interactive antibiotic, bacteria, and syndrome grid. Hover or tap items to preview related coverage and notes. Click antibiotics to pin multiple agents and view combined conceptual coverage.
- `HIV`: broad ART, PrEP, PEP, and selected HIV-related opportunistic infection prophylaxis review, including PCP, Toxoplasma, MAC, TB/LTBI, and selected endemic fungal thresholds.
- `Other Viral`: influenza, COVID-19, HSV/VZV, CMV, HBV, and HCV concepts, including simplified HCV treatment patterns and HIV/HCV interaction cautions.
- `Fungal`: major antifungal class coverage across Candida, Aspergillus, Mucorales, Cryptococcus, Pneumocystis, dimorphic fungi, and dermatophytes.
- `Transplant`: solid organ transplant infection prevention by heart, kidney, liver, and lung transplant type, including prophylaxis, common immunosuppression patterns, and post-transplant monitoring concepts.

## Main Files

- `index.html`: static page shell, tabs, modals, and script includes.
- `main_script.js`: rendering, search, highlighting, filtering, tab-review table generation, and route-filter behavior.
- `styles.css`: visual styling, responsive layouts, tab styles, review tables, and coverage color classes.
- `files/static_objects.js`: explanatory notes and data for antibiotics, bacteria, syndromes, HIV, viral, fungal, and transplant review tabs.
- `files/parseCSV.js`: embedded antibacterial coverage and syndrome association matrices used by the bacterial tab.
- `files/species_index.js`: species-name search mappings to bacterial grid categories.
- `files/CSV_data/`: source CSV/XLSX assets for antibacterial coverage and syndrome matrices.
- `INTERNAL_AUDIT.md`: clinical review notes, source categories, implementation decisions, and residual limitations.

## Data Model

The original bacterial tab uses CSV-derived relationship maps from `files/parseCSV.js` plus explanatory objects in `files/static_objects.js`.

The newer review tabs are driven by `COVERAGE_REVIEW_TOOLS` in `files/static_objects.js`. Each tool defines:

- `columns`: organisms, syndromes, clinical roles, or transplant types.
- `callouts`: high-yield threshold or context cards shown above the matrix.
- `groups`: row groups and row-level coverage classes.
- `sources`: links to guideline or primary-source references shown in the tab footer.

Coverage labels are broad teaching labels:

- `Good`: common first-line, preferred, routine, or high-yield fit.
- `Limited`: conditional, alternative, selected-use, or variable fit.
- `Note`: important context rather than a direct good/bad fit.
- `No`: not a meaningful routine role in this conceptual table.

## Clinical Sources

Clinical claims should be checked against current primary literature, society guidelines, or public health guidance. Current source categories include:

- IDSA, ATS/IDSA, and IDSA/ESCMID antibacterial guidance.
- NIH ClinicalInfo HIV treatment and adult/adolescent opportunistic infection guidance.
- CDC HIV PrEP/PEP, influenza antiviral, COVID-19 outpatient treatment, and STI herpes guidance.
- AASLD/IDSA HCV Guidance.
- IDSA fungal guidelines and ECMM/MSG mucormycosis guidance.
- AST Infectious Diseases Community of Practice solid organ transplant guidance.
- CDC/U.S. Public Health Service donor-derived HIV, HBV, and HCV testing guidance.
- KDIGO kidney transplant recipient guidance, AASLD/AST liver transplant guidance, and ISHLT heart/lung transplant guidance.

Individual review tabs include source links in the page footer for that topic.

## Maintenance Notes

- Keep `files/parseCSV.js` and `files/CSV_data/` synchronized when changing antibacterial coverage matrices.
- Prefer editing `COVERAGE_REVIEW_TOOLS` rather than hardcoding review-table HTML.
- Add source links for any new clinical claims, especially thresholds, durations, and prophylaxis recommendations.
- Treat transplant protocols, drug levels, and prophylaxis duration as center-dependent unless a guideline is explicit.
- Use `INTERNAL_AUDIT.md` to record clinical review decisions, known simplifications, and residual risk.

## Verification

Basic syntax checks:

```sh
node --check main_script.js
node --check files/static_objects.js
```

For visual/interaction checks, run the static server and verify:

- All tabs render.
- Search/filter behavior works.
- Review source links appear.
- The browser console has no warnings or errors.
- Wide review tables scroll inside their table container on mobile widths.

## License

MIT. See `LICENSE`.
