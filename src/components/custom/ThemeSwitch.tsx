'use client';

import { MdNightlight, MdOutlineLightMode } from 'react-icons/md';

import useTheme from '@/hooks/useTheme';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Switch
        id="theme-switch"
        checked={theme === 'dark'}
        onCheckedChange={toggleTheme}
      />
      <Label htmlFor="theme-switch" className="cursor-pointer">
        {theme === 'dark' ? (
          <MdNightlight className="size-5 -rotate-45" />
        ) : (
          <MdOutlineLightMode className="size-5" />
        )}
      </Label>
    </div>
  );
};

export default ThemeSwitch;
