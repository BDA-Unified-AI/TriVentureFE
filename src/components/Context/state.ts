import { create } from "zustand";

// Define the state shape and actions
type userInfo = {
  id: string;
  email: string;
  name: string;
  role: string;
  picture: string;
  contact_number: string;
  bank_number: string;
};

interface AppState {
  isLogin: boolean;
  setIslogin: (isLogin: boolean) => void;
  userInfo: userInfo | null;
  setUserInfo: (userInfo: userInfo | null) => void;
  language: string;
  setLanguage: (language: string) => void;
  intent: string | null;
  setIntent: (intent: string | null) => void;
  location: { lat: number; long: number } | null;
  setLocation: (location: { lat: number; long: number }) => void;
  listSessionHistory: string[];
  setListSessionHistory: (listSessionHistory: string[]) => void;
  chatPage: boolean;
  setChatPage: (chatPage: boolean) => void;
}

const useAppState = create<AppState>((set) => ({
  isLogin: false,
  setIslogin: (isLogin) => set({ isLogin }),
  userInfo: null,
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
  language: "Vietnamese",
  setLanguage: (language) => set({ language }),
  intent: null,
  setIntent: (intent) => set({ intent }),
  location: null,
  setLocation: (location) => set({ location }),
  listSessionHistory: [],
  setListSessionHistory: (listSessionHistory) => set({ listSessionHistory }),
  chatPage: false,
  setChatPage: (chatPage) => set({ chatPage }),
}));

export default useAppState;
