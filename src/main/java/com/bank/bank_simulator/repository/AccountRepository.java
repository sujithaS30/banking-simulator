package com.bank.bank_simulator.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bank.bank_simulator.model.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
}