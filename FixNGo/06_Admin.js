import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Shield,
  CreditCard,
  Search,
  Settings,
  Lock,
  Bell,
  FileText,
  Edit3,
  Phone,
  AlertCircle,
  Copy,
  LogOut,
  Building2
} from 'lucide-react';

export const ADMIN_SCREENS = [
  { id: 'AD01', label: 'AD01 · Platform overview (12,482 users)', labelAr: 'AD01 · نظرة عامة على المنصة (١٢,٤٨٢ مستخدم)', tab: 'Overview' },
  { id: 'AD02', label: 'AD02 · Verification queue (14 pending)', labelAr: 'AD02 · طابور التوثيق (١٤ قيد الانتظار)', tab: 'Verify' },
  { id: 'AD03', label: 'AD03 · Review application (KYC-1042)', labelAr: 'AD03 · مراجعة الطلب (KYC-1042)', tab: 'Verify' },
  { id: 'AD04', label: 'AD04 · User management', labelAr: 'AD04 · إدارة المستخدمين', tab: 'Users' },
  { id: 'AD05', label: 'AD05 · Pricing & settings', labelAr: 'AD05 · التسعير والإعدادات', tab: 'Pricing' },
  { id: 'AD06', label: 'AD06 · Admin profile (Nour El-Sayed)', labelAr: 'AD06 · ملف المشرف (نور السيد)', tab: 'Profile' },
  { id: 'AD07', label: 'AD07 · Payment reviews (3 pending)', labelAr: 'AD07 · مراجعة المدفوعات (٣ قيد الانتظار)', tab: 'Overview' },
  { id: 'AD08', label: 'AD08 · Review payment (FG-2606)', labelAr: 'AD08 · مراجعة دفعة (FG-2606)', tab: 'Overview' },
  { id: 'AD09', label: 'AD09 · Safety reports (SR-108)', labelAr: 'AD09 · بلاغات الأمان (SR-108)', tab: 'Overview' },
  { id: 'AD10', label: 'AD10 · Safety report details', labelAr: 'AD10 · تفاصيل بلاغ الأمان', tab: 'Overview' },
  { id: 'AD11', label: 'AD11 · User details (Ahmed Mohamed)', labelAr: 'AD11 · تفاصيل المستخدم (أحمد محمد)', tab: 'Users' },
  { id: 'AD12', label: 'AD12 · Account access decision', labelAr: 'AD12 · قرار صلاحية الحساب', tab: 'Users' },
  { id: 'AD13', label: 'AD13 · Security & two-factor', labelAr: 'AD13 · الأمان والمصادقة الثنائية', tab: 'Profile' },
  { id: 'AD14', label: 'AD14 · Active sessions', labelAr: 'AD14 · الجلسات النشطة', tab: 'Profile' },
  { id: 'AD15', label: 'AD15 · Verification decision (Omar Adel)', labelAr: 'AD15 · قرار التوثيق (عمر عادل)', tab: 'Verify' }
];

// Main screens corresponding to the 5 bottom navigation tabs (no Back button shown on these)
export const ADMIN_MAIN_SCREENS = ['AD01', 'AD02', 'AD04', 'AD05', 'AD06'];

export const ADMIN_FALLBACK_BACK = {
  AD03: 'AD02',
  AD07: 'AD01',
  AD08: 'AD07',
  AD09: 'AD01',
  AD10: 'AD09',
  AD11: 'AD04',
  AD12: 'AD11',
  AD13: 'AD06',
  AD14: 'AD13',
  AD15: 'AD03'
};

