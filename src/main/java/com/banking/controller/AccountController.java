package com.bank.bank_simulator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.bank.bank_simulator.model.Account;
import com.bank.bank_simulator.repository.AccountRepository;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/accounts")
public class AccountController {

    @Autowired
    private AccountRepository repo;

    @PostMapping("/create")
    public Account createAccount(@RequestBody Account acc) {
        return repo.save(acc);
    }

    @GetMapping("/{accNo}")
    public Account getAccount(@PathVariable Long accNo) {
        return repo.findById(accNo).orElse(null);
    }

    @GetMapping("/all")
    public List<Account> getAllAccounts() {
        return repo.findAll();
    }

    // --- DEPOSIT LOGIC (Ithai thaan neenga miss panniteenga) ---
    @PutMapping("/{accNo}/deposite")
    public Account deposit(@PathVariable Long accNo, @RequestBody Map<String, Double> request) {
        Account account = repo.findById(accNo).orElseThrow(() -> new RuntimeException("Account not found"));
        Double amount = request.get("amount");
        account.setBalance(account.getBalance() + amount);
        return repo.save(account);
    }

    // --- WITHDRAW LOGIC ---
    @PutMapping("/{accNo}/withdraw")
    public Account withdraw(@PathVariable Long accNo, @RequestBody Map<String, Double> request) {
        Account account = repo.findById(accNo).orElseThrow(() -> new RuntimeException("Account not found"));
        Double amount = request.get("amount");
        if (account.getBalance() < amount) {
            throw new RuntimeException("Insufficient balance");
        }
        account.setBalance(account.getBalance() - amount);
        return repo.save(account);
    }
}