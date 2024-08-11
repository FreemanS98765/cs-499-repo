package com.example.cs_360_as_project_two_freeman_sands;

import android.content.Context;

public class AuthenticationService {
    private DatabaseHelper dbHelper;

    public AuthenticationService(Context context) {
        // Initialize the database helper
        dbHelper = new DatabaseHelper(context);
    }

    // Implement the authentication methods
    public boolean authenticateUser(String username, String password) {
        return dbHelper.authenticateUser(username, password);
    }

    // Implement the registration method
    public boolean register(String username, String password) {
        if (!dbHelper.authenticateUser(username, password)) {
            dbHelper.registerUser(username, password);
            return true;
        } else {
            return false;
        }
    }
}
