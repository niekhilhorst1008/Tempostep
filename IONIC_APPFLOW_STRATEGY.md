# 💡 Ionic Appflow - Eenmalig of Langdurig?

## TL;DR - Korte Antwoord

**JA, je kunt Appflow eenmalig gebruiken!** ✅

**Strategie:**
1. Start 14-dagen **gratis trial**
2. Build je iOS app (krijg .ipa bestand)
3. Upload naar App Store Connect
4. **Cancel trial voor dag 14** (geen kosten!)
5. Voor updates: gebruik gratis alternatief (GitHub Actions)

**Total kosten: €0 🎉** (behalve €99 Apple Developer)

---

## 🤔 Wat Heb Je Écht Nodig?

### Voor EERSTE Launch:

Ionic Appflow doet 2 dingen:
1. **BUILD** je iOS app (maakt .ipa bestand) ← Dit heb je nodig!
2. **UPLOAD** naar App Store Connect ← Dit kun je ook anders doen

**Je hebt Appflow alleen nodig voor de BUILD** (omdat je geen Mac hebt)

**De UPLOAD kun je ook doen:**
- Via Mac (als je er eentje kunt lenen voor 10 minuten)
- Via Transporter app (Mac)
- Via Appflow zelf (makkelijkst)
- Via freelancer

---

## 💰 Smart Strategie - Minimale Kosten

### Optie 1: Trial + GitHub Actions (AANBEVOLEN)

**Total kosten: €0** (behalve €99 Apple)

```
Week 1: Start Ionic Appflow trial (gratis)
        ↓
        Build iOS app met Appflow
        ↓
        Download .ipa
        ↓
        Upload naar App Store Connect
        ↓
        Launch app! 🚀
        ↓
Week 2: Setup GitHub Actions (gratis, zie guide)
        ↓
        Test GitHub Actions build
        ↓
        Als het werkt: Cancel Appflow trial
        ↓
Toekomst: Alle updates via GitHub Actions (gratis!)
```

**Voordeel:** €0 kosten na trial  
**Nadeel:** 2-4 uur om GitHub Actions te setup

---

### Optie 2: Trial + Cancel + Opnieuw Trial bij Update

**Total kosten: €0 per update**

```
Launch: 
- Start trial → Build → Upload → Cancel (dag 13)

Update (3 maanden later):
- Maak NIEUW Ionic account met ander email
- Start nieuwe trial → Build → Upload → Cancel

Repeat voor elke update...
```

**Voordeel:** Altijd gratis  
**Nadeel:** Omslachtig, je hebt meerdere emails nodig

---

### Optie 3: Trial + MacinCloud Pay-As-You-Go

**Total kosten: ~€1-3 per update**

```
Launch:
- Start Appflow trial → Build → Upload → Cancel

Updates:
- Huur MacinCloud voor €1/uur
- Build duurt ~30 min = €0.50
- Upload + done
```

**Voordeel:** Goedkoop, flexibel  
**Nadeel:** Je moet MacinCloud leren gebruiken

---

### Optie 4: Trial + Freelancer per Update

**Total kosten: €25-50 per update**

```
Launch:
- Start Appflow trial → Build → Upload → Cancel

Updates:
- Fiverr: betaal developer €25 voor build + upload
- Wacht 1-2 dagen
- Done
```

**Voordeel:** Iemand anders doet het  
**Nadeel:** Kosten per update

---

### Optie 5: Blijf Betalen voor Appflow

**Total kosten: €29/maand = €348/jaar**

```
Maand 1: Start trial (gratis)
        ↓
        Build + upload wanneer je wilt
        ↓
        Automatische builds bij elke push
        ↓
Maand 2+: €29/maand
        ↓
Onbeperkt builds
```

**Voordeel:** Simpel, geautomatiseerd, altijd werkt  
**Nadeel:** €348/jaar

---

## 🎯 Wat Ik Zou Doen (Beste Strategie)

### Fase 1: Launch (Week 1-2) - GRATIS

```bash
# Dag 1-3: Start Appflow trial
ionic login
ionic link --create
# Setup iOS certificates in dashboard

# Dag 4-5: Eerste build
# Dashboard → Build → iOS
# Download .ipa

# Dag 6: Upload naar App Store
# Via Transporter of Appflow

# Dag 7: App submitted for review ✅
```

