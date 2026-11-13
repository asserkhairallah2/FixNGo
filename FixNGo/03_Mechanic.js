import React, { useState } from 'react';
import {
  Wrench,
  Car,
  MapPin,
  Phone,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  Check,
  MessageSquare,
  Navigation,
  Shield
} from 'lucide-react';

export const MECHANIC_SCREENS = [
  { id: 'M01', label: 'M01 · Mechanic console (Offline)', labelAr: 'M01 · لوحة الميكانيكي (غير متصل)', tab: 'Console' },
  { id: 'M02', label: 'M02 · Mechanic console (Online)', labelAr: 'M02 · لوحة الميكانيكي (متصل)', tab: 'Console' },
  { id: 'M03', label: 'M03 · Incoming request (MR-2611)', labelAr: 'M03 · طلب وارد (MR-2611)', tab: 'Jobs' },
  { id: 'M04', label: 'M04 · Request details', labelAr: 'M04 · تفاصيل الطلب', tab: 'Jobs' },
  { id: 'M05', label: 'M05 · En route to customer', labelAr: 'M05 · في الطريق للعميل', tab: 'Jobs' },
  { id: 'M06', label: 'M06 · Repair in progress', labelAr: 'M06 · جاري الإصلاح', tab: 'Jobs' },
  { id: 'M07', label: 'M07 · Your earnings (2,800 EGP)', labelAr: 'M07 · أرباحك (٢,٨٠٠ ج.م)', tab: 'Earnings' },
  { id: 'M08', label: 'M08 · Service history', labelAr: 'M08 · سجل الخدمات', tab: 'History' },
  { id: 'M09', label: 'M09 · Provider profile', labelAr: 'M09 · الملف الشخصي للميكانيكي', tab: 'Profile' },
  { id: 'M10', label: 'M10 · Your jobs hub', labelAr: 'M10 · مركز المهام', tab: 'Jobs' },
  { id: 'M11', label: 'M11 · Diagnosis & estimate', labelAr: 'M11 · التشخيص والتكلفة التقديرية', tab: 'Jobs' },
  { id: 'M12', label: 'M12 · Complete job & payment', labelAr: 'M12 · إتمام المهمة والدفع', tab: 'Jobs' },
  { id: 'M13', label: 'M13 · Completed job details', labelAr: 'M13 · تفاصيل المهمة المكتملة', tab: 'History' },
  { id: 'M14', label: 'M14 · Edit professional profile', labelAr: 'M14 · تعديل الملف المهني', tab: 'Profile' },
  { id: 'M15', label: 'M15 · Coverage & availability', labelAr: 'M15 · نطاق التغطية والتواجد', tab: 'Profile' }
];

export const MECHANIC_MAIN_SCREENS = ['M01', 'M02', 'M07', 'M08', 'M09', 'M10'];

export const MECHANIC_FALLBACK_BACK = {
  M03: 'M02',
  M04: 'M03',
  M05: 'M04',
  M06: 'M11',
  M11: 'M05',
  M12: 'M06',
  M13: 'M08',
  M14: 'M09',
  M15: 'M09'
};

const MECHANIC_AVATAR =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80';
const CUSTOMER_AVATAR =
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80';
const TIRE_IMAGE =
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80';

