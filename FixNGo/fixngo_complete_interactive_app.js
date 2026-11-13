import React, { useState } from 'react';
import {
  Wrench,
  Car,
  Shield,
  MapPin,
  Phone,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  User,
  FileText,
  Home,
  Building2,
  CreditCard,
  KeyRound,
  Navigation,
  Check,
  Maximize2,
  Truck,
  Calendar,
  Settings
} from 'lucide-react';

import AuthOnboardingModule, {
  AUTH_SCREENS,
  AUTH_MAIN_SCREENS,
  AUTH_FALLBACK_BACK
} from './01_AuthOnboarding';
import CarOwnerModule, {
  CAR_OWNER_SCREENS,
  CAR_OWNER_MAIN_SCREENS,
  CAR_OWNER_FALLBACK_BACK
} from './02_CarOwner';
import MechanicModule, {
  MECHANIC_SCREENS,
  MECHANIC_MAIN_SCREENS,
  MECHANIC_FALLBACK_BACK
} from './03_Mechanic';
import TowCaptainModule, {
  CAPTAIN_SCREENS,
  CAPTAIN_MAIN_SCREENS,
  CAPTAIN_FALLBACK_BACK
} from './04_TowCaptain';
import ServiceCenterModule, {
  CENTER_SCREENS,
  CENTER_MAIN_SCREENS,
  CENTER_FALLBACK_BACK
} from './05_ServiceCenter';
import AdminModule, {
  ADMIN_SCREENS,
  ADMIN_MAIN_SCREENS,
  ADMIN_FALLBACK_BACK
} from './06_Admin';
import SharedSettingsModule, {
  SHARED_SCREENS,
  SHARED_INTERNAL_FALLBACK_BACK
} from './07_SharedSettings';

// ==========================================
// ORIGINAL BRAND LOGO (Exact Shield + Car + Red Wrench + FixNGo Wordmark)
// ==========================================
export const FixNGoShieldLogo = ({ size = 40 }) => (
  <div
    style={{ width: size, height: size }}
    className="relative flex items-center justify-center shrink-0 select-none"
  >
    <svg viewBox="0 0 120 130" className="w-full h-full drop-shadow-sm">
      {/* Outer Black Shield */}
      <path
        d="M60 4 L112 24 C112 68 98 102 60 126 C22 102 8 68 8 24 L60 4 Z"
        fill="#141416"
      />
      {/* Red Inner Shield Border */}
      <path
        d="M60 13 L103 30 C103 66 91 95 60 116 C29 95 17 66 17 30 L60 13 Z"
        fill="#141416"
        stroke="#FF0000"
        strokeWidth="6.5"
        strokeLinejoin="round"
      />
      {/* White Sports Car Silhouette */}
      <path
        d="M32 52 L39 36 C41 33 45 32 60 32 C75 32 79 33 81 36 L88 52 L93 54 C95 55 96 57 96 60 L96 69 C96 71 94 72 91 72 L83 72 C81 72 80 70 80 67 L78 65 L42 65 L40 67 C40 70 39 72 37 72 L29 72 C26 72 24 71 24 69 L24 60 C24 57 25 55 27 54 L32 52 Z"
        fill="#FFFFFF"
      />
      {/* Side Mirrors */}
      <rect x="24" y="45" width="7" height="4.5" rx="2" fill="#FFFFFF" />
      <rect x="89" y="45" width="7" height="4.5" rx="2" fill="#FFFFFF" />
      {/* Windshield Cutout */}
      <path
        d="M42 37 L37 49 L83 49 L78 37 C73 36 47 36 42 37 Z"
        fill="#141416"
      />
      {/* Headlights Cutout */}
      <path d="M28 55 L42 58 L39 62 L28 59 Z" fill="#141416" />
      <path d="M92 55 L78 58 L81 62 L92 59 Z" fill="#141416" />
      {/* Grille Cutout */}
      <path
        d="M45 59 L75 59 L71 63 L49 63 Z"
        fill="#141416"
      />
      {/* Red Wrench Underneath Car */}
      <path
        d="M54 89 L54 113 L66 113 L66 89 C73 86 77 79 75 71 C74 66 70 63 66 62 L66 74 C66 77 63 79 60 79 C57 79 54 77 54 74 L54 62 C50 63 46 66 45 71 C43 79 47 86 54 89 Z"
        fill="#FF0000"
      />
    </svg>
  </div>
);

export const FixNGoBrandLockup = ({ iconSize = 30, textSize = 'text-base', isDark = true }) => (
  <div className="inline-flex items-center gap-2 select-none" dir="ltr">
    <FixNGoShieldLogo size={iconSize} />
    <span
      className={`font-black italic tracking-tight ${textSize} ${
        isDark ? 'text-white' : 'text-[#111318]'
      }`}
    >
      Fix<span className="text-[#FF0000]">N</span>Go
    </span>
  </div>
);

const NIGHT_CAR_IMAGE =
  'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80';
const WORKSHOP_IMAGE =
  'https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=900&q=80';

const MOCK_PRESETS = {
  carOwner: {
    role: 'carOwner',
    fullName: 'Ahmed Mohamed',
    email: 'ahmed.mohamed@gmail.com',
    password: 'Password@123'
  },
  mechanic: {
    role: 'mechanic',
    fullName: 'Karim Mostafa',
    email: 'karim@fixngo.eg',
    password: 'Mechanic@123'
  },
  towCaptain: {
    role: 'towCaptain',
    fullName: 'Mahmoud Hassan',
    email: 'mahmoud@fixngo.eg',
    password: 'Captain@123'
  },
  serviceCenter: {
    role: 'serviceCenter',
    businessName: 'Nile Auto Care',
    email: 'center@nileautocare.eg',
    password: 'Center@123'
  },
  admin: {
    role: 'admin',
    fullName: 'Nour El-Sayed',
    email: 'admin@fixngo.eg',
    password: 'Admin@123'
  }
};

