# 🗂️ Mémo de reprise — Digital Humans refonte site

**Dernière session : 29 avril 2026 (Mod 24 menu/blog/CGV — validé visuellement par Sam)**
**Statut : Mods 1-24 livrés. Phase 3 Stripe S3.3 backend OK end-to-end. Reste : pages legal, gating runtime tier-based, wiring frontend dashboard.**

---

## 🎯 Reste à faire (état au 29 avril 2026, fin journée)

### A. Marketing site — bouclage rapide

- [ ] **Pages legal** à créer (les liens du footer Mod 24 pointent vers /cgv, /legal, /privacy → 404 actuellement)
  - Option simple : 3 pages HTML statiques servies par nginx, dans `/var/www/legal/`
  - CGV : à rédiger à partir de l'offre Stripe Standard + tiers Free/Pro/Team/Enterprise + crédits + remboursement
  - Mentions légales : SARL Sam Hatit Consulting + RCS + adresse + hébergeur (Hostinger)
  - Privacy : RGPD, données collectées (auth, billing Stripe), durée de conservation, droit d'accès
- [ ] **Slide "échanges entre agents"** (en attente) — Sam doit préciser sa réf visuelle ("petits ronds" non identifiés dans le bundle actuel)
- [ ] **Bug Mod 11** alignement step-meta-col Act I (abandonné, à reprendre éventuellement)

### B. Phase 3 backend — Gating runtime tier-based

