import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Upload,
  MessageSquare,
  Check
} from 'lucide-react';

export const CAPTAIN_SCREENS = [
  { id: 'T01', label: 'T01 · Captain dashboard (OFF duty)', labelAr: 'T01 · لوحة الكابتن (خارج الخدمة)', tab: 'Dashboard' },
  { id: 'T02', label: 'T02 · Captain dashboard (ON duty)', labelAr: 'T02 · لوحة الكابتن (في الخدمة)', tab: 'Dashboard' },
  { id: 'T03', label: 'T03 · Incoming tow request (FG-2606)', labelAr: 'T03 · طلب سحب وارد (FG-2606)', tab: 'Trips' },
  { id: 'T04', label: 'T04 · Tow request details', labelAr: 'T04 · تفاصيل طلب السحب', tab: 'Trips' },
  { id: 'T05', label: 'T05 · Heading to pickup', labelAr: 'T05 · في الطريق لنقطة الالتقاء', tab: 'Trips' },
  { id: 'T06', label: 'T06 · Load the vehicle safely', labelAr: 'T06 · تحميل المركبة بأمان', tab: 'Trips' },
  { id: 'T07', label: 'T07 · On the way to the center', labelAr: 'T07 · في الطريق إلى المركز', tab: 'Trips' },
  { id: 'T08', label: 'T08 · Another journey rescued', labelAr: 'T08 · تم إنقاذ رحلة أخرى بنجاح', tab: 'Trips' },
  { id: 'T09', label: 'T09 · Your earnings (4,550 EGP)', labelAr: 'T09 · أرباحك (٤,٥٥٠ ج.م)', tab: 'Earnings' },
  { id: 'T10', label: 'T10 · Captain profile', labelAr: 'T10 · الملف الشخصي للكابتن', tab: 'Profile' },
  { id: 'T11', label: 'T11 · Your trips hub', labelAr: 'T11 · مركز الرحلات', tab: 'Trips' },
  { id: 'T12', label: 'T12 · Trip history', labelAr: 'T12 · سجل الرحلات', tab: 'History' },
  { id: 'T13', label: 'T13 · Trip details & receipt', labelAr: 'T13 · تفاصيل الرحلة والإيصال', tab: 'History' },
  { id: 'T14', label: 'T14 · Handover & collect payment', labelAr: 'T14 · تسليم المركبة وتحصيل الدفعة', tab: 'Trips' },
  { id: 'T15', label: 'T15 · Edit captain & truck', labelAr: 'T15 · تعديل بيانات الكابتن والونش', tab: 'Profile' }
];

export const CAPTAIN_MAIN_SCREENS = ['T01', 'T02', 'T09', 'T10', 'T11', 'T12'];

export const CAPTAIN_FALLBACK_BACK = {
  T03: 'T02',
  T04: 'T03',
  T05: 'T04',
  T06: 'T05',
  T07: 'T06',
  T08: 'T14',
  T13: 'T12',
  T14: 'T07',
  T15: 'T10'
};

const DRIVER_AVATAR =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
const CUSTOMER_AVATAR =
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80';
const FLATBED_IMAGE =
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80';

