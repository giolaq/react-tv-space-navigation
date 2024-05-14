import {
  CircleUser,
  Grid3X3,
  Home,
  LayoutDashboard,
  LayoutGrid,
  Timer,
  Settings,
  Play,
} from 'lucide-react-native';

export const iconsCatalog = {
  Home: Home,
  Grid3X3: Grid3X3,
  LayoutGrid: LayoutGrid,
  LayoutDashboard: LayoutDashboard,
  Timer: Timer,
  CircleUser: CircleUser,
  Settings: Settings,
  Play: Play,
};

export type IconName = keyof typeof iconsCatalog;
