export interface VideoClip {
  id: string;
  title: string;
  category: 'highlight' | 'game' | 'defense' | 'showcase';
  categoryLabel: string;
  duration: string;
  description: string;
  scoutingNote: string;
  videoSrc: string; // local preview path
  thumbnailSrc: string; // local thumbnail path
  youtubeId?: string; // YouTube video ID when uploaded
}

export interface PlayerProfile {
  name: string;
  gradYear: number;
  classLabel: string;
  primaryPosition: string;
  secondaryPosition: string;
  positionsDisplay: string;
  school: string;
  location: string;
  batsThrows: string;
  height: string;
  weight: string;
  ncaaId?: string;
  email: string;
  phone?: string;
  instagram: string;
  instagramUrl: string;
  twitter: string;
  twitterUrl: string;
  ncsaUrl: string;
  metrics: {
    exitVelo: { value: string; unit: string; verifiedBy: string; highlight: boolean };
    infieldVelo: { value: string; unit: string; verifiedBy: string; highlight: boolean };
    sixtyYard: { value: string; unit: string; verifiedBy: string; highlight: boolean };
    heightWeight: { value: string; unit: string; verifiedBy: string; highlight: false };
  };
  featuredVideo: {
    title: string;
    runtime: string;
    description: string;
    videoSrc: string;
    thumbnailSrc: string;
    youtubeId?: string;
  };
  academics: {
    school: string;
    location: string;
    program: string;
    gpa?: string;
    anticipatedMajor: string;
  };
  coaches: Array<{
    role: string;
    name: string;
    organization: string;
    email?: string;
    phone?: string;
  }>;
  clips: VideoClip[];
}

