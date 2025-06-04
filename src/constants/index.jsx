import {
  Home,
  Headset,
  IdCard,
  Mail,
  Building,
  Building2,
  CirclePlus,
  UserRoundPen,
  CreditCard,
  CalendarRange,
  CalendarPlus2,
  Briefcase,
  SquarePen,
  ListChecks,
  FileCheck,
  Search,
} from "lucide-react";

export const navbarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Home",
        icon: Home,
        path: "/dashboard/overview",
      },
    ],
  },
  {
    title: "Organization",
    links: [
      {
        label: "My Membership",
        icon: IdCard,
        path: "/dashboard/membership",
      },
      {
        label: "Create Organization",
        icon: Building,
        path: "/dashboard/create-organization",
      },
      {
        label: "Join Organization",
        icon: CirclePlus,
        path: "/dashboard/join-organization",
      },
      {
        label: "All Transactions",
        icon: CreditCard,
        path: "/dashboard/transactions",
      },
    ],
  },
  {
    title: "Communication",
    links: [
      {
        label: "Send Email",
        icon: Mail,
        path: "/dashboard/send-email",
      },
    ],
  },
  {
    title: "Event",
    links: [
      {
        label: "All Events",
        icon: CalendarRange,
        path: "/dashboard/all-events",
      },
      {
        label: "Booked Events",
        icon: CalendarPlus2,
        path: "/dashboard/booked-events",
      },
    ],
  },
  {
    title: "Settings",
    links: [
      {
        label: "Profile Settings",
        icon: UserRoundPen,
        path: "/dashboard/profile-settings",
      },
      {
        label: "Help & Support",
        icon: Headset,
        path: "/dashboard/help-support",
      },
    ],
  },
];

export const employerNavbarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Home",
        icon: Home,
        path: "/dashboard/overview",
      },
      {
        label: "Job Applications",
        icon: Briefcase,
        path: "/dashboard/job-application",
      },
      {
        label: "Post Job",
        icon: SquarePen,
        path: "/dashboard/post-job",
      },
      {
        label: "My Jobs",
        icon: ListChecks,
        path: "/dashboard/my-jobs",
      },
    ],
  },
];

export const apprenticeNavbarLinks = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Home",
        icon: Home,
        path: "/dashboard/overview",
      },
      {
        label: "Browse Jobs",
        icon: Search,
        path: "/dashboard/browse-jobs",
      },
      {
        label: "My Applications",
        icon: FileCheck,
        path: "/dashboard/my-applications",
      },
      {
        label: "Browse Courses",
        icon: Search,
        path: "/dashboard/browse-courses",
      },
      {
        label: "My Courses",
        icon: ListChecks,
        path: "/dashboard/my-courses",
      },
    ],
  },
];

export const recentActivities = [
  {
    id: 1,
    type: "member_joined",
    description: "Jane Doe joined the organization",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "event_created",
    description: "New event 'Charity Run 2025' was created",
    time: "1 day ago",
  },
  {
    id: 3,
    type: "feedback",
    description: "Feedback submitted for 'Health Seminar'",
    time: "3 days ago",
  },
  {
    id: 8,
    type: "member_joined",
    description: "Jane Doe joined the organization",
    time: "2 hours ago",
  },
  {
    id: 7,
    type: "event_created",
    description: "New event 'Charity Run 2025' was created",
    time: "1 day ago",
  },
  {
    id: 6,
    type: "feedback",
    description: "Feedback submitted for 'Health Seminar'",
    time: "3 days ago",
  },
  {
    id: 9,
    type: "feedback",
    description: "Feedback submitted for 'Health Seminar'",
    time: "3 days ago",
  },
];
