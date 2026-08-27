package com.banking.controller; // unga package name super-ah check pannikonga

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Welcome to our Banking Application! Available endpoints: Create Account, Deposit, Withdraw, Transfer, View Account, View All Accounts.";
    }
}