export default function App() {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('en');
  const [deviceFrame, setDeviceFrame] = useState(true);
  const [otpEnabledOnLogin, setOtpEnabledOnLogin] = useState(false);

  // Active Module & Screen State
  // activeModule can be: 'auth' | 'carOwner' | 'mechanic' | 'towCaptain' | 'serviceCenter' | 'admin' | 'shared'
  const [activeModule, setActiveModule] = useState('carOwner');
  const [lastRole, setLastRole] = useState('carOwner');

  const [authScreen, setAuthScreen] = useState('A02'); // A01 - A13
  const [ownerScreen, setOwnerScreen] = useState('C02'); // C01 - C43
  const [mechanicScreen, setMechanicScreen] = useState('M02'); // M01 - M15
  const [captainScreen, setCaptainScreen] = useState('T02'); // T01 - T15
  const [centerScreen, setCenterScreen] = useState('SC01'); // SC01 - SC16
  const [adminScreen, setAdminScreen] = useState('AD01'); // AD01 - AD15
  const [sharedScreen, setSharedScreen] = useState('SH06'); // SH01 - SH21

  const [activeTab, setActiveTab] = useState('Home');

  // Navigation History Stack for accurate step-by-step Back navigation
  const [navHistory, setNavHistory] = useState([]);

  // Interactive Form States
  const [selectedServiceTile, setSelectedServiceTile] = useState('Flatbed Tow');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'captain',
      text: "Hi Ahmed, I'm on my way. Are you beside the petrol station?",
      textAr: 'أهلاً يا أحمد، أنا في طريقي إليك. هل أنت بجانب محطة الوقود؟',
      time: '14:04'
    },
    {
      sender: 'user',
      text: "Yes, the grey Elantra on the right shoulder. I'll share my location.",
      textAr: 'نعم، السيارة الإلنترا الرمادية على الجانب الأيمن. سأشارك موقعي معك.',
      time: '14:05'
    },
    {
      sender: 'captain',
      text: 'Got it. Please stay safely away from traffic. See you in a few minutes.',
      textAr: 'تمام. يرجى البقاء في مكان آمن بعيداً عن حركة المرور. أراك خلال دقائق.',
      time: '14:06'
    }
  ]);

  // Auth Form State
  const [authForm, setAuthForm] = useState({
    fullName: 'Ahmed Mohamed',
    email: 'ahmed.mohamed@gmail.com',
    password: '••••••••••••',
    confirmPassword: '••••••••••••',
    signupRole: 'carOwner',
    otpDigits: ['2', '8', '4', '1', '0', '6'],
    otpContext: 'signup',
    showPassword: false
  });

  const isDark = theme === 'dark';
  const isAr = lang === 'ar';
  const colors = {
    bg: isDark ? 'bg-[#090A0D]' : 'bg-[#F8FAFC]',
    surface: isDark ? 'bg-[#12141A]' : 'bg-[#FFFFFF]',
    elevated: isDark ? 'bg-[#1A1D26]' : 'bg-[#F1F5F9]',
    border: isDark ? 'border-[#262936]' : 'border-[#E2E8F0]',
    text: isDark ? 'text-[#FFFFFF]' : 'text-[#0F172A]',
    secondaryText: isDark ? 'text-[#8E95A5]' : 'text-[#64748B]',
    inputBg: isDark ? 'bg-[#14171F]' : 'bg-[#F8FAFC]'
  };

  // Helper to check if a given module + screen is a Main (Root/Bottom-Nav) screen
  const isMainScreen = (mod, code) => {
    if (mod === 'auth') return AUTH_MAIN_SCREENS.includes(code);
    if (mod === 'carOwner') return CAR_OWNER_MAIN_SCREENS.includes(code);
    if (mod === 'mechanic') return MECHANIC_MAIN_SCREENS.includes(code);
    if (mod === 'towCaptain') return CAPTAIN_MAIN_SCREENS.includes(code);
    if (mod === 'serviceCenter') return CENTER_MAIN_SCREENS.includes(code);
    if (mod === 'admin') return ADMIN_MAIN_SCREENS.includes(code);
    return false; // shared screens are always sub-screens
  };

  const getCurrentScreenCode = (mod = activeModule) => {
    if (mod === 'auth') return authScreen;
    if (mod === 'carOwner') return ownerScreen;
    if (mod === 'mechanic') return mechanicScreen;
    if (mod === 'towCaptain') return captainScreen;
    if (mod === 'serviceCenter') return centerScreen;
    if (mod === 'admin') return adminScreen;
    if (mod === 'shared') return sharedScreen;
    return ownerScreen;
  };

  const recordHistoryBeforeNavigate = (targetModule, targetCode, resetHistory = false) => {
    if (resetHistory || isMainScreen(targetModule, targetCode)) {
      setNavHistory([]);
      return;
    }
    const currCode = getCurrentScreenCode(activeModule);
    if (activeModule === targetModule && currCode === targetCode) return;
    setNavHistory((prev) => [
      ...prev,
      {
        module: activeModule,
        screen: currCode,
        tab: activeTab,
        lastRole
      }
    ]);
  };

  const applyScreenStateWithoutHistory = (targetModule, code, roleOverride) => {
    setActiveModule(targetModule);
    if (targetModule === 'auth') {
      setAuthScreen(code);
    } else if (targetModule === 'carOwner') {
      setLastRole('carOwner');
      setOwnerScreen(code);
      const found = CAR_OWNER_SCREENS.find((s) => s.id === code);
      if (found) setActiveTab(found.tab);
    } else if (targetModule === 'mechanic') {
      setLastRole('mechanic');
      setMechanicScreen(code);
      const found = MECHANIC_SCREENS.find((s) => s.id === code);
      if (found) setActiveTab(found.tab);
    } else if (targetModule === 'towCaptain') {
      setLastRole('towCaptain');
      setCaptainScreen(code);
      const found = CAPTAIN_SCREENS.find((s) => s.id === code);
      if (found) setActiveTab(found.tab);
    } else if (targetModule === 'serviceCenter') {
      setLastRole('serviceCenter');
      setCenterScreen(code);
      const found = CENTER_SCREENS.find((s) => s.id === code);
      if (found) setActiveTab(found.tab);
    } else if (targetModule === 'admin') {
      setLastRole('admin');
      setAdminScreen(code);
      const found = ADMIN_SCREENS.find((s) => s.id === code);
      if (found) setActiveTab(found.tab);
    } else if (targetModule === 'shared') {
      if (roleOverride) setLastRole(roleOverride);
      setSharedScreen(code);
    }
  };

  // Navigation Helpers
  const goToAuthScreen = (code, opts = {}) => {
    recordHistoryBeforeNavigate('auth', code, opts.resetHistory);
    applyScreenStateWithoutHistory('auth', code);
  };

  const goToOwnerScreen = (code, opts = {}) => {
    recordHistoryBeforeNavigate('carOwner', code, opts.resetHistory);
    applyScreenStateWithoutHistory('carOwner', code);
  };

  const goToMechanicScreen = (code, opts = {}) => {
    recordHistoryBeforeNavigate('mechanic', code, opts.resetHistory);
    applyScreenStateWithoutHistory('mechanic', code);
  };

  const goToCaptainScreen = (code, opts = {}) => {
    recordHistoryBeforeNavigate('towCaptain', code, opts.resetHistory);
    applyScreenStateWithoutHistory('towCaptain', code);
  };

  const goToCenterScreen = (code, opts = {}) => {
    recordHistoryBeforeNavigate('serviceCenter', code, opts.resetHistory);
    applyScreenStateWithoutHistory('serviceCenter', code);
  };

  const goToAdminScreen = (code, opts = {}) => {
    recordHistoryBeforeNavigate('admin', code, opts.resetHistory);
    applyScreenStateWithoutHistory('admin', code);
  };

  const goToSharedScreen = (code, opts = {}) => {
    recordHistoryBeforeNavigate('shared', code, opts.resetHistory);
    applyScreenStateWithoutHistory('shared', code);
  };

  // Step-by-step Back Handler:
  // 1) If user navigated interactively, pops the exact previous screen from navHistory.
  // 2) If navHistory is empty (e.g. user jumped directly via sidebar selector), goes to the immediate logical parent screen.
  const handleBack = () => {
    if (navHistory.length > 0) {
      const prev = navHistory[navHistory.length - 1];
      setNavHistory((h) => h.slice(0, -1));
      applyScreenStateWithoutHistory(prev.module, prev.screen, prev.lastRole);
      if (prev.tab) setActiveTab(prev.tab);
      return;
    }

    // Logical parent fallback when jumping directly to a sub-screen
    if (activeModule === 'auth') {
      if (authScreen === 'A05') {
        const target =
          authForm.otpContext === 'forgot'
            ? 'A06'
            : authForm.otpContext === 'signup'
            ? 'A04'
            : 'A03';
        applyScreenStateWithoutHistory('auth', target);
        return;
      }
      const target = AUTH_FALLBACK_BACK[authScreen] || 'A02';
      applyScreenStateWithoutHistory('auth', target);
      return;
    }

    if (activeModule === 'carOwner') {
      const target = CAR_OWNER_FALLBACK_BACK[ownerScreen] || 'C02';
      applyScreenStateWithoutHistory('carOwner', target);
      return;
    }

    if (activeModule === 'mechanic') {
      const target = MECHANIC_FALLBACK_BACK[mechanicScreen] || 'M02';
      applyScreenStateWithoutHistory('mechanic', target);
      return;
    }

    if (activeModule === 'towCaptain') {
      const target = CAPTAIN_FALLBACK_BACK[captainScreen] || 'T02';
      applyScreenStateWithoutHistory('towCaptain', target);
      return;
    }

    if (activeModule === 'serviceCenter') {
      const target = CENTER_FALLBACK_BACK[centerScreen] || 'SC01';
      applyScreenStateWithoutHistory('serviceCenter', target);
      return;
    }

    if (activeModule === 'admin') {
      const target = ADMIN_FALLBACK_BACK[adminScreen] || 'AD01';
      applyScreenStateWithoutHistory('admin', target);
      return;
    }

    if (activeModule === 'shared') {
      // Check if this shared sub-screen has a parent shared screen (e.g. SH08 -> SH07)
      if (SHARED_INTERNAL_FALLBACK_BACK[sharedScreen]) {
        applyScreenStateWithoutHistory('shared', SHARED_INTERNAL_FALLBACK_BACK[sharedScreen]);
        return;
      }
      // Chat screen returns to active trip
      if (sharedScreen === 'SH01') {
        applyScreenStateWithoutHistory('carOwner', 'C11');
        return;
      }
      // Empty trips returns to Requests
      if (sharedScreen === 'SH04') {
        applyScreenStateWithoutHistory('carOwner', 'C20');
        return;
      }
      // Bank & withdrawal screens return to Earnings of the active role
      if (sharedScreen === 'SH14' || sharedScreen === 'SH15') {
        if (lastRole === 'mechanic') applyScreenStateWithoutHistory('mechanic', 'M07');
        else if (lastRole === 'towCaptain') applyScreenStateWithoutHistory('towCaptain', 'T09');
        else applyScreenStateWithoutHistory('carOwner', 'C23');
        return;
      }
      // Connection / Emergency SOS return to Home of the active role
      if (sharedScreen === 'SH03' || sharedScreen === 'SH19') {
        if (lastRole === 'mechanic') applyScreenStateWithoutHistory('mechanic', 'M02');
        else if (lastRole === 'towCaptain') applyScreenStateWithoutHistory('towCaptain', 'T02');
        else if (lastRole === 'serviceCenter') applyScreenStateWithoutHistory('serviceCenter', 'SC01');
        else if (lastRole === 'admin') applyScreenStateWithoutHistory('admin', 'AD01');
        else applyScreenStateWithoutHistory('carOwner', 'C02');
        return;
      }
      // All Profile & Settings shared screens (SH06, SH02, SH05, SH07, SH10, SH11, SH12, SH13, SH17, SH21) return to Profile
      if (lastRole === 'mechanic') applyScreenStateWithoutHistory('mechanic', 'M09');
      else if (lastRole === 'towCaptain') applyScreenStateWithoutHistory('towCaptain', 'T10');
      else if (lastRole === 'serviceCenter') applyScreenStateWithoutHistory('serviceCenter', 'SC09');
      else if (lastRole === 'admin') applyScreenStateWithoutHistory('admin', 'AD06');
      else applyScreenStateWithoutHistory('carOwner', 'C23');
    }
  };

  const handleBottomTabClick = (tabId) => {
    setNavHistory([]);
    setActiveTab(tabId);
    const roleToUse = activeModule === 'shared' ? lastRole : activeModule;
    if (roleToUse === 'carOwner') {
      setActiveModule('carOwner');
      if (tabId === 'Home') setOwnerScreen('C02');
      if (tabId === 'Garage') setOwnerScreen('C04');
      if (tabId === 'Requests') setOwnerScreen('C20');
      if (tabId === 'Centers') setOwnerScreen('C17');
      if (tabId === 'Profile') setOwnerScreen('C23');
    } else if (roleToUse === 'mechanic') {
      setActiveModule('mechanic');
      if (tabId === 'Console') setMechanicScreen('M02');
      if (tabId === 'Jobs') setMechanicScreen('M10');
      if (tabId === 'Earnings') setMechanicScreen('M07');
      if (tabId === 'History') setMechanicScreen('M08');
      if (tabId === 'Profile') setMechanicScreen('M09');
    } else if (roleToUse === 'towCaptain') {
      setActiveModule('towCaptain');
      if (tabId === 'Dashboard') setCaptainScreen('T02');
      if (tabId === 'Trips') setCaptainScreen('T11');
      if (tabId === 'Earnings') setCaptainScreen('T09');
      if (tabId === 'History') setCaptainScreen('T12');
      if (tabId === 'Profile') setCaptainScreen('T10');
    } else if (roleToUse === 'serviceCenter') {
      setActiveModule('serviceCenter');
      if (tabId === 'Overview') setCenterScreen('SC01');
      if (tabId === 'Bookings') setCenterScreen('SC02');
      if (tabId === 'Catalog') setCenterScreen('SC04');
      if (tabId === 'Reports') setCenterScreen('SC08');
      if (tabId === 'Profile') setCenterScreen('SC09');
    } else if (roleToUse === 'admin') {
      setActiveModule('admin');
      if (tabId === 'Overview') setAdminScreen('AD01');
      if (tabId === 'Verify') setAdminScreen('AD02');
      if (tabId === 'Users') setAdminScreen('AD04');
      if (tabId === 'Pricing') setAdminScreen('AD05');
      if (tabId === 'Profile') setAdminScreen('AD06');
    }
  };

  const applyPresetAndFill = (presetKey) => {
    const data = MOCK_PRESETS[presetKey];
    if (!data) return;
    setAuthForm((prev) => ({
      ...prev,
      fullName: data.fullName || data.businessName,
      email: data.email,
      password: data.password,
      confirmPassword: data.password,
      signupRole: presetKey === 'admin' ? 'carOwner' : presetKey
    }));
  };

  const switchRolePreview = (roleKey) => {
    applyPresetAndFill(roleKey);
    if (roleKey === 'carOwner') goToOwnerScreen('C02', { resetHistory: true });
    else if (roleKey === 'mechanic') goToMechanicScreen('M02', { resetHistory: true });
    else if (roleKey === 'towCaptain') goToCaptainScreen('T02', { resetHistory: true });
    else if (roleKey === 'serviceCenter') goToCenterScreen('SC01', { resetHistory: true });
    else if (roleKey === 'admin') goToAdminScreen('AD01', { resetHistory: true });
  };

  const handleLoginSubmit = () => {
    if (otpEnabledOnLogin) {
      setAuthForm((prev) => ({ ...prev, otpContext: 'login' }));
      goToAuthScreen('A05');
    } else {
      switchRolePreview(lastRole);
    }
  };

  const handleSignupSubmit = () => {
    setAuthForm((prev) => ({ ...prev, otpContext: 'signup' }));
    goToAuthScreen('A05');
  };

  const handleForgotSubmit = () => {
    setAuthForm((prev) => ({ ...prev, otpContext: 'forgot' }));
    goToAuthScreen('A05');
  };

  const handleOtpVerifySuccess = () => {
    const { otpContext, signupRole } = authForm;
    if (otpContext === 'forgot') {
      goToAuthScreen('A07');
      return;
    }
    if (otpContext === 'login') {
      switchRolePreview(lastRole);
      return;
    }
    if (signupRole === 'carOwner') {
      setLastRole('carOwner');
      goToAuthScreen('A12');
    } else if (signupRole === 'mechanic') {
      setLastRole('mechanic');
      goToAuthScreen('A08');
    } else if (signupRole === 'towCaptain') {
      setLastRole('towCaptain');
      goToAuthScreen('A09');
    } else if (signupRole === 'serviceCenter') {
      setLastRole('serviceCenter');
      goToAuthScreen('A10');
    }
  };

  // ==========================================
  // SHARED UI KIT COMPONENTS
  // (Settings button removed from TopBar so Settings is only inside Profile)
  // ==========================================
  const AppTopBar = ({ showBack = false, onBack }) => (
    <div
      className={`w-full px-4 py-3 flex items-center justify-between border-b ${colors.border} ${colors.bg} sticky top-0 z-30`}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={onBack}
            className={`p-1.5 rounded-xl ${colors.elevated} ${colors.text} hover:opacity-80 transition`}
            title={isAr ? 'رجوع' : 'Back'}
          >
            {isAr ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        )}
        <FixNGoBrandLockup iconSize={30} textSize="text-base" isDark={isDark} />
      </div>
    </div>
  );

  const PrimaryButton = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`w-full h-[50px] rounded-2xl bg-[#E51C23] hover:bg-[#c9161d] active:scale-[0.99] text-white font-semibold text-xs tracking-wide transition flex items-center justify-center gap-2 shadow-md shadow-[#E51C23]/20 ${className}`}
    >
      {children}
    </button>
  );

  const SecondaryButton = ({ children, onClick, className = '' }) => (
    <button
      onClick={onClick}
      className={`w-full h-[50px] rounded-2xl border ${colors.border} ${colors.surface} ${colors.text} hover:opacity-90 font-semibold text-xs transition flex items-center justify-center gap-2 ${className}`}
    >
      {children}
    </button>
  );

  const StatusBadge = ({ status = 'Completed', text }) => {
    const styles = {
      Completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      Online: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
      Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      Cancelled: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
    };
    const dotColors = {
      Completed: 'bg-emerald-400',
      Online: 'bg-emerald-400',
      Pending: 'bg-amber-400',
      Cancelled: 'bg-rose-400'
    };
    const defaultAr = {
      Completed: 'مكتمل',
      Online: 'متصل',
      Pending: 'قيد الانتظار',
      Cancelled: 'ملغي'
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
          styles[status] || styles.Pending
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[status] || dotColors.Pending}`} />
        {text || (isAr ? defaultAr[status] || status : status)}
      </span>
    );
  };

  const RadarMapCanvas = ({
    label = isAr ? '٦ دقائق · ٢.٤ كم' : '6 min · 2.4 km',
    subtitle = isAr ? 'شارع التسعين · القاهرة الجديدة' : '90th Street · New Cairo',
    mode = 'route'
  }) => (
    <div
      className={`relative w-full h-36 rounded-2xl overflow-hidden border ${colors.border} ${
        isDark ? 'bg-[#0D1017]' : 'bg-[#F1F5F9]'
      }`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, #64748B 1px, transparent 1px), linear-gradient(to bottom, #64748B 1px, transparent 1px)',
          backgroundSize: '26px 26px'
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-28 h-28 rounded-full border border-[#E51C23]/30 bg-[#E51C23]/5 animate-pulse" />
      </div>
      {mode === 'route' && (
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
          <path
            d="M 45 30 L 145 30 L 145 120 L 245 120"
            fill="none"
            stroke="#E51C23"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      <div className="absolute top-4 left-8 w-6 h-6 rounded-full bg-[#E51C23] text-white flex items-center justify-center shadow-lg">
        <Truck size={12} />
      </div>
      {mode === 'arrived' ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-lg">
            <Check size={12} /> {isAr ? 'الكابتن في نقطة الالتقاء' : 'Captain at pickup'}
          </div>
        </div>
      ) : (
        <div className="absolute bottom-4 right-9 w-6 h-6 rounded-full bg-white text-[#090A0D] border-2 border-[#090A0D] flex items-center justify-center shadow-lg">
          <MapPin size={12} />
        </div>
      )}
      <div className="absolute top-2 left-3 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {isAr ? `القاهرة الجديدة · ${subtitle}` : `NEW CAIRO · ${subtitle}`}
      </div>
      <div className="absolute bottom-2 left-3 px-2 py-0.5 rounded-lg bg-black/80 text-white text-[10px] font-semibold flex items-center gap-1">
        <Navigation size={10} className="text-[#E51C23]" />
        {label}
      </div>
    </div>
  );

  const EmergencySOSBar = () => (
    <div
      onClick={() => goToSharedScreen('SH19')}
      className="w-full rounded-2xl p-3 border border-[#E51C23]/40 bg-[#E51C23]/10 flex items-center justify-between cursor-pointer"
    >
      <div className="space-y-1 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <AlertTriangle size={13} className="text-[#E51C23]" />
            <span className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'طوارئ SOS' : 'Emergency SOS'}
            </span>
          </div>
          <span className={`text-[10px] ${colors.secondaryText}`}>
            {isAr ? 'خطر فوري؟' : 'Immediate danger?'}
          </span>
        </div>
        <div className="flex items-center justify-between pt-0.5 text-xs font-semibold">
          <span className="text-[#E51C23] flex items-center gap-1">
            <Phone size={11} /> {isAr ? '١٢٣ · الإسعاف' : '123 · Ambulance'}
          </span>
          <span className="text-amber-400 flex items-center gap-1">
            {isAr ? '١٢٢ · النجدة' : '122 · Police'}
          </span>
        </div>
      </div>
    </div>
  );

  const renderBottomNav = () => {
    if (activeModule === 'auth') return null;

    const roleToUse = activeModule === 'shared' ? lastRole : activeModule;
    const ownerTabs = [
      { id: 'Home', label: isAr ? 'الرئيسية' : 'Home', icon: Home },
      { id: 'Garage', label: isAr ? 'الجراج' : 'Garage', icon: Car },
      { id: 'Requests', label: isAr ? 'الطلبات' : 'Requests', icon: FileText },
      { id: 'Centers', label: isAr ? 'المراكز' : 'Centers', icon: Building2 },
      { id: 'Profile', label: isAr ? 'حسابي' : 'Profile', icon: User }
    ];
    const mechanicTabs = [
      { id: 'Console', label: isAr ? 'الرئيسية' : 'Console', icon: Home },
      { id: 'Jobs', label: isAr ? 'المهام' : 'Jobs', icon: Wrench },
      { id: 'Earnings', label: isAr ? 'الأرباح' : 'Earnings', icon: CreditCard },
      { id: 'History', label: isAr ? 'السجل' : 'History', icon: FileText },
      { id: 'Profile', label: isAr ? 'حسابي' : 'Profile', icon: User }
    ];
    const captainTabs = [
      { id: 'Dashboard', label: isAr ? 'الرئيسية' : 'Dashboard', icon: Home },
      { id: 'Trips', label: isAr ? 'الرحلات' : 'Trips', icon: Truck },
      { id: 'Earnings', label: isAr ? 'الأرباح' : 'Earnings', icon: CreditCard },
      { id: 'History', label: isAr ? 'السجل' : 'History', icon: FileText },
      { id: 'Profile', label: isAr ? 'حسابي' : 'Profile', icon: User }
    ];
    const centerTabs = [
      { id: 'Overview', label: isAr ? 'نظرة عامة' : 'Overview', icon: Home },
      { id: 'Bookings', label: isAr ? 'الحجوزات' : 'Bookings', icon: Calendar },
      { id: 'Catalog', label: isAr ? 'الخدمات' : 'Catalog', icon: Wrench },
      { id: 'Reports', label: isAr ? 'التقارير' : 'Reports', icon: FileText },
      { id: 'Profile', label: isAr ? 'حسابي' : 'Profile', icon: User }
    ];
    const adminTabs = [
      { id: 'Overview', label: isAr ? 'نظرة عامة' : 'Overview', icon: Home },
      { id: 'Verify', label: isAr ? 'التوثيق' : 'Verify', icon: Car },
      { id: 'Users', label: isAr ? 'المستخدمين' : 'Users', icon: FileText },
      { id: 'Pricing', label: isAr ? 'التسعير' : 'Pricing', icon: Building2 },
      { id: 'Profile', label: isAr ? 'حسابي' : 'Profile', icon: User }
    ];
    const tabs =
      roleToUse === 'mechanic'
        ? mechanicTabs
        : roleToUse === 'towCaptain'
        ? captainTabs
        : roleToUse === 'serviceCenter'
        ? centerTabs
        : roleToUse === 'admin'
        ? adminTabs
        : ownerTabs;

    return (
      <div className={`w-full border-t ${colors.border} ${colors.bg} px-2 pt-2 pb-2.5 sticky bottom-0 z-30`}>
        <div className="grid grid-cols-5">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleBottomTabClick(t.id)}
                className={`flex flex-col items-center justify-center gap-1 py-1 transition ${
                  isSelected ? 'text-[#E51C23]' : colors.secondaryText
                }`}
              >
                <Icon size={18} className={isSelected ? 'stroke-[2.4]' : 'stroke-[1.8]'} />
                <span className="text-[10px] font-semibold">{t.label}</span>
              </button>
            );
          })}
        </div>
        <div className="w-28 h-1 rounded-full bg-slate-500/40 mx-auto mt-1.5" />
      </div>
    );
  };

  // Dynamic Navigator Data for all 7 modules (138 Screens)
  const getActiveScreenListAndCode = () => {
    if (activeModule === 'auth')
      return {
        list: AUTH_SCREENS,
        curr: authScreen,
        go: (code) => goToAuthScreen(code, { resetHistory: true }),
        title: isAr ? '01 / الدخول والتسجيل (A01–A13)' : '01 / AUTH & ONBOARDING (A01–A13)'
      };
    if (activeModule === 'mechanic')
      return {
        list: MECHANIC_SCREENS,
        curr: mechanicScreen,
        go: (code) => goToMechanicScreen(code, { resetHistory: true }),
        title: isAr ? '03 / الميكانيكي ١٥ شاشة (M01–M15)' : '03 / MECHANIC 15 SCREENS (M01–M15)'
      };
    if (activeModule === 'towCaptain')
      return {
        list: CAPTAIN_SCREENS,
        curr: captainScreen,
        go: (code) => goToCaptainScreen(code, { resetHistory: true }),
        title: isAr ? '04 / كابتن الونش ١٥ شاشة (T01–T15)' : '04 / TOW CAPTAIN 15 SCREENS (T01–T15)'
      };
    if (activeModule === 'serviceCenter')
      return {
        list: CENTER_SCREENS,
        curr: centerScreen,
        go: (code) => goToCenterScreen(code, { resetHistory: true }),
        title: isAr ? '05 / مركز الخدمة ١٦ شاشة (SC01–SC16)' : '05 / SERVICE CENTER 16 SCREENS (SC01–SC16)'
      };
    if (activeModule === 'admin')
      return {
        list: ADMIN_SCREENS,
        curr: adminScreen,
        go: (code) => goToAdminScreen(code, { resetHistory: true }),
        title: isAr ? '06 / الإدارة ١٥ شاشة (AD01–AD15)' : '06 / ADMIN 15 SCREENS (AD01–AD15)'
      };
    if (activeModule === 'shared')
      return {
        list: SHARED_SCREENS,
        curr: sharedScreen,
        go: (code) => goToSharedScreen(code, { resetHistory: true }),
        title: isAr ? '07 / الشاشات المشتركة والإعدادات (SH01–SH21)' : '07 / SHARED EXPERIENCES (SH01–SH21)'
      };
    return {
      list: CAR_OWNER_SCREENS,
      curr: ownerScreen,
      go: (code) => goToOwnerScreen(code, { resetHistory: true }),
      title: isAr ? '02 / مالك السيارة ٤٣ شاشة (C01–C43)' : '02 / CAR OWNER 43 SCREENS (C01–C43)'
    };
  };

  const navData = getActiveScreenListAndCode();
  const currentCode = getCurrentScreenCode(activeModule);
  const showBackInCurrentScreen = !isMainScreen(activeModule, currentCode);

  const renderMobileContent = () => {
    if (activeModule === 'auth') {
      return (
        <div dir={isAr ? 'rtl' : 'ltr'}>
          <AuthOnboardingModule
            authScreen={authScreen}
            authForm={authForm}
            setAuthForm={setAuthForm}
            colors={colors}
            isAr={isAr}
            NIGHT_CAR_IMAGE={NIGHT_CAR_IMAGE}
            FixNGoShieldLogo={FixNGoShieldLogo}
            AppTopBar={AppTopBar}
            PrimaryButton={PrimaryButton}
            SecondaryButton={SecondaryButton}
            StatusBadge={StatusBadge}
            goToAuthScreen={goToAuthScreen}
            goToOwnerScreen={goToOwnerScreen}
            goToSharedScreen={goToSharedScreen}
            applyPresetAndFill={applyPresetAndFill}
            handleLoginSubmit={handleLoginSubmit}
            handleSignupSubmit={handleSignupSubmit}
            handleForgotSubmit={handleForgotSubmit}
            handleOtpVerifySuccess={handleOtpVerifySuccess}
            handleBack={handleBack}
            showBack={showBackInCurrentScreen}
          />
        </div>
      );
    }

    return (
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        className={`min-h-[740px] flex flex-col justify-between ${colors.bg}`}
      >
        <AppTopBar showBack={showBackInCurrentScreen} onBack={handleBack} />
        <div className="flex-1 overflow-y-auto">
          {activeModule === 'carOwner' && (
            <CarOwnerModule
              ownerScreen={ownerScreen}
              colors={colors}
              isAr={isAr}
              NIGHT_CAR_IMAGE={NIGHT_CAR_IMAGE}
              WORKSHOP_IMAGE={WORKSHOP_IMAGE}
              selectedServiceTile={selectedServiceTile}
              setSelectedServiceTile={setSelectedServiceTile}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              PrimaryButton={PrimaryButton}
              SecondaryButton={SecondaryButton}
              StatusBadge={StatusBadge}
              RadarMapCanvas={RadarMapCanvas}
              EmergencySOSBar={EmergencySOSBar}
              goToOwnerScreen={goToOwnerScreen}
              goToSharedScreen={goToSharedScreen}
              switchRolePreview={switchRolePreview}
            />
          )}
          {activeModule === 'mechanic' && (
            <MechanicModule
              mechanicScreen={mechanicScreen}
              colors={colors}
              isAr={isAr}
              PrimaryButton={PrimaryButton}
              SecondaryButton={SecondaryButton}
              StatusBadge={StatusBadge}
              RadarMapCanvas={RadarMapCanvas}
              goToMechanicScreen={goToMechanicScreen}
              goToSharedScreen={goToSharedScreen}
              switchRolePreview={switchRolePreview}
            />
          )}
          {activeModule === 'towCaptain' && (
            <TowCaptainModule
              captainScreen={captainScreen}
              colors={colors}
              isAr={isAr}
              PrimaryButton={PrimaryButton}
              SecondaryButton={SecondaryButton}
              StatusBadge={StatusBadge}
              RadarMapCanvas={RadarMapCanvas}
              goToCaptainScreen={goToCaptainScreen}
              goToSharedScreen={goToSharedScreen}
              switchRolePreview={switchRolePreview}
            />
          )}
          {activeModule === 'serviceCenter' && (
            <ServiceCenterModule
              centerScreen={centerScreen}
              colors={colors}
              isAr={isAr}
              WORKSHOP_IMAGE={WORKSHOP_IMAGE}
              PrimaryButton={PrimaryButton}
              SecondaryButton={SecondaryButton}
              StatusBadge={StatusBadge}
              goToCenterScreen={goToCenterScreen}
              goToSharedScreen={goToSharedScreen}
              switchRolePreview={switchRolePreview}
            />
          )}
          {activeModule === 'admin' && (
            <AdminModule
              adminScreen={adminScreen}
              colors={colors}
              isAr={isAr}
              PrimaryButton={PrimaryButton}
              SecondaryButton={SecondaryButton}
              StatusBadge={StatusBadge}
              goToAdminScreen={goToAdminScreen}
              goToSharedScreen={goToSharedScreen}
              switchRolePreview={switchRolePreview}
            />
          )}
          {activeModule === 'shared' && (
            <SharedSettingsModule
              sharedScreen={sharedScreen}
              colors={colors}
              isAr={isAr}
              lang={lang}
              setLang={setLang}
              theme={theme}
              setTheme={setTheme}
              chatInput={chatInput}
              setChatInput={setChatInput}
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
              FixNGoShieldLogo={FixNGoShieldLogo}
              PrimaryButton={PrimaryButton}
              SecondaryButton={SecondaryButton}
              goToAuthScreen={goToAuthScreen}
              goToOwnerScreen={goToOwnerScreen}
              goToSharedScreen={goToSharedScreen}
              handleBack={handleBack}
            />
          )}
        </div>
        {renderBottomNav()}
      </div>
    );
  };

  const activeScreenMeta = navData.list.find((s) => s.id === navData.curr);

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#EEF2F6] text-slate-900 flex flex-col lg:flex-row font-sans"
    >
      {deviceFrame && (
        <aside className="w-full lg:w-80 bg-white border-b lg:border-b-0 lg:border-e border-slate-200 p-4 flex flex-col justify-between shrink-0 max-h-screen overflow-y-auto">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FixNGoShieldLogo size={38} />
                <div>
                  <h1 className="font-black italic text-base text-slate-900" dir="ltr">
                    Fix<span className="text-[#FF0000]">N</span>Go
                  </h1>
                  <p className="text-[10px] text-slate-500">
                    {isAr ? 'جميع الـ ١٣٨ شاشة · النسخة الكاملة' : 'All 138 Screens · Production Spec'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDeviceFrame(false)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                title={isAr ? 'عرض التطبيق بالكامل' : 'Full Mobile APK View'}
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Dynamic Screen Navigator for Active Module */}
            <div className="space-y-1.5 p-2.5 rounded-2xl bg-[#FFF5F5] border border-[#E51C23]/30">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#E51C23]">
                {navData.title}
              </label>
              <select
                value={navData.curr}
                onChange={(e) => navData.go(e.target.value)}
                className="w-full p-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none"
              >
                {navData.list.map((s) => (
                  <option key={s.id} value={s.id}>
                    {isAr && s.labelAr ? s.labelAr : s.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => {
                    const idx = navData.list.findIndex((s) => s.id === navData.curr);
                    const prev = navData.list[(idx - 1 + navData.list.length) % navData.list.length];
                    navData.go(prev.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-700"
                >
                  {isAr ? '→ السابق' : '← Prev'}
                </button>
                <span className="text-[11px] font-extrabold text-[#E51C23]">{navData.curr}</span>
                <button
                  onClick={() => {
                    const idx = navData.list.findIndex((s) => s.id === navData.curr);
                    const next = navData.list[(idx + 1) % navData.list.length];
                    navData.go(next.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#E51C23] text-white text-[11px] font-bold"
                >
                  {isAr ? 'التالي ←' : 'Next →'}
                </button>
              </div>
            </div>

            {/* All 7 Modules Selector */}
            <div className="space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {isAr ? 'اختر القسم أو الدور (٧ مجموعات)' : 'SELECT A MODULE OR ROLE (7 GROUPS)'}
              </p>
              {[
                {
                  id: 'auth',
                  title: isAr ? '01 · الدخول والتسجيل (13)' : '01 · Auth & Onboarding (13)',
                  sub: isAr ? 'A01–A13 · البداية، الترحيب، الدخول' : 'A01–A13 · Splash, Get Started, Login',
                  icon: KeyRound,
                  action: () => goToAuthScreen('A02', { resetHistory: true })
                },
                {
                  id: 'carOwner',
                  title: isAr ? '02 · مالك السيارة (43 شاشة)' : '02 · Car Owner (43 Screens)',
                  sub: isAr ? 'C01–C43 · أحمد محمد' : 'C01–C43 · Ahmed Mohamed',
                  icon: Car,
                  action: () => switchRolePreview('carOwner')
                },
                {
                  id: 'mechanic',
                  title: isAr ? '03 · الميكانيكي (15 شاشة)' : '03 · Mechanic (15 Screens)',
                  sub: isAr ? 'M01–M15 · كريم مصطفى' : 'M01–M15 · Karim Mostafa',
                  icon: Wrench,
                  action: () => switchRolePreview('mechanic')
                },
                {
                  id: 'towCaptain',
                  title: isAr ? '04 · كابتن الونش (15 شاشة)' : '04 · Tow Captain (15 Screens)',
                  sub: isAr ? 'T01–T15 · محمود حسن' : 'T01–T15 · Mahmoud Hassan',
                  icon: Truck,
                  action: () => switchRolePreview('towCaptain')
                },
                {
                  id: 'serviceCenter',
                  title: isAr ? '05 · مركز الخدمة (16 شاشة)' : '05 · Service Center (16 Screens)',
                  sub: isAr ? 'SC01–SC16 · نايل أوتو كير' : 'SC01–SC16 · Nile Auto Care',
                  icon: Building2,
                  action: () => switchRolePreview('serviceCenter')
                },
                {
                  id: 'admin',
                  title: isAr ? '06 · الإدارة (15 شاشة)' : '06 · Admin (15 Screens)',
                  sub: isAr ? 'AD01–AD15 · نور السيد' : 'AD01–AD15 · Nour El-Sayed',
                  icon: Shield,
                  action: () => switchRolePreview('admin')
                },
                {
                  id: 'shared',
                  title: isAr ? '07 · المشتركة والإعدادات (21)' : '07 · Shared & Settings (21)',
                  sub: isAr ? 'SH01–SH21 · المحادثة، الإعدادات، البنك' : 'SH01–SH21 · Chat, Settings, Bank',
                  icon: Settings,
                  action: () => goToSharedScreen('SH06', { resetHistory: true })
                }
              ].map((mod) => {
                const Icon = mod.icon;
                const selected = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={mod.action}
                    className={`w-full p-2 rounded-2xl border text-start flex items-center justify-between transition ${
                      selected
                        ? 'border-[#E51C23]/40 bg-[#FFF5F5]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          selected ? 'bg-[#E51C23] text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{mod.title}</p>
                        <p className="text-[10px] text-slate-500">{mod.sub}</p>
                      </div>
                    </div>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selected ? 'bg-[#E51C23]' : 'border border-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Quick Auth & OTP Controls */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => goToAuthScreen('A02', { resetHistory: true })}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-700 text-start hover:bg-slate-50"
                >
                  {isAr ? '1. ابدأ الآن (A02)' : '1. Get Started (A02)'}
                </button>
                <button
                  onClick={() => goToAuthScreen('A03', { resetHistory: true })}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-700 text-start hover:bg-slate-50"
                >
                  {isAr ? '2. تسجيل الدخول (A03)' : '2. Direct Log In (A03)'}
                </button>
                <button
                  onClick={() => goToAuthScreen('A04', { resetHistory: true })}
                  className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-700 text-start hover:bg-slate-50"
                >
                  {isAr ? '3. حساب جديد (A04)' : '3. New Sign Up (A04)'}
                </button>
                <button
                  onClick={() => goToOwnerScreen('C23', { resetHistory: true })}
                  className="px-2.5 py-1.5 rounded-xl border border-[#E51C23]/30 bg-[#FFF5F5] text-[11px] font-semibold text-[#E51C23] text-start"
                >
                  {isAr ? '4. البروفايل والإعدادات (C23)' : '4. Profile & Settings (C23)'}
                </button>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-800">
                  {isAr ? 'طلب رمز OTP عند الدخول' : 'Require OTP on Login'}
                </span>
                <button
                  onClick={() => setOtpEnabledOnLogin(!otpEnabledOnLogin)}
                  className={`w-9 h-5 rounded-full p-0.5 transition flex items-center ${
                    otpEnabledOnLogin ? 'bg-[#E51C23] justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white shadow" />
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* CENTER STAGE */}
      <main className="flex-1 flex flex-col items-center justify-center p-0 lg:p-6 overflow-y-auto">
        {deviceFrame ? (
          <>
            <div className="w-full max-w-[393px] flex items-center justify-between mb-2 px-1">
              <div>
                <p className="text-[10px] font-semibold text-slate-400">
                  {isAr
                    ? `الوضع ${theme === 'dark' ? 'الداكن' : 'الفاتح'} · RTL · 393 × 852`
                    : `${theme.toUpperCase()} MODE · 393 × 852`}
                </p>
                <h2 className="text-xs font-bold text-slate-800">
                  {isAr && activeScreenMeta?.labelAr
                    ? activeScreenMeta.labelAr
                    : activeScreenMeta?.label}
                </h2>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                {isAr ? 'مباشر' : 'Live'}
              </span>
            </div>

            <div className="w-full max-w-[393px] rounded-[42px] p-3 bg-[#14161D] shadow-2xl border-4 border-[#252834]">
              <div className="w-full rounded-[32px] overflow-hidden border border-white/10">
                {renderMobileContent()}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full max-w-md mx-auto min-h-screen relative">
            <button
              onClick={() => setDeviceFrame(true)}
              className="fixed bottom-16 right-4 z-50 px-3 py-1.5 rounded-full bg-[#E51C23] text-white text-xs font-bold shadow-lg"
            >
              {isAr ? 'إظهار لوحة التحكم' : 'Show Controls'}
            </button>
            {renderMobileContent()}
          </div>
        )}
      </main>
    </div>
  );
}
