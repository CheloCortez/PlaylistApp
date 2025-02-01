package com.spotify.playlistapi.controller;

import com.spotify.playlistapi.model.Playlist;
import com.spotify.playlistapi.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequestMapping("/lists")
public class PlaylistController {

    private final PlaylistService playlistService;

    @Autowired
    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @PostMapping
    public ResponseEntity<?> criarPlaylist(@RequestBody Playlist playlist) throws URISyntaxException {
        if (playlist.getNome() == null || playlist.getNome().isEmpty()) {
            return ResponseEntity.badRequest().body("O nome da playlist não pode ser nulo ou vazio.");
        }
        try {
            Playlist novaPlaylist = playlistService.criarPlaylist(playlist);
            String encodedNome = URLEncoder.encode(novaPlaylist.getNome(), StandardCharsets.UTF_8.toString());
            return ResponseEntity
                    .created(new URI("/lists/" + encodedNome))
                    .body(novaPlaylist);
        } catch (Exception e) {
            System.err.println("Erro ao criar a playlist: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar a playlist.");
        
        }
    }

    @GetMapping
    public ResponseEntity<List<Playlist>> listarPlaylists() {
        List<Playlist> playlists = playlistService.listarPlaylists();
        return ResponseEntity.ok(playlists);
    }

    @GetMapping("/{nome}")
    public ResponseEntity<?> getPlaylist(@PathVariable String nome) {
        try {
            Playlist playlist = playlistService.buscarPlaylist(nome);
            return ResponseEntity.ok(playlist);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Playlist não encontrada.");
        }
    }

    @DeleteMapping("/{nome}")
    public ResponseEntity<Void> deletarPlaylist(@PathVariable String nome) {
        try {
            playlistService.deletarPlaylist(nome);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
