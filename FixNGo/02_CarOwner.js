import React, { useState } from 'react';
import {
  Wrench,
  Car,
  MapPin,
  Phone,
  CheckCircle2,
  Clock,
  Star,
  ChevronLeft,
  ChevronRight,
  Building2,
  CreditCard,
  Bell,
  Check,
  BatteryCharging,
  Truck,
  Calendar,
  Search,
  MessageSquare,
  Fuel,
  Disc,
  MoreHorizontal,
  Trash2,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

export const CAR_OWNER_SCREENS = [
  { id: 'C01', label: 'C01 · Home (Empty Vehicle)', labelAr: 'C01 · الرئيسية (بدون مركبة)', tab: 'Home' },
  { id: 'C02', label: 'C02 · Home (Connected Car)', labelAr: 'C02 · الرئيسية (مركبة متصلة)', tab: 'Home' },
  { id: 'C03', label: 'C03 · How will you use FixNGo?', labelAr: 'C03 · كيف ستستخدم FixNGo؟', tab: 'Home' },
  { id: 'C04', label: 'C04 · My Garage', labelAr: 'C04 · جراجي', tab: 'Garage' },
  { id: 'C05', label: 'C05 · Add Vehicle', labelAr: 'C05 · إضافة مركبة', tab: 'Garage' },
  { id: 'C06', label: "C06 · What's wrong? (Step 1/3)", labelAr: 'C06 · ما هي المشكلة؟ (خطوة 1/3)', tab: 'Home' },
  { id: 'C07', label: 'C07 · Vehicle & location (Step 2/3)', labelAr: 'C07 · المركبة والموقع (خطوة 2/3)', tab: 'Home' },
  { id: 'C08', label: 'C08 · Ready to send? (Step 3/3)', labelAr: 'C08 · جاهز للإرسال؟ (خطوة 3/3)', tab: 'Home' },
  { id: 'C09', label: 'C09 · Finding your backup', labelAr: 'C09 · جاري البحث عن المساعدة', tab: 'Home' },
  { id: 'C10', label: 'C10 · Choose your captain', labelAr: 'C10 · اختر كابتن الونش', tab: 'Home' },
  { id: 'C11', label: 'C11 · Your captain is on the way', labelAr: 'C11 · الكابتن في الطريق إليك', tab: 'Home' },
  { id: 'C12', label: 'C12 · Your captain has arrived', labelAr: 'C12 · وصل الكابتن إلى موقعك', tab: 'Home' },
  { id: 'C13', label: 'C13 · Approve your estimate', labelAr: 'C13 · الموافقة على التكلفة التقديرية', tab: 'Home' },
  { id: 'C14', label: 'C14 · Choose payment', labelAr: 'C14 · اختر طريقة الدفع', tab: 'Home' },
  { id: 'C15', label: "C15 · You're good to go (Invoice)", labelAr: 'C15 · الفاتورة جاهزة (تم الدفع)', tab: 'Home' },
  { id: 'C16', label: 'C16 · How was your trip? (Rate)', labelAr: 'C16 · كيف كانت رحلتك؟ (تقييم)', tab: 'Home' },
  { id: 'C17', label: 'C17 · Service centers list', labelAr: 'C17 · قائمة مراكز الخدمة', tab: 'Centers' },
  { id: 'C18', label: 'C18 · Nile Auto Care detail', labelAr: 'C18 · تفاصيل مركز نايل أوتو كير', tab: 'Centers' },
  { id: 'C19', label: 'C19 · Book an appointment', labelAr: 'C19 · حجز موعد صيانة', tab: 'Centers' },
  { id: 'C20', label: 'C20 · Request history', labelAr: 'C20 · سجل الطلبات', tab: 'Requests' },
  { id: 'C21', label: 'C21 · Trip detail', labelAr: 'C21 · تفاصيل الرحلة', tab: 'Requests' },
  { id: 'C22', label: 'C22 · Notifications', labelAr: 'C22 · الإشعارات', tab: 'Home' },
  { id: 'C23', label: 'C23 · Profile & settings', labelAr: 'C23 · الملف الشخصي والإعدادات', tab: 'Profile' },
  { id: 'C24', label: 'C24 · Vehicle details & edit', labelAr: 'C24 · تفاصيل وتعديل المركبة', tab: 'Garage' },
  { id: 'C25', label: 'C25 · Confirm your location', labelAr: 'C25 · تأكيد موقعك', tab: 'Home' },
  { id: 'C26', label: 'C26 · Describe your issue', labelAr: 'C26 · صف المشكلة', tab: 'Home' },
  { id: 'C27', label: 'C27 · Choose your mechanic', labelAr: 'C27 · اختر الميكانيكي', tab: 'Home' },
  { id: 'C28', label: 'C28 · No providers nearby', labelAr: 'C28 · لا يوجد مقدمو خدمة قريبون', tab: 'Home' },
  { id: 'C29', label: 'C29 · Cancel this request?', labelAr: 'C29 · إلغاء هذا الطلب؟', tab: 'Home' },
  { id: 'C30', label: 'C30 · Request cancelled', labelAr: 'C30 · تم إلغاء الطلب', tab: 'Home' },
  { id: 'C31', label: 'C31 · Your repair is underway', labelAr: 'C31 · جاري إصلاح سيارتك', tab: 'Home' },
  { id: 'C32', label: 'C32 · Dispute your estimate', labelAr: 'C32 · الاعتراض على التكلفة', tab: 'Home' },
  { id: 'C33', label: 'C33 · Add payment card', labelAr: 'C33 · إضافة بطاقة دفع', tab: 'Home' },
  { id: 'C34', label: 'C34 · Review & pay (Card/Apple)', labelAr: 'C34 · المراجعة والدفع', tab: 'Home' },
  { id: 'C35', label: "C35 · Payment didn't go through", labelAr: 'C35 · لم تتم عملية الدفع', tab: 'Home' },
  { id: 'C36', label: "C36 · You're booked in", labelAr: 'C36 · تم تأكيد حجزك', tab: 'Centers' },
  { id: 'C37', label: 'C37 · My appointments', labelAr: 'C37 · مواعيدي', tab: 'Centers' },
  { id: 'C38', label: 'C38 · Appointment details', labelAr: 'C38 · تفاصيل الموعد', tab: 'Centers' },
  { id: 'C39', label: 'C39 · Reschedule appointment', labelAr: 'C39 · إعادة جدولة الموعد', tab: 'Centers' },
  { id: 'C40', label: 'C40 · Center reviews (4.8★)', labelAr: 'C40 · تقييمات المركز (4.8★)', tab: 'Centers' },
  { id: 'C41', label: 'C41 · Thanks for your review', labelAr: 'C41 · شكراً لتقييمك', tab: 'Requests' },
  { id: 'C42', label: 'C42 · Request timeline (7/7)', labelAr: 'C42 · التسلسل الزمني للطلب (7/7)', tab: 'Requests' },
  { id: 'C43', label: 'C43 · Cancel appointment?', labelAr: 'C43 · إلغاء الموعد؟', tab: 'Centers' }
];

export const CAR_OWNER_MAIN_SCREENS = ['C01', 'C02', 'C04', 'C17', 'C20', 'C23'];

export const CAR_OWNER_FALLBACK_BACK = {
  C03: 'C02',
  C05: 'C04',
  C06: 'C02',
  C07: 'C06',
  C08: 'C07',
  C09: 'C08',
  C10: 'C09',
  C11: 'C10',
  C12: 'C11',
  C13: 'C12',
  C14: 'C13',
  C15: 'C14',
  C16: 'C15',
  C18: 'C17',
  C19: 'C18',
  C21: 'C20',
  C22: 'C02',
  C24: 'C04',
  C25: 'C07',
  C26: 'C06',
  C27: 'C26',
  C28: 'C09',
  C29: 'C09',
  C30: 'C29',
  C31: 'C27',
  C32: 'C13',
  C33: 'C14',
  C34: 'C14',
  C35: 'C34',
  C36: 'C19',
  C37: 'C17',
  C38: 'C37',
  C39: 'C38',
  C40: 'C18',
  C41: 'C16',
  C42: 'C21',
  C43: 'C38'
};

const DRIVER_AVATAR =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
const MECHANIC_AVATAR =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80';
const CUSTOMER_AVATAR =
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80';

export default function CarOwnerModule({
  ownerScreen,
  colors,
  isAr,
  NIGHT_CAR_IMAGE,
  WORKSHOP_IMAGE,
  selectedServiceTile,
  setSelectedServiceTile,
  paymentMethod,
  setPaymentMethod,
  PrimaryButton,
  SecondaryButton,
  StatusBadge,
  RadarMapCanvas,
  EmergencySOSBar,
  goToOwnerScreen,
  goToSharedScreen,
  switchRolePreview
}) {
  const ForwardChevron = isAr ? ChevronLeft : ChevronRight;

  // Interactive local states for sub-screens
  const [sortFilter, setSortFilter] = useState('Recommended');
  const [historyFilter, setHistoryFilter] = useState('All');
  const [notifFilter, setNotifFilter] = useState('All');
  const [centerFilter, setCenterFilter] = useState('All');
  const [bookingDay, setBookingDay] = useState('Sat 7');
  const [bookingTime, setBookingTime] = useState('10:00');
  const [rescheduleDay, setRescheduleDay] = useState('Sun 8');
  const [rescheduleTime, setRescheduleTime] = useState('11:00');
  const [cancelReason, setCancelReason] = useState(0);
  const [cancelBookingReason, setCancelBookingReason] = useState(0);
  const [ratingStars, setRatingStars] = useState(5);
  const [primaryVehicle, setPrimaryVehicle] = useState(true);
  const [saveCardToken, setSaveCardToken] = useState(true);
  const [checkoutTab, setCheckoutTab] = useState('card');

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
          onClick={() => switchRolePreview(r.id)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 transition ${
            r.id === 'carOwner'
              ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
              : `${colors.border} ${colors.surface} ${colors.secondaryText}`
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );

  switch (ownerScreen) {
    // ==========================================
    // C01: Home (Empty Vehicle)
    // ==========================================
    case 'C01':
      return (
        <div className="p-4 space-y-3.5">
          <RoleSwitcherPills />
          <div>
            <h1 className={`text-lg font-extrabold ${colors.text}`}>
              {isAr ? 'أهلاً، أحمد 👋' : 'Hello, Ahmed 👋'}
            </h1>
            <button
              onClick={() => goToOwnerScreen('C25')}
              className={`text-[11px] flex items-center gap-1 ${colors.secondaryText}`}
            >
              <MapPin size={11} className="text-[#E51C23]" />
              <span>{isAr ? 'القاهرة الجديدة، القاهرة · تغيير الموقع' : 'New Cairo, Cairo · Change location'}</span>
            </button>
          </div>
          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5`}>
            <div className="w-9 h-9 rounded-xl bg-[#E51C23]/10 text-[#E51C23] flex items-center justify-center">
              <Car size={18} />
            </div>
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'رحلتك القادمة تبدأ من هنا' : 'Your next journey starts here'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'أضف سيارتك للحصول على مساعدة أسرع وأكثر دقة.'
                : 'Add your car for faster, more accurate help.'}
            </p>
            <SecondaryButton onClick={() => goToOwnerScreen('C05')}>
              {isAr ? '+ إضافة مركبة' : '+ Add Vehicle'}
            </SecondaryButton>
          </div>
          <div className="space-y-2">
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'خدمات سريعة' : 'Quick Services'}
            </p>
            <EmergencySOSBar />
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1`}>
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'كل طريق، تحت تغطيتنا.' : 'Every road, covered.'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'مقدمو خدمة معتمدون. أسعار واضحة. دعم على مدار الساعة ٢٤/٧.'
                : 'Verified providers. Transparent prices. 24/7 support.'}
            </p>
          </div>
        </div>
      );

    // ==========================================
    // C02: Home (Connected Car)
    // ==========================================
    case 'C02':
    default:
      return (
        <div className="p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-extrabold ${colors.text}`}>
                {isAr ? 'أهلاً، أحمد 👋' : 'Hello, Ahmed 👋'}
              </h1>
              <button
                onClick={() => goToOwnerScreen('C25')}
                className={`text-[11px] flex items-center gap-1 ${colors.secondaryText}`}
              >
                <MapPin size={11} className="text-[#E51C23]" />
                <span>{isAr ? 'القاهرة الجديدة، القاهرة · تغيير الموقع' : 'New Cairo, Cairo · Change location'}</span>
              </button>
            </div>
            <button
              onClick={() => goToOwnerScreen('C22')}
              className={`p-2 rounded-xl border ${colors.border} ${colors.surface} ${colors.text} relative`}
            >
              <Bell size={15} />
              <span className="w-2 h-2 rounded-full bg-[#E51C23] absolute top-1.5 right-1.5" />
            </button>
          </div>

          <div
            onClick={() => goToOwnerScreen('C24')}
            className={`rounded-2xl border ${colors.border} ${colors.surface} overflow-hidden cursor-pointer`}
          >
            <img src={NIGHT_CAR_IMAGE} alt="Hyundai Elantra" className="w-full h-32 object-cover" />
            <div className="p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Car size={15} className="text-[#E51C23]" />
                  <div>
                    <p className={`text-xs font-bold ${colors.text}`}>
                      {isAr ? 'هيونداي إلنترا' : 'Hyundai Elantra'}
                    </p>
                    <p className={`text-[10px] ${colors.secondaryText}`}>
                      {isAr ? '٢٠٢١ · رمادي · بنزين' : '2021 · Graphite · Petrol'}
                    </p>
                  </div>
                </div>
                <ForwardChevron size={15} className={colors.secondaryText} />
              </div>
              <div className={`flex justify-between items-center pt-1.5 border-t ${colors.border} text-[11px]`}>
                <span className={colors.secondaryText}>
                  {isAr ? 'رقم اللوحة' : 'License plate'}
                </span>
                <span className={`font-bold ${colors.text}`} dir="ltr">
                  A B C 1234
                </span>
              </div>
            </div>
          </div>

          <div
            onClick={() => goToOwnerScreen('C06')}
            className="p-3.5 rounded-2xl border border-[#E51C23]/30 bg-[#E51C23]/10 flex items-center justify-between cursor-pointer"
          >
            <div>
              <p className={`text-xs font-bold ${colors.text}`}>
                {isAr ? 'طلب مساعدة على الطريق' : 'Request Roadside Help'}
              </p>
              <p className={`text-[11px] ${colors.secondaryText}`}>
                {isAr ? 'متعطل؟ سنعيدك للتحرك فوراً.' : "Stuck? We'll get you moving again."}
              </p>
            </div>
            <ArrowUpRight size={16} className="text-[#E51C23]" />
          </div>

          <div className="space-y-1.5">
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'خدمات سريعة' : 'Quick Services'}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: isAr ? 'طوارئ' : 'SOS', target: 'SH19', icon: Phone, shared: true },
                { label: isAr ? 'ونش' : 'Tow', target: 'C06', icon: Truck },
                { label: isAr ? 'ميكانيكي' : 'Mechanic', target: 'C26', icon: Wrench },
                { label: isAr ? 'المراكز' : 'Centers', target: 'C17', icon: Building2 }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() =>
                      item.shared ? goToSharedScreen(item.target) : goToOwnerScreen(item.target)
                    }
                    className={`p-2.5 rounded-2xl border ${colors.border} ${colors.surface} flex flex-col items-center gap-1`}
                  >
                    <Icon size={16} className="text-[#E51C23]" />
                    <span className={`text-[10px] font-semibold ${colors.text}`}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-1.5">
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'الحجز القادم' : 'Upcoming booking'}
            </p>
            <div
              onClick={() => goToOwnerScreen('C38')}
              className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} cursor-pointer space-y-1`}
            >
              <div className="flex justify-between text-xs">
                <span className={`font-bold ${colors.text}`}>
                  {isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
                </span>
                <span className={`font-bold ${colors.text}`}>
                  {isAr ? 'غداً · ١٠:٠٠' : 'Tomorrow · 10:00'}
                </span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className={colors.secondaryText}>
                  {isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change'}
                </span>
                <span className={`font-bold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
              </div>
              <StatusBadge status="Online" text={isAr ? 'مؤكد' : 'Confirmed'} />
            </div>
          </div>
        </div>
      );

    // ==========================================
    // C03: How will you use FixNGo?
    // ==========================================
    case 'C03':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'كيف ستستخدم FixNGo؟' : 'How will you use FixNGo?'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'اختر دورك. يمكنك التبديل لاحقاً.' : 'Choose your role. You can switch later.'}
            </p>
          </div>
          <RoleSwitcherPills />
          {[
            {
              id: 'carOwner',
              title: isAr ? 'مالك سيارة' : 'Car Owner',
              sub: isAr ? 'اطلب المساعدة وقد بثقة.' : 'Request help. Drive with confidence.',
              icon: Car
            },
            {
              id: 'mechanic',
              title: isAr ? 'ميكانيكي متنقل' : 'Mobile Mechanic',
              sub: isAr ? 'قدم خبرتك للمساعدة على الطريق.' : 'Bring your expertise to the roadside.',
              icon: Wrench
            },
            {
              id: 'towCaptain',
              title: isAr ? 'كابتن ونش' : 'Tow Captain',
              sub: isAr ? 'انقل المركبات وحافظ على استمرار الرحلات.' : 'Move vehicles. Keep journeys going.',
              icon: Truck
            },
            {
              id: 'serviceCenter',
              title: isAr ? 'مركز خدمة' : 'Service Center',
              sub: isAr ? 'أدر الحجوزات وطور مركزك.' : 'Manage bookings and grow your shop.',
              icon: Building2
            }
          ].map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                onClick={() => switchRolePreview(r.id)}
                className={`w-full p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-start`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#E51C23]/10 text-[#E51C23] flex items-center justify-center shrink-0">
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${colors.text}`}>{r.title}</p>
                    <p className={`text-[11px] ${colors.secondaryText}`}>{r.sub}</p>
                  </div>
                </div>
                <ForwardChevron size={16} className={colors.secondaryText} />
              </button>
            );
          })}
        </div>
      );

    // ==========================================
    // C04: My Garage
    // ==========================================
    case 'C04':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'جراجي' : 'My Garage'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'مركبتان. مكان واحد لجميع احتياجاتها.' : 'Two vehicles. One place for all their care.'}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#E51C23]">
            • {isAr ? 'المركبة الأساسية' : 'Primary vehicle'}
          </span>
          <div
            onClick={() => goToOwnerScreen('C24')}
            className={`rounded-2xl border ${colors.border} ${colors.surface} overflow-hidden cursor-pointer`}
          >
            <img src={NIGHT_CAR_IMAGE} alt="Elantra" className="w-full h-28 object-cover" />
            <div className="p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-xs font-bold ${colors.text}`}>
                    {isAr ? 'هيونداي إلنترا' : 'Hyundai Elantra'}
                  </p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>
                    {isAr ? '٢٠٢١ · رمادي · بنزين' : '2021 · Graphite · Petrol'}
                  </p>
                </div>
                <ForwardChevron size={15} className={colors.secondaryText} />
              </div>
              <div className={`flex justify-between pt-1.5 border-t ${colors.border} text-[11px]`}>
                <span className={colors.secondaryText}>{isAr ? 'رقم اللوحة' : 'License plate'}</span>
                <span className={`font-bold ${colors.text}`} dir="ltr">A B C 1234</span>
              </div>
            </div>
          </div>

          <div
            onClick={() => goToOwnerScreen('C24')}
            className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} cursor-pointer space-y-2`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-500/10 flex items-center justify-center">
                  <Car size={15} className={colors.text} />
                </div>
                <div>
                  <p className={`text-xs font-bold ${colors.text}`}>
                    {isAr ? 'كيا سبورتاج' : 'Kia Sportage'}
                  </p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>
                    {isAr ? '٢٠٢٣ · أبيض · بنزين' : '2023 · White · Petrol'}
                  </p>
                </div>
              </div>
              <ForwardChevron size={15} className={colors.secondaryText} />
            </div>
            <div className={`flex justify-between pt-1.5 border-t ${colors.border} text-[11px]`}>
              <span className={colors.secondaryText}>{isAr ? 'رقم اللوحة' : 'License plate'}</span>
              <span className={`font-bold ${colors.text}`} dir="ltr">G Z H 4821</span>
            </div>
          </div>

          <p className={`text-[11px] ${colors.secondaryText}`}>
            {isAr
              ? 'حافظ على تحديث بيانات مركبتك للحصول على الدعم المناسب على الطريق.'
              : 'Keep your vehicle details updated for the right roadside support.'}
          </p>
          <PrimaryButton onClick={() => goToOwnerScreen('C05')}>
            {isAr ? '+ إضافة مركبة' : '+ Add Vehicle'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C05: Add Vehicle
    // ==========================================
    case 'C05':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'إضافة مركبة' : 'Add Vehicle'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'البيانات الصحيحة تعني المساعدة الصحيحة.' : 'The right details mean the right help.'}
            </p>
          </div>
          <div className="space-y-2">
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'الماركة' : 'Make'}</label>
              <input
                defaultValue={isAr ? 'هيونداي' : 'Hyundai'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'الموديل' : 'Model'}</label>
              <input
                defaultValue={isAr ? 'إلنترا' : 'Elantra'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'سنة الصنع' : 'Year'}</label>
              <input
                defaultValue="2021"
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'رقم اللوحة' : 'Plate number'}
              </label>
              <input
                defaultValue="A B C 1234"
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'اللون' : 'Color'}</label>
                <input
                  defaultValue={isAr ? 'رمادي' : 'Graphite'}
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'نوع الوقود' : 'Fuel type'}
                </label>
                <input
                  defaultValue={isAr ? 'بنزين' : 'Petrol'}
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
            </div>
          </div>
          <p className={`text-[10px] ${colors.secondaryText}`}>
            {isAr
              ? 'يتم مشاركة رقم اللوحة فقط مع مقدم الخدمة المعين لك.'
              : 'Your plate is only shared with assigned providers.'}
          </p>
          <PrimaryButton onClick={() => goToOwnerScreen('C04')}>
            {isAr ? 'حفظ المركبة' : 'Save Vehicle'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C06: What's wrong? (Step 1/3)
    // ==========================================
    case 'C06': {
      const serviceOptions = [
        { id: 'Flatbed Tow', label: isAr ? 'ونش سطحة' : 'Flatbed Tow', icon: Truck },
        { id: 'Mechanic', label: isAr ? 'ميكانيكي' : 'Mechanic', icon: Wrench },
        { id: 'Battery Jump', label: isAr ? 'شحن بطارية' : 'Battery Jump', icon: BatteryCharging },
        { id: 'Tire Change', label: isAr ? 'تغيير إطار' : 'Tire Change', icon: Disc },
        { id: 'Fuel', label: isAr ? 'توصيل وقود' : 'Fuel', icon: Fuel },
        { id: 'Other', label: isAr ? 'أخرى' : 'Other', icon: MoreHorizontal }
      ];
      return (
        <div className="p-4 space-y-3.5">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'ما هي المشكلة؟' : "What's wrong?"}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr
                ? 'اختر المساعدة التي تحتاجها وسنتولى الباقي.'
                : "Choose the help you need. We'll handle the rest."}
            </p>
            <span className="inline-block mt-1 text-[10px] font-bold text-[#E51C23]">
              • {isAr ? 'طلب مساعدة · خطوة ١ من ٣' : 'Request help · Step 1 of 3'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {serviceOptions.map((t) => {
              const Icon = t.icon;
              const selected = selectedServiceTile === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedServiceTile(t.id)}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                    selected
                      ? 'border-[#E51C23] bg-[#E51C23]/15 text-[#E51C23]'
                      : `${colors.border} ${colors.surface} ${colors.text}`
                  }`}
                >
                  <Icon size={18} className={selected ? 'text-[#E51C23]' : colors.secondaryText} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
          <EmergencySOSBar />
          <PrimaryButton
            onClick={() =>
              selectedServiceTile === 'Flatbed Tow'
                ? goToOwnerScreen('C07')
                : goToOwnerScreen('C26')
            }
          >
            {isAr ? 'متابعة' : 'Continue'}
          </PrimaryButton>
        </div>
      );
    }

    // ==========================================
    // C07: Vehicle & location (Step 2/3)
    // ==========================================
    case 'C07':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'المركبة والموقع' : 'Vehicle & location'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'خطوة ٢ من ٣ · ونش سطحة' : 'Step 2 of 3 · Flatbed Tow'}
            </p>
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'مركبتك' : 'Your vehicle'}
            </label>
            <div className={`px-3 h-10 rounded-xl border ${colors.border} ${colors.surface} flex items-center justify-between text-xs font-semibold ${colors.text}`}>
              <span>{isAr ? 'هيونداي إلنترا · A B C 1234' : 'Hyundai Elantra · A B C 1234'}</span>
              <span>▾</span>
            </div>
          </div>
          <RadarMapCanvas
            label={isAr ? 'تم تأكيد موقع GPS' : 'GPS location confirmed'}
            subtitle={isAr ? 'شارع التسعين' : '90th Street'}
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`py-2 rounded-xl border border-[#E51C23]/40 bg-[#E51C23]/10 text-[#E51C23] text-[11px] font-bold`}
            >
              {isAr ? 'استخدام GPS' : 'Use GPS'}
            </button>
            <button
              onClick={() => goToOwnerScreen('C25')}
              className={`py-2 rounded-xl border ${colors.border} ${colors.surface} ${colors.text} text-[11px] font-bold`}
            >
              {isAr ? 'إدخال العنوان' : 'Enter address'}
            </button>
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'عنوان الالتقاء' : 'Pickup address'}
            </label>
            <input
              defaultValue={isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'وجهة السحب' : 'Tow destination'}
            </label>
            <input
              defaultValue={isAr ? 'نايل أوتو كير، التجمع الخامس' : 'Nile Auto Care, Fifth Settlement'}
              className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
          </div>
          <div className="flex justify-between text-xs pt-0.5">
            <span className={colors.secondaryText}>{isAr ? 'الرحلة المقدرة' : 'Estimated trip'}</span>
            <span className={`font-bold ${colors.text}`}>
              {isAr ? '٨.٢ كم · ١٨ دقيقة' : '8.2 km · 18 min'}
            </span>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C08')}>
            {isAr ? 'مراجعة الطلب' : 'Review Request'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C08: Ready to send? (Step 3/3)
    // ==========================================
    case 'C08':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'جاهز للإرسال؟' : 'Ready to send?'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'خطوة ٣ من ٣ · مراجعة طلبك' : 'Step 3 of 3 · Review your request'}
            </p>
            <span className="inline-block mt-1 text-[10px] font-bold text-[#E51C23]">
              • {isAr ? 'ونش سطحة' : 'Flatbed Tow'}
            </span>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Car size={15} className="text-[#E51C23]" />
                <div>
                  <p className={`font-bold ${colors.text}`}>
                    {isAr ? 'هيونداي إلنترا' : 'Hyundai Elantra'}
                  </p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>
                    {isAr ? '٢٠٢١ · رمادي · بنزين' : '2021 · Graphite · Petrol'}
                  </p>
                </div>
              </div>
              <span className={`font-bold ${colors.text}`} dir="ltr">A B C 1234</span>
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5 text-xs`}>
            <div>
              <p className={`text-[10px] font-bold uppercase ${colors.secondaryText}`}>
                {isAr ? 'نقطة الالتقاء' : 'PICKUP'}
              </p>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              </p>
            </div>
            <div className={`pt-2 border-t ${colors.border}`}>
              <p className={`text-[10px] font-bold uppercase ${colors.secondaryText}`}>
                {isAr ? 'الوجهة · ٨.٢ كم' : 'DESTINATION · 8.2 KM'}
              </p>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'نايل أوتو كير، التجمع الخامس' : 'Nile Auto Care, Fifth Settlement'}
              </p>
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'التكلفة التقديرية' : 'Estimated fare'}
              </span>
              <span className="text-[#E51C23] font-extrabold">
                {isAr ? '٦٠٠–٧٠٠ ج.م' : '600–700 EGP'}
              </span>
            </div>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr
                ? 'سيؤكد الكابتن التكلفة النهائية قبل البدء. لا توجد مفاجآت.'
                : 'Your captain will confirm the final cost before starting. No surprises.'}
            </p>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C09')}>
            {isAr ? 'إرسال الطلب' : 'Send Request'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C09: Finding your backup
    // ==========================================
    case 'C09':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'جاري البحث عن المساعدة' : 'Finding your backup'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'جاري البحث عن مقدمي خدمة قريبين...' : 'Searching nearby providers...'}
            </p>
          </div>
          <RadarMapCanvas
            label={isAr ? 'البحث في نطاق ٥ كم' : 'Searching within 5 km'}
            subtitle={isAr ? 'FG-2606 · ونش سطحة' : 'FG-2606 · Flatbed Tow'}
          />
          <StatusBadge
            status="Pending"
            text={isAr ? 'طلب FG-2606 · جاري البحث' : 'Request FG-2606 · Searching'}
          />
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} text-xs space-y-1.5`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الخدمة' : 'Service'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'ونش سطحة' : 'Flatbed Tow'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'مركبتك' : 'Your vehicle'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'هيونداي إلنترا' : 'Hyundai Elantra'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'نقطة الالتقاء' : 'Pickup'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              </span>
            </div>
          </div>
          <p className={`text-[11px] ${colors.secondaryText}`}>
            {isAr
              ? 'نتحقق من الكباتن المعتمدين بالقرب منك. أبقِ التطبيق مفتوحاً — يستغرق ذلك أقل من دقيقة.'
              : "We're checking verified captains nearby. Keep the app open — this usually takes less than a minute."}
          </p>
          <PrimaryButton onClick={() => goToOwnerScreen('C10')}>
            {isAr ? 'عرض ٣ كباتن معتمدين' : 'View 3 Verified Captains'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C29')}>
            {isAr ? 'إلغاء الطلب' : 'Cancel Request'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C10: Choose your captain
    // ==========================================
    case 'C10':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'اختر كابتن الونش' : 'Choose your captain'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? '٣ كباتن معتمدين بالقرب من القاهرة الجديدة' : '3 verified captains near New Cairo'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'Recommended', label: isAr ? 'الموصى به' : 'Recommended' },
              { id: 'Fastest', label: isAr ? 'الأسرع' : 'Fastest' },
              { id: 'Lowest price', label: isAr ? 'الأقل سعراً' : 'Lowest price' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSortFilter(tab.id)}
                className={`py-1.5 rounded-xl text-[10px] font-bold border ${
                  sortFilter === tab.id
                    ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
                    : `${colors.border} ${colors.surface} ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {[
            {
              name: isAr ? 'محمود حسن' : 'Mahmoud Hassan',
              rating: '4.9 ★',
              eta: isAr ? '٦ دقائق · ٢.٤ كم' : '6 min · 2.4 km',
              price: isAr ? '٦٥٠ ج.م' : '650 EGP'
            },
            {
              name: isAr ? 'عمر عادل' : 'Omar Adel',
              rating: '4.8 ★',
              eta: isAr ? '٩ دقائق · ٣.١ كم' : '9 min · 3.1 km',
              price: isAr ? '٦٢٠ ج.م' : '620 EGP'
            },
            {
              name: isAr ? 'يوسف علي' : 'Youssef Ali',
              rating: '4.9 ★',
              eta: isAr ? '١٢ دقيقة · ٤.٦ كم' : '12 min · 4.6 km',
              price: isAr ? '٦٨٠ ج.م' : '680 EGP'
            }
          ].map((p) => (
            <div key={p.name} className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <img src={DRIVER_AVATAR} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className={`text-xs font-bold ${colors.text}`}>{p.name}</p>
                    <p className={`text-[10px] ${colors.secondaryText}`}>
                      {p.rating} · {isAr ? 'معتمد' : 'Verified professional'}
                    </p>
                    <p className="text-[10px] text-amber-500 font-semibold">• {p.eta}</p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold ${colors.text}`}>{p.price}</span>
              </div>
              <PrimaryButton onClick={() => goToOwnerScreen('C11')}>
                {isAr ? 'اختيار' : 'Select'}
              </PrimaryButton>
            </div>
          ))}
        </div>
      );

    // ==========================================
    // C11: Your captain is on the way
    // ==========================================
    case 'C11':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'الكابتن في الطريق إليك' : 'Your captain is on the way'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · ونش سطحة' : 'FG-2606 · Flatbed Tow'}
            </p>
          </div>
          <RadarMapCanvas
            label={isAr ? 'يصل خلال ٦ دقائق' : 'Arriving in 6 min'}
            subtitle={isAr ? 'شارع التسعين' : '90th Street'}
            mode="route"
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
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <img src={DRIVER_AVATAR} alt="Mahmoud" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className={`text-xs font-bold ${colors.text}`}>
                    {isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
                  </p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>
                    {isAr ? 'كابتن ونش · 4.9 ★ (١٢٨ رحلة)' : 'Tow Captain · 4.9 ★ (128 trips)'}
                  </p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                <Phone size={14} />
              </button>
            </div>
            <div className={`flex justify-between pt-1.5 border-t ${colors.border} text-[11px]`}>
              <span className={colors.secondaryText}>{isAr ? 'الونش' : 'Truck'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'إيسوزو سطحة · C R T 9087' : 'Isuzu Flatbed · C R T 9087'}
              </span>
            </div>
          </div>
          <p className={`text-[11px] ${colors.secondaryText}`}>
            {isAr
              ? 'ابقَ في مكان آمن. سيقابلك الكابتن عند نقطة الالتقاء.'
              : 'Stay somewhere safe. Your captain will meet you at the pickup pin.'}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <PrimaryButton onClick={() => goToSharedScreen('SH01')}>
              <MessageSquare size={14} /> {isAr ? 'محادثة' : 'Chat'}
            </PrimaryButton>
            <SecondaryButton onClick={() => goToOwnerScreen('C42')}>
              {isAr ? 'التسلسل الزمني' : 'Timeline'}
            </SecondaryButton>
          </div>
          <SecondaryButton onClick={() => goToOwnerScreen('C12')}>
            {isAr ? 'تحديث حالة الرحلة (وصل الكابتن)' : 'Advance Trip Status'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C12: Your captain has arrived
    // ==========================================
    case 'C12':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'وصل الكابتن إلى موقعك' : 'Your captain has arrived'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · جاهز عند نقطة الالتقاء' : 'FG-2606 · Ready at your pickup point'}
            </p>
          </div>
          <RadarMapCanvas
            label={isAr ? 'الكابتن في نقطة الالتقاء' : 'Captain at pickup'}
            mode="arrived"
          />
          <div className="space-y-1">
            <StatusBadge status="Online" text={isAr ? 'وصل للموقع' : 'Arrived'} />
            <div className="flex justify-between text-[11px] pt-1">
              <span className={colors.secondaryText}>{isAr ? 'خطوة ٤ من ٧' : 'Step 4 of 7'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'وصل' : 'Arrived'}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-500/20 overflow-hidden">
              <div className="w-4/6 h-full bg-emerald-500 rounded-full" />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <img src={DRIVER_AVATAR} alt="Mahmoud" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <p className={`text-xs font-bold ${colors.text}`}>
                    {isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
                  </p>
                  <p className={`text-[10px] ${colors.secondaryText}`}>
                    {isAr ? 'كابتن ونش · 4.9 ★ (١٢٨ رحلة)' : 'Tow Captain · 4.9 ★ (128 trips)'}
                  </p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                <Phone size={14} />
              </button>
            </div>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'ابحث عن ونش إيسوزو الأحمر بلوحة C R T 9087. تفضل بتأكيد مركبتك قبل التحميل.'
                : 'Look for the red Isuzu flatbed, plate C R T 9087. Confirm your vehicle before loading.'}
            </p>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C13')}>
            {isAr ? 'متابعة لمراجعة التكلفة' : 'Advance Trip Status'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C13: Approve your estimate
    // ==========================================
    case 'C13':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'الموافقة على التكلفة التقديرية' : 'Approve your estimate'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · أكد التكلفة قبل بدء السحب' : 'FG-2606 · Confirm before the tow begins'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Pending" text={isAr ? 'بانتظار موافقتك' : 'Awaiting your approval'} />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex items-center gap-2.5`}>
            <img src={DRIVER_AVATAR} alt="Mahmoud" className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className={`text-xs font-bold ${colors.text}`}>
                {isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'كابتن ونش · 4.9 ★ (١٢٨ رحلة)' : 'Tow Captain · 4.9 ★ (128 trips)'}
              </p>
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text} pb-1`}>
              {isAr ? 'تفاصيل التكلفة' : 'Cost breakdown'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'ونش سطحة · التكلفة الأساسية' : 'Flatbed tow · base fare'}
              </span>
              <span className={colors.text}>{isAr ? '٤٥٠ ج.م' : '450 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'المسافة · ٨.٢ كم' : 'Distance · 8.2 km'}
              </span>
              <span className={colors.text}>{isAr ? '١٥٠ ج.م' : '150 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'رسوم الخدمة' : 'Service fee'}
              </span>
              <span className={colors.text}>{isAr ? '٥٠ ج.م' : '50 EGP'}</span>
            </div>
            <div className={`flex justify-between pt-2 border-t ${colors.border} font-extrabold`}>
              <span className={colors.text}>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span className="text-[#E51C23]">{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
          </div>
          <p className={`text-[11px] ${colors.secondaryText}`}>
            {isAr
              ? 'يشمل هذا العرض رحلة الـ ٨.٢ كم بالكامل إلى نايل أوتو كير. أي تعديل يتطلب موافقتك.'
              : 'This quote includes the full 8.2 km trip to Nile Auto Care. Any change requires your approval.'}
          </p>
          <PrimaryButton onClick={() => goToOwnerScreen('C14')}>
            {isAr ? 'موافقة · ٦٥٠ ج.م' : 'Approve · 650 EGP'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C32')}>
            {isAr ? 'الاعتراض على التكلفة' : 'Dispute Estimate'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C14: Choose payment
    // ==========================================
    case 'C14': {
      const paymentOptions = [
        {
          id: 'cash',
          title: isAr ? 'نقداً للكابتن (كاش)' : 'Cash to Captain',
          sub: isAr ? 'ادفع لمحمود عند انتهاء الرحلة' : 'Pay Mahmoud when your trip ends'
        },
        {
          id: 'card',
          title: isAr ? 'بطاقة ائتمان' : 'Credit Card',
          sub: isAr ? 'بطاقة فيزا تنتهي بـ 4242' : 'Visa ending in 4242'
        },
        {
          id: 'apple',
          title: 'Apple Pay',
          sub: isAr ? 'دفع إلكتروني سريع وآمن' : 'Fast, secure checkout'
        }
      ];
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'اختر طريقة الدفع' : 'Choose payment'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'دفع آمن ومضمون.' : 'Secure payment. One less thing to worry about.'}
            </p>
          </div>
          <div className="space-y-2">
            {paymentOptions.map((m) => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`w-full p-3 rounded-2xl border text-start transition ${
                  paymentMethod === m.id
                    ? 'border-[#E51C23] bg-[#E51C23]/10'
                    : `${colors.border} ${colors.surface}`
                }`}
              >
                <p className={`text-xs font-bold ${paymentMethod === m.id ? 'text-[#E51C23]' : colors.text}`}>
                  {m.title}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>{m.sub}</p>
              </button>
            ))}
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'ملخص الطلب' : 'Order summary'}</p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'ونش سطحة · FG-2606' : 'Flatbed Tow · FG-2606'}
              </span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>
                {isAr ? 'طريقة الدفع' : 'Payment method'}
              </span>
              <span className={`font-bold ${colors.text}`}>
                {paymentMethod === 'cash'
                  ? isAr
                    ? 'نقداً للكابتن'
                    : 'Cash to Captain'
                  : paymentMethod === 'card'
                  ? 'Visa •••• 4242'
                  : 'Apple Pay'}
              </span>
            </div>
            <span className="inline-block text-[10px] text-emerald-500 font-bold">
              • {isAr ? 'بدون أي رسوم إضافية' : 'No additional fees'}
            </span>
          </div>
          <PrimaryButton
            onClick={() =>
              paymentMethod === 'cash' ? goToOwnerScreen('C15') : goToOwnerScreen('C34')
            }
          >
            {paymentMethod === 'cash'
              ? isAr
                ? 'تأكيد الدفع النقدي · ٦٥٠ ج.م'
                : 'Confirm Cash · 650 EGP'
              : isAr
              ? 'متابعة للدفع الإلكتروني · ٦٥٠ ج.م'
              : 'Continue to Checkout · 650 EGP'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C33')}>
            {isAr ? '+ إضافة بطاقة دفع جديدة' : '+ Add Payment Card'}
          </SecondaryButton>
        </div>
      );
    }

    // ==========================================
    // C15: You're good to go (Invoice)
    // ==========================================
    case 'C15':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'أنت جاهز للانطلاق' : "You're good to go"}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'فاتورة رقمية · ٦ نوفمبر ٢٠٢٦' : 'Digital invoice · 6 November 2026'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Completed" text={isAr ? 'تم تأكيد الدفع' : 'Payment Verified'} />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رقم الفاتورة' : 'Invoice number'}</span>
              <span className={`font-bold ${colors.text}`}>INV-2026-2606</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'مرجع الرحلة' : 'Trip reference'}</span>
              <span className={`font-bold ${colors.text}`}>FG-2606</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'طريقة الدفع' : 'Payment method'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'نقداً للكابتن' : 'Cash to Captain'}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'تفاصيل التكلفة' : 'Cost breakdown'}</p>
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
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between text-xs`}>
            <div className="flex items-center gap-2">
              <img src={DRIVER_AVATAR} alt="Mahmoud" className="w-9 h-9 rounded-xl object-cover" />
              <div>
                <p className={`font-bold ${colors.text}`}>{isAr ? 'محمود حسن' : 'Mahmoud Hassan'}</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'تم الدفع: ٦ نوفمبر · ١٤:٤٥' : 'Paid on: 6 Nov 2026 · 14:45'}
                </p>
              </div>
            </div>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C16')}>
            {isAr ? 'تقييم الكابتن' : 'Rate Captain'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C16: How was your trip? (Rate)
    // ==========================================
    case 'C16':
      return (
        <div className="p-4 space-y-3.5 text-center">
          <div className="text-start">
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'كيف كانت رحلتك؟' : 'How was your trip?'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'ملاحظاتك تساعدنا على تقديم الأفضل.' : 'A little feedback goes a long way.'}
            </p>
          </div>
          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5`}>
            <img src={DRIVER_AVATAR} alt="Mahmoud" className="w-14 h-14 rounded-2xl object-cover mx-auto" />
            <p className={`text-sm font-bold ${colors.text}`}>
              {isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
            </p>
            <span className="inline-block text-[10px] font-bold text-[#E51C23]">
              • {isAr ? 'ونش سطحة · FG-2606' : 'Flatbed Tow · FG-2606'}
            </span>
            <div className="flex justify-center gap-2 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingStars(star)}
                  className={`text-2xl ${star <= ratingStars ? 'text-amber-400' : 'text-slate-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
            <p className="text-xs font-bold text-amber-500">
              {isAr ? `ممتاز — ${ratingStars} نجوم` : `Excellent — ${ratingStars} stars`}
            </p>
          </div>
          <div className="text-start space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'أخبرنا المزيد (اختياري)' : 'Tell us more (optional)'}
            </label>
            <textarea
              rows={2}
              defaultValue={
                isAr
                  ? 'وصل بسرعة وتعامل مع سيارتي بعناية فائقة. شكراً جزيلاً!'
                  : 'Arrived quickly and handled my car with care. Thank you!'
              }
              className={`w-full p-3 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C41')}>
            {isAr ? 'إرسال التقييم' : 'Submit Review'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C17: Service centers list
    // ==========================================
    case 'C17':
      return (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-lg font-bold ${colors.text}`}>
                {isAr ? 'مراكز الخدمة' : 'Service centers'}
              </h1>
              <p className={`text-xs ${colors.secondaryText}`}>
                {isAr ? 'عناية متخصصة، بالقرب منك.' : 'Expert care, close to you.'}
              </p>
            </div>
            <button
              onClick={() => goToOwnerScreen('C37')}
              className="px-2.5 py-1.5 rounded-xl bg-[#E51C23]/10 text-[#E51C23] text-[10px] font-bold"
            >
              {isAr ? 'مواعيدي' : 'My Appointments'}
            </button>
          </div>
          <div className={`flex items-center gap-2 px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg}`}>
            <Search size={14} className={colors.secondaryText} />
            <input
              placeholder={isAr ? 'ابحث بالاسم أو الخدمة...' : 'Search by name or service'}
              className={`bg-transparent text-xs w-full focus:outline-none ${colors.text}`}
            />
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'All', label: isAr ? 'الكل' : 'All' },
              { id: 'Nearby', label: isAr ? 'الأقرب' : 'Nearby' },
              { id: 'Top Rated', label: isAr ? 'الأعلى تقييماً' : 'Top Rated' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCenterFilter(tab.id)}
                className={`py-1.5 rounded-xl text-[10px] font-bold border ${
                  centerFilter === tab.id
                    ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
                    : `${colors.border} ${colors.surface} ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {[
            {
              name: isAr ? 'نايل أوتو كير' : 'Nile Auto Care',
              meta: isAr ? '4.8 ★ · ١.٨ كم' : '4.8 ★ · 1.8 km',
              services: isAr ? 'فحص · زيت · فرامل' : 'Inspection · Oil · Brakes',
              hours: isAr ? 'مفتوح حتى ٨ م' : 'Open until 8 PM'
            },
            {
              name: isAr ? 'كايرو موتور كلينك' : 'Cairo Motor Clinic',
              meta: isAr ? '4.7 ★ · ٣.٢ كم' : '4.7 ★ · 3.2 km',
              services: isAr ? 'فحص · زيت · فرامل' : 'Inspection · Oil · Brakes',
              hours: isAr ? 'مفتوح حتى ٩ م' : 'Open until 9 PM'
            }
          ].map((c) => (
            <div
              key={c.name}
              onClick={() => goToOwnerScreen('C18')}
              className={`rounded-2xl border ${colors.border} ${colors.surface} overflow-hidden cursor-pointer`}
            >
              <img src={WORKSHOP_IMAGE} alt={c.name} className="w-full h-24 object-cover" />
              <div className="p-3 space-y-1">
                <div className="flex justify-between items-center">
                  <p className={`text-xs font-bold ${colors.text}`}>{c.name}</p>
                  <span className={`text-[10px] font-bold ${colors.text}`}>{c.hours}</span>
                </div>
                <p className={`text-[10px] ${colors.secondaryText}`}>{c.meta}</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>{c.services}</p>
              </div>
            </div>
          ))}
        </div>
      );

    // ==========================================
    // C18: Nile Auto Care detail
    // ==========================================
    case 'C18':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
            </h1>
            <button
              onClick={() => goToOwnerScreen('C40')}
              className="text-xs text-[#E51C23] font-semibold"
            >
              {isAr ? '4.8 ★ · ٢١٦ تقييم · مركز معتمد (عرض التقييمات)' : '4.8 ★ · 216 reviews · Verified center'}
            </button>
          </div>
          <img src={WORKSHOP_IMAGE} alt="Center" className="w-full h-28 rounded-2xl object-cover" />
          <div className="space-y-1">
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'التجمع الخامس، القاهرة الجديدة · على بعد ١.٨ كم' : 'Fifth Settlement, New Cairo · 1.8 km away'}
            </p>
            <StatusBadge status="Online" text={isAr ? 'مفتوح · ٩:٠٠ ص – ٨:٠٠ م' : 'Open · 9:00 AM – 8:00 PM'} />
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'الخدمات والأسعار' : 'Services & prices'}
            </p>
            {[
              { name: isAr ? 'تغيير زيت وفلتر · ٤٥ دقيقة' : 'Oil & filter change · 45 min', price: isAr ? '٨٥٠ ج.م' : '850 EGP' },
              { name: isAr ? 'فحص الفرامل · ٣٠ دقيقة' : 'Brake inspection · 30 min', price: isAr ? '٣٥٠ ج.م' : '350 EGP' },
              { name: isAr ? 'فحص شامل بالكمبيوتر · ٦٠ دقيقة' : 'Full diagnostics · 60 min', price: isAr ? '٦٠٠ ج.م' : '600 EGP' }
            ].map((s) => (
              <div key={s.name} className="flex justify-between">
                <span className={colors.secondaryText}>{s.name}</span>
                <span className={`font-bold ${colors.text}`}>{s.price}</span>
              </div>
            ))}
          </div>
          <div
            onClick={() => goToOwnerScreen('C40')}
            className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 cursor-pointer text-xs`}
          >
            <div className="flex justify-between">
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'سلمى نبيل · ٤ نوفمبر' : 'Salma Nabil · 4 Nov'}
              </span>
              <span className="text-amber-500 font-bold">5.0 ★</span>
            </div>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? '"أسعار واضحة وخدمة ممتازة، كانت سيارتي جاهزة في الموعد تماماً."'
                : '"Clear pricing, excellent service and my car was ready right on time."'}
            </p>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C19')}>
            {isAr ? 'حجز موعد' : 'Book Appointment'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C19: Book an appointment
    // ==========================================
    case 'C19':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'حجز موعد صيانة' : 'Book an appointment'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نايل أوتو كير · القاهرة الجديدة' : 'Nile Auto Care · New Cairo'}
            </p>
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'الخدمة' : 'Service'}</label>
            <div className={`px-3 h-10 rounded-xl border ${colors.border} ${colors.surface} flex items-center justify-between text-xs font-semibold ${colors.text}`}>
              <span>{isAr ? 'تغيير زيت وفلتر · ٤٥ دقيقة' : 'Oil & filter change · 45 min'}</span>
              <span>▾</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'نوفمبر ٢٠٢٦' : 'November 2026'}
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {['Fri 6', 'Sat 7', 'Sun 8', 'Mon 9', 'Tue 10'].map((d) => (
                <button
                  key={d}
                  onClick={() => setBookingDay(d)}
                  className={`py-2 rounded-xl text-[10px] font-bold border ${
                    bookingDay === d
                      ? 'bg-[#E51C23] border-[#E51C23] text-white'
                      : `${colors.border} ${colors.surface} ${colors.text}`
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'الأوقات المتاحة' : 'Available times'}
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map((t) => (
                <button
                  key={t}
                  onClick={() => setBookingTime(t)}
                  className={`py-2 rounded-xl text-xs font-bold border ${
                    bookingTime === t
                      ? 'border-[#E51C23] bg-[#E51C23]/15 text-[#E51C23]'
                      : `${colors.border} ${colors.surface} ${colors.text}`
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'المركبة' : 'Vehicle'}</label>
            <div className={`px-3 h-10 rounded-xl border ${colors.border} ${colors.surface} flex items-center justify-between text-xs font-semibold ${colors.text}`}>
              <span>{isAr ? 'هيونداي إلنترا · A B C 1234' : 'Hyundai Elantra · A B C 1234'}</span>
              <span>▾</span>
            </div>
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ملاحظات (اختياري)' : 'Notes (optional)'}
            </label>
            <input
              defaultValue={isAr ? 'يرجى فحص ضغط الإطارات أيضاً.' : 'Please check tire pressure too.'}
              className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className={colors.secondaryText}>{isAr ? 'الموعد المحدد' : 'Selected slot'}</span>
            <span className={`font-bold ${colors.text}`}>
              {bookingDay} · {bookingTime} AM
            </span>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C36')}>
            {isAr ? 'تأكيد الحجز · ٨٥٠ ج.م' : 'Confirm Booking · 850 EGP'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C20: Request history
    // ==========================================
    case 'C20':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'سجل الطلبات' : 'Request history'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'جميع رحلاتك في مكان واحد.' : 'Every trip, all in one place.'}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'All', label: isAr ? 'الكل' : 'All' },
              { id: 'Completed', label: isAr ? 'مكتمل' : 'Completed' },
              { id: 'Cancelled', label: isAr ? 'ملغي' : 'Cancelled' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setHistoryFilter(tab.id)}
                className={`py-1.5 rounded-xl text-[10px] font-bold border ${
                  historyFilter === tab.id
                    ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
                    : `${colors.border} ${colors.surface} ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {[
            {
              date: isAr ? '٦ نوفمبر ٢٠٢٦ · ١٤:٤٥' : '6 Nov 2026 · 14:45',
              title: isAr ? 'ونش سطحة' : 'Flatbed Tow',
              provider: isAr ? 'محمود حسن' : 'Mahmoud Hassan',
              amt: isAr ? '٦٥٠ ج.م' : '650 EGP',
              status: 'Completed'
            },
            {
              date: isAr ? '٢٨ أكتوبر ٢٠٢٦ · ٠٩:١٢' : '28 Oct 2026 · 09:12',
              title: isAr ? 'شحن بطارية' : 'Battery Jump',
              provider: isAr ? 'كريم مصطفى' : 'Karim Mostafa',
              amt: isAr ? '٤٠٠ ج.م' : '400 EGP',
              status: 'Completed'
            },
            {
              date: isAr ? '١٤ أكتوبر ٢٠٢٦ · ١٨:٢٠' : '14 Oct 2026 · 18:20',
              title: isAr ? 'تغيير إطار' : 'Tire Change',
              provider: isAr ? 'عمر عادل' : 'Omar Adel',
              amt: isAr ? '٠ ج.م' : '0 EGP',
              status: 'Cancelled'
            }
          ]
            .filter((item) => historyFilter === 'All' || item.status === historyFilter)
            .map((item) => (
              <div
                key={item.title}
                onClick={() => goToOwnerScreen('C21')}
                className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 cursor-pointer`}
              >
                <div className="flex justify-between text-[10px]">
                  <span className={colors.secondaryText}>{item.date}</span>
                  <span className={`text-xs font-extrabold ${colors.text}`}>{item.amt}</span>
                </div>
                <p className={`text-xs font-bold ${colors.text}`}>{item.title}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-[11px] ${colors.secondaryText}`}>{item.provider}</span>
                  <span className="text-[11px] font-bold text-[#E51C23]">
                    {isAr ? 'عرض الرحلة ←' : 'View trip →'}
                  </span>
                </div>
                <StatusBadge
                  status={item.status}
                  text={
                    item.status === 'Completed'
                      ? isAr
                        ? 'مكتمل'
                        : 'Completed'
                      : isAr
                      ? 'ملغي'
                      : 'Cancelled'
                  }
                />
              </div>
            ))}
        </div>
      );

    // ==========================================
    // C21: Trip detail
    // ==========================================
    case 'C21':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تفاصيل الرحلة' : 'Trip detail'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · ٦ نوفمبر ٢٠٢٦' : 'FG-2606 · 6 November 2026'}
            </p>
          </div>
          <RadarMapCanvas
            label={isAr ? '٨.٢ كم · ٤٣ دقيقة' : '8.2 km · 43 min'}
            subtitle={isAr ? 'شارع التسعين' : '90th Street'}
          />
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <div className="flex items-center gap-2.5">
              <img src={DRIVER_AVATAR} alt="Mahmoud" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'كابتن ونش · 4.9 ★ (١٢٨ رحلة)' : 'Tow Captain · 4.9 ★ (128 trips)'}
                </p>
              </div>
            </div>
            <div className={`flex justify-between pt-1.5 border-t ${colors.border}`}>
              <span className={colors.secondaryText}>{isAr ? 'الفاتورة' : 'Invoice'}</span>
              <span className={`font-bold ${colors.text}`}>INV-2026-2606 · Cash</span>
            </div>
            <StatusBadge status="Completed" text={isAr ? 'مكتمل' : 'Completed'} />
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            {[
              { step: isAr ? 'تم الطلب' : 'Requested', time: '14:02' },
              { step: isAr ? 'تم التعيين' : 'Matched', time: '14:03' },
              { step: isAr ? 'في الطريق' : 'En route', time: '14:04' },
              { step: isAr ? 'وصل للموقع' : 'Arrived', time: '14:10' },
              { step: isAr ? 'جاري العمل' : 'Working', time: '14:15' },
              { step: isAr ? 'الدفع' : 'Payment', time: '14:44' },
              { step: isAr ? 'مكتمل' : 'Completed', time: '14:45' }
            ].map((s) => (
              <div key={s.step} className="flex justify-between items-center">
                <span className={`flex items-center gap-1.5 ${colors.text}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {s.step}
                </span>
                <span className={colors.secondaryText}>{s.time}</span>
              </div>
            ))}
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C15')}>
            {isAr ? 'عرض الإيصال · ٦٥٠ ج.م' : 'View Receipt · 650 EGP'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C42')}>
            {isAr ? 'تفاصيل التسلسل الزمني الكامل' : 'Full Request Timeline'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C22: Notifications
    // ==========================================
    case 'C22':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'الإشعارات' : 'Notifications'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'أنت على اطلاع دائم بكل جديد.' : "You're all caught up with your road."}
            </p>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className={colors.secondaryText}>
              {isAr ? '٢ تنبيهات غير مقروءة' : '2 unread alerts'}
            </span>
            <button className={`font-bold ${colors.text}`}>
              {isAr ? 'تحديد الكل كمقروء' : 'Mark all as read'}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'All', label: isAr ? 'الكل' : 'All' },
              { id: 'Trips', label: isAr ? 'الرحلات' : 'Trips' },
              { id: 'Bookings', label: isAr ? 'الحجوزات' : 'Bookings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setNotifFilter(tab.id)}
                className={`py-1.5 rounded-xl text-[10px] font-bold border ${
                  notifFilter === tab.id
                    ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
                    : `${colors.border} ${colors.surface} ${colors.secondaryText}`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {[
            {
              title: isAr ? 'تم تأكيد الدفع' : 'Payment verified',
              sub: isAr ? 'تم تأكيد دفع ٦٥٠ ج.م نقداً.' : '650 EGP cash payment confirmed.',
              time: isAr ? 'الآن' : 'Now',
              target: 'C15'
            },
            {
              title: isAr ? 'كيف كان الكابتن؟' : 'How was your captain?',
              sub: isAr ? 'قيّم رحلتك مع محمود حسن.' : 'Rate your trip with Mahmoud Hassan.',
              time: isAr ? 'منذ دقيقتين' : '2 min ago',
              target: 'C16'
            },
            {
              title: isAr ? 'وصل الكابتن' : 'Captain has arrived',
              sub: isAr ? 'محمود متواجد في شارع التسعين.' : 'Your captain is at 90th Street.',
              time: isAr ? 'منذ ٣٥ دقيقة' : '35 min ago',
              target: 'C12'
            },
            {
              title: isAr ? 'تم تأكيد الحجز' : 'Booking confirmed',
              sub: isAr ? 'نايل أوتو كير · ٧ نوفمبر، ١٠:٠٠ ص' : 'Nile Auto Care · 7 Nov, 10:00 AM',
              time: isAr ? 'منذ ساعة' : '1 hour ago',
              target: 'C38'
            },
            {
              title: isAr ? 'حسابك جاهز' : 'Your account is ready',
              sub: isAr ? 'مرحباً بك في منصتك الموثوقة للمساعدة على الطريق.' : 'Welcome to your roadside backup.',
              time: isAr ? 'أمس' : 'Yesterday',
              target: 'C02'
            }
          ].map((n) => (
            <div
              key={n.title}
              onClick={() => goToOwnerScreen(n.target)}
              className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} cursor-pointer space-y-0.5`}
            >
              <div className="flex justify-between items-center">
                <p className={`text-xs font-bold ${colors.text}`}>{n.title}</p>
                <span className={`text-[10px] ${colors.secondaryText}`}>{n.time}</span>
              </div>
              <p className={`text-[11px] ${colors.secondaryText}`}>{n.sub}</p>
            </div>
          ))}
        </div>
      );

    // ==========================================
    // C23: Profile & settings
    // ==========================================
    case 'C23':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'الملف الشخصي والإعدادات' : 'Profile & settings'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'حسابك وتفضيلاتك.' : 'Your account, your preferences.'}
            </p>
          </div>
          <div
            onClick={() => goToSharedScreen('SH12')}
            className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between cursor-pointer`}
          >
            <div className="flex items-center gap-2.5">
              <img src={CUSTOMER_AVATAR} alt="Ahmed" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className={`text-xs font-bold ${colors.text}`}>
                  {isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
                </p>
                <p className={`text-[11px] ${colors.secondaryText}`}>ahmed.mohamed@gmail.com</p>
              </div>
            </div>
            <StatusBadge status="Online" text={isAr ? 'مالك سيارة' : 'Car Owner'} />
          </div>

          <EmergencySOSBar />

          {[
            {
              label: isAr ? 'الإعدادات (اللغة والمظهر)' : 'Settings (Language & Appearance)',
              target: 'SH06'
            },
            {
              label: isAr ? 'تفضيلات الإشعارات' : 'Notification preferences',
              target: 'SH10'
            },
            {
              label: isAr ? 'تغيير كلمة المرور' : 'Change Password',
              target: 'SH02'
            },
            {
              label: isAr ? 'المساعدة والدعم' : 'Help & Support',
              target: 'SH07'
            },
            {
              label: isAr ? 'سياسة الخصوصية والشروط' : 'Privacy Policy & Terms',
              target: 'SH05'
            },
            {
              label: isAr ? 'عن FixNGo' : 'About FixNGo',
              target: 'SH11'
            },
            {
              label: isAr ? 'تسجيل الخروج' : 'Log Out',
              target: 'SH13'
            }
          ].map((item) => (
            <button
              key={item.target}
              onClick={() => goToSharedScreen(item.target)}
              className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-semibold ${colors.text}`}
            >
              <span>{item.label}</span>
              <ForwardChevron size={15} className={colors.secondaryText} />
            </button>
          ))}
        </div>
      );

    // ==========================================
    // C24: Vehicle details & edit
    // ==========================================
    case 'C24':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تفاصيل المركبة' : 'Vehicle details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'جراجي · هيونداي إلنترا' : 'My Garage · Hyundai Elantra'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'الماركة' : 'Make'}</label>
              <input
                defaultValue={isAr ? 'هيونداي' : 'Hyundai'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'الموديل' : 'Model'}</label>
              <input
                defaultValue={isAr ? 'إلنترا' : 'Elantra'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'السنة' : 'Year'}</label>
              <input
                defaultValue="2021"
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'رقم اللوحة' : 'Plate number'}
              </label>
              <input
                defaultValue="A B C 1234"
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'اللون' : 'Color'}</label>
              <input
                defaultValue={isAr ? 'رمادي' : 'Graphite'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الوقود' : 'Fuel type'}
              </label>
              <input
                defaultValue={isAr ? 'بنزين' : 'Petrol'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
          </div>

          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2.5 text-xs`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`font-bold ${colors.text}`}>
                  {isAr ? 'المركبة الأساسية' : 'Primary vehicle'}
                </p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'تُستخدم افتراضياً في طلبات المساعدة' : 'Used by default for roadside requests'}
                </p>
              </div>
              <button
                onClick={() => setPrimaryVehicle(!primaryVehicle)}
                className={`w-9 h-5 rounded-full p-0.5 flex items-center transition ${
                  primaryVehicle ? 'bg-emerald-500 justify-end' : 'bg-slate-400 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow" />
              </button>
            </div>
            <div className={`pt-2 border-t ${colors.border} flex items-center justify-between text-rose-500`}>
              <div>
                <p className="font-bold">{isAr ? 'حذف المركبة' : 'Delete vehicle'}</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'إزالتها من جراجك' : 'Remove from your garage'}
                </p>
              </div>
              <Trash2 size={15} />
            </div>
          </div>

          <div className="p-3 rounded-2xl border border-rose-500/30 bg-rose-500/10 space-y-2 text-[11px]">
            <p className="font-bold text-rose-500">
              {isAr ? 'هل تريد حذف هذه المركبة؟' : 'Delete this vehicle?'}
            </p>
            <p className={colors.secondaryText}>
              {isAr
                ? 'تظل الرحلات السابقة محفوظة. تصبح كيا سبورتاج هي المركبة الأساسية.'
                : 'Past trips stay saved. Kia Sportage becomes primary. Deletion is blocked during an active request.'}
            </p>
          </div>

          <PrimaryButton onClick={() => goToOwnerScreen('C04')}>
            {isAr ? 'حفظ التغييرات' : 'Save Changes'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C25: Confirm your location
    // ==========================================
    case 'C25':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تأكيد موقعك' : 'Confirm your location'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'حرك الدبوس إلى نقطة التقاء آمنة.' : 'Pickup · Move the pin to a safe meeting point.'}
            </p>
          </div>
          <div className={`flex items-center justify-between px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg}`}>
            <input
              defaultValue={isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              className={`bg-transparent text-xs w-full focus:outline-none ${colors.text}`}
            />
            <Search size={14} className={colors.secondaryText} />
          </div>
          <RadarMapCanvas
            label={isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
            subtitle={isAr ? 'بجانب محطة الوقود' : 'Beside the petrol station'}
          />
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <div>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'نقطة الالتقاء المحددة · بجانب محطة الوقود' : 'Selected pickup · Beside the petrol station'}
              </p>
            </div>
            <div className={`pt-2 border-t ${colors.border}`}>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'استخدام موقعي الحالي' : 'Use my current location'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'GPS متاح · إعادة توسيط الدبوس' : 'GPS available · Recenter the pin'}
              </p>
            </div>
            <div className={`pt-2 border-t ${colors.border}`}>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'نايل أوتو كير، التجمع الخامس' : 'Nile Auto Care, Fifth Settlement'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'وجهة حديثة · على بعد ٨.٢ كم' : 'Recent destination · 8.2 km away'}
              </p>
            </div>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C07')}>
            {isAr ? 'تأكيد موقع الالتقاء' : 'Confirm Pickup Location'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C26: Describe your issue
    // ==========================================
    case 'C26':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'صف المشكلة' : 'Describe your issue'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'خطوة ١ من ٣ · أخبرنا بالمساعدة المطلوبة.' : 'Step 1 of 3 · Tell us what help to bring.'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border border-[#E51C23]/30 bg-[#E51C23]/5 space-y-2 text-xs`}>
            <p className="font-bold text-[#E51C23]">
              {isAr ? 'تغيير إطار · محدد' : 'Tire Change · Selected'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الإطار المتأثر' : 'Affected tire'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'الأمامي الأيمن' : 'Front right'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الإطار الاحتياطي' : 'Spare available'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'نعم · جاهز' : 'Yes · Inflated'}
              </span>
            </div>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'الإطار الأمامي الأيمن مثقوب. السيارة متوقفة بأمان بجانب محطة الوقود.'
                : 'Front right tire is flat. Parked safely beside the petrol station.'}
            </p>
          </div>
          <div className="space-y-1">
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'إضافة ملاحظة (اختياري)' : 'Add a note (optional)'}
            </label>
            <input
              defaultValue={
                isAr ? 'لدي إطار احتياطي ومفتاح فك الإطارات.' : 'I have a spare and wheel-lock key.'
              }
              className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C27')}>
            {isAr ? 'متابعة لاختيار الميكانيكي' : 'Continue'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C27: Choose your mechanic
    // ==========================================
    case 'C27':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'اختر الميكانيكي' : 'Choose your mechanic'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? '٣ ميكانيكيين معتمدين بالقرب من القاهرة' : '3 verified mechanics near Cairo'}
            </p>
          </div>
          {[
            {
              name: isAr ? 'كريم مصطفى' : 'Karim Mostafa',
              rating: '4.9 ★',
              eta: isAr ? '٦ دقائق · ٢.٤ كم' : '6 min · 2.4 km',
              price: isAr ? '٤٠٠ ج.م' : '400 EGP'
            },
            {
              name: isAr ? 'حسن علي' : 'Hassan Ali',
              rating: '4.8 ★',
              eta: isAr ? '٩ دقائق · ٣.١ كم' : '9 min · 3.1 km',
              price: isAr ? '٤٢٠ ج.م' : '420 EGP'
            },
            {
              name: isAr ? 'طارق سمير' : 'Tarek Samir',
              rating: '4.8 ★',
              eta: isAr ? '١٢ دقيقة · ٤.٦ كم' : '12 min · 4.6 km',
              price: isAr ? '٤٥٠ ج.م' : '450 EGP'
            }
          ].map((m) => (
            <div key={m.name} className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-2`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <img src={MECHANIC_AVATAR} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className={`text-xs font-bold ${colors.text}`}>{m.name}</p>
                    <p className={`text-[10px] ${colors.secondaryText}`}>
                      {m.rating} · {isAr ? 'ميكانيكي معتمد' : 'Verified mechanic'}
                    </p>
                    <p className="text-[10px] text-amber-500 font-semibold">• {m.eta}</p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold ${colors.text}`}>{m.price}</span>
              </div>
              <PrimaryButton onClick={() => goToOwnerScreen('C31')}>
                {isAr ? 'اختيار' : 'Select'}
              </PrimaryButton>
            </div>
          ))}
        </div>
      );

    // ==========================================
    // C28: No providers nearby
    // ==========================================
    case 'C28':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'لا يوجد مقدمو خدمة قريبون' : 'No providers nearby'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'تغيير إطار · شارع التسعين، القاهرة الجديدة' : 'Tire Change · 90th Street, New Cairo'}
            </p>
          </div>
          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} text-center space-y-2`}>
            <div className="w-12 h-12 rounded-full bg-[#E51C23]/10 text-[#E51C23] flex items-center justify-center mx-auto">
              <Clock size={22} />
            </div>
            <p className={`text-sm font-bold ${colors.text}`}>
              {isAr ? 'جميع الفنيين القريبين مشغولون حالياً' : 'Everyone nearby is busy'}
            </p>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr
                ? 'لا يوجد ميكانيكي متاح في نطاق ٥ كم. لم يتم تعيين طلبك بعد.'
                : 'No verified mechanics within 5 km. Your request is not assigned.'}
            </p>
            <StatusBadge status="Pending" text={isAr ? 'بدون رسوم · غير معين' : 'No charge · Not assigned'} />
          </div>
          <button
            onClick={() => goToOwnerScreen('C06')}
            className={`w-full p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between items-center text-xs font-semibold ${colors.text}`}
          >
            <span>{isAr ? 'تغيير نوع الخدمة' : 'Change service'}</span>
            <ForwardChevron size={15} className={colors.secondaryText} />
          </button>
          <EmergencySOSBar />
          <PrimaryButton onClick={() => goToOwnerScreen('C09')}>
            {isAr ? 'البحث مرة أخرى' : 'Search Again'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C27')}>
            {isAr ? 'توسيع النطاق إلى ١٠ كم' : 'Expand Radius to 10 km'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C29: Cancel this request?
    // ==========================================
    case 'C29': {
      const reasons = isAr
        ? [
            'لم أعد بحاجة إلى المساعدة',
            'اخترت الخدمة الخاطئة',
            'مقدم الخدمة يستغرق وقتاً طويلاً',
            'سبب آخر'
          ]
        : [
            'I no longer need assistance',
            'I chose the wrong service',
            'The provider is taking too long',
            'Other reason'
          ];
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'إلغاء هذا الطلب؟' : 'Cancel this request?'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2607 · ونش سطحة · جاري البحث' : 'FG-2607 · Flatbed Tow · Searching'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'لماذا تقوم بالإلغاء؟' : 'Why are you cancelling?'}
            </p>
            {reasons.map((r, idx) => (
              <button
                key={r}
                onClick={() => setCancelReason(idx)}
                className="w-full flex items-center gap-2 py-1 text-start"
              >
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    cancelReason === idx ? 'border-emerald-500 bg-emerald-500 text-white' : colors.border
                  }`}
                >
                  {cancelReason === idx && <Check size={10} />}
                </span>
                <span className={colors.text}>{r}</span>
              </button>
            ))}
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'رسوم الإلغاء' : 'Cancellation fee'}
              </span>
              <span className="font-bold text-emerald-500">{isAr ? '٠ ج.م' : '0 EGP'}</span>
            </div>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr
                ? 'لم يتم تعيين كابتن بعد. لن يتم تحصيل أي رسوم.'
                : "No captain is assigned yet. You won't be charged."}
            </p>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C30')}>
            {isAr ? 'تأكيد الإلغاء' : 'Confirm Cancellation'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C09')}>
            {isAr ? 'الاحتفاظ بطلبي' : 'Keep My Request'}
          </SecondaryButton>
        </div>
      );
    }

    // ==========================================
    // C30: Request cancelled
    // ==========================================
    case 'C30':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تم إلغاء الطلب' : 'Request cancelled'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2607 · نتيجة الإلغاء' : 'FG-2607 · Cancellation outcome'}
            </p>
          </div>
          <div className="p-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-xs space-y-0.5">
            <p className="font-bold text-emerald-500">
              • {isAr ? 'توقف البحث' : 'Your search has stopped'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'لم يتم تعيين مقدم خدمة. لا تطبق أي رسوم إلغاء.'
                : 'No provider was assigned. No cancellation fee applies.'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'ملخص الإلغاء' : 'Cancellation summary'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الخدمة' : 'Service'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? 'ونش سطحة' : 'Flatbed Tow'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الموقع' : 'Pickup'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'شارع التسعين، القاهرة الجديدة' : '90th Street, New Cairo'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رسوم الإلغاء' : 'Cancellation fee'}</span>
              <span className="font-bold text-emerald-500">{isAr ? '٠ ج.م' : '0 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C06')}>
            {isAr ? 'طلب مساعدة مرة أخرى' : 'Request Help Again'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C02')}>
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C31: Your repair is underway
    // ==========================================
    case 'C31':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'جاري إصلاح سيارتك' : 'Your repair is underway'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'MR-2611 · تغيير إطار · ٦ نوفمبر ٢٠٢٦' : 'MR-2611 · Tire Change · 6 November 2026'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Online" text={isAr ? 'اكتمل الإصلاح · جاهز للدفع' : 'Repair complete · Ready to pay'} />
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'كريم مصطفى' : 'Karim Mostafa'}</p>
            <p className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'ميكانيكي معتمد · 4.9 ★ · هيونداي إلنترا' : 'Verified mechanic · 4.9 ★ · Hyundai Elantra'}
            </p>
            {[
              { label: isAr ? 'تم تعيين الميكانيكي' : 'Mechanic assigned', time: '15:06' },
              { label: isAr ? 'وصل إلى موقعك' : 'Arrived at your location', time: '15:12' },
              { label: isAr ? 'تم إرسال التشخيص والتكلفة' : 'Diagnosis & quote sent', time: '15:15' },
              { label: isAr ? 'تمت الموافقة على ٤٠٠ ج.م' : '400 EGP quote approved', time: '15:17' },
              { label: isAr ? 'تم تركيب الإطار وفحص الضغط' : 'Spare fitted & pressure checked', time: '15:35' }
            ].map((s) => (
              <div key={s.label} className="flex justify-between text-[11px]">
                <span className={colors.text}>• {s.label}</span>
                <span className={colors.secondaryText}>{s.time}</span>
              </div>
            ))}
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'تفاصيل التكلفة' : 'Cost breakdown'}</p>
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
              <span className="text-[#E51C23]">{isAr ? '٤٠٠ ج.م' : '400 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C14')}>
            {isAr ? 'المتابعة للدفع' : 'Continue to Payment'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToSharedScreen('SH01')}>
            {isAr ? 'محادثة مع كريم' : 'Chat with Karim'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C32: Dispute your estimate
    // ==========================================
    case 'C32':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'الاعتراض على التكلفة' : 'Dispute your estimate'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · لم تتم الموافقة على العرض بعد' : 'FG-2606 · Quote not yet approved'}
            </p>
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
            <div className={`flex justify-between pt-1 border-t ${colors.border} font-extrabold`}>
              <span className={colors.text}>{isAr ? 'الإجمالي' : 'Total'}</span>
              <span className={colors.text}>{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>{isAr ? 'السبب' : 'Reason'}</label>
            <input
              defaultValue={isAr ? 'المسافة أو المسار غير صحيح' : 'Distance or route looks incorrect'}
              className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
          </div>
          <div>
            <label className={`text-[10px] ${colors.secondaryText}`}>
              {isAr ? 'الحل المقترح' : 'Proposed resolution'}
            </label>
            <textarea
              rows={2}
              defaultValue={
                isAr
                  ? 'يرجى تأكيد مسار الـ ٨.٢ كم قبل الموافقة على العرض.'
                  : 'Please confirm the 8.2 km route before I approve the quote.'
              }
              className={`w-full p-2.5 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
            />
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C13')}>
            {isAr ? 'إرسال الاعتراض' : 'Submit Dispute'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C13')}>
            {isAr ? 'العودة للتكلفة' : 'Back to Estimate'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C33: Add payment card
    // ==========================================
    case 'C33':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'إضافة بطاقة دفع' : 'Add payment card'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'بيانات البطاقة مشفرة بالكامل.' : 'Secure token · Card details are encrypted.'}
            </p>
          </div>
          <div className="space-y-2">
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'الاسم على البطاقة' : 'Name on card'}
              </label>
              <input
                defaultValue={isAr ? 'أحمد محمد' : 'Ahmed Mohamed'}
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div>
              <label className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'رقم البطاقة' : 'Card number'}
              </label>
              <input
                defaultValue="•••• •••• •••• 4242"
                className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'تاريخ الانتهاء' : 'Expiry date'}
                </label>
                <input
                  defaultValue="11 / 28"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
              <div>
                <label className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? 'رمز الأمان CVV' : 'Security code'}
                </label>
                <input
                  type="password"
                  defaultValue="123"
                  className={`w-full px-3 h-10 rounded-xl border ${colors.border} ${colors.inputBg} text-xs ${colors.text}`}
                />
              </div>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex items-center justify-between text-xs`}>
            <div>
              <p className={`font-bold ${colors.text}`}>
                {isAr ? 'حفظ البطاقة للمرات القادمة' : 'Save card for next time'}
              </p>
              <p className={`text-[10px] ${colors.secondaryText}`}>
                {isAr ? 'يتم تخزين رمز دفع آمن فقط.' : 'Only a secure payment token is stored.'}
              </p>
            </div>
            <button
              onClick={() => setSaveCardToken(!saveCardToken)}
              className={`w-9 h-5 rounded-full p-0.5 flex items-center transition ${
                saveCardToken ? 'bg-emerald-500 justify-end' : 'bg-slate-400 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow" />
            </button>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C34')}>
            {isAr ? 'حفظ البطاقة' : 'Save Card'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C34: Review & pay (Card/Apple)
    // ==========================================
    case 'C34':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'المراجعة والدفع' : 'Review & pay'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'ونش سطحة · دفع إلكتروني آمن' : 'Flatbed Tow · Secure checkout'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setCheckoutTab('card')}
              className={`py-2 rounded-xl text-xs font-bold border ${
                checkoutTab === 'card'
                  ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
                  : `${colors.border} ${colors.surface} ${colors.text}`
              }`}
            >
              {isAr ? 'بطاقة ائتمان' : 'Credit Card'}
            </button>
            <button
              onClick={() => setCheckoutTab('apple')}
              className={`py-2 rounded-xl text-xs font-bold border ${
                checkoutTab === 'apple'
                  ? 'border-[#E51C23] bg-[#E51C23]/10 text-[#E51C23]'
                  : `${colors.border} ${colors.surface} ${colors.text}`
              }`}
            >
              Apple Pay
            </button>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الإجمالي المطلوب' : 'Total to pay'}</span>
              <span className={`font-extrabold ${colors.text}`}>{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'مقدم الخدمة' : 'Provider'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'محمود حسن' : 'Mahmoud Hassan'}
              </span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {checkoutTab === 'card'
                ? isAr
                  ? 'بطاقة فيزا تنتهي بـ 4242'
                  : 'Visa ending in 4242'
                : 'Apple Pay'}
            </p>
            <button
              onClick={() => goToOwnerScreen('C33')}
              className="text-[10px] text-[#E51C23] font-semibold"
            >
              {isAr ? 'تنتهي 11/28 · تغيير البطاقة' : 'Expires 11/28 · Change card'}
            </button>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C15')}>
            {isAr ? 'دفع ٦٥٠ ج.م' : 'Pay 650 EGP'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C35')}>
            {isAr ? 'محاكاة تعذر الدفع' : 'Simulate Declined Payment'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C35: Payment didn't go through
    // ==========================================
    case 'C35':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'لم تتم عملية الدفع' : "Payment didn't go through"}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? '٦٥٠ ج.م · لم يتم خصم أي مبلغ' : '650 EGP · No completed card payment'}
            </p>
          </div>
          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} text-center space-y-1.5`}>
            <CreditCard size={24} className="text-[#E51C23] mx-auto" />
            <p className={`text-sm font-bold ${colors.text}`}>
              {isAr ? 'مدفوعاتك في أمان.' : 'Your payment is safe.'}
            </p>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr
                ? 'تعذر على البنك إتمام هذه العملية. تحقق من بطاقتك أو اختر طريقة دفع أخرى.'
                : "Your bank couldn't complete this payment. Check your card or choose another payment method."}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'محاولة الدفع' : 'Payment attempt'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٦٥٠ ج.م' : '650 EGP'}</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الوسيلة' : 'Method'}</span>
              <span className={`font-bold ${colors.text}`}>Visa •••• 4242</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الحالة' : 'Status'}</span>
              <span className="font-bold text-rose-500">
                {isAr ? 'فشل · لم يتم الخصم' : 'Failed · Not charged'}
              </span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C34')}>
            {isAr ? 'إعادة محاولة الدفع' : 'Try Payment Again'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C14')}>
            {isAr ? 'اختيار طريقة دفع أخرى' : 'Choose Another Method'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C36: You're booked in
    // ==========================================
    case 'C36':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تم تأكيد حجزك' : "You're booked in"}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'تأكيد الحجز · BK-2048' : 'Booking confirmation · BK-2048'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Online" text={isAr ? 'مؤكد' : 'Confirmed'} />
            </div>
          </div>
          <img src={WORKSHOP_IMAGE} alt="Workshop" className="w-full h-24 rounded-2xl object-cover" />
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رقم الحجز' : 'Booking reference'}</span>
              <span className={`font-bold ${colors.text}`}>BK-2048</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'مركز الخدمة' : 'Service center'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الموعد' : 'Appointment'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٧ نوفمبر · ١٠:٠٠–١٠:٤٥' : '7 Nov · 10:00–10:45'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'السعر · ٤٥ دقيقة' : 'Price · 45 minutes'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C38')}>
            {isAr ? 'عرض تفاصيل الموعد' : 'View Appointment'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C02')}>
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C37: My appointments
    // ==========================================
    case 'C37':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'مواعيدي' : 'My appointments'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'جميع زيارات المراكز في مكان واحد.' : 'All your center visits, in one place.'}
            </p>
          </div>
          {[
            {
              title: isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change',
              status: 'Online',
              badge: isAr ? 'مؤكد · BK-2048' : 'Confirmed · BK-2048',
              sub: isAr ? 'نايل أوتو كير · ٧ نوفمبر · ١٠:٠٠–١٠:٤٥' : 'Nile Auto Care · 7 Nov · 10:00–10:45',
              price: isAr ? '٨٥٠ ج.م' : '850 EGP'
            },
            {
              title: isAr ? 'فحص شامل بالكمبيوتر' : 'Full diagnostics',
              status: 'Completed',
              badge: isAr ? 'مكتمل · ٢ نوفمبر · BK-2016' : 'Completed · 2 Nov 2026 · BK-2016',
              sub: isAr ? 'نايل أوتو كير · ٦٠ دقيقة' : 'Nile Auto Care · 60 minutes',
              price: isAr ? '٦٠٠ ج.م' : '600 EGP'
            },
            {
              title: isAr ? 'فحص الفرامل' : 'Brake inspection',
              status: 'Cancelled',
              badge: isAr ? 'ملغي · ٣٠ أكتوبر · BK-1998' : 'Cancelled · 30 Oct 2026 · BK-1998',
              sub: isAr ? 'رسوم الإلغاء: ٠ ج.م' : 'Cancellation fee: 0 EGP',
              price: isAr ? '٠ ج.م' : '0 EGP'
            }
          ].map((b) => (
            <div
              key={b.title}
              onClick={() => goToOwnerScreen('C38')}
              className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 cursor-pointer text-xs`}
            >
              <div className="flex justify-between">
                <span className={`font-bold ${colors.text}`}>{b.title}</span>
                <span className={`font-extrabold ${colors.text}`}>{b.price}</span>
              </div>
              <StatusBadge status={b.status} text={b.badge} />
              <p className={`text-[11px] ${colors.secondaryText}`}>{b.sub}</p>
            </div>
          ))}
        </div>
      );

    // ==========================================
    // C38: Appointment details
    // ==========================================
    case 'C38':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تفاصيل الموعد' : 'Appointment details'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'BK-2048 · مؤكد' : 'BK-2048 · Confirmed'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'تغيير زيت وفلتر' : 'Oil & filter change'}
            </p>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'رقم الحجز' : 'Booking reference'}</span>
              <span className={`font-bold ${colors.text}`}>BK-2048</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'المركز' : 'Service center'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الموعد' : 'Appointment'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٧ نوفمبر · ١٠:٠٠–١٠:٤٥' : '7 Nov · 10:00–10:45'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'السعر · ٤٥ دقيقة' : 'Price · 45 minutes'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
            </div>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'زيارتك' : 'Your visit'}</p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr ? 'ملاحظة العميل: يرجى فحص ضغط الإطارات أيضاً.' : 'Customer note: Please check tire pressure too.'}
            </p>
            <button
              onClick={() => goToSharedScreen('SH01')}
              className="text-xs font-bold text-[#E51C23]"
            >
              {isAr ? 'مراسلة المركز ←' : 'Message the center →'}
            </button>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C39')}>
            {isAr ? 'إعادة جدولة الموعد' : 'Reschedule Appointment'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C43')}>
            {isAr ? 'إلغاء الموعد' : 'Cancel Appointment'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C39: Reschedule appointment
    // ==========================================
    case 'C39':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'إعادة جدولة الموعد' : 'Reschedule appointment'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'BK-2048 · نايل أوتو كير' : 'BK-2048 · Nile Auto Care'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} text-xs flex justify-between`}>
            <span className={colors.secondaryText}>{isAr ? 'الموعد الحالي' : 'Current time'}</span>
            <span className={`font-bold ${colors.text}`}>7 Nov · 10:00–10:45</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {['Sat 7', 'Sun 8', 'Mon 9', 'Tue 10'].map((d) => (
              <button
                key={d}
                onClick={() => setRescheduleDay(d)}
                className={`py-2 rounded-xl text-[10px] font-bold border ${
                  rescheduleDay === d
                    ? 'bg-[#E51C23] border-[#E51C23] text-white'
                    : `${colors.border} ${colors.surface} ${colors.text}`
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map((t) => (
              <button
                key={t}
                onClick={() => setRescheduleTime(t)}
                className={`py-2 rounded-xl text-xs font-bold border ${
                  rescheduleTime === t
                    ? 'border-[#E51C23] bg-[#E51C23]/15 text-[#E51C23]'
                    : `${colors.border} ${colors.surface} ${colors.text}`
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} text-xs space-y-1`}>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الموعد الجديد' : 'New appointment'}</span>
              <span className={`font-bold ${colors.text}`}>
                {rescheduleDay} · {rescheduleTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'فرق السعر' : 'Price difference'}</span>
              <span className="font-bold text-emerald-500">{isAr ? '٠ ج.م' : '0 EGP'}</span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C38')}>
            {isAr ? 'تأكيد الموعد الجديد' : 'Confirm New Time'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C38')}>
            {isAr ? 'الاحتفاظ بالموعد الأصلي' : 'Keep Original Time'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C40: Center reviews (4.8★)
    // ==========================================
    case 'C40':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'تقييمات المركز' : 'Center reviews'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'نايل أوتو كير · زيارات عملاء موثقة' : 'Nile Auto Care · Verified customer visits'}
            </p>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-extrabold ${colors.text}`}>4.8</span>
              <div>
                <p className="text-amber-500 font-bold">★★★★★</p>
                <p className={`text-[10px] ${colors.secondaryText}`}>
                  {isAr ? '٢١٦ تقييم · ٩٤٪ يوصون به' : '216 reviews · 94% recommend'}
                </p>
              </div>
            </div>
          </div>
          {[
            {
              name: isAr ? 'سلمى نبيل' : 'Salma Nabil',
              date: isAr ? '٤ نوفمبر ٢٠٢٦' : '4 Nov 2026',
              service: isAr ? '★★★★★ · تغيير زيت وفلتر' : '★★★★★ · Oil & filter change',
              text: isAr
                ? 'أسعار واضحة وخدمة ممتازة، كانت سيارتي جاهزة في الموعد تماماً.'
                : 'Clear pricing and excellent service. My car was ready right on time.'
            },
            {
              name: isAr ? 'عمر فتحي' : 'Omar Fathy',
              date: isAr ? '٣ نوفمبر ٢٠٢٦' : '3 Nov 2026',
              service: isAr ? '★★★★★ · فحص شامل' : '★★★★★ · Full diagnostics',
              text: isAr
                ? 'فريق محترف جداً. شرحوا لي نتائج الفحص بالتفصيل قبل البدء.'
                : 'Professional team. Explained the diagnostics before starting.'
            },
            {
              name: isAr ? 'منى عادل' : 'Mona Adel',
              date: isAr ? '١ نوفمبر ٢٠٢٦' : '1 Nov 2026',
              service: isAr ? '★★★★☆ · فحص الفرامل' : '★★★★☆ · Brake inspection',
              text: isAr
                ? 'مركز نظيف وتجربة حجز سلسة وسريعة.'
                : 'Clean workshop and a smooth booking experience.'
            }
          ].map((r) => (
            <div key={r.name} className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
              <div className="flex justify-between">
                <span className={`font-bold ${colors.text}`}>{r.name}</span>
                <span className={`text-[10px] ${colors.secondaryText}`}>{r.date}</span>
              </div>
              <p className="text-[10px] text-amber-500 font-bold">{r.service}</p>
              <p className={`text-[11px] ${colors.secondaryText}`}>{r.text}</p>
            </div>
          ))}
        </div>
      );

    // ==========================================
    // C41: Thanks for your review
    // ==========================================
    case 'C41':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'شكراً لتقييمك' : 'Thanks for your review'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · محمود حسن' : 'FG-2606 · Mahmoud Hassan'}
            </p>
          </div>
          <div className={`p-4 rounded-2xl border ${colors.border} ${colors.surface} text-center space-y-1.5`}>
            <CheckCircle2 size={28} className="text-emerald-500 mx-auto" />
            <p className="text-amber-400 text-base font-bold">★★★★★</p>
            <p className={`text-xs font-bold ${colors.text}`}>
              {isAr ? 'ممتاز — ٥ نجوم' : 'Excellent — 5 stars'}
            </p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'ملاحظاتك تساعد السائقين الآخرين على الاختيار بثقة.'
                : 'Your feedback helps other drivers choose with confidence.'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'تقييمك' : 'Your review'}</p>
            <p className={`text-[11px] ${colors.secondaryText}`}>
              {isAr
                ? 'وصل بسرعة وتعامل مع سيارتي بعناية فائقة. شكراً جزيلاً!'
                : 'Arrived quickly and handled my car with care. Thank you!'}
            </p>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C20')}>
            {isAr ? 'عرض سجل الطلبات' : 'View Request History'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C02')}>
            {isAr ? 'العودة للرئيسية' : 'Back to Home'}
          </SecondaryButton>
        </div>
      );

    // ==========================================
    // C42: Request timeline (7/7)
    // ==========================================
    case 'C42':
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'التسلسل الزمني للطلب' : 'Request timeline'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'FG-2606 · ٦ نوفمبر ٢٠٢٦' : 'FG-2606 · 6 November 2026'}
            </p>
            <div className="pt-1">
              <StatusBadge status="Completed" text={isAr ? 'مكتمل · ٧ من ٧ خطوات' : 'Completed · 7 of 7 steps'} />
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1.5 text-xs`}>
            <p className={`font-bold ${colors.text} pb-1`}>
              {isAr ? 'كل خطوة مسجلة' : 'Every step, recorded'}
            </p>
            {[
              { step: isAr ? 'تم الطلب' : 'Requested', time: '14:02' },
              { step: isAr ? 'تم التعيين' : 'Matched', time: '14:03' },
              { step: isAr ? 'في الطريق' : 'En route', time: '14:04' },
              { step: isAr ? 'وصل للموقع' : 'Arrived', time: '14:10' },
              { step: isAr ? 'جاري العمل' : 'Working', time: '14:15' },
              { step: isAr ? 'الدفع' : 'Payment', time: '14:44' },
              { step: isAr ? 'مكتمل' : 'Completed', time: '14:45' }
            ].map((s) => (
              <div key={s.step} className="flex justify-between items-center">
                <span className={`flex items-center gap-1.5 ${colors.text}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {s.step}
                </span>
                <span className={colors.secondaryText}>{s.time}</span>
              </div>
            ))}
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <p className={`font-bold ${colors.text}`}>{isAr ? 'ونش سطحة' : 'Flatbed Tow'}</p>
            <div className="flex justify-between">
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
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'الدفع' : 'Payment'}</span>
              <span className={`font-bold ${colors.text}`}>
                {isAr ? '٦٥٠ ج.م · نقداً' : '650 EGP · Cash'}
              </span>
            </div>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C15')}>
            {isAr ? 'عرض الإيصال · ٦٥٠ ج.م' : 'View Receipt · 650 EGP'}
          </PrimaryButton>
        </div>
      );

    // ==========================================
    // C43: Cancel appointment?
    // ==========================================
    case 'C43': {
      const reasons = isAr
        ? ['تغيرت خططي', 'اخترت الخدمة الخاطئة', 'الموعد لم يعد مناسباً', 'سبب آخر']
        : [
            'My plans have changed',
            'I chose the wrong service',
            'The time no longer works',
            'Other reason'
          ];
      return (
        <div className="p-4 space-y-3">
          <div>
            <h1 className={`text-lg font-bold ${colors.text}`}>
              {isAr ? 'إلغاء الموعد؟' : 'Cancel appointment?'}
            </h1>
            <p className={`text-xs ${colors.secondaryText}`}>
              {isAr ? 'BK-2048 · تغيير زيت وفلتر' : 'BK-2048 · Oil & filter change'}
            </p>
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} space-y-1 text-xs`}>
            <div className="flex justify-between">
              <span className={`font-bold ${colors.text}`}>
                {isAr ? 'نايل أوتو كير' : 'Nile Auto Care'}
              </span>
              <span className={`font-bold ${colors.text}`}>7 Nov · 10:00</span>
            </div>
            <div className="flex justify-between">
              <span className={colors.secondaryText}>{isAr ? 'قيمة الحجز' : 'Booking value'}</span>
              <span className={`font-bold ${colors.text}`}>{isAr ? '٨٥٠ ج.م' : '850 EGP'}</span>
            </div>
          </div>
          <div className={`p-3.5 rounded-2xl border ${colors.border} ${colors.surface} space-y-2 text-xs`}>
            <p className={`font-bold ${colors.text}`}>
              {isAr ? 'لماذا تقوم بالإلغاء؟' : 'Why are you cancelling?'}
            </p>
            {reasons.map((r, idx) => (
              <button
                key={r}
                onClick={() => setCancelBookingReason(idx)}
                className="w-full flex items-center gap-2 py-1 text-start"
              >
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    cancelBookingReason === idx ? 'border-emerald-500 bg-emerald-500 text-white' : colors.border
                  }`}
                >
                  {cancelBookingReason === idx && <Check size={10} />}
                </span>
                <span className={colors.text}>{r}</span>
              </button>
            ))}
          </div>
          <div className={`p-3 rounded-2xl border ${colors.border} ${colors.surface} flex justify-between text-xs`}>
            <span className={colors.secondaryText}>{isAr ? 'رسوم الإلغاء' : 'Applicable fee'}</span>
            <span className="font-bold text-emerald-500">{isAr ? '٠ ج.م' : '0 EGP'}</span>
          </div>
          <PrimaryButton onClick={() => goToOwnerScreen('C37')}>
            {isAr ? 'تأكيد الإلغاء' : 'Confirm Cancellation'}
          </PrimaryButton>
          <SecondaryButton onClick={() => goToOwnerScreen('C38')}>
            {isAr ? 'الاحتفاظ بالموعد' : 'Keep Appointment'}
          </SecondaryButton>
        </div>
      );
    }
  }
}
