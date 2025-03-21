# Architecture Questions

## 1. How would you optimize API calls in this application for performance?
To optimize API calls:
- **Debouncing**: Use debouncing for search inputs to reduce the number of API calls triggered by frequent keystrokes.
- **Pagination**: Implement server-side pagination to fetch only the required data instead of loading all records at once.
- **Caching**: Cache API responses using tools like `axios-cache-interceptor` or browser `localStorage` to avoid redundant requests
- **Lazy Loading**: Load data only when needed (e.g., when a user scrolls or interacts with a specific component).


## 2. Describe your approach to handling shared logic between components.
Shared logic can be handled using:
- **Composables**: Create reusable composables (Vue 3's Composition API) for logic like API calls, form validation, or state management.
- **Store (Pinia/Vuex)**: Use a centralized store for shared state (e.g., user data, theme, or permissions).
- **Utility Functions**: Extract common functions (e.g., date formatting, error handling) into utility files and import them where needed.


## 3. How would you implement client-side data caching for this dashboard?
To implement client-side caching:
- **Local Storage**: Store frequently used data (e.g., user preferences, permissions) in `localStorage` or `sessionStorage`.
- **Service Workers**: Implement service workers for caching API responses and enabling offline access.

---

## 4. What strategy would you use to scale this application if it needed to support hundreds of different user permission types?
To handle hundreds of permission types:
- **Role-Based Access Control (RBAC)**: Group permissions into roles and assign roles to users.
- **Attribute-Based Access Control (ABAC)**: Use dynamic rules based on user attributes (e.g., department, location).
- **Backend Management**: Store and manage permissions on the backend to reduce frontend complexity.
- **Granular Components**: Create reusable components that check permissions before rendering specific features.

---

## 5. Explain your testing strategy and how you decided what to test.
Testing strategy:
- **Unit Tests**: Test individual components and utility functions using `Vitest` .
- **Integration Tests**: Test interactions between components (e.g., form submissions, API calls) using `Cypress` or `Vue Test Utils`.
- **End-to-End (E2E) Tests**: Use `Cypress` 
- **Prioritization**: Focus on critical paths (e.g., authentication, data fetching) 


## 6. How would you handle offline capabilities in this application?
To enable offline capabilities:
- **Service Workers**: Use service workers to cache static assets and API responses.
- **Local Storage**: Store essential data (e.g., user preferences, recent activities) in `localStorage` or `IndexedDB`.
- **UI Feedback**: Notify users when they are offline and provide options to retry failed actions.