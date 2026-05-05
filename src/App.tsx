import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppStateProvider } from "@/state/AppState";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import RestaurantDetails from "./pages/RestaurantDetails";
import Voice from "./pages/Voice";
import Chat from "./pages/Chat";
import Meeting from "./pages/Meeting";
import Lists from "./pages/Lists";
import ListDetail from "./pages/ListDetail";
import GroupVote from "./pages/GroupVote";
import Reserve from "./pages/Reserve";
import MapView from "./pages/MapView";
import Plans from "./pages/Plans";
import PlanDetail from "./pages/PlanDetail";
import NewPlan from "./pages/NewPlan";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppStateProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/restaurant/:id" element={<RestaurantDetails />} />
            <Route path="/voice" element={<Voice />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/meeting/:id" element={<Meeting />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/group-vote" element={<GroupVote />} />
            <Route path="/reserve/:id" element={<Reserve />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppStateProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
