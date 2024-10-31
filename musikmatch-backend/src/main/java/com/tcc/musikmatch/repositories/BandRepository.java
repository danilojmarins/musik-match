package com.tcc.musikmatch.repositories;

import com.tcc.musikmatch.models.Band;
import com.tcc.musikmatch.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BandRepository extends JpaRepository<Band, UUID> {

    Optional<Band> findByUser(User user);

    // @Query(value =
    //     "SELECT "
    //   +     "b.id, b.name "
    //   + "FROM "
    //   +     "bands AS b, "
    //   +     "users AS u, "
    //   +     "bands_instruments AS bi, "
    //   +     "bands_genres AS bg, "
    //   +     "instruments AS i, "
    //   +     "genres AS g "
    //   + "WHERE "
    //   +     "b.user_id = u.id AND "
    //   +     "b.id = bi.band AND "
    //   +     "bi.instrument = i.id AND "
    //   +     "b.id = bg.band AND "
    //   +     "bg.genre = g.id AND "
    //   +     "i.id = COALESCE(?3, i.id) AND "
    //   +     "g.id = COALESCE(?2, g.id) AND "
    //   +     "("
    //   +         "b.name LIKE %?1% OR "
    //   +         "b.bio LIKE %?1%"
    //   +     ")"
    // )
    // List<Band> filterBands(String search, int genre, int instrument);

}
