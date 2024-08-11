import { THEME_MODE } from '../constants';
import { ThemeMode } from '../types';

export const isThemeMode = (val: unknown): val is ThemeMode => THEME_MODE.includes(val as ThemeMode);
