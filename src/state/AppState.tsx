import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type Mode = "quick" | "explore";

export type Meeting = {
  id: string;
  title: string;
  with: string;
  type: "professional" | "casual";
  startsInMin: number;
  location: string;
};

export type ListItem = {
  id: string;
  name: string;
  emoji: string;
  count: number;
  shared: boolean;
};

export type Badge = {
  id: string;
  name: string;
  emoji: string;
  earned: boolean;
};

export type Memory = {
  prefersQuiet: boolean;
  morningHabit: string;
  recentMoods: string[];
  lastVisited: string[];
  defaultPeople: number;
  prefersSeating: "indoor" | "outdoor";
};

type AppCtx = {
  mode: Mode;
  setMode: (m: Mode) => void;

  saved: string[];
  toggleSaved: (id: string) => void;

  memory: Memory;
  pushMood: (m: string) => void;

  meetings: Meeting[];
  level: { name: string; xp: number; nextXp: number; tier: string };
  streakDays: number;
  badges: Badge[];

  lists: ListItem[];
  addList: (name: string, emoji: string) => void;

  groupVote: { restaurantId: string; votes: number; voter: string }[];
  vote: (restaurantId: string, voter: string) => void;
};

const AppContext = createContext<AppCtx | null>(null);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("quick");
  const [saved, setSaved] = useState<string[]>(["dar-el-marsa", "the-cliff"]);
  const [memory, setMemory] = useState<Memory>({
    prefersQuiet: true,
    morningHabit: "Espresso · Tuesdays at 9:15",
    recentMoods: ["focused", "calm"],
    lastVisited: ["cafe-culture", "el-ali"],
    defaultPeople: 2,
    prefersSeating: "indoor",
  });

  const [meetings] = useState<Meeting[]>([
    {
      id: "m1",
      title: "Coffee with Yasmine",
      with: "Yasmine K.",
      type: "casual",
      startsInMin: 55,
      location: "Les Berges du Lac",
    },
    {
      id: "m2",
      title: "Client review · Orange",
      with: "Mehdi B.",
      type: "professional",
      startsInMin: 240,
      location: "Centre Urbain Nord",
    },
  ]);

  const [lists, setLists] = useState<ListItem[]>([
    { id: "l1", name: "Date spots", emoji: "🌹", count: 6, shared: true },
    { id: "l2", name: "Weekend cafés", emoji: "☕", count: 9, shared: false },
    { id: "l3", name: "Work nomad", emoji: "💻", count: 4, shared: true },
  ]);

  const [groupVote, setGroupVote] = useState([
    { restaurantId: "the-cliff", votes: 3, voter: "Group" },
    { restaurantId: "dar-el-marsa", votes: 2, voter: "Group" },
    { restaurantId: "le-golfe", votes: 1, voter: "Group" },
  ]);

  const value = useMemo<AppCtx>(
    () => ({
      mode,
      setMode,
      saved,
      toggleSaved: (id) =>
        setSaved((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
      memory,
      pushMood: (m) =>
        setMemory((prev) => ({ ...prev, recentMoods: [m, ...prev.recentMoods].slice(0, 5) })),
      meetings,
      level: { name: "Connoisseur", xp: 720, nextXp: 1000, tier: "III" },
      streakDays: 4,
      badges: [
        { id: "b1", name: "Coffee Expert", emoji: "☕", earned: true },
        { id: "b2", name: "Date Planner", emoji: "🌹", earned: true },
        { id: "b3", name: "Work Nomad", emoji: "💻", earned: true },
        { id: "b4", name: "Local Ambassador", emoji: "🏆", earned: false },
        { id: "b5", name: "Night Owl", emoji: "🌙", earned: false },
        { id: "b6", name: "Brunch Hunter", emoji: "🥐", earned: true },
      ],
      lists,
      addList: (name, emoji) =>
        setLists((prev) => [
          { id: `l${prev.length + 1}`, name, emoji, count: 0, shared: false },
          ...prev,
        ]),
      groupVote,
      vote: (restaurantId, voter) =>
        setGroupVote((prev) => {
          const exists = prev.find((v) => v.restaurantId === restaurantId);
          if (exists) {
            return prev.map((v) =>
              v.restaurantId === restaurantId ? { ...v, votes: v.votes + 1, voter } : v
            );
          }
          return [...prev, { restaurantId, votes: 1, voter }];
        }),
    }),
    [mode, saved, memory, meetings, lists, groupVote]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppStateProvider");
  return ctx;
};
