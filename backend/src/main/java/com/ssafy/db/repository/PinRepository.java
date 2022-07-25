package com.ssafy.db.repository;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Pin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PinRepository extends JpaRepository<Pin, Long> {


}