export default function TowCaptainModule({
  captainScreen,
  colors,
  isAr,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  RadarMapCanvas,
  goToCaptainScreen,
  goToSharedScreen,
  switchRolePreview
}) {
  const ForwardChevron = isAr ? ChevronLeft : ChevronRight;
  const [earningsPeriod, setEarningsPeriod] = useState('week');
  const [historyFilter, setHistoryFilter] = useState('all');

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
            r.id === 'towCaptain'
              ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
              : `${colors.border} ${colors.surface} ${colors.secondaryText}`
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );

  switch (captainScreen) {
    // ==========================================
    // T01: Captain dashboard (OFF duty)
    // ==========================================
    case 'T01':
      return (
        <div className="p-4 space-y-3.5">
          <RoleSwitcherPills />
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'لوحة الكابتن' : 'Captain dashboard'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أهلاً يا محمود. ونشك، وجدولك الخاص.' : 'Hello, Mahmoud. Your truck, your schedule.'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between`}>
            <div>
              <p className={`text-xs font-bold ${colors.text}`}>
                {isAr ? 'أنت خارج الخدمة (OFF)' : "You're OFF duty"}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'اتصل عندما تكون مستعداً لاستقبال الطلبات.' : "Go online when you're ready for dispatch."}
              </p>
            </div>
            <button
              onClick={() => goToCaptainScreen('T02')}
              className="w-10 h-5 rounded-full bg-slate-300 p-0.5 flex items-center justify-start"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow" />
            </button>
          </div>
          <div className={`rounded-2xl border ${colors.border} ${colors.surface} overflow-hidden text-xs`}>
            <img src={FLATBED_IMAGE} alt="Flatbed" className="w-full h-28 object-cover" />
            <div className="p-3 space-y-1">
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'وحدة FNG-042 · إيسوزو سطحة' : 'Unit FNG-042 · Isuzu Flatbed'}
              </p>
              <div className="flex justify-between">
                <span className={colors.secondaryText}>{isAr ? 'لوحة الونش' : 'Truck plate'}</span>
                <span className={`font-bold ${colors.text}`} dir="ltr">C R T 9087</span>
              </div>
              <div className="flex justify-between">
                <span className={colors.secondaryText}>{isAr ? 'الحمولة' : 'Capacity'}</span>
                <span className={`font-bold ${colors.text}`}>
                  {isAr ? '٣.٥ طن' : '3.5 tonnes'}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>0</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'رحلات اليوم' : "Today's trips"}
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
          <PrimaryButton onClick={() => goToCaptainScreen('T02')}>
            {isAr ? 'بدء الخدمة (متاح الآن)' : 'Go Online'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // T02: Captain dashboard (ON duty)
    // ==========================================
    case 'T02':
    default:
      return (
        <div className="p-4 space-y-3.5">
          <RoleSwitcherPills />
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'لوحة الكابتن' : 'Captain dashboard'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'محمود حسن · وحدة FNG-042' : 'Mahmoud Hassan · Unit FNG-042'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between`}>
            <div className="space-y-1">
              <p className={`text-xs font-bold ${colors.text}`}>
                {isAr ? 'أنت في الخدمة (ON)' : "You're ON duty"}
              </p>
              <StatusBadge status="Online" text={isAr ? 'متصل · جاهز لاستقبال الطلبات' : 'Online · Ready for dispatch'} />
            </div>
            <button
              onClick={() => goToCaptainScreen('T01')}
              className="w-10 h-5 rounded-full bg-emerald-500 p-0.5 flex items-center justify-end"
            >
              <span className="w-4 h-4 rounded-full bg-white shadow" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>3</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'رحلات اليوم' : "Today's jobs"}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>4.9</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'التقييم' : 'Rating'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>1,950</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'اليوم · ج.م' : 'Today · EGP'}
              </p>
            </div>
          </div>
          <div
            onClick={() => goToCaptainScreen('T03')}
            className="p-3.5 rounded-2xl border border-[#E51C23]/40 bg-[#E51C23]/10 space-y-1.5 cursor-pointer text-xs"
          >
            <div className="flex justify-between text-[10px] font-bold text-[#E51C23]">
              <span>{isAr ? 'طلب سحب جديد' : 'New tow request'}</span>
              <span>00:28</span>
            </div>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'هيونداي إلنترا · ونش سطحة' : 'Hyundai Elantra · Flatbed Tow'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'شارع التسعين ← نايل أوتو كير · ٨.٢ كم' : '90th Street → Nile Auto Care · 8.2 km'}
            </p>
            <div className={`flex justify-between pt-1 border-t ${colors.border} font-extrabold`}>
              <span className={colors.secondaryText}>{isAr ? 'عرض الرحلة' : 'Trip offer'}</span>
              <span className="text-[#E51C23]">{isAr ? '٦٥٠ ج.م ←' : '650 EGP →'}</span>
            </div>
          </div>
          <RadarMapCanvas
            label={isAr ? 'منطقة القاهرة الجديدة' : 'New Cairo dispatch zone'}
            subtitle="FG-2606"
          />
        </div>
      );

    // ==========================================
    // T03: Incoming tow request (FG-2606)
    // ==========================================
    case 'T03':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'طلب سحب وارد' : 'Incoming tow request'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · أحمد محمد' : 'FG-2606 · Ahmed Mohamed'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Pending" text={isAr ? 'الرد خلال 00:28' : 'Respond in 00:28'} />
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <div>
              <p className={`text-[10px] uppercase ${colors.secondaryText}`}>
                {isAr ? 'نقطة الالتقاء' : 'PICKUP'}
              </p>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              </p>
            </div>
            <div className={`pt-2 border-t ${colors.border}`}>
              <p className={`text-[10px] uppercase ${colors.secondaryText}`}>
                {isAr ? 'الوجهة · ٨.٢ كم' : 'DESTINATION · 8.2 KM'}
              </p>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'نايل أوتو كير، التجمع الخامس' : 'Nile Auto Care, Fifth Settlement'}
              </p>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between text-xs`}>
            <span className={`font-bold ${colors.text}`}>
              {isAr ? 'هيونداي إلنترا (٢٠٢١ · رمادي)' : 'Hyundai Elantra (2021 · Graphite)'}
            </span>
            <span className={`font-bold ${colors.text}`} dir="ltr">A B C 1234</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? '٨.٢ كم' : '8.2 km'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'مسافة الرحلة' : 'Trip distance'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? '٦ دقائق' : '6 min'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'وقت الوصول' : 'Pickup ETA'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className="text-xs font-extrabold text-emerald-500">650</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'السعر · ج.م' : 'Price · EGP'}
              </p>
            </div>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T04')}>
            {isAr ? 'قبول طلب السحب · ٦٥٠ ج.م' : 'Accept Tow · 650 EGP'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToCaptainScreen('T02')}>
            {isAr ? 'رفض' : 'Decline'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // T04: Tow request details
    // ==========================================
    case 'T04':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تفاصيل طلب السحب' : 'Tow request details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · ونش سطحة' : 'FG-2606 · Flatbed Tow'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <div className="flex items-center gap-2.5">
              <img src={CUSTOMER_AVATAR} alt="Ahmed" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'هيونداي إلنترا · ٢٠٢١ · رمادي' : 'Hyundai Elantra · 2021 · Graphite'}
                </p>
              </div>
            </div>
            <div className={`flex justify-between pt-1.5 border-t ${colors.border}`}>
              <span className={colors.secondaryText}>{isAr ? 'لوحة المركبة' : 'Vehicle plate'}</span>
              <span className={`font-bold ${colors.text}`} dir="ltr">A B C 1234</span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <img src={FLATBED_IMAGE} alt="Car" className="w-full h-24 rounded-xl object-cover" />
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? '"السيارة لا تتحرك بأمان. متوقفة بجانب محطة الوقود في شارع التسعين. يرجى استخدام ونش سطحة."'
                : '"Vehicle won\'t move safely. Parked beside the petrol station on 90th Street. Please use a flatbed."'}
            </p>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'التكلفة التقديرية' : 'Estimated fare'}</span>
              <span className={`font-extrabold ${colors.text}`}>{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T05')}>
            {isAr ? 'بدء الملاحة إلى نقطة الالتقاء' : 'Start Navigation to Pickup'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // T05: Heading to pickup
    // ==========================================
    case 'T05':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'في الطريق لنقطة الالتقاء' : 'Heading to pickup'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · شارع التسعين، القاهرة الجديدة' : 'FG-2606 · 90th Street, New Cairo'}
            </p>
          </div>
          <RadarMapCanvas
            label={isAr ? '٦ دقائق · ٢.٤ كم لنقطة الالتقاء' : '6 min · 2.4 km to pickup'}
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
              <span className={colors.secondaryText}>{isAr ? 'هاتف العميل' : 'Customer phone'}</span>
              <span className={`font-bold ${colors.text}`} dir="ltr">+20 100 123 4567</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T06')}>
            {isAr ? 'وصلت إلى العميل' : 'Arrived at Customer'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToSharedScreen('SH01')}>
            {isAr ? 'محادثة مع أحمد' : 'Chat with Ahmed'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // T06: Load the vehicle safely
    // ==========================================
    case 'T06':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تحميل المركبة بأمان' : 'Load the vehicle safely'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · هيونداي إلنترا · A B C 1234' : 'FG-2606 · Hyundai Elantra · A B C 1234'}
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className={colors.secondaryText}>{isAr ? 'خطوة ٤ من ٧' : 'Step 4 of 7'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'وصل للموقع' : 'Arrived'}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-500/20 overflow-hidden">
              <div className="w-4/6 h-full bg-[#E51C23] rounded-full" />
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'قائمة التحقق من التحميل' : 'Loading checklist'}
            </p>
            <p className="text-emerald-500">{isAr ? '✓ تم التأكد من العميل والمركبة' : '✓ Customer & vehicle confirmed'}</p>
            <p className="text-emerald-500">{isAr ? '✓ تم تحرير فرامل اليد' : '✓ Parking brake released'}</p>
            <p className="text-emerald-500">{isAr ? '✓ تم ربط العجلات الأربع بإحكام' : '✓ All four wheels securely strapped'}</p>
            <p className="text-emerald-500">{isAr ? '✓ تم فحص أضواء الأمان والمنحدرات' : '✓ Safety lights and ramps checked'}</p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'صور حالة المركبة' : 'Vehicle condition photos'}
            </p>
            <img src={FLATBED_IMAGE} alt="Condition" className="w-full h-20 rounded-xl object-cover" />
            <SecondaryButton onClick={() => goToSharedScreen('SH18')}>
              <Upload size={14} /> {isAr ? 'رفع صورة' : 'Upload Photo'}
            </SecondaryButton>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T07')}>
            {isAr ? 'تأكيد تحميل المركبة' : 'Vehicle Loaded'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // T07: On the way to the center
    // ==========================================
    case 'T07':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'في الطريق إلى المركز' : 'On the way to the center'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · المركبة محملة بأمان' : 'FG-2606 · Vehicle securely loaded'}
            </p>
          </div>
          <RadarMapCanvas
            label={isAr ? '١٨ دقيقة · ٨.٢ كم' : '18 min · 8.2 km'}
            subtitle={isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
          />
          <div className="space-y-1">
            <div className="flex justify-between text-[11px]">
              <span className={colors.secondaryText}>{isAr ? 'خطوة ٥ من ٧' : 'Step 5 of 7'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'جاري النقل' : 'Working'}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-500/20 overflow-hidden">
              <div className="w-5/6 h-full bg-[#E51C23] rounded-full" />
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <div>
              <p className={`text-[10px] uppercase ${colors.secondaryText}`}>
                {isAr ? 'نقطة الالتقاء' : 'PICKUP'}
              </p>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              </p>
            </div>
            <div className={`pt-2 border-t ${colors.border}`}>
              <p className={`text-[10px] uppercase ${colors.secondaryText}`}>
                {isAr ? 'الوجهة · ٨.٢ كم' : 'DESTINATION · 8.2 KM'}
              </p>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'نايل أوتو كير، التجمع الخامس' : 'Nile Auto Care, Fifth Settlement'}
              </p>
            </div>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T14')}>
            {isAr ? 'وصلت إلى وجهة التسليم' : 'Arrived at Destination'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // T08: Another journey rescued
    // ==========================================
    case 'T08':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تم إنقاذ رحلة أخرى بنجاح' : 'Another journey rescued'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · تم التسليم إلى نايل أوتو كير' : 'FG-2606 · Delivered to Nile Auto Care'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Completed" text={isAr ? 'مكتمل · تم تأكيد التكلفة' : 'Completed · Cost confirmed'} />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex items-center gap-2.5 text-xs`}>
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
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? '٨.٢ كم' : '8.2 km'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'المسافة' : 'Distance'}</p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? '٤٣ دقيقة' : '43 min'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'المدة' : 'Duration'}</p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-xs font-extrabold ${colors.text}`}>5.0 ★</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'تقييمك' : 'Your rating'}</p>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'التكلفة الأساسية' : 'Flatbed tow · base fare'}</span>
              <span className={colors.text}>{isAr ? '٤٥٠ ج.م' : '450 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المسافة · ٨.٢ كم' : 'Distance · 8.2 km'}</span>
              <span className={colors.text}>{isAr ? '١٥٠ ج.م' : '150 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رسوم الخدمة' : 'Service fee'}</span>
              <span className={colors.text}>{isAr ? '٥٠ ج.م' : '50 EGP'}</span>
            </div>
            <div className={`flex justify-between pt-1.5 border-t ${colors.border} font-extrabold`}>
              <span className={colors.text}>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span className="text-emerald-500">{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T02')}>
            {isAr ? 'العودة إلى لوحة القيادة' : 'Back to Dashboard'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // T09: Your earnings (4,550 EGP)
    // ==========================================
    case 'T09':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'أرباحك' : 'Your earnings'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'محمود حسن · تم التحديث الآن' : 'Mahmoud Hassan · Updated just now'}
            </p>
          </div>
          <div className={`p-4 rounded-2xl border border-[#E51C23]/40 bg-[#E51C23]/10 space-y-1`}>
            <p className="text-[10px] uppercase tracking-wider text-[#E51C23] font-bold">
              {isAr ? 'الرصيد المتاح' : 'AVAILABLE BALANCE'}
            </p>
            <p className={`text-2xl font-extrabold ${colors.text}`}>
              {isAr ? '٤,٥٥٠ ج.م' : '4,550 EGP'}
            </p>
            <div className="flex justify-between text-[11px]">
              <span className={colors.secondaryText}>{isAr ? 'هذا الأسبوع' : 'This week'}</span>
              <span className="text-emerald-500 font-bold">+18.2%</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>7</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'مهام مكتملة' : 'Completed jobs'}</p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>1,950</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'اليوم' : 'Today'}</p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>4.9</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'التقييم' : 'Rating'}</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'الأرباح اليومية' : 'Daily earnings'}
            </p>
            {[
              { day: isAr ? 'اليوم · ٦ نوفمبر' : 'Today · 6 Nov', amt: isAr ? '١,٩٥٠ ج.م' : '1,950 EGP' },
              { day: isAr ? 'الخميس · ٥ نوفمبر' : 'Thu · 5 Nov', amt: isAr ? '١,٣٠٠ ج.م' : '1,300 EGP' },
              { day: isAr ? 'الأربعاء · ٤ نوفمبر' : 'Wed · 4 Nov', amt: isAr ? '١,٣٠٠ ج.م' : '1,300 EGP' }
            ].map((d) => (
              <div key={d.day} className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs`}>
                <div>
                  <p className={`font-bold ${colors.text}`}>{d.day}</p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>
                    {isAr ? '٢–٣ رحلات سطحة · تم الإيداع بالمحفظة' : '2–3 flatbed trips · Paid to wallet'}
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
    // T10: Captain profile
    // ==========================================
    case 'T10':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'الملف الشخصي للكابتن' : 'Captain profile'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'هويتك المهنية لخدمات السحب والإنقاذ.' : 'Your professional towing identity.'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <div className="flex items-center gap-2.5">
              <img src={DRIVER_AVATAR} alt="Mahmoud" className="w-11 h-11 rounded-xl object-cover" />
              <div>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'كابتن ونش · 4.9 ★ (١٢٨ رحلة)' : 'Tow Captain · 4.9 ★ (128 trips)'}
                </p>
              </div>
            </div>
            <StatusBadge status="Online" text={isAr ? 'كابتن ونش معتمد' : 'Verified Tow Captain'} />
          </div>
          <div className={`rounded-2xl border ${colors.border} ${colors.surface} overflow-hidden text-xs`}>
            <img src={FLATBED_IMAGE} alt="Flatbed" className="w-full h-24 object-cover" />
            <div className="p-3 space-y-1">
              <p className={`font-bold ${colors.text}`}>Unit FNG-042</p>
              <div className="flex justify-between">
                <span className={colors.secondaryText}>{isAr ? 'نوع الونش' : 'Truck type'}</span>
                <span className={`font-bold ${colors.text}`}>
                  {isAr ? 'إيسوزو سطحة' : 'Isuzu Flatbed'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={colors.secondaryText}>{isAr ? 'رقم اللوحة' : 'Truck plate'}</span>
                <span className={`font-bold ${colors.text}`} dir="ltr">C R T 9087</span>
              </div>
              <div className="flex justify-between">
                <span className={colors.secondaryText}>{isAr ? 'الحمولة' : 'Capacity'}</span>
                <span className={`font-bold ${colors.text}`}>{isAr ? '٣.٥ طن' : '3.5 tonnes'}</span>
              </div>
            </div>
          </div>
          {[
            { title: isAr ? 'رخصة القيادة' : 'Driving license', sub: isAr ? 'موثق · تنتهي ٢٠٢٨' : 'Verified · Expires 2028', target: 'SH17' },
            { title: isAr ? 'رخصة وتأمين الونش' : 'Vehicle registration & insurance', sub: isAr ? 'موثق · تنتهي ٢٠٢٧' : 'Verified · Expires 2027', target: 'SH17' },
            { title: isAr ? 'إعدادات التطبيق' : 'App settings', sub: isAr ? 'اللغة، الإشعارات، والمظهر' : 'Language, notifications, and preferences', target: 'SH06' }
          ].map((item) => (
            <button
              key={item.title}
              onClick={() => goToSharedScreen(item.target)}
              className={`w-full p-2.5 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-start text-xs`}
            >
              <div>
                <p className={`font-bold ${colors.text}`}>{item.title}</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>{item.sub}</p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
          ))}
          <PrimaryButton onClick={() => goToCaptainScreen('T15')}>
            {isAr ? 'تعديل الملف والونش' : 'Edit Profile'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // T11: Your trips hub
    // ==========================================
    case 'T11':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'مركز الرحلات' : 'Your trips'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'محمود حسن · وحدة FNG-042' : 'Mahmoud Hassan · Unit FNG-042'}
            </p>
          </div>
          <div
            onClick={() => goToCaptainScreen('T03')}
            className="p-3.5 rounded-2xl border border-[#E51C23]/30 bg-[#E51C23]/5 space-y-1.5 cursor-pointer text-xs"
          >
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'هيونداي إلنترا · ونش سطحة' : 'Hyundai Elantra · Flatbed Tow'}
            </p>
            <StatusBadge status="Pending" text={isAr ? 'وارد · الرد خلال 00:28' : 'Incoming · Respond in 00:28'} />
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'نقطة الالتقاء' : 'Pickup'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الوجهة' : 'Destination'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
              </span>
            </div>
            <div className="flex justify-between font-extrabold text-[#E51C23]">
              <span>{isAr ? 'عرض الرحلة · ٨.٢ كم' : 'Trip offer · 8.2 km'}</span>
              <span>{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
          </div>
          <RadarMapCanvas
            label={isAr ? 'شارع التسعين' : '90th Street'}
            subtitle="FG-2606"
          />
          <div
            onClick={() => goToCaptainScreen('T07')}
            className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 cursor-pointer text-xs`}
          >
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'الرحلة النشطة · FG-2606' : 'Active trip · FG-2606'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'المركبة محملة بأمان · في الطريق للمركز' : 'Vehicle securely loaded · In transit to center'}
            </p>
            <span className="inline-block text-[11px] font-bold text-[#E51C23] pt-1">
              {isAr ? 'متابعة الرحلة النشطة ←' : 'Continue Active Trip →'}
            </span>
          </div>
        </div>
      );

    // ==========================================
    // T12: Trip history
    // ==========================================
    case 'T12':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'سجل الرحلات' : 'Trip history'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'كل رحلة ساعدت في إنقاذها.' : "Every journey you've helped rescue."}
            </p>
          </div>
          {[
            {
              id: 'FG-2606',
              title: isAr ? 'FG-2606 · ونش سطحة' : 'FG-2606 · Flatbed Tow',
              status: 'Completed',
              badge: isAr ? 'مكتمل · تم تأكيد النقدية' : 'Completed · Cash confirmed',
              customer: isAr ? 'أحمد محمد · هيونداي إلنترا' : 'Ahmed Mohamed · Hyundai Elantra',
              date: isAr ? '٦ نوفمبر · ١٤:٤٥' : '6 Nov · 14:45',
              amt: isAr ? '٦٥٠ ج.م' : '650 EGP'
            },
            {
              id: 'FG-2603',
              title: isAr ? 'FG-2603 · ونش سطحة' : 'FG-2603 · Flatbed Tow',
              status: 'Completed',
              badge: isAr ? 'مكتمل' : 'Completed',
              customer: isAr ? 'سلمى نبيل · كيا سبورتاج' : 'Salma Nabil · Kia Sportage',
              date: isAr ? '٥ نوفمبر · ١٧:٢٠' : '5 Nov · 17:20',
              amt: isAr ? '٧٠٠ ج.م' : '700 EGP'
            },
            {
              id: 'FG-2597',
              title: isAr ? 'FG-2597 · ونش سطحة' : 'FG-2597 · Flatbed Tow',
              status: 'Cancelled',
              badge: isAr ? 'ألغيت قبل الالتقاء · ٤ نوفمبر' : 'Cancelled before pickup · 4 Nov',
              customer: isAr ? 'المبلغ المحصل' : 'Collected',
              date: isAr ? '٤ نوفمبر ٢٠٢٦' : '4 Nov 2026',
              amt: isAr ? '٠ ج.م' : '0 EGP'
            }
          ].map((t) => (
            <div
              key={t.id}
              onClick={() => goToCaptainScreen('T13')}
              className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 cursor-pointer text-xs`}
            >
              <div className="flex justify-between">
                <span className={`font-bold ${colors.text}`}>{t.title}</span>
                <span className={`font-extrabold ${colors.text}`}>{t.amt}</span>
              </div>
              <StatusBadge status={t.status} text={t.badge} />
              <div className="flex justify-between pt-1">
                <span className={`text-[11px] ${colors.secondaryText}`}>{t.customer}</span>
                <span className="text-[11px] font-bold text-[#E51C23]">
                  {isAr ? 'عرض الرحلة ←' : 'View Trip →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      );

    // ==========================================
    // T13: Trip details & receipt
    // ==========================================
    case 'T13':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تفاصيل الرحلة والإيصال' : 'Trip details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · ٦ نوفمبر ٢٠٢٦' : 'FG-2606 · 6 November 2026'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'أحمد محمد · هيونداي إلنترا' : 'Ahmed Mohamed · Hyundai Elantra'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'شارع التسعين، القاهرة الجديدة ← نايل أوتو كير'
                : '90th Street, New Cairo → Nile Auto Care, Fifth Settlement'}
            </p>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>
                {isAr ? 'المسافة والمدة' : 'Trip distance & duration'}
              </span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٨.٢ كم · ٤٣ دقيقة' : '8.2 km · 43 min'}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'التسلسل الزمني الكامل' : 'Complete timeline'}
            </p>
            {[
              { s: isAr ? 'تم الطلب' : 'Requested', t: '14:02' },
              { s: isAr ? 'تم التعيين' : 'Matched', t: '14:03' },
              { s: isAr ? 'في الطريق' : 'En route', t: '14:04' },
              { s: isAr ? 'وصل للموقع' : 'Arrived', t: '14:10' },
              { s: isAr ? 'جاري النقل' : 'Working', t: '14:15' },
              { s: isAr ? 'الدفع' : 'Payment', t: '14:44' },
              { s: isAr ? 'مكتمل' : 'Completed', t: '14:45' }
            ].map((row) => (
              <div key={row.s} className="flex justify-between text-[11px]">
                <span className={colors.text}>• {row.s}</span>
                <span className={colors.secondaryText}>{row.t}</span>
              </div>
            ))}
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'إيصال النقدية' : 'Cash receipt'}</p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'أساسي + مسافة + رسوم' : 'Base + distance + service fee'}
              </span>
              <span className={colors.text}>450 + 150 + 50</span>
            </div>
            <div className="flex justify-between font-extrabold text-emerald-500">
              <span>{isAr ? 'إجمالي المحصل' : 'Total collected'}</span>
              <span>{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T09')}>
            {isAr ? 'عرض الأرباح وإيصال النقدية' : 'View Cash Receipt'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // T14: Handover & collect payment
    // ==========================================
    case 'T14':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تسليم المركبة وتحصيل الدفعة' : 'Handover & collect payment'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · وصلت إلى نايل أوتو كير' : 'FG-2606 · Arrived at Nile Auto Care'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Online" text={isAr ? 'تم الوصول للوجهة' : 'Destination reached'} />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'قائمة التحقق من الإنزال الآمن' : 'Safe unloading checklist'}
            </p>
            <p className="text-emerald-500">
              {isAr ? '✓ الونش متوقف على أرض مستوية وآمنة' : '✓ Flatbed parked on safe, level ground'}
            </p>
            <p className="text-emerald-500">
              {isAr ? '✓ تم إنزال المركبة وشد فرامل اليد' : '✓ Vehicle unloaded and parking brake set'}
            </p>
            <p className="text-emerald-500">
              {isAr ? '✓ تم تسليم المركبة والمفتاح بأمان' : '✓ Vehicle and key handed over safely'}
            </p>
            <p className="text-emerald-500">
              {isAr ? '✓ أكد العميل / المركز حالة المركبة' : '✓ Customer / center confirms condition'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'تحصيل النقدية' : 'Collect cash'}</p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'التكلفة الأساسية' : 'Base fare'}</span>
              <span className={colors.text}>{isAr ? '٤٥٠ ج.م' : '450 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المسافة · ٨.٢ كم' : 'Distance · 8.2 km'}</span>
              <span className={colors.text}>{isAr ? '١٥٠ ج.م' : '150 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رسوم الخدمة' : 'Service fee'}</span>
              <span className={colors.text}>{isAr ? '٥٠ ج.م' : '50 EGP'}</span>
            </div>
            <div className={`flex justify-between pt-1.5 border-t ${colors.border} font-extrabold`}>
              <span className={colors.text}>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span className="text-[#E51C23]">{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T08')}>
            {isAr ? 'إنهاء الرحلة · تم استلام ٦٥٠ ج.م' : 'Finish Trip'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // T15: Edit captain & truck
    // ==========================================
    case 'T15':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تعديل بيانات الكابتن والونش' : 'Edit captain & truck'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'محمود حسن · كابتن ونش معتمد' : 'Mahmoud Hassan · Verified Tow Captain'}
            </p>
          </div>
          <div className="space-y-2">
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الاسم الكامل' : 'Full name'}
              </label>
              <input
                defaultValue={isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'الهاتف' : 'Phone'}</label>
                <input
                  defaultValue="+20 100 245 6789"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'البريد' : 'Email'}</label>
                <input
                  defaultValue="mahmoud@fixngo.eg"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
            </div>
          </div>
          <img src={FLATBED_IMAGE} alt="Flatbed" className="w-full h-20 rounded-2xl object-cover" />
          <div className="space-y-2">
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'ماركة ونوع الونش' : 'Truck make & type'}
              </label>
              <input
                defaultValue={isAr ? 'إيسوزو سطحة' : 'Isuzu Flatbed'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'لوحة الونش' : 'Truck plate'}
                </label>
                <input
                  defaultValue="C R T 9087"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'الحمولة' : 'Capacity'}
                </label>
                <input
                  defaultValue={isAr ? '٣.٥ طن' : '3.5 tonnes'}
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
            </div>
          </div>
          <PrimaryButton onClick={() => goToCaptainScreen('T10')}>
            {isAr ? 'حفظ التغييرات' : 'Save Changes'}
          </PrimaryButton>
        </div>
      );
  }
}
