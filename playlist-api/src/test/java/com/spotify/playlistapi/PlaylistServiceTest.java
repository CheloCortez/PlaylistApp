package com.spotify.playlistapi;

import com.spotify.playlistapi.model.Musica;
import com.spotify.playlistapi.model.Playlist;
import com.spotify.playlistapi.repository.MusicaRepository;
import com.spotify.playlistapi.repository.PlaylistRepository;
import com.spotify.playlistapi.service.PlaylistService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlaylistServiceTest {

    @Mock
    private PlaylistRepository playlistRepository;

    @Mock
    private MusicaRepository musicaRepository;

    @InjectMocks
    private PlaylistService playlistService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCriarPlaylist() {
        Musica musica = new Musica(null, "Stairway to Heaven", "Led Zeppelin", "Led Zeppelin IV", 1971, "Rock");
        List<Musica> musicas = new ArrayList<>();
        musicas.add(musica);

        Playlist playlist = new Playlist(null, "Rock Clássico", "Melhores do rock", musicas);

        when(musicaRepository.findByTituloAndArtista("Stairway to Heaven", "Led Zeppelin"))
                .thenReturn(Optional.empty());
        when(musicaRepository.save(musica)).thenReturn(musica);
        when(playlistRepository.save(playlist)).thenReturn(playlist);

        Playlist result = playlistService.criarPlaylist(playlist);

        assertNotNull(result);
        assertEquals("Rock Clássico", result.getNome());
        verify(musicaRepository, times(1)).save(musica);
        verify(playlistRepository, times(1)).save(playlist);
    }

    @Test
    void testListarPlaylists() {
        List<Playlist> playlists = new ArrayList<>();
        playlists.add(new Playlist(1L, "Rock Clássico", "Melhores do rock", new ArrayList<>()));

        when(playlistRepository.findAll()).thenReturn(playlists);

        List<Playlist> result = playlistService.listarPlaylists();

        assertEquals(1, result.size());
        assertEquals("Rock Clássico", result.get(0).getNome());
    }

    @Test
    void testBuscarPlaylist() {
        Playlist playlist = new Playlist(1L, "Rock Clássico", "Melhores do rock", new ArrayList<>());

        when(playlistRepository.findByNome("Rock Clássico")).thenReturn(Optional.of(playlist));

        Playlist result = playlistService.buscarPlaylist("Rock Clássico");

        assertNotNull(result);
        assertEquals("Rock Clássico", result.getNome());
    }
}
