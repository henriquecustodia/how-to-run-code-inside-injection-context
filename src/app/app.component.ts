import {
  Component,
  EnvironmentInjector,
  OnInit,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { CAT_FEATURE, GREETINGS_TOKEN } from './tokens';
import { FormsModule } from '@angular/forms';

function appendMessage(message: string) {
  const messageFromToken = inject(GREETINGS_TOKEN);

  return `${messageFromToken} | ${message}`;
}

import { CatMessageCreatorService } from './cat-message-creator.service';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'how-to-run-code-inside-injection-context-root',
  template: `
    <h1>{{ message }}</h1>

    <input [(ngModel)]="customMessage" />
    <button (click)="changeMessage(customMessage)">
      Append Custom Message
    </button>

    <h1>{{ catMessage }}</h1>
    
  `,
})
export class AppComponent implements OnInit {
  environmentInjector = inject(EnvironmentInjector);

  catMessageCreatorService = inject(CatMessageCreatorService);

  message!: string;

  customMessage!: string;

  catMessage!: string

  ngOnInit(): void {
    // exemplo 1
    runInInjectionContext(this.environmentInjector, () => {
      this.message = inject(GREETINGS_TOKEN);
    });

    // exemplo 3
    this.catMessage = this.catMessageCreatorService.createMessage(() => {
      const message = inject(CAT_FEATURE);
      return message;
    });
  }

  changeMessage(message: string) {
    // exemplo 2
    runInInjectionContext(this.environmentInjector, () => {
      this.message = appendMessage(message);
    });
  }
}
