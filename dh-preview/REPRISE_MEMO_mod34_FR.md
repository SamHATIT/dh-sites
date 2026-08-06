# REPRISE_MEMO — Transcréation FR du site marketing (mod34-fr)
Date : 2026-05-31 · État : **LIVRÉ + EN LIGNE POUR REVUE**

## OÙ ON EN EST
- Tout le site FR transcréé est intégré dans le bundle et déployé : `/var/www/dh-preview/index.html` (MD5 `c78a462d93454c303179e910a9a75861`).
- nginx racine rebasculée **dh-holding → dh-preview** (`/etc/nginx/sites-enabled/digital-humans`, ligne 20). Public : https://digital-humans.fr/ (cache edge peut traîner ; origine OK : `curl -k -H "Host: digital-humans.fr" https://127.0.0.1/`).
- ⚠️ **HOLDING À REMETTRE sur ton ordre** : `sed -i 's#root /var/www/dh-preview#root /var/www/dh-holding#' /etc/nginx/sites-enabled/digital-humans` puis `/usr/sbin/nginx -t && systemctl reload nginx`.

## BACKUPS (/var/www/dh-preview/)
- `index.html.GOOD-mod34-fr` = snapshot propre FR (identique au live)
- `index.html.pre-mod34-fr` = état avant FR (light fix + intro, EN)
- `index.html.GOOD-mod33-lightfix-intro` = light + intro
- conf nginx : `/etc/nginx/_disabled-backups/digital-humans.pre-mod34-review.*`
- Fichiers de travail persistés : `/var/www/dh-preview/_fr-work/` (dh_fr.html, m_hero/main/work/price/app.js, dh_intro_pkg.js, verify_*.js)

## MÉTHODE D'ÉDITION BUNDLE (rappel)
Manifeste réel = `<script type="__bundler/manifest">` à idx≥18000 (JSON `uuid→{mime,compressed,data}`). Modules JS = base64(gzip).
Patch : décode (b64→gzip.decompress) → `str.replace` avec `assert count==1` → re-gzip `GzipFile(mtime=0)`+b64 → `man[UU]['data']=new; compressed=True` → reconstruire `s[:mgt+1]+json.dumps(man,separators=(',',':'))+s[mend:]` → roundtrip verify → Playwright.
⚠️ **APOSTROPHES MIXTES** : 6641f2bf → Benefits = `\u2019` échappé (matcher `'\\u2019'`), Séquence = `’` réel (U+2019). b7ddfc56 (hero) = `\u2019` échappé. b077057a (Atelier/Pacte/Clôture) = `’` réel.

