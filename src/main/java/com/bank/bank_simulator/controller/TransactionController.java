package com.bank.bank_simulator.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.bank_simulator.model.Account;
import com.bank.bank_simulator.repository.AccountRepository;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private AccountRepository repo;

    @PostMapping("/deposite")
    public String deposit(@RequestBody Map<String, String> data) {
        Long accNo = Long.parseLong(data.get("accNo"));
        double amount = Double.parseDouble(data.get("amount"));

        Account acc = repo.findById(accNo).orElse(null);
        if (acc == null) return "Account not found";

        acc.setBalance(acc.getBalance() + amount);
        repo.save(acc);
        return "Deposit successful";
    }

    @PostMapping("/withdraw")
    public String withdraw(@RequestBody Map<String, String> data) {
        Long accNo = Long.parseLong(data.get("accNo"));
        double amount = Double.parseDouble(data.get("amount"));

        Account acc = repo.findById(accNo).orElse(null);
        if (acc == null) return "Account not found";
        if (acc.getBalance() < amount) return "Insufficient balance";

        acc.setBalance(acc.getBalance() - amount);
        repo.save(acc);
        return "Withdraw successful";
    }

    @PostMapping("/transfer")
    public String transfer(@RequestBody Map<String, String> data) {
        Long from = Long.parseLong(data.get("fromAcc"));
        Long to = Long.parseLong(data.get("toAcc"));
        double amount = Double.parseDouble(data.get("amount"));

        Account sender = repo.findById(from).orElse(null);
        Account receiver = repo.findById(to).orElse(null);

        if (sender == null || receiver == null) return "Account not found";
        if (sender.getBalance() < amount) return "Insufficient balance";

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        repo.save(sender);
        repo.save(receiver);

        return "Transfer successful";
    }
}