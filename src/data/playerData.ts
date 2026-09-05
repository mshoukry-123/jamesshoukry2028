export interface VideoClip {
  id: string;
  slug: string;
  n: number;
  title: string;
  category: 'showcase' | 'game' | 'defense' | 'cage' | 'run';
  categoryLabel: string;
  duration: string;
  scoutingNote: string;
  videoSrc: string;
  thumbnailSrc: string;
  width: number;
  height: number;
  vertical: boolean;
}

export interface Metric {
  key: string;
  label: string;
  value: string;
  unit: string;
  /** Who recorded it. Leave undefined until it can be attributed. */
  source?: string;
  /** Event it was recorded at. */
  event?: string;
  /** Date recorded, e.g. "Jul 17, 2026". Undated numbers get discounted by coaches. */
  date?: string;
  method?: string;
  highlight: boolean;
  /** 'primary' gets a headline card; 'secondary' sits in the strip below. */
  tier: 'primary' | 'secondary';
}

export interface Accolade {
  org: string;
  title: string;
  detail?: string;
  date?: string;
  location?: string;
  /** 'played' = attended, 'invited' = invited but did not attend, 'selected' = named to a list */
  status: 'played' | 'invited' | 'selected';
  national?: boolean;
}

export interface Coach {
  role: string;
  name: string;
  organization: string;
  email?: string;
  phone?: string;
}

export interface PlayerProfile {
  name: string;
  gradYear: number;
  classLabel: string;
  primaryPosition: string;
  secondaryPosition?: string;
  positionsDisplay: string;
  positionShort: string;
  school: string;
  location: string;
  batsThrows: string;
  height: string;
  weight: string;
  jerseyNumber?: string;
  travelTeam?: string;
  ncaaId?: string;
  ncaaRegistered: boolean;
  gpa?: string;
  testScore?: string;
  anticipatedMajor?: string;
  email: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  parentEmail?: string;
  instagram: string;
  instagramUrl: string;
  twitter: string;
  twitterUrl: string;
  ncsaUrl: string;
  siteUrl: string;
  bio: string;
  metrics: Metric[];
  accolades: Accolade[];
  schedule: { label: string; date: string; location?: string }[];
  featuredVideo: {
    title: string;
    runtime: string;
    description: string;
    videoSrc: string;
    videoSrcHd?: string;
    thumbnailSrc: string;
    youtubeId?: string;
  };
  academics: {
    school: string;
    location: string;
    program: string;
  };
  coaches: Coach[];
  clips: VideoClip[];
}

/* ---------------------------------------------------------------------------
   TODO(Mike) — fields left undefined on purpose. Nothing here is invented.
   Anything still undefined simply does not render, so the page never shows a
   placeholder or a number that can't be backed up.

     gpa, testScore          academics section
     ncaaId                  NCAA Eligibility Center number
     phone, parent*          direct contact for coaches
     jerseyNumber            used by the film-room marker copy
     metrics[].event/date    each number needs an event + date to survive a
                             coach cross-checking the public PBR listing
     accolades[].status      'played' vs 'invited' — do not guess
     schedule                where a coach can see him play next
     coaches[]               real names + cells, with their permission
--------------------------------------------------------------------------- */

