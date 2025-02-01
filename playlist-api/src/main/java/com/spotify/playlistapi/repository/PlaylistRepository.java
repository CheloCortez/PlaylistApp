package com.spotify.playlistapi.repository;

import com.spotify.playlistapi.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    Optional<Playlist> findByNome(String nome);
}
