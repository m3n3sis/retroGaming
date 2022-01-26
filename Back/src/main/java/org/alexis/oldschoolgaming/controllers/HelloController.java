package org.alexis.oldschoolgaming.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/coucou")
public class HelloController {
    @GetMapping
    public String coucou() {
        System.out.println("salut");
        return "coucou";
    }
}
