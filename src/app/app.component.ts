import {
  Component,
  EnvironmentInjector,
  OnInit,
  inject,
  runInInjectionContext,
} from '@angular/core';
import { messageToken } from './tokens';
import { FormsModule } from '@angular/forms';

function appendMessage(message: string) {
  const messageFromToken = inject(messageToken);

  return `${messageFromToken} | ${message}`;
}

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'how-to-run-code-inside-injection-context-root',
  template: `
    <h1>{{ message }}</h1>

    <input [(ngModel)]="customMessage" />
    <button (click)="changeMessage(customMessage)">Append Custom Message</button>
  `,
})
export class AppComponent implements OnInit {
  environmentInjector = inject(EnvironmentInjector);

  message!: string;

  customMessage!: string;

  ngOnInit(): void {
    runInInjectionContext(this.environmentInjector, () => {
      this.message = inject(messageToken);
    });
  }

  changeMessage(message: string) {
    runInInjectionContext(this.environmentInjector, () => {
      this.message = appendMessage(message);
    });
  }
}
