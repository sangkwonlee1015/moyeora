package com.ssafy.db.repository;


import com.ssafy.db.entity.Maps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MapsRepository extends JpaRepository<Maps, Long> {
}
