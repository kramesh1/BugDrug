# Internal Audit: BugDrug Page

Date: 2026-06-30

Scope: root `index.html` app, including route/filter behavior, organism search mappings, antibiotic coverage CSV strings, and learner-facing infectious disease notes.

## Findings addressed

- Route semantics: oral vancomycin was treated as generally PO-available even though its oral use is limited to non-systemic C. difficile colitis. Fixed by distinguishing `PO*` from systemic PO and excluding restricted oral routes from the systemic PO filter.
- Pneumonia terminology: the page used HCAP as a broad clinical category. Updated copy to HAP/VAP and resistant-pathogen risk factors, with HCAP described as an older term rather than a stand-alone trigger for broad therapy.
- Species search: MSSA search also highlighted MRSA, Enterococcus faecium also highlighted VSE, and Burkholderia was mapped to Stenotrophomonas. Updated mappings to avoid conflating susceptible and resistant phenotypes.
- Lower UTI agents: nitrofurantoin and oral fosfomycin notes could be read as systemic coverage. Added lower-tract-only cautions and culture-guided caveats; changed fosfomycin's Pseudomonas coverage from variable to lack of reliable coverage.
- Meningitis syndrome: Neisseria meningitidis lives in the broad "Other" cell, but the grid marked that cell only occasional. Updated to common for meningitis to match the explanatory note.
- Markup and copy hygiene: fixed malformed italics/bold tags, typos, and grammar in antibiotic and bacteria notes that could impair readability or rendering.

## Sources checked

- 2019 ATS/IDSA CAP guideline: https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults/
- 2016 ATS/IDSA HAP/VAP guideline: https://www.idsociety.org/practice-guideline/hap_vap/
- IDSA AMR gram-negative guidance: https://www.idsociety.org/practice-guideline/amr-guidance/
- IDSA SSTI guideline: https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/
- IDSA/ESCMID uncomplicated cystitis/pyelonephritis guideline: https://academic.oup.com/cid/article/52/5/e103/388285

## Residual limitations

- The grid remains a conceptual learner tool, not a patient-care decision aid.
- Some organism buckets are intentionally broad, especially "Other", "GNR", and "Zoo"; the notes now call out some of those limitations, but full organism-level susceptibility logic is out of scope for this UI.
- Antibiotic activity still depends on local antibiograms, site of infection, source control, dosing, and current/prior cultures.
