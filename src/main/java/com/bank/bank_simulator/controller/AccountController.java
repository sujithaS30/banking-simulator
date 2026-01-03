package com.bank.bank_simulator.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.bank_simulator.model.Account;
import com.bank.bank_simulator.repository.AccountRepository;

import java.util.List;

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
}