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
  shared: boolean;
  items: string[];
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
  dietary: string[]; // vegan, vegetarian, pescatarian, gluten-free, lactose-free, halal, no-preference
  transport: "car" | "motorbike" | "transit" | "foot" | "other";
};

export type PlanType = "date" | "friends" | "work" | "family";
export type PlanStatus = "voting" | "decided" | "planning";
export type Plan = {
  id: string;
  name: string;
  emoji: string;
  type: PlanType;
  status: PlanStatus;
  participants: string[];
  lastActivity: string;
  endsIn: string;
  candidates: { restaurantId: string; votes: number }[];
  decidedRestaurantId?: string;
};

export type Friend = {
  id: string;
  name: string;
  initial: string;
  status: string;
  location: string;
  sharingLocation: boolean;
  x: number;
  y: number;
};

export type InvitationStatus = "pending" | "accepted" | "declined" | "maybe";
export type Invitation = {
  id: string;
  restaurantId: string;
  fromName: string;
  toFriendIds: string[];
  message?: string;
  when: string;
  direction: "outgoing" | "incoming";
  status: InvitationStatus;
  createdAt: number;
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
  addList: (name: string, emoji: string) => string;
  addToList: (listId: string, restaurantId: string) => void;
  removeFromList: (listId: string, restaurantId: string) => void;

  plans: Plan[];
  createPlan: (p: Omit<Plan, "id" | "lastActivity" | "endsIn" | "candidates" | "status">) => string;
  votePlan: (planId: string, restaurantId: string) => void;
  groupVote: { restaurantId: string; votes: number; voter: string }[];
  vote: (restaurantId: string, voter: string) => void;

  // Friends + privacy
  friends: Friend[];
  toggleFriendSharing: (id: string) => void;
  locationSharing: boolean;
  setLocationSharing: (v: boolean) => void;

  // Invitations
  invitations: Invitation[];
  sendInvitation: (i: Omit<Invitation, "id" | "direction" | "status" | "createdAt">) => string;
  respondInvitation: (id: string, status: InvitationStatus) => void;
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
    dietary: ["halal"],
    transport: "car",
  });

  const [meetings] = useState<Meeting[]>([
    { id: "m1", title: "Coffee with Yasmine", with: "Yasmine K.", type: "casual", startsInMin: 55, location: "Les Berges du Lac" },
    { id: "m2", title: "Client review · Orange", with: "Mehdi B.", type: "professional", startsInMin: 240, location: "Centre Urbain Nord" },
  ]);

  const [lists, setLists] = useState<ListItem[]>([
    { id: "l1", name: "Date spots", emoji: "🌹", shared: true, items: ["the-cliff", "dar-zarrouk"] },
    { id: "l2", name: "Weekend cafés", emoji: "☕", shared: false, items: ["cafe-culture", "dar-el-marsa"] },
    { id: "l3", name: "Work nomad", emoji: "💻", shared: true, items: ["cafe-culture"] },
  ]);

  const [plans, setPlans] = useState<Plan[]>([
    { id: "p1", name: "Friday Dinner", emoji: "🍽️", type: "friends", status: "voting",
      participants: ["You", "Yasmine", "Mehdi", "Lina"],
      lastActivity: "Lina voted 12 min ago", endsIn: "ends in 2h",
      candidates: [
        { restaurantId: "the-cliff", votes: 3 },
        { restaurantId: "dar-el-marsa", votes: 2 },
        { restaurantId: "le-golfe", votes: 1 },
      ],
    },
    { id: "p2", name: "Team Lunch", emoji: "💼", type: "work", status: "voting",
      participants: ["You", "Mehdi", "Sofia", "Ali", "Nour"],
      lastActivity: "Sofia added Café Culture", endsIn: "ends Thu 11:00",
      candidates: [
        { restaurantId: "cafe-culture", votes: 4 },
        { restaurantId: "dar-el-marsa", votes: 2 },
      ],
    },
    { id: "p3", name: "Date Night", emoji: "❤️", type: "date", status: "decided",
      participants: ["You", "Salma"],
      lastActivity: "Reserved · 20:30", endsIn: "Saturday",
      candidates: [{ restaurantId: "the-cliff", votes: 2 }],
      decidedRestaurantId: "the-cliff",
    },
    { id: "p4", name: "Weekend Hangout", emoji: "🎉", type: "friends", status: "planning",
      participants: ["You", "Aymen", "Rim"],
      lastActivity: "Aymen suggested La Goulette", endsIn: "Sunday",
      candidates: [{ restaurantId: "le-golfe", votes: 1 }, { restaurantId: "el-ali", votes: 1 }],
    },
  ]);

  const [groupVote, setGroupVote] = useState([
    { restaurantId: "the-cliff", votes: 3, voter: "Group" },
    { restaurantId: "dar-el-marsa", votes: 2, voter: "Group" },
    { restaurantId: "le-golfe", votes: 1, voter: "Group" },
  ]);

  const [friends, setFriends] = useState<Friend[]>([
    { id: "yas", name: "Yasmine",  initial: "Y", status: "Working",  location: "Lac 2",         sharingLocation: true,  x: 28, y: 38 },
    { id: "meh", name: "Mehdi",    initial: "M", status: "At lunch", location: "Centre Urbain", sharingLocation: true,  x: 62, y: 24 },
    { id: "lin", name: "Lina",     initial: "L", status: "Coffee",   location: "La Marsa",      sharingLocation: true,  x: 48, y: 70 },
    { id: "sof", name: "Sofia",    initial: "S", status: "Walking",  location: "Sidi Bou Said", sharingLocation: false, x: 78, y: 58 },
    { id: "aym", name: "Aymen",    initial: "A", status: "Available",location: "Manar",         sharingLocation: false, x: 35, y: 18 },
    { id: "rim", name: "Rim",      initial: "R", status: "Studying", location: "Belvédère",     sharingLocation: true,  x: 70, y: 78 },
    { id: "ali", name: "Ali",      initial: "A", status: "Free now", location: "Lac 1",         sharingLocation: false, x: 20, y: 60 },
    { id: "nou", name: "Nour",     initial: "N", status: "Working",  location: "Centre Urbain", sharingLocation: true,  x: 55, y: 50 },
  ]);

  const [locationSharing, setLocationSharing] = useState<boolean>(true);

  const [invitations, setInvitations] = useState<Invitation[]>([
    { id: "i-in-1", restaurantId: "the-cliff", fromName: "Yasmine", toFriendIds: ["me"], message: "Sunset dinner?", when: "Tonight · 19:30", direction: "incoming", status: "pending", createdAt: Date.now() - 600000 },
    { id: "i-in-2", restaurantId: "cafe-culture", fromName: "Mehdi", toFriendIds: ["me"], message: "Quick coffee before the meeting", when: "Today · 10:30", direction: "incoming", status: "pending", createdAt: Date.now() - 1200000 },
  ]);

  const value = useMemo<AppCtx>(
    () => ({
      mode, setMode,
      saved,
      toggleSaved: (id) => setSaved((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
      memory,
      pushMood: (m) => setMemory((p) => ({ ...p, recentMoods: [m, ...p.recentMoods].slice(0, 5) })),
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
      addList: (name, emoji) => {
        const id = `l${Date.now()}`;
        setLists((p) => [{ id, name, emoji, shared: false, items: [] }, ...p]);
        return id;
      },
      addToList: (listId, rid) =>
        setLists((p) => p.map((l) => (l.id === listId && !l.items.includes(rid) ? { ...l, items: [...l.items, rid] } : l))),
      removeFromList: (listId, rid) =>
        setLists((p) => p.map((l) => (l.id === listId ? { ...l, items: l.items.filter((x) => x !== rid) } : l))),
      plans,
      createPlan: (p) => {
        const id = `p${Date.now()}`;
        setPlans((prev) => [
          { ...p, id, status: "voting", lastActivity: "just created", endsIn: "ends in 24h", candidates: [] },
          ...prev,
        ]);
        return id;
      },
      votePlan: (planId, rid) =>
        setPlans((prev) =>
          prev.map((pl) => {
            if (pl.id !== planId) return pl;
            const exists = pl.candidates.find((c) => c.restaurantId === rid);
            const candidates = exists
              ? pl.candidates.map((c) => (c.restaurantId === rid ? { ...c, votes: c.votes + 1 } : c))
              : [...pl.candidates, { restaurantId: rid, votes: 1 }];
            return { ...pl, candidates, lastActivity: "You voted just now" };
          })
        ),
      groupVote,
      vote: (rid, voter) =>
        setGroupVote((prev) => {
          const e = prev.find((v) => v.restaurantId === rid);
          return e
            ? prev.map((v) => (v.restaurantId === rid ? { ...v, votes: v.votes + 1, voter } : v))
            : [...prev, { restaurantId: rid, votes: 1, voter }];
        }),
      friends,
      toggleFriendSharing: (id) => setFriends((p) => p.map((f) => (f.id === id ? { ...f, sharingLocation: !f.sharingLocation } : f))),
      locationSharing,
      setLocationSharing,
      invitations,
      sendInvitation: (i) => {
        const id = `i-out-${Date.now()}`;
        setInvitations((p) => [{ ...i, id, direction: "outgoing", status: "pending", createdAt: Date.now() }, ...p]);
        return id;
      },
      respondInvitation: (id, status) =>
        setInvitations((p) => p.map((iv) => (iv.id === id ? { ...iv, status } : iv))),
    }),
    [mode, saved, memory, meetings, lists, plans, groupVote, friends, locationSharing, invitations]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppStateProvider");
  return ctx;
};
