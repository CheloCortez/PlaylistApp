import { Routes } from '@angular/router';
import { PlaylistListComponent } from './playlist-list/playlist-list.component';
import { PlaylistAddComponent } from './playlist-add/playlist-add.component';

export const routes: Routes = [
  { path: '', redirectTo: '/playlists', pathMatch: 'full' },
  { path: 'playlists', component: PlaylistListComponent },
  { path: 'add-playlist', component: PlaylistAddComponent }
];
