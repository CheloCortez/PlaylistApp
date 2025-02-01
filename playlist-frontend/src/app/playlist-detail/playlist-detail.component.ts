import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css']
})
export class PlaylistDetailComponent {
  searchName: string = '';
  playlist: Playlist | null = null;

  constructor(private http: HttpClient) {}

  searchPlaylist() {
    this.http.get<Playlist>(`http://localhost:8080/lists/${this.searchName}`)
      .subscribe({
        next: (response) => {
          this.playlist = response;
        },
        error: (error) => {
          console.error('Erro ao buscar a playlist:', error);
          this.playlist = null;
        }
      });
  }
}