export default function MechanicModule({
  mechanicScreen,
  colors,
  isAr,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  RadarMapCanvas,
  goToMechanicScreen,
  goToSharedScreen,
  switchRolePreview
}) {
  const ForwardChevron = isAr ? ChevronLeft : ChevronRight;
  const [earningsPeriod, setEarningsPeriod] = useState('week');
  const [historyFilter, setHistoryFilter] = useState('all');
  const [jobsTab, setJobsTab] = useState('incoming');
  const [availableOnline, setAvailableOnline] = useState(true);

  const RoleSwitcherPills = () => (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {[
        { id: 'carOwner', label: isAr ? 'مالك سيارة' : 'Car Owner' },
        { id: 'mechanic', label: isAr ? 'ميكانيكي' : 'Mechanic' },
        { id: 'towCaptain', label: isAr ? 'كابتن ونش' : 'Tow Captain' },
        { id: 'serviceCenter', label: isAr ? 'مركز خدمة' : 'Center' }
      ].map((r) => (
        <button
          key={r.id}
          onClick={() => switchRolePreview && switchRolePreview(r.id)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 transition ${
            r.id === 'mechanic'
              ? 'border-[#E51C23] bg-[#E51C23] text-white'
              : `${colors.border} ${colors.surface} ${colors.secondaryText}`
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );

  switch (mechanicScreen) {
    // ==========================================
    // M01: Mechanic console (Offline)
    // ==========================================
    case 'M01':
      return (
        <div className="p-4 space-y-3.5">
          <RoleSwitcherPills />
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'لوحة الميكانيكي' : 'Mechanic console'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أهلاً يا كريم. جاهز عندما تكون مستعداً.' : 'Hello, Karim. Ready when you are.'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between`}>
            <div>
              <p className={`text-xs font-bold ${colors.text}`}>
                {isAr ? 'التغطية متوقفة (OFF)' : 'Coverage OFF'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'أنت لا تستقبل طلبات جديدة حالياً.' : "You're not receiving new requests."}
              </p>
            </div>
            <button
              onClick={() => goToMechanicScreen('M02')}
              className="w-10 h-5 rounded-full bg-slate-300 p-0.5 flex items-center justify-start"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>0</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'مهام اليوم' : "Today's jobs"}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>4.9</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'التقييم' : 'Rating'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>0</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'اليوم · ج.م' : 'Today · EGP'}
              </p>
            </div>
          </div>
          <RadarMapCanvas
            label={isAr ? 'منطقة تغطية القاهرة الجديدة' : 'New Cairo coverage zone'}
            subtitle={isAr ? 'غير متصل' : 'Offline'}
          />
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1`}>
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'اعمل بشروطك الخاصة' : 'Take the road on your terms'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'اتصل الآن لرؤية طلبات الإصلاح القريبة والأرباح الواضحة قبل القبول.'
                : 'Go online to see nearby repair requests and clear earnings before you accept.'}
            </p>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M02')}>
            {isAr ? 'الاتصال الآن (متاح)' : 'Go Online'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // M02: Mechanic console (Online)
    // ==========================================
    case 'M02':
    default:
      return (
        <div className="p-4 space-y-3.5">
          <RoleSwitcherPills />
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'لوحة الميكانيكي' : 'Mechanic console'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كريم مصطفى · القاهرة الجديدة' : 'Karim Mostafa · New Cairo'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between`}>
            <div className="space-y-1">
              <p className={`text-xs font-bold ${colors.text}`}>
                {isAr ? 'التغطية مفعلة (ON)' : 'Coverage ON'}
              </p>
              <StatusBadge status="Online" text={isAr ? 'متصل · يستقبل الطلبات' : 'Online · Receiving jobs'} />
            </div>
            <button
              onClick={() => goToMechanicScreen('M01')}
              className="w-10 h-5 rounded-full bg-emerald-500 p-0.5 flex items-center justify-end"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>2</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'مهام اليوم' : "Today's jobs"}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>4.9</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'التقييم' : 'Rating'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>800</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'اليوم · ج.م' : 'Today · EGP'}
              </p>
            </div>
          </div>

          <div
            onClick={() => goToMechanicScreen('M03')}
            className="p-3.5 rounded-2xl bg-[#E51C23] text-white space-y-1.5 cursor-pointer shadow-md"
          >
            <div className="flex justify-between text-[10px] opacity-90 font-semibold">
              <span>{isAr ? 'طلب قريب جديد' : 'New nearby request'}</span>
              <span>28 sec</span>
            </div>
            <p className="text-xs font-extrabold">
              {isAr ? 'تغيير إطار · أحمد محمد' : 'Tire Change · Ahmed Mohamed'}
            </p>
            <p className="text-[11px] opacity-90">
              {isAr ? 'شارع التسعين · ٢.٤ كم · ٦ دقائق' : '90th Street · 2.4 km · 6 min away'}
            </p>
            <div className="flex justify-between pt-1 border-t border-white/20 text-xs font-bold">
              <span>{isAr ? 'أرباحك المقدرة' : 'Your estimated earnings'}</span>
              <span>{isAr ? '٣٥٠ ج.م ←' : '350 EGP →'}</span>
            </div>
          </div>

          <RadarMapCanvas
            label={isAr ? 'نطاق التغطية · ٥ كم' : 'Coverage radius · 5 km'}
            subtitle={isAr ? 'القاهرة الجديدة' : 'New Cairo'}
          />
        </div>
      );

    // ==========================================
    // M03: Incoming request (MR-2611)
    // ==========================================
    case 'M03':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'طلب وارد' : 'Incoming request'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'طلب إصلاح · MR-2611' : 'Repair request · MR-2611'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Pending" text={isAr ? 'الرد خلال 00:28' : 'Respond in 00:28'} />
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2`}>
            <div className="flex items-center gap-2.5">
              <img src={CUSTOMER_AVATAR} alt="Ahmed" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className={`text-xs font-bold ${colors.text}`}>
                  {isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'مالك سيارة · 4.9 ★' : 'Car Owner · 4.9 ★'}
                </p>
              </div>
            </div>
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'تغيير إطار' : 'Tire Change'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'الإطار الأمامي الأيمن مثقوب. الإطار الاحتياطي متوفر.'
                : 'Front right tire is flat. Spare wheel available.'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? '٢.٤ كم' : '2.4 km'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'المسافة' : 'Distance'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? '٦ دقائق' : '6 min'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الوصول' : 'ETA'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className="text-xs font-extrabold text-emerald-500">350</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'ربحك · ج.م' : 'Earn · EGP'}
              </p>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} text-xs space-y-1`}>
            <p className={`text-[10px] uppercase ${colors.secondaryText}`}>
              {isAr ? 'موقع العميل' : 'PICKUP'}
            </p>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} text-xs space-y-1`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'التكلفة التقديرية للعميل' : 'Customer estimate'}
              </span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٤٠٠ ج.م' : '400 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'رسوم المنصة' : 'Platform service fee'}
              </span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٥٠ ج.م' : '50 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M04')}>
            {isAr ? 'قبول الطلب' : 'Accept Request'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToMechanicScreen('M02')}>
            {isAr ? 'رفض' : 'Decline'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // M04: Request details
    // ==========================================
    case 'M04':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تفاصيل الطلب' : 'Request details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'MR-2611 · أحمد محمد' : 'MR-2611 · Ahmed Mohamed'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'هيونداي إلنترا (٢٠٢١ · رمادي)' : 'Hyundai Elantra (2021 · Graphite)'}
              </span>
              <span className={`font-bold ${colors.text}`} dir="ltr">A B C 1234</span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'تغيير إطار' : 'Tire Change'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? '"الإطار الأمامي الأيمن مثقوب. لدي إطار احتياطي ومتوقف بأمان بجانب محطة الوقود."'
                : '"Front right tire is flat. I have a spare and I\'m parked safely beside the petrol station."'}
            </p>
            <img src={TIRE_IMAGE} alt="Tire" className="w-full h-24 rounded-xl object-cover" />
          </div>
          <RadarMapCanvas
            label={isAr ? 'شارع التسعين · ٦ دقائق' : '90th Street · 6 min'}
            subtitle={isAr ? '٢.٤ كم' : '2.4 km'}
          />
          <div className="flex justify-between text-xs">
            <span className={colors.secondaryText}>
              {isAr ? 'السعر التقديري للعميل' : 'Estimated customer price'}
            </span>
            <span className={`font-bold ${colors.text}`}>{isAr ? '٤٠٠ ج.م' : '400 EGP'}</span>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M05')}>
            <Navigation size={14} />
            {isAr ? 'الانتقال إلى موقع العميل' : 'Navigate to Customer'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // M05: En route to customer
    // ==========================================
    case 'M05':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'في الطريق للعميل' : 'En route to customer'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'MR-2611 · تغيير إطار' : 'MR-2611 · Tire Change'}
            </p>
          </div>
          <RadarMapCanvas
            label={isAr ? '٦ دقائق · ٢.٤ كم' : '6 min · 2.4 km'}
            subtitle={isAr ? 'شارع التسعين' : '90th Street'}
          />
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className={colors.secondaryText}>{isAr ? 'خطوة ٣ من ٧' : 'Step 3 of 7'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'في الطريق' : 'En route'}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-500/20 overflow-hidden">
              <div className="w-3/6 h-full bg-[#E51C23] rounded-full" />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <div className="flex items-center gap-2.5">
              <img src={CUSTOMER_AVATAR} alt="Ahmed" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'هيونداي إلنترا · A B C 1234' : 'Hyundai Elantra · A B C 1234'}
                </p>
              </div>
            </div>
            <div className={`flex justify-between pt-1.5 border-t ${colors.border}`}>
              <span className={colors.secondaryText}>{isAr ? 'الموقع' : 'Pickup'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              </span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M11')}>
            {isAr ? 'وصلت إلى العميل' : 'Arrived'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToSharedScreen('SH01')}>
            {isAr ? 'محادثة مع أحمد' : 'Chat with Ahmed'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // M06: Repair in progress
    // ==========================================
    case 'M06':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'جاري الإصلاح' : 'Repair in progress'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'MR-2611 · في الموقع منذ ١٥:١٢' : 'MR-2611 · On site since 15:12'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Online" text={isAr ? 'جاري العمل · تمت الموافقة على العرض' : 'Working · Quote approved'} />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex items-center gap-2.5 text-xs`}>
            <img src={CUSTOMER_AVATAR} alt="Ahmed" className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'تغيير إطار · هيونداي إلنترا' : 'Tire Change · Hyundai Elantra'}
              </p>
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'تفاصيل التكلفة' : 'Cost breakdown'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الانتقال والتشخيص' : 'Call-out & diagnosis'}</span>
              <span className={colors.text}>{isAr ? '١٥٠ ج.م' : '150 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'مصنعية تغيير الإطار' : 'Tire replacement labor'}</span>
              <span className={colors.text}>{isAr ? '٢٠٠ ج.م' : '200 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رسوم الخدمة' : 'Service fee'}</span>
              <span className={colors.text}>{isAr ? '٥٠ ج.م' : '50 EGP'}</span>
            </div>
            <div className={`flex justify-between pt-1.5 border-t ${colors.border} font-extrabold`}>
              <span className={colors.text}>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span className={colors.text}>{isAr ? '٤٠٠ ج.م' : '400 EGP'}</span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className="text-emerald-500 font-semibold">
              {isAr ? '✓ تم تركيب وتثبيت الإطار الاحتياطي' : '✓ Spare fitted and secured'}
            </p>
            <p className="text-emerald-500 font-semibold">
              {isAr ? '✓ تم فحص ضغط الإطارات' : '✓ Tire pressure checked'}
            </p>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M12')}>
            {isAr ? 'إتمام المهمة' : 'Complete Job'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // M07: Your earnings (2,800 EGP)
    // ==========================================
    case 'M07':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'أرباحك' : 'Your earnings'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كريم مصطفى · تم التحديث الآن' : 'Karim Mostafa · Updated just now'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'week', label: isAr ? 'هذا الأسبوع' : 'This week' },
              { id: 'month', label: isAr ? 'هذا الشهر' : 'This month' },
              { id: 'all', label: isAr ? 'الكل' : 'All time' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setEarningsPeriod(t.id)}
                className={`py-1.5 rounded-xl text-[10px] font-bold border ${
                  earningsPeriod === t.id
                    ? 'bg-[#E51C23] border-[#E51C23] text-white'
                    : `${colors.border} ${colors.surface} ${colors.secondaryText}`
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-[#E51C23] text-white space-y-1 shadow-md">
            <p className="text-[10px] uppercase tracking-wider opacity-85">
              {isAr ? 'الرصيد المتاح' : 'AVAILABLE BALANCE'}
            </p>
            <p className="text-2xl font-extrabold">{isAr ? '٢,٨٠٠ ج.م' : '2,800 EGP'}</p>
            <div className="flex justify-between text-[11px] opacity-90">
              <span>{isAr ? 'هذا الأسبوع' : 'This week'}</span>
              <span>+12.4%</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>9</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'مهام مكتملة' : 'Completed jobs'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>800</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'اليوم' : 'Today'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>4.9</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'التقييم' : 'Rating'}
              </p>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'الأرباح اليومية' : 'Daily earnings'}
            </p>
            {[
              { day: isAr ? 'اليوم · ٦ نوفمبر' : 'Today · 6 Nov', amt: isAr ? '٨٠٠ ج.م' : '800 EGP' },
              { day: isAr ? 'الخميس · ٥ نوفمبر' : 'Thu · 5 Nov', amt: isAr ? '١,٢٠٠ ج.م' : '1,200 EGP' },
              { day: isAr ? 'الأربعاء · ٤ نوفمبر' : 'Wed · 4 Nov', amt: isAr ? '٨٠٠ ج.م' : '800 EGP' }
            ].map((d) => (
              <div key={d.day} className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs`}>
                <div>
                  <p className={`font-bold ${colors.text}`}>{d.day}</p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>
                    {isAr ? '٢–٤ إصلاحات · تم الإيداع بالمحفظة' : '2–4 roadside repairs · Paid to wallet'}
                  </p>
                </div>
                <span className={`font-extrabold ${colors.text}`}>{d.amt}</span>
              </div>
            ))}
          </div>
          <PrimaryButton onClick={() => goToSharedScreen('SH15')}>
            {isAr ? 'سحب الأرباح إلى البنك' : 'Withdraw to Bank'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // M08: Service history
    // ==========================================
    case 'M08':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'سجل الخدمات' : 'Service history'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'عملك المتقن، مدعوم بتقييمات السائقين.' : 'Your work, backed by happy drivers.'}
            </p>
          </div>
          {[
            {
              date: isAr ? '٦ نوفمبر · ١٥:٣٥' : '6 Nov · 15:35',
              title: isAr ? 'تغيير إطار' : 'Tire Change',
              customer: isAr ? 'أحمد محمد · هيونداي / كيا' : 'Ahmed Mohamed · Hyundai / Kia',
              dur: isAr ? 'المدة · ٢٣ دقيقة' : 'Duration · 23 min',
              amt: isAr ? '٤٠٠ ج.م' : '400 EGP'
            },
            {
              date: isAr ? '٦ نوفمبر · ١١:٢٠' : '6 Nov · 11:20',
              title: isAr ? 'شحن بطارية' : 'Battery Jump',
              customer: isAr ? 'سلمى نبيل · هيونداي / كيا' : 'Salma Nabil · Hyundai / Kia',
              dur: isAr ? 'المدة · ١٨ دقيقة' : 'Duration · 18 min',
              amt: isAr ? '٤٠٠ ج.م' : '400 EGP'
            },
            {
              date: isAr ? '٥ نوفمبر · ١٧:١٠' : '5 Nov · 17:10',
              title: isAr ? 'تشخيص المحرك' : 'Engine Diagnosis',
              customer: isAr ? 'عمر فتحي · هيونداي / كيا' : 'Omar Fathy · Hyundai / Kia',
              dur: isAr ? 'المدة · ٤٢ دقيقة' : 'Duration · 42 min',
              amt: isAr ? '٦٠٠ ج.م' : '600 EGP'
            }
          ].map((j) => (
            <div
              key={j.date}
              onClick={() => goToMechanicScreen('M13')}
              className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 cursor-pointer text-xs`}
            >
              <div className="flex justify-between">
                <span className={`text-[10px] ${colors.secondaryText}`}>{j.date}</span>
                <span className={`font-extrabold ${colors.text}`}>{j.amt}</span>
              </div>
              <p className={`font-bold ${colors.text}`}>{j.title}</p>
              <p className={`text-[11px] ${colors.secondaryText}`}>{j.customer}</p>
              <div className="flex justify-between items-center pt-1">
                <StatusBadge status="Completed" text={isAr ? 'مكتمل' : 'Completed'} />
                <span className="text-[11px] font-bold text-[#E51C23]">
                  {isAr ? 'عرض المهمة ←' : 'View job →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      );

    // ==========================================
    // M09: Provider profile
    // ==========================================
    case 'M09':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'الملف الشخصي للميكانيكي' : 'Provider profile'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'هويتك المهنية للمساعدة على الطريق.' : 'Your professional roadside identity.'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <div className="flex items-center gap-2.5">
              <img src={MECHANIC_AVATAR} alt="Karim" className="w-11 h-11 rounded-xl object-cover" />
              <div>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'كريم مصطفى' : 'Karim Mostafa'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? '4.9 ★ · ١٨٦ مهمة مكتملة' : '4.9 ★ · 186 completed jobs'}
                </p>
              </div>
            </div>
            <StatusBadge status="Online" text={isAr ? 'ميكانيكي معتمد' : 'Verified Mechanic'} />
            <div className={`flex justify-between pt-1.5 border-t ${colors.border}`}>
              <span className={colors.secondaryText}>{isAr ? 'الخبرة' : 'Experience'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٨ سنوات' : '8 years'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'نطاق التغطية' : 'Coverage'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'القاهرة الجديدة · ٥ كم' : 'New Cairo · 5 km'}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'المستندات والتوثيق' : 'Documents & verification'}
            </p>
            {[
              { title: isAr ? 'البطاقة الشخصية' : 'National ID', sub: isAr ? 'موثق · ينتهي ٢٠٢٩' : 'Verified · Expires 2029' },
              { title: isAr ? 'الشهادة المهنية' : 'Professional certificate', sub: isAr ? 'موثق · ميكانيكا سيارات' : 'Verified · Auto Mechanics' },
              { title: isAr ? 'رخصة القيادة' : 'Driving license', sub: isAr ? 'موثق · تنتهي ٢٠٢٨' : 'Verified · Expires 2028' }
            ].map((doc) => (
              <button
                key={doc.title}
                onClick={() => goToSharedScreen('SH17')}
                className={`w-full p-2.5 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-start text-xs`}
              >
                <div>
                  <p className={`font-bold ${colors.text}`}>{doc.title}</p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>{doc.sub}</p>
                </div>
                <ForwardChevron size={14} className={colors.secondaryText} />
              </button>
            ))}
          </div>

          <SecondaryButton onClick={() => goToMechanicScreen('M14')}>
            {isAr ? 'تعديل الملف المهني' : 'Edit Profile'}
          </SecondaryButton>
          <SecondaryButton onClick={() => goToMechanicScreen('M15')}>
            {isAr ? 'نطاق التغطية والتواجد' : 'Coverage & Availability'}
          </SecondaryButton>
          <SecondaryButton onClick={() => goToSharedScreen('SH06')}>
            {isAr ? 'الإعدادات (اللغة والمظهر)' : 'Settings'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // M10: Your jobs hub
    // ==========================================
    case 'M10':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'مركز المهام' : 'Your jobs'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كريم مصطفى · القاهرة الجديدة' : 'Karim Mostafa · New Cairo'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'incoming', label: isAr ? 'واردة (١)' : 'Incoming (1)' },
              { id: 'active', label: isAr ? 'نشطة (١)' : 'Active (1)' },
              { id: 'scheduled', label: isAr ? 'مجدولة' : 'Scheduled' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setJobsTab(t.id)}
                className={`py-1.5 rounded-xl text-[10px] font-bold border ${
                  jobsTab === t.id
                    ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
                    : `${colors.border} ${colors.surface} ${colors.secondaryText}`
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div
            onClick={() => goToMechanicScreen('M03')}
            className="p-3.5 rounded-2xl border border-[#E51C23]/30 bg-[#E51C23]/5 space-y-1.5 cursor-pointer text-xs"
          >
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'تغيير إطار · MR-2611' : 'Tire Change · MR-2611'}
            </p>
            <StatusBadge status="Pending" text={isAr ? 'وارد · الرد خلال 00:28' : 'Incoming · Respond in 00:28'} />
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>
                {isAr ? 'أحمد محمد · شارع التسعين' : 'Ahmed Mohamed · 90th Street'}
              </span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٢.٤ كم · ٦ دقائق' : '2.4 km · 6 min'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'صافي الربح المقدر' : 'Estimated net earnings'}
              </span>
              <span className="font-bold text-emerald-500">{isAr ? '٣٥٠ ج.م' : '350 EGP'}</span>
            </div>
          </div>
          <div
            onClick={() => goToMechanicScreen('M11')}
            className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 cursor-pointer text-xs`}
          >
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'المهمة النشطة · MR-2611' : 'Active job · MR-2611'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'مقبول · في الطريق إلى أحمد محمد' : 'Accepted · En route to Ahmed Mohamed'}
            </p>
            <span className="inline-block text-[11px] font-bold text-[#E51C23] pt-1">
              {isAr ? 'متابعة المهمة النشطة ←' : 'Continue Active Job →'}
            </span>
          </div>
        </div>
      );

    // ==========================================
    // M11: Diagnosis & estimate
    // ==========================================
    case 'M11':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'التشخيص والتكلفة التقديرية' : 'Diagnosis & estimate'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'MR-2611 · تغيير إطار · وصل ١٥:١٢' : 'MR-2611 · Tire Change · Arrived 15:12'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'هيونداي إلنترا (٢٠٢١ · A B C 1234)' : 'Hyundai Elantra (2021 · A B C 1234)'}
            </p>
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'التشخيص' : 'Diagnosis'}
            </label>
            <textarea
              rows={2}
              defaultValue={
                isAr
                  ? 'ثقب في الإطار الأمامي الأيمن. الإطار الاحتياطي سليم وجاهز للتركيب.'
                  : 'Front right tire puncture. Spare is suitable and ready to fit.'
              }
              className={`w-full p-2.5 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الانتقال · ج.م' : 'Call-out · EGP'}
              </label>
              <input
                defaultValue="150"
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs font-bold ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'المصنعية · ج.م' : 'Labor · EGP'}
              </label>
              <input
                defaultValue="200"
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs font-bold ${colors.text}`}
              />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رسوم الخدمة' : 'Service fee · Fixed'}</span>
              <span className={colors.text}>{isAr ? '٥٠ ج.م' : '50 EGP'}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className={colors.text}>{isAr ? 'إجمالي العميل' : 'Customer total'}</span>
              <span className={colors.text}>{isAr ? '٤٠٠ ج.م' : '400 EGP'}</span>
            </div>
            <div className="flex justify-between font-extrabold text-emerald-500">
              <span>{isAr ? 'صافي أرباحك' : 'Your net earnings'}</span>
              <span>{isAr ? '٣٥٠ ج.م' : '350 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M06')}>
            {isAr ? 'إرسال العرض · ٤٠٠ ج.م' : 'Send Quote · 400 EGP'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // M12: Complete job & payment
    // ==========================================
    case 'M12':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'إتمام المهمة والدفع' : 'Complete job & payment'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'MR-2611 · أحمد محمد · ٦ نوفمبر ٢٠٢٦' : 'MR-2611 · Ahmed Mohamed · 6 Nov 2026'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'فحوصات الأمان النهائية' : 'Final safety checks'}
            </p>
            <p className="text-emerald-500">
              {isAr ? '✓ تم تركيب الإطار الاحتياطي وربط الصواميل' : '✓ Spare fitted and wheel nuts secured'}
            </p>
            <p className="text-emerald-500">
              {isAr ? '✓ تم فحص ضغط الإطارات' : '✓ Tire pressure checked'}
            </p>
            <p className="text-emerald-500">
              {isAr ? '✓ تم إرشاد العميل لتعليمات القيادة بالإطار الاحتياطي' : '✓ Customer given spare-tire driving advice'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'تأكيد الدفع' : 'Payment confirmation'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'طريقة الدفع' : 'Payment method'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'نقداً (كاش)' : 'Cash'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المبلغ المطلوب تحصيله' : 'Amount to collect'}</span>
              <span className="font-extrabold text-[#E51C23]">{isAr ? '٤٠٠ ج.م' : '400 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M13')}>
            {isAr ? 'تأكيد استلام النقدية · ٤٠٠ ج.م' : 'Confirm Cash Received · 400 EGP'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // M13: Completed job details
    // ==========================================
    case 'M13':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تفاصيل المهمة المكتملة' : 'Completed job details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'MR-2611 · ٦ نوفمبر ٢٠٢٦' : 'MR-2611 · 6 November 2026'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Completed" text={isAr ? 'مكتمل · تم الدفع نقداً' : 'Completed · Cash paid'} />
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'تغيير إطار' : 'Tire Change'}</p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'أحمد محمد · هيونداي إلنترا · A B C 1234' : 'Ahmed Mohamed · Hyundai Elantra · A B C 1234'}
            </p>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'إجمالي العميل' : 'Customer total'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٤٠٠ ج.م' : '400 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رسوم الخدمة' : 'Service fee'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٥٠ ج.م' : '50 EGP'}</span>
            </div>
            <div className="flex justify-between font-extrabold text-emerald-500">
              <span>{isAr ? 'صافي أرباحك' : 'Your net earnings'}</span>
              <span>{isAr ? '٣٥٠ ج.م' : '350 EGP'}</span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'سجل المهمة' : 'Job timeline'}</p>
            {[
              { label: isAr ? 'تم القبول' : 'Accepted', time: '15:06' },
              { label: isAr ? 'وصل للموقع' : 'Arrived', time: '15:12' },
              { label: isAr ? 'تم إرسال العرض' : 'Quote sent', time: '15:15' },
              { label: isAr ? 'موافقة العميل · ٤٠٠ ج.م' : 'Customer approved · 400 EGP', time: '15:17' },
              { label: isAr ? 'اكتمل الإصلاح' : 'Repair completed', time: '15:35' },
              { label: isAr ? 'تأكيد استلام النقدية' : 'Cash confirmed', time: '15:36' }
            ].map((s) => (
              <div key={s.label} className="flex justify-between text-[11px]">
                <span className={colors.text}>• {s.label}</span>
                <span className={colors.secondaryText}>{s.time}</span>
              </div>
            ))}
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M07')}>
            {isAr ? 'عرض الأرباح والإيصال' : 'View Receipt'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToMechanicScreen('M08')}>
            {isAr ? 'العودة لسجل الخدمات' : 'Back to Service History'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // M14: Edit professional profile
    // ==========================================
    case 'M14':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تعديل الملف المهني' : 'Edit professional profile'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كريم مصطفى · ميكانيكي معتمد' : 'Karim Mostafa · Verified mechanic'}
            </p>
          </div>
          <div className="space-y-2">
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الاسم الكامل' : 'Full name'}
              </label>
              <input
                defaultValue={isAr ? 'كريم مصطفى' : 'Karim Mostafa'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'البريد الإلكتروني' : 'Email address'}
              </label>
              <input
                defaultValue="karim@fixngo.eg"
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'الهاتف' : 'Phone'}</label>
                <input
                  defaultValue="+20 100 345 6789"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'الخبرة' : 'Experience'}
                </label>
                <input
                  defaultValue={isAr ? '٨ سنوات' : '8 years'}
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'التخصصات' : 'Expertise'}</p>
            <p className="text-emerald-500">
              {isAr ? '✓ تشخيص الأعطال المتنقل' : '✓ Mobile diagnostics'}
            </p>
            <p className="text-emerald-500">
              {isAr ? '✓ شحن البطارية · تغيير الإطارات' : '✓ Battery jump · Tire change'}
            </p>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M09')}>
            {isAr ? 'حفظ التغييرات' : 'Save Changes'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // M15: Coverage & availability
    // ==========================================
    case 'M15':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'نطاق التغطية والتواجد' : 'Coverage & availability'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كريم مصطفى · اعمل بأمان وبشروطك.' : 'Karim Mostafa · Work safely, on your terms.'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between text-xs`}>
            <div>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'متاح لاستقبال طلبات جديدة' : 'Available for new requests'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'متصل · يستقبل المهام القريبة' : 'Online · Receiving nearby jobs'}
              </p>
            </div>
            <button
              onClick={() => setAvailableOnline(!availableOnline)}
              className={`w-10 h-5 rounded-full p-0.5 flex items-center transition ${
                availableOnline ? 'bg-emerald-500 justify-end' : 'bg-slate-400 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow" />
            </button>
          </div>
          <RadarMapCanvas
            label={isAr ? 'القاهرة الجديدة · ٥ كم' : 'New Cairo · 5 km'}
            subtitle={isAr ? 'شارع التسعين' : '90th Street'}
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'منطقة التغطية' : 'Coverage area'}
              </label>
              <input
                defaultValue={isAr ? 'القاهرة الجديدة' : 'New Cairo'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'نصف القطر' : 'Radius'}
              </label>
              <input
                defaultValue={isAr ? '٥ كم' : '5 km'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
          </div>
          <PrimaryButton onClick={() => goToMechanicScreen('M09')}>
            {isAr ? 'حفظ إعدادات التواجد' : 'Save Availability'}
          </PrimaryButton>
        </div>
      );
  }
}
