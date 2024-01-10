import { InjectionToken } from "@angular/core";

export const GREETINGS_TOKEN = new InjectionToken('GREETINGS_TOKEN', { factory: () => 'Hey Code Dimension!' });

export const CAT_FEATURE = new InjectionToken('CAT_FEATURE', { factory: () => 'Cute <3' });