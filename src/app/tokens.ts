import { InjectionToken } from "@angular/core";

export const messageToken = new InjectionToken('messageToken', { factory: () => 'Hey Code Dimension!' });