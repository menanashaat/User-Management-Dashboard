import { createI18n } from "vue-i18n";

const messages = {
  en: {
    "teamMembersTitle": "Team Members",
    "teamMembersDescription": "Manage your team members and their account permissions here",
    "searchByName": "Search by name",
    "selectRole": "Select role",
    "allRoles": "All Roles",
    "selectStatus": "Select status",
    "allStatuses": "All Statuses",
    "active": "Active",
    "inactive": "Inactive",
    "applyFilters": "Apply Filters",
    "name": "Name",
    "email": "Email",
    "role": "Role",
    "status": "Status",
    "dateJoined": "Date Joined",
    "actions": "Actions",
    "editUser": "Edit",
    "delete": "Delete",
    "editUserModalTitle": "Edit User",
    "userUpdatedSuccessfully": "User updated successfully",
    "pagination": "Pagination",
    "ExportPDF":"Export to PDF"
  },
  ar:{
    "teamMembersTitle": "أعضاء الفريق",
    "teamMembersDescription": "قم بإدارة أعضاء فريقك وأذونات حساباتهم هنا",
    "searchByName": "البحث بالاسم",
    "selectRole": "اختر الدور",
    "allRoles": "جميع الأدوار",
    "selectStatus": "اختر الحالة",
    "allStatuses": "جميع الحالات",
    "active": "نشط",
    "inactive": "غير نشط",
    "applyFilters": "تطبيق الفلاتر",
    "name": "الاسم",
    "email": "البريد الإلكتروني",
    "role": "الدور",
    "status": "الحالة",
    "dateJoined": "تاريخ الانضمام",
    "actions": "الإجراءات",
    "editUser": "تعديل",
    "delete": "حذف",
    "editUserModalTitle": "تعديل المستخدم",
    "userUpdatedSuccessfully": "تم تحديث المستخدم بنجاح",
    "pagination": "التنقل بين الصفحات",
    "ExportPDF":"تصدير إلى ملف"
  }
};

// Create i18n instance with legacy mode disabled
export const i18n = createI18n({
  legacy: false, // ✅ Disable legacy mode to use Composition API
  locale: "en",
  fallbackLocale: "en",
  globalInjection: true, // ✅ Allows using `t` globally
  messages,
});
