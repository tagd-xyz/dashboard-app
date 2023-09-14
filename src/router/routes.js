const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        name: 'profileShow',
        path: 'profile/:id',
        component: () => import('src/pages/Profile/Show.vue'),
      },
      {
        name: 'home',
        path: 'home',
        component: () => import('src/pages/Home/Index.vue'),
      },
      {
        name: 'tagsIssued',
        path: 'tags-issued',
        component: () => import('src/pages/TagsIssued/Index.vue'),
      },
      {
        name: 'timeToTransfer',
        path: 'time-to-transfer',
        component: () => import('src/pages/TimeToTransfer/Index.vue'),
      },
      {
        name: 'fraudReport',
        path: 'fraud-report',
        component: () => import('src/pages/FraudReport/Index.vue'),
      },
      {
        name: 'summaryCurrency',
        path: 'summary-currency',
        component: () => import('src/pages/SummaryCurrency/Index.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'signIn',
        path: '',
        component: () => import('pages/SignIn/Index.vue'),
      },
    ],
  },
  {
    path: '/splash',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        name: 'splash',
        path: '',
        component: () => import('pages/SignIn/Splash.vue'),
      },
    ],
  },
  {
    path: '/errorNetwork',
    name: 'errorNetwork',
    component: () => import('pages/ErrorNetwork.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