### Fase 2: Setup Gratis Alternatief (Week 2) - GRATIS

```bash
# Tijdens trial period (nog gratis):
# Setup GitHub Actions (zie IOS_BUILD_WITHOUT_MAC.md)

# Test of GitHub Actions werkt
git push origin main
# Check of build succeeds

# Als werkt: je bent klaar!
```

### Fase 3: Cancel Trial (Dag 13) - €0

```bash
# Dag 13: Cancel Appflow subscription
# Dashboard → Settings → Billing → Cancel

# Je hebt nu:
✅ App in App Store
✅ GitHub Actions setup voor updates
✅ €0 kosten (behalve €99 Apple)
```

### Fase 4: Updates (Toekomst) - GRATIS

```bash
# Elke update:
git add .
git commit -m "Update v1.1.0"
git push origin main

# GitHub Actions build automatisch
# Download .ipa van GitHub
# Upload naar App Store

# €0 kosten! 🎉
```

---

## ⏰ Timeline Voorbeeld

### Week 1: Launch Prep
- **Maandag:** Start Appflow trial, setup account
- **Dinsdag:** Link app, auto-generate iOS certificates
- **Woensdag:** Eerste build (test)
- **Donderdag:** Fix eventuele errors, nieuwe build
- **Vrijdag:** Download .ipa, upload naar App Store Connect

### Week 2: Backup Setup
- **Maandag:** Setup GitHub Actions workflow
- **Dinsdag:** Test GitHub Actions build
- **Woensdag:** Verify dat het werkt
- **Donderdag:** Documenteer proces
- **Vrijdag:** Cancel Appflow trial ✅

### Maand 2+: Updates
- **Elke update:** Git push → GitHub Actions → Gratis! ✅

---

## 🤔 Maar Hoe Upload Ik Zonder Appflow?

### Optie A: Leen een Mac voor 10 minuten

```
1. Leen Mac van vriend/bibliotheek/Apple Store
2. Download Transporter app (gratis)
3. Login met Apple ID
4. Sleep .ipa bestand
5. Klik "Deliver"
6. Done! (5 minuten)
```

### Optie B: Betaal Freelancer €10 om te uploaden

```
Fiverr: "Upload .ipa to App Store Connect"
Kosten: €5-15
Tijd: 1 uur
```

### Optie C: GitHub Actions kan ook uploaden!

```yaml
# In .github/workflows/ios-build.yml (al in je project!)
# Uncomment laatste step:

- name: Upload to App Store
  uses: apple-actions/upload-testflight-build@v1
  with:
    app-path: ios/App/build/App.ipa
    issuer-id: ${{ secrets.APPSTORE_ISSUER_ID }}
    # etc...
```

**Dit upload automatisch!** Geen Mac nodig.

---

## 💡 Pro Tips

### Tip 1: Test Appflow tijdens trial

Gebruik de 14 dagen om:
- ✅ Meerdere test builds maken
- ✅ Leer hoe het werkt
- ✅ Test alle features
- ✅ Setup GitHub Actions TIJDENS trial
- ✅ Verify dat GitHub Actions werkt VOOR je cancelt

### Tip 2: Download ALLE builds tijdens trial

```
# Download elke succesvolle build
# Bewaar ze lokaal

Reden: Als GitHub Actions niet werkt,
heb je nog backup builds!
```

### Tip 3: Documenteer je proces

```
# Maak notities tijdens trial:
- Welke settings gebruikte je?
- Welke certificaten?
- Welke errors kwamen voor?

Dit helpt later!
```

### Tip 4: Maak account met wegwerp email

```
# Voor trial kun je gebruiken:
- Gmail + alias: yourname+trial@gmail.com
- Temp-mail.org
- 10minutemail.com

Zodat je later evt. opnieuw trial kunt starten
```

---

## ✅ Checklist - Trial Maximaal Benutten

**Tijdens 14-dagen trial:**

