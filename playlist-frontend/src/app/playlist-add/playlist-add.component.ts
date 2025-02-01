import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  mostrarMusicas: boolean;
}

@Component({
  selector: 'app-playlist-add',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="container">
      <h2>Adicionar Playlist</h2>
      <div class="input-group">
        <label>Nome:</label>
        <input [(ngModel)]="playlistNome" placeholder="Nome da Playlist">
      </div>
      <div class="input-group">
        <label>Descrição:</label>
        <input [(ngModel)]="playlistDescricao" placeholder="Descrição da Playlist">
      </div>
      <button class="btn" (click)="iniciarPlaylist()">Adicionar</button>

      <div *ngIf="playlistIniciada" class="music-section">
        <h3>Adicionar Música</h3>
        <div class="input-group">
          <label>Título:</label>
          <input [(ngModel)]="novaMusica.titulo" placeholder="Título">
        </div>
        <div class="input-group">
          <label>Artista:</label>
          <input [(ngModel)]="novaMusica.artista" placeholder="Artista">
        </div>
        <div class="input-group">
          <label>Álbum:</label>
          <input [(ngModel)]="novaMusica.album" placeholder="Álbum">
        </div>
        <div class="input-group">
          <label>Ano:</label>
          <input [(ngModel)]="novaMusica.ano" type="number" placeholder="Ano" min="1900" max="2100" required>
        </div>
        <div class="input-group">
          <label>Gênero:</label>
          <input [(ngModel)]="novaMusica.genero" placeholder="Gênero">
        </div>
        <button class="btn" (click)="adicionarMusica()">Adicionar Música</button>
        <button class="btn" (click)="finalizarPlaylist()">Finalizar Playlist</button>
      </div>

      <div *ngIf="musicas.length > 0">
        <h3>Músicas Adicionadas</h3>
        <ul>
          <li *ngFor="let musica of musicas">
            {{ musica.titulo }} - {{ musica.artista }} ({{ musica.album }}, {{ musica.ano }}, {{ musica.genero }})
          </li>
        </ul>
      </div>

      <div *ngIf="playlists.length > 0">
        <h3>Playlists Salvas</h3>
        <div *ngFor="let playlist of playlists">
          <h4 (click)="playlist.mostrarMusicas = !playlist.mostrarMusicas">
            {{ playlist.nome }} - {{ playlist.descricao }}
          </h4>
          <ul *ngIf="playlist.mostrarMusicas">
            <li *ngFor="let musica of playlist.musicas">
              {{ musica.titulo }} - {{ musica.artista }} ({{ musica.album }}, {{ musica.ano }}, {{ musica.genero }})
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./playlist-add.component.css'] // Referência ao CSS separado
})
export class PlaylistAddComponent {
  playlistNome: string = '';
  playlistDescricao: string = '';
  playlistIniciada: boolean = false;
  novaMusica: Musica = { titulo: '', artista: '', album: '', ano: 0, genero: '' };
  musicas: Musica[] = [];
  playlists: Playlist[] = []; 

  constructor(private http: HttpClient) {}

  iniciarPlaylist() {
    this.playlistIniciada = true;
  }

  adicionarMusica() {
    if (this.novaMusica.titulo && this.novaMusica.artista) {
      this.musicas.push({ ...this.novaMusica });
      this.novaMusica = { titulo: '', artista: '', album: '', ano: 0, genero: '' }; 
    }
  }

  finalizarPlaylist() {
    const playlistData = {
      nome: this.playlistNome,
      descricao: this.playlistDescricao,
      musicas: this.musicas 
    };

    const username = 'user'; // seu usuário
    const password = 'password'; // sua senha
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
    });

    this.http.post('http://localhost:8080/lists', playlistData, { headers })
      .subscribe({
        next: (response) => {
          console.log('Playlist salva com sucesso:', response);
          this.playlists.push({ 
            nome: this.playlistNome, 
            descricao: this.playlistDescricao, 
            musicas: this.musicas, 
            mostrarMusicas: false 
          });

          this.playlistNome = '';
          this.playlistDescricao = '';
          this.musicas = [];
          this.playlistIniciada = false;
        },
        error: (error) => {
          console.error('Erro ao salvar a playlist:', error);
        }
      });
  }
}
