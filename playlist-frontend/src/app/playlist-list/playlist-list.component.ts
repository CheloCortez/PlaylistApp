import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../playlist.service';

interface Musica {
  titulo: string;
  artista: string;
  album: string;
  ano: number;
  genero: string;
}

interface Playlist {
  nome: string;
  descricao: string;
  musicas: Musica[];
}

@Component({
  selector: 'app-playlist-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Playlists Criadas</h2>
    <input [(ngModel)]="searchTerm" (input)="filterPlaylists()" placeholder="Pesquisar por nome da playlist">
    
    <div *ngFor="let playlist of filteredPlaylists">
      <div>
        <h4>{{ playlist.nome }} - {{ playlist.descricao }}</h4>
        <ul *ngIf="playlist.musicas && playlist.musicas.length > 0">
          <li *ngFor="let musica of playlist.musicas">
            {{ musica.titulo }} - {{ musica.artista }} ({{ musica.album }}, {{ musica.ano }}, {{ musica.genero }})
          </li>
        </ul>
      </div>
      <button (click)="deletePlaylist(playlist.nome)">Excluir Playlist</button>
    </div>
  `,
  styleUrls: ['./playlist-list.component.css']
})
export class PlaylistListComponent {
  playlists: Playlist[] = [];
  filteredPlaylists: Playlist[] = [];
  searchTerm: string = '';

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getPlaylists().subscribe(data => {
      this.playlists = data;
      this.filteredPlaylists = data; 
    });
  }

  filterPlaylists(): void {
    this.filteredPlaylists = this.playlists.filter(playlist => 
      playlist.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deletePlaylist(name: string): void {
    this.playlistService.deletePlaylist(name).subscribe(() => {
      this.loadPlaylists();
    });
  }
}
