import { Component } from '@angular/core';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistAddComponent } from './playlist-add/playlist-add.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PlaylistListComponent,
    PlaylistAddComponent
  ],
  template: `
    <app-playlist-list></app-playlist-list>
    <app-playlist-add></app-playlist-add>
  `
})
export class AppComponent {}
