# BugDrug

BugDrug is a static teaching tool for learning broad relationships between antibiotics, bacteria, and common infectious syndromes. It is adapted from [bugdrugdx.com](https://bugdrugdx.com/) and the original [HunterRatliff1/BugDrug](https://github.com/HunterRatliff1/BugDrug) project.

This is for medical education only. It is intentionally simplified, is not comprehensive, and must not be used as a patient-care decision aid. Antibiotic choices require patient-specific assessment, source control, site of infection, dosing, current and prior cultures, local antibiograms, allergies, pregnancy status, immune status, renal/hepatic function, and specialist input when appropriate.

## Use

Open `index.html` in a browser. Hover or tap antibiotics, bacteria, or syndromes to see related coverage and notes. Click antibiotics to pin multiple agents and view combined conceptual coverage.

## Main Files

- `index.html`: static page shell and modals.
- `main_script.js`: rendering, search, highlighting, and route-filter behavior.
- `styles.css`: visual styling and coverage color classes.
- `files/static_objects.js`: explanatory antibiotic, bacteria, and syndrome notes.
- `files/parseCSV.js`: embedded coverage/association matrices used by the page.
- `files/species_index.js`: species-name search mappings to grid categories.
- `INTERNAL_AUDIT.md`: current internal review notes and limitations.

## Clinical Sources

The grid is a learner abstraction, but updates should be checked against current primary or guideline sources. Key references used in the current audit:

- [IDSA 2024 Guidance on the Treatment of Antimicrobial Resistant Gram-Negative Infections](https://www.idsociety.org/practice-guideline/amr-guidance/)
- [ATS/IDSA 2019 Community-Acquired Pneumonia Guideline](https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults/)
- [ATS/IDSA 2016 Hospital-Acquired and Ventilator-Associated Pneumonia Guideline](https://www.idsociety.org/practice-guideline/hap_vap/)
- [IDSA 2014 Skin and Soft Tissue Infection Guideline](https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/)
- [IDSA/ESCMID 2010 Acute Uncomplicated Cystitis and Pyelonephritis Guideline](https://academic.oup.com/cid/article/52/5/e103/388285)

## Maintenance Notes

- Keep `files/parseCSV.js` and the CSV files in `files/CSV_data/` synchronized when changing coverage matrices.
- Prefer guideline or primary literature links in note text when changing clinical claims.
- Use `INTERNAL_AUDIT.md` to record clinical review decisions, known simplifications, and residual risk.

## License

MIT. See `LICENSE`.
