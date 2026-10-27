// Sidebar items. Icons are the same symbols used in the SkillSwap design.
export const NAV_MAIN = [
  { id: "overview", icon: "⌂", label: "Overview" },
  { id: "profile", icon: "◉", label: "Profile & Skills" },
  { id: "exchange", icon: "⇄", label: "Skill Exchange", badge: 2 },
  { id: "hub", icon: "▤", label: "Knowledge Hub" },
  { id: "wallet", icon: "◈", label: "Wallet" },
  { id: "community", icon: "◎", label: "Community" },
  { id: "leaderboard", icon: "♜", label: "Leaderboard" },
];

export const NAV_SPACE = [
  { id: "messages", icon: "▱", label: "Messages", badge: 3 },
  { id: "ratings", icon: "☆", label: "Ratings & Reviews" },
  { id: "settings", icon: "⚙", label: "Settings" },
];

// Items in the AK profile dropdown.
export const MENU = [
  { id: "profile", icon: "◉", label: "View profile" },
  { id: "wallet", icon: "◈", label: "Wallet" },
  { id: "ratings", icon: "☆", label: "Ratings & Reviews" },
  { id: "settings", icon: "⚙", label: "Settings" },
];

// Default content for every non-Community page. Replace with your own pages.
const page = (label, title, desc, cards) => ({ label, title, desc, cards });
export const PAGES = {
  overview: page("Overview", "Good morning, Aisha", "Your campus community is learning something new today.", [
    ["Sessions completed", "18", "+3 this month"],
    ["Notes shared", "7", "2 approved this week"],
    ["Skills in your orbit", "5", "3 teaching, 2 learning"],
    ["Trust & reputation", "4.9", "from 12 session reviews"],
  ]),
  profile: page("Profile & Skills", "Profile & Skills", "Manage what you teach and what you want to learn.", [
    ["Name", "Aisha K.", "GSFC University"],
    ["Teaching", "3", "skills"],
    ["Learning", "2", "skills"],
  ]),
  exchange: page("Skill Exchange", "Skill Exchange", "Swap skills with students on your campus.", [
    ["Active swaps", "2", "in progress"],
    ["New requests", "1", "waiting for you"],
    ["Sessions completed", "18", "+3 this month"],
  ]),
  hub: page("Knowledge Hub", "Knowledge Hub", "Notes and resources shared by your campus.", [
    ["Notes shared", "7", "2 approved this week"],
    ["Saved resources", "0", "nothing saved yet"],
  ]),
  wallet: page("Wallet", "Wallet", "Your Skill Coins and recent earnings.", [
    ["Skill Coins", "240", "available"],
    ["Earned this month", "+75", "Skill Coins"],
  ]),
  community: { label: "Community" },
  leaderboard: page("Leaderboard", "Leaderboard", "See who is leading your campus.", [
    ["Your rank", "#12", "campus leaderboard"],
    ["Skill Coins", "240", "total"],
  ]),
  messages: page("Messages", "Messages", "Your conversations with other learners.", [["Unread", "3", "new messages"]]),
  ratings: page("Ratings & Reviews", "Ratings & Reviews", "What people say about your sessions.", [
    ["Average rating", "4.9", "out of 5"],
    ["Reviews", "12", "session reviews"],
  ]),
  settings: page("Settings", "Settings", "Account, notifications and privacy.", [
    ["Account", "Aisha K.", "GSFC University"],
    ["Notifications", "On", "default"],
  ]),
};