export const playerData: PlayerProfile = {
  name: "James Shoukry",
  gradYear: 2028,
  classLabel: "Class of 2028",
  primaryPosition: "3rd",
  secondaryPosition: "SS",
  positionsDisplay: "3rd/SS",
  school: "IMG Academy",
  location: "Bradenton, FL",
  batsThrows: "R/R",
  height: "6'1\"",
  weight: "190 lbs",
  ncaaId: "NCAA Registered & Eligible",
  email: "james.shoukry2028@gmail.com",
  instagram: "@james_shouk",
  instagramUrl: "https://instagram.com/james_shouk",
  twitter: "@james_shouk",
  twitterUrl: "https://x.com/james_shouk",
  ncsaUrl: "https://www.ncsasports.org/baseball-recruiting/florida/bradenton/img-academy-pendleton/james-shoukry",
  metrics: {
    exitVelo: {
      value: "93",
      unit: "MPH",
      verifiedBy: "Prep Baseball / TrackMan",
      highlight: true,
    },
    infieldVelo: {
      value: "85",
      unit: "MPH",
      verifiedBy: "Showcase Verified",
      highlight: true,
    },
    sixtyYard: {
      value: "7.0",
      unit: "SEC",
      verifiedBy: "Laser Timed 60-YD",
      highlight: true,
    },
    heightWeight: {
      value: "6'1\" / 190",
      unit: "LBS",
      verifiedBy: "Verified Physicals",
      highlight: false,
    },
  },
  featuredVideo: {
    title: "James Shoukry | 2028 3rd/SS - Recruiting Highlight Reel",
    runtime: "02:08",
    description: "Unedited on-field contact audio with zero background music. Includes live game at-bats, deep warning track contact, 3B infield glove/arm work, and verified showcase reps.",
    videoSrc: "/videos/highlight_reel_v10.mp4",
    thumbnailSrc: "/thumbnails/hero_frame.jpg",
    youtubeId: "", // Add YouTube ID once uploaded
  },
  academics: {
    school: "IMG Academy",
    location: "Bradenton, FL",
    program: "High School Baseball Student-Athlete Program",
    anticipatedMajor: "Business / Sports Management",
  },
  coaches: [
    {
      role: "IMG Academy Baseball Staff",
      name: "IMG Baseball Coaching Staff",
      organization: "IMG Academy - Bradenton, FL",
      email: "baseball@imgacademy.com",
    },
    {
      role: "Player Contact",
      name: "James Shoukry",
      organization: "Class of 2028 Student-Athlete",
      email: "james.shoukry2028@gmail.com",
    },
  ],
  clips: [
    {
      id: "clip-01",
      title: "Wide-Angle Game Contact & Play Continuation",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:08",
      description: "IMG_4596.mov (00:03.8 - 00:12.1)",
      scoutingNote: "Balanced, level swing from the right side. Drives ball with authority into the outfield with immediate hustle out of the box.",
      videoSrc: "/videos/clip_01.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_01.jpg",
    },
    {
      id: "clip-02",
      title: "Deep Game Drive to Outfield Warning Track",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:13",
      description: "18085540562599309.mp4 (00:00.4 - 00:13.3)",
      scoutingNote: "Heavy barrel contact with camera follow tracking deep flight toward the outfield fence.",
      videoSrc: "/videos/clip_02.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_02.jpg",
    },
    {
      id: "clip-03",
      title: "Overhead Press-Box Angle - Game Barrel Path",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:13",
      description: "17906064504124687.mp4 (00:26.5 - 00:39.5)",
      scoutingNote: "Overhead high-home angle showing swing path through the zone, staying inside the baseball, and solid launch angle.",
      videoSrc: "/videos/clip_03.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_03.jpg",
    },
    {
      id: "clip-04",
      title: "Behind-the-Pitcher Game At-Bat",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:07",
      description: "17906064504124687.mp4 (00:02.1 - 00:09.1)",
      scoutingNote: "Clear behind-the-pitcher perspective. Recognizes pitch early, drives the ball back through the middle.",
      videoSrc: "/videos/clip_04.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_04.jpg",
    },
    {
      id: "clip-05",
      title: "Compact Swing - Gap Contact",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:05",
      description: "17880009402409506.mp4 (00:12.4 - 00:17.4)",
      scoutingNote: "Compact, efficient hand path. Quick trigger and hard contact with ball in play.",
      videoSrc: "/videos/clip_05.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_05.jpg",
    },
    {
      id: "clip-06",
      title: "3B Dugout Angle - Game-Speed Swing",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:06",
      description: "18000335864949811.mp4 (00:09.2 - 00:15.4)",
      scoutingNote: "Game-speed swing mechanics from the third-base side with strong lower-half rotation.",
      videoSrc: "/videos/clip_06.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_06.jpg",
    },
    {
      id: "clip-07",
      title: "Close Pitcher Angle - Point of Contact",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:04",
      description: "17873227215657938.mp4 (00:01.7 - 00:06.1)",
      scoutingNote: "Close centerfield shot showing barrel meeting baseball cleanly out in front.",
      videoSrc: "/videos/clip_07.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_07.jpg",
    },
    {
      id: "clip-08",
      title: "In-Game At-Bat & Hit",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:06",
      description: "18096992801078528.mp4 (00:00.0 - 00:06.0)",
      scoutingNote: "Game swing with ball immediately put into play with good jump off the bat.",
      videoSrc: "/videos/clip_08.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_08.jpg",
    },
    {
      id: "clip-09",
      title: "Side Angle Game Contact",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:05",
      description: "17943908673140282.mp4 (00:00.7 - 00:05.7)",
      scoutingNote: "Side-view game cut showcasing rhythmic load and explosive hip drive.",
      videoSrc: "/videos/clip_09.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_09.jpg",
    },
    {
      id: "clip-10",
      title: "Quick Hands - Inside Pitch",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:06",
      description: "17880447273470054.mp4 (00:15.5 - 00:21.3)",
      scoutingNote: "Turns tightly on an inner-third pitch. Pure bat speed and barrel control.",
      videoSrc: "/videos/clip_10.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_10.jpg",
    },
    {
      id: "clip-11",
      title: "3B-Side Angle - Swing to First Base",
      category: "game",
      categoryLabel: "Game Contact",
      duration: "0:07",
      description: "17906064504124687.mp4 (00:46.0 - 00:53.0)",
      scoutingNote: "Clean finish and immediate acceleration sprinting down the line.",
      videoSrc: "/videos/clip_11.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_11.jpg",
    },
    {
      id: "clip-12",
      title: "Infield Defense - 3B Ground Ball & Cross-Diamond Throw",
      category: "defense",
      categoryLabel: "Infield Defense",
      duration: "0:09",
      description: "17927182782121056.mp4 (00:05.6 - 00:14.2)",
      scoutingNote: "Glove presentation at third base, secure fielding through the ball, and strong on-target throw across the diamond.",
      videoSrc: "/videos/clip_12.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_12.jpg",
    },
    {
      id: "clip-13",
      title: "Infield Defense - Range & Throw",
      category: "defense",
      categoryLabel: "Infield Defense",
      duration: "0:05",
      description: "17928867402210409.mp4 (00:00.0 - 00:05.1)",
      scoutingNote: "Lateral range to the glove side, quick clean transfer, and smooth arm stroke.",
      videoSrc: "/videos/clip_13.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_13.jpg",
    },
    {
      id: "clip-14",
      title: "Showcase BP - Side Angle Mechanics",
      category: "showcase",
      categoryLabel: "Showcase / BP",
      duration: "0:03",
      description: "James_Shoukry_-__07_17_2026_.mp4 (00:10.0 - 00:13.1)",
      scoutingNote: "Prep Baseball showcase cut. Clean negative move/load, connected rotational sequence, high two-handed finish.",
      videoSrc: "/videos/clip_14.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_14.jpg",
    },
    {
      id: "clip-15",
      title: "Showcase BP - Repeatable Bat Path",
      category: "showcase",
      categoryLabel: "Showcase / BP",
      duration: "0:03",
      description: "James_Shoukry_-__07_17_2026_.mp4 (00:15.7 - 00:18.7)",
      scoutingNote: "Second showcase swing repetition. Flat bat path through hitting zone creating backspin.",
      videoSrc: "/videos/clip_15.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_15.jpg",
    },
    {
      id: "clip-16",
      title: "Showcase Infield Rep - 85 MPH Arm Velo",
      category: "defense",
      categoryLabel: "Infield Defense",
      duration: "0:04",
      description: "James_Shoukry_-__07_17_2026_.mp4 (00:34.3 - 00:38.3)",
      scoutingNote: "Showcase defensive repetition. Soft hands, quick exchange, effortless 85 MPH throw across the infield.",
      videoSrc: "/videos/clip_16.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_16.jpg",
    },
    {
      id: "clip-17",
      title: "Cage Work - Extension & Separation",
      category: "showcase",
      categoryLabel: "Showcase / BP",
      duration: "0:03",
      description: "18332773384229592.mp4 (00:00.0 - 00:02.6)",
      scoutingNote: "Close-up cage swing highlighting hip-shoulder separation and full extension through contact.",
      videoSrc: "/videos/clip_17.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_17.jpg",
    },
    {
      id: "clip-18",
      title: "Cage Work - Hand Speed & Barrel Action",
      category: "showcase",
      categoryLabel: "Showcase / BP",
      duration: "0:03",
      description: "18332773384229592.mp4 (00:05.4 - 00:07.9)",
      scoutingNote: "Fast hands through the zone generating verified 93 MPH exit velocity.",
      videoSrc: "/videos/clip_18.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_18.jpg",
    },
    {
      id: "clip-19",
      title: "Cage Work - Lower Half Anchor",
      category: "showcase",
      categoryLabel: "Showcase / BP",
      duration: "0:03",
      description: "18332773384229592.mp4 (00:10.6 - 00:13.3)",
      scoutingNote: "Strong base, firm front leg block, head remains still behind the barrel.",
      videoSrc: "/videos/clip_19.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_19.jpg",
    },
    {
      id: "clip-20",
      title: "Cage Work - High Finish Mechanics",
      category: "showcase",
      categoryLabel: "Showcase / BP",
      duration: "0:04",
      description: "18332773384229592.mp4 (00:15.0 - 00:18.7)",
      scoutingNote: "Consistent barrel delivery and balanced posture throughout swing completion.",
      videoSrc: "/videos/clip_20.mp4",
      thumbnailSrc: "/thumbnails/selected_v10_20.jpg",
    },
  ],
};
