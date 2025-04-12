'use client';

import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Moon, Sun, Palette, Sparkles, Apple, Layers, Minimize, Settings } from 'lucide-react';

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  const themeIcons = {
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />,
    material: <Layers className="h-4 w-4 text-blue-500" />,
    cupertino: <Apple className="h-4 w-4 text-gray-500" />,
    synthwave: <Sparkles className="h-4 w-4 text-purple-500" />,
    minimal: <Minimize className="h-4 w-4 text-gray-500" />,
    custom: <Palette className="h-4 w-4 text-orange-500" />
  };

  const themeNames = {
    light: 'Claro',
    dark: 'Escuro',
    material: 'Material Design',
    cupertino: 'Cupertino (iOS)',
    synthwave: 'Synthwave',
    minimal: 'Minimalista',
    custom: 'Personalizado'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {themeIcons[theme]}
          <span className="sr-only">Alternar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem key={t} onClick={() => setTheme(t)} className={theme === t ? 'bg-muted' : ''}>
            <span className="mr-2">{themeIcons[t]}</span>
            {themeNames[t]}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => document.querySelector('[data-value="theme-customizer"]')?.click()}>
          <Settings className="mr-2 h-4 w-4" />
          Personalizar tema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
