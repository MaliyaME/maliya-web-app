export const appStoreUrl = "https://apps.apple.com/ae/app/maliya/id6754902365";

export const contact = {
  general: "hello@maliya.me",
  press: "press@maliya.me",
  security: "security@maliya.me",
};

export const highlights = ["No bank login", "No account", "No cloud sync"];

export const supportedBanks = [
  { name: "HSBC", src: "/images/hsbc.svg" },
  { name: "FAB", src: "/images/fab.webp" },
  { name: "ADCB Islamic", src: "/images/adcb.png" },
  { name: "Emirates NBD", src: "/images/enbd.png" },
];

export const androidBetaSteps = [
  {
    title: "Join the beta group",
    description: "Join the Maliya Android beta group on Google Groups.",
    link: { href: "https://groups.google.com/g/maliya-android-beta", label: "Join the group" },
  },
  {
    title: "Become a tester",
    description: "Open the Google Play testing page and choose to become a tester.",
    link: { href: "https://play.google.com/apps/testing/com.maliya", label: "Become a tester" },
  },
  {
    title: "Install from Google Play",
    description: "Follow the Google Play install link shown after you opt in.",
  },
];

export const releases = [
  {
    status: "Closed beta",
    title: "Maliya for Android beta",
    description:
      "Maliya 1.0.5 for Android is in closed beta on Google Play, and the public release is coming soon. As on iPhone, your statements stay on your phone. The three steps to join are in Get the App.",
    tags: ["Android", "Beta"],
  },
  {
    status: "Version 1.0.5",
    title: "Purchase stories and merchant naming",
    description:
      "Open any purchase to see color-coded comparisons, your recent purchases at the same shop, and the card you paid with. Name your biggest unidentified merchants one at a time, with progress, skips, and a way to leave non-business charges alone. Categories and subcategories now compare with your usual in the same way, and password-protected PDFs are easier to unlock.",
    tags: ["New"],
  },
  {
    status: "Version 1.0.4",
    title: "ADCB Islamic statements",
    description:
      "Add ADCB Islamic credit card statements alongside HSBC, FAB, and Emirates NBD. The first screen shows which banks Maliya supports. Optional crash reports and usage analytics stay off unless you turn them on.",
    tags: ["iPhone"],
  },
  {
    status: "Available now",
    title: "Maliya on the App Store",
    description:
      "Maliya is free to download for iPhone. Explore spending from supported credit card statements without a bank login or an app account.",
    tags: ["iPhone", "Free"],
  },
];

export const screenshots = [
  { src: "/images/dashboard-overview.png", dark: "/images/dashboard-overview-dark.png", alt: "Maliya home screen showing September spending, wellness, and monthly trends" },
  { src: "/images/spending-trend.png", dark: "/images/spending-trend-dark.png", alt: "Dining spending story with monthly chart and subcategories" },
  { src: "/images/purchase-story.png", dark: "/images/purchase-story-dark.png", alt: "Purchase story for a Carrefour grocery purchase, with recent purchases at the same shop" },
  { src: "/images/insights-stats.png", dark: "/images/insights-stats-dark.png", alt: "Maliya Ask answer showing where most of September's money went, with follow-up questions" },
  { src: "/images/statements-list.png", dark: "/images/statements-list-dark.png", alt: "Statements grouped by card with monthly coverage" },
  { src: "/images/wellness.png", dark: "/images/wellness-dark.png", alt: "Spending wellness score with its factors" },
];
