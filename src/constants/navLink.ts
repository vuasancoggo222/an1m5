import type {INavLink} from '@/types/nav'
export const navLink:INavLink[] = [
    {
        name : "Home",
        path : "/",
    },
    {
        name : "Most Popular",
        path : "/most-popular",
    },
    {
        name : "Schedule",
        path : "/schedule",
    },
    {
        name : "Category",
        path : "/category"
    }
]

export const userDropdown = [
    {
      title: "Account infomation",
      value: '/account-information',
      icon: "mdi-card-account-details"
    },
    {
        title: "Settings",
        value: '/settings',
        icon: "mdi-cog"
      },
    {
      title: "Rencent watched",
      value: '/recent-watched',
      icon: "mdi-history"
    },
    {
      title: "Sign out",
      value : '/log-out',
      icon: "mdi-logout-variant"
    },
  ]