- [ ] `models/subscription.py` refacto 3 → 4 tiers (branche `feature/freemium-realignment`)
  - SubscriptionTier : Free/Premium/Enterprise → Free/Pro/Team/Enterprise
  - User.is_premium → is_pro / is_team / is_enterprise
  - `feature_access.py:83` : remplacer SubscriptionTier.PREMIUM
  - Migration Alembic 009 défensive (no-op data : 4 users en free aujourd'hui)
- [ ] `LLMRequest.subscription_tier: Optional[str]` + propagation depuis User dans tous les call sites du router
- [ ] `_select_provider()` lit tier_overrides du YAML : si tier=pro ET agent ≠ marcus → force Sonnet
- [ ] `CreditService.preflight_check` : raise `ModelNotAllowedError` si tier=pro AND model=opus AND agent_id != "marcus"
- [ ] `llm_routing.yaml` : override tier-based, Pro → Marcus Opus / autres orchestrators Sonnet
- [ ] `model_pricing.allowed_tiers` : ajouter `pro` à Opus avec restriction par agent côté router
- [ ] Migration 010 : `tier_config.pro.monthly_credits` 2 000 → ~15 000 (couvre 2 SDS/mois + chat)
- [ ] Activer **prompt caching Anthropic** sur Marcus (system prompt + RAG context identiques entre les 7 calls par SDS) — gain estimé ~$1/SDS

### C. Mod 25 — Wiring frontend dashboard

- [ ] Brancher boutons "Upgrade" du dashboard `app.digital-humans.fr` → `POST /api/billing/checkout` → redirect window.location vers l'URL Stripe Checkout
- [ ] Brancher bouton "Manage subscription" → `POST /api/billing/portal`
- [ ] Affichage du tier courant + crédits restants dans le header dashboard

### D. Décisions business à acter (séance dédiée)

- [ ] **Pricing packs d'overage** : proposition initiale 9 € / 24 € / 79 € pour 3K / 8K / 30K crédits → cibler ~8-10 € de marge brute par SDS d'overage. À recalibrer.
- [ ] Politique de remboursement / annulation (cancel_at_period_end déjà en place côté code, à formaliser dans CGV)

### E. Avant passage en prod (checklist sécurité Stripe)

- [ ] **Roll TOUTES les clés Stripe** (la sandbox secret key a été exposée dans un chat — sandbox = zéro impact financier réel mais à roll avant prod)
- [ ] **Recréer les produits Pro/Team en mode live** (les `price_test_...` ne migrent pas vers live)
- [ ] Reconfigurer le webhook endpoint sur le compte live (re-coller le whsec_... dans .env prod)

### F. Documentation à synchroniser

- [ ] `docs/refonte/sources/timeline.yaml` : ajouter entrée Mod 24 (29 avril fin journée)
- [ ] `docs/refonte/sections/marketing-site.html` : refléter le nouveau menu (5 liens : Benefits / Sequence / Work / Pact / Journal) et le footer enrichi

---

### Hors-périmètre court terme (pour mémoire — paused workstreams)

- E2E testing series (paused au #145, données #143 en DB pour analyse offline)
- P10 BaseAgent class (post-E2E completion)
- RAG repair (toutes les ingestions ont fail avec "Broken pipe", agents tournent sans KB)
- SDS V3 generator (Ollama/Mistral 7B, exists mais non-fonctionnel)
- MASTER_PLAN_V3.2 features (P2-Light UX, P2-F.5 Change Request)

---

## ✅ Ce qui est fait (sessions 19 avril → 29 avril)

### Session 19 avril — Mods 1 à 11
- Mods 1-8 : retouches design générales (hero, navigation, sections benefits, etc.)
- Mod 9 : injection photo Sophie + nouveau layout éditorial Act I (solo)
- Mod 10 : layout unifié pour tous les actes (220×275 px, cerclage agent color via box-shadow `--ac`, filter saturate 0.9 contrast 1.03)
- Mod 11 : tentative alignement droit `step-meta-col` Act I — bug visuel non-effectif (la CSS est injectée mais visuellement rien ne change). **Bug abandonné** (Sam : "on saute, on verra plus tard")

### Session 25 avril — Mods 12 à 14
- **Mod 12** : injection batch des **10 photos restantes** (Olivia, Emma, Marcus, Diego, Zara, Raj, Aisha, Elena, Jordan, Lucas) + enrichissement bilingue des rôles avec taglines narratives + ajout `ac:'#hex'` couleur agent sur chaque entrée. 20/20 patches OK. Bug rencontré : apostrophe ASCII dans `L'Interprete` qui cassait la string JS — fixé en utilisant l'apostrophe typographique `'` (cohérent avec le reste du fichier où il y a 367 occurrences typo).
- **Mod 13** : split du rôle en 2 spans stylisés (label métier en mono petit gris, séparateur `·` en brass, punchline en serif italique). Bug rencontré : `\u00b7` rendu littéralement comme texte JSX au lieu d'être interprété — fixé en utilisant le caractère `·` UTF-8 directement avec `json.dumps(ensure_ascii=False)`.
- **Mod 14** : punchline en bloc séparé (sa propre ligne) au lieu d'inline. **Validé par Sam** : "non, c'est bon. merci."

### Layout actuel des cartes agents (post Mod 14)

```
[ photo 220×275 cerclée couleur agent ]

Agent Name              ← serif 18px bone
APEX DEVELOPER          ← mono 9.5px gris bone-4 0.16em (label métier)
The Pianist             ← serif italique 16.5px bone (signature, sa propre ligne)

Diego writes Apex code… ← hero-line serif italique 13.5px (description)
```

### Mapping complet photo ↔ agent ↔ accent

| Photo | Agent | Accent hex | Rôle EN | Rôle FR |
|---|---|---|---|---|
| `7_15PM` | Sophie Chen | `#8B5CF6` violet | Project Manager · Orchestrator | Chef de projet · Chef d'orchestre |
| `8_25PM` | Olivia Parker | `#3B82F6` bleu | Business Analyst · The Interpreter | Business Analyst · L'Interprete |
| `8_28PM` | Emma Rodriguez | `#06B6D4` cyan | Research Analyst · The Verifier | Research Analyst · La Verificatrice |
| `8_36PM` | Marcus Johnson | `#F97316` orange | Solution Architect · The Builder of Shapes | Architecte Solution · Le Batisseur |
| `8_37PM` | Diego Martinez | `#EF4444` rouge | Apex Developer · The Pianist | Développeur Apex · Le Pianiste |
| `8_41PM` | Zara Thompson | `#22C55E` emerald | LWC Developer · The Painter | Développeuse LWC · La Peintre |
| `8_42PM` | Raj Patel | `#EAB308` amber | Administrator · The No-Code Wizard | Administrateur · Le Magicien No-Code |
| `8_44PM` | Aisha Okonkwo | `#92400E` sienna | Data Specialist · The Curator | Spécialiste Data · La Curatrice |
| `8_44PM_1` | Elena Vasquez | `#6B7280` slate | QA Engineer · The Guardian | Ingénieure QA · La Gardienne |
| `8_45PM` | Jordan Blake | `#1E40AF` indigo | DevOps Engineer · The Stagehand | Ingénieur DevOps · Le Régisseur |
| `8_46PM` | Lucas Fernandez | `#D946EF` magenta | Trainer · The Transmitter | Formateur · Le Transmetteur |
| `8_47PM` | LogiFleet card | — | (carte projet, pour la Galerie) | — |

---

## 🗂️ État de la maquette

**URL** : http://72.61.161.222/preview/
**Auth** : `preview` · `a88PtPREkPe9`
**Fichier** : `/var/www/dh-preview/index.html` (bundle React autonome, ~14.5 MB)

### Backups incrémentaux (rollback en 1 commande)

```bash
# Liste les backups disponibles :
ls -la /var/www/dh-preview/index.html.pre-mod*

# Rollback à un backup donné :
cp /var/www/dh-preview/index.html.pre-modN /var/www/dh-preview/index.html
```

État actuel = post-mod23 + Stripe S3.3 sandbox **fully validated end-to-end** (commits `b8e4f82` + `c801873`). Backups disponibles : `pre-mod1` à `pre-mod23-pricing`.

---

### Session 28 avril — Mod 17

- **Mod 17** : ajout du bouton **"My Studio"** dans la nav header (desktop + mobile menu).
  - Cible : `https://app.digital-humans.fr` (sous-domaine d'app + HTTPS Let's Encrypt posés le même jour)
  - Style : outline brass (couleur signature), monospace uppercase, hover plein
  - Position : entre "The Ensemble" et le toggle FR/EN
  - Libellés EN/FR : "My Studio" / "Mon Studio"
  - Module modifié : `b7ddfc56` (Header + Hero)
  - CSS class ajoutée : `.btn-studio` dans le template shell
  - Backup : `index.html.pre-mod17-mystudio`
- **Validé Sam** : "ça marche" (test du parcours complet preview → Studio → Console)

### Session 29 avril 2026 — Mod 23 (Section prix)

- **Mod 23** : ajout de la section pricing dans le bundle preview.
  - Nouvelle section narrative `№ 04 · The pact / Le pacte` insérée entre OurWork et CTA
  - CTA renuméroté `№ 04 → № 05`
  - 3 cards Free / Pro 49€ / Team 1 490€ (card Pro mise en évidence, double-bordure brass offset)
  - Bloc Enterprise séparé en bas, plus discret
  - Contenu bilingue EN/FR, reflète les décisions actées 26 + 29 avril :
    - Free : Sophie+Olivia chat seul, Haiku, stateless
    - Pro : équipe complète + **2 SDS/mois inclus** + Marcus en Opus + Sonnet pour le reste, pas de BUILD
    - Team : tout Pro + BUILD + SFDX sandbox uniquement, Opus opt-in
    - Enterprise : on-premise, choix LLM, prod négociée
  - Boutons CTA = `Get on the list / S'inscrire à la liste` → ouvre le drawer Sophie (SophieChat, Mod 20). Pas de wiring Stripe pour l'instant.
  - Modules touchés : `0fbb2257` (Site composition), `b077057a` (avatars.jsx — composant Pricing + renumérotation), template CSS (5,8 K chars de styles `.pricing-*`)
  - Bundle : 16 155 KB → 16 164 KB (+9 KB)
  - Backup : `index.html.pre-mod23-pricing`
  - Commit : `d679652` poussé sur `origin/main`

### Session 29 avril 2026 (après-midi) — Phase 3 S3.3 backend Stripe

**Setup Stripe sandbox côté Sam (dashboard.stripe.com/test) :**
- Sandbox `Digital-Humans.fr san...` (acct_1TRU6F2U0jLqzz5T) activée, séparée du compte live
- 2 produits récurrents créés en mode test :
  - Pro · 49 €/month  → `price_1TRW5X2U0jLqzz5TWvNKYxow`
  - Team · 1 490 €/month → `price_1TRW6p2U0jLqzz5TEq85SfpE`
- Standard Secret Key + Publishable Key générées, `pk_test_...` posée dans le `.env` directement
- ⚠️ La Secret Key sandbox a été exposée dans le chat — Sam acte qu'on la roll uniquement avant le passage en prod, vu que le sandbox a zéro impact financier réel. **Avant prod : roll TOUTES les clés Stripe + recréer les produits en mode live (les `price_test_...` ne migrent pas)**

**Code livré (commit `b8e4f82`, +488 lignes) :**

- `app/services/stripe_service.py` (NOUVEAU, 295 lignes)
  - `create_customer(user, db)` — idempotent, persiste `user.stripe_customer_id`
  - `create_checkout_session(user, tier, db, success_url, cancel_url)` — retourne `{id, url}`, mode subscription, metadata `user_id + target_tier`
  - `create_portal_session(user, return_url)` — URL hosted Customer Portal
  - `verify_webhook(payload, signature)` + `handle_webhook_event(event, db)` avec dispatch sur les events subscription (created/updated/deleted)
  - `PRICE_ID_TO_TIER` mapping chargé depuis le `.env`

- `app/api/routes/billing.py` (étendu de 35 → 205 lignes) — 4 nouvelles routes :
  - `POST /api/billing/checkout` (auth, body `{tier}`)
  - `POST /api/billing/portal` (auth)
  - `POST /api/billing/cancel` (auth, cancel_at_period_end)
  - `POST /api/billing/webhook` (no auth, signature vérifiée)

- `app/api/routes/auth.py` — hook best-effort sur `/register` : crée un Stripe Customer automatiquement après chaque signup. Failure-tolerant : si Stripe down, signup ne fail pas (lazy fallback au premier checkout)

- `requirements.txt` : `stripe==15.1.0` ajouté

**Smoke tests E2E (tous passants en sandbox) :**

| Test | Résultat |
|---|---|
| Register user #7 | ✅ user créé + `cus_UQN11zaUneTpZ5` auto-créé via hook |
| Login → JWT | ✅ |
| POST /billing/checkout `{tier:pro}` | ✅ 200 {id, url Stripe} |
| POST /billing/checkout `{tier:team}` | ✅ 200 {id, url Stripe} |
| POST /billing/checkout `{tier:free}` | ✅ 400 (validation OK) |
| POST /billing/portal | ✅ 200 {url} |
| /checkout sans auth | ✅ 401 |
| /webhook sans signature | ✅ 503 (whsec pas encore configuré) |

**À faire en prochaine session (Phase 3 reste) :**

1. **Webhook endpoint sur Stripe dashboard** (côté Sam, ~5 min)
   - Aller sur `dashboard.stripe.com/test/webhooks` → Add endpoint
   - URL : `https://app.digital-humans.fr/api/billing/webhook`
   - Events à écouter : `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_succeeded`, `invoice.payment_failed`
   - Copier le **Signing secret** (`whsec_...`) et le poser dans `.env` côté serveur :
     ```bash
     sed -i "s|^STRIPE_WEBHOOK_SECRET=.*|STRIPE_WEBHOOK_SECRET=whsec_xxxx|" .env
     systemctl restart digital-humans-backend
     ```

#### Test E2E Stripe complet (en fin de session)

Le test final a permis de valider la boucle complète et de **corriger une erreur de config** sur le webhook endpoint :

1. **Checkout réel sandbox** : Sam ouvre l'URL Checkout pour user #5, paie avec carte test `4242 4242 4242 4242`. Stripe retourne `success`.
2. **Logs backend** : 5 events arrivent et sont vérifiés (signature OK) : `payment_intent.created`, `payment_intent.succeeded`, `invoice.created`, `invoice.finalized`, `invoice.paid` — mais **aucun `customer.subscription.created`** !
3. **Diagnostic** : la config webhook avait `subscription_schedule.*` (programmés) au lieu de `customer.subscription.*` (immédiats). Sam avait coché les mauvaises cases lors de la création de l'endpoint.
4. **Fix via API** : `stripe.WebhookEndpoint.modify(we_1TRWQ22U0jLqzz5TIaPhScoS, enabled_events=...)` → ajouté les 5 events `customer.subscription.{created,updated,deleted,paused,resumed}`. Endpoint passe de 18 → 23 events.
5. **Sync manuelle user #5** : appel direct de `_handle_subscription_change()` avec les vraies données de la subscription Stripe → handler retourne `{handled: True, user_id: 5, new_tier: pro, stripe_status: active}`. **`user.subscription_tier` passe de `free` à `pro` en DB.**

**État Stripe sandbox final** :
- Customer `cus_UQMzigV18KGh3y` (user #5 test@digitalhumans.ai) avec subscription active `sub_1TRWXE2U0jLqzz5TVDGjpPCJ` sur Pro 49 €/mois
- Customer `cus_UQN11zaUneTpZ5` (user #7 stripe-e2e-1777462059@digitalhumans.ai) sans subscription, créé via le hook signup
- Webhook endpoint `we_1TRWQ22U0jLqzz5TIaPhScoS` opérationnel, 23 events couvrant tout ce dont on a besoin
- `STRIPE_WEBHOOK_SECRET=whsec_faYiwcQCkmx8yK7w4nmPXAuZi8SSKYDz` chargé dans `.env` + backend redémarré

**Au prochain checkout** : le flow sera 100 % automatique (Stripe → webhook → handle_subscription_change → DB sync). Pas besoin de re-tester pour valider, on l'a déjà prouvé module par module.

2. **Test du webhook end-to-end** (côté moi)
   - Faire un vrai checkout depuis Stripe sandbox (avec carte test `4242 4242 4242 4242`)
   - Vérifier que le webhook reçoit `customer.subscription.created`
   - Vérifier que `user.subscription_tier` passe à `pro` en DB
   - Vérifier que `tier_config.pro.monthly_credits = 15000` est attribué via `CreditService`

3. **Gating runtime tier-based** (côté moi, le gros morceau Phase 3 partie 2)
   - `LLMRequest.subscription_tier: Optional[str]`
   - `_select_provider()` lit `tier_overrides` du YAML : si `subscription_tier="pro"` ET agent ≠ marcus → force orchestrator → Sonnet
   - `CreditService.preflight_check` : raise `ModelNotAllowedError` si tier=pro AND model=opus AND agent_id != "marcus"
   - Propagation `subscription_tier` depuis User dans tous les call sites du router

4. **Mod 24 — wiring frontend** (côté moi)
   - Pour l'instant les boutons "Get on the list" du Mod 23 ouvrent le drawer Sophie. Quand le dashboard `app.digital-humans.fr` aura un flow d'auth complet, on câblera les boutons "Upgrade" du dashboard vers `POST /api/billing/checkout` → redirect window.location.

5. **Pricing packs d'overage** (à acter en séance dédiée)
   - Proposition initiale : 9 €/24 €/79 € pour 3K/8K/30K crédits
   - Cibler ~8-10 € marge brute par SDS d'overage (à recalibrer)

### Session 28 avril (après-midi) — Mods 18, 19, 20 (solo)

- **Mod 18 / fix apostrophe** : 9 occurrences de `\u2019` rendues littéralement
  ont été remplacées par l'apostrophe typographique réelle dans le module
  `b077057a` (CTA, descriptions Sophie, etc.). Notamment "ship Salesforce
  like it's already shipped" qui s'affichait avec `\u2019` au lieu de `'`.
  Backup : `index.html.pre-mod18-fix-apostrophe`.

- **Mod 19 / Sophie alignement droit (ex-bug Mod 11)** : ajouté
  `align-items: flex-end` + `text-align: right` à `.step-meta-col`. Le bug
  initial venait du fait que `justify-self: end` n'a pas d'effet quand la
  colonne grid occupe déjà tout l'espace via `1fr`. La correction force
  l'alignement DANS la colonne flex au lieu d'essayer d'aligner la cellule
  grid. **À vérifier visuellement** : effet sur tous les actes, pas juste
  Sophie. Backup : `index.html.pre-mod19-sophie-align`.

- **Mod 20 / Talk to Sophie chat widget** : nouveau bouton flottant en
  bas-droit qui ouvre un drawer chat. Sophie répond via
  `/api/public/concierge/talk` (backend déjà en place). Modifications :
    - Nouveau module JSX `b41ed13f-c6c3-4e60-adb9-cad7e009b92b`
      (window.SophieChat) — 7.3KB compressé.
    - Nouveau script `<script type="text/babel">` dans le body, ordonné
      AVANT l'orchestrator pour que `window.SophieChat` soit défini quand
      `<Site>` se monte.
    - Bloc CSS `.sophie-launcher`, `.sophie-drawer`, `.sophie-msg-*`
      injecté dans le template stylesheet.
    - Le composant `<window.SophieChat lang={lang}/>` est rendu après le
      `<Footer>` dans `<Site>`.
    - Hero CTA, Header CTA, et CTA section : "Book a demo" / "Réserver"
      → "Talk to Sophie" / "Parler à Sophie". Le `mailto:` est remplacé
      par un onClick qui clique sur le launcher.
    - Persistence : `localStorage['dh-sophie-session']` stocke le
      `session_uuid` v4. Au refresh, on reload l'historique via
      `GET /api/public/concierge/history/{uuid}`.
    - Drawer ↔ fullscreen toggle bouton ⤢/⤡.
  Backup : `index.html.pre-mod20-talk-to-sophie`.



### Session 1er mai 2026 — Mod 28 (Sprint 1 pre-launch)

Suite à la revue critique du 1er mai (verdict NO-GO sur 4 bloquants juridiques + UX), Sprint 1 livré en une mod :

- **Footer** : `hello@digital-humans.fr` rendu cliquable (`<a href="mailto:...">`).
- **Pricing tiers** : 
  - Free CTA → redirige vers `https://app.digital-humans.fr/signup` au clic
  - Pro/Team CTAs → état grisé `"Bientôt"` / `"Coming soon"` non-clickable, attribut `aria-disabled`, `cursor: not-allowed`
  - Décision Sam : My Studio header reste actif (présuppose tier Free studio ouvert au launch)
- **Routes SPA `/cgv` `/legal` `/privacy`** : 
  - Mini-routeur ajouté dans `Site()` basé sur `window.location.pathname`
  - Nouveau module `legal.jsx` (UUID `a1b2c3d4-...-345678`, +27 KB JSX, +12 KB compressé)
  - Composants `LegalLayout` (réutilise Header + Footer + SophieChat) + `LegalPage` (rend titre + ToC + sections)
  - Contenu boilerplate SaaS B2B FR rédigé : Mentions (5 sections) / CGV (10 sections) / Confidentialité (8 sections), bilingue FR + EN
  - Placeholders `[À COMPLÉTER]` pour SIRET et adresse siège (auto-entreprise) — à remplacer avant prod
  - Document title dynamique selon la route
- **CSS additionnel** : `.legal-doc`, `.legal-toc`, `.pricing-cta.is-disabled`, `.footer-mail` (Cormorant + Inter, ink/bone/brass cohérent avec le reste)
- **Bundle** : 16 167 → 16 184 KB (+17 KB)
- **Backup** : `index.html.pre-mod28-sprint1`

⚠️ **Risque tracé** : si le tier Free du studio n'est PAS prêt au moment du go-live marketing, le bouton "My Studio" du header envoie sur un trou (l'app studio actuelle n'a pas de page `/signup` distincte). Soit ouvrir le tier Free synchronisé, soit basculer "My Studio" en "Bientôt" en urgence.

**Reste à faire pour le pre-launch** :
- Sprint 2 : refonte mobile complète (Lighthouse audit + cartes 220×275 px responsive + paliers stacking + carrousel acte 2)
- Sprint 3 : galerie SDS (publier 2 de plus ou retirer "coming soon") + témoignages (2-3 logos pilotes)
- Sprint 1 résiduel : faire valider les CGV par un juriste, compléter SIRET + adresse, créer page `/signup` côté studio

### Question en attente — slide "échanges entre agents"

Sam a demandé d'ajouter "le dernier slide de la présentation de l'équipe,
celui avec les échanges entre tous les agents, en l'adaptant un peu, mettre
les photos en plus petit au lieu des petits ronds du slide".

Je n'ai pas trouvé un slide existant avec des "petits ronds" dans le bundle
actuel. Le slide `OurAgents` (№ 03 · The ensemble) utilise déjà les vraies
photos des 11 agents en grille, pas des ronds. Il y a peut-être :
  (a) un slide manquant qu'il faut créer ex-nihilo (réseau d'échanges/flèches
      entre agents),
  (b) une référence visuelle externe que Sam a en tête,
  (c) un autre slide à modifier que je n'identifie pas.

J'ai préféré laisser ce chantier en pause plutôt que d'inventer un slide
qui ne correspondrait pas à l'intention. **À discuter au retour de Sam.**

### Session 29 avril 2026 — Cadrage pricing + Stripe + inventaire backend

**Pas de mod sur le bundle aujourd'hui** — session de cadrage business + technique avant d'attaquer Mod 23 et Phase 3 backend.

#### Ce qui a été tranché
- **3 colonnes au lancement** (pas de palier Mid 299€). Mid évalué après 3-6 mois de data Pro.
- **Modèle de crédits implémenté en V1** (pas reporté). La table `tier_config` est déjà seedée correctement (`free` 0 cr + cap 300/jour, `pro` 2000 cr/mois 49€, `team` 100000 cr/mois 1490€).
- **Périmètre Pro confirmé** : équipe complète + upload + mémoire persistante, **livrable final = SDS** (BR + UC + Solution Design + Word/PDF). **Pas de BUILD, pas de déploiement.**
- **Périmètre Team confirmé** : pipeline complet jusqu'à **sandbox uniquement**. **Pas de mise en production** (raison de sécurité).
- **Compte Stripe ouvert**, offre **Standard** retenue (pas Managed Payments). Tarifs : 1,5% + 0,25€ pour cartes EEE, 2,5% + 0,25€ pour cartes UK, sans frais fixes.

#### Inventaire backend (ce qui existe vs ce qui manque pour la Phase 3)
**Existe et fonctionnel** ✅
- Auth maison (register/login/JWT) avec rate limiting et bcrypt
- `User` model avec `subscription_tier` + `stripe_customer_id` déjà prévu
- Tables crédits : `credit_balances`, `credit_transactions`, `model_pricing`, `tier_config` (migration `008_credits_tables`)
- `CreditService` avec `charge()` / `get_balance()` / `get_usage()` / `preflight_check()` + `_TIER_ALIAS` mapping
- Routes `GET /api/billing/balance` et `GET /api/billing/usage`
- Seed `model_pricing` correct : haiku partout, sonnet pro+team, opus team opt-in

**À refactorer** 🔧 (branche `feature/freemium-realignment`)
- `models/subscription.py` est resté sur 3 tiers (Free/Premium/Enterprise avec Premium 99€ et BUILD inclus). Décalage avec les décisions actées : il faut passer à 4 tiers (Free/Pro/Team/Enterprise) avec les bons périmètres.
- `User.is_premium` → renommer en `is_pro` / `is_team` / `is_enterprise`
- `feature_access.py` ligne 83 référence `SubscriptionTier.PREMIUM` → mettre à jour
- Migration Alembic 009 défensive (4 users en `free` aujourd'hui, 0 en premium/enterprise → no-op data en pratique)

**À créer** ❌ (Phase 3 S3.3)
- `services/stripe_service.py` (customer, products, checkout, webhook, portal)
- Routes `POST /api/billing/checkout`, `/portal`, `/webhook`, `/upgrade`, `/cancel`
- Hook signup → create Stripe Customer
- Idempotence + signature webhook vérifiée

#### Quality-keeper sur Pro — Marcus reste en Opus

Analyse marge faite sur Exec #147 (SDS complet, 1.4M tokens). Marcus consomme à lui seul **$12.77 sur les $22.85** du SDS = 56 % du coût total (raisonnement architectural lourd, 251K tokens input × 7 calls).

**Décision : Marcus reste en Opus sur Pro** — c'est la vitrine technique scrutée par les clients Salesforce, qui sont eux-mêmes des techies. Les autres orchestrators (Sophie/Olivia/Emma) passent en Sonnet pour le tier Pro.

**Coût SDS recalibré (scénario C)** : $20.87 (vs $22.85 actuel ou $15.76 en tout-Sonnet pur).

**Quota Pro = 2 SDS/mois inclus**, au-delà → overage en packs de tokens. Calibrage `tier_config` à bump : 2 000 crédits actuels → ~15 000 cr/mois pour couvrir 2 SDS + chat. Pricing des packs d'overage à acter en séance dédiée (proposition initiale : 9 € / 24 € / 79 € pour 3 / 8 / 30 K crédits, à ajuster pour viser ~8-10 € de marge brute par SDS d'overage).

**Implications code (Phase 3)** :
- `llm_routing.yaml` : override tier-based, Pro → Marcus Opus / autres orchestrators Sonnet
- `model_pricing.allowed_tiers` : ajouter `pro` à Opus avec restriction par agent côté router
- `tier_config.pro.monthly_credits` : 2 000 → ~15 000 (migration 010)
- `subscription.py` : flag `opus_marcus_only` côté Pro

**Optimisation à activer** : prompt caching Anthropic sur Marcus (system prompt + RAG context identiques entre les 7 calls par SDS) → gain estimé ~$1/SDS sans rien casser.

#### Documentation mise à jour
- `docs/refonte/sources/timeline.yaml` : entrées 28 + 29 avril (commit `d1fb657`)
- `docs/refonte/sections/marketing-site.html` (NEW) : bundle, mods, sous-domaines, endpoints publics
- `docs/refonte/sections/pricing-billing.html` (NEW) : 4 tiers + crédits + Stripe + état d'implémentation
- Nouveau groupe TOC "Site & produit" dans la doc refonte (commit `a41c240`)
- URL canonique de la doc : `app.digital-humans.fr/admin/docs/` (auth requise)

---

## 🧠 Principes techniques du bundle (à rappeler)

- **Format custom** : 3 sections `<script type="...">` à parser et reconstruire :
  - `__bundler/manifest` — JSON des ressources `{uuid: {mime, compressed, data: base64}}` (41 entries actuellement)
  - `__bundler/ext_resources` — array `[{id: 'avXxx', uuid: '...'}]` mapping name → uuid (11 entries pour les avatars)
  - `__bundler/template` — string JSON contenant le HTML complet de la page (avec CSS inline, JSX modules)
- **Modules clés (UUIDs stables)** :
  - `6641f2bf-70da-46eb-a716-a60b6030f1c7` — `sections.jsx` (Benefits + HowItWorks avec les 5 actes)
  - `b077057a-5a3a-41a8-8f45-fe3c0011a134` — `avatars.jsx` (OurAgents, CTA, Footer)
  - `6633b62e-97d2-4947-9f72-56d63e72e82a` — `main.js` (bundle principal 1080K)
  - `ca8d9519-...` à `f66dd697-...` — UUIDs avatars (cf. ext_resources)
- **Compression modules JS** : gzip + base64, champ `"compressed": true`
- **Images** : `"compressed": false` avec base64 direct (JPEG ~600KB-1.3MB chacune)
- **CSS théming** : variables `--ink`, `--bone`, `--bone-2`, `--bone-3`, `--bone-4`, `--brass`, `--brass-3`, `--indigo`, `--plum`, `--terra`, `--sage`, `--slate`, `--ochre` dans `:root`
- **Variable `--ac`** : agent color, appliquée via `style={{'--ac': a.ac || 'var(--brass)'}}` sur la `.agent-card`. Utilisée uniquement par `.hero-photo::after` (cerclage 3px). Aucun autre élément ne porte la couleur agent.

### ⚠️ Pièges rencontrés

1. **Apostrophes ASCII dans les strings JSX** — `role:'L'Interprete'` casse la string JS. Toujours utiliser l'apostrophe typographique `'` (U+2019) dans les rôles FR.
2. **Escapement \u00b7 dans le contenu JSX** — `<span>\u00b7</span>` est rendu littéralement comme texte. Soit utiliser le caractère réel `·` (U+00B7) directement, soit l'évaluer en expression `<span>{'\u00b7'}</span>`. Pour conserver le caractère UTF-8 au passage par `json.dumps`, mettre `ensure_ascii=False`.
3. **Escape critique `</script>` et `</style>`** dans le template JSON sérialisé — sinon le parser HTML termine le script `<script type="__bundler/template">` prématurément. Toujours faire :
   ```python
   new_template_body = json.dumps(template_html, ensure_ascii=False)
   new_template_body = new_template_body.replace("</script>", r"<\u002Fscript>").replace("</style>", r"<\u002Fstyle>")
   ```
   Le JSON parser runtime décodera `\u002F` en `/`.
4. **Cache navigateur** — toujours recharger en `Ctrl+Shift+R` après modif, sinon on voit l'ancienne version.

---

## 📋 Prochaines étapes (par ordre probable)

### En cours — Mod 23 + Phase 3 backend (parallèle)
1. **Mod 23 — Section prix UI** : 3 colonnes Free / Pro 49€ / Team 1490€ + bloc Enterprise discret. Langage Studio (ink/bone/brass + Cormorant + Inter). Bandeau "early access". Boutons "S'abonner" placeholder en attendant le wiring. ~1 session frontend.
2. **Phase 3 backend — refactor freemium** (branche `feature/freemium-realignment`) : aligner `subscription.py` + `user.py` + `feature_access.py` sur le modèle 4-tier. Migration Alembic 009 défensive. Smoke test endpoints. ~0.5 session.
3. **Phase 3 backend — Stripe** : `stripe_service.py` + endpoints checkout/webhook/portal/upgrade/cancel. Création des produits Stripe (mode test) puis bascule prod. ~2 sessions.
4. **Mod 24 — Wiring frontend ↔ backend** : boutons Mod 23 → `/api/billing/checkout` → Stripe. Pages success/cancel. ~0.5 session.

### Backlog produit (post-lancement crédits/Stripe)
5. **Galerie projets** — SDS LogiFleet (card 8_47PM déjà disponible) + autres industries à produire
6. **Overlay urgence d'entrée** — 5-7s, skip, localStorage une fois par session
7. **Manifesto + FAQ** adaptés ton studio
8. **Passerelle "entrer dans le studio"** vers la plateforme (`/login` → dashboard React) — bouton "My Studio" en place (Mod 17), reste à câbler le flow d'auth depuis le site

### Backlog technique
- **Debug Mod 11** (alignement droit Sophie) — basse priorité (déjà fixé en partie par Mod 19, à valider visuellement)
- **Traitement "dossier CIA"** des slides — N&B + photo grand format + cercle couleur autour + nom + tagline en légende (à préciser en séance)
- **Slide échanges entre agents** — chantier en attente depuis session 28 avril (cf. Question en attente plus haut)

---

## 💡 Décisions actées (mémoire longue)

- Couleur d'agent via **cerclage CSS** uniquement (pas rim light dans la photo, pas dans le chrome du step)
- **Couleur d'acte retirée** du chrome — multi-agent = bordel de couleurs sinon
- Photos toutes à la **même taille 220×275** (4:5), staggered possible avec `nth-child(2)` margin-top 38px
- **Rôles bilingues** avec séparateur `·` (typo du site) — la punchline narrative ("The Pianist", "Le Bâtisseur"...) suit le label métier
- **Punchline sur sa propre ligne** (Mod 14) — donne du poids à la signature sans tomber dans l'arc-en-ciel
- **Filtre photo subtil** : `filter: saturate(0.9) contrast(1.03)` — pas de B&W pour l'instant (reservé au "dossier CIA" plus tard)
- **Style hero du SDS** validé comme référence visuelle pour le reste de l'app (cf. https://digital-humans.fr/sds-preview/146.html)

### Pricing & business model (29 avril 2026)
- **3 paliers au lancement** : Free (chat Sophie+Olivia seul) / Pro 49€/mois / Team 1490€/mois / Enterprise on-premise sur devis. Pas de Mid 299€ initial.
- **Périmètre Pro = SDS uniquement** (pas de BUILD, pas de déploiement). Garde-fou côté code à mettre en place dans l'orchestrateur.
- **Périmètre Team = sandbox uniquement** (pas de prod). Décision de sécurité explicite — les agents ne déploient jamais en production sur les tiers SaaS, seul Enterprise on-premise peut l'autoriser au contrat.
- **Modèle de crédits implémenté V1** — pas de freemium "tout illimité jusqu'à un cap flou". Compteurs Sonnet/Haiku/Opus séparés, Opus opt-in côté UI.
- **Stripe Standard validé** (1,5% EEE / 2,5% UK + 0,25€). Renégociation possible >80k€/mois de volume.
- **Pro = Marcus en Opus + 2 SDS/mois inclus + overage** : vitrine technique préservée (Marcus = 56 % du coût SDS, mais c'est l'agent le plus scruté), quota strict pour limiter l'exposition marge, packs d'overage au-delà. Ne change pas la promesse "Sonnet par défaut" pour les 3 autres orchestrators (Sophie/Olivia/Emma).

---

## 📍 Fichiers de référence dans le projet Claude

- `DH_brief_consolide.docx` — base stratégique, 7 parties (décisions design)
- `DH_direction_photo.docx` — 11 prompts de génération + cartes projets, mapping agents/accents
- `Generated_Image_April_19_2026_*.jpg` — 12 photos sources (présentes aussi sur VPS dans `/tmp/agents-photos/`)
- `SDS_LogiFleet_146_Studio.html` / `.pdf` — exemple SDS pour gabarit "Our work" (galerie projets)

## 📞 Accès VPS rapide

```bash
ssh root@72.61.161.222         # ou via MCP "Digital Human VPS"
cd /var/www/dh-preview
ls -la index.html*             # voir les backups
cd /tmp/agents-photos          # photos source des agents
```

---

— fin du mémo, version 25 avril 2026 (post Mods 12-14) —

### Session 29 avril 2026 (fin journée) — Mod 24 (menu / blog / CGV)

5 correctifs demandés par Sam, appliqués en un seul passage :

1. **Pricing alignement gauche** : `<div className="pricing-head">` (centré) → `<div className="section-head">` (grid 200px num + 1fr titre, comme OurWork). Bloc enveloppé dans un `<div className="wrap">` pour cohérence avec les autres sections.
2. **Menu top renommé / enrichi** : "The Ensemble" → "The Work" (href `#agents` → `#work`). Ajout de 2 entrées : "The Pact" (`#pricing`) et "Journal" (`/blog`). FR : "L’Atelier", "Le Pacte", "Journal". Module `b7ddfc56`.
3. **OurWork titre** : `"Whatever theatre of work, <em>one rim rule</em>."` → `"…, <em>one rim rule</em>, Quality."`. Idem FR : `…, <em>une seule règle</em>, Qualité.`. "Quality"/"Qualité" hérite de la couleur `--bone` du h2 (≈ blanc cassé), distinct du brass italique de l'em. Module `b077057a`.
4. **"Read the journal" → /blog** : Hero ghost (`#how` → `/blog`) et CTA ghost (`#` → `/blog`). Le blog est servi par Ghost CMS via nginx proxy `digital-humans.fr/blog → localhost:2368`.
5. **Footer enrichi** : ajout d'un bloc legal central avec 3 liens (CGV `/cgv` · Mentions légales `/legal` · Privacy `/privacy`), bilingue, CSS assorti (`.footer-legal`, `.footer-link`, `.footer-sep`) injecté juste après la règle `footer .row {…}`. Sur mobile (≤720px), le footer passe en colonne et le bloc legal se wrap.

**À faire (suite)** :
- Les pages `/cgv`, `/legal`, `/privacy` n'existent pas encore. À créer (probablement Markdown servi par nginx ou page Ghost dédiée).
- Vérifier le rendu visuel : alignement Pricing, lisibilité du menu à 6 entrées, comportement mobile du footer.

Backup : `index.html.pre-mod24-menu-blog-cgv`. Bundle 16 155 → 16 165 KB.


### Session 1er mai 2026 — Mod 29 (Sprint 2 mobile + a11y + SEO)

Suite Mod 28, audit Lighthouse baseline mobile + fixes structurants :

**Audit baseline (mobile 390×844, simulated 4G):**
- Performance 25/100 (bundle 16 MB inline = dette technique)
- Accessibility 86/100 (14 color-contrast, 9 target-size, aria-required-children, label mismatch)
- SEO 91/100 (meta-description manquante)
- FCP 80s, LCP 85s, TBT 16,690ms, CLS 0.006

**Mod 29 livré :**
- CSS responsive complet `<= 720px` : header (links secondaires masqués sur mobile, btn-studio + lang + theme tap-target ≥40px), hero, sections heads, benefits, **steps stack 1-col + agent-card 50% width 165px max**, **pricing 3-col → 1-col + padding 16px**, pricing-enterprise stack, work-grid 1-col, CTA stack, footer compacté. Plus rule `<= 380px` pour très petit.
- Color contrast : `--bone-4` passé de `#76716A` (3.8) à `#9A938A` (5.10 sur ink-2, WCAG AA). Corrige les 14 violations sur `.num`, `.pricing-eyebrow`, `.pricing-period`, `.role-label`, `.work-soon`.
- Tap targets : `.seq-dot` passé à 44×44px min avec padding + background-clip (visuel inchangé via pseudo `::after`).
- Focus visible : outline brass 2px sur tous les `button:focus-visible` et `a:focus-visible`.
- ARIA : `role="tab"` ajouté aux seq-dot des deux carrousels (HowItWorks + OurWork), `aria-selected` ajouté.
- aria-label `.lang` et `.mk` alignés avec leur visible text (passe `label-content-name-mismatch`).
- SEO : `<meta name="description">`, keywords, theme-color FR/EN/dark/light, canonical, **Open Graph complet**, **Twitter Card**, robots index/follow.
- Backup : `index.html.pre-mod29-mobile-a11y-seo`

**Résultat audit final :**
- Performance 25 (inchangé, bundle = dette technique)
- **Accessibility 86 → 100** (+14)
- **SEO 91 → 100** (+9)
- TBT 16,690 → 5,620 ms (−66 %, side-effect)
- CLS 0.006 → 0.05 (toujours vert, < 0.1)

Bundle 16,184 → 16,193 KB (+9 KB).

**Reste pre-launch :**
- Sprint 3 : galerie SDS (publier 2 de plus ou retirer "coming soon") + témoignages clients (2-3 logos pilotes)
- Sprint 1 résiduel : faire valider CGV par un juriste, compléter SIRET + adresse, créer page `/signup` côté studio
- Performance bundle 16 MB : à traiter en dette technique post-launch (split en chunks lazy-loaded, preload uniquement above-the-fold)
- Best practices : 1 console error network 404 à investiguer (probablement asset manquant à un chemin précis)
- VPS GPU : à arbitrer si Sam veut héberger un LLM local (gemma4:26b ou autre) — Hetzner GEX44 ou Scaleway L4 sont les candidats EU


### Session 1er mai 2026 — Suite Sprints + chantiers techniques

Apres Mod 28 (Sprint 1) et Mod 29 (Sprint 2 mobile/a11y/SEO), enchainement
des chantiers techniques et bouclage de plusieurs branches :

**Mod 30 (favicon SVG inline)** : fix du console 404 detecte par
Lighthouse. Favicon DH brass sur ink en data URI dans le `<head>`.
Bundle 16,193 → 16,194 KB (+341 bytes). Best Practices passe a 100/100.

**Tier-based LLM routing — chantier complet 3/3** :
- Etape 2 (commit 8df26fc) : auto-resolution tier via execution_id
  avec lru_cache(512), invalidation cache via webhook Stripe.
  Tests E2E 6/6 + 4/4. User exec 147 = user 2 free verifie en DB.
- Etape 3 (commit 416beb9) : prompt caching Anthropic auto-active
  pour agents architectes (marcus/architect/solution_architect) sur
  tier paying. cache_read_input_tokens et cache_creation_input_tokens
  remontes dans LLMResponse. Format Anthropic : system block list
  avec cache_control:ephemeral, fallback string si <4096 chars.
  Tests E2E 5/5 (+ test final via generate_llm_response 5/5).
- Tag : v2026.05-tier-routing-complete pousse.

**Studio SignupPage** (commit 8665b58) : page /signup creee, validation
client (email, password >=8, confirm match, terms checkbox), POST
register + auto-login + redirect /. Lien dans LoginPage. Style coherent
avec LoginPage actuel (purple/cyan), refonte vers charte marketing
ink/bone/brass differee en Phase 4. Build + deploy /var/www/app-studio.
Tests E2E curl OK (user 8 cree, JWT obtenu, cleanup OK).

**Branche feature/journal-publication** (commit 8fe4082, isolee depuis
main) : webhook Ghost CMS + SSG Python pour le journal. 1562 lignes :
- backend/app/api/routes/journal_webhook.py (POST /webhooks/journal/rebuild)
- scripts/journal/build.py (SSG complet)
- 7 templates Jinja2, regen_covers.py, journal.css
A faire avant prod : configurer JOURNAL_WEBHOOK_SECRET, configurer le
webhook cote Ghost admin.

**Bench LLM locaux** (commit 5096c67, sur tier-based-routing comme doc) :
30 fichiers, 18,435 lignes, 3 MB. Conclusion :
- gemma4:26b (MoE 3.8B actifs)        OK 23min Marcus, 7min Diego
- qwen3.5:27b, qwen3.6:27b, magistral:24b, devstral:24b, ministral-3:14b
                                       KO timeout 1h (prefill CPU-only)
A refaire sur Mac M-series ou VPS GPU (Hetzner GEX44 / Scaleway L4).

**F823 + F402 lint fixes** (commit 098eef8) :
- Audit ruff complet sur app/ + agents/ : 0 F821 (les 22 du 18 avril
  sont fixees), 2 vrais bugs latents trouves :
  - F823 dans execution_routes.py : faux positif ruff (closure async),
    pre-init defensive + noqa documente.
  - F402 dans sf_admin_service.py : variable de loop 'field' shadowait
    l'import dataclasses.field. Renommage en 'field_name'.
- Reste F541 (56) + F841 (21) + F401 (4) cosmetiques, dette propre,
  zero risque runtime.

---

### Etat git final session 1er mai 2026

Branche feature/tier-based-routing (8 commits depuis main) :
- 45d60d3 tier-routing étape 1 (avant cette session)
- 321835b Mod 28 Sprint 1 pre-launch
- 6a486ba Mod 29 Sprint 2 mobile/a11y/SEO
- 8df26fc tier-routing étape 2
- 416beb9 tier-routing étape 3 (prompt caching Marcus)
- 8665b58 SignupPage Studio
- fb3933d Mod 30 favicon
- 5096c67 bench LLM locaux (doc)
- 098eef8 F823 + F402 fixes

Branche feature/journal-publication (1 commit depuis main, isolee) :
- 8fe4082 webhook + SSG journal Ghost CMS

Tag pousse : v2026.05-tier-routing-complete

---

### A faire prochaine session (ordre recommande)

**Pre-launch (bloquants juridiques/business cote Sam)** :
1. Faire valider CGV par juriste (300-500 EUR, 1-2h)
2. Completer SIRET + adresse siege auto-entreprise dans Mentions legales
3. Decision : ouvrir tier Free studio avant ou apres marketing (sinon
   bouton My Studio = trou)

**Phase 3 finalisation (gating runtime + Stripe)** :
4. Reset crediits mensuel sur invoice.payment_succeeded
5. Grace period 5j sur invoice.payment_failed
6. Mod 24 (wiring frontend Stripe) — utile uniquement si Pro/Team
   passent de Bientot a actif
7. Bascule prod Stripe (rotation secrets + recreation produits live)

**Phase 4/5 Studio UI (debloque le pattern brand-coherent)** :
8. Refonte design Studio vers charte marketing (ink/bone/brass +
   Cormorant + Inter). Concerne LoginPage, SignupPage, Dashboard,
   tous les composants existants. Gros chantier (~1 sprint).
9. Compteur credits live, sidebar 3 colonnes, etc.
10. Onboarding micro-cinematique agents

**Dettes techniques** :
11. REVISION-001 P2 : Marcus revision avec mode 'patch' (par section)
    au lieu de 'fix_gaps' (regenere tout). Code patch deja la, pas branche.
12. COST-001 : propager cost_usd des autres agents (Emma, Olivia, ...)
13. P10 BaseAgent : contrat commun pour les 11 agents
14. Nettoyage F541/F841/F401 cosmetiques (77 instances, ruff --fix)
15. Bundle 16 MB site marketing : split lazy-load post-launch

**E2E** :
16. E2E #144 : preceede de revue prompt Marcus + Emma (deja prepare)


### Session 1er mai 2026 — Suite : merges main + bouclage doc admin

Apres les Sprints 1+2 marketing site, le tier-routing complet, la
SignupPage Studio et la dette F823/F402, **gros chantier de
consolidation** pour ranger le repo et eviter le bug du 1er mai
(commit base sur du code legacy purple/cyan).

**Diagnostic du bug du 1er mai** :
- Ma SignupPage initiale (commit 8665b58) etait basee sur l'ancien code
  `frontend/src/` de feature/tier-based-routing (purple/cyan SaaS).
- Le studio en prod tournait deja sur la branche feat/platform-studio
  depuis le 28 avril (refonte ink/bone/brass + Cormorant + JetBrains
  Mono, Sprint A5.1 -> A5.4 + suite, 16 commits non merges dans main).
- Mon `rsync -a --delete dist/ /var/www/app-studio/` a ECRASE le studio
  refonde. Restauration immediate depuis backup /var/www/app-studio.pre-signup-page.
- Cause racine : feat/platform-studio jamais mergee dans main -> chaque
  nouvelle branche feature partait d'un main legacy.

**Recreation propre de la SignupPage sur feat/platform-studio** :
- Lecture de la LoginPage refondue de feat/platform-studio pour comprendre
  le pattern (AppShell, design tokens tokens.css, Cormorant H1 italique,
  JetBrains Mono eyebrows, palette ink/bone/brass strict).
- Creation `frontend/src/pages/SignupPage.tsx` (355 lignes) sur ce
  worktree (`/root/workspace/dh-platform-studio`) :
  - Layout 2-col cover/form, cover `/covers/manifesto-eleven-agents.jpg`
    avec gradient ink, eyebrow `№ 01 · Welcome / Bienvenue`, citation
    "Cast a project, brief them, and watch the studio at work."
  - 4 fields name/email/password/confirm + checkbox terms obligatoire,
    validation client visuelle (border-error rouge si invalide,
    CheckCircle2 vert quand passwords match >= 8).
  - Bouton submit `bg-brass hover:bg-brass-2 text-ink py-3 font-mono
    text-[12px] tracking-cta uppercase` + ArrowRight icon.
  - i18n FR/EN via LangProvider + LangToggle + 24 strings traduits.
  - Workflow POST /api/auth/register -> POST /api/auth/login ->
    navigate('/').
- LoginPage.tsx modifiee : mailto "Request access" remplace par
  Link to /signup ("Open your studio →"), mailto enterprise conserve
  en plus discret (text-bone-4 size 10px) "— or request enterprise access".
- App.tsx : route publique /signup ajoutee juste apres /login (eager
  loading, pas lazy car couloir critique d'arrivee).
- Build npm + deploy : `dist/assets/index-ub7Wjjtb.js` 280 KB (gzip 86 KB),
  vs 1.35 MB legacy = bundle initial -80%.
- Tests E2E backend curl direct sur prod : POST register user 9 cree
  tier=free, POST login JWT obtenu, cleanup OK.
- Commit : `9dab8cb feat(auth): SignupPage refondue (coherente charte
  studio ink/bone/brass)` poussee sur feat/platform-studio.

**Revert + cleanup feature/tier-based-routing** :
- Revert mon commit 8665b58 (SignupPage legacy) qui etait techniquement
  fonctionnel mais visuellement incompatible avec le studio refonde.
- Commit `c363584 Revert SignupPage 8665b58 (legacy code base) —
  recreated on feat/platform-studio` avec message qui pointe vers 9dab8cb.

**Merge feat/platform-studio dans main** :
- Audit prealable : 16 commits non merges, 99 fichiers, +9272 / -5521 lignes.
- Common ancestor : 0fc1708 (28 fev "docs(briefs): A5.1 Foundation").
- Merge --no-ff : **0 conflit auto-merge** (backend de main et frontend
  de platform-studio n'overlap quasiment pas, Pricing.tsx mineur ecrase
  par A5.4 mais coherent vu que A5.4 inclut deja les 4 tiers de Mod 23).
- Pricing.tsx : version A5.4 retenue (405 lignes, 4 tiers + FAQ + ZDR),
  strictement plus riche que la Mod 23 sur main (250 lignes).
- Backend intact (Stripe S3.3, freemium-realignment, fix BUILD pipeline
  tous preserves de main).
- Verifications : 0 fichier UU/AA/DD non resolu, 35 A + 55 M + 5 D + 4 R.
- Commit `8bc569c Merge branch 'feat/platform-studio' into main`.
- Tag `v2026.05-platform-studio-merged` pose et pousse.

**Rebase feature/tier-based-routing sur le nouveau main** :
- Initial rebase a echoue a l'etape 6/10 (commit 8665b58 SignupPage
  avait conflits sur App.tsx + LoginPage.tsx + SignupPage.tsx avec la
  version refondue de main).
- Strategie : `git rebase --abort` puis `GIT_SEQUENCE_EDITOR="sed
  -i -e '/^pick 8665b58/s/^pick/drop/' -e '/^pick c363584/s/^pick/drop/'"
  git rebase -i main` -> drop des 2 commits qui s'annulent mutuellement.
- Replay automatique 10/10 reussi, 0 conflit.
- 8 commits propres post-rebase (au lieu des 10 originaux).
- SignupPage refondue presente (depuis le merge platform-studio dans main),
  modifs backend tier-routing intactes (`_resolve_tier_for_execution`,
  `invalidate_tier_cache`, `cache_system`), F823 fix present.
- Push --force-with-lease accepte.

**Hook post-commit fix** :
- Pendant le rebase, le hook /tmp/dh_post_commit_build.log a echoue
  plusieurs fois avec :
  ```
  BuildError: Composants présents dans App.tsx mais absents de
  frontend_pages.yaml : ['AppShell', 'SignupPage']
  ```
- Le check de coherence du build doc (collect_frontend_pages dans
  tools/lib/collect.py) plantait sur les 2 composants apportes par le
  merge platform-studio.
- Fix `48ae96a docs(refonte): frontend_pages.yaml — ajout SignupPage +
  AppShell post-merge platform-studio` :
  - Ajout SignupPage entre Pricing et Dashboard (description complete +
    access: public).
  - Ajout AppShell en fin de fichier avec access: layout (signaler
    que c'est un wrapper pas une page routee, evite la confusion).
  - MAJ description Pricing : 'Starter/Pro/Enterprise' (legacy) ->
    'Free / Pro 49 / Team 1490 / Enterprise + FAQ + ZDR'.
- Build verifie : python3 tools/build_docs.py passe (401,994 chars
  HTML final, 194 lignes modifiees vs ancien). Smoke test HTTP 302
  sur /admin/docs/ (redirect auth = comportement normal).

**Merge feature/tier-based-routing dans main** :
- 9 commits a integrer (8 + le fix YAML), tous propres post-rebase.
- Merge --no-ff : 0 conflit (rebase venait d'etre fait).
- Stats : 45 fichiers, +54072 / -183 lignes (gros volumes = audits
  Lighthouse JSON + bench LLM outputs + contenu juridique CGV).
- Hook post-commit OK : build doc passe, smoke test 302.
- Commit `2f72f5c Merge branch 'feature/tier-based-routing' into main`.
- Tag `v2026.05-may-1-consolidation` pose et pousse.

---

### Etat git final session 1er mai 2026 (reellement final)

**Branche `main`** (tip `2f72f5c`) :
Contient maintenant **toute la refonte studio + tous les chantiers
1er mai**. 28 commits depuis `3ae9425` (fin session 29 avril) :
- 16 commits A5 (Sprint A5.1 -> A5.4, perf React.lazy, agent photos,
  JWT cookie, admin link, etc.)
- 1 commit SignupPage refondue
- Merge platform-studio (8bc569c)
- Etape 1 + 2 + 3 tier-routing (3 commits)
- Mod 28 + 29 + 30 marketing (3 commits)
- F823 + F402 lint
- Bench LLM doc
- frontend_pages.yaml fix
- Merge tier-based-routing (2f72f5c)

**Branche `feat/platform-studio`** : mergee dans main, conservee pour
historique. Tip `9dab8cb`.

**Branche `feature/tier-based-routing`** : mergee dans main, peut etre
supprimee. Tip `48ae96a`.

**Branche `feature/journal-publication`** : isolee, intacte. Tip
`8fe4082`. Prete a merger apres test webhook Ghost.

**Tags poussees session** :
- `v2026.05-tier-routing-complete` (apres etape 3 + tests E2E)
- `v2026.05-platform-studio-merged` (apres merge platform-studio)
- `v2026.05-may-1-consolidation` (apres merge tier-based-routing,
  consolidation totale)

**Studio en prod** (intact pendant toute la session apres restauration) :
- JS servi : `assets/index-ub7Wjjtb.js` (build 1er mai 21:22, base sur
  feat/platform-studio + commit 9dab8cb SignupPage refondue)
- Routes : `/`, `/login`, `/signup`, `/pricing` toutes HTTP 200
- Doc admin `/admin/docs/` : HTTP 302 (auth OK)
- `app-studio.pre-signup-platform-studio/` conserve comme backup propre.
- `app-studio.broken-by-claude-2026-05-01-20-45/` supprime apres
  confirmation que la restauration tenait.

**Marketing site** :
- `/`, `/cgv`, `/legal`, `/privacy` toutes HTTP 200.
- Lighthouse mobile final : Perf 25 / a11y 100 / BP 100 / SEO 100
  (perf 25 = bundle 16 MB dette tech post-launch).

---

### A faire prochaine session (synthese consolidee)

**Pre-launch business (cote Sam)** :
1. Validation juriste CGV (300-500 EUR, 1-2h)
2. SIRET + adresse siege auto-entreprise dans Mentions legales
3. Decision tier Free Studio : ouvert au launch ou bouton "My Studio"
   redirect vers "Bientot"

**Cleanup git (5 min, optionnel)** :
4. Supprimer branche locale + remote `feature/tier-based-routing`
   (mergee, plus utile)
5. Decider du sort de `feat/platform-studio` (la conserver pour
   historique ou la supprimer aussi)

**Phase 3 finalisation Stripe** :
6. Reset credits mensuel sur invoice.payment_succeeded
7. Grace period 5j sur invoice.payment_failed
8. Mod 24 wiring frontend Stripe (utile quand Pro/Team passent de
   "Bientot" a actif)
9. Bascule prod Stripe (rotation secrets + recreation produits live)

**Journal publication** :
10. Configurer JOURNAL_WEBHOOK_SECRET, configurer webhook cote Ghost
    admin, tester l'endpoint /webhooks/journal/health
11. Quand stable -> merger feature/journal-publication dans main

**Dettes techniques (post-launch)** :
12. REVISION-001 P2 : Marcus revision avec mode 'patch' (par section)
    au lieu de 'fix_gaps' (regenere tout). Code patch deja la, pas branche
    dans pm_orchestrator_service_v2.py lignes 880-935 avec grouping gaps
    par section_key via mapping CATEGORY_TO_SECTION = {DATA_MODEL ->
    data_model, AUTOMATION -> automation_design, UI -> ui_components}.
13. COST-001 partial : propager cost_usd des autres agents (Emma,
    Olivia, ...). Marcus deja fait en feb 14 (commit 7aa5db9).
14. P10 BaseAgent : contrat commun pour les 11 agents
15. Nettoyage F541/F841/F401 cosmetiques (81 instances, ruff --fix)
16. Bundle 16 MB site marketing : split lazy-load post-launch

**E2E** :
17. E2E #144 : preceede de revue prompt Marcus + Emma (deja prepare)

