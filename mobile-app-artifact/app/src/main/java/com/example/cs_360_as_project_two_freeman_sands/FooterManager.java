package com.example.cs_360_as_project_two_freeman_sands;

import android.app.Activity;
import android.content.Intent;
import android.widget.LinearLayout;

public class FooterManager {

    private LinearLayout inventoryIcon;
    private LinearLayout notificationIcon;
    private LinearLayout logoutIcon;
    private Activity activity;

    public FooterManager(Activity activity) {
        this.activity = activity;
        initializeFooter();
    }

    private void initializeFooter() {
        inventoryIcon = activity.findViewById(R.id.inventoryContainer);
        notificationIcon = activity.findViewById(R.id.notificationContainer);
        logoutIcon = activity.findViewById(R.id.logoutContainer);

        setupListeners();
    }

    private void setupListeners() {
        inventoryIcon.setOnClickListener(v -> {
            Intent intent = new Intent(activity, InventoryActivity.class);
            activity.startActivity(intent);
        });

        notificationIcon.setOnClickListener(v -> {
            Intent intent = new Intent(activity, NotificationManager.class);
            activity.startActivity(intent);
        });

        logoutIcon.setOnClickListener(v -> logoutUser());
    }

    private void logoutUser() {
        // TODO: Implement logout logic here

        // Redirect to Login screen
        Intent intent = new Intent(activity, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
        activity.startActivity(intent);
        activity.finish();
    }

}
