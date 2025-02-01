package com.spotify.playlistapi.repository;

import com.spotify.playlistapi.model.Musica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface MusicaRepository extends JpaRepository<Musica, Long> {

    Optional<Musica> findByTituloAndArtista(String titulo, String artista);
}
