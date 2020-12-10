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
    // tag: '2',
    // tagColor: 'warning',
    icon: 'HomeIcon',
    i18n: 'Dashboard',
    role : ['manager'],
    submenu: [
      {
        //url: '/dashboard/analytics',
        name: 'Admin Dashboard',
        slug: 'dashboard-analytics',
        i18n: 'Analytics'
      },
      {
        //url: '/dashboard/ecommerce',
        name: 'Agency Dashboard',
        slug: 'dashboard-ecommerce',
        i18n: 'eCommerce'

      }
    ]
  },
  {
    header: 'Admin',
    icon: 'PackageIcon',
    i18n: 'Admin',
    role : 'manager',
    items: [
      {
        url: '/vessels/',
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
        ],
        meta: {
          rule: 'editor'
        }
      },
      {
        //url: '/Cruises',
        name: 'Cruises',
        rule : 'isManager',
        slug: 'cruise',
        icon: 'MessageSquareIcon',
        i18n: 'Cruise',
        submenu: [
          {
            url: '/Cruises',
            name: 'Cruises',
            slug: 'cruises',
            i18n: 'cruises'
          }
        ]
      },
      {
        url: null,
        name: 'Cruise Settings',
        slug: 'cruise-settings',
        icon: 'MailIcon',
        i18n: 'Cruise Settings',
        submenu: [
          {
            url: '/countries/',
            name: 'Countries',
            slug: 'countries',
            i18n: 'Countries'
          },
          {
            url: '/Ports/',
            name: 'Ports',
            slug: 'ports',
            i18n: 'Ports'
          },
          {
            url: '/CruiseTypes/',
            name: 'Cruise Types',
            slug: 'cruisetypes',
            i18n: 'CruiseTypes'
          },
          {
            url: '/CruiseSeasons/',
            name: 'Cruise Seasons',
            slug: 'cruiseseasons',
            i18n: 'cruiseseasons'
          },
          {
            url: '/Markets/',
            name: 'Markets',
            slug: 'markets',
            i18n: 'markets'
          },
          {
            url: '/prices/',
            name: 'Prices',
            slug: 'prices',
            i18n: 'prices'
          }

        ]
      },
      {
        url: null,
        name: 'Agency Settings',
        slug: 'agency-settings',
        icon: 'MailIcon',
        i18n: 'Agency Settings',
        submenu: [
          {
            url: '/agencytypes/',
            name: 'Agency Type',
            slug: 'agencytypes',
            i18n: 'agencytypes'
          },
          {
            url: '/agencies/',
            name: 'Agencies',
            slug: 'agencies',
            i18n: 'agencies'
          }
        ]
      }
    ]
  },
  {
    header: 'Agency',
    icon: 'LayersIcon',
    i18n: 'UI',
    role : ['agency', 'manager'],
    items: [
      {
        url: null,
        name: 'Bookings',
        icon: 'ListIcon',
        i18n: 'Bookings',
        submenu: [
          {
            url: '/Booking/',
            name: 'Booking',
            slug: 'booking',
            i18n: 'booking'
          },
          {
            url: '/MyBookings/',
            name: 'My Bookings',
            slug: 'mybookings',
            i18n: 'mybookings'
          }
        ]
      }
    ]
  }
]

