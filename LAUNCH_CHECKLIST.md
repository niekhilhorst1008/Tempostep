# ✅ TempoStep iOS Launch Checklist

**Print deze lijst uit of houd hem open terwijl je werkt!**

---

## 📅 DAG 1-3: Setup & Accounts

### Accounts & Tools
- [ ] Node.js geïnstalleerd (`node --version`)
- [ ] Git geïnstalleerd (`git --version`)
- [ ] GitHub account aangemaakt
- [ ] Apple Developer Account ($99/jaar) - **VERPLICHT**
- [ ] Apple Developer betaling verwerkt
- [ ] Ionic CLI geïnstalleerd (`npm install -g @ionic/cli`)
- [ ] Ionic Appflow account aangemaakt (14-dagen trial)
- [ ] Creditcard toegevoegd aan Appflow
- [ ] **REMINDER GEZET voor dag 13 om trial te cancellen!** 🚨

### Code Repository
- [ ] GitHub repository aangemaakt (`tempostep-app`)
- [ ] Repository op "Private" gezet
- [ ] Code naar GitHub gepushed
- [ ] Verificatie: Code zichtbaar op github.com

### Ionic Appflow Link
- [ ] `ionic login` succesvol
- [ ] `ionic link --create` uitgevoerd
- [ ] App "TempoStep" aangemaakt in Appflow
- [ ] App ID genoteerd: ________________
- [ ] Verificatie: App zichtbaar op dashboard.ionicframework.com

---

## 📅 DAG 4-7: Build & Upload

### iOS Certificaten
- [ ] Apple Developer Team ID gevonden (developer.apple.com/account)
- [ ] Team ID genoteerd: ________________
- [ ] Appflow Dashboard → Signing Certificates → iOS
- [ ] "Auto-generate Credentials" gebruikt
- [ ] Apple ID + password ingevoerd
- [ ] Team ID ingevoerd
- [ ] Wachten op certificaten (2-5 min) ⏳
- [ ] ✅ Certificaten succesvol aangemaakt

### Eerste Build
- [ ] Appflow Dashboard → Builds → New Build
- [ ] Platform: iOS geselecteerd
- [ ] Build Type: App Store geselecteerd
- [ ] Certificate: Automatisch geselecteerd
- [ ] Build gestart
- [ ] Wachten op build (5-15 min) ☕
- [ ] ✅ Build succesvol (groen)
- [ ] .ipa bestand gedownload
- [ ] .ipa file size check (20-50 MB)
- [ ] .ipa veilig opgeslagen

### Upload naar Apple
- [ ] .ipa geüpload via Transporter (Mac)
  OF
- [ ] .ipa geüpload via Appflow "Deploy to Store"
  OF  
- [ ] .ipa gegeven aan freelancer om te uploaden
- [ ] Upload succesvol bevestigd
- [ ] Build verschijnt in App Store Connect (wacht 10-15 min)

---

## 📅 DAG 7-10: App Store Connect Setup

### App Aanmaken
- [ ] Ingelogd op appstoreconnect.apple.com
- [ ] My Apps → + → New App
- [ ] Platform: iOS
- [ ] Name: TempoStep
- [ ] Primary Language: Nederlands/English
- [ ] Bundle ID: com.tempostep.app
- [ ] SKU: TEMPOSTEP001 (of eigen keuze)
- [ ] User Access: Full Access
- [ ] App aangemaakt ✅

### Privacy Policy
- [ ] Privacy Policy gemaakt (via generator of template)
- [ ] Privacy Policy gehost (website/GitHub Pages)
- [ ] Privacy Policy URL: ________________________________
- [ ] URL ingevuld in App Store Connect

### App Information
- [ ] Category: Music ingesteld
- [ ] Pricing: Free (of prijs gekozen)
- [ ] Availability: All countries
- [ ] Support URL ingevuld: ________________________________
- [ ] Marketing URL (optioneel): ________________________________

### Screenshots
- [ ] iPhone 6.7" screenshots (1290 x 2796) - minimaal 3
  - [ ] Screenshot 1
  - [ ] Screenshot 2
  - [ ] Screenshot 3
- [ ] Screenshots uploaded naar App Store Connect
- [ ] Screenshots zien er goed uit in preview

