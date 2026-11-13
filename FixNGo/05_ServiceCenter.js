import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  BookOpen,
  Wrench,
  Star,
  BarChart3,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  Settings,
  Edit3,
  AlertCircle,
  Plus
} from 'lucide-react';

export const CENTER_SCREENS = [
  { id: 'SC01', label: 'SC01 · Nile Auto Care overview', labelAr: 'SC01 · نظرة عامة (نايل أوتو كير)', tab: 'Overview' },
  { id: 'SC02', label: 'SC02 · Appointments list', labelAr: 'SC02 · قائمة المواعيد', tab: 'Bookings' },
  { id: 'SC03', label: 'SC03 · Appointment detail (BK-2048)', labelAr: 'SC03 · تفاصيل الموعد (BK-2048)', tab: 'Bookings' },
  { id: 'SC04', label: 'SC04 · Service catalog', labelAr: 'SC04 · قائمة الخدمات والأسعار', tab: 'Catalog' },
  { id: 'SC05', label: 'SC05 · Edit service (Oil & filter)', labelAr: 'SC05 · تعديل خدمة (زيت وفلتر)', tab: 'Catalog' },
  { id: 'SC06', label: 'SC06 · Work orders (WO-3102)', labelAr: 'SC06 · أوامر الشغل (WO-3102)', tab: 'Bookings' },
  { id: 'SC07', label: 'SC07 · Driver reviews (4.8★)', labelAr: 'SC07 · تقييمات السائقين (4.8★)', tab: 'Overview' },
  { id: 'SC08', label: 'SC08 · Center reports (62.4k EGP)', labelAr: 'SC08 · تقارير المركز (٦٢.٤ ألف ج.م)', tab: 'Reports' },
  { id: 'SC09', label: 'SC09 · Center profile', labelAr: 'SC09 · الملف الشخصي للمركز', tab: 'Profile' },
  { id: 'SC10', label: 'SC10 · Appointment calendar', labelAr: 'SC10 · تقويم المواعيد', tab: 'Bookings' },
  { id: 'SC11', label: 'SC11 · Accepted appointment', labelAr: 'SC11 · موعد مقبول', tab: 'Bookings' },
  { id: 'SC12', label: 'SC12 · Complete service & invoice', labelAr: 'SC12 · إتمام الخدمة والفاتورة', tab: 'Bookings' },
  { id: 'SC13', label: 'SC13 · Assign a work order', labelAr: 'SC13 · تعيين أمر شغل', tab: 'Bookings' },
  { id: 'SC14', label: 'SC14 · Work order details', labelAr: 'SC14 · تفاصيل أمر الشغل', tab: 'Bookings' },
  { id: 'SC15', label: 'SC15 · Edit working hours', labelAr: 'SC15 · تعديل ساعات العمل', tab: 'Profile' },
  { id: 'SC16', label: 'SC16 · Reject appointment?', labelAr: 'SC16 · رفض الموعد؟', tab: 'Bookings' }
];

// Main screens corresponding to the 5 bottom navigation tabs (no Back button shown on these)
export const CENTER_MAIN_SCREENS = ['SC01', 'SC02', 'SC04', 'SC08', 'SC09'];

export const CENTER_FALLBACK_BACK = {
  SC03: 'SC02',
  SC05: 'SC04',
  SC06: 'SC01',
  SC07: 'SC01',
  SC10: 'SC02',
  SC11: 'SC03',
  SC12: 'SC11',
  SC13: 'SC06',
  SC14: 'SC06',
  SC15: 'SC09',
  SC16: 'SC03'
};

