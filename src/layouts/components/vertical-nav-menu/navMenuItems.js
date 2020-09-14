/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  // {
  //   url: "/apps/email",
  //   name: "Email",
  //   slug: "email",
  //   icon: "MailIcon",
  //   i18n: "Email",
  // },
  {
    url: null,
    name: 'Dashboard',
    tag: '2',
    tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    submenu: [
      {
        url: '/dashboard/analytics',
        name: 'Analytics',
        slug: 'dashboard-analytics',
        i18n: 'Analytics'
      },
      {
        url: '/dashboard/ecommerce',
        name: 'eCommerce',
        slug: 'dashboard-ecommerce',
        i18n: 'eCommerce'
      }
    ]
  },
  {
    header: 'Admin',
    icon: 'PackageIcon',
    i18n: 'Admin',
    items: [
      {
        url: null,
        name: 'Vessel',
        slug: 'Vessel',
        icon: 'MailIcon',
        i18n: 'Vessel',
        submenu: [
          {
            url: '/vessels/',
            name: 'Vessels',
            slug: 'vessels',
            i18n: 'Vessels'
          }
        ]
      },
      {
        url: '/Cruise',
        name: 'Cruise',
        slug: 'cruise',
        icon: 'MessageSquareIcon',
        i18n: 'Cruise'
      }
      
    ]
  },
  {
    header: 'Agency',
    icon: 'LayersIcon',
    i18n: 'UI',
    items: [
      {
        url: null,
        name: 'Data List',
        tag: 'new',
        tagColor: 'primary',
        icon: 'ListIcon',
        i18n: 'DataList',
        submenu: [
          {
            url: '/ui-elements/data-list/list-view',
            name: 'List View',
            slug: 'data-list-list-view',
            i18n: 'ListView'
          }
        ]
      }
    ]
  }
]

