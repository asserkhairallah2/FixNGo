# FixNGo — AI Agent Instructions & Conventions (`AGENT.md`)
> **الغرض من الملف:** ملف تعليمات وقواعد ثابتة لأدوات ونماذج الذكاء الاصطناعي (AI Agent) يحدد المعمارية، حزمة التقنيات، ومعايير كتابة الكود لضمان أن تبدأ كل Session بنفس السياق ودون أي افتراضات عشوائية.

---

## 1. حزمة التقنيات المعتمدة (Tech Stack)
* **اللغة والإطار الأساسي:** C# 12 / .NET 8 LTS
* **نوع التطبيق:** ASP.NET Core MVC (Web Application + REST APIs)
* **الوصول لقاعدة البيانات:** Entity Framework Core 8 (Code-First)
* **قواعد البيانات المدعومة:** SQLite (بيئة التطوير والاختبار المحلي) / SQL Server (بيئة الإنتاج)
* **واجهات المستخدم:** Razor Views (.cshtml) + Bootstrap 5 + FontAwesome + jQuery Unobtrusive Validation + React/Fullstack components.
* **التحقق وتعيين البيانات:** FluentValidation + AutoMapper

---

## 2. النمط المعماري (Architecture Guidelines)
نعتمد حصراً معمارية **Clean Architecture** المفصولة إلى 4 طبقات:
1. **FixNGo.Domain (القلب النقي):**
   - يحتوي على الـ Entities, Enums, Value Objects, Domain Exceptions.
   - **قاعدة صارمة:** خالي تماماً من أي Dependencies خارجية أو مراجع لإطارات عمل أو قواعد بيانات.
2. **FixNGo.Application (منطق الأعمال والخدمات):**
   - يحتوي على Use Cases, DTOs, Service Interfaces, Mapping Profiles, Fluent Validators.
   - يعتمد فقط على طبقة الـ Domain.
3. **FixNGo.Infrastructure (البنية التحتية والبيانات):**
   - يحتوي على `AppDbContext`, فئات `IEntityTypeConfiguration<T>`, الـ Migrations، والـ External Services.
   - يعتمد على طبقتي Application و Domain.
4. **FixNGo.Web (طبقة العرض والـ Controllers):**
   - تحتوي على الـ Controllers, ViewModels, Views, Tag Helpers, Middlewares.
   - تتعامل مع Application عبر واجهات الخدمات (Interfaces) وتمنع استدعاء الـ DbContext المباشر داخل الـ Views.

---

## 3. القواعد البرمجية الصارمة (Conventions & Guardrails)
1. **فصل التكوين (Entity Configurations):** ممنوع استخدام Data Annotations لعلاقات الجداول؛ يجب فصل كل جدول في كلاس مستقل ينفذ `IEntityTypeConfiguration<T>`.
2. **حظر تداول الـ Entities في الـ Views:** لا يتم تمرير أي كائن Domain Entity مباشرة إلى Razor View؛ يجب دائماً التحويل إلى ViewModel مناسب لحماية البيانات.
3. **التحقق المزدوج (Validation):**
   - Client-side عبر Tag Helpers و jQuery Validation.
   - Server-side عبر FluentValidation و `ModelState.IsValid`.
4. **أمان البيانات:** استبعاد أي أسرار أو كلمات سر من الأكواد واستخدام `User Secrets` أو متغيرات البيئة.
5. **إدارة دورة حياة الخدمات:** تسجيل الـ DbContext والـ Repositories/Services بدورة حياة `Scoped`.

---

## 4. نموذج العمل المشترك (Planner vs Executor Roles)
* **المخطط (Planner):** مسؤول عن تحليل الـ SRS، تحديد المتطلبات الهندسية، واقتراح الخطوات وتوزيع المسؤوليات دون كتابة كود عشوائي.
* **المنفذ (Executor):** يقوم بتنفيذ الكود خطوة بخطوة طبقاً لتعليمات الـ Planner والمعايير المحددة في هذا الملف، متبوعاً بإجراء اختبارات فورية.