export const playerData: PlayerProfile = {
  name: "James Shoukry",
  gradYear: 2028,
  classLabel: "Class of 2028",
  primaryPosition: "Third Base",
  secondaryPosition: undefined,
  positionsDisplay: "3B",
  positionShort: "3B",
  school: "IMG Academy",
  location: "Bradenton, FL",
  batsThrows: "R/R",
  height: "6'1\"",
  weight: "190 lbs",
  jerseyNumber: undefined,
  travelTeam: "Top Tier Roos American",
  ncaaId: undefined,
  ncaaRegistered: true,
  // 2.8 as of junior year. Deliberately not published: it clears the NCAA core-GPA
  // floor but is not a selling point, and leading with it can screen him out at
  // academically selective programs before a coach watches the film. The page shows
  // NCAA registration and offers the transcript instead. Revisit if it goes above 3.0.
  gpa: undefined,
  testScore: undefined,
  anticipatedMajor: undefined,
  email: "james.shoukry2028@gmail.com",
  phone: undefined,
  parentName: undefined,
  parentPhone: undefined,
  parentEmail: undefined,
  instagram: "@james_shouk",
  instagramUrl: "https://instagram.com/james_shouk",
  twitter: "@james_shouk",
  twitterUrl: "https://x.com/james_shouk",
  ncsaUrl: "https://www.ncsasports.org/baseball-recruiting/florida/bradenton/img-academy-pendleton/james-shoukry",
  siteUrl: "https://jamesshoukry2028.vercel.app",
  bio: "Right-handed hitting third baseman in the Class of 2028 at IMG Academy. Invite-only selections with Prep Baseball Florida, Perfect Game and ProspectWire. Film below is a July 2026 Prep Baseball showcase: batting practice, infield defense at third, and a laser-timed 60.",

  metrics: [
    { key: "exitVelo",  label: "Exit Velocity",  value: "93",  unit: "MPH",
      source: "Prep Baseball", event: "Prep Baseball", date: "Jun 4, 2026", method: "TrackMan",
      highlight: true, tier: "primary" },
    { key: "infieldVelo", label: "Infield Velo", value: "85",  unit: "MPH",
      source: "Prep Baseball", event: "Prep Baseball", date: "Jun 4, 2026", method: undefined,
      highlight: true, tier: "primary" },
    // Right around the D1 corner-infield average. Kept on the page because an
    // absent run time reads worse to a coach than a middling one, but it is not
    // a headline number for a 3B, so it sits in the secondary strip.
    { key: "sixty",     label: "60-Yard Dash",   value: "7.0", unit: "SEC",
      source: "Perfect Game", event: "Perfect Game", date: "Aug 12, 2025", method: "Laser timed",
      highlight: false, tier: "secondary" },
    { key: "frame",     label: "Height / Weight", value: "6'1\"", unit: "190 LBS",
      source: undefined, event: undefined, date: undefined,
      highlight: true, tier: "primary" },
  ],

  // Documented in the family's own records. status must be confirmed before publishing.
  accolades: [
    { org: "Prep Baseball Florida", title: "Preseason All-State",
      detail: "Invite-only. Top high school prospects in Florida.",
      date: "Jan 2026", location: "Florida", status: "invited" },
    { org: "Prep Baseball Florida", title: "Top Prospect Games — West Florida",
      detail: "Invite-only. Top 2026-2029 grads in the state.",
      date: "Jun 23, 2026", location: "Bradenton, FL", status: "invited" },
    { org: "Perfect Game", title: "Southeast HS All-State Games",
      detail: "Invite-only.",
      date: "Aug 8-9, 2026", location: "East Cobb Complex, Marietta, GA", status: "invited", national: true },
    { org: "ProspectWire", title: "All-American Weekend",
      detail: "Selected for the 2026 All-American Game.",
      date: "Aug 6-9, 2026", location: "University of Tennessee", status: "invited", national: true },
  ],

  schedule: [],

  featuredVideo: {
    title: "James Shoukry | 2028 3B | Recruiting Film",
    runtime: "1:11",
    description: "Opens with live game at-bats, including a double and the slide into second. Then July 2026 Prep Baseball showcase film: batting practice, eight infield reps at third, and a laser-timed 60. Natural field audio, no music, no overlays.",
    videoSrc: "/videos/highlight_reel_v15_720.mp4",
    videoSrcHd: "/videos/highlight_reel_v15.mp4",
    thumbnailSrc: "/thumbnails/reel_poster.jpg",
    youtubeId: "",
  },

  academics: {
    school: "IMG Academy",
    location: "Bradenton, FL",
    program: "High School Baseball Student-Athlete Program",
  },

  coaches: [
    { role: "Player", name: "James Shoukry", organization: "Class of 2028 Student-Athlete",
      email: "james.shoukry2028@gmail.com" },
  ],

  clips: [
  {
    id: "game_ab_4",
    slug: "game-ab-4",
    n: 1,
    title: "In-Game At-Bat - Hard Contact, Runs It Out",
    category: "game",
    categoryLabel: "IN GAME",
    duration: "0:07",
    scoutingNote: "Live game at-bat. Barrel gets to the ball and he is out of the box immediately, all the way through the bag.",
    videoSrc: "/videos/game_ab_4.mp4",
    thumbnailSrc: "/thumbnails/game_ab_4.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "game_ab_2",
    slug: "game-ab-2",
    n: 2,
    title: "In-Game At-Bat - Base Hit, Out of the Box",
    category: "game",
    categoryLabel: "IN GAME",
    duration: "0:06",
    scoutingNote: "Live at-bat at IMG. Barrel stays through the ball and he runs every step of it out of the box.",
    videoSrc: "/videos/game_ab_2.mp4",
    thumbnailSrc: "/thumbnails/game_ab_2.jpg",
    width: 404, height: 720, vertical: true,
  },
  {
    id: "game_ab_3",
    slug: "game-ab-3",
    n: 3,
    title: "In-Game At-Bat - Double, Slide Into Second",
    category: "game",
    categoryLabel: "IN GAME",
    duration: "0:10",
    scoutingNote: "Drives the ball, reads it off the bat and keeps running. First step through the slide, all on one camera.",
    videoSrc: "/videos/game_ab_3.mp4",
    thumbnailSrc: "/thumbnails/game_ab_3.jpg",
    width: 404, height: 720, vertical: true,
  },
  {
    id: "game_ab_5",
    slug: "game-ab-5",
    n: 4,
    title: "In-Game At-Bat - Behind the Plate",
    category: "game",
    categoryLabel: "IN GAME",
    duration: "0:06",
    scoutingNote: "Straight-on angle from behind the plate. Clean look at pitch recognition and hand path through the zone.",
    videoSrc: "/videos/game_ab_5.mp4",
    thumbnailSrc: "/thumbnails/game_ab_5.jpg",
    width: 1280, height: 720, vertical: false,
  },
  {
    id: "game_ab_1",
    slug: "game-ab-1",
    n: 5,
    title: "In-Game At-Bat - Travel Circuit",
    category: "game",
    categoryLabel: "IN GAME",
    duration: "0:05",
    scoutingNote: "Live at-bat against travel-circuit pitching, close camera angle on the swing.",
    videoSrc: "/videos/game_ab_1.mp4",
    thumbnailSrc: "/thumbnails/game_ab_1.jpg",
    width: 1280, height: 720, vertical: false,
  },
  {
    id: "hit_show_1",
    slug: "hit-show-1",
    n: 6,
    title: "Showcase BP - Side Angle Load & Launch",
    category: "showcase",
    categoryLabel: "SHOWCASE BP",
    duration: "0:03",
    scoutingNote: "Third-base-side angle. Balanced negative move, connected rotation, high two-handed finish.",
    videoSrc: "/videos/hit_show_1.mp4",
    thumbnailSrc: "/thumbnails/hit_show_1.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "hit_show_2",
    slug: "hit-show-2",
    n: 7,
    title: "Showcase BP - Repeatable Bat Path",
    category: "showcase",
    categoryLabel: "SHOWCASE BP",
    duration: "0:02",
    scoutingNote: "Same setup, same finish. Repeatability is the point: the swing does not change shape pitch to pitch.",
    videoSrc: "/videos/hit_show_2.mp4",
    thumbnailSrc: "/thumbnails/hit_show_2.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "hit_show_3",
    slug: "hit-show-3",
    n: 8,
    title: "Showcase BP - Hip-Shoulder Separation",
    category: "showcase",
    categoryLabel: "SHOWCASE BP",
    duration: "0:03",
    scoutingNote: "Lower half opens ahead of the barrel. Firm front side at contact.",
    videoSrc: "/videos/hit_show_3.mp4",
    thumbnailSrc: "/thumbnails/hit_show_3.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "hit_show_4",
    slug: "hit-show-4",
    n: 9,
    title: "Showcase BP - Extension Through Contact",
    category: "showcase",
    categoryLabel: "SHOWCASE BP",
    duration: "0:03",
    scoutingNote: "Full extension out front, head still behind the barrel, balanced finish.",
    videoSrc: "/videos/hit_show_4.mp4",
    thumbnailSrc: "/thumbnails/hit_show_4.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_show_1",
    slug: "def-show-1",
    n: 10,
    title: "3B Defense - Set, Field, Throw",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:03",
    scoutingNote: "Pre-pitch move into a fielding position, works through the baseball, on-line throw across the diamond.",
    videoSrc: "/videos/def_show_1.mp4",
    thumbnailSrc: "/thumbnails/def_show_1.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_show_2",
    slug: "def-show-2",
    n: 11,
    title: "3B Defense - Footwork Into the Throw",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:03",
    scoutingNote: "Clean funnel to the middle, feet get around the ball, transfer is quick and repeatable.",
    videoSrc: "/videos/def_show_2.mp4",
    thumbnailSrc: "/thumbnails/def_show_2.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_show_3",
    slug: "def-show-3",
    n: 12,
    title: "3B Defense - Range to the Glove Side",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:03",
    scoutingNote: "Lateral move to his left, keeps the glove out front, gets his body behind the throw.",
    videoSrc: "/videos/def_show_3.mp4",
    thumbnailSrc: "/thumbnails/def_show_3.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_show_4",
    slug: "def-show-4",
    n: 13,
    title: "3B Defense - Short Hop & Quick Release",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:03",
    scoutingNote: "Handles the in-between hop and gets rid of it without resetting.",
    videoSrc: "/videos/def_show_4.mp4",
    thumbnailSrc: "/thumbnails/def_show_4.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_show_5",
    slug: "def-show-5",
    n: 14,
    title: "3B Defense - Charge & Throw on the Move",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:04",
    scoutingNote: "Comes in on the baseball and throws through the play rather than gathering.",
    videoSrc: "/videos/def_show_5.mp4",
    thumbnailSrc: "/thumbnails/def_show_5.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_show_6",
    slug: "def-show-6",
    n: 15,
    title: "3B Defense - Backhand Side",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:04",
    scoutingNote: "Works to the backhand, stays low, keeps the throwing lane open.",
    videoSrc: "/videos/def_show_6.mp4",
    thumbnailSrc: "/thumbnails/def_show_6.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_show_7",
    slug: "def-show-7",
    n: 16,
    title: "3B Defense - Deep Behind the Bag",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:04",
    scoutingNote: "Fields it deep and still has the arm to finish the play across the diamond.",
    videoSrc: "/videos/def_show_7.mp4",
    thumbnailSrc: "/thumbnails/def_show_7.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_wide_1",
    slug: "def-wide-1",
    n: 17,
    title: "3B Defense - Full-Field Angle",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:04",
    scoutingNote: "Wider angle showing the actual distance on the throw and the arm playing at 3B depth.",
    videoSrc: "/videos/def_wide_1.mp4",
    thumbnailSrc: "/thumbnails/def_wide_1.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_wide_2",
    slug: "def-wide-2",
    n: 18,
    title: "3B Defense - Range and Finish",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:03",
    scoutingNote: "Full-field angle on a ball to his side, through the throw and the follow-through.",
    videoSrc: "/videos/def_wide_2.mp4",
    thumbnailSrc: "/thumbnails/def_wide_2.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "def_wide_3",
    slug: "def-wide-3",
    n: 19,
    title: "3B Defense - Slow Roller, Bare Hand Ready",
    category: "defense",
    categoryLabel: "3B DEFENSE",
    duration: "0:03",
    scoutingNote: "Charges the slow roller under control and finishes the play moving forward.",
    videoSrc: "/videos/def_wide_3.mp4",
    thumbnailSrc: "/thumbnails/def_wide_3.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  {
    id: "run_60_1",
    slug: "run-60-1",
    n: 20,
    title: "60-Yard Dash - Laser Timed",
    category: "run",
    categoryLabel: "RUN",
    duration: "0:02",
    scoutingNote: "Laser-timed 60 at the Prep Baseball showcase. Clean acceleration through the gate.",
    videoSrc: "/videos/run_60_1.mp4",
    thumbnailSrc: "/thumbnails/run_60_1.jpg",
    width: 1920, height: 1080, vertical: false,
  },
  ],
};

export const clipBySlug = (slug: string) =>
  playerData.clips.find((c) => c.slug === slug);

export const clipCounts = () => {
  const c = playerData.clips;
  return {
    all: c.length,
    showcase: c.filter((x) => x.category === 'showcase').length,
    game: c.filter((x) => x.category === 'game' || x.category === 'cage').length,
    defense: c.filter((x) => x.category === 'defense').length,
    run: c.filter((x) => x.category === 'run').length,
  };
};
