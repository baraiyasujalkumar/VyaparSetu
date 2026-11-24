 let _toastId = 0;
    function showToast(type, title, msg, duration) {
      duration = duration || 3500;
      const icons = { success:'✅', error:'❌', info:'ℹ️', warning:'⚠️' };
      const id = 'toast-' + (++_toastId);
      const el = document.createElement('div');
      el.className = 'toast toast-' + type;
      el.id = id;
      el.innerHTML =
        '<span class="toast-icon">' + icons[type] + '</span>' +
        '<div class="toast-body">' +
          '<div class="toast-title">' + title + '</div>' +
          (msg ? '<div class="toast-msg">' + msg + '</div>' : '') +
        '</div>' +
        '<button class="toast-close" onclick="dismissToast(\'' + id + '\')">✕</button>' +
        '<div class="toast-progress" style="animation-duration:' + duration + 'ms"></div>';
      document.getElementById('toastContainer').appendChild(el);
      setTimeout(function(){ dismissToast(id); }, duration);
    }
    function dismissToast(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.classList.add('removing');
      setTimeout(function(){ if(el.parentNode) el.parentNode.removeChild(el); }, 260);
    }
    var toast = {
      success: function(t,m,d){ showToast('success',t,m,d); },
      error:   function(t,m,d){ showToast('error',t,m,d); },
      info:    function(t,m,d){ showToast('info',t,m,d); },
      warning: function(t,m,d){ showToast('warning',t,m,d); }
    };

    // ============================================================
    // CONFIRM DIALOG
    // ============================================================
    var _confirmResolve = null;
    function showConfirm(msg, title, icon, okLabel) {
      title   = title   || 'Are you sure?';
      icon    = icon    || '⚠️';
      okLabel = okLabel || 'Confirm';
      document.getElementById('confirmIcon').textContent  = icon;
      document.getElementById('confirmTitle').textContent = title;
      document.getElementById('confirmMsg').textContent   = msg;
      document.getElementById('confirmOkBtn').textContent = okLabel;
      document.getElementById('confirmOverlay').classList.remove('hidden');
      return new Promise(function(res){ _confirmResolve = res; });
    }
    function resolveConfirm(val) {
      document.getElementById('confirmOverlay').classList.add('hidden');
      if (_confirmResolve) { _confirmResolve(val); _confirmResolve = null; }
    }
    document.getElementById('confirmOverlay').addEventListener('click', function(e){ if(e.target===this) resolveConfirm(false); });

    // ============================================================
    // STATE
    // ============================================================
    var SK = { BILLS:'vyapar_bills', CUSTOMERS:'vyapar_customers', HELPERS:'vyapar_helpers', ATTENDANCE:'vyapar_attendance', SETTINGS:'vyapar_settings', BUSINESS:'vyapar_business' };

    // Always read fresh from localStorage — single source of truth
    function loadAllData() {
      bills      = JSON.parse(localStorage.getItem(SK.BILLS)      || '[]');
      customers  = JSON.parse(localStorage.getItem(SK.CUSTOMERS)  || '[]');
      helpers    = JSON.parse(localStorage.getItem(SK.HELPERS)    || '[]');
      attendance = JSON.parse(localStorage.getItem(SK.ATTENDANCE) || '{}');
      appSettings= JSON.parse(localStorage.getItem(SK.SETTINGS)   || '{"language":"en","roundBills":true}');
      businessName = JSON.parse(localStorage.getItem(SK.BUSINESS) || 'null') || 'Your Business';
    }

    var bills      = JSON.parse(localStorage.getItem(SK.BILLS)      || '[]');
    var customers  = JSON.parse(localStorage.getItem(SK.CUSTOMERS)  || '[]');
    var helpers    = JSON.parse(localStorage.getItem(SK.HELPERS)    || '[]');
    var attendance = JSON.parse(localStorage.getItem(SK.ATTENDANCE) || '{}');
    var appSettings= JSON.parse(localStorage.getItem(SK.SETTINGS)   || '{"language":"en","roundBills":true}');
    var businessName = JSON.parse(localStorage.getItem(SK.BUSINESS) || 'null') || 'Your Business';
    var currentLanguage = appSettings.language || 'en';

    // ============================================================
    // I18N (condensed)
    // ============================================================
    var I18N = {
      en:{
        login_title:'Smart Control for Your Daily Vyapar',
        login_subtitle:'Designed for kirana, salons, tuition classes, repair shops and more. Simple, fast and in your language.',
        label_business_name:'Business / Shop Name', label_pin:'4-digit PIN', pin_hint:'Demo PIN is 1234',
        label_language:'Language', btn_login:'Login',
        footer_note:'No installation. Works on any phone / computer.', footer_region:'Built for India 🇮🇳',
        side_pill:'Instant setup, under 30 seconds', side_hero_title:'Replace messy registers with one clean smart panel.',
        side_p1:'Make bills and share on WhatsApp.', side_p2:'Track helper attendance & salary on-time.', side_p3:"See today's sales, dues and cash in one place.",
        side_today:"Today's billed amount", side_dues:'Pending customer dues',
        sidebar_tagline:'Everyday control, one tap away',
        nav_dashboard:'Dashboard', nav_billing:'Billing', nav_customers:'Customers', nav_helpers:'Helpers', nav_reports:'Reports', nav_settings:'Settings',
        btn_logout:'Logout', version_label:'v0.9 Prototype Preview', filter_today:'Today', btn_quick_bill:'Quick Bill',
        dash_today_overview:"Today's business overview", dash_today_hint:'Live view of bills, cash and helper status.',
        dash_quick_actions:'Quick actions', quick_make_bill:'Make new bill', quick_mark_attendance:'Mark helper present', quick_due_reminder:'Due reminder list',
        dash_recent_bills:'Recent bills', dash_recent_hint:'Last few bills you made today.',
        th_time:'Time', th_customer:'Customer', th_amount:'Amount', th_status:'Status',
        empty_no_bills:'No bills yet. Your first bill will appear here.',
        tip_share_whatsapp:'Tip: After making a bill, tap on it to copy details and share on WhatsApp.',
        stat_total_sales:'Total billed today', stat_cash_in_hand:'Expected cash in hand', stat_helper:'Helper attendance',
        billing_title:'Create quick bill', billing_subtitle:'Capture essentials only. More speed, less typing.', billing_list_title:'All bills today',
        customers_title:'Customer due tracker', customers_subtitle:'Simple udhar list. Easy to call or message.', customers_list_title:'Due list',
        helpers_title:'Helper & staff', helpers_subtitle:'One simple view to track attendance and salary.',
        helpers_attendance_title:"Mark today's attendance", helpers_attendance_subtitle:'Tap on a date to toggle Present / Absent.',
        reports_title:'Simple summary', reports_subtitle:'High level view for your UI/UX presentation.',
        reports_card_bills:'Bills & revenue', reports_card_customers:'Customers on credit', reports_card_helpers:'Helper payout this month',
        note_localstorage:'All data is stored locally in the browser using localStorage. It will reset if you clear browser data.',
        note_frontend_only:'This prototype is frontend-only (HTML, CSS, JS in one file). In real product, backend & database will secure your data.',
        note_multi_device:'For multi-device sync (shop phone + owner phone), backend APIs & authenticated login can be added later.',
        reports_demo_title:'Prototype usage notes',
        settings_title:'Settings', settings_subtitle:'Control language, billing defaults and privacy.',
        settings_language_title:'App language', settings_language_subtitle:'Switch instantly between English and Hindi.',
        settings_round_title:'Round bill to nearest ₹1', settings_round_subtitle:'Helpful for cash only shops.',
        settings_darkmode_title:'Focus mode (low noise)', settings_darkmode_subtitle:'Dim dashboard extras during peak hours.',
        settings_security_title:'Security & session', settings_autolock_title:'Auto-lock after inactivity', settings_autolock_subtitle:'For now, click Logout to simulate.',
        settings_reset_title:'Reset all local data', settings_reset_subtitle:'Clear bills, customers and helpers from this browser.',
        btn_reset_all:'Reset', label_customer_name:'Customer name', label_customer_phone:'Phone (optional)',
        label_item_summary:'Items summary', label_total_amount:'Total amount (₹)', label_discount:'Discount (optional)',
        label_payment_mode:'Payment mode', label_bill_notes:'Quick note',
        pm_cash:'Cash', pm_upi:'UPI', pm_card:'Card', pm_due:'Due / Udhar',
        btn_clear:'Clear', btn_save_bill:'Save bill', btn_clear_bills:'Clear all',
        label_due_amount:'Due amount (₹)', label_due_note:'Note', btn_add_customer:'Add / Update entry', btn_clear_customers:'Clear',
        label_helper_name:'Helper name', label_helper_salary:'Monthly salary (₹)', btn_save_helper:'Save helper',
        th_phone:'Phone', th_action:'Action', th_helper:'Helper', th_salary:'Salary', th_present_days:'Present days', th_estimate:'Est. pay',
        legend_present:'Present', legend_absent:'Absent', legend_not_marked:'Not marked'
      },
      hi:{
        login_title:'आपके रोज़ाना व्यापार के लिए स्मार्ट कंट्रोल',
        login_subtitle:'किराना, सैलून, ट्यूशन, रिपेयर शॉप और छोटे व्यवसायों के लिए। आसान, तेज़ और आपकी भाषा में।',
        label_business_name:'दुकान / व्यवसाय का नाम', label_pin:'4 अंकों का पिन', pin_hint:'डेमो पिन 1234 है',
        label_language:'भाषा', btn_login:'लॉगिन',
        footer_note:'कोई इंस्टॉलेशन नहीं। किसी भी फोन या कंप्यूटर पर चलेगा।', footer_region:'भारत के लिए बनाया गया 🇮🇳',
        side_pill:'30 सेकंड में सेटअप', side_hero_title:'भरे हुए रजिस्टर हटाएँ, एक साफ स्मार्ट पैनल लगाएँ।',
        side_p1:'बिल बनाएं और व्हाट्सऐप पर शेयर करें।', side_p2:'हेल्पर की हाज़िरी और सैलरी समय पर ट्रैक करें।', side_p3:'आज की बिक्री, बकाया और कैश एक जगह देखें।',
        side_today:'आज का कुल बिल', side_dues:'पेंडिंग ग्राहक बकाया',
        sidebar_tagline:'रोज़ का कंट्रोल, बस एक टैप',
        nav_dashboard:'डैशबोर्ड', nav_billing:'बिलिंग', nav_customers:'ग्राहक', nav_helpers:'हेल्पर', nav_reports:'रिपोर्ट', nav_settings:'सेटिंग्स',
        btn_logout:'लॉगआउट', version_label:'v0.9 प्रोटोटाइप प्रीव्यू', filter_today:'आज', btn_quick_bill:'क्विक बिल',
        dash_today_overview:'आज का व्यापार सारांश', dash_today_hint:'बिल, कैश और हेल्पर की स्थिति एक नज़र में।',
        dash_quick_actions:'जल्दी करने वाले काम', quick_make_bill:'नया बिल बनाएं', quick_mark_attendance:'हेल्पर उपस्थित करें', quick_due_reminder:'बकाया सूची',
        dash_recent_bills:'ताज़ा बिल', dash_recent_hint:'आज के हाल ही में बने बिल।',
        th_time:'समय', th_customer:'ग्राहक', th_amount:'राशि', th_status:'स्थिति',
        empty_no_bills:'अभी तक कोई बिल नहीं। आपका पहला बिल यहाँ दिखेगा।',
        tip_share_whatsapp:'टिप: बिल सेव होने के बाद उस पर टैप कर के डिटेल कॉपी करें।',
        stat_total_sales:'आज की कुल बिक्री', stat_cash_in_hand:'उम्मीदित कैश', stat_helper:'हेल्पर हाज़िरी',
        billing_title:'क्विक बिल बनाएं', billing_subtitle:'सिर्फ ज़रूरी चीज़ें भरें। ज़्यादा स्पीड, कम टाइपिंग।', billing_list_title:'आज के सारे बिल',
        customers_title:'ग्राहक बकाया ट्रैकर', customers_subtitle:'सरल उधार लिस्ट। कॉल / मैसेज करना आसान।', customers_list_title:'बकाया सूची',
        helpers_title:'हेल्पर व स्टाफ', helpers_subtitle:'एक ही जगह हाज़िरी और महीने की तन्ख़्वाह का ट्रैक।',
        helpers_attendance_title:'आज की हाज़िरी मार्क करें', helpers_attendance_subtitle:'किसी भी तारीख़ पर टैप करें – Present / Absent बदलेगा।',
        reports_title:'सरल सारांश', reports_subtitle:'आपकी UI/UX प्रेज़ेंटेशन के लिए हाई लेवल व्यू।',
        reports_card_bills:'बिल और रेवेन्यू', reports_card_customers:'उधार पर ग्राहक', reports_card_helpers:'इस महीने की हेल्पर पेमेंट',
        note_localstorage:'सारा डेटा ब्राउज़र के localStorage में सेव है। ब्राउज़र डेटा क्लियर करने पर ये भी हट जाएगा।',
        note_frontend_only:'ये सिर्फ फ्रंटएंड प्रोटोटाइप है (एक ही फाइल में HTML, CSS, JS)।',
        note_multi_device:'दुकान के फोन + मालिक के फोन पर एक साथ चलाने के लिए बाद में बैकएंड API जोड़ा जा सकता है।',
        reports_demo_title:'प्रोटोटाइप नोट्स',
        settings_title:'सेटिंग्स', settings_subtitle:'भाषा, बिलिंग डिफ़ॉल्ट और प्राइवेसी कंट्रोल।',
        settings_language_title:'ऐप भाषा', settings_language_subtitle:'तुरंत English / Hindi में बदलें।',
        settings_round_title:'बिल को नज़दीकी ₹1 पर राउंड करें', settings_round_subtitle:'सिर्फ कैश लेने वाली दुकानों के लिए मददगार।',
        settings_darkmode_title:'फोकस मोड (कम शोर)', settings_darkmode_subtitle:'पीक टाइम में डैशबोर्ड की एक्स्ट्रा चीज़ें हल्की करें।',
        settings_security_title:'सिक्योरिटी और सेशन', settings_autolock_title:'कुछ समय बाद ऑटो-लॉक', settings_autolock_subtitle:'अभी के लिए Logout दबाकर डेमो चलाएँ।',
        settings_reset_title:'सारा लोकल डेटा रीसेट करें', settings_reset_subtitle:'इस ब्राउज़र से सारे बिल, ग्राहक और हेल्पर हट जाएँगे।',
        btn_reset_all:'रीसेट', label_customer_name:'ग्राहक का नाम', label_customer_phone:'मोबाइल (अप्शनल)',
        label_item_summary:'आइटम सारांश', label_total_amount:'कुल राशि (₹)', label_discount:'छूट (अप्शनल)',
        label_payment_mode:'पेमेंट मोड', label_bill_notes:'क्विक नोट',
        pm_cash:'कैश', pm_upi:'UPI', pm_card:'कार्ड', pm_due:'उधार',
        btn_clear:'क्लियर', btn_save_bill:'बिल सेव करें', btn_clear_bills:'सभी हटाएँ',
        label_due_amount:'बकाया राशि (₹)', label_due_note:'नोट', btn_add_customer:'एंट्री जोड़ें / अपडेट करें', btn_clear_customers:'क्लियर',
        label_helper_name:'हेल्पर का नाम', label_helper_salary:'मासिक सैलरी (₹)', btn_save_helper:'हेल्पर सेव करें',
        th_phone:'फोन', th_action:'एक्शन', th_helper:'हेल्पर', th_salary:'सैलरी', th_present_days:'प्रेज़ेंट दिन', th_estimate:'अनुमानित पे',
        legend_present:'प्रेज़ेंट', legend_absent:'एब्सेंट', legend_not_marked:'मार्क नहीं'
      }
    };

    function applyTranslations() {
      var dict = I18N[currentLanguage];
      document.querySelectorAll('[data-i18n]').forEach(function(el){
        var k = el.getAttribute('data-i18n');
        if (dict[k]) el.textContent = dict[k];
      });
      document.querySelectorAll('option[data-i18n]').forEach(function(opt){
        var k = opt.getAttribute('data-i18n');
        if (dict[k]) opt.textContent = dict[k];
      });
    }

    function changeLanguage(lang) {
      currentLanguage = lang;
      appSettings.language = lang;
      localStorage.setItem(SK.SETTINGS, JSON.stringify(appSettings));
      document.getElementById('languageSelectLogin').value = lang;
      document.getElementById('languageSelectSettings').value = lang;
      applyTranslations();
      toast.success(lang==='hi' ? 'भाषा बदल गई' : 'Language updated', lang==='hi' ? 'हिन्दी में बदल दिया।' : 'Switched to English.');
    }

    // ============================================================
    // LOGIN / LOGOUT
    // ============================================================
    // ============================================================
    // AUTH TAB SWITCHER
    // ============================================================
    function switchAuthTab(tab) {
      var isSignIn = tab === 'signin';
      document.getElementById('loginForm').classList.toggle('hidden', !isSignIn);
      document.getElementById('signupForm').classList.toggle('hidden', isSignIn);

      var btnIn  = document.getElementById('tabSignIn');
      var btnUp  = document.getElementById('tabSignUp');

      if (isSignIn) {
        btnIn.style.cssText  = 'flex:1;padding:7px 0;border:none;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;box-shadow:0 4px 12px rgba(37,99,235,0.3)';
        btnUp.style.cssText  = 'flex:1;padding:7px 0;border:none;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;background:transparent;color:#6b7280';
      } else {
        btnUp.style.cssText  = 'flex:1;padding:7px 0;border:none;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;background:linear-gradient(135deg,#2563eb,#1d4ed8);color:#fff;box-shadow:0 4px 12px rgba(37,99,235,0.3)';
        btnIn.style.cssText  = 'flex:1;padding:7px 0;border:none;border-radius:9px;font-size:13px;font-weight:600;cursor:pointer;transition:all 0.2s;background:transparent;color:#6b7280';
        setTimeout(function(){ document.getElementById('signupShop').focus(); }, 100);
      }
    }

    // ============================================================
    // SIGN UP
    // ============================================================
    document.getElementById('signupForm').addEventListener('submit', function(e) {
      e.preventDefault();
      var shop    = document.getElementById('signupShop').value.trim();
      var owner   = document.getElementById('signupOwner').value.trim();
      var type    = document.getElementById('signupType').value;
      var phone   = document.getElementById('signupPhone').value.trim();
      var pin     = document.getElementById('signupPin').value.trim();
      var pinConf = document.getElementById('signupPinConfirm').value.trim();

      if (!shop || !owner || !pin) { toast.error('Missing fields', 'Shop name, owner name and PIN are required.'); return; }
      if (pin.length !== 4 || !/^\d{4}$/.test(pin)) { toast.error('Invalid PIN', 'PIN must be exactly 4 digits.'); return; }
      if (pin !== pinConf) {
        toast.error('PIN mismatch', 'Both PINs must match.');
        document.getElementById('signupPinConfirm').value = '';
        document.getElementById('signupPinConfirm').focus();
        return;
      }

      // Save account to localStorage
      var account = { shop: shop, owner: owner, type: type, phone: phone, pin: pin };
      localStorage.setItem('vyapar_account', JSON.stringify(account));

      // Pre-fill sign in form and switch tab
      document.getElementById('businessName').value = shop;
      businessName = shop;
      localStorage.setItem(SK.BUSINESS, JSON.stringify(businessName));

      toast.success('Account created! 🎉', shop + ' — welcome aboard!', 3000);
      setTimeout(function(){
        switchAuthTab('signin');
        document.getElementById('pin').focus();
      }, 800);
    });

    // ============================================================
    // SIGN IN
    // ============================================================
    document.getElementById('loginForm').addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('businessName').value.trim();
      var pin  = document.getElementById('pin').value.trim();

      // Check if a real account exists
      var account = null;
      try { account = JSON.parse(localStorage.getItem('vyapar_account') || 'null'); } catch(err){}

      if (account) {
        // Validate against stored account
        if (pin !== account.pin) {
          toast.error(currentLanguage==='hi' ? 'गलत पिन' : 'Wrong PIN', currentLanguage==='hi' ? 'आपका PIN गलत है।' : 'Incorrect PIN for this account.');
          document.getElementById('pin').value = '';
          document.getElementById('pin').focus();
          return;
        }
        businessName = account.shop;
      } else {
        // Demo mode — fallback PIN 1234
        if (pin !== '1234') {
          toast.error(currentLanguage==='hi' ? 'गलत पिन' : 'Wrong PIN', currentLanguage==='hi' ? 'डेमो पिन 1234 है।' : 'Demo PIN is 1234. Or Sign Up to create an account.');
          document.getElementById('pin').value = '';
          document.getElementById('pin').focus();
          return;
        }
        businessName = name || 'Your Business';
      }

      localStorage.setItem(SK.BUSINESS, JSON.stringify(businessName));
      enterApp();
    });

    function enterApp() {
      document.getElementById('loginShell').classList.add('hidden');
      document.getElementById('appShell').classList.remove('hidden');
      document.getElementById('sidebarBusinessName').textContent = businessName;
      document.getElementById('topAvatar').textContent = businessName.split(' ').map(function(w){return w[0];}).join('').slice(0,2).toUpperCase() || 'VS';

      // Show owner name under shop name if account exists
      var account = null;
      try { account = JSON.parse(localStorage.getItem('vyapar_account') || 'null'); } catch(err){}
      var ownerEl = document.getElementById('sidebarOwnerName');
      if (ownerEl) {
        if (account && account.owner) {
          ownerEl.textContent = '👤 ' + account.owner;
          ownerEl.style.display = 'block';
        } else {
          ownerEl.style.display = 'none';
        }
      }

      refreshUI();
      setTimeout(function(){
        var msg = account ? ('Hello, ' + account.owner + '! 👋') : businessName;
        toast.success(currentLanguage==='hi' ? 'स्वागत है!' : 'Welcome back!', msg, 2500);
      }, 300);
    }

    function logout() {
      document.getElementById('appShell').classList.add('hidden');
      document.getElementById('loginShell').classList.remove('hidden');
      document.getElementById('pin').value = '';
    }

    function quickBillFromTop() { switchView('billing'); document.getElementById('billCustomer').focus(); }

    // ============================================================
    // VIEW SWITCHING
    // ============================================================
    function switchView(view) {
      document.querySelectorAll('.nav-item').forEach(function(el){ el.classList.remove('active'); });
      var nav = document.querySelector('.nav-item[data-view="'+view+'"]');
      if (nav) nav.classList.add('active');
      document.querySelectorAll('.content').forEach(function(s){ s.classList.add('hidden'); });
      var target = document.getElementById('view_'+view);
      if (target) target.classList.remove('hidden');
      var hi = currentLanguage==='hi';
      var MAP = {
        dashboard: [hi?'डैशबोर्ड':'Dashboard', hi?'आज की दुकान की हलचल।':'Today at a glance.'],
        billing:   [hi?'बिलिंग':'Billing', hi?'क्विक बिल, व्हाट्सऐप के लिए तैयार।':'Quick bills, ready for WhatsApp.'],
        customers: [hi?'ग्राहक':'Customers', hi?'उधार और रिमाइंडर लिस्ट।':'Credit and reminder list.'],
        helpers:   [hi?'हेल्पर':'Helpers', hi?'हाज़िरी और सैलरी ट्रैकिंग।':'Attendance and salary tracking.'],
        reports:   [hi?'रिपोर्ट':'Reports', hi?'प्रेज़ेंटेशन के लिए सरल सारांश।':'Simple summary for presentation.'],
        settings:  [hi?'सेटिंग्स':'Settings', hi?'ऐप को अपने तरीके से सेट करें।':'Tune the app to your style.']
      };
      document.getElementById('pageTitle').textContent    = MAP[view][0];
      document.getElementById('pageSubtitle').textContent = MAP[view][1];
      if (view==='helpers') renderAttendanceGrid();
    }

    // ============================================================
    // BILLING
    // ============================================================
    document.getElementById('billForm').addEventListener('submit', function(e){
      e.preventDefault();
      var customer    = document.getElementById('billCustomer').value.trim();
      var phone       = document.getElementById('billPhone').value.trim();
      var items       = document.getElementById('billItems').value.trim();
      var amount      = parseFloat(document.getElementById('billAmount').value);
      var discount    = parseFloat(document.getElementById('billDiscount').value) || 0;
      var paymentMode = document.getElementById('billPaymentMode').value;
      var note        = document.getElementById('billNote').value.trim();
      if (!customer || isNaN(amount)) return;
      var finalAmount = amount - discount;
      if (appSettings.roundBills) finalAmount = Math.round(finalAmount);
      var now = new Date();
      var id  = 'B' + (bills.length+1).toString().padStart(3,'0');
      var bill = { id:id, customer:customer, phone:phone, items:items, amount:finalAmount, paymentMode:paymentMode, note:note, status:paymentMode==='due'?'unpaid':'paid', time:now.toTimeString().slice(0,5), createdAt:now.toISOString() };
      bills.unshift(bill);
      localStorage.setItem(SK.BILLS, JSON.stringify(bills));
      resetBillForm(true);
      refreshUI();
      toast.success(currentLanguage==='hi'?'बिल सेव हो गया':'Bill saved', customer+' — ₹'+finalAmount.toFixed(0)+' ('+paymentMode.toUpperCase()+')');
    });

    function resetBillForm(keepCustomer) {
      if (!keepCustomer) document.getElementById('billCustomer').value = '';
      ['billPhone','billItems','billAmount','billDiscount','billNote'].forEach(function(id){ document.getElementById(id).value=''; });
      document.getElementById('billPaymentMode').value = 'cash';
      document.getElementById('billIdBadge').textContent = '#NEW';
    }

    async function clearAllBills() {
      var ok = await showConfirm(
        currentLanguage==='hi' ? 'आज के सभी बिल हट जाएँगे। यह वापस नहीं होगा।' : 'All bills will be deleted. This cannot be undone.',
        currentLanguage==='hi' ? 'सभी बिल हटाएँ?' : 'Clear all bills?', '🗑️',
        currentLanguage==='hi' ? 'हाँ, हटाएँ' : 'Yes, clear'
      );
      if (!ok) return;
      bills = [];
      localStorage.setItem(SK.BILLS, JSON.stringify(bills));
      refreshUI();
      toast.info(currentLanguage==='hi'?'बिल हटाए गए':'Bills cleared', currentLanguage==='hi'?'सभी बिल डिलीट हो गए।':'All bills have been removed.');
    }

    function renderBills() {
      var allBody = document.getElementById('allBillsBody');
      allBody.innerHTML = '';
      if (!bills.length) { allBody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#9ca3af">No bills yet.</td></tr>'; }
      else {
        bills.forEach(function(b, i){
          var tr = document.createElement('tr');
          tr.style.cursor = 'pointer';
          tr.title = currentLanguage==='hi'?'डिटेल कॉपी करें':'Click to copy';
          tr.onclick = function(){ copyBillForShare(b); };
          tr.innerHTML = '<td>'+(i+1)+'</td><td>'+b.time+'</td><td>'+b.customer+'</td><td>₹'+b.amount.toFixed(0)+'</td><td><span class="pill-status '+(b.status==='paid'?'paid':'unpaid')+'">'+(b.status==='paid'?'Paid':'Due')+'</span></td>';
          allBody.appendChild(tr);
        });
      }
      var recentBody = document.getElementById('recentBillsBody');
      recentBody.innerHTML = '';
      var recent = bills.slice(0,5);
      if (!recent.length) { recentBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#9ca3af">No bills yet.</td></tr>'; }
      else {
        recent.forEach(function(b){
          var tr = document.createElement('tr');
          tr.style.cursor = 'pointer';
          tr.onclick = function(){ copyBillForShare(b); };
          tr.innerHTML = '<td>'+b.time+'</td><td>'+b.customer+'</td><td>₹'+b.amount.toFixed(0)+'</td><td><span class="pill-status '+(b.status==='paid'?'paid':'unpaid')+'">'+(b.status==='paid'?'Paid':'Due')+'</span></td>';
          recentBody.appendChild(tr);
        });
      }
    }

    function copyBillForShare(b) {
      var lines = ['Bill ID: '+b.id, 'Customer: '+b.customer];
      if (b.phone) lines.push('Phone: '+b.phone);
      lines.push('Amount: ₹'+b.amount.toFixed(0), 'Status: '+(b.status==='paid'?'Paid':'Due'));
      if (b.items) lines.push('Items: '+b.items);
      if (b.note)  lines.push('Note: '+b.note);
      lines.push('Time: '+b.time);
      var text = lines.join('\n');
      navigator.clipboard && navigator.clipboard.writeText(text)
        .then(function(){ toast.info(currentLanguage==='hi'?'कॉपी हो गया!':'Copied!', currentLanguage==='hi'?'व्हाट्सऐप में पेस्ट करें।':'Paste into WhatsApp.', 2500); })
        .catch(function(){ toast.warning('Copy failed', text.slice(0,60)+'…'); });
    }

    // ============================================================
    // CUSTOMERS
    // ============================================================
    document.getElementById('customerForm').addEventListener('submit', function(e){
      e.preventDefault();
      var name  = document.getElementById('custName').value.trim();
      var phone = document.getElementById('custPhone').value.trim();
      var due   = parseFloat(document.getElementById('custDue').value);
      var note  = document.getElementById('custNote').value.trim();
      if (!name || isNaN(due)) return;
      var idx = customers.findIndex(function(c){ return c.name.toLowerCase()===name.toLowerCase(); });
      var entry = {name:name,phone:phone,due:due,note:note};
      var isUpdate = idx>=0;
      if (isUpdate) customers[idx]=entry; else customers.push(entry);
      localStorage.setItem(SK.CUSTOMERS, JSON.stringify(customers));
      document.getElementById('customerForm').reset();
      refreshUI();
      toast.success(isUpdate?(currentLanguage==='hi'?'अपडेट हुआ':'Updated'):(currentLanguage==='hi'?'जोड़ा गया':'Added'), name+' — ₹'+due.toFixed(0)+' due');
    });

    async function clearCustomers() {
      var ok = await showConfirm(
        currentLanguage==='hi'?'सारी बकाया लिस्ट हट जाएगी।':'The entire due list will be deleted.',
        currentLanguage==='hi'?'सारे ग्राहक हटाएँ?':'Clear all customers?', '👥',
        currentLanguage==='hi'?'हाँ, हटाएँ':'Yes, clear'
      );
      if (!ok) return;
      customers = [];
      localStorage.removeItem(SK.CUSTOMERS);
      localStorage.setItem(SK.CUSTOMERS, JSON.stringify([]));
      customers = JSON.parse(localStorage.getItem(SK.CUSTOMERS) || '[]');
      refreshUI();
      toast.info(currentLanguage==='hi'?'लिस्ट क्लियर हुई':'Due list cleared');
    }

    function renderCustomers() {
      var body = document.getElementById('customersBody');
      body.innerHTML = '';
      if (!customers.length) { body.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#9ca3af">No customers yet.</td></tr>'; return; }
      customers.forEach(function(c){
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>'+c.name+'</td><td>'+(c.phone||'-')+'</td><td>₹'+c.due.toFixed(0)+'</td><td><button class="btn btn-outline" style="padding:3px 8px;font-size:10px" onclick="markCustomerDone(\''+c.name+'\')">Paid / Done</button></td>';
        body.appendChild(tr);
      });
    }

    function markCustomerDone(name) {
      customers = customers.filter(function(c){ return c.name!==name; });
      localStorage.setItem(SK.CUSTOMERS, JSON.stringify(customers));
      refreshUI();
      toast.success(currentLanguage==='hi'?'भुगतान दर्ज हुआ':'Marked as paid', name);
    }

    // ============================================================
    // HELPERS & ATTENDANCE
    // ============================================================
    var selectedHelperName = null; // which helper's attendance is shown

    document.getElementById('helperForm').addEventListener('submit', function(e){
      e.preventDefault();
      var name   = document.getElementById('helperName').value.trim();
      var salary = parseFloat(document.getElementById('helperSalary').value);
      if (!name || isNaN(salary)) return;
      var idx = helpers.findIndex(function(h){ return h.name.toLowerCase()===name.toLowerCase(); });
      var helper = {name:name,salary:salary};
      var isUpdate = idx>=0;
      if (isUpdate) helpers[idx]=helper; else helpers.push(helper);
      localStorage.setItem(SK.HELPERS, JSON.stringify(helpers));
      document.getElementById('helperForm').reset();
      // auto-select newly added helper
      if (!isUpdate) selectedHelperName = name;
      refreshUI();
      renderAttendanceGrid();
      toast.success(isUpdate?(currentLanguage==='hi'?'हेल्पर अपडेट हुआ':'Helper updated'):(currentLanguage==='hi'?'हेल्पर जोड़ा गया':'Helper added'), name+' — ₹'+salary.toFixed(0)+'/month');
    });

    function getCurrentMonthKey() {
      var d = new Date();
      return d.getFullYear()+'-'+(d.getMonth()+1).toString().padStart(2,'0');
    }

    // ---- Inline edit state ----
    var editingHelperIdx = null;

    function startEditHelper(idx) {
      editingHelperIdx = idx;
      renderHelpers();
    }

    function saveInlineEdit(idx) {
      var newName   = document.getElementById('inlineEditName').value.trim();
      var newSalary = parseFloat(document.getElementById('inlineEditSalary').value);
      if (!newName || isNaN(newSalary)) { toast.error('Invalid input','Name and salary are required.'); return; }
      var oldName = helpers[idx].name;
      // rename attendance keys if name changed
      if (oldName !== newName) {
        var monthKey = getCurrentMonthKey();
        var monthAtt = attendance[monthKey] || {};
        var daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();
        for (var d=1; d<=daysInMonth; d++) {
          var oldKey = d+'-'+oldName;
          if (monthAtt[oldKey]) { monthAtt[d+'-'+newName] = monthAtt[oldKey]; delete monthAtt[oldKey]; }
        }
        attendance[monthKey] = monthAtt;
        localStorage.setItem(SK.ATTENDANCE, JSON.stringify(attendance));
        if (selectedHelperName === oldName) selectedHelperName = newName;
      }
      helpers[idx] = {name:newName, salary:newSalary};
      localStorage.setItem(SK.HELPERS, JSON.stringify(helpers));
      editingHelperIdx = null;
      refreshUI();
      renderAttendanceGrid();
      toast.success(currentLanguage==='hi'?'हेल्पर अपडेट हुआ':'Helper updated', newName+' — ₹'+newSalary.toFixed(0)+'/month');
    }

    function cancelEdit() {
      editingHelperIdx = null;
      renderHelpers();
    }

    async function deleteHelper(idx) {
      var h = helpers[idx];
      var ok = await showConfirm(
        (currentLanguage==='hi'?'हेल्पर ':'"')+h.name+(currentLanguage==='hi'?'" को हटाएँ? उनकी हाज़िरी भी हट जाएगी।':'" will be removed along with their attendance data.'),
        currentLanguage==='hi'?'हेल्पर हटाएँ?':'Delete helper?', '🗑️',
        currentLanguage==='hi'?'हाँ, हटाएँ':'Yes, delete'
      );
      if (!ok) return;
      // remove their attendance
      var monthKey = getCurrentMonthKey();
      var monthAtt = attendance[monthKey] || {};
      var daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();
      for (var d=1; d<=daysInMonth; d++) { delete monthAtt[d+'-'+h.name]; }
      attendance[monthKey] = monthAtt;
      localStorage.setItem(SK.ATTENDANCE, JSON.stringify(attendance));
      if (selectedHelperName === h.name) selectedHelperName = helpers.length > 1 ? helpers[idx===0?1:0].name : null;
      helpers.splice(idx, 1);
      localStorage.setItem(SK.HELPERS, JSON.stringify(helpers));
      editingHelperIdx = null;
      refreshUI();
      renderAttendanceGrid();
      toast.warning(currentLanguage==='hi'?'हेल्पर हटाया गया':'Helper deleted', h.name);
    }

    function selectHelperForAttendance(name) {
      selectedHelperName = name;
      renderHelpers();
      renderAttendanceGrid();
    }

    function renderHelpers() {
      var body = document.getElementById('helpersBody');
      body.innerHTML = '';
      if (!helpers.length) { body.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#9ca3af">No helpers yet.</td></tr>'; return; }
      var monthKey = getCurrentMonthKey();
      var monthAtt = attendance[monthKey] || {};
      var daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();

      // Ensure a helper is always selected
      if (!selectedHelperName || !helpers.find(function(h){return h.name===selectedHelperName;})) {
        selectedHelperName = helpers[0].name;
      }

      helpers.forEach(function(h, idx){
        var presentDays = 0;
        for (var d=1;d<=daysInMonth;d++) { if (monthAtt[d+'-'+h.name]==='P') presentDays++; }
        var estimated = (presentDays/daysInMonth)*(h.salary||0);
        var isSelected = h.name === selectedHelperName;
        var isEditing  = editingHelperIdx === idx;

        var tr = document.createElement('tr');
        if (isSelected && !isEditing) tr.style.cssText = 'background:#eff6ff;';

        if (isEditing) {
          tr.className = 'helper-edit-row';
          tr.innerHTML =
            '<td colspan="5" style="padding:10px 8px">' +
              '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
                '<input id="inlineEditName"   value="'+h.name+'"   placeholder="Helper name"   style="width:120px" class="input" />' +
                '<input id="inlineEditSalary" value="'+(h.salary||0)+'" placeholder="e.g. 8000" style="width:100px" type="number" min="0" class="input" />' +
                '<button class="btn btn-primary" style="padding:5px 12px;font-size:12px" onclick="saveInlineEdit('+idx+')">💾 Save</button>' +
                '<button class="btn btn-outline" style="padding:5px 12px;font-size:12px" onclick="cancelEdit()">Cancel</button>' +
              '</div>' +
            '</td>';
        } else {
          tr.innerHTML =
            '<td style="font-weight:'+(isSelected?'600':'400')+'">' +
              (isSelected ? '<span style="color:#2563eb;margin-right:4px">▶</span>' : '') +
              h.name +
            '</td>' +
            '<td>₹'+(h.salary||0).toFixed(0)+'</td>' +
            '<td><span style="font-weight:600;color:#16a34a">'+presentDays+'</span>/'+daysInMonth+'</td>' +
            '<td>₹'+estimated.toFixed(0)+'</td>' +
            '<td><div class="helper-row-actions">' +
              '<button class="btn-icon btn-icon-att" title="Mark Attendance" onclick="selectHelperForAttendance(\''+h.name.replace(/'/g,"\\'")+'\')" >📅</button>' +
              '<button class="btn-icon btn-icon-edit" title="Edit" onclick="startEditHelper('+idx+')">✏️</button>' +
              '<button class="btn-icon btn-icon-del"  title="Delete" onclick="deleteHelper('+idx+')">🗑️</button>' +
            '</div></td>';
        }
        body.appendChild(tr);
      });
    }

    function renderHelperTabs() {
      var container = document.getElementById('helperTabsContainer');
      container.innerHTML = '';
      if (!helpers.length) return;
      var monthKey = getCurrentMonthKey();
      var monthAtt = attendance[monthKey] || {};
      var daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();
      var wrap = document.createElement('div');
      wrap.className = 'helper-tabs';
      helpers.forEach(function(h){
        var presentDays = 0;
        for (var d=1;d<=daysInMonth;d++) { if (monthAtt[d+'-'+h.name]==='P') presentDays++; }
        var tab = document.createElement('button');
        tab.type = 'button';
        tab.className = 'helper-tab' + (h.name===selectedHelperName ? ' active' : '');
        tab.innerHTML = '🧑‍🔧 ' + h.name + ' <span class="tab-days">'+presentDays+'d</span>';
        tab.onclick = function(){ selectHelperForAttendance(h.name); };
        wrap.appendChild(tab);
      });
      container.appendChild(wrap);
    }

    function renderAttendanceGrid() {
      // rebuild tabs first
      renderHelperTabs();

      var container = document.getElementById('attendanceGrid');
      container.innerHTML = '';

      if (!helpers.length) {
        container.innerHTML = '<div class="att-placeholder">➕ Add a helper first to mark attendance.</div>';
        return;
      }

      // Ensure selection is valid
      if (!selectedHelperName || !helpers.find(function(h){return h.name===selectedHelperName;})) {
        selectedHelperName = helpers[0].name;
      }

      var monthKey = getCurrentMonthKey();
      if (!attendance[monthKey]) attendance[monthKey] = {};
      var monthAtt = attendance[monthKey];

      var d = new Date(); var year=d.getFullYear(); var month=d.getMonth();
      var daysInMonth = new Date(year,month+1,0).getDate();
      var monthName = d.toLocaleString('default',{month:'long'});
      var today = d.getDate();

      // Month + helper name header
      var hdr = document.createElement('div');
      hdr.style.cssText = 'margin-bottom:8px;font-size:12px;color:#374151;display:flex;justify-content:space-between;align-items:center';
      hdr.innerHTML =
        '<span style="font-weight:600">'+monthName+' '+year+'</span>' +
        '<span style="color:#2563eb;font-weight:600;font-size:11px">'+selectedHelperName+'</span>';
      container.appendChild(hdr);

      // Day-of-week header row
      var weekDays = ['S','M','T','W','T','F','S'];
      var grid = document.createElement('div');
      grid.style.cssText = 'display:grid;grid-template-columns:repeat(7,1fr);gap:5px';

      weekDays.forEach(function(w){
        var wh = document.createElement('div');
        wh.style.cssText = 'font-size:9px;color:#9ca3af;text-align:center;font-weight:600;padding-bottom:2px';
        wh.textContent = w;
        grid.appendChild(wh);
      });

      // Blank padding for first week
      var firstDow = new Date(year, month, 1).getDay(); // 0=Sun
      for (var p=0; p<firstDow; p++) {
        var blank = document.createElement('div');
        grid.appendChild(blank);
      }

      for (var day=1; day<=daysInMonth; day++) {
        var key = day+'-'+selectedHelperName;
        var status = monthAtt[key] || null;
        var isToday = day === today;

        var dayBtn = document.createElement('button');
        dayBtn.type = 'button';
        dayBtn.className = 'attendance-day';
        dayBtn.textContent = day;
        if (status==='P') dayBtn.classList.add('present');
        if (status==='A') dayBtn.classList.add('absent');
        if (isToday) dayBtn.style.cssText += 'box-shadow:0 0 0 2px #2563eb;font-weight:700;';

        (function(k, btn, mn, dy){
          btn.onclick = function(){
            var cur = monthAtt[k] || null, ns = null;
            if (cur===null)  { monthAtt[k]='P'; btn.classList.add('present'); btn.classList.remove('absent'); ns='P'; }
            else if (cur==='P') { monthAtt[k]='A'; btn.classList.add('absent'); btn.classList.remove('present'); ns='A'; }
            else { delete monthAtt[k]; btn.classList.remove('present','absent'); }
            attendance[monthKey] = monthAtt;
            localStorage.setItem(SK.ATTENDANCE, JSON.stringify(attendance));
            renderHelpers();
            renderHelperTabs();
            renderDashboardAndReports();
            if (ns==='P') toast.success(currentLanguage==='hi'?'उपस्थित ✅':'Present ✅', selectedHelperName+' — '+mn+' '+dy, 1800);
            else if (ns==='A') toast.warning(currentLanguage==='hi'?'अनुपस्थित':'Absent', selectedHelperName+' — '+mn+' '+dy, 1800);
          };
        })(key, dayBtn, monthName, day);

        grid.appendChild(dayBtn);
      }
      container.appendChild(grid);
    }

    // ============================================================
    // SETTINGS
    // ============================================================
    document.getElementById('roundToggle').checked = appSettings.roundBills!==false;
    document.getElementById('roundToggle').addEventListener('change', function(e){
      appSettings.roundBills = e.target.checked;
      localStorage.setItem(SK.SETTINGS, JSON.stringify(appSettings));
      toast.info(e.target.checked?(currentLanguage==='hi'?'राउंडिंग चालू':'Rounding ON'):(currentLanguage==='hi'?'राउंडिंग बंद':'Rounding OFF'));
    });
    document.getElementById('focusToggle').addEventListener('change', function(e){
      var main = document.querySelector('.main');
      if (e.target.checked) { main.style.background='radial-gradient(circle at top left,#e5e7eb,#f9fafb)'; toast.info(currentLanguage==='hi'?'फोकस मोड चालू':'Focus mode ON'); }
      else { main.style.background='radial-gradient(circle at top left,#eff6ff,#f9fafb)'; toast.info(currentLanguage==='hi'?'फोकस मोड बंद':'Focus mode OFF'); }
    });

    async function resetAllData() {
      var ok = await showConfirm(
        currentLanguage==='hi'?'सारे बिल, ग्राहक और हेल्पर का डेटा हट जाएगा। यह वापस नहीं होगा।':'All bills, customers and helpers will be permanently deleted. This cannot be undone.',
        currentLanguage==='hi'?'सभी डेटा रीसेट करें?':'Reset all data?', '⚠️',
        currentLanguage==='hi'?'हाँ, रीसेट करें':'Yes, reset everything'
      );
      if (!ok) return;
      bills=[]; customers=[]; helpers=[]; attendance={};
      [SK.BILLS,SK.CUSTOMERS,SK.HELPERS,SK.ATTENDANCE].forEach(function(k){ localStorage.removeItem(k); });
      refreshUI();
      toast.warning(currentLanguage==='hi'?'डेटा रीसेट हो गया':'Data reset', currentLanguage==='hi'?'सभी लोकल डेटा हटाया गया।':'All local data has been cleared.');
    }

    function forceRefreshReports() {
      loadAllData();
      refreshUI();
      toast.success('Reports refreshed', 'Data re-read from localStorage.');
    }

    // ============================================================
    // REPORTS & DASHBOARD
    // ============================================================
    function computeStats() {
      var totalSales=0, paidBills=0, dueBills=0;
      bills.forEach(function(b){ totalSales+=b.amount||0; if(b.status==='paid') paidBills++; else dueBills++; });
      var cashInHand = bills.filter(function(b){return b.paymentMode==='cash';}).reduce(function(s,b){return s+(b.amount||0);},0);
      var totalDueCustomers=customers.length;
      var totalDueAmount = customers.reduce(function(s,c){return s+(c.due||0);},0);
      var helperPresent=0, helperTotalDays=0;
      var monthKey=getCurrentMonthKey(); var monthAtt=attendance[monthKey]||{};
      var daysInMonth=new Date(new Date().getFullYear(),new Date().getMonth()+1,0).getDate();
      if (helpers[0]) {
        var hn=helpers[0].name;
        for (var d=1;d<=daysInMonth;d++) { var st=monthAtt[d+'-'+hn]; if(st==='P'||st==='A') helperTotalDays++; if(st==='P') helperPresent++; }
      }
      var helperAttendancePercent = helperTotalDays>0?Math.round(helperPresent/helperTotalDays*100):0;
      var helperSalaryEstimate = helpers.reduce(function(sum,h){ var p=0; for(var d=1;d<=daysInMonth;d++){if(monthAtt[d+'-'+h.name]==='P')p++;} return sum+(p/daysInMonth)*(h.salary||0); },0);
      return {totalSales:totalSales,cashInHand:cashInHand,totalDueCustomers:totalDueCustomers,totalDueAmount:totalDueAmount,helperAttendancePercent:helperAttendancePercent,helperSalaryEstimate:helperSalaryEstimate,helperPresent:helperPresent};
    }

    function renderDashboardAndReports() {
      var s = computeStats();
      document.getElementById('statTotalSales').textContent       = '₹'+s.totalSales.toFixed(0);
      document.getElementById('statSalesCount').textContent       = bills.length+' bills';
      document.getElementById('statCashInHand').textContent       = '₹'+s.cashInHand.toFixed(0);
      document.getElementById('statPending').textContent          = s.totalDueCustomers+' customers pending';
      document.getElementById('statHelperAttendance').textContent = s.helperAttendancePercent+'%';
      document.getElementById('statHelperWage').textContent       = '₹'+s.helperSalaryEstimate.toFixed(0)+' due this month';
      document.getElementById('reportsBillsLine').textContent     = bills.length+' bills today';
      document.getElementById('reportsBillsTotal').textContent    = '₹'+s.totalSales.toFixed(0);
      document.getElementById('reportsCustomersLine').textContent = s.totalDueCustomers+' customers owing money';
      document.getElementById('reportsCustomersTotal').textContent= '₹'+s.totalDueAmount.toFixed(0);
      document.getElementById('reportsHelpersLine').textContent   = helpers.length+' helpers, '+s.helperPresent+' present days marked';
      document.getElementById('reportsHelpersTotal').textContent  = '₹'+s.helperSalaryEstimate.toFixed(0);
    }

    function refreshUI() {
      // Always re-read from localStorage so UI is never stale
      loadAllData();
      renderBills(); renderCustomers(); renderHelpers(); renderDashboardAndReports();
      var hView = document.getElementById('view_helpers');
      if (hView && !hView.classList.contains('hidden')) renderAttendanceGrid();
    }

    // ============================================================
    // INIT
    // ============================================================
    document.getElementById('languageSelectLogin').value    = currentLanguage;
    document.getElementById('languageSelectSettings').value = currentLanguage;
    applyTranslations();

    // Prefill shop name only if a real account exists (not the default "Your Business")
    (function(){
      var account = null;
      try { account = JSON.parse(localStorage.getItem('vyapar_account') || 'null'); } catch(err){}
      if (account && account.shop) {
        document.getElementById('businessName').value = account.shop;
        businessName = account.shop;
      }
      // else: leave blank — placeholder text will show instead
    })();

    refreshUI();