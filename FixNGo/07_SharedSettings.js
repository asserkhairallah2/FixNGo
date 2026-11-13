import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Send,
  Eye,
  WifiOff,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Upload,
  Phone,
  LogOut,
  Building2,
  Trash2,
  MapPin,
  HelpCircle,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const SHARED_SCREENS = [
  { id: 'SH01', label: 'SH01 · Chat with your captain', labelAr: 'SH01 · محادثة مع الكابتن', tab: 'Requests' },
  { id: 'SH02', label: 'SH02 · Change password', labelAr: 'SH02 · تغيير كلمة المرور', tab: 'Profile' },
  { id: 'SH03', label: 'SH03 · Connection interrupted', labelAr: 'SH03 · انقطع الاتصال', tab: 'Home' },
  { id: 'SH04', label: 'SH04 · Your trips (Empty state)', labelAr: 'SH04 · رحلاتك (لا توجد رحلات)', tab: 'Requests' },
  { id: 'SH05', label: 'SH05 · Privacy & terms', labelAr: 'SH05 · الخصوصية والشروط', tab: 'Profile' },
  { id: 'SH06', label: 'SH06 · App settings (Language & Theme)', labelAr: 'SH06 · إعدادات التطبيق (اللغة والمظهر)', tab: 'Profile' },
  { id: 'SH07', label: 'SH07 · Help & support', labelAr: 'SH07 · المساعدة والدعم', tab: 'Profile' },
  { id: 'SH08', label: 'SH08 · New support ticket', labelAr: 'SH08 · تذكرة دعم جديدة', tab: 'Profile' },
  { id: 'SH09', label: 'SH09 · Support ticket (SUP-2041)', labelAr: 'SH09 · تذكرة الدعم (SUP-2041)', tab: 'Profile' },
  { id: 'SH10', label: 'SH10 · Notification preferences', labelAr: 'SH10 · تفضيلات الإشعارات', tab: 'Profile' },
  { id: 'SH11', label: 'SH11 · About FixNGo', labelAr: 'SH11 · عن FixNGo', tab: 'Profile' },
  { id: 'SH12', label: 'SH12 · Edit account', labelAr: 'SH12 · تعديل الحساب', tab: 'Profile' },
  { id: 'SH13', label: 'SH13 · Log out of FixNGo?', labelAr: 'SH13 · تسجيل الخروج من FixNGo؟', tab: 'Profile' },
  { id: 'SH14', label: 'SH14 · Bank accounts', labelAr: 'SH14 · الحسابات البنكية', tab: 'Earnings' },
  { id: 'SH15', label: 'SH15 · Withdraw earnings', labelAr: 'SH15 · سحب الأرباح', tab: 'Earnings' },
  { id: 'SH16', label: 'SH16 · Withdrawal submitted', labelAr: 'SH16 · تم تقديم طلب السحب', tab: 'Earnings' },
  { id: 'SH17', label: 'SH17 · Document viewer', labelAr: 'SH17 · عارض المستندات', tab: 'Profile' },
  { id: 'SH18', label: 'SH18 · Upload a document', labelAr: 'SH18 · رفع مستند', tab: 'Profile' },
  { id: 'SH19', label: 'SH19 · Emergency assistance', labelAr: 'SH19 · مساعدة الطوارئ', tab: 'Home' },
  { id: 'SH20', label: 'SH20 · Add bank account', labelAr: 'SH20 · إضافة حساب بنكي', tab: 'Earnings' },
  { id: 'SH21', label: 'SH21 · Request account deletion', labelAr: 'SH21 · طلب حذف الحساب', tab: 'Profile' }
];

// Fallback parent within shared module when jumping directly
export const SHARED_INTERNAL_FALLBACK_BACK = {
  SH08: 'SH07',
  SH09: 'SH08',
  SH16: 'SH15',
  SH18: 'SH17',
  SH20: 'SH14'
};

export default function SharedSettingsModule({
  sharedScreen,
  colors,
  isAr,
  lang,
  setLang,
  theme,
  setTheme,
  chatInput,
  setChatInput,
  chatMessages,
  setChatMessages,
  FixNGoShieldLogo,
  PrimaryButton,
  SecondaryButton,
  goToAuthScreen,
  goToOwnerScreen,
  goToSharedScreen,
  handleBack
}) {
  const ForwardChevron = isAr ? ChevronLeft : ChevronRight;
  const [legalTab, setLegalTab] = useState('privacy');
  const [notifState, setNotifState] = useState({
    push: true,
    email: true,
    safety: true,
    bookings: true,
    offers: false
  });
  const [useAsPayout, setUseAsPayout] = useState(true);
  const [supportReply, setSupportReply] = useState('');

  switch (sharedScreen) {
    /* =====================================================================
     * SH01: Chat with your captain
     * ===================================================================== */
    case 'SH01':
      return (
        <div className="p-4 flex flex-col justify-between h-[610px]">
          <div className="space-y-3">
            <div>
              <h1 className={`text-lg font-extrabold ${colors.text}`}>
                {isAr ? 'محادثة مع الكابتن' : 'Chat with your captain'}
              </h1>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr
                  ? 'محمود حسن · متصل · FG-2606 · اليوم · ٦ نوفمبر ٢٠٢٦ · خاص وآمن'
                  : 'Mahmoud Hassan · Online · FG-2606 · Today · 6 November 2026 · Private & secure'}
              </p>
            </div>
            <div className="space-y-2.5 overflow-y-auto max-h-96 px-1">
              {chatMessages.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                    m.sender === 'user'
                      ? `${isAr ? 'mr-auto' : 'ml-auto'} bg-[#E51C23] text-white`
                      : `${colors.surface} border ${colors.border} ${colors.text}`
                  }`}
                >
                  <p>{isAr && m.textAr ? m.textAr : m.text}</p>
                  <p className="text-[9px] opacity-75 text-end mt-1">{m.time}</p>
                </div>
              ))}
              <div className={`p-2.5 rounded-2xl border ${colors.border} ${colors.surface} max-w-[78%] space-y-1`}>
                <div className="h-10 rounded-xl bg-slate-500/10 flex items-center justify-between px-3">
                  <span className="text-[10px] font-bold text-red-500">NEW CAIRO</span>
                  <MapPin size={14} className="text-red-500" />
                </div>
                <p className={`text-[10px] font-bold ${colors.text}`}>
                  {isAr ? 'تمت مشاركة الموقع المباشر · ١٤:٠٥' : 'Live location shared · 14:05'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={isAr ? 'اكتب رسالة...' : 'Type a message...'}
              className={`flex-1 px-3.5 h-11 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
            <button
              onClick={() => {
                if (!chatInput.trim()) return;
                setChatMessages([
                  ...chatMessages,
                  { sender: 'user', text: chatInput, textAr: chatInput, time: '14:07' }
                ]);
                setChatInput('');
              }}
              className="w-11 h-11 rounded-xl bg-[#E51C23] text-white flex items-center justify-center"
            >
              <Send size={15} className={isAr ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      );

    /* =====================================================================
     * SH02: Change password
     * ===================================================================== */
    case 'SH02':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تغيير كلمة المرور' : 'Change password'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'حافظ على أمان حسابك في كل رحلة.' : 'Keep your account secure on every journey.'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'كلمة المرور الحالية' : 'Current password'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs ${colors.text}`}>
              <span>••••••••••••</span>
              <Eye size={14} className={colors.secondaryText} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'كلمة المرور الجديدة' : 'New password'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs ${colors.text}`}>
              <span>••••••••••••</span>
              <Eye size={14} className={colors.secondaryText} />
            </div>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <div className="h-1 rounded-full bg-emerald-500" />
              <div className="h-1 rounded-full bg-emerald-500" />
              <div className="h-1 rounded-full bg-emerald-500" />
              <div className="h-1 rounded-full bg-emerald-500" />
            </div>
            <div className="flex justify-between text-[10px]">
              <span className={colors.secondaryText}>{isAr ? 'قوة كلمة المرور' : 'Password strength'}</span>
              <span className="font-bold text-emerald-500">{isAr ? 'قوية' : 'Strong'}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'تأكيد كلمة المرور الجديدة' : 'Confirm new password'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs ${colors.text}`}>
              <span>••••••••••••</span>
              <Eye size={14} className={colors.secondaryText} />
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-[11px] ${colors.secondaryText}`}>
            <p className={colors.text}>{isAr ? '✓ ٨ أحرف على الأقل' : '✓ At least 8 characters'}</p>
            <p className={colors.text}>{isAr ? '✓ أحرف كبيرة وصغيرة' : '✓ Uppercase and lowercase letters'}</p>
            <p className={colors.text}>{isAr ? '✓ رقم ورمز خاص' : '✓ A number and a special character'}</p>
            <p className="pt-1">
              {isAr ? 'ستظل قيد تسجيل الدخول على هذا الجهاز.' : "You'll stay signed in on this device."}
            </p>
          </div>

          <PrimaryButton onClick={handleBack}>
            {isAr ? 'تحديث كلمة المرور' : 'Update Password'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH03: Connection interrupted
     * ===================================================================== */
    case 'SH03':
      return (
        <div className="p-4 space-y-4">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'انقطع الاتصال' : 'Connection interrupted'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'سنعيدك للمسار الصحيح فوراً.' : "We'll get you back on track."}
            </p>
          </div>

          <div className="py-5 flex flex-col items-center text-center space-y-2.5">
            <div className="w-16 h-16 rounded-full bg-red-500/15 text-red-500 flex items-center justify-center">
              <WifiOff size={28} />
            </div>
            <h2 className={`text-sm font-extrabold ${colors.text}`}>
              {isAr ? 'فقدنا الاتصال بالإنترنت' : 'We lost the connection'}
            </h2>
            <p className={`text-xs ${colors.secondaryText} max-w-[240px]`}>
              {isAr
                ? 'تحقق من اتصال الإنترنت وحاول مرة أخرى. طلبك النشط محفوظ بأمان.'
                : 'Check your internet and try again. Your active request is safe.'}
            </p>
            <span className={`px-3 py-1 rounded-full border ${colors.border} ${colors.surface} text-[10px] font-bold ${colors.secondaryText}`}>
              • ERR_NETWORK_503
            </span>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الطلب النشط' : 'Active request'}</span>
              <span className={`font-extrabold ${colors.text}`}>
                {isAr ? 'FG-2606 · محفوظ' : 'FG-2606 · Saved'}
              </span>
            </div>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'إذا كنت في خطر فوري، اتصل بـ ١٢٣ للإسعاف أو ١٢٢ للشرطة.'
                : "If you're in immediate danger, call 123 for an ambulance or 122 for police."}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={handleBack}>
              {isAr ? 'إعادة المحاولة' : 'Try Again'}
            </PrimaryButton>
            <button
              onClick={() => goToSharedScreen('SH07')}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white text-xs font-extrabold"
            >
              {isAr ? 'تواصل مع الدعم' : 'Contact Support'}
            </button>
          </div>
        </div>
      );

    /* =====================================================================
     * SH04: Your trips (Empty state)
     * ===================================================================== */
    case 'SH04':
      return (
        <div className="p-4 space-y-4">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'رحلاتك' : 'Your trips'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'بداية جديدة، والدعم جاهز دائماً.' : 'A fresh start, with backup ready.'}
            </p>
          </div>

          <div className="py-5 flex flex-col items-center text-center space-y-3">
            <div className={`w-36 h-24 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-center relative`}>
              <span className="text-3xl">🚗</span>
              <MapPin size={18} className="text-red-500 absolute top-3 right-5" />
            </div>
            <h2 className={`text-sm font-extrabold ${colors.text}`}>
              {isAr ? 'لا توجد رحلات هنا بعد' : 'Nothing here just yet'}
            </h2>
            <p className={`text-xs ${colors.secondaryText} max-w-[240px]`}>
              {isAr
                ? 'ستظهر رحلاتك المكتملة هنا. المساعدة دائماً على بُعد ضغطة واحدة.'
                : 'Your completed trips will appear here. Help is always one tap away.'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-xs ${colors.secondaryText}`}>
            {isAr
              ? 'هل تحتاج صيانة دورية بدلاً من ذلك؟ اكتشف مراكز الخدمة الموثوقة بالقرب منك.'
              : 'Need routine maintenance instead? Discover trusted service centers near you.'}
          </div>

          <PrimaryButton onClick={() => goToOwnerScreen('C06')}>
            {isAr ? 'طلب مساعدة على الطريق' : 'Request Roadside Help'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH05: Privacy & terms
     * ===================================================================== */
    case 'SH05':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'الخصوصية والشروط' : 'Privacy & terms'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'آخر تحديث · ١ نوفمبر ٢٠٢٦' : 'Last updated · 1 November 2026'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setLegalTab('privacy')}
              className={`py-2 rounded-xl text-[11px] font-bold border ${
                legalTab === 'privacy'
                  ? `${colors.border} ${colors.surface} ${colors.text}`
                  : `border-transparent ${colors.secondaryText}`
              }`}
            >
              {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </button>
            <button
              onClick={() => setLegalTab('terms')}
              className={`py-2 rounded-xl text-[11px] font-bold border ${
                legalTab === 'terms'
                  ? `${colors.border} ${colors.surface} ${colors.text}`
                  : `border-transparent ${colors.secondaryText}`
              }`}
            >
              {isAr ? 'شروط الخدمة' : 'Terms of Service'}
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              {
                t: isAr ? '١. معلوماتك' : '1. Your information',
                b: isAr
                  ? 'يجمع FixNGo بيانات حسابك ومعلومات المركبة وسجل الخدمة لربطك بمقدمي الخدمة ومراكز الصيانة المعتمدين.'
                  : 'FixNGo collects your account details, vehicle information and service history to connect you with verified roadside providers and service centers.'
              },
              {
                t: isAr ? '٢. الموقع والسلامة على الطريق' : '2. Location & roadside safety',
                b: isAr
                  ? 'بإذنك، نستخدم موقعك لمطابقة أقرب مقدمي الخدمة وتتبع الرحلة النشطة. يتم مشاركة موقعك الدقيق فقط مع مقدم الخدمة المعين لطلبك.'
                  : 'With your permission, we use your location to match nearby providers and track an active trip. Your precise location is shared only with the provider assigned to your request.'
              },
              {
                t: isAr ? '٣. المدفوعات والسجلات' : '3. Payments & records',
                b: isAr
                  ? 'نحتفظ بالفواتير وتأكيدات الدفع لأغراض الدعم والأمان والالتزامات القانونية. لا يتم تخزين أرقام البطاقات الكاملة لدى FixNGo.'
                  : 'We retain invoices and payment confirmations for support, safety and legal obligations. Card payments are processed securely; full card numbers are not stored by FixNGo.'
              },
              {
                t: isAr ? '٤. خياراتك وحقوقك' : '4. Your choices & rights',
                b: isAr
                  ? 'يمكنك تحديث بياناتك والتحكم في الإشعارات وطلب الوصول إلى معلوماتك الشخصية أو حذفها عبر privacy@fixngo.eg.'
                  : 'You can update your details, control notifications and request access to or deletion of your personal information. Contact privacy@fixngo.eg for help.'
              },
              {
                t: isAr ? '٥. شروط الخدمة' : '5. Service terms',
                b: isAr
                  ? 'راجع واعتمد عرض السعر قبل بدء العمل. المساعدة على الطريق لا تغني عن خدمات الطوارئ؛ في الخطر الفوري اتصل بـ ١٢٣ أو ١٢٢.'
                  : 'Review and approve your estimate before work begins. Roadside assistance does not replace emergency services. In immediate danger, call 123 or 122.'
              }
            ].map((sec, idx) => (
              <div key={idx} className="space-y-0.5">
                <p className={`font-extrabold ${colors.text}`}>{sec.t}</p>
                <p className={`text-[11px] leading-relaxed ${colors.secondaryText}`}>{sec.b}</p>
              </div>
            ))}
          </div>
        </div>
      );

    /* =====================================================================
     * SH06: App settings (Language & Appearance - Dark/Light)
     * ===================================================================== */
    case 'SH06':
      return (
        <div className="p-4 space-y-4">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'إعدادات التطبيق' : 'App settings'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr
                ? 'تحكم في اللغة والمظهر والتفضيلات الخاصة بك.'
                : 'Manage language, appearance and preferences.'}
            </p>
          </div>

          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} text-[11px] ${colors.secondaryText}`}>
            {isAr
              ? 'تتم مزامنة التفضيلات عبر أجهزتك النشطة.'
              : 'Preferences are synced across your active devices.'}
          </div>

          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5`}>
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'اللغة / Language' : 'Language'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setLang('ar')}
                className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                  lang === 'ar'
                    ? 'border-[#E51C23] bg-[#E51C23] text-white'
                    : `${colors.border} ${colors.elevated} ${colors.text}`
                }`}
              >
                العربية
              </button>
              <button
                onClick={() => setLang('en')}
                className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                  lang === 'en'
                    ? 'border-[#E51C23] bg-[#E51C23] text-white'
                    : `${colors.border} ${colors.elevated} ${colors.text}`
                }`}
              >
                English
              </button>
            </div>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {lang === 'en'
                ? 'English is currently selected for the app interface.'
                : 'اللغة العربية مفعلة حالياً لواجهة التطبيق بالكامل مع اتجاه من اليمين لليسار (RTL).'}
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5`}>
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'المظهر / Appearance' : 'Appearance'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTheme('dark')}
                className={`py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                  theme === 'dark'
                    ? 'border-[#E51C23] bg-[#E51C23] text-white'
                    : `${colors.border} ${colors.elevated} ${colors.text}`
                }`}
              >
                <Moon size={14} /> {isAr ? 'داكن' : 'Dark'}
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                  theme === 'light'
                    ? 'border-[#E51C23] bg-[#E51C23] text-white'
                    : `${colors.border} ${colors.elevated} ${colors.text}`
                }`}
              >
                <Sun size={14} /> {isAr ? 'فاتح' : 'Light'}
              </button>
            </div>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {theme === 'dark'
                ? isAr
                  ? 'المظهر الداكن مفعل حالياً في جميع شاشات التطبيق.'
                  : 'Dark theme is currently active across the app.'
                : isAr
                ? 'المظهر الفاتح مفعل حالياً في جميع شاشات التطبيق.'
                : 'Light theme is currently active across the app.'}
            </p>
          </div>

          <button
            onClick={() => {
              setTheme('light');
              setLang('en');
            }}
            className="w-full py-3 rounded-2xl bg-slate-900 text-white text-xs font-extrabold"
          >
            {isAr ? 'استعادة الإعدادات الافتراضية' : 'Reset defaults'}
          </button>
        </div>
      );

    /* =====================================================================
     * SH07: Help & support
     * ===================================================================== */
    case 'SH07':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'المساعدة والدعم' : 'Help & support'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نحن معك عندما يصعب الطريق.' : "We're here when the road gets difficult."}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'أثناء الرحلة النشطة' : 'During an active trip'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'إذا كنت في خطر فوري، اتصل بخدمات الطوارئ أولاً. دعم FixNGo ليس خدمة طوارئ.'
                : "If you're in immediate danger, contact emergency services first. FixNGo support is not an emergency service."}
            </p>
            <button
              onClick={() => goToSharedScreen('SH19')}
              className="w-full flex justify-between items-center pt-1.5 border-t border-slate-500/10 text-start"
            >
              <div>
                <p className="font-bold text-red-500">
                  {isAr ? 'مساعدة الطوارئ' : 'Emergency assistance'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'مصر · الإسعاف ١٢٣ · الشرطة ١٢٢' : 'Egypt · Ambulance 123 · Police 122'}
                </p>
              </div>
              <AlertTriangle size={14} className="text-red-500" />
            </button>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'الأسئلة الشائعة' : 'Frequently asked questions'}
            </p>
            <div>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'كيف ألغي طلباً؟' : 'How do I cancel a request?'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr
                  ? 'افتح طلبك وراجع أي رسوم ثم أكد الإلغاء. لا يتم فرض رسوم أثناء البحث.'
                  : 'Open your request, review any fee, then confirm. A cancelled search is not charged.'}
              </p>
            </div>
            <div className="pt-1.5 border-t border-slate-500/10">
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'كيف تعمل إيصالات الدفع؟' : 'How do payment receipts work?'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr
                  ? 'تظهر الإيصالات المدفوعة بعد تأكيد الدفع، ويظل السعر المعتمد دون تغيير.'
                  : 'Paid receipts appear after a verified payment. Your approved estimate stays unchanged.'}
              </p>
            </div>
            <div className="pt-1.5 border-t border-slate-500/10">
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'هل يمكنني تغيير موعد الحجز؟' : 'Can I change my booking time?'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr
                  ? 'استخدم إعادة الجدولة في تفاصيل الموعد واختر فترة متاحة.'
                  : 'Use Reschedule in appointment details and select an available slot.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => goToSharedScreen('SH09')}
            className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-start text-xs`}
          >
            <div>
              <p className={`font-extrabold ${colors.text}`}>
                {isAr ? 'عرض تذكرة الدعم' : 'View support ticket'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'SUP-2041 · مفتوحة · بانتظار الرد' : 'SUP-2041 · Open · Latest response pending'}
              </p>
            </div>
            <HelpCircle size={15} className={colors.secondaryText} />
          </button>

          <PrimaryButton onClick={() => goToSharedScreen('SH08')}>
            {isAr ? 'تواصل مع الدعم' : 'Contact Support'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH08: New support ticket
     * ===================================================================== */
    case 'SH08':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تذكرة دعم جديدة' : 'New support ticket'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أخبرنا بما حدث. نحن نستمع إليك.' : "Tell us what happened. We're listening."}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'الفئة' : 'Category'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'الدفع والإيصال' : 'Payment & receipt'}
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'مرجع الرحلة / الحجز' : 'Trip / booking reference'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              FG-2606
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'الوصف' : 'Description'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr
                ? 'دفعت ٦٥٠ ج.م نقداً. يرجى مساعدتي في تأكيد مكان العثور على الإيصال.'
                : 'I paid 650 EGP in cash. Please help me confirm where to find the receipt.'}
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'المرفقات (اختياري)' : 'Attachments (optional)'}
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className={`font-semibold ${colors.text}`}>
                  {isAr ? 'إضافة صورة أو مستند' : 'Add photo or document'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  JPG, PNG or PDF · Up to 10 MB each
                </p>
              </div>
              <Upload size={14} className={colors.secondaryText} />
            </div>
            <p className={`text-[10px] ${colors.secondaryText} pt-1`}>
              receipt-screenshot.png · 248 KB · Attached
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-blue-500">
              {isAr ? 'جاهز للإرسال' : 'Ready to send'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'سيتم مشاركة المرجع والرسالة مع فريق الدعم. لا ترفق بيانات البطاقة البنكية أو كلمات المرور.'
                : "Your reference and message will be shared with the support team. Don't attach payment card details or passwords."}
            </p>
          </div>

          <PrimaryButton onClick={() => goToSharedScreen('SH09')}>
            {isAr ? 'إرسال التذكرة' : 'Submit Ticket'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH09: Support ticket (SUP-2041)
     * ===================================================================== */
    case 'SH09':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تذكرة الدعم' : 'Support ticket'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'SUP-2041 · أُرسلت ٦ نوفمبر ٢٠٢٦، ١٥:٠٥' : 'SUP-2041 · Submitted 6 Nov 2026, 15:05'}
            </p>
          </div>

          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
            {isAr ? '• مفتوحة · بانتظار الدعم' : '• Open · Awaiting support'}
          </span>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'الدفع والإيصال' : 'Payment & receipt'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المرجع' : 'Reference'}</span>
              <span className={`font-bold ${colors.text}`}>FG-2606</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'مبلغ الطلب' : 'Request amount'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٦٥٠ ج.م · نقدي' : '650 EGP · Cash'}</span>
            </div>
            <p className={`text-[10px] ${colors.secondaryText} pt-1`}>
              {isAr
                ? 'نرد عادةً خلال ٢٤ ساعة. ستتلقى إشعاراً عندما يرد فريق الدعم.'
                : "We usually reply within 24 hours. You'll receive a notification when support responds."}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'أحمد محمد · ١٥:٠٥' : 'Ahmed Mohamed · 15:05'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'دفعت ٦٥٠ ج.م نقداً. يرجى مساعدتي في تأكيد مكان العثور على الإيصال.'
                : 'I paid 650 EGP in cash. Please help me confirm where to find the receipt.'}
            </p>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              Attachment · receipt-screenshot.png
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'دعم FixNGo · ١٥:٠٥' : 'FixNGo Support · 15:05'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'تم استلام تذكرتك. سجلات رحلتك وإيصالك محفوظة بأمان بينما نراجع رسالتك.'
                : 'Your ticket has been received. Your trip and receipt records are safe while we review your message.'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'الرد على الدعم' : 'Reply to support'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center`}>
              <input
                value={supportReply}
                onChange={(e) => setSupportReply(e.target.value)}
                placeholder={isAr ? 'اكتب رسالة...' : 'Type a message...'}
                className={`bg-transparent text-xs ${colors.text} w-full outline-none`}
              />
              <Send size={14} className={colors.secondaryText} />
            </div>
          </div>

          <PrimaryButton onClick={handleBack}>
            {isAr ? 'إرسال الرسالة' : 'Send Message'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH10: Notification preferences
     * ===================================================================== */
    case 'SH10':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تفضيلات الإشعارات' : 'Notification preferences'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'اختر ما يصلك. الأمان يأتي أولاً.' : 'Choose what reaches you. Safety comes first.'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'القنوات' : 'Channels'}
            </p>
            {[
              {
                k: 'push',
                t: isAr ? 'إشعارات الهاتف' : 'Push notifications',
                s: isAr ? 'تحديثات الرحلة على هذا الجهاز' : 'Trip updates on this device'
              },
              {
                k: 'email',
                t: isAr ? 'إشعارات البريد الإلكتروني' : 'Email notifications',
                s: isAr ? 'الإيصالات وتحديثات الحجوزات' : 'Receipts and booking updates'
              }
            ].map((item) => (
              <div key={item.k} className="flex items-center justify-between">
                <div>
                  <p className={`font-bold ${colors.text}`}>{item.t}</p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>{item.s}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifState((p) => ({ ...p, [item.k]: !p[item.k] }))}
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                    notifState[item.k] ? 'bg-emerald-500 justify-end' : 'bg-slate-600 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow" />
                </button>
              </div>
            ))}
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'ما تتلقاه' : 'What you receive'}
            </p>
            {[
              {
                k: 'safety',
                t: isAr ? 'تحديثات الرحلة والأمان' : 'Trip & safety updates',
                s: isAr ? 'تنبيهات الرحلة النشطة الهامة تظل مفعلة' : 'Critical active-trip alerts stay enabled'
              },
              {
                k: 'bookings',
                t: isAr ? 'الحجوزات والتذكيرات' : 'Bookings & reminders',
                s: isAr ? 'التأكيدات وتغييرات المواعيد' : 'Confirmations and appointment changes'
              },
              {
                k: 'offers',
                t: isAr ? 'العروض والخصومات' : 'Offers & promotions',
                s: isAr ? 'أخبار وعروض اختيارية' : 'Optional product news and offers'
              }
            ].map((item) => (
              <div key={item.k} className="flex items-center justify-between">
                <div>
                  <p className={`font-bold ${colors.text}`}>{item.t}</p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>{item.s}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifState((p) => ({ ...p, [item.k]: !p[item.k] }))}
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                    notifState[item.k] ? 'bg-emerald-500 justify-end' : 'bg-slate-600 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow" />
                </button>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-amber-500">
              {isAr ? 'يلزم إذن الجهاز' : 'Device permission needed'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'إذا تم حظر الإشعارات بواسطة جهازك، قم بتفعيلها من إعدادات الجهاز.'
                : 'If push is blocked by your device, enable notifications in device settings. Safety updates remain available in the app and by email.'}
            </p>
          </div>

          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs`}>
            <div>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'فتح إعدادات الجهاز' : 'Open Device Settings'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'إذن الإشعارات · إعدادات النظام' : 'Notification permission · Native device settings'}
              </p>
            </div>
            <Settings size={14} className={colors.secondaryText} />
          </div>

          <PrimaryButton onClick={handleBack}>
            {isAr ? 'حفظ التفضيلات' : 'Save Preferences'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH11: About FixNGo
     * ===================================================================== */
    case 'SH11':
      return (
        <div className="p-4 space-y-4">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'عن FixNGo' : 'About FixNGo'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'معاً على الطريق من جديد.' : 'Back on the road. Together.'}
            </p>
          </div>

          <div className="py-4 flex flex-col items-center gap-2 text-center">
            <FixNGoShieldLogo size={64} />
            <h2 className={`text-xl font-black italic ${colors.text}`} dir="ltr">
              Fix<span className="text-[#FF0000]">N</span>Go
            </h2>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'الإصدار 1.0.0 · مصر' : 'Version 1.0.0 · Egypt'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5 text-xs`}>
            <p className={colors.secondaryText}>
              {isAr
                ? 'ميكانيكيون معتمدون، كباتن أوناش ومراكز خدمة موثوقة أينما يأخذك الطريق.'
                : 'Trusted mechanics, tow captains and service centers. Wherever the road takes you.'}
            </p>
            <button
              onClick={() => goToSharedScreen('SH07')}
              className="w-full pt-2 border-t border-slate-500/10 flex justify-between items-center text-start"
            >
              <div>
                <p className={`font-bold ${colors.text}`}>{isAr ? 'المساعدة والدعم' : 'Help & Support'}</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>support@fixngo.eg</p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
            <button
              onClick={() => goToSharedScreen('SH05')}
              className="w-full pt-2 border-t border-slate-500/10 flex justify-between items-center text-start"
            >
              <div>
                <p className={`font-bold ${colors.text}`}>{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'كيف نحمي معلوماتك' : 'How we protect your information'}
                </p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
            <button
              onClick={() => goToSharedScreen('SH05')}
              className="w-full pt-2 border-t border-slate-500/10 flex justify-between items-center text-start"
            >
              <div>
                <p className={`font-bold ${colors.text}`}>{isAr ? 'شروط الخدمة' : 'Terms of Service'}</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'المساعدة على الطريق والمدفوعات والحجوزات' : 'Roadside assistance, payments and bookings'}
                </p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
          </div>

          <SecondaryButton onClick={handleBack}>
            {isAr ? 'العودة إلى الملف الشخصي' : 'Back to Profile'}
          </SecondaryButton>
        </div>
      );

    /* =====================================================================
     * SH12: Edit account
     * ===================================================================== */
    case 'SH12':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تعديل الحساب' : 'Edit account'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أحمد محمد · معلومات حسابك' : 'Ahmed Mohamed · Your account information'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'الاسم الكامل' : 'Full name'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'البريد الإلكتروني' : 'Email address'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              ahmed.mohamed@gmail.com
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'رقم الهاتف' : 'Phone number'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              +20 100 123 4567
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
              {isAr ? '• جهة الاتصال موثقة' : '• Contact verified'}
            </span>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'يتطلب تغيير البريد أو الهاتف رمز تحقق قبل استخدام جهة الاتصال الجديدة.'
                : 'Changing email or phone requires a verification code before the new contact is used.'}
            </p>
            <p className={`font-bold ${colors.text} pt-1`}>
              {isAr ? 'تأكيد جهة الاتصال المعدلة' : 'Verify changed contact'}
            </p>
          </div>

          <button
            onClick={() => goToSharedScreen('SH21')}
            className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-start`}
          >
            <div>
              <p className="text-xs font-extrabold text-red-500">
                {isAr ? 'حذف حسابي' : 'Delete my account'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr
                  ? 'مراجعة الرحلات النشطة والسجلات المحتفظ بها والتأكيد'
                  : 'Review active trips, retained records and confirmation'}
              </p>
            </div>
            <Trash2 size={14} className="text-red-500" />
          </button>

          <PrimaryButton onClick={handleBack}>
            {isAr ? 'حفظ تغييرات الحساب' : 'Save Account Changes'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH13: Log out of FixNGo?
     * ===================================================================== */
    case 'SH13':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تسجيل الخروج من FixNGo؟' : 'Log out of FixNGo?'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أكد قبل مغادرة هذا الجهاز.' : 'Confirm before leaving this device.'}
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} flex flex-col items-center text-center space-y-2`}>
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 text-red-500 flex items-center justify-center">
              <LogOut size={22} />
            </div>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr
                ? 'ستحتاج إلى بريدك الإلكتروني وكلمة المرور لتسجيل الدخول مجدداً. تظل مركباتك وحجوزاتك وإيصالاتك محفوظة في حسابك.'
                : "You'll need your email and password to sign back in. Saved vehicles, bookings and receipts stay in your account."}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'قبل المغادرة' : 'Before you leave'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'تسجيل الخروج لا يلغي طلباً نشطاً أو موعداً مؤكداً. عد إلى الرحلة النشطة إذا كنت لا تزال بحاجة للمساعدة.'
                : 'Logging out does not cancel an active request or appointment. Return to the active trip if you still need assistance.'}
            </p>
            <button
              onClick={handleBack}
              className="w-full flex justify-between items-center pt-1.5 border-t border-slate-500/10"
            >
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'العودة للطلب النشط' : 'Return to Active Request'}
              </span>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
          </div>

          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-amber-500">
              {isAr ? 'أمان مقدمي الخدمة' : 'Provider safety'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'يجب على الميكانيكيين والكباتن إنهاء المهمة النشطة أو تسليمها بأمان قبل تسجيل الخروج.'
                : 'Mechanics and captains must finish or safely hand over an active job before signing out. Set availability offline to stop new requests.'}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAuthScreen('A03')}>
              {isAr ? 'تسجيل الخروج' : 'Log Out'}
            </PrimaryButton>
            <SecondaryButton onClick={handleBack}>
              {isAr ? 'البقاء قيد تسجيل الدخول' : 'Stay Signed In'}
            </SecondaryButton>
          </div>
        </div>
      );

    /* =====================================================================
     * SH14: Bank accounts
     * ===================================================================== */
    case 'SH14':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'الحسابات البنكية' : 'Bank accounts'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كريم مصطفى · وجهات سحب الأرباح' : 'Karim Mostafa · Your payout destinations'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'البنك الأهلي المصري' : 'National Bank of Egypt'}
            </p>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
              {isAr ? '• حساب السحب المختار' : '• Selected payout account'}
            </span>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'صاحب الحساب' : 'Account holder'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'كريم مصطفى' : 'Karim Mostafa'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رقم الحساب' : 'Account'}</span>
              <span className={`font-bold ${colors.text}`}>•••• 2846</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>IBAN</span>
              <span className={`font-bold ${colors.text}`}>EG•• •••• •••• 2846</span>
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-[11px]">
              <CheckCircle2 size={13} className="text-emerald-500" />
              <span className={colors.text}>{isAr ? 'مستخدم لعمليات السحب' : 'Use for withdrawals'}</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'طريقة السحب' : 'Payout method'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'تحويل بنكي · ج.م' : 'Bank transfer · EGP'}
            </p>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr
                ? 'تذهب التحويلات فقط إلى الحساب البنكي الموثق والمختار باسمك.'
                : 'Withdrawals go only to the selected, verified bank account in your name.'}
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-emerald-500">
              {isAr ? 'تم حفظ وجهة السحب' : 'Payout destination saved'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تستخدم طلبات السحب المستقبلية حسابك المختار.'
                : 'Future withdrawal reviews use your selected account. Pending payouts keep their original destination.'}
            </p>
          </div>

          <PrimaryButton onClick={() => goToSharedScreen('SH20')}>
            {isAr ? 'إضافة حساب بنكي' : 'Add Bank Account'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH15: Withdraw earnings
     * ===================================================================== */
    case 'SH15':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'سحب الأرباح' : 'Withdraw earnings'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كريم مصطفى · تحويل بنكي' : 'Karim Mostafa · Bank transfer'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface}`}>
            <p className={`text-[10px] font-bold uppercase ${colors.secondaryText}`}>
              {isAr ? 'الرصيد المتاح' : 'AVAILABLE BALANCE'}
            </p>
            <p className={`text-xl font-extrabold ${colors.text}`}>
              {isAr ? '٢,٨٠٠ ج.م' : '2,800 EGP'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'مبلغ السحب · ج.م' : 'Withdrawal amount · EGP'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
              <span>2,000</span>
              <span className={`text-[10px] ${colors.secondaryText}`}>EGP</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs`}>
            <div>
              <p className={`font-extrabold ${colors.text}`}>
                {isAr ? 'الوجهة' : 'Destination'}
              </p>
              <p className={`text-[11px] ${colors.text}`}>
                {isAr ? 'البنك الأهلي المصري · •••• 2846' : 'National Bank of Egypt · •••• 2846'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'كريم مصطفى · الحساب البنكي المختار' : 'Karim Mostafa · Selected bank account'}
              </p>
            </div>
            <Building2 size={16} className={colors.secondaryText} />
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'مراجعة السحب' : 'Withdrawal review'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المبلغ' : 'Amount'}</span>
              <span className={`font-bold ${colors.text}`}>2,000 EGP</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رسوم التحويل' : 'Transfer fee'}</span>
              <span className={`font-bold ${colors.text}`}>0 EGP</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الصافي للبنك' : 'Net to bank'}</span>
              <span className={`font-bold ${colors.text}`}>2,000 EGP</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-500/10">
              <span className={colors.secondaryText}>
                {isAr ? 'الرصيد بعد السحب' : 'Balance after withdrawal'}
              </span>
              <span className={`font-extrabold ${colors.text}`}>800 EGP</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className={colors.text}>
              {isAr ? 'أؤكد المبلغ والحساب البنكي المستلم' : 'I confirm the amount and bank destination'}
            </span>
          </div>

          <PrimaryButton onClick={() => goToSharedScreen('SH16')}>
            {isAr ? 'مراجعة وإرسال طلب السحب' : 'Review & Submit Withdrawal'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH16: Withdrawal submitted
     * ===================================================================== */
    case 'SH16':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تم تقديم طلب السحب' : 'Withdrawal submitted'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              WD-2606-018 · 6 November 2026, 16:10
            </p>
          </div>

          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
            {isAr ? '• تحويل بنكي قيد التنفيذ' : '• Pending bank transfer'}
          </span>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface}`}>
            <p className={`text-[10px] font-bold uppercase ${colors.secondaryText}`}>
              {isAr ? 'صافي التحويل' : 'NET PAYOUT'}
            </p>
            <p className={`text-xl font-extrabold ${colors.text}`}>
              {isAr ? '٢,٠٠٠ ج.م' : '2,000 EGP'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'تفاصيل السحب' : 'Withdrawal details'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'صاحب الحساب' : 'Account holder'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'كريم مصطفى' : 'Karim Mostafa'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'البنك' : 'Bank'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'البنك الأهلي المصري' : 'National Bank of Egypt'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الحساب' : 'Account'}</span>
              <span className={`font-bold ${colors.text}`}>•••• 2846</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المطلوب / الرسوم' : 'Requested / fee'}</span>
              <span className={`font-bold ${colors.text}`}>2,000 / 0 EGP</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المتبقي المتاح' : 'Remaining available'}</span>
              <span className={`font-bold ${colors.text}`}>800 EGP</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'تتبع التحويل' : 'Payout tracking'}
            </p>
            <div className="flex justify-between">
              <span className={colors.text}>• {isAr ? 'تم الطلب' : 'Requested'}</span>
              <span className={colors.secondaryText}>6 Nov · 16:10</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.text}>• {isAr ? 'قيد المعالجة بواسطة FixNGo' : 'Processing by FixNGo'}</span>
              <span className={colors.secondaryText}>{isAr ? 'قيد الانتظار' : 'Pending'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>• {isAr ? 'أُرسل للبنك' : 'Sent to bank'}</span>
              <span className={colors.secondaryText}>{isAr ? 'ليس بعد' : 'Not yet'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>• {isAr ? 'تأكيد البنك' : 'Bank confirmation'}</span>
              <span className={colors.secondaryText}>{isAr ? 'ليس بعد' : 'Not yet'}</span>
            </div>
          </div>

          <PrimaryButton onClick={handleBack}>
            {isAr ? 'العودة إلى الأرباح' : 'Back to Earnings'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH17: Document viewer
     * ===================================================================== */
    case 'SH17':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'عارض المستندات' : 'Document viewer'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'مستند التوثيق · معاينة آمنة' : 'Verification document · Secure preview'}
            </p>
          </div>

          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
            {isAr ? '• مستند موثق' : '• Verified document'}
          </span>

          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} space-y-2`}>
            <FileText size={20} className={colors.secondaryText} />
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'مستند التوثيق' : 'VERIFICATION DOCUMENT'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'معاينة نموذجية · تم إخفاء البيانات الحساسة' : 'Sample preview · Sensitive details hidden'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'المالك: كريم مصطفى · شهادة مهنية' : 'Holder: Karim Mostafa · Type: Professional certificate'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'بيانات المستند' : 'Document metadata'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الملف' : 'File'}</span>
              <span className={`font-bold ${colors.text}`}>professional-certificate.pdf</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'تاريخ الرفع' : 'Uploaded'}</span>
              <span className={`font-bold ${colors.text}`}>5 Nov 2026 · 16:30</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'حالة المراجعة' : 'Review state'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'موثق · ٦ نوفمبر' : 'Verified · 6 Nov'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الصفحات / الحجم' : 'Pages / size'}</span>
              <span className={`font-bold ${colors.text}`}>1 page · 1.2 MB</span>
            </div>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToSharedScreen('SH18')}>
              {isAr ? 'استبدال المستند' : 'Replace Document'}
            </PrimaryButton>
            <SecondaryButton onClick={handleBack}>
              {isAr ? 'إغلاق المعاينة' : 'Close Preview'}
            </SecondaryButton>
          </div>
        </div>
      );

    /* =====================================================================
     * SH18: Upload a document
     * ===================================================================== */
    case 'SH18':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'رفع مستند' : 'Upload a document'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كريم مصطفى · التوثيق والشهادات' : 'Karim Mostafa · Verification & credentials'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'نوع المستند' : 'Document type'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'رخصة القيادة · استبدال الحالي' : 'Driving license · Replace existing'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
              <Upload size={15} className={colors.secondaryText} />
              <p className={`font-extrabold ${colors.text}`}>{isAr ? 'الصورة الأمامية' : 'Front photo'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>license-front.jpg</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'جاهز · استبدال' : 'Ready · Replace'}</p>
            </div>
            <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
              <Upload size={15} className={colors.secondaryText} />
              <p className={`font-extrabold ${colors.text}`}>{isAr ? 'الصورة الخلفية' : 'Back photo'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>license-back.jpg</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'جاهز · استبدال' : 'Ready · Replace'}</p>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'متطلبات الصورة' : 'Photo requirements'}
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'جميع الزوايا واضحة بدون انعكاس أو تشويش' : 'All corners visible, no glare or blur'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'البيانات مقروءة والمستند ساري الصلاحية' : 'Details readable and document current'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-amber-500">
              {isAr ? 'تم الإرسال · قيد المراجعة' : 'Submitted · Pending review'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تم حفظ المستند البديل بأمان. تظل حالة المراجعة الحالية مرئية حتى يكتمل التحقق.'
                : 'Your replacement is saved securely. The current review state remains visible until verification finishes.'}
            </p>
          </div>

          <PrimaryButton onClick={handleBack}>
            {isAr ? 'إرسال للمراجعة' : 'Submit for Review'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH19: Emergency assistance
     * ===================================================================== */
    case 'SH19':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'مساعدة الطوارئ' : 'Emergency assistance'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'مصر · لحالات الخطر الفوري فقط' : 'Egypt · For immediate danger only'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl border border-red-500/30 bg-red-500/10 space-y-2 text-xs">
            <p className="font-extrabold text-red-500 flex items-center gap-1.5">
              <AlertTriangle size={14} />
              <span>{isAr ? 'طوارئ SOS · خطر فوري؟' : 'Emergency SOS · Immediate danger?'}</span>
            </p>
            <div className="flex justify-between font-bold text-red-500">
              <span>{isAr ? '١٢٣ · الإسعاف' : '123 · Ambulance'}</span>
              <span>{isAr ? '١٢٢ · الشرطة' : '122 · Police'}</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'موقع رحلتك النشطة' : 'Your active trip location'}
            </p>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'FG-2606 · شارع التسعين، القاهرة الجديدة' : 'FG-2606 · 90th Street, New Cairo'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'بجوار محطة الوقود · هيونداي إلنترا رمادي · A B C 1234'
                : 'Beside the petrol station · Graphite Hyundai Elantra · A B C 1234'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'حافظ على سلامتك قدر الإمكان' : 'Stay as safe as you can'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'ابتعد عن حركة المرور إن أمكن وشغل أضواء الانتظار. لا تقم بالإصلاح في حارة سير نشطة.'
                : 'Move away from traffic if safe. Keep hazards on. Never repair in a live lane.'}
            </p>
          </div>

          <button
            onClick={() => goToSharedScreen('SH07')}
            className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}
          >
            <span>{isAr ? 'المساعدة والدعم لغير الطوارئ' : 'Non-emergency help & support'}</span>
            <ForwardChevron size={14} className={colors.secondaryText} />
          </button>

          <div className="space-y-2">
            <PrimaryButton onClick={handleBack}>
              {isAr ? 'اتصال ١٢٣ · الإسعاف' : 'Call 123 · Ambulance'}
            </PrimaryButton>
            <SecondaryButton onClick={handleBack}>
              {isAr ? 'اتصال ١٢٢ · الشرطة' : 'Call 122 · Police'}
            </SecondaryButton>
          </div>
        </div>
      );

    /* =====================================================================
     * SH20: Add bank account
     * ===================================================================== */
    case 'SH20':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'إضافة حساب بنكي' : 'Add bank account'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'تحويلات آمنة · يجب أن يكون الحساب باسمك.' : 'Secure payouts · Account must be in your name.'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'اسم صاحب الحساب' : 'Account holder'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'كريم مصطفى' : 'Karim Mostafa'}
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'البنك' : 'Bank'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'البنك الأهلي المصري' : 'National Bank of Egypt'}
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'رقم IBAN المصري' : 'Egyptian IBAN'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              EG•• •••• •••• •••• •••• •••• 2846
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-blue-500">
              {isAr ? 'تم التحقق من صيغة IBAN' : 'IBAN format checked'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'يتكون رقم IBAN المصري من ٢٩ حرفاً ويبدأ بـ EG. يتم إخفاء التفاصيل الكاملة بعد الإدخال.'
                : 'Egypt IBANs contain 29 characters and begin with EG. Full account details are masked after entry; bank verification is still required.'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between text-xs`}>
            <div>
              <p className={`font-extrabold ${colors.text}`}>
                {isAr ? 'استخدام كحساب سحب افتراضي' : 'Use as payout account'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'اختياره لمراجعات السحب المستقبلية' : 'Select for future withdrawal reviews'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setUseAsPayout(!useAsPayout)}
              className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                useAsPayout ? 'bg-emerald-500 justify-end' : 'bg-slate-600 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow" />
            </button>
          </div>

          <PrimaryButton onClick={() => goToSharedScreen('SH14')}>
            {isAr ? 'حفظ الحساب البنكي' : 'Save Bank Account'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SH21: Request account deletion
     * ===================================================================== */
    case 'SH21':
    default:
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'طلب حذف الحساب' : 'Request account deletion'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أحمد محمد · راجع قبل المتابعة' : 'Ahmed Mohamed · Review before continuing'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'ماذا يعني ذلك' : 'What this means'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'سيتم إزالة الوصول إلى ملفك الشخصي ومركباتك المحفوظة وتفضيلاتك الشخصية بعد معالجة الطلب.'
                : 'Access to your profile, saved vehicles and personal preferences will be removed after the request is processed.'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'قد يتم الاحتفاظ بالفواتير وسجلات الدفع والأمان حيثما يقتضي القانون.'
                : 'Invoices, payment and safety records may be retained where legally required. You can ask support about retained data.'}
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-amber-500">
              {isAr ? 'أنهِ الخدمات النشطة أولاً' : 'Resolve active services first'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تمنع الرحلات النشطة والطلبات غير المدفوعة والحجوزات القادمة حذف الحساب.'
                : 'Active trips, unpaid requests and upcoming bookings block deletion. Finish or manage them before submitting.'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs ${colors.text}`}>
              <span>••••••••••••</span>
              <Eye size={14} className={colors.secondaryText} />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className={colors.text}>
              {isAr ? 'أفهم تبعات البيانات والوصول للحساب' : 'I understand the data and access implications'}
            </span>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAuthScreen('A02')}>
              {isAr ? 'طلب حذف الحساب' : 'Request Account Deletion'}
            </PrimaryButton>
            <SecondaryButton onClick={handleBack}>
              {isAr ? 'الإبقاء على حسابي' : 'Keep My Account'}
            </SecondaryButton>
          </div>
        </div>
      );
  }
}