export default function ServiceCenterModule({
  centerScreen,
  colors,
  isAr,
  WORKSHOP_IMAGE,
  PrimaryButton,
  SecondaryButton,
  goToCenterScreen,
  goToSharedScreen
}) {
  const ForwardChevron = isAr ? ChevronLeft : ChevronRight;
  const [apptFilter, setApptFilter] = useState('Pending');
  const [woFilter, setWoFilter] = useState('In progress');
  const [reviewFilter, setReviewFilter] = useState('All reviews');
  const [reportPeriod, setReportPeriod] = useState('This week');
  const [selectedCalDay, setSelectedCalDay] = useState('Sat 7');
  const [catalogToggles, setCatalogToggles] = useState({
    oil: true,
    brake: true,
    diag: true,
    ac: false
  });
  const [editServiceActive, setEditServiceActive] = useState(true);
  const [fridayOpen, setFridayOpen] = useState(false);
  const [supervisorReviewed, setSupervisorReviewed] = useState(false);

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

  switch (centerScreen) {
    /* =====================================================================
     * SC01: Nile Auto Care overview
     * ===================================================================== */
    case 'SC01':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نظرة عامة على المركز · الجمعة، ٦ نوفمبر' : 'Center overview · Friday, 6 November'}
            </p>
          </div>

          <div className="w-full h-28 rounded-2xl overflow-hidden border border-white/10">
            <img src={WORKSHOP_IMAGE} alt="Nile Auto Care" className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-base font-extrabold ${colors.text}`}>{isAr ? '١٢' : '12'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'حجوزات اليوم' : 'Bookings today'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-base font-extrabold ${colors.text}`}>{isAr ? '٨' : '8'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'خدمات نشطة' : 'Active services'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-base font-extrabold ${colors.text}`}>{isAr ? '٤.٨ ★' : '4.8 ★'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'التقييم' : 'Rating'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'إدارة المركز' : 'Manage your center'}
            </p>
            {[
              {
                icon: Calendar,
                title: isAr ? 'المواعيد' : 'Appointments',
                meta: isAr ? '٣ قيد الانتظار' : '3 pending',
                target: 'SC02'
              },
              {
                icon: BookOpen,
                title: isAr ? 'قائمة الخدمات' : 'Catalog',
                meta: isAr ? '٨ خدمات نشطة' : '8 active services',
                target: 'SC04'
              },
              {
                icon: Wrench,
                title: isAr ? 'أوامر الشغل' : 'Work Orders',
                meta: isAr ? '٤ حارات قيد العمل' : '4 bays in progress',
                target: 'SC06'
              },
              {
                icon: Star,
                title: isAr ? 'التقييمات' : 'Reviews',
                meta: isAr ? '٢١٦ تقييم سائق' : '216 driver reviews',
                target: 'SC07'
              },
              {
                icon: BarChart3,
                title: isAr ? 'التقارير' : 'Reports',
                meta: isAr ? 'الإيرادات والأداء' : 'Revenue & performance',
                target: 'SC08'
              }
            ].map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.target}
                  onClick={() => goToCenterScreen(item.target)}
                  className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between text-start`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp size={16} className="text-red-500" />
                    <span className={`text-xs font-bold ${colors.text}`}>{item.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] ${colors.secondaryText}`}>{item.meta}</span>
                    <ForwardChevron size={14} className={colors.secondaryText} />
                  </div>
                </button>
              );
            })}
          </div>

          <p className={`text-[11px] ${colors.secondaryText}`}>
            {isAr ? 'مفتوح اليوم · ٩:٠٠ ص – ٨:٠٠ م' : 'Open today · 9:00 AM – 8:00 PM'}
          </p>
        </div>
      );

    /* =====================================================================
     * SC02: Appointments list
     * ===================================================================== */
    case 'SC02':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'المواعيد' : 'Appointments'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نايل أوتو كير · ١٢ حجز اليوم' : 'Nile Auto Care · 12 bookings today'}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'Pending', label: isAr ? 'انتظار' : 'Pending' },
              { id: 'Confirmed', label: isAr ? 'مؤكد' : 'Confirmed' },
              { id: 'In-Progress', label: isAr ? 'جاري' : 'In-Progress' },
              { id: 'Completed', label: isAr ? 'مكتمل' : 'Completed' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setApptFilter(tab.id)}
                className={`py-2 rounded-xl text-[10px] font-bold border ${
                  apptFilter === tab.id
                    ? `${colors.border} ${colors.surface} ${colors.text} shadow-sm`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${colors.secondaryText}`}>
              {isAr ? 'المواعيد القادمة' : 'Upcoming appointments'}
            </span>
            <button
              onClick={() => goToCenterScreen('SC10')}
              className={`text-xs font-extrabold ${colors.text} flex items-center gap-1`}
            >
              <span>{isAr ? 'التقويم ←' : 'Calendar →'}</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {[
              {
                id: 'BK-2048',
                service: isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change',
                customer: isAr ? 'أحمد محمد · هيونداي إلنترا' : 'Ahmed Mohamed · Hyundai Elantra',
                time: isAr ? '٧ نوفمبر · ١٠:٠٠ ص' : '7 Nov · 10:00 AM',
                price: isAr ? '٨٥٠ ج.م' : '850 EGP'
              },
              {
                id: 'BK-2049',
                service: isAr ? 'فحص الفرامل' : 'Brake inspection',
                customer: isAr ? 'سلمى نبيل · كيا سبورتاج' : 'Salma Nabil · Kia Sportage',
                time: isAr ? 'اليوم · ٤:٠٠ م' : 'Today · 4:00 PM',
                price: isAr ? '٣٥٠ ج.م' : '350 EGP'
              },
              {
                id: 'BK-2050',
                service: isAr ? 'فحص شامل بالكمبيوتر' : 'Full diagnostics',
                customer: isAr ? 'عمر فتحي · هيونداي إلنترا' : 'Omar Fathy · Hyundai Elantra',
                time: isAr ? 'اليوم · ٥:٣٠ م' : 'Today · 5:30 PM',
                price: isAr ? '٦٠٠ ج.م' : '600 EGP'
              }
            ].map((bk) => (
              <button
                key={bk.id}
                onClick={() => goToCenterScreen('SC03')}
                className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-1.5`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-semibold ${colors.secondaryText}`}>{bk.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
                    {isAr ? '• قيد الانتظار' : '• Pending'}
                  </span>
                </div>
                <p className={`text-xs font-extrabold ${colors.text}`}>{bk.service}</p>
                <p className={`text-[11px] ${colors.secondaryText}`}>{bk.customer}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className={`text-[11px] ${colors.secondaryText}`}>{bk.time}</span>
                  <span className={`text-xs font-extrabold ${colors.text}`}>{bk.price}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      );

    /* =====================================================================
     * SC03: Appointment detail (BK-2048)
     * ===================================================================== */
    case 'SC03':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تفاصيل الموعد' : 'Appointment detail'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'BK-2048 · تم الإنشاء ٦ نوفمبر، ١:٢٠ م' : 'BK-2048 · Created 6 Nov, 1:20 PM'}
            </p>
          </div>

          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
            {isAr ? '• بانتظار الموافقة' : '• Pending approval'}
          </span>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-600/15 text-red-500 flex items-center justify-center font-extrabold text-xs">
                  AM
                </div>
                <div>
                  <p className={`text-xs font-extrabold ${colors.text}`}>
                    {isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
                  </p>
                  <p className={`text-[11px] ${colors.secondaryText}`}>+20 100 123 4567</p>
                </div>
              </div>
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <div className="space-y-1 text-xs pt-1 border-t border-slate-500/10">
              <div className="flex justify-between">
                <span className={colors.secondaryText}>{isAr ? 'المركبة' : 'Vehicle'}</span>
                <span className={`font-bold ${colors.text}`}>
                  {isAr ? 'هيونداي إلنترا · ٢٠٢١' : 'Hyundai Elantra · 2021'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={colors.secondaryText}>{isAr ? 'اللوحة' : 'Plate'}</span>
                <span className={`font-bold ${colors.text}`}>A B C 1234</span>
              </div>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الموعد' : 'Time slot'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٧ نوفمبر · ١٠:٠٠–١٠:٤٥' : '7 Nov · 10:00–10:45'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'السعر' : 'Price'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
            </div>
            <p className={`text-[11px] ${colors.secondaryText} pt-1`}>
              {isAr
                ? 'ملاحظة العميل: يرجى فحص ضغط الإطارات أيضاً.'
                : 'Customer note: Please check tire pressure too.'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2`}>
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'سير عمل الموعد' : 'Appointment workflow'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                disabled
                className="py-2 rounded-xl border border-slate-500/20 text-[11px] font-semibold text-slate-400 cursor-not-allowed"
              >
                {isAr ? 'بدء الخدمة' : 'Start Service'}
              </button>
              <button
                disabled
                className="py-2 rounded-xl border border-slate-500/20 text-[11px] font-semibold text-slate-400 cursor-not-allowed"
              >
                {isAr ? 'إتمام الخدمة' : 'Complete Service'}
              </button>
            </div>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr
                ? 'متاح بعد قبول الموعد وبدء الخدمة.'
                : 'Available after acceptance and service start.'}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToCenterScreen('SC11')}>
              {isAr ? 'قبول الموعد' : 'Accept Appointment'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToCenterScreen('SC16')}>
              {isAr ? 'رفض الموعد' : 'Reject Appointment'}
            </FallbackSecondary>
          </div>
        </div>
      );

    /* =====================================================================
     * SC04: Service catalog
     * ===================================================================== */
    case 'SC04':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'قائمة الخدمات' : 'Service catalog'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'حافظ على وضوح وتحديث خدماتك وأسعارك.' : 'Keep your services clear and up to date.'}
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              {
                key: 'oil',
                name: isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change',
                duration: isAr ? '٤٥ د' : '45 min',
                price: isAr ? '٨٥٠ ج.م' : '850 EGP'
              },
              {
                key: 'brake',
                name: isAr ? 'فحص الفرامل' : 'Brake inspection',
                duration: isAr ? '٣٠ د' : '30 min',
                price: isAr ? '٣٥٠ ج.م' : '350 EGP'
              },
              {
                key: 'diag',
                name: isAr ? 'فحص شامل بالكمبيوتر' : 'Full diagnostics',
                duration: isAr ? '٦٠ د' : '60 min',
                price: isAr ? '٦٠٠ ج.م' : '600 EGP'
              },
              {
                key: 'ac',
                name: isAr ? 'صيانة التكييف' : 'AC maintenance',
                duration: isAr ? '٩٠ د' : '90 min',
                price: isAr ? '١,٢٠٠ ج.م' : '1,200 EGP'
              }
            ].map((srv) => {
              const isActive = catalogToggles[srv.key];
              return (
                <div
                  key={srv.key}
                  onClick={() => goToCenterScreen('SC05')}
                  className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between cursor-pointer`}
                >
                  <div className="space-y-1">
                    <p className={`text-xs font-extrabold ${colors.text}`}>{srv.name}</p>
                    <p className={`text-[11px] ${colors.secondaryText}`}>
                      {srv.duration} · {isActive ? (isAr ? 'نشط' : 'Active') : isAr ? 'غير نشط' : 'Inactive'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCatalogToggles((prev) => ({ ...prev, [srv.key]: !prev[srv.key] }));
                      }}
                      className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                        isActive ? 'bg-emerald-500 justify-end' : 'bg-slate-600 justify-start'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-white shadow" />
                    </button>
                    <span className={`text-xs font-extrabold ${colors.text}`}>{srv.price}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className={`text-[11px] ${colors.secondaryText}`}>
            {isAr
              ? 'اضغط على أي خدمة لتعديل تفاصيلها وتوافرها.'
              : 'Tap a service to edit its details and availability.'}
          </p>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => goToCenterScreen('SC05')}
              className="px-4 py-2.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md"
            >
              <Plus size={14} />
              <span>{isAr ? 'إضافة خدمة' : 'Add Service'}</span>
            </button>
          </div>
        </div>
      );

    /* =====================================================================
     * SC05: Edit service (Oil & filter)
     * ===================================================================== */
    case 'SC05':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تعديل الخدمة' : 'Edit service'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نايل أوتو كير · قائمة الخدمات' : 'Nile Auto Care · Service catalog'}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className={`text-[11px] font-semibold ${colors.secondaryText}`}>
              {isAr ? 'اسم الخدمة' : 'Service name'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center`}>
              <span className={`text-xs font-bold ${colors.text}`}>
                {isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change'}
              </span>
              <Edit3 size={14} className={colors.secondaryText} />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-[11px] font-semibold ${colors.secondaryText}`}>
              {isAr ? 'الوصف' : 'Description'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr
                ? 'استبدال زيت المحرك الأصلي مع فلتر جديد وفحص سلامة المركبة من ١٠ نقاط.'
                : 'Premium engine oil replacement, new filter and a 10-point vehicle health check.'}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1.5">
              <label className={`text-[11px] font-semibold ${colors.secondaryText}`}>
                {isAr ? 'السعر · ج.م' : 'Price · EGP'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center`}>
                <span className={`text-xs font-bold ${colors.text}`}>{isAr ? '٨٥٠' : '850'}</span>
                <span className={`text-[10px] ${colors.secondaryText}`}>EGP</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className={`text-[11px] font-semibold ${colors.secondaryText}`}>
                {isAr ? 'المدة · دقائق' : 'Duration · mins'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center`}>
                <span className={`text-xs font-bold ${colors.text}`}>{isAr ? '٤٥' : '45'}</span>
                <Clock size={14} className={colors.secondaryText} />
              </div>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between`}>
            <div>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? 'خدمة نشطة' : 'Active service'}
              </p>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr
                  ? 'مرئية لمالكي السيارات ومتاحة للحجز.'
                  : 'Visible to car owners and available for bookings.'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEditServiceActive(!editServiceActive)}
              className={`w-10 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                editServiceActive ? 'bg-emerald-500 justify-end' : 'bg-slate-600 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow" />
            </button>
          </div>

          <PrimaryButton onClick={() => goToCenterScreen('SC04')}>
            {isAr ? 'حفظ الخدمة' : 'Save Service'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SC06: Work orders
     * ===================================================================== */
    case 'SC06':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'أوامر الشغل' : 'Work orders'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? '٤ إصلاحات نشطة · حارتان متاحتان' : '4 active repairs · 2 bays available'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'In progress', label: isAr ? 'قيد التنفيذ' : 'In progress' },
              { id: 'Ready', label: isAr ? 'جاهز' : 'Ready' },
              { id: 'All orders', label: isAr ? 'الكل' : 'All orders' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setWoFilter(tab.id)}
                className={`py-2 rounded-xl text-[11px] font-bold border ${
                  woFilter === tab.id
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
              onClick={() => goToCenterScreen('SC14')}
              className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-1.5`}
            >
              <div className="flex justify-between items-center text-[11px]">
                <span className={colors.secondaryText}>
                  {isAr ? 'WO-3102 · أحمد محمد' : 'WO-3102 · Ahmed Mohamed'}
                </span>
                <span className={`font-extrabold ${colors.text}`}>{isAr ? 'حارة ٠٢' : 'Bay 02'}</span>
              </div>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? 'هيونداي إلنترا · فحص شامل' : 'Hyundai Elantra · Diagnostics'}
              </p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-500">
                {isAr ? '• قيد التنفيذ' : '• In progress'}
              </span>
              <div className="flex justify-between text-xs pt-1">
                <span className={colors.secondaryText}>{isAr ? 'الميكانيكي المعين' : 'Assigned mechanic'}</span>
                <span className={`font-bold ${colors.text}`}>{isAr ? 'حسن علي' : 'Hassan Ali'}</span>
              </div>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr
                  ? 'ملاحظات الميكانيكي: فحص العفشة الأمامية بعد السحب. بانتظار تقرير الفحص.'
                  : 'Mechanic notes: Checking front suspension after tow. Awaiting diagnostic report.'}
              </p>
              <div className="flex justify-between text-[11px] pt-1">
                <span className={colors.secondaryText}>{isAr ? 'بدأ ١٤:٥٠' : 'Started 14:50'}</span>
                <span className={`font-bold ${colors.text}`}>{isAr ? 'مضى ٣٥ د' : '35 min elapsed'}</span>
              </div>
            </button>

            <button
              onClick={() => goToCenterScreen('SC14')}
              className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-1.5`}
            >
              <div className="flex justify-between items-center text-[11px]">
                <span className={colors.secondaryText}>
                  {isAr ? 'WO-3101 · سلمى نبيل' : 'WO-3101 · Salma Nabil'}
                </span>
                <span className={`font-extrabold ${colors.text}`}>{isAr ? 'حارة ٠١' : 'Bay 01'}</span>
              </div>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? 'كيا سبورتاج · خدمة الفرامل' : 'Kia Sportage · Brake service'}
              </p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-500">
                {isAr ? '• قيد التنفيذ' : '• In progress'}
              </span>
              <div className="flex justify-between text-xs pt-1">
                <span className={colors.secondaryText}>{isAr ? 'الميكانيكي المعين' : 'Assigned mechanic'}</span>
                <span className={`font-bold ${colors.text}`}>{isAr ? 'طارق سمير' : 'Tarek Samir'}</span>
              </div>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr
                  ? 'ملاحظات الميكانيكي: تم استبدال التيل الأمامي. يتبقى اختبار الطريق وفحص السوائل.'
                  : 'Mechanic notes: Front pads replaced. Road test and fluid check remaining.'}
              </p>
              <div className="flex justify-between text-[11px] pt-1">
                <span className={colors.secondaryText}>{isAr ? 'بدأ ١٤:٢٠' : 'Started 14:20'}</span>
                <span className={`font-bold ${colors.text}`}>{isAr ? 'مضى ٦٥ د' : '65 min elapsed'}</span>
              </div>
            </button>
          </div>

          <div className="space-y-1.5 pt-1">
            <p className={`text-[11px] font-semibold ${colors.secondaryText}`}>
              {isAr ? 'تعيين أمر شغل جديد' : 'Assign a new work order'}
            </p>
            <button
              onClick={() => goToCenterScreen('SC13')}
              className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}
            >
              <span>{isAr ? 'اختر الحجز والحارة المتاحة' : 'Choose booking & available bay'}</span>
              <ForwardChevron size={15} className={colors.secondaryText} />
            </button>
          </div>
        </div>
      );

    /* =====================================================================
     * SC07: Driver reviews
     * ===================================================================== */
    case 'SC07':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تقييمات السائقين' : 'Driver reviews'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نايل أوتو كير · موثوق من مجتمعك' : 'Nile Auto Care · Trusted by your community'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1`}>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-extrabold ${colors.text}`}>{isAr ? '٤.٨' : '4.8'}</span>
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className={`text-xs ${colors.secondaryText}`}>
                {isAr ? '٢١٦ تقييم' : '216 reviews'}
              </span>
            </div>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? '٩٤٪ من السائقين يوصون بمركزك' : '94% of drivers recommend your center'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'All reviews', label: isAr ? 'كل التقييمات' : 'All reviews' },
              { id: '5 stars', label: isAr ? '٥ نجوم' : '5 stars' },
              { id: 'With comments', label: isAr ? 'بتعليقات' : 'With comments' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReviewFilter(tab.id)}
                className={`py-2 rounded-xl text-[10px] font-bold border ${
                  reviewFilter === tab.id
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
                name: isAr ? 'سلمى نبيل' : 'Salma Nabil',
                date: isAr ? '٤ نوفمبر ٢٠٢٦' : '4 Nov 2026',
                stars: '★★★★★',
                text: isAr
                  ? 'أسعار واضحة وخدمة ممتازة. سيارتي كانت جاهزة في الموعد تماماً.'
                  : 'Clear pricing and excellent service. My car was ready right on time.'
              },
              {
                name: isAr ? 'عمر فتحي' : 'Omar Fathy',
                date: isAr ? '٣ نوفمبر ٢٠٢٦' : '3 Nov 2026',
                stars: '★★★★★',
                text: isAr
                  ? 'فريق محترف. شرحوا لي نتائج الفحص قبل البدء في العمل.'
                  : 'Professional team. Explained the diagnostics before starting.'
              },
              {
                name: isAr ? 'منى عادل' : 'Mona Adel',
                date: isAr ? '١ نوفمبر ٢٠٢٦' : '1 Nov 2026',
                stars: '★★★★☆',
                text: isAr
                  ? 'ورشة نظيفة وتجربة حجز سلسة.'
                  : 'Clean workshop and a smooth booking experience.'
              }
            ].map((rev, i) => (
              <div
                key={i}
                className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className={`font-bold ${colors.secondaryText}`}>{rev.name}</span>
                  <span className={`text-[11px] font-semibold ${colors.text}`}>{rev.date}</span>
                </div>
                <p className="text-amber-400 text-xs">{rev.stars}</p>
                <p className={`text-xs ${colors.text}`}>{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      );

    /* =====================================================================
     * SC08: Center reports
     * ===================================================================== */
    case 'SC08':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تقارير المركز' : 'Center reports'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'افهم مؤشرات نمو وأداء مركزك.' : 'Understand what drives your business.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'This week', label: isAr ? 'هذا الأسبوع' : 'This week' },
              { id: 'This month', label: isAr ? 'هذا الشهر' : 'This month' },
              { id: 'Custom', label: isAr ? 'مخصص' : 'Custom' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReportPeriod(tab.id)}
                className={`py-2 rounded-xl text-[11px] font-bold border ${
                  reportPeriod === tab.id
                    ? `${colors.border} ${colors.surface} ${colors.text}`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>{isAr ? '٨٤' : '84'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'إجمالي الحجوزات' : 'Total bookings'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>{isAr ? '٦٢.٤ ألف' : '62.4k'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الإيرادات · ج.م' : 'Revenue · EGP'}
              </p>
            </div>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface}`}>
              <p className={`text-sm font-extrabold ${colors.text}`}>{isAr ? '٤.٨' : '4.8'}</p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'متوسط التقييم' : 'Avg. rating'}
              </p>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-3`}>
            <div className="flex justify-between items-center text-xs">
              <span className={colors.secondaryText}>
                {isAr ? 'الإيرادات مقارنة بالأسبوع الماضي' : 'Revenue vs. last week'}
              </span>
              <span className="font-extrabold text-emerald-500">+18.6%</span>
            </div>
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'أعلى الخدمات طلباً' : 'Top services'}
            </p>
            <div className="grid grid-cols-4 gap-3 items-end h-28 pt-4 px-2">
              {[
                { label: isAr ? 'زيت' : 'Oil', count: 32, h: 'h-20' },
                { label: isAr ? 'فرامل' : 'Brakes', count: 24, h: 'h-14' },
                { label: isAr ? 'فحص' : 'Diag.', count: 18, h: 'h-11' },
                { label: isAr ? 'تكييف' : 'AC', count: 10, h: 'h-7' }
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] font-bold text-red-500">{bar.count}</span>
                  <div className={`w-7 ${bar.h} bg-red-600 rounded-t-md`} />
                  <span className={`text-[10px] ${colors.secondaryText}`}>{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٣٨٪ من الحجوزات' : '38% of bookings'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'مكتمل في الموعد' : 'Completed on time'}</span>
              <span className={`font-bold ${colors.text}`}>96%</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'عملاء متكررون' : 'Repeat customers'}</span>
              <span className={`font-bold ${colors.text}`}>42%</span>
            </div>
          </div>

          <p className={`text-[11px] ${colors.secondaryText}`}>
            {isAr ? 'فترة التقرير · ٣١ أكتوبر – ٦ نوفمبر ٢٠٢٦' : 'Report period · 31 Oct – 6 Nov 2026'}
          </p>
        </div>
      );

    /* =====================================================================
     * SC09: Center profile
     * ===================================================================== */
    case 'SC09':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'ملف المركز' : 'Center profile'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'بياناتك العامة وساعات العمل.' : 'Your public details and working hours.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'اسم المركز' : 'Center name'}
              </label>
              <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>{isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}</span>
                <Edit3 size={12} className={colors.secondaryText} />
              </div>
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الهاتف' : 'Phone'}
              </label>
              <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>+20 2 2618 2400</span>
                <Phone size={12} className={colors.secondaryText} />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'الوصف' : 'Description'}
            </label>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs ${colors.text}`}>
              <span>
                {isAr
                  ? 'فحص شامل بالكمبيوتر وصيانة متكاملة للمركبات.'
                  : 'Trusted diagnostics & full-service vehicle care.'}
              </span>
              <Edit3 size={12} className={colors.secondaryText} />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'العنوان' : 'Address'}
            </label>
            <div className={`p-2.5 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs ${colors.text}`}>
              <span>{isAr ? 'التجمع الخامس، القاهرة الجديدة' : 'Fifth Settlement, New Cairo'}</span>
              <MapPin size={12} className={colors.secondaryText} />
            </div>
          </div>

          <button
            onClick={() => goToCenterScreen('SC15')}
            className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} text-start space-y-2`}
          >
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'ساعات العمل · اضغط للتعديل' : 'Working hours · Tap to edit'}
            </p>
            <div className="grid grid-cols-7 gap-1 text-center text-[9px]">
              {[
                { d: isAr ? 'سبت' : 'Sat', open: '09:00', close: '20:00' },
                { d: isAr ? 'أحد' : 'Sun', open: '09:00', close: '20:00' },
                { d: isAr ? 'إثنين' : 'Mon', open: '09:00', close: '20:00' },
                { d: isAr ? 'ثلاثاء' : 'Tue', open: '09:00', close: '20:00' },
                { d: isAr ? 'أربعاء' : 'Wed', open: '09:00', close: '20:00' },
                { d: isAr ? 'خميس' : 'Thu', open: '09:00', close: '20:00' },
                { d: isAr ? 'جمعة' : 'Fri', open: '12:00', close: '20:00', special: true }
              ].map((day, idx) => (
                <div
                  key={idx}
                  className={`p-1 rounded-lg ${
                    day.special ? 'bg-amber-500/15 text-amber-500' : `${colors.text}`
                  }`}
                >
                  <p className={`font-bold ${colors.secondaryText}`}>{day.d}</p>
                  <p className="font-semibold">{day.open}</p>
                  <p className="font-semibold">{day.close}</p>
                </div>
              ))}
            </div>
          </button>

          <button
            onClick={() => goToSharedScreen('SH06')}
            className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between`}
          >
            <div className="flex items-center gap-2.5">
              <Settings size={16} className="text-red-500" />
              <span className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? 'الإعدادات' : 'Settings'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'اللغة والمظهر والتفضيلات' : 'Language, theme, and preferences'}
              </span>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </div>
          </button>

          <PrimaryButton onClick={() => goToCenterScreen('SC01')}>
            {isAr ? 'حفظ التغييرات' : 'Save Changes'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SC10: Appointment calendar
     * ===================================================================== */
    case 'SC10':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تقويم المواعيد' : 'Appointment calendar'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نايل أوتو كير · الجدول اليومي' : 'Nile Auto Care · Daily schedule'}
            </p>
          </div>

          <p className={`text-xs font-extrabold ${colors.text}`}>
            {isAr ? 'نوفمبر ٢٠٢٦' : 'November 2026'}
          </p>

          <div className="grid grid-cols-4 gap-1.5">
            {['Fri 6', 'Sat 7', 'Sun 8', 'Mon 9'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedCalDay(d)}
                className={`py-2 rounded-xl text-[11px] font-bold border ${
                  selectedCalDay === d
                    ? `${colors.border} ${colors.surface} ${colors.text}`
                    : `border-transparent ${colors.secondaryText}`
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5`}>
            <p className={`text-xs font-extrabold ${colors.text}`}>
              {isAr ? 'السبت، ٧ نوفمبر' : 'Saturday, 7 November'}
            </p>

            <div className="flex justify-between text-xs py-1">
              <span className={colors.secondaryText}>09:00–09:45</span>
              <span className="font-bold text-emerald-500">{isAr ? 'متاح' : 'Available'}</span>
            </div>

            <button
              onClick={() => goToCenterScreen('SC11')}
              className="w-full flex items-center justify-between text-start py-1.5 border-t border-slate-500/10"
            >
              <div>
                <p className="text-xs font-extrabold text-red-500">
                  {isAr ? '١٠:٠٠ · تغيير زيت وفلتر' : '10:00 · Oil & filter change'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr
                    ? 'BK-2048 · أحمد محمد · ٤٥ د · مؤكد'
                    : 'BK-2048 · Ahmed Mohamed · 45 min · Confirmed'}
                </p>
              </div>
              <ForwardChevron size={14} className="text-red-500" />
            </button>

            <div className="flex justify-between text-xs py-1 border-t border-slate-500/10">
              <span className={colors.secondaryText}>11:00–11:45</span>
              <span className="font-bold text-emerald-500">{isAr ? 'متاح' : 'Available'}</span>
            </div>

            <button
              onClick={() => goToCenterScreen('SC11')}
              className="w-full flex items-center justify-between text-start py-1.5 border-t border-slate-500/10"
            >
              <div>
                <p className={`text-xs font-extrabold ${colors.text}`}>
                  {isAr ? '١٣:٠٠ · فحص الفرامل' : '13:00 · Brake inspection'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr
                    ? 'BK-2051 · سلمى نبيل · ٣٠ د · مؤكد'
                    : 'BK-2051 · Salma Nabil · 30 min · Confirmed'}
                </p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>

            <div className="flex justify-between text-xs py-1 border-t border-slate-500/10">
              <span className={colors.secondaryText}>14:00–15:00</span>
              <span className="font-bold text-emerald-500">{isAr ? 'متاح' : 'Available'}</span>
            </div>

            <button
              onClick={() => goToCenterScreen('SC03')}
              className="w-full flex items-center justify-between text-start py-1.5 border-t border-slate-500/10"
            >
              <div>
                <p className={`text-xs font-extrabold ${colors.text}`}>
                  {isAr ? '١٥:٠٠ · فحص شامل بالكمبيوتر' : '15:00 · Full diagnostics'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr
                    ? 'BK-2053 · عمر فتحي · ٦٠ د · قيد الانتظار'
                    : 'BK-2053 · Omar Fathy · 60 min · Pending'}
                </p>
              </div>
              <ForwardChevron size={14} className={colors.secondaryText} />
            </button>
          </div>

          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} text-[11px] ${colors.secondaryText}`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? '٣ مواعيد · ٣ فترات متاحة' : '3 appointments · 3 open slots'}
            </p>
            <p>
              {isAr
                ? 'اضغط على أي حجز لإدارته. تعكس الفترات المتاحة مدة الخدمة وسعة الحارات.'
                : 'Tap a booking to manage it. Available slots reflect service duration and bay capacity.'}
            </p>
          </div>

          <FallbackSecondary onClick={() => goToCenterScreen('SC02')}>
            {isAr ? 'العودة للمواعيد' : 'Back to Appointments'}
          </FallbackSecondary>
        </div>
      );

    /* =====================================================================
     * SC11: Accepted appointment
     * ===================================================================== */
    case 'SC11':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'موعد مقبول' : 'Accepted appointment'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'BK-2048 · مؤكد · ٧ نوفمبر ٢٠٢٦' : 'BK-2048 · Confirmed · 7 November 2026'}
            </p>
          </div>

          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
            {isAr ? '• مؤكد · جاهز لوصول العميل' : '• Confirmed · Ready for arrival'}
          </span>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>{isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}</p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'هيونداي إلنترا ٢٠٢١ · A B C 1234' : 'Hyundai Elantra 2021 · A B C 1234'}
            </p>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'هاتف العميل' : 'Customer phone'}</span>
              <span className={`font-bold ${colors.text}`}>+20 100 123 4567</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الخدمة' : 'Service'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الفترة' : 'Slot'}</span>
              <span className={`font-bold ${colors.text}`}>10:00–10:45</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'السعر' : 'Price'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'قبل البدء' : 'Before starting'}
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'تم تسجيل وصول العميل والمركبة' : 'Customer and vehicle checked in'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'تم تأكيد نطاق الخدمة والسعر' : 'Service scope and price confirmed'}
              </span>
            </div>
            <p className={`text-[11px] ${colors.secondaryText} pt-1`}>
              {isAr
                ? 'ملاحظة العميل: يرجى فحص ضغط الإطارات أيضاً.'
                : 'Customer note: Please check the tire pressure too.'}
            </p>
          </div>

          <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-blue-500">
              {isAr ? 'بدأت الخدمة · ١٠:٠٠' : 'Service started · 10:00'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'الحجز BK-2048 قيد التنفيذ الآن. أكمل الخدمة والفحوصات النهائية قبل إصدار فاتورة ٨٥٠ ج.م.'
                : 'BK-2048 is now In Progress. Complete the service and final checks before issuing the 850 EGP invoice.'}
            </p>
          </div>

          <button
            onClick={() => goToCenterScreen('SC12')}
            className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-start`}
          >
            <div>
              <p className={`text-xs font-extrabold ${colors.text}`}>
                {isAr ? 'إتمام الخدمة' : 'Complete Service'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'متاح بعد بدء الخدمة' : 'Available after service starts'}
              </p>
            </div>
            <ForwardChevron size={15} className={colors.secondaryText} />
          </button>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToCenterScreen('SC12')}>
              {isAr ? 'بدء الخدمة' : 'Start Service'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToCenterScreen('SC06')}>
              {isAr ? 'عرض أوامر الشغل' : 'View Work Orders'}
            </FallbackSecondary>
          </div>
        </div>
      );

    /* =====================================================================
     * SC12: Complete service & invoice
     * ===================================================================== */
    case 'SC12':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'إتمام الخدمة والفاتورة' : 'Complete service & invoice'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'BK-2048 · نايل أوتو كير · ٧ نوفمبر ٢٠٢٦' : 'BK-2048 · Nile Auto Care · 7 Nov 2026'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'فحوصات الإتمام' : 'Completion checks'}
            </p>
            {[
              isAr ? 'تم استبدال زيت المحرك والفلتر' : 'Engine oil and filter replaced',
              isAr ? 'تم فحص مستويات السوائل والتسريبات' : 'Fluid levels and leaks checked',
              isAr ? 'تم فحص ضغط الإطارات كما طُلب' : 'Tire pressure checked as requested',
              isAr ? 'المركبة جاهزة لاستلام العميل' : 'Vehicle ready for customer collection'
            ].map((chk, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span className={colors.text}>{chk}</span>
              </div>
            ))}
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'فاتورة الخدمة' : 'Service invoice'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'العميل' : 'Customer'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المركبة' : 'Vehicle'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'هيونداي إلنترا' : 'Hyundai Elantra'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'زيت وفلتر · ٤٥ د' : 'Oil & filter · 45 minutes'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-500/10">
              <span className={colors.secondaryText}>{isAr ? 'الإجمالي المستحق بالمركز' : 'Total due at center'}</span>
              <span className={`font-extrabold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
            </div>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              Invoice INV-SC-2048 · 7 Nov 2026 · 10:45
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ملاحظات الإتمام' : 'Completion notes'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr
                ? 'تم استبدال الزيت والفلتر وضبط ضغط الإطارات. لا توجد تسريبات.'
                : 'Oil and filter replaced. Tire pressures adjusted. No leaks found.'}
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-emerald-500">
              {isAr ? 'اكتملت الخدمة · تم إشعار العميل' : 'Service completed · Customer notified'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تم إصدار فاتورة بقيمة ٨٥٠ ج.م. يظل الدفع مستحقاً في المركز حتى يتم تأكيده بشكل منفصل.'
                : 'Invoice issued for 850 EGP. Payment remains due at the center until separately confirmed; this is not a paid receipt.'}
            </p>
          </div>

          <PrimaryButton onClick={() => goToCenterScreen('SC02')}>
            {isAr ? 'إتمام الخدمة وإبلاغ العميل' : 'Complete & Notify Customer'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SC13: Assign a work order
     * ===================================================================== */
    case 'SC13':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تعيين أمر شغل' : 'Assign a work order'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نايل أوتو كير · الحجوزات المقبولة فقط' : 'Nile Auto Care · Accepted bookings only'}
            </p>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'الحجز المقبول' : 'Accepted booking'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'BK-2047 · أحمد · فحص شامل بالكمبيوتر' : 'BK-2047 · Ahmed · Full diagnostics'}
            </div>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'هيونداي إلنترا · A B C 1234' : 'Hyundai Elantra · A B C 1234'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'فحص ما بعد السحب · ٦٠٠ ج.م · ٦٠ دقيقة'
                : 'Post-tow diagnostics · 600 EGP · 60 minutes'}
            </p>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'حالة الحجز' : 'Booking status'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'مقبول' : 'Accepted'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الحارة المتاحة' : 'Available bay'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
                {isAr ? 'حارة ٠٢' : 'Bay 02'}
              </div>
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الميكانيكي' : 'Mechanic'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
                {isAr ? 'حسن علي' : 'Hassan Ali'}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ملاحظات أمر الشغل' : 'Work order notes'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr
                ? 'فحص العفشة الأمامية بعد السحب. تسجيل نتائج الفحص قبل أي عمل إضافي.'
                : 'Check front suspension after tow. Record diagnostic findings before additional work.'}
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-emerald-500">
              {isAr ? 'تم تعيين أمر الشغل' : 'Work order assigned'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'WO-3102 · حسن علي · حارة ٠٢. تم حجز الحارة وإبلاغ الميكانيكي.'
                : 'WO-3102 · Hassan Ali · Bay 02. The bay is reserved and the mechanic has been notified.'}
            </p>
          </div>

          <PrimaryButton onClick={() => goToCenterScreen('SC14')}>
            {isAr ? 'تعيين أمر الشغل' : 'Assign Work Order'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SC14: Work order details
     * ===================================================================== */
    case 'SC14':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تفاصيل أمر الشغل' : 'Work order details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'WO-3102 · أحمد محمد' : 'WO-3102 · Ahmed Mohamed'}
            </p>
          </div>

          <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-500">
            {isAr ? '• قيد التنفيذ' : '• In progress'}
          </span>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'هيونداي إلنترا · فحص شامل' : 'Hyundai Elantra · Diagnostics'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الميكانيكي المعين' : 'Assigned mechanic'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'حسن علي' : 'Hassan Ali'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'حارة الخدمة' : 'Service bay'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'حارة ٠٢' : 'Bay 02'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'بدأ' : 'Started'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '١٤:٥٠ · ٦ نوفمبر' : '14:50 · 6 Nov'}</span>
            </div>
            <p className={`text-[10px] ${colors.secondaryText} pt-1`}>
              {isAr ? 'A B C 1234 · BK-2047 · فحص ما بعد السحب' : 'A B C 1234 · BK-2047 · Post-tow inspection'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'قائمة الفحص التشخيصي' : 'Diagnostics checklist'}
            </p>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'اكتمل الفحص البصري المبدئي' : 'Initial visual inspection completed'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'تم فحص العفشة الأمامية' : 'Front suspension inspected'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span className={colors.text}>
                {isAr ? 'تم تسجيل مسح الأعطال بالكمبيوتر' : 'Diagnostic fault scan recorded'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSupervisorReviewed(!supervisorReviewed)}
              className="flex items-center gap-2 text-start"
            >
              <CheckCircle2
                size={14}
                className={supervisorReviewed ? 'text-emerald-500' : colors.secondaryText}
              />
              <span className={colors.text}>
                {isAr ? 'تمت مراجعة النتائج بواسطة المشرف' : 'Findings reviewed by supervisor'}
              </span>
            </button>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ملاحظات الميكانيكي' : 'Mechanic notes'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr
                ? 'تم فحص العفشة الأمامية بعد السحب. تم إعداد تقرير الفحص وبانتظار مراجعة المشرف.'
                : 'Front suspension inspected after tow. Diagnostic report prepared; awaiting supervisor review.'}
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-blue-500/30 bg-blue-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-blue-500">
              {isAr ? 'جاهز للمراجعة' : 'Ready for review'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تحديد كجاهز يسجل القائمة النهائية وينبه مشرف الخدمة. لا يتم اعتماد أي إصلاح إضافي تلقائياً.'
                : 'Marking ready records the final checklist and alerts the service supervisor. No extra repair is authorized automatically.'}
            </p>
          </div>

          <PrimaryButton onClick={() => goToCenterScreen('SC06')}>
            {isAr ? 'تحديد كجاهز للمراجعة' : 'Mark Ready for Review'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SC15: Edit working hours
     * ===================================================================== */
    case 'SC15':
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'تعديل ساعات العمل' : 'Edit working hours'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نايل أوتو كير · التوافر الأسبوعي' : 'Nile Auto Care · Weekly availability'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'الجدول الأسبوعي' : 'Weekly schedule'}
            </p>
            {[
              isAr ? 'السبت' : 'Saturday',
              isAr ? 'الأحد' : 'Sunday',
              isAr ? 'الإثنين' : 'Monday',
              isAr ? 'الثلاثاء' : 'Tuesday',
              isAr ? 'الأربعاء' : 'Wednesday',
              isAr ? 'الخميس' : 'Thursday'
            ].map((day, idx) => (
              <div key={idx} className="flex justify-between">
                <span className={colors.secondaryText}>{day}</span>
                <span className={`font-bold ${colors.text}`}>09:00 – 20:00</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-slate-500/10">
              <div>
                <p className={`font-extrabold ${colors.text}`}>{isAr ? 'الجمعة' : 'Friday'}</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {fridayOpen
                    ? '12:00 – 20:00'
                    : isAr
                    ? 'مغلق · لا توجد مواعيد جديدة'
                    : 'Closed · No new appointments'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFridayOpen(!fridayOpen)}
                className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                  fridayOpen ? 'bg-emerald-500 justify-end' : 'bg-slate-600 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'يفتح اليوم المحدد' : 'Selected day opens'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>09:00</span>
                <Clock size={13} className={colors.secondaryText} />
              </div>
            </div>
            <div className="space-y-1">
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'يغلق' : 'Closes'}
              </label>
              <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-bold ${colors.text}`}>
                <span>20:00</span>
                <Clock size={13} className={colors.secondaryText} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-emerald-500">
              {isAr ? 'تم حفظ ساعات العمل' : 'Working hours saved'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تم تحديث الفترات المستقبلية. لا يتم إلغاء أو نقل المواعيد المؤكدة الحالية تلقائياً.'
                : 'Future slots are updated. Existing confirmed appointments are not cancelled or moved automatically.'}
            </p>
          </div>

          <PrimaryButton onClick={() => goToCenterScreen('SC09')}>
            {isAr ? 'حفظ ساعات العمل' : 'Save Working Hours'}
          </PrimaryButton>
        </div>
      );

    /* =====================================================================
     * SC16: Reject appointment?
     * ===================================================================== */
    case 'SC16':
    default:
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'رفض الموعد؟' : 'Reject appointment?'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'BK-2048 · طلب قيد الانتظار' : 'BK-2048 · Pending request'}
            </p>
          </div>

          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-extrabold ${colors.text}`}>
              {isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'أحمد محمد · هيونداي إلنترا' : 'Ahmed Mohamed · Hyundai Elantra'}
            </p>
            <div className="flex justify-between pt-1">
              <span className={colors.secondaryText}>{isAr ? 'الفترة المطلوبة' : 'Requested slot'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٧ نوفمبر · ١٠:٠٠–١٠:٤٥' : '7 Nov · 10:00–10:45'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'سعر الخدمة' : 'Service price'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'سبب الرفض · مطلوب' : 'Rejection reason · Required'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs font-bold ${colors.text}`}>
              {isAr ? 'لا توجد حارة متاحة في الوقت المطلوب' : 'No bay available at the requested time'}
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'رسالة للعميل' : 'Message to customer'}
            </label>
            <div className={`p-3 rounded-xl border ${colors.border} ${colors.surface} text-xs ${colors.text}`}>
              {isAr
                ? 'عذراً، هذا الموعد لم يعد متاحاً. يرجى اختيار فترة أخرى وسنسعد بخدمتك.'
                : "Sorry, this time is no longer available. Please choose another slot and we'll be happy to help."}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className={colors.text}>
              {isAr ? 'إبلاغ أحمد بهذا السبب' : 'Notify Ahmed with this reason'}
            </span>
          </div>

          <div className="p-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-[11px] space-y-0.5">
            <p className="font-bold text-amber-500 flex items-center gap-1">
              <AlertCircle size={13} />
              <span>
                {isAr ? 'تم رفض الموعد · أُرسل الإشعار' : 'Appointment rejected · Notification sent'}
              </span>
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'يتم إغلاق هذا الطلب المعلق بدون رسوم، ويمكن للعميل حجز موعد آخر.'
                : 'This pending request is closed without a charge. The customer can book another time. Accepted bookings are not rejected from this screen.'}
            </p>
          </div>

          <div className="space-y-2">
            <PrimaryButton onClick={() => goToCenterScreen('SC02')}>
              {isAr ? 'رفض وإبلاغ العميل' : 'Reject & Notify Customer'}
            </PrimaryButton>
            <FallbackSecondary onClick={() => goToCenterScreen('SC03')}>
              {isAr ? 'الإبقاء على الموعد' : 'Keep Appointment'}
            </FallbackSecondary>
          </div>
        </div>
      );
  }
}
