package com.forex.coursework.repository;

import com.forex.coursework.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {

    @Query("SELECT h FROM History h WHERE h.userName = ?1")
    List<History> getAllHistoryByUserName(String userName);
}