### App Description
- [ ] Description geschreven (zie SETUP_NOW.md voor template)
- [ ] Description in App Store Connect geplakt
- [ ] Promotional text ingevuld (optioneel)
- [ ] Keywords ingevuld (max 100 chars)

### Build Linken
- [ ] Build verschenen in App Store Connect
- [ ] App Store tab → Build sectie → + (plus)
- [ ] Build geselecteerd
- [ ] Build gelinkt ✅

### App Review Info
- [ ] Contact info ingevuld:
  - [ ] First Name
  - [ ] Last Name
  - [ ] Phone Number
  - [ ] Email
- [ ] Notes for review ingevuld (optioneel)
- [ ] Version release optie gekozen (auto/manual)
- [ ] Alles opgeslagen (Save button)

---

## 📅 DAG 10: Submission

### Final Checks
- [ ] Screenshots ✅
- [ ] Description ✅
- [ ] Keywords ✅
- [ ] Support URL ✅
- [ ] Privacy Policy URL ✅
- [ ] Build linked ✅
- [ ] App Review Info ✅
- [ ] Alles ziet er goed uit!

### Submit!
- [ ] "Add for Review" button geklikt
- [ ] Export Compliance vraag beantwoord
- [ ] "Submit" geklikt
- [ ] Status: "Waiting for Review" ✅
- [ ] 🎉 **SUBMITTED!** 🎉

### Notificaties Setup
- [ ] Email notificaties ingeschakeld in App Store Connect
- [ ] App Store Connect app gedownload op iPhone (optioneel)
- [ ] Dagelijks status checken

---

## 📅 DAG 11-12: GitHub Actions Setup (Tijdens Review)

### GitHub Actions Config
- [ ] `.github/workflows/ios-build.yml` bestand bestaat (al in project!)
- [ ] IOS_BUILD_WITHOUT_MAC.md gelezen (sectie 3)
- [ ] GitHub repository → Settings → Secrets → Actions

### Secrets Configureren
Dit is optioneel maar zorgt dat je geen Appflow meer nodig hebt!

- [ ] `IOS_CERTIFICATE_BASE64` secret aangemaakt
- [ ] `IOS_CERTIFICATE_PASSWORD` secret aangemaakt  
- [ ] `APPSTORE_ISSUER_ID` secret aangemaakt
- [ ] `APPSTORE_KEY_ID` secret aangemaakt
- [ ] `APPSTORE_PRIVATE_KEY` secret aangemaakt

### Test GitHub Actions
- [ ] Test commit gemaakt
- [ ] Code gepushed naar GitHub
- [ ] GitHub → Actions tab gecheckt
- [ ] Workflow started
- [ ] Workflow succesvol (groen) ✅
- [ ] Build artifacts gedownload (optioneel)

---

## 📅 DAG 13: Cancel Appflow Trial! 🚨

**BELANGRIJK - Doe dit VOOR dag 14!**

- [ ] **REMINDER AFGEGAAN** 🔔
- [ ] Ingelogd op dashboard.ionicframework.com
- [ ] Settings → Billing
- [ ] Cancel Subscription
- [ ] Bevestigd
- [ ] Bevestigingsmail ontvangen
- [ ] ✅ €0 betaald! Je bent gratis!

---

## 📅 DAG 14-21: Wachten op Review

### Monitor Status
- [ ] Dagelijks status checken in App Store Connect
- [ ] Email inbox checken voor Apple berichten

### Mogelijke Statussen
- [ ] ⏳ "Waiting for Review" (1-3 dagen normaal)
- [ ] 🔍 "In Review" (paar uur tot 1 dag)
- [ ] ✅ "Ready for Sale" = **LIVE!** 🎉
- [ ] ❌ "Rejected" = Fix issues en resubmit

### Bij Rejection
- [ ] Rejection reason gelezen in App Store Connect
- [ ] Issues gefixt in code
- [ ] Nieuwe build gemaakt (via GitHub Actions!)
- [ ] Nieuwe build uploaded
- [ ] Resubmitted for review

### Bij Approval! 🎉
- [ ] ✅ Status: "Ready for Sale"
- [ ] App Store link ontvangen
- [ ] App gezocht in App Store
- [ ] **APP IS LIVE!** 🚀🎉
- [ ] Screenshot gemaakt voor social media
- [ ] Vrienden/familie gedeeld
- [ ] Social media post gemaakt

