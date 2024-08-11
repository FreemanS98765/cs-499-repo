package com.example.cs_360_as_project_two_freeman_sands;

import android.app.Activity;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.content.Intent;

public class RegisterActivity extends Activity {
    private EditText emailField, passwordField;
    private TextView backToLoginButton;
    private AuthenticationService authService;
    private Button registerButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        authService = new AuthenticationService(this);
        emailField = findViewById(R.id.email);
        passwordField = findViewById(R.id.password);
        registerButton = findViewById(R.id.registerButton);
        backToLoginButton = findViewById(R.id.backToLoginButton);

        // Set click listener for back to login button
        backToLoginButton.setOnClickListener(v -> {
            Intent intent = new Intent(this, MainActivity.class);
            startActivity(intent);
            finish();
        });

        TextWatcher watcher = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkFieldsForEmptyValues();
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        };

        // Set text watchers
        emailField.addTextChangedListener(watcher);
        passwordField.addTextChangedListener(watcher);

        registerButton.setOnClickListener(v -> registerUser());
    }

    private void checkFieldsForEmptyValues() {
        String email = emailField.getText().toString();
        String password = passwordField.getText().toString();

        // Enable the register button if both fields are not empty
        registerButton.setEnabled(!email.isEmpty() && !password.isEmpty());
    }

    private void registerUser() {
        String email = emailField.getText().toString();
        String password = passwordField.getText().toString();

        if (authService.register(email, password)) {
            Toast.makeText(this, "Registration Successful", Toast.LENGTH_SHORT).show();

            // Start InventoryActivity
            Intent intent = new Intent(this, InventoryActivity.class);
            startActivity(intent);
            finish();
        } else {
            Toast.makeText(this, "Registration Failed - User already exists", Toast.LENGTH_SHORT).show();
        }
    }
}