- [ ] Dag 1-2: Account setup, link app
- [ ] Dag 3: Auto-generate iOS certificates
- [ ] Dag 4: Eerste test build
- [ ] Dag 5: Fix errors, nieuwe build
- [ ] Dag 6: Download .ipa, test op device
- [ ] Dag 7: Upload naar App Store Connect
- [ ] Dag 8: Submit for review
- [ ] Dag 9: Start GitHub Actions setup
- [ ] Dag 10: Test GitHub Actions build
- [ ] Dag 11: Verify GitHub Actions werkt
- [ ] Dag 12: Download backup builds
- [ ] Dag 13: **Cancel subscription** ← BELANGRIJK!
- [ ] Dag 14: Trial ends, €0 betaald ✅

---

## 📊 Kosten Vergelijking (3 jaar)

| Strategie | Jaar 1 | Jaar 2 | Jaar 3 | Total |
|-----------|--------|--------|--------|-------|
| **Trial + GitHub Actions** | €99 | €99 | €99 | **€297** ⭐ |
| **Trial + MacinCloud/update** | €99 | €111 | €111 | **€321** |
| **Blijf Appflow betalen** | €447 | €447 | €447 | **€1,341** |
| **Trial + Freelancer/update** | €174 | €174 | €174 | **€522** |

*(Apple €99/jaar, Appflow €348/jaar, 4 updates/jaar à €3 of €25)*

**Verschil: €1,044 bespaard met GitHub Actions!** 🎉

---

## 🎯 Mijn Definitieve Advies

### Als je technisch bent:

```
✅ Gebruik Appflow trial (14 dagen gratis)
✅ Setup GitHub Actions TIJDENS trial
✅ Cancel voor dag 14
✅ €0 kosten forever
```

### Als je niet technisch bent:

```
✅ Gebruik Appflow trial (14 dagen gratis)
✅ Upload eerste versie
✅ Cancel trial
✅ Voor updates: Betaal freelancer €25 per keer
   (4x per jaar = €100/jaar)
✅ Total: €199/jaar (veel goedkoper dan €447!)
```

### Als je budget hebt en gemak wilt:

```
✅ Blijf Appflow betalen (€29/maand)
✅ Onbeperkt builds
✅ Alles automatisch
✅ Geen gedoe
```

---

## ❓ Veelgestelde Vragen

### Kan ik de trial echt gratis gebruiken?

**JA!** Als je cancelt voor dag 14, betaal je €0.

### Moet ik creditcard opgeven?

**JA**, maar wordt niet afgeschreven tijdens trial.

### Kan ik later opnieuw een trial starten?

**Officieel:** Nee, 1x per bedrijf  
**Workaround:** Nieuw account met ander email

### Werkt GitHub Actions echt gratis?

**JA!** 2000 minuten/maand gratis. Een iOS build = ~15 minuten.
= 133 builds/maand gratis!

### Is GitHub Actions moeilijk?

**Setup:** 2-4 uur eerste keer (met guide)  
**Daarna:** Super simpel, gewoon git push

### Moet ik kiezen tussen Appflow of GitHub Actions?

**NEE!** Gebruik Appflow trial → test → setup GitHub Actions → cancel trial.
Best of both worlds!

---

## 🚀 Start Nu!

### Optie 1: Trial Only (Simpelst)

```bash
# 1. Start trial
npm install -g @ionic/cli
ionic login

# 2. Volg IONIC_QUICK_START.md

# 3. Cancel op dag 13
```

### Optie 2: Trial + GitHub Actions (Slimst)

```bash
# 1. Start trial + build (week 1)
# Volg IONIC_QUICK_START.md

# 2. Setup GitHub Actions (week 2)
# Volg IOS_BUILD_WITHOUT_MAC.md → Section 3

# 3. Cancel trial, gebruik GitHub Actions
```

---

## 📞 Samenvatting

**Vraag:** Heb ik Appflow eenmalig nodig?  
**Antwoord:** JA! Gebruik de gratis trial, cancel daarna.

**Beste strategie:**
1. 14-dagen trial (gratis) ✅
2. Build + upload eerste versie ✅
3. Setup GitHub Actions TIJDENS trial ✅
4. Cancel voor dag 14 ✅
5. Updates via GitHub Actions (gratis forever) ✅

**Total kosten: €0** (behalve €99 Apple Developer) 🎉

---

**Klaar om te starten?** Begin met `IONIC_QUICK_START.md` → 15 minuten! 🚀
