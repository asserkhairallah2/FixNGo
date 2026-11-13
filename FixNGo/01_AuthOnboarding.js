import React from 'react';
import {
  Shield,
  MapPin,
  Eye,
  EyeOff,
  Mail,
  KeyRound
} from 'lucide-react';

export const AUTH_SCREENS = [
  { id: 'A01', label: 'A01 · Splash Screen', labelAr: 'A01 · شاشة البداية' },
  { id: 'A02', label: 'A02 · Onboarding (Get Started)', labelAr: 'A02 · الترحيب (ابدأ الآن)' },
  { id: 'A03', label: 'A03 · Welcome back (Login)', labelAr: 'A03 · تسجيل الدخول' },
  { id: 'A04', label: 'A04 · Create your account (Sign Up)', labelAr: 'A04 · إنشاء حساب جديد' },
  { id: 'A05', label: 'A05 · Check your inbox (OTP)', labelAr: 'A05 · رمز التحقق (OTP)' },
  { id: 'A06', label: 'A06 · Forgot password?', labelAr: 'A06 · نسيت كلمة المرور؟' },
  { id: 'A07', label: 'A07 · Set a new password', labelAr: 'A07 · تعيين كلمة مرور جديدة' },
  { id: 'A08', label: 'A08 · Join as a mechanic (Step 2/2)', labelAr: 'A08 · الانضمام كميكانيكي (خطوة 2/2)' },
  { id: 'A09', label: 'A09 · Join as a tow captain (Step 2/2)', labelAr: 'A09 · الانضمام ككابتن ونش (خطوة 2/2)' },
  { id: 'A10', label: 'A10 · Register your center (Step 2/2)', labelAr: 'A10 · تسجيل مركز خدمة (خطوة 2/2)' },
  { id: 'A11', label: 'A11 · Application status (KYC-1042)', labelAr: 'A11 · حالة الطلب (KYC-1042)' },
  { id: 'A12', label: 'A12 · Find help near you (Location)', labelAr: 'A12 · تحديد الموقع الجغرافي' },
  { id: 'A13', label: 'A13 · Password updated', labelAr: 'A13 · تم تحديث كلمة المرور' }
];

export const AUTH_MAIN_SCREENS = ['A01', 'A02'];

export const AUTH_FALLBACK_BACK = {
  A03: 'A02',
  A04: 'A02',
  A05: 'A03',
  A06: 'A03',
  A07: 'A06',
  A08: 'A04',
  A09: 'A04',
  A10: 'A04',
  A11: 'A04',
  A12: 'A04',
  A13: 'A03'
};

