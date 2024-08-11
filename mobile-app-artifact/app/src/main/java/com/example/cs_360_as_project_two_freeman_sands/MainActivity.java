package com.example.cs_360_as_project_two_freeman_sands;

import android.app.Activity;
import android.os.Bundle;
import android.content.Intent;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

    private EditText emailField, passwordField;
    private AuthenticationService authService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set the content view to your layout
        setContentView(R.layout.activity_main);

        authService = new AuthenticationService(this);
        emailField = findViewById(R.id.emailInput);
        passwordField = findViewById(R.id.passwordInput);
        Button loginButton = findViewById(R.id.loginButton);
        TextView registerLink = findViewById(R.id.registerLink);

        // Initialize the login button
        loginButton.setOnClickListener(v -> attemptLogin());
        registerLink.setOnClickListener(v -> {
            // Intent to open Register Activity
            Intent intent = new Intent(MainActivity.this, RegisterActivity.class);
            startActivity(intent);
        });
    }

    private void attemptLogin() {
        String email = emailField.getText().toString();
        String password = passwordField.getText().toString();

        if (authService.authenticateUser(email, password)) {
            // Successful login, navigate to HomeActivity
            startActivity(new Intent(this, InventoryActivity.class));
        } else {
            // Notify user of failed login
            Toast.makeText(this, "Invalid email or password", Toast.LENGTH_LONG).show();
        }
    }
}