export default function AdminModule({
  adminScreen,
  colors,
  isAr,
  PrimaryButton,
  SecondaryButton,
  goToAdminScreen,
  goToSharedScreen
}) {
  const ForwardChevron = isAr ? ChevronLeft : ChevronRight;
  const [verifyFilter, setVerifyFilter] = useState('All');
  const [userFilter, setUserFilter] = useState('All users');
  const [payFilter, setPayFilter] = useState('Pending');
  const [safetyFilter, setSafetyFilter] = useState('Open');
  const [accessMode, setAccessMode] = useState('Suspend');
  const [kycMode, setKycMode] = useState('Approve');
  const [suspendedMap, setSuspendedMap] = useState({
    ahmed: false,
    karim: false,
    hany: true
  });

  const FallbackSecondary =
    SecondaryButton ||
    (({ children, onClick }) => (
      <button
        onClick={onClick}
        className={`w-full py-3 rounded-2xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}
      >
        {children}
      </button>
    ));

  switch (adminScreen) {
    /* =====================================================================
     * AD01: Platform overview
     * ===================================================================== */
    case 'AD01':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'نظرة عامة على المنصة' : 'Platform overview'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'مساحة المشرف · ٦ نوفمبر ٢٠٢٦' : 'Admin workspace · 6 November 2026'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-base font-extrabold ${colors.text}`}>
                {isAr ? '١٢,٤٨٢' : '12,482'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'إجمالي المستخدمين' : 'Total users'}
              </p>
            </div>
            <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-base font-extrabold ${colors.text}`}>{isAr ? '٣٨' : '38'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'طلبات نشطة' : 'Active requests'}
              </p>
            </div>
            <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-base font-extrabold ${colors.text}`}>{isAr ? '١٤' : '14'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'توثيقات قيد الانتظار' : 'Pending verifications'}
              </p>
            </div>
            <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-base font-extrabold ${colors.text}`}>
                {isAr ? '٢٤٨.٦ ألف' : '248.6k'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'المدفوعات · ج.م' : 'Payments · EGP'}
              </p>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
              {isAr ? '• جميع الأنظمة تعمل بكفاءة' : '• All systems operational'}
            </span>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'طلبات مكتملة اليوم' : 'Requests completed today'}
              </span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '١٨٦' : '186'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'متوسط وقت الاستجابة' : 'Average response time'}
              </span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٤.٢ د' : '4.2 min'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'معدل نجاح المدفوعات' : 'Payment success rate'}
              </span>
              <span className={`font-bold ${colors.text}`}>99.4%</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'يحتاج إلى انتباهك' : 'Needs your attention'}
            </p>
            {[
              {
                icon: CheckCircle2,
                title: isAr ? '١٤ طلب توثيق' : '14 verification applications',
                sub: isAr ? 'أقدم طلب · منذ يومين' : 'Oldest application · 2 days ago',
                target: 'AD02'
              },
              {
                icon: CreditCard,
                title: isAr ? '٣ مراجعات دفع' : '3 payment reviews',
                sub: isAr ? 'تسوية نقدية قيد الانتظار' : 'Cash reconciliation pending',
                target: 'AD07'
              },
              {
                icon: Shield,
                title: isAr ? 'حسابان مُبلّغ عنهما' : '2 reported accounts',
                sub: isAr ? 'مراجعة بلاغات الأمان' : 'Review safety reports',
                target: 'AD09'
              }
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.target}
                  onClick={() => goToAdminScreen(item.target)}
                  className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between text-start`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp size={16} className={colors.secondaryText} />
                    <div>
                      <p className={`text-xs font-extrabold ${colors.text}`}>{item.title}</p>
                      <p className={`text-[10px] ${colors.secondaryText}`}>{item.sub}</p>
                    </div>
                  </div>
                  <ForwardChevron size={14} className={colors.secondaryText} />
                </button>
              );
            })}
          </div>
        </div>
      );

    /* =====================================================================
     * AD02: Verification queue
     * ===================================================================== */
    case 'AD02':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'طابور التوثيق' : 'Verification queue'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? '١٤ طلباً بانتظار المراجعة' : '14 applications waiting for review'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'All', label: isAr ? 'الكل' : 'All' },
              { id: 'Providers', label: isAr ? 'مقدمو الخدمة' : 'Providers' },
              { id: 'Centers', label: isAr ? 'المراكز' : 'Centers' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setVerifyFilter(tab.id)}
                className={`py-2 rounded-xl text-[11px] font-bold border ${
                  verifyFilter === tab.id
                    ? `${colors.border} ${colors.surface} ${colors.text}`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => goToAdminScreen('AD03')}
              className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-2`}
            >
              <div className="flex justify-between text-[11px]">
                <span className={colors.secondaryText}>{isAr ? '٥ نوفمبر ٢٠٢٦' : '5 Nov 2026'}</span>
                <span className={`font-extrabold ${colors.text}`}>
                  {isAr ? 'كابتن ونش' : 'Tow Captain'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-extrabold text-xs">
                  OA
                </div>
                <div>
                  <p className={`text-xs font-extrabold ${colors.text}`}>
                    {isAr ? 'عمر عادل' : 'Omar Adel'}
                  </p>
                  <p className={`text-[11px] ${colors.secondaryText}`}>
                    {isAr ? 'الطلب بانتظار المراجعة' : 'Application awaiting review'}
                  </p>
                </div>
              </div>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr ? 'البطاقة الشخصية · الرخصة · رخصة الونش' : 'National ID · License · Truck registration'}
              </p>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-amber-400">
                {isAr ? '• قيد الانتظار' : '• Pending'}
              </span>
              <div className="w-full h-1 rounded-full bg-slate-500/20 overflow-hidden">
                <div className="w-1/2 h-full bg-red-600" />
              </div>
            </button>

            <button
              onClick={() => goToAdminScreen('AD03')}
              className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-2`}
            >
              <div className="flex justify-between text-[11px]">
                <span className={colors.secondaryText}>{isAr ? '٤ نوفمبر ٢٠٢٦' : '4 Nov 2026'}</span>
                <span className={`font-extrabold ${colors.text}`}>
                  {isAr ? 'مركز خدمة' : 'Service Center'}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-500/15 text-slate-400 flex items-center justify-center">
                  <Building2 size={16} />
                </div>
                <p className={`text-xs font-extrabold ${colors.text}`}>
                  {isAr ? 'كايرو موتور كلينك' : 'Cairo Motor Clinic'}
                </p>
              </div>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr ? 'السجل التجاري · البطاقة الضريبية · صور المركز' : 'Business license · Tax ID · Center photos'}
              </p>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-amber-400">
                {isAr ? '• قيد الانتظار' : '• Pending'}
              </span>
              <div className="w-full h-1 rounded-full bg-slate-500/20 overflow-hidden">
                <div className="w-1/2 h-full bg-red-600" />
              </div>
            </button>
          </div>
        </div>
      );

    /* =====================================================================
     * AD03: Review application (KYC-1042)
     * ===================================================================== */
    case 'AD03':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'مراجعة الطلب' : 'Review application'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'KYC-1042 · تم الإرسال ٥ نوفمبر ٢٠٢٦' : 'KYC-1042 · Submitted 5 November 2026'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-extrabold text-xs">
                OA
              </div>
              <div>
                <p className={`font-extrabold ${colors.text}`}>{isAr ? 'عمر عادل' : 'Omar Adel'}</p>
                <p className={`text-[11px] ${colors.secondaryText}`}>
                  {isAr ? 'كابتن ونش · القاهرة الجديدة' : 'Tow Captain · New Cairo'}
                </p>
              </div>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-500/10">
              <span className={colors.secondaryText}>{isAr ? 'البريد الإلكتروني' : 'Email'}</span>
              <span className={`font-bold ${colors.text}`}>omar.adel@gmail.com</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الهاتف' : 'Phone'}</span>
              <span className={`font-bold ${colors.text}`}>+20 100 245 6789</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'المستندات المقدمة' : 'Submitted documents'}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { title: isAr ? 'البطاقة الشخصية' : 'National ID', sub: '298••••8421' },
                { title: isAr ? 'الرخصة' : 'License', sub: isAr ? 'سارية حتى ٢٠٢٨' : 'Valid to 2028' },
                { title: isAr ? 'تصريح الونش' : 'Truck permit', sub: 'C G M 4829' }
              ].map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSharedScreen('SH17')}
                  className={`p-2 rounded-xl border ${colors.border} ${colors.surface} text-start space-y-1.5`}
                >
                  <div className="h-12 rounded-lg bg-slate-900 text-white p-1.5 flex flex-col justify-between text-[8px]">
                    <span className="text-slate-400">ARAB REPUBLIC OF EGYPT</span>
                    <span className="font-bold">OMAR ADEL</span>
                  </div>
                  <p className={`text-[10px] font-extrabold ${colors.text}`}>{doc.title}</p>
                  <p className={`text-[9px] ${colors.secondaryText}`}>{doc.sub}</p>
                </button>
              ))}
            </div>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr
                ? 'اضغط على أي مستند لفحصه. بيانات الهوية تطابق الطلب.'
                : 'Tap a document to inspect. Identity details match the application.'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'سبب المراجعة / ملاحظة الرفض' : 'Review reason / rejection note'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.secondaryText}`}>
              {isAr ? 'أضف سبباً يظهر للمتقدم...' : 'Add a reason visible to the applicant...'}
            </div>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAdminScreen('AD15')}>
              {isAr ? 'الموافقة على المتقدم' : 'Approve Applicant'}
            </PrimaryButton>
            <button
              onClick={() => goToAdminScreen('AD15')}
              className="w-full py-3 rounded-2xl bg-slate-900 text-white text-xs font-extrabold"
            >
              {isAr ? 'رفض المتقدم' : 'Reject Applicant'}
            </button>
          </div>
        </div>
      );

    /* =====================================================================
     * AD04: User management
     * ===================================================================== */
    case 'AD04':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'إدارة المستخدمين' : 'User management'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? '١٢,٤٨٢ حساب عبر المنصة' : '12,482 accounts across the platform'}
            </p>
          </div>

          <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex items-center justify-between text-xs ${colors.secondaryText}`}>
            <span>{isAr ? 'الاسم أو البريد أو الهاتف' : 'Name, email or phone'}</span>
            <Search size={14} />
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'All users', label: isAr ? 'الكل' : 'All users' },
              { id: 'Providers', label: isAr ? 'مقدمو الخدمة' : 'Providers' },
              { id: 'Suspended', label: isAr ? 'موقوف' : 'Suspended' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setUserFilter(tab.id)}
                className={`py-2 rounded-xl text-[10px] font-bold border ${
                  userFilter === tab.id
                    ? `${colors.border} ${colors.surface} ${colors.text}`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {[
              {
                key: 'ahmed',
                name: isAr ? 'أحمد محمد' : 'Ahmed Mohamed',
                email: 'ahmed.mohamed@gmail.com',
                role: isAr ? 'مالك سيارة' : 'Car Owner'
              },
              {
                key: 'karim',
                name: isAr ? 'كريم مصطفى' : 'Karim Mostafa',
                email: 'karim@fixngo.eg',
                role: isAr ? 'ميكانيكي' : 'Mechanic'
              },
              {
                key: 'hany',
                name: isAr ? 'هاني سمير' : 'Hany Samir',
                email: 'hany.samir@gmail.com',
                role: isAr ? 'كابتن ونش' : 'Tow Captain'
              }
            ].map((u) => {
              const isSusp = suspendedMap[u.key];
              return (
                <div
                  key={u.key}
                  onClick={() => goToAdminScreen('AD11')}
                  className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs cursor-pointer`}
                >
                  <p className={`font-extrabold ${colors.text}`}>{u.name}</p>
                  <p className={`text-[11px] ${colors.secondaryText}`}>{u.email}</p>
                  <div className="flex justify-between">
                    <span className={colors.secondaryText}>{u.role}</span>
                    <span className={`font-bold ${colors.text}`}>
                      {isSusp ? (isAr ? 'موقوف' : 'Suspended') : isAr ? 'موثق' : 'Verified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-[11px] ${colors.secondaryText}`}>
                      {isAr ? 'إيقاف الحساب' : 'Suspend account'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSuspendedMap((prev) => ({ ...prev, [u.key]: !prev[u.key] }));
                      }}
                      className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                        isSusp ? 'bg-emerald-500 justify-end' : 'bg-slate-700 justify-start'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-white shadow" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    /* =====================================================================
     * AD05: Pricing & settings
     * ===================================================================== */
    case 'AD05':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'التسعير والإعدادات' : 'Pricing & settings'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'إعدادات المنصة بالكامل · مصر' : 'Platform-wide configuration · Egypt'}
            </p>
          </div>

          <p className={`text-xs font-extrabold ${colors.text}`}>
            {isAr ? 'التسعير الأساسي' : 'Base pricing'}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'أساسي الونش · ج.م' : 'Tow base · EGP'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>450</span>
                <Edit3 size={12} className={colors.secondaryText} />
              </div>
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الميكانيكي · ج.م' : 'Mechanic · EGP'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>150</span>
                <Edit3 size={12} className={colors.secondaryText} />
              </div>
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'معامل الذروة' : 'Surge multiplier'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>1.0×</span>
                <Edit3 size={12} className={colors.secondaryText} />
              </div>
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'رسوم الخدمة · ج.م' : 'Service fee · EGP'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>50</span>
                <Edit3 size={12} className={colors.secondaryText} />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'تعريفة مسافة السحب · ج.م / كم' : 'Tow distance rate · EGP / km'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
              <span>18.30</span>
              <Edit3 size={12} className={colors.secondaryText} />
            </div>
          </div>

          <p className={`text-xs font-extrabold ${colors.text}`}>
            {isAr ? 'أرقام الطوارئ السريعة' : 'Emergency quick-dial'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الإسعاف' : 'Ambulance'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>123</span>
                <Phone size={12} className={colors.secondaryText} />
              </div>
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الشرطة' : 'Police'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>122</span>
                <Phone size={12} className={colors.secondaryText} />
              </div>
            </div>
          </div>

          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-[11px]`}>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تطبق الإعدادات الجديدة على الطلبات المستقبلية فقط. عروض الأسعار المعتمدة الحالية تبقى دون تغيير.'
                : 'New settings apply to future requests only. Existing approved quotes remain unchanged.'}
            </p>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'آخر تحديث' : 'Last updated'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٦ نوفمبر · المشرف نور' : '6 Nov · Admin Nour'}
              </span>
            </div>
          </div>

          <PrimaryButton onClick={() => goToAdminScreen('AD01')}>
            {isAr ? 'حفظ الإعدادات' : 'Save Settings'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * AD06: Admin profile
     * ===================================================================== */
    case 'AD06':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'الملف الشخصي' : 'Profile'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'مساحة المشرف · ٦ نوفمبر ٢٠٢٦' : 'Admin workspace · 6 November 2026'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center font-extrabold text-xs">
                NE
              </div>
              <div>
                <p className={`font-extrabold ${colors.text}`}>
                  {isAr ? 'نور السيد' : 'Nour El-Sayed'}
                </p>
                <p className={`text-[11px] ${colors.secondaryText}`}>admin@fixngo.eg</p>
              </div>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-500/10">
              <span className={colors.secondaryText}>{isAr ? 'الدور' : 'Role'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'مشرف عام (Super Admin)' : 'Super Admin'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'آخر نشاط' : 'Last active'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'منذ دقيقتين' : '2 min ago'}</span>
            </div>
          </div>

          <div className="space-y-2">
            {[
              {
                icon: Settings,
                title: isAr ? 'إعدادات التطبيق' : 'App settings',
                sub: isAr ? 'اللغة والمظهر والتفضيلات' : 'Language, appearance, and preferences',
                action: () => goToSharedScreen('SH06')
              },
              {
                icon: Lock,
                title: isAr ? 'الأمان' : 'Security',
                sub: isAr ? 'كلمة المرور والمصادقة الثنائية والجلسات' : 'Password, 2FA, and session controls',
                action: () => goToAdminScreen('AD13')
              },
              {
                icon: Bell,
                title: isAr ? 'الإشعارات' : 'Notifications',
                sub: isAr ? 'تنبيهات الدفع والبريد والتوثيق' : 'Push, email, and verification alerts',
                action: () => goToSharedScreen('SH10')
              }
            ].map((row, idx) => {
              const IconComp = row.icon;
              return (
                <button
                  key={idx}
                  onClick={row.action}
                  className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between text-start`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp size={16} className={colors.secondaryText} />
                    <div>
                      <p className={`text-xs font-extrabold ${colors.text}`}>{row.title}</p>
                      <p className={`text-[10px] ${colors.secondaryText}`}>{row.sub}</p>
                    </div>
                  </div>
                  <ForwardChevron size={14} className={colors.secondaryText} />
                </button>
              );
            })}
          </div>
        </div>
      );

    /* =====================================================================
     * AD07: Payment reviews
     * ===================================================================== */
    case 'AD07':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'مراجعات الدفع' : 'Payment reviews'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? '٣ عناصر تسوية معلقة · ٦ نوفمبر ٢٠٢٦' : '3 pending reconciliation items · 6 Nov 2026'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'Pending', label: isAr ? 'معلق (٣)' : 'Pending (3)' },
              { id: 'Resolved', label: isAr ? 'تمت التسوية' : 'Resolved' },
              { id: 'All', label: isAr ? 'الكل' : 'All' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPayFilter(tab.id)}
                className={`py-2 rounded-xl text-[11px] font-bold border ${
                  payFilter === tab.id
                    ? `${colors.border} ${colors.surface} ${colors.text}`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            {[
              {
                id: 'FG-2606 · Cash reconciliation',
                parties: 'Ahmed / Mahmoud',
                amount: '650 EGP',
                note: isAr
                  ? 'أكد الطرفان الدفع النقدي. إيصال الدفع بانتظار المراجعة.'
                  : 'Both parties confirmed cash. Receipt evidence awaits review.'
              },
              {
                id: 'MR-2611 · Cash reconciliation',
                parties: 'Ahmed / Karim',
                amount: '400 EGP',
                note: null
              },
              {
                id: 'FG-2603 · Cash reconciliation',
                parties: 'Omar / Mahmoud',
                amount: '700 EGP',
                note: isAr
                  ? 'إقرار مقدم الخدمة بانتظار مطابقة الإيصال.'
                  : 'Provider declaration awaiting receipt match.'
              }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => goToAdminScreen('AD08')}
                className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-1.5 text-xs`}
              >
                <p className={`font-extrabold ${colors.text}`}>{item.id}</p>
                {idx === 0 && (
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
                    {isAr ? '• بانتظار المراجعة' : '• Pending review'}
                  </span>
                )}
                <div className="flex justify-between">
                  <span className={colors.secondaryText}>
                    {isAr ? 'العميل / مقدم الخدمة' : 'Customer / provider'}
                  </span>
                  <span className={`font-bold ${colors.text}`}>{item.parties}</span>
                </div>
                <div className="flex justify-between">
                  <span className={colors.secondaryText}>
                    {isAr ? 'الإجمالي المسجل' : 'Recorded total'}
                  </span>
                  <span className={`font-bold ${colors.text}`}>{item.amount}</span>
                </div>
                {item.note && <p className={`text-[11px] ${colors.secondaryText}`}>{item.note}</p>}
                <div className="flex justify-between items-center pt-1">
                  <span className={`font-bold ${colors.text}`}>
                    {isAr ? 'مراجعة الدفعة' : 'Review Payment'}
                  </span>
                  <ForwardChevron size={14} className={colors.secondaryText} />
                </div>
              </button>
            ))}
          </div>
        </div>
      );

    /* =====================================================================
     * AD08: Review payment
     * ===================================================================== */
    case 'AD08':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'مراجعة الدفعة' : 'Review payment'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>FG-2606 · INV-2026-2606</p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'نقدي · ٦٥٠ ج.م' : 'Cash · 650 EGP'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'العميل' : 'Customer'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الكابتن' : 'Captain'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'محمود حسن' : 'Mahmoud Hassan'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'أساسي + مسافة + رسوم' : 'Base + distance + service fee'}
              </span>
              <span className={`font-bold ${colors.text}`}>450 + 150 + 50</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? '٦ نوفمبر · الدفع / الإتمام' : '6 Nov · Payment / completed'}
              </span>
              <span className={`font-bold ${colors.text}`}>14:44 / 14:45</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>{isAr ? 'الأدلة' : 'Evidence'}</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'تأكيد العميل · ٦٥٠ ج.م' : 'Customer confirmation · 650 EGP'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'سجل تحصيل الكابتن · ٦٥٠ ج.م' : 'Captain collection record · 650 EGP'}
              </span>
            </div>
            <button
              onClick={() => goToSharedScreen('SH17')}
              className="w-full flex justify-between items-center pt-1.5 border-t border-slate-500/10 text-start"
            >
              <div>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'إثبات الإيصال' : 'Receipt evidence'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'نقدي · ٦٥٠ ج.م · مطابق' : 'Cash · 650 EGP · Matched'}
                </p>
              </div>
              <FileText size={14} className={colors.secondaryText} />
            </button>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ملاحظة التسوية' : 'Reconciliation note'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr ? 'السجلات متطابقة. لا يوجد تعديل للمبلغ.' : 'Records match. No amount adjustment.'}
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-emerald-500">
              {isAr ? 'تمت التسوية · حُفظ التدقيق' : 'Reconciled · Audit saved'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تحقق نور السيد من الأدلة. يظل الإجمالي ٦٥٠ ج.م.'
                : 'Nour El-Sayed verified evidence. Total stays 650 EGP. More evidence leaves review pending.'}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAdminScreen('AD07')}>
              {isAr ? 'تحديد كمسواة' : 'Mark Reconciled'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToAdminScreen('AD07')}>
              {isAr ? 'طلب أدلة إضافية' : 'Request More Evidence'}
            </FallbackSecondary>
          </div>
        </div>
      );

    /* =====================================================================
     * AD09: Safety reports
     * ===================================================================== */
    case 'AD09':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'بلاغات الأمان' : 'Safety reports'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'حسابان مُبلّغ عنهما · راجع قبل اتخاذ إجراء' : '2 reported accounts · Review before acting'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'Open', label: isAr ? 'مفتوح (٢)' : 'Open (2)' },
              { id: 'Escalated', label: isAr ? 'مُصعّد' : 'Escalated' },
              { id: 'Closed', label: isAr ? 'مغلق' : 'Closed' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSafetyFilter(tab.id)}
                className={`py-2 rounded-xl text-[11px] font-bold border ${
                  safetyFilter === tab.id
                    ? `${colors.border} ${colors.surface} ${colors.text}`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-2.5">
            <button
              onClick={() => goToAdminScreen('AD10')}
              className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-1.5 text-xs`}
            >
              <p className={`font-extrabold ${colors.text}`}>
                {isAr ? 'SR-108 · ملاحظة سلوكية' : 'SR-108 · Conduct concern'}
              </p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
                {isAr ? '• بانتظار المراجعة' : '• Awaiting review'}
              </span>
              <div className="flex justify-between">
                <span className={colors.secondaryText}>
                  {isAr ? 'الحساب المُبلّغ عنه' : 'Reported account'}
                </span>
                <span className={`font-bold ${colors.text}`}>{isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}</span>
              </div>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr
                  ? 'FG-2606 · أُرسل ٦ نوفمبر، ١٤:٥٠ — يطلب المبلّغ مراجعة محادثة الرحلة.'
                  : 'FG-2606 · Submitted 6 Nov, 14:50 — Reporter asks for a review of the trip conversation. No account action taken.'}
              </p>
              <div className="flex justify-between items-center pt-1">
                <span className={`font-bold ${colors.text}`}>
                  {isAr ? 'مراجعة بلاغ الأمان' : 'Review Safety Report'}
                </span>
                <ForwardChevron size={14} className={colors.secondaryText} />
              </div>
            </button>

            <button
              onClick={() => goToAdminScreen('AD10')}
              className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-1.5 text-xs`}
            >
              <p className={`font-extrabold ${colors.text}`}>
                {isAr ? 'SR-109 · سلوك مقدم الخدمة' : 'SR-109 · Provider conduct'}
              </p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
                {isAr ? '• بانتظار المراجعة' : '• Awaiting review'}
              </span>
              <div className="flex justify-between">
                <span className={colors.secondaryText}>
                  {isAr ? 'الحساب المُبلّغ عنه' : 'Reported account'}
                </span>
                <span className={`font-bold ${colors.text}`}>{isAr ? 'هاني سمير' : 'Hany Samir'}</span>
              </div>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr ? 'أُرسل ٦ نوفمبر، ١٥:١٠ · مرفق أدلة' : 'Submitted 6 Nov, 15:10 · Evidence attached'}
              </p>
              <div className="flex justify-between items-center pt-1">
                <span className={`font-bold ${colors.text}`}>
                  {isAr ? 'مراجعة بلاغ الأمان' : 'Review Safety Report'}
                </span>
                <ForwardChevron size={14} className={colors.secondaryText} />
              </div>
            </button>
          </div>

          <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-blue-500">
              {isAr ? 'اعتمد على الأدلة وليس الافتراضات' : 'Use evidence, not assumptions'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'البلاغات هي ادعاءات وليست نتائج نهائية. يتطلب التصعيد أو الحفظ ملاحظة تدقيق.'
                : 'Reports are allegations, not findings. Escalation and dismissal require an audit note.'}
            </p>
          </div>
        </div>
      );

    /* =====================================================================
     * AD10: Safety report details
     * ===================================================================== */
    case 'AD10':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تفاصيل بلاغ الأمان' : 'Safety report details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>SR-108 · FG-2606 · 6 Nov 2026</p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'ملاحظة سلوكية' : 'Conduct concern'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المستخدم المُبلّغ عنه' : 'Reported user'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المُبلّغ' : 'Reporter'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'محمود حسن' : 'Mahmoud Hassan'}</span>
            </div>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'محادثة نقطة الالتقاء تحتاج لمراجعة.' : 'Pickup conversation needs review.'}
            </p>
            <button
              onClick={() => goToAdminScreen('AD11')}
              className="w-full flex justify-between items-center pt-1.5 border-t border-slate-500/10"
            >
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'عرض حساب المستخدم' : 'View User Account'}
              </span>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'الأدلة التي تمت مراجعتها' : 'Evidence reviewed'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? '١٤:٠٤ · طلب الكابتن علامة مميزة للموقع.' : '14:04 · Captain asked for pickup landmark.'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? '١٤:٠٥ · أكد العميل سيارة إلنترا رمادية.' : '14:05 · Customer confirmed gray Elantra.'}
            </p>
            <p className={`text-[10px] ${colors.secondaryText} pt-1`}>
              {isAr ? 'هذا المقتطف وحده لا يثبت وجود تهديد.' : 'This excerpt alone does not establish a threat.'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ملاحظة المراجعة · مطلوبة' : 'Review note · Required'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr
                ? 'نحتاج السياق الكامل قبل فرض أي تقييد على الحساب.'
                : 'Need the full context before any account restriction.'}
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-amber-500">
              {isAr ? 'تم التصعيد لفريق الأمان' : 'Escalated to safety team'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تظل المراجعة مفتوحة. الإغلاق يحفظ ملاحظتك ولا يوقف الحساب تلقائياً.'
                : 'Review stays open. Dismiss closes with your note. Neither action suspends the account.'}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAdminScreen('AD09')}>
              {isAr ? 'تصعيد لمراجعة الأمان' : 'Escalate for Safety Review'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToAdminScreen('AD09')}>
              {isAr ? 'حفظ وإغلاق البلاغ' : 'Dismiss Report'}
            </FallbackSecondary>
          </div>
        </div>
      );

    /* =====================================================================
     * AD11: User details
     * ===================================================================== */
    case 'AD11':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تفاصيل المستخدم' : 'User details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أحمد محمد · مالك سيارة' : 'Ahmed Mohamed · Car Owner'}
            </p>
          </div>

          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
            {isAr ? '• موثق · حساب نشط' : '• Verified · Active account'}
          </span>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'الحساب والتواصل' : 'Account & contact'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>ahmed.mohamed@gmail.com</p>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'الهاتف' : 'Phone'}</span>
              <span className={`font-bold ${colors.text}`}>+20 100 123 4567</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'البريد موثق' : 'Email verified'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'نعم' : 'Yes'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المركبات' : 'Vehicles'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'هيونداي إلنترا · كيا سبورتاج' : 'Hyundai Elantra · Kia Sportage'}
              </span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'نشاط الخدمة الأخير' : 'Recent service activity'}
            </p>
            <button
              onClick={() => goToAdminScreen('AD08')}
              className="w-full flex justify-between items-center text-start py-1"
            >
              <div>
                <p className={`font-bold ${colors.text}`}>FG-2606 · Flatbed Tow</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? '٦ نوفمبر · مكتمل · ٦٥٠ ج.م نقدي' : '6 Nov · Completed · 650 EGP cash'}
                </p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
            <div className="flex justify-between items-center py-1 border-t border-slate-500/10">
              <div>
                <p className={`font-bold ${colors.text}`}>BK-2048 · Oil & filter change</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? '٧ نوفمبر · مؤكد · نايل أوتو كير' : '7 Nov · Confirmed · Nile Auto Care'}
                </p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </div>
            <button
              onClick={() => goToAdminScreen('AD10')}
              className="w-full flex justify-between items-center text-start py-1 border-t border-slate-500/10"
            >
              <div>
                <p className={`font-bold ${colors.text}`}>Safety report SR-108</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'قيد المراجعة · لم يطبق أي تقييد' : 'Under review · No restriction applied'}
                </p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAdminScreen('AD12')}>
              {isAr ? 'إيقاف / استعادة الحساب' : 'Suspend / Restore Account'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToAdminScreen('AD04')}>
              {isAr ? 'العودة للمستخدمين' : 'Back to Users'}
            </FallbackSecondary>
          </div>
        </div>
      );

    /* =====================================================================
     * AD12: Account access decision
     * ===================================================================== */
    case 'AD12':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'قرار صلاحية الحساب' : 'Account access decision'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أحمد محمد · تأكيد إداري' : 'Ahmed Mohamed · Administrative confirmation'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'Suspend', label: isAr ? 'إيقاف الحساب' : 'Suspend account' },
              { id: 'Restore', label: isAr ? 'استعادة الحساب' : 'Restore account' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setAccessMode(tab.id)}
                className={`py-2 rounded-xl text-[11px] font-bold border ${
                  accessMode === tab.id
                    ? `${colors.border} ${colors.surface} ${colors.text}`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'السبب · مطلوب' : 'Reason · Required'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'تقييد مؤقت لحين مراجعة الأمان' : 'Temporary restriction pending safety review'}
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ملاحظة التدقيق الداخلي · مطلوبة' : 'Internal audit note · Required'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr
                ? 'تمت مراجعة SR-108. يلزم موافقة مسؤول الأمان قبل تطبيق التقييد.'
                : 'Reviewed SR-108. Safety lead approval required before applying a restriction.'}
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'قبل التأكيد' : 'Before you confirm'}
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr
                  ? 'راجعت الأدلة وحالة الرحلة النشطة'
                  : 'I reviewed the evidence and active-trip status'}
              </span>
            </div>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr
                ? 'يمنع الإيقاف الطلبات الجديدة وتسجيل الدخول. لا تقاطع رحلة نشطة دون تسليم آمن.'
                : 'Suspension blocks new requests and sign-ins. Do not interrupt an active trip without a safety handover. Restore re-enables access.'}
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-blue-500">
              {isAr ? 'تم تسجيل القرار' : 'Decision recorded'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'عند التأكيد، يتم حفظ حالة الوصول والسبب وإشعار المستخدم وتسجيل اسم نور السيد في سجل التدقيق.'
                : 'On confirmation, the selected access state and reason are saved, the user is notified, and an audit entry names Nour El-Sayed.'}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAdminScreen('AD04')}>
              {isAr ? 'تأكيد قرار الحساب' : 'Confirm Account Decision'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToAdminScreen('AD11')}>
              {isAr ? 'إلغاء' : 'Cancel'}
            </FallbackSecondary>
          </div>
        </div>
      );

    /* =====================================================================
     * AD13: Security & two-factor
     * ===================================================================== */
    case 'AD13':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'الأمان والمصادقة الثنائية' : 'Security & two-factor'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>Nour El-Sayed · admin@fixngo.eg</p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5 text-xs`}>
            <button
              onClick={() => goToSharedScreen('SH02')}
              className="w-full flex justify-between items-center text-start"
            >
              <div>
                <p className={`font-extrabold ${colors.text}`}>
                  {isAr ? 'تغيير كلمة المرور' : 'Change password'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'تحديث كلمة مرور المشرف' : 'Update your administrator password'}
                </p>
              </div>
              <Lock size={14} className={colors.secondaryText} />
            </button>
            <button
              onClick={() => goToAdminScreen('AD14')}
              className="w-full flex justify-between items-center text-start pt-2 border-t border-slate-500/10"
            >
              <div>
                <p className={`font-extrabold ${colors.text}`}>
                  {isAr ? 'الجلسات النشطة' : 'Active sessions'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'مراجعة الأجهزة وإلغاء الوصول' : 'Review devices and revoke access'}
                </p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'إعداد تطبيق المصادقة' : 'Set up an authenticator'}
            </p>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
              {isAr ? '• الإعداد قيد التنفيذ' : '• Setup in progress'}
            </span>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? '١. أضف FixNGo إلى تطبيق المصادقة الخاص بك.' : '1. Add FixNGo to your authenticator.'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? '٢. أدخل مفتاح الإعداد الخاص بك.' : '2. Enter your private setup key.'}
            </p>
            <div className={`p-2.5 rounded-xl border ${colors.border} flex justify-between items-center`}>
              <span className={`font-mono font-bold ${colors.text}`}>•••• •••• •••• ••••</span>
              <Copy size={13} className={colors.secondaryText} />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'رمز المصادقة المكون من ٦ أرقام' : 'Six-digit authenticator code'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
              <span>284106</span>
              <CheckCircle2 size={14} className="text-emerald-500" />
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-emerald-500">
              {isAr ? 'تم تفعيل المصادقة الثنائية' : 'Two-factor enabled'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تم التحقق من الرمز. احفظ رموز الاسترداد بأمان.'
                : 'Code verified. Save recovery codes securely. Admin sign-ins now require your authenticator.'}
            </p>
          </div>

          <PrimaryButton onClick={() => goToAdminScreen('AD14')}>
            {isAr ? 'تحقق وفعل المصادقة' : 'Verify & Enable Authenticator'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * AD14: Active sessions
     * ===================================================================== */
    case 'AD14':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'الجلسات النشطة' : 'Active sessions'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نور السيد · أمان الحساب' : 'Nour El-Sayed · Account security'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>iPhone · FixNGo iOS</p>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
              {isAr ? '• الجلسة الحالية' : '• Current session'}
            </span>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الموقع' : 'Location'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'آخر نشاط' : 'Last active'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'الآن · ٦ نوفمبر ٢٠٢٦' : 'Now · 6 Nov 2026'}
              </span>
            </div>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'تظل هذه الجلسة قيد تسجيل الدخول.' : 'This session stays signed in.'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>Chrome · Windows</p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الموقع' : 'Location'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'آخر نشاط' : 'Last active'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٦ نوفمبر · ٠٩:٢٠' : '6 Nov · 09:20'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1.5 border-t border-slate-500/10">
              <div>
                <p className="font-bold text-red-500">
                  {isAr ? 'إلغاء هذه الجلسة' : 'Revoke this session'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'طلب تسجيل دخول جديد على هذا الجهاز' : 'Require a new sign-in on this device'}
                </p>
              </div>
              <LogOut size={14} className="text-red-500" />
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-amber-500 flex items-center gap-1">
              <AlertCircle size={13} />
              <span>{isAr ? 'إلغاء جلسة Chrome على Windows؟' : 'Revoke Chrome on Windows?'}</span>
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'سيتم تسجيل الخروج من الجهاز المحدد وستظل جلسة iPhone الحالية نشطة.'
                : 'The selected device will be signed out. Your current iPhone session will remain active.'}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAdminScreen('AD06')}>
              {isAr ? 'إلغاء الجلسة الأخرى' : 'Revoke Other Session'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToAdminScreen('AD13')}>
              {isAr ? 'الإبقاء على الجلسة' : 'Keep Session'}
            </FallbackSecondary>
          </div>
        </div>
      );

    /* =====================================================================
     * AD15: Verification decision
     * ===================================================================== */
    case 'AD15':
    default:
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'قرار التوثيق' : 'Verification decision'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'KYC-1042 · عمر عادل · كابتن ونش' : 'KYC-1042 · Omar Adel · Tow Captain'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {[
              { id: 'Approve', label: isAr ? 'موافقة' : 'Approve' },
              { id: 'Reject', label: isAr ? 'رفض / تعديلات' : 'Reject / changes' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setKycMode(tab.id)}
                className={`py-2 rounded-xl text-[11px] font-bold border ${
                  kycMode === tab.id
                    ? `${colors.border} ${colors.surface} ${colors.text}`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'مراجعة المتقدم' : 'Applicant review'}
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'تم فحص بيانات الهوية والتواصل' : 'Identity and contact details checked'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'تمت مراجعة رخصة القيادة وتصريح الونش' : 'Driving license and truck registration reviewed'}
              </span>
            </div>
            <button
              onClick={() => goToSharedScreen('SH17')}
              className="w-full flex justify-between items-center pt-1.5 border-t border-slate-500/10 text-start"
            >
              <div>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'فحص المستندات المقدمة' : 'Inspect submitted documents'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'عارض المستندات · مراجعة البيانات' : 'Document viewer · Review metadata'}
                </p>
              </div>
              <FileText size={14} className={colors.secondaryText} />
            </button>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'سبب القرار · مطلوب' : 'Decision reason · Required'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'تم التحقق من بيانات الهوية والونش.' : 'Identity and truck details verified.'}
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'إشعار المتقدم' : 'Applicant notification'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'تمت الموافقة: تم توثيق حسابك. يمكنك بدء تلقي الطلبات.' : "Approved: You're verified. Begin dispatch."}
            </p>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr
                ? 'في حالة الرفض يظهر السبب ومسار إعادة التقديم لعمر.'
                : 'Rejection shows your reason and a resubmit path to Omar.'}
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-emerald-500">
              {isAr ? 'تم حفظ القرار · أُبلغ المتقدم' : 'Decision saved · Applicant notified'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'KYC-1042 · نور السيد · ٦ نوفمبر ٢٠٢٦. تم تسجيل النتيجة والسبب في سجل التدقيق.'
                : 'KYC-1042 · Nour El-Sayed · 6 Nov 2026. Outcome and reason recorded in the audit trail.'}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToAdminScreen('AD02')}>
              {isAr ? 'تأكيد القرار' : 'Confirm Decision'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToAdminScreen('AD03')}>
              {isAr ? 'العودة للطلب' : 'Back to Application'}
            </FallbackSecondary>
          </div>
        </div>
      );
  }
}
