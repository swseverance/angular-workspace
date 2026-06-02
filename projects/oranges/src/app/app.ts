import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);

  name = environment.name;
  message = '';

  ngOnInit(): void {
    this.http.get<{ message: string }>('/api').subscribe({
      next: ({ message }) => (this.message = message),
      error: (error) => console.error(error),
    });
  }
}
