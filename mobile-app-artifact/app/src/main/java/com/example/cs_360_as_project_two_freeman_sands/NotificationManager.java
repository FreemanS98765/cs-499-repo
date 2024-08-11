package com.example.cs_360_as_project_two_freeman_sands;

import android.app.Activity;
import android.Manifest;
import android.app.AlertDialog;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.switchmaterial.SwitchMaterial;

import java.util.List;

public class NotificationManager extends Activity {
    private SwitchMaterial enableSmsSwitch;
    private TextView notificationStatusTextView;
    private NotificationAdapter notificationAdapter;
    private RecyclerView notificationsList;
    private DatabaseHelper databaseHelper;
    private static final int PERMISSION_SEND_SMS = 1;
    private FooterManager footerManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_notifications_drawer);

        enableSmsSwitch = findViewById(R.id.switch_enable_notifications);
        notificationStatusTextView = findViewById(R.id.textViewNotificationStatus);
        notificationsList = findViewById(R.id.notifications_list);
        databaseHelper = new DatabaseHelper(this);

        List<NotificationItem> notifications = databaseHelper.getAllNotifications();

        notificationAdapter = new NotificationAdapter(this, notifications);
        notificationsList.setLayoutManager(new LinearLayoutManager(this));
        notificationsList.setAdapter(notificationAdapter);

        // Check if SMS notifications are enabled
        boolean isSmsEnabled = areSmsNotificationsEnabled();
        enableSmsSwitch.setChecked(isSmsEnabled);

        if (enableSmsSwitch == null) {
            Toast.makeText(this, "Switch not found", Toast.LENGTH_SHORT).show();
            return;
        }

        updateNotificationStatus(isSmsEnabled);

        // Set up notifications listener
        enableSmsSwitch.setOnCheckedChangeListener((buttonView, isChecked) -> {
            if (isChecked) {
                requestSmsPermission();
            } else {
                disableSmsNotification();
            }
            saveNotificationPreference(isChecked);
        });

        // Initialize Footer
        footerManager = new FooterManager(this);
    }

    private void updateNotificationStatus(boolean isEnabled) {
        // Update notification status TextView
        if (isEnabled) {
            notificationStatusTextView.setText(getString(R.string.notifications_enabled_msg));
            enableSmsSwitch.setChecked(true);
        } else {
            notificationStatusTextView.setText(getString(R.string.notifications_disabled_msg));
            enableSmsSwitch.setChecked(false);
        }
    }

    private void requestSmsPermission() {
        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.SEND_SMS) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.SEND_SMS}, PERMISSION_SEND_SMS);
        } else {
            // Permission already granted, proceed with sending SMS
            enableSmsNotifications();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_SEND_SMS) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "SMS permission granted", Toast.LENGTH_SHORT).show();
                enableSmsNotifications();
            } else {
                Toast.makeText(this, "SMS permission denied", Toast.LENGTH_SHORT).show();
                disableSmsNotification();
            }
        }
    }

    private void enableSmsNotifications() {
        // Enable SMS notifications
        Toast.makeText(this, "SMS notifications enabled", Toast.LENGTH_SHORT).show();
    }

    private void disableSmsNotification() {
        // Disable SMS notifications
        Toast.makeText(this, "SMS notifications disabled", Toast.LENGTH_SHORT).show();
    }

    private void saveNotificationPreference(boolean isEnabled) {
        SharedPreferences sharedPreferences = getSharedPreferences("AppSettings", MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putBoolean("EnableSMS", isEnabled);
        editor.apply();
    }

    private boolean areSmsNotificationsEnabled() {
        SharedPreferences sharedPreferences = getSharedPreferences("AppSettings", MODE_PRIVATE);
        return sharedPreferences.getBoolean("EnableSMS", false);
    }

    private void confirmDeletion() {
        new AlertDialog.Builder(this)
                .setTitle("Confirm Deletion")
                .setMessage("Are you sure you want to delete this notification?")
                .setPositiveButton("Delete", (dialog, which) -> deleteNotification())
                .setNegativeButton("Cancel", null)
                .show();
    }

    private void deleteNotification() {
        // Example for deleting a notification at a specific position
        int positionToDelete = 0; // You might get this from an onClick method or any other way
        if (positionToDelete < notificationAdapter.getItemCount()) {
            // Casting long to int (make sure this is safe by ensuring the IDs don't exceed integer range)
            int notificationId = (int) notificationAdapter.getItemId(positionToDelete);
            databaseHelper.deleteNotification(notificationId);
            notificationAdapter.deleteNotification(positionToDelete);
        }
    }
}
