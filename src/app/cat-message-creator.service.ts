import {
  EnvironmentInjector, inject,
  runInInjectionContext
} from '@angular/core';
import { Injectable } from '@angular/core';
import { randCat } from '@ngneat/falso';


@Injectable({
  providedIn: 'root',
})
export class CatMessageCreatorService {
  environmentInjector = inject(EnvironmentInjector);

  createMessage(getMessageCb: () => string) {
    return runInInjectionContext(this.environmentInjector, () => {
      const message = getMessageCb();

      return `${randCat()} is ${message}`;
    });
  }
}
