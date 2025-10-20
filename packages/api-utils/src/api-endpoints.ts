export const API_ENDPOINTS = {
  AUTH: {
    SIGN_UP: "/auth/sign-up",
    SIGN_IN_ROOT: "/auth/sign-in",
    EMPLOYEE_SIGN_IN: "/auth/sign-in-employee",
    GET_PROFILE: "/auth/profile",
    FIND_ALL_PERMISSIONS: "/auth/permissions",
  },
  BUSINESSES: {
    FIND_ONE: (businessSlug: string) =>
      `/businesses/${businessSlug}` as `/businesses/${string}`,
    CREATE: "/businesses",
    GROUPS: {
      FIND_ONE: (businessSlug: string, groupSlug: string) =>
        `/businesses/${businessSlug}/groups/${groupSlug}` as `/businesses/${string}/groups/${string}`,
      CREATE: (businessSlug: string) =>
        `/businesses/${businessSlug}/groups` as `/businesses/${string}/groups`,
      UPDATE: (businessSlug: string, groupSlug: string) =>
        `/businesses/${businessSlug}/groups/${groupSlug}` as `/businesses/${string}/groups/${string}`,
      ASSIGN_EMPLOYEES: (businessSlug: string, groupSlug: string) =>
        `/businesses/${businessSlug}/groups/${groupSlug}/employees` as `/businesses/${string}/groups/${string}/employees`,
      REMOVE_EMPLOYEES: (businessSlug: string, groupSlug: string) =>
        `/businesses/${businessSlug}/groups/${groupSlug}/employees` as `/businesses/${string}/groups/${string}/employees`,
    },
    EMPLOYEES: {
      CREATE: (businessSlug: string) =>
        `/businesses/${businessSlug}/employees` as `/businesses/${string}/employees`,
      FIND_ONE: (businessSlug: string, employeeId: string) =>
        `/businesses/${businessSlug}/employees/${employeeId}` as `/businesses/${string}/employees/${string}`,
      UPDATE: (businessSlug: string, employeeId: string) =>
        `/businesses/${businessSlug}/employees/${employeeId}` as `/businesses/${string}/employees/${string}`,
      ASSIGN_GROUPS: (businessSlug: string, employeeId: string) =>
        `/businesses/${businessSlug}/employees/${employeeId}/groups` as `/businesses/${string}/employees/${string}/groups`,
      REMOVE_GROUPS: (businessSlug: string, employee: string) =>
        `/businesses/${businessSlug}/employees/${employee}/groups` as `/businesses/${string}/employees/${string}/groups`,
    },
    CATEGORIES: {
      FIND_MANY: (businessSlug: string) =>
        `/businesses/${businessSlug}/categories` as `/businesses/${string}/categories`,
      FIND_ONE: (businessSlug: string, categoryId: string) =>
        `/businesses/${businessSlug}/categories/${categoryId}` as `/businesses/${string}/categories/${string}`,
      CREATE: (businessSlug: string) =>
        `/businesses/${businessSlug}/categories` as `/businesses/${string}/categories`,
      DELETE_MANY: (businessSlug: string) =>
        `/businesses/${businessSlug}/categories/delete-many` as `/businesses/${string}/categories/delete-many`,
      UPDATE: (businessSlug: string, categoryId: string) =>
        `/businesses/${businessSlug}/categories/${categoryId}` as `/businesses/${string}/categories/${string}`,
    },
    PRODUCTS: {
      FIND_MANY: (businessSlug: string) =>
        `/businesses/${businessSlug}/products` as `/businesses/${string}/products`,
      CREATE: (businessSlug: string) =>
        `/businesses/${businessSlug}/products` as `/businesses/${string}/products`,
      FIND_ONE: (businessSlug: string, productId: string) =>
        `/businesses/${businessSlug}/products/${productId}` as `/businesses/${string}/products/${string}`,
      UPDATE: (businessSlug: string, productId: string) =>
        `/businesses/${businessSlug}/products/${productId}` as `/businesses/${string}/products/${string}`,
      DELETE: (businessSlug: string, productId: string) =>
        `/businesses/${businessSlug}/products/${productId}` as `/businesses/${string}/products/${string}`,
    },
  },
} as const;
