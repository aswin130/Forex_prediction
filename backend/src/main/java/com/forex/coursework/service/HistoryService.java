package com.forex.coursework.service;

import com.forex.coursework.model.History;
import com.forex.coursework.repository.HistoryRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class HistoryService {
    @Autowired
    private HistoryRepository historyRepository;

    public List<History> getHistoriesByUserName(String username) {
        List<History> histories = historyRepository.getAllHistoryByUserName(username);

        if(histories == null || histories.isEmpty()) {
            throw new EntityNotFoundException("History not found for the given username");
        }
        return histories;
    }

    public History addHistory(String userName, String fromCurrency, String toCurrency) {
        History history = new History();
        history.setUserName(userName);
        history.setDate(new Date().getTime());
        history.setFromCurrency(fromCurrency);
        history.setToCurrency(toCurrency);
//        history.setexchangeRate(exchangeRate);
        return historyRepository.save(history);
    }
}