export default function AuthOnboardingModule({
  authScreen,
  authForm,
  setAuthForm,
  colors,
  isAr,
  NIGHT_CAR_IMAGE,
  FixNGoShieldLogo,
  AppTopBar,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  goToAuthScreen,
  goToOwnerScreen,
  goToSharedScreen,
  applyPresetAndFill,
  handleLoginSubmit,
  handleSignupSubmit,
  handleForgotSubmit,
  handleOtpVerifySuccess,
  handleBack,
  showBack
}) {
  switch (authScreen) {
    case 'A01':
      return (
        <div className={`min-h-[740px] flex flex-col items-center justify-between p-6 ${colors.bg}`}>
          <div />
          <div className="flex flex-col items-center">
            <div className="w-44 h-44 rounded-full bg-[#E51C23]/5 border border-[#E51C23]/15 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-[#E51C23]/10 flex flex-col items-center justify-center gap-2">
                <FixNGoShieldLogo size={64} />
                <span className={`text-xl font-black italic ${colors.text}`} dir="ltr">
                  Fix<span className="text-[#FF0000]">N</span>Go
                </span>
              </div>
            </div>
            <p className={`mt-5 text-[10px] tracking-[0.2em] uppercase font-semibold ${colors.secondaryText}`}>
              {isAr ? 'نعود إلى الطريق.. معاً' : 'BACK ON THE ROAD. TOGETHER.'}
            </p>
          </div>
          <div className="w-full space-y-2 text-center">
            <PrimaryButton onClick={() => goToAuthScreen('A02')}>
              {isAr ? 'متابعة' : 'Continue'}
            </PrimaryButton>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ثقة وأمان على الطريق ٢٤/٧' : 'Roadside confidence, 24/7'}
            </p>
          </div>
        </div>
      );

    case 'A02':
    default:
      return (
        <div className={`min-h-[740px] flex flex-col justify-between ${colors.bg}`}>
          <AppTopBar showBack={false} />
          <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="w-full h-56 rounded-2xl overflow-hidden border border-white/10 shadow-md relative">
                <img src={NIGHT_CAR_IMAGE} alt="FixNGo Car" className="w-full h-full object-cover" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E51C23]/15 border border-[#E51C23]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E51C23]" />
                <span className="text-[10px] font-semibold text-[#E51C23]">
                  {isAr ? 'مساعدة على الطريق ٢٤/٧' : '24/7 roadside assistance'}
                </span>
              </div>
              <div className="space-y-1.5">
                <h1 className={`text-2xl font-extrabold leading-tight ${colors.text}`}>
                  {isAr ? (
                    <>
                      مشكلة بسيطة؟
                      <br />
                      دعم كبير في انتظارك.
                    </>
                  ) : (
                    <>
                      A little trouble.
                      <br />A lot of backup.
                    </>
                  )}
                </h1>
                <p className={`text-xs leading-relaxed ${colors.secondaryText}`}>
                  {isAr
                    ? 'ميكانيكيون معتمدون، كباتن أوناش ومراكز خدمة موثوقة أينما يأخذك الطريق.'
                    : 'Trusted mechanics, tow captains and service centers. Wherever the road takes you.'}
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-5 h-1 rounded-full bg-[#E51C23]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500/40" />
              </div>
            </div>
            <div className="space-y-2.5">
              <PrimaryButton onClick={() => goToAuthScreen('A04')}>
                {isAr ? 'ابدأ الآن' : 'Get Started'}
              </PrimaryButton>
              <div className="text-center">
                <button onClick={() => goToAuthScreen('A03')} className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
                  <span className="text-[#E51C23] font-semibold">
                    {isAr ? 'تسجيل الدخول' : 'Log In'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'A03':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
            <div className="space-y-3.5">
              <div>
                <h1 className={`text-xl font-bold ${colors.text}`}>
                  {isAr ? 'مرحباً بعودتك' : 'Welcome back'}
                </h1>
                <p className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'طريقك آمن مع دعمنا الموثوق.' : 'Your road. Your reliable backup.'}
                </p>
              </div>
              <div className="w-full h-32 rounded-2xl overflow-hidden border border-white/10">
                <img src={NIGHT_CAR_IMAGE} alt="Car" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <label className={`text-[11px] font-medium ${colors.secondaryText}`}>
                  {isAr ? 'البريد الإلكتروني' : 'Email address'}
                </label>
                <div className={`flex items-center justify-between px-3.5 h-11 rounded-xl border ${colors.border} ${colors.inputBg}`}>
                  <input
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    className={`bg-transparent text-xs w-full focus:outline-none ${colors.text}`}
                  />
                  <Mail size={14} className={colors.secondaryText} />
                </div>
              </div>
              <div className="space-y-1">
                <label className={`text-[11px] font-medium ${colors.secondaryText}`}>
                  {isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <div className={`flex items-center justify-between px-3.5 h-11 rounded-xl border ${colors.border} ${colors.inputBg}`}>
                  <input
                    type={authForm.showPassword ? 'text' : 'password'}
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    className={`bg-transparent text-xs w-full focus:outline-none ${colors.text}`}
                  />
                  <button
                    type="button"
                    onClick={() => setAuthForm({ ...authForm, showPassword: !authForm.showPassword })}
                  >
                    {authForm.showPassword ? (
                      <Eye size={14} className={colors.secondaryText} />
                    ) : (
                      <EyeOff size={14} className={colors.secondaryText} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr
                    ? 'وصول آمن لمركباتك ورحلاتك وحجوزاتك.'
                    : 'Secure access to your vehicles, trips and bookings.'}
                </span>
                <button
                  onClick={() => goToAuthScreen('A06')}
                  className="text-xs font-semibold text-[#E51C23] shrink-0"
                >
                  {isAr ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <PrimaryButton onClick={handleLoginSubmit}>
                {isAr ? 'تسجيل الدخول' : 'Login'}
              </PrimaryButton>
              <SecondaryButton onClick={handleLoginSubmit}>
                {isAr ? 'المتابعة باستخدام Google' : 'Continue with Google'}
              </SecondaryButton>
              <div className="text-center">
                <button onClick={() => goToAuthScreen('A04')} className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'جديد في FixNGo؟ ' : 'New to FixNGo? '}
                  <span className="text-[#E51C23] font-semibold">
                    {isAr ? 'إنشاء حساب' : 'Sign Up'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'A04':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div>
                <h1 className={`text-xl font-bold ${colors.text}`}>
                  {isAr ? 'إنشاء حسابك' : 'Create your account'}
                </h1>
                <p className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'انضم إلى تجربة أفضل للمساعدة على الطريق.' : 'Join a better roadside experience.'}
                </p>
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'الاسم الكامل' : 'Full name'}
                </label>
                <input
                  value={authForm.fullName}
                  onChange={(e) => setAuthForm({ ...authForm, fullName: e.target.value })}
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'البريد الإلكتروني' : 'Email address'}
                </label>
                <input
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'تأكيد كلمة المرور' : 'Confirm password'}
                </label>
                <input
                  type="password"
                  defaultValue="••••••••••••"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div className="space-y-1.5 pt-1">
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'أنضم بصفتي' : 'I am joining as'}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'carOwner', label: isAr ? 'مالك سيارة' : 'Car Owner' },
                    { id: 'mechanic', label: isAr ? 'ميكانيكي' : 'Mechanic' },
                    { id: 'towCaptain', label: isAr ? 'كابتن ونش' : 'Tow Captain' },
                    { id: 'serviceCenter', label: isAr ? 'مركز خدمة' : 'Service Center' }
                  ].map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setAuthForm({ ...authForm, signupRole: r.id });
                        applyPresetAndFill(r.id);
                      }}
                      className={`py-2 px-2 rounded-xl text-[11px] font-semibold border transition ${
                        authForm.signupRole === r.id
                          ? 'border-[#E51C23] bg-[#E51C23]/15 text-[#E51C23]'
                          : `${colors.border} ${colors.surface} ${colors.secondaryText}`
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <PrimaryButton onClick={handleSignupSubmit}>
                {isAr ? 'إنشاء الحساب' : 'Create Account'}
              </PrimaryButton>
              <div className="text-center">
                <button onClick={() => goToAuthScreen('A03')} className={`text-[11px] ${colors.secondaryText}`}>
                  {isAr ? 'مسجل بالفعل؟ ' : 'Already registered? '}
                  <span className="text-[#E51C23] font-semibold">
                    {isAr ? 'تسجيل الدخول' : 'Log In'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );

    case 'A05':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h1 className={`text-xl font-bold ${colors.text}`}>
                  {isAr ? 'تحقق من بريدك الوارد' : 'Check your inbox'}
                </h1>
                <p className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'أرسلنا رمزاً مكوناً من ٦ أرقام إلى بريدك الإلكتروني.' : 'We sent a six-digit code to your email.'}
                </p>
              </div>
              <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5`}>
                <Mail size={18} className="text-[#E51C23]" />
                <p className={`text-xs font-bold ${colors.text}`}>{authForm.email}</p>
                <p className={`text-[11px] ${colors.secondaryText}`}>
                  {isAr
                    ? 'أدخل الرمز أدناه لتأكيد حسابك.'
                    : 'Enter the code below to verify your account.'}
                </p>
              </div>
              <div className="grid grid-cols-6 gap-2" dir="ltr">
                {authForm.otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const next = [...authForm.otpDigits];
                      next[idx] = e.target.value;
                      setAuthForm({ ...authForm, otpDigits: next });
                    }}
                    className={`h-11 rounded-xl text-center font-bold text-sm border ${
                      idx === 5 ? 'border-[#E51C23]' : colors.border
                    } ${colors.surface} ${colors.text}`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs">
                <span className={colors.secondaryText}>
                  {isAr ? 'ينتهي الرمز خلال' : 'Code expires in'}
                </span>
                <span className={`font-bold ${colors.text}`}>02:00</span>
              </div>
              <button className="text-xs font-bold text-[#E51C23]">
                {isAr ? 'إعادة إرسال الرمز' : 'Resend OTP'}
              </button>
            </div>
            <PrimaryButton onClick={handleOtpVerifySuccess}>
              {isAr ? 'تأكيد البريد الإلكتروني' : 'Verify Email'}
            </PrimaryButton>
          </div>
        </div>
      );

    case 'A06':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h1 className={`text-xl font-bold ${colors.text}`}>
                  {isAr ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                </h1>
                <p className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'دعنا نساعدك في استعادة حسابك.' : "Let's get you back into your account."}
                </p>
              </div>
              <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5`}>
                <KeyRound size={18} className="text-[#E51C23]" />
                <p className={`text-xs font-bold ${colors.text}`}>
                  {isAr ? 'بداية جديدة بأمان.' : 'A fresh start, securely.'}
                </p>
                <p className={`text-[11px] ${colors.secondaryText}`}>
                  {isAr
                    ? 'أدخل بريدك الإلكتروني المسجل وسنرسل لك رابط إعادة التعيين ورمز التحقق.'
                    : "Enter your registered email and we'll send a reset link and verification code."}
                </p>
              </div>
              <div className="space-y-1">
                <label className={`text-[11px] ${colors.secondaryText}`}>
                  {isAr ? 'البريد الإلكتروني' : 'Email address'}
                </label>
                <input
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  className={`w-full px-3.5 h-11 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
            </div>
            <PrimaryButton onClick={handleForgotSubmit}>
              {isAr ? 'إرسال رابط إعادة التعيين' : 'Send Reset Link'}
            </PrimaryButton>
          </div>
        </div>
      );

    case 'A07':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h1 className={`text-xl font-bold ${colors.text}`}>
                  {isAr ? 'تعيين كلمة مرور جديدة' : 'Set a new password'}
                </h1>
                <p className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'حافظ على أمان حسابك وبياناتك.' : 'Keep your account and roadside details safe.'}
                </p>
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'رمز التحقق' : 'Verification code'}
                </label>
                <input
                  defaultValue="284106"
                  className={`w-full px-3.5 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'كلمة المرور الجديدة' : 'New password'}
                </label>
                <input
                  type="password"
                  defaultValue="NewPass@2026"
                  className={`w-full px-3.5 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div className="space-y-1">
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'تأكيد كلمة المرور الجديدة' : 'Confirm new password'}
                </label>
                <input
                  type="password"
                  defaultValue="NewPass@2026"
                  className={`w-full px-3.5 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-[11px]`}>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'اجعل كلمة المرور قوية' : 'Make it a strong one'}
                </p>
                <p className="text-emerald-400">
                  {isAr ? '✓ ٨ أحرف على الأقل' : '✓ At least 8 characters'}
                </p>
                <p className="text-emerald-400">
                  {isAr ? '✓ حرف كبير ورقم ورمز' : '✓ Uppercase, number & symbol'}
                </p>
              </div>
            </div>
            <PrimaryButton onClick={() => goToAuthScreen('A13')}>
              {isAr ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
            </PrimaryButton>
          </div>
        </div>
      );

    case 'A08':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h1 className={`text-xl font-bold ${colors.text}`}>
                  {isAr ? 'الانضمام كميكانيكي' : 'Join as a mechanic'}
                </h1>
                <p className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'البيانات المهنية · خطوة ٢ من ٢' : 'Professional details · Step 2 of 2'}
                </p>
              </div>
              <input
                defaultValue={isAr ? 'كريم مصطفى' : 'Karim Mostafa'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  defaultValue="+20 100 345 6789"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
                <input
                  defaultValue={isAr ? '٨ سنوات خبرة' : '8 years'}
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'تخصصاتك' : 'Your expertise'}
                </p>
                <p className="text-emerald-400">
                  {isAr ? '✓ تشخيص الأعطال المتنقل' : '✓ Mobile diagnostics'}
                </p>
                <p className="text-emerald-400">
                  {isAr ? '✓ شحن البطارية وتغيير الإطارات' : '✓ Battery jump & tire change'}
                </p>
              </div>
              <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'المستندات' : 'Credentials'}
                </p>
                <p className={colors.secondaryText}>
                  {isAr ? 'البطاقة الشخصية والشهادة المهنية · مرفقة' : 'National ID & professional certificate · Attached'}
                </p>
              </div>
            </div>
            <PrimaryButton onClick={() => goToAuthScreen('A11')}>
              {isAr ? 'إرسال الطلب' : 'Submit Application'}
            </PrimaryButton>
          </div>
        </div>
      );

    case 'A09':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h1 className={`text-xl font-bold ${colors.text}`}>
                  {isAr ? 'الانضمام ككابتن ونش' : 'Join as a tow captain'}
                </h1>
                <p className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'بيانات الونش والمستندات · خطوة ٢ من ٢' : 'Your truck & credentials · Step 2 of 2'}
                </p>
              </div>
              <input
                defaultValue={isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
              <input
                defaultValue={isAr ? 'إيسوزو · ونش سطحة' : 'Isuzu · Flatbed'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  defaultValue={isAr ? '٣.٥ طن' : '3.5 tonnes'}
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
                <input
                  defaultValue="C R T 9087"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
            </div>
            <PrimaryButton onClick={() => goToAuthScreen('A11')}>
              {isAr ? 'إرسال الطلب' : 'Submit Application'}
            </PrimaryButton>
          </div>
        </div>
      );

    case 'A10':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h1 className={`text-xl font-bold ${colors.text}`}>
                  {isAr ? 'تسجيل مركز الخدمة' : 'Register your center'}
                </h1>
                <p className={`text-xs ${colors.secondaryText}`}>
                  {isAr ? 'بيانات المركز · خطوة ٢ من ٢' : 'Business details · Step 2 of 2'}
                </p>
              </div>
              <input
                defaultValue={isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
              <input
                defaultValue={isAr ? 'التجمع الخامس، القاهرة الجديدة' : 'Fifth Settlement, New Cairo'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
              <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'الخدمات المقدمة' : 'Services offered'}
                </p>
                <p className="text-emerald-400">
                  {isAr ? '✓ تغيير زيت وفلتر · فحص الفرامل' : '✓ Oil & filter change · Brake inspection'}
                </p>
                <p className="text-emerald-400">
                  {isAr ? '✓ فحص شامل بالكمبيوتر · صيانة التكييف' : '✓ Full diagnostics · AC maintenance'}
                </p>
              </div>
            </div>
            <PrimaryButton onClick={() => goToAuthScreen('A11')}>
              {isAr ? 'إرسال الطلب' : 'Submit Application'}
            </PrimaryButton>
          </div>
        </div>
      );

    case 'A11':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h1 className={`text-xl font-bold ${colors.text}`}>
                {isAr ? 'حالة الطلب' : 'Application status'}
              </h1>
              <p className={`text-xs ${colors.secondaryText}`}>
                {isAr ? 'KYC-1042 · تم الإرسال ٥ نوفمبر ٢٠٢٦' : 'KYC-1042 · Submitted 5 November 2026'}
              </p>
              <StatusBadge status="Pending" text={isAr ? 'مطلوب تعديل' : 'Changes needed'} />
              <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'تحديث واحد مطلوب' : 'One update needed'}
                </p>
                <p className={colors.secondaryText}>
                  {isAr
                    ? 'صورة رخصة القيادة غير واضحة بما يكفي للمراجعة.'
                    : 'Your driving license photo is not clear enough to review.'}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <PrimaryButton onClick={() => goToSharedScreen('SH18')}>
                {isAr ? 'استبدال المستند وإعادة الإرسال' : 'Replace Document & Resubmit'}
              </PrimaryButton>
              <SecondaryButton onClick={() => goToAuthScreen('A03')}>
                {isAr ? 'العودة لتسجيل الدخول' : 'Back to Login'}
              </SecondaryButton>
            </div>
          </div>
        </div>
      );

    case 'A12':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3 text-center my-auto">
              <div className="w-14 h-14 rounded-full bg-[#E51C23]/15 text-[#E51C23] flex items-center justify-center mx-auto">
                <MapPin size={26} />
              </div>
              <h1 className={`text-lg font-bold ${colors.text}`}>
                {isAr ? 'المساعدة المناسبة في المكان المناسب.' : 'The right help. The right place.'}
              </h1>
              <p className={`text-xs ${colors.secondaryText}`}>
                {isAr
                  ? 'استخدم موقعك الحالي للعثور على أقرب مقدمي الخدمة المعتمدين وتحديد نقطة الالتقاء بدقة.'
                  : 'Use your current location to find nearby verified providers and set an accurate pickup pin.'}
              </p>
            </div>
            <div className="space-y-2">
              <PrimaryButton onClick={() => goToOwnerScreen('C02')}>
                {isAr ? 'السماح بالوصول للموقع' : 'Allow Location Access'}
              </PrimaryButton>
              <SecondaryButton onClick={() => goToOwnerScreen('C25')}>
                {isAr ? 'إدخال الموقع يدوياً' : 'Enter Location Manually'}
              </SecondaryButton>
            </div>
          </div>
        </div>
      );

    case 'A13':
      return (
        <div className={`min-h-[740px] flex flex-col ${colors.bg}`}>
          <AppTopBar showBack={showBack} onBack={handleBack} />
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div className="space-y-3 text-center my-auto">
              <Shield size={34} className="mx-auto text-emerald-400" />
              <h1 className={`text-lg font-bold ${colors.text}`}>
                {isAr ? 'تم تحديث كلمة المرور بأمان.' : 'A fresh start, securely.'}
              </h1>
              <p className={`text-xs ${colors.secondaryText}`}>
                {isAr
                  ? 'تمت إعادة تعيين كلمة المرور بنجاح. سجل الدخول بكلمة المرور الجديدة للمتابعة.'
                  : 'Your password was reset successfully. Sign in with your new password to continue.'}
              </p>
            </div>
            <PrimaryButton onClick={() => goToAuthScreen('A03')}>
              {isAr ? 'العودة لتسجيل الدخول' : 'Back to Login'}
            </PrimaryButton>
          </div>
        </div>
      );
  }
}
