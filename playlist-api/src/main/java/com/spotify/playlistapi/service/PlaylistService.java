package com.spotify.playlistapi.service;

import com.spotify.playlistapi.model.Musica;
import com.spotify.playlistapi.model.Playlist;
import com.spotify.playlistapi.repository.MusicaRepository;
import com.spotify.playlistapi.repository.PlaylistRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final MusicaRepository musicaRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository, MusicaRepository musicaRepository) {
        this.playlistRepository = playlistRepository;
        this.musicaRepository = musicaRepository;
    }

    @Transactional
    public Playlist criarPlaylist(Playlist playlist) {
        List<Musica> musicasParaSalvar = new ArrayList<>();

        for (Musica musica : playlist.getMusicas()) {
            Optional<Musica> musicaExistente = musicaRepository.findByTituloAndArtista(
                musica.getTitulo(), 
                musica.getArtista()
            );

            if (musicaExistente.isPresent()) {
                musicasParaSalvar.add(musicaExistente.get());
            } else {
                musicasParaSalvar.add(musicaRepository.save(musica));
            }
        }

        playlist.setMusicas(musicasParaSalvar);
        return playlistRepository.save(playlist);
    }

    //CRUD
    
    public List<Playlist> listarPlaylists() {
        return playlistRepository.findAll();
    }

    public Playlist buscarPlaylist(String nome) {
        return playlistRepository.findByNome(nome)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));
    }

    public boolean deletarPlaylist(String nome) {
        Playlist playlist = playlistRepository.findByNome(nome)
                .orElseThrow(() -> new RuntimeException("Playlist não encontrada"));
        playlistRepository.delete(playlist);
        return true;
    }
}
