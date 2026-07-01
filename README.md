# BugDrug

BugDrug is a static teaching tool for conceptual antimicrobial coverage review. It began as an antibacterial grid adapted from [bugdrugdx.com](https://bugdrugdx.com/) and the original [HunterRatliff1/BugDrug](https://github.com/HunterRatliff1/BugDrug) project, and now includes focused review tabs for HIV, hepatitis C, other antivirals, antifungals, and solid organ transplant infection prevention.

This is for medical education only. It is intentionally simplified, is not comprehensive, and must not be used as a patient-care decision aid. Antimicrobial decisions require patient-specific assessment, source control, site of infection, dosing, current and prior microbiology, local antibiograms, allergies, pregnancy status, immune status, renal/hepatic function, drug interactions, transplant-team protocols, and specialist input when appropriate.

## Use

Open `index.html` in a browser, or run a local static server from the repository root:

```sh
python3 -m http.server 8000
```

Then open `http://[::1]:8000/` or `http://localhost:8000/`.

## Tabs

- `Bacterial`: interactive antibiotic, bacteria, and syndrome grid. Hover or tap items to preview related coverage and notes. Click antibiotics to pin multiple agents and view combined conceptual coverage. The bacterial tab also includes a simple gram-stain lookup helper.
- `HIV`: compact ART, PrEP, PEP, and high-yield HIV-related opportunistic infection prophylaxis thresholds.
- `Other Viral`: influenza, COVID-19, HSV/VZV, CMV, and HBV concepts.
- `Hep C`: simplified HCV treatment concepts, decompensated/retreatment caveats, HIV/HCV interaction review, and HBV screening reminders.
- `Fungal`: major antifungal class coverage across Candida, Aspergillus, Mucorales, Cryptococcus, Pneumocystis, dimorphic fungi, and dermatophytes.
- `Transplant`: compact solid organ transplant prevention reference by heart, kidney, liver, and lung transplant type.

## Main Files

- `index.html`: static page shell, tabs, modals, and script includes.
- `main_script.js`: rendering, search, highlighting, filtering, tab-review table generation, and route-filter behavior.
- `styles.css`: visual styling, responsive layouts, tab styles, review tables, and coverage color classes.
- `files/vendor/`: pinned local Bootstrap assets used so tabs and modals work without a CDN connection.
- `files/static_objects.js`: explanatory notes and data for antibiotics, bacteria, syndromes, gram-stain lookup, HIV, HCV, viral, fungal, and transplant review tabs.
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

The bacterial gram-stain helper is driven by `GRAM_STAIN_LOOKUP` in `files/static_objects.js`. It maps early stain descriptors to common teaching differentials; it is not an organism identification engine.

Coverage labels are broad teaching labels:

- `Good`: common first-line, preferred, routine, or high-yield fit.
- `Limited`: conditional, alternative, selected-use, or variable fit.
- `Note`: important context rather than direct coverage. Note-only cells are not counted as coverage in the selected-antibiotic combination view.
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
- The gram-stain lookup returns a focused teaching differential for common descriptors such as `gram negative lactose negative rod`.
- Review source links appear.
- The browser console has no warnings or errors.
- Wide review tables scroll inside their table container on mobile widths.

## License

MIT. See `LICENSE`.

Vendored Bootstrap assets in `files/vendor/` are Bootstrap v5.3.3, MIT licensed by the Bootstrap Authors.