## MODULES (UUID → contenu) — tous PATCHÉS
- `b7ddfc56` = Header(nav) + Hero
- `6641f2bf` = Benefits(Avantages) + HowItWorks(La Séquence, 11 agents)
- `b077057a` = OurWork(L'Atelier, PROJECTS 6 cas) + Pricing(Le Pacte, PRICING_TIERS + Enterprise inline) + CTA(Correspondance)
- `0fbb2257` = Site() : état lang → détecte navigator.language, propage `<html lang>` + `window.__dhLang`
- intro = `<script id="dh-intro-pkg">` dans le HTML externe → fallback navigator.language
- `a1b2c3d4` = blurb LÉGAL `"p":[...]` (PAS les cartes prix) → NON touché

## VÉRIFS PASSÉES (Playwright, file:///tmp/dh_fr.html)
- Navigateur fr-FR : site démarre FR (`<html lang>=fr`, h1 « Pas un outil »), toutes sections nouveau copy, 0 chaîne périmée, 0 erreur JS.
- Navigateur en-US : défaut EN, bascule EN→FR OK.
- Intro : fr→« La ville dort… Pas la nôtre. », en→« The city sleeps… ».

## CHANGEMENTS CLÉS APPLIQUÉS
Hero (Autonome par nature) · Avantages (brass *mesurées* ; fondent/construction/franche/tracé ; **est témoin→est contresignée** ; « pas une ligne de facture » ; Vous fixez) · Séquence (*Une pièce en cinq actes* ; personas L'Orchestratrice/Le Façonneur/Le Machiniste/Le Passeur ; rôles genrés ; accents Interprète/Vérificatrice ; requirements→cahier des charges) · Atelier (*une seule règle d'or : la Qualité* ; respectons→honorons) · Pacte (**Inscris-toi→Inscrivez-vous** ; Early access→Accès anticipé ; **TIER IV→PALIER IV** ; en opt-in→en option ; personnalisation/journaux d'audit) · Clôture (*Votre Salesforce livré comme s'il était déjà en production*).

## CHOIX ASSUMÉS (rouvrables)
1. Punchlines des 6 cas L'Atelier : laissées (déjà bon FR). Versions alt. validées en mémoire si polissage voulu.
2. Badges `scope[]` : PARTAGÉS en/fr dans le code → gardés EN (franciser casserait l'EN). Pour franciser : dédoubler `scope` en `{en:[],fr:[]}` dans PROJECTS + adapter le rendu.

## PROCHAINES PISTES (à ta main)
- Revue visuelle FR sur https://digital-humans.fr/ → corrections éventuelles.
- Décider : remettre la holding, ou laisser le vrai site public.
- Option franciser badges scope[] (chantier structurel ci-dessus).
- Options laissées : eyebrow hero « Sur l'avenir » ; footer « NATIVEMENT À DISTANCE ».

---
## mod35 (2026-05-31) — FIX affichage « L'exactitude »
Bug : dans un titre JSX nu `t:<>…</>`, `\u2019` n'est PAS décodé par JS (contrairement aux chaînes `'…'`) → affichait littéralement « L\u2019exactitude ».
Fix : apostrophe LITTÉRALE `’` dans le titre JSX. Vérifié rendu : « L'exactitude par construction ». 0 résidu.
RÈGLE : dans les valeurs JSX hors guillemets (titres `t:<>…</>`), toujours apostrophe réelle `’`, jamais `\u2019`. (Le `\u2019` n'est valable que dans les chaînes entre quotes `'…'`.)
Live MD5 = 27a53758db0dc02067b5e388f64e31f6 · snapshot index.html.GOOD-mod35-exactfix · backup index.html.pre-mod35-exactfix

---
## mod36 (2026-05-31) — USE CASE PHARMA câblé (A+)
- SDS pharma = **exéc 148** (Clinical Trial Watch), coverage 85 %, coût réel 8,34 $. Rendu via `build_sds.py --execution-id 148` (GRATUIT, données réelles base, 0 LLM).
- Projet 100 renommé en base : « Essais Cliniques E2E #144 » → **« Clinical Trial Watch »** (1 seule exéc dessus, sans effet de bord) → hero propre, plus de double « #144 #148 ».
- Page publiée : `/var/www/digital-humans.fr/sds-preview/148.html` (servie via alias nginx, HTTP 200). 86 liens nav, 15 sections, 36 UCs.
- Bundle b077057a patché : cas `id:'pharma'` `sds_url: null` → `'https://digital-humans.fr/sds-preview/148.html'`. Ancre unique = `'Audit-ready logs, end-to-end'],\n    sds_url: null,`.
- Vérifié Playwright : Work affiche « LIRE LE SDS → » pour LogiFleet(146) ET Clinical Trial Watch(148), 0 erreur JS.
- Live MD5 = 475cf5a86a72e84ff90344c1d7a1156c · snapshot index.html.GOOD-mod36-pharma-link · backup index.html.pre-mod36-pharma-link
- RAPPEL régénération page SDS depuis la base : `cd /root/workspace/digital-humans-production && source backend/venv/bin/activate && PYTHONPATH=. python3 tools/build_sds.py --execution-id <ID> --output /var/www/digital-humans.fr/sds-preview/<ID>.html`
- 4 cas restants (claim/pipeline/grid/omnichannel) = `sds_url: null` → « SDS · bientôt » (= les 4 SDS à générer au test canary+3).