---

## 🎉 POST-LAUNCH

### Marketing
- [ ] App Store link: ________________________________
- [ ] Social media posts:
  - [ ] Twitter/X
  - [ ] LinkedIn
  - [ ] Facebook
  - [ ] Instagram
  - [ ] Reddit (r/iOS, r/WeAreTheMusicMakers)
- [ ] Website updated met App Store badge
- [ ] Email signature updated
- [ ] Press release (optioneel)
- [ ] ProductHunt post (optioneel)

### Monitor
- [ ] App Store Connect analytics bekijken
- [ ] Download numbers checken
- [ ] Reviews monitoren
- [ ] Crash reports checken (als die zijn)
- [ ] User feedback verzamelen

### Updates Voorbereiden
- [ ] GitHub Actions werkt voor updates ✅
- [ ] Update roadmap gemaakt
- [ ] Feature requests lijst
- [ ] Bug fixes lijst

---

## 💰 Kosten Overzicht

### Betaald
- [ ] Apple Developer: €99/jaar ✅

### NIET Betaald (Gratis!)
- [ ] Ionic Appflow: €0 (trial canceled) ✅
- [ ] GitHub Actions: €0 ✅
- [ ] GitHub Repository: €0 ✅
- [ ] Hosting (PWA): €0 ✅

**Total eerste jaar: €99** 🎉

---

## 📊 Belangrijke Info

### URLs
- **GitHub Repo:** https://github.com/YOUR_USERNAME/tempostep-app
- **Appflow Dashboard:** https://dashboard.ionicframework.com
- **App Store Connect:** https://appstoreconnect.apple.com
- **Apple Developer:** https://developer.apple.com/account
- **App Store Link (na launch):** ________________________________

### IDs & Keys
- **App ID (Appflow):** ________________
- **Bundle ID:** com.tempostep.app
- **SKU:** ________________
- **Apple Team ID:** ________________

### Support Contacts
- **Ionic Forum:** https://forum.ionicframework.com
- **Apple Support:** https://developer.apple.com/support
- **GitHub Actions:** https://docs.github.com/actions

---

## 🆘 Troubleshooting Checklist

### Build Failed
- [ ] Logs gecheckt in Appflow
- [ ] Error messages gevonden
- [ ] Fix toegepast in code
- [ ] Code gepushed naar GitHub
- [ ] Nieuwe build gestart

### Certificaten Issues
- [ ] Apple Developer betaling verified
- [ ] Team ID correct gecontroleerd
- [ ] Apple ID + password correct
- [ ] 2FA app-specific password gebruikt (indien nodig)
- [ ] Certificaten opnieuw gegenereerd

### App Rejected
- [ ] Rejection reason gelezen
- [ ] Apple guidelines gecheckt
- [ ] Issues gefixt
- [ ] Screenshots updated (indien nodig)
- [ ] Description updated (indien nodig)
- [ ] Build updated
- [ ] Resubmitted

---

## 🎯 Success Criteria

Je bent succesvol als:
- ✅ App is "Ready for Sale" in App Store
- ✅ App verschijnt in App Store Search
- ✅ Je kunt app downloaden op iPhone
- ✅ App werkt perfect na install
- ✅ GitHub Actions werkt voor updates
- ✅ Total kosten: €99 (geen Appflow)

---

## 📞 Need Help?

**Stuck? Check these guides:**
- `SETUP_NOW.md` - Stap-voor-stap walkthrough
- `IONIC_APPFLOW_SETUP.md` - Gedetailleerde Appflow guide
- `IOS_BUILD_WITHOUT_MAC.md` - Alle opties zonder Mac
- `IONIC_APPFLOW_STRATEGY.md` - Kosten optimalisatie

**Online Support:**
- Ionic: https://ionic.io/support
- Apple: https://developer.apple.com/support
- Community: https://forum.ionicframework.com

---

## 🎉 Final Message

**Veel succes met je iOS launch!**

**Remember:**
- Cancel Appflow trial op dag 13! 🚨
- Use GitHub Actions voor gratis updates ✅
- Monitor reviews en feedback 📊
- Keep improving the app 🚀

**Je kunt dit! 💪🎵**

---

**Last updated:** Klaar voor launch!  
**Created for:** TempoStep iOS Launch  
**Good luck!** 🍀🚀
