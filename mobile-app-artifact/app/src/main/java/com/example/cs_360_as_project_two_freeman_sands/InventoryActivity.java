package com.example.cs_360_as_project_two_freeman_sands;

import android.app.Activity;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;

import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

import android.app.AlertDialog;
import android.widget.EditText;
import android.widget.Button;
import android.widget.TextView;
import android.content.Intent;

import java.util.List;

public class InventoryActivity extends Activity {

    private List<InventoryItem> itemList;
    private InventoryAdapter adapter;
    private DatabaseHelper databaseHelper;
    private TextView emptyView;
    private RecyclerView recyclerView;
    private FooterManager footerManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inventory);

        emptyView = findViewById(R.id.emptyView);
        recyclerView = findViewById(R.id.recyclerView);

        // Set up RecyclerView
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Initialize DatabaseHelper
        databaseHelper = new DatabaseHelper(this);

        // Fetch inventory items from database
        itemList = databaseHelper.getAllItems();
        adapter = new InventoryAdapter(this, itemList);
        recyclerView.setAdapter(adapter);

        // Call this method to update UI based on items
        updateUI();

        // Initialize Floating Action Button
        FloatingActionButton fabAddItem = findViewById(R.id.fabAddItem);
        fabAddItem.setOnClickListener(v -> showDialogToAddItem());

        // Initialize Notification
        LinearLayout notificationIcon = findViewById(R.id.notificationContainer);
        notificationIcon.setOnClickListener(v -> {
            Intent intent = new Intent(this, NotificationManager.class);
            startActivity(intent);
        });

        // Initialize Footer
        footerManager = new FooterManager(this);
    }

    private void updateUI() {
        if (itemList.isEmpty()) {
            recyclerView.setVisibility(View.GONE);
            emptyView.setVisibility(View.VISIBLE);
        } else {
            recyclerView.setVisibility(View.VISIBLE);
            emptyView.setVisibility(View.GONE);
        }
    }


    private void showDialogToAddItem() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        View dialogView = getLayoutInflater().inflate(R.layout.dialog_add_product, null);
        builder.setView(dialogView);

        EditText editTextName = dialogView.findViewById(R.id.editTextProductName);
        EditText editTextSKU = dialogView.findViewById(R.id.editTextProductSKU);
        EditText editTextQuantity = dialogView.findViewById(R.id.editTextProductQuantity);
        Button buttonAddProduct = dialogView.findViewById(R.id.buttonAddProduct);

        // Set the notification switch
        configureNotificationSwitch(dialogView);

        AlertDialog dialog = builder.create();
        buttonAddProduct.setOnClickListener(v -> {
            String name = editTextName.getText().toString().trim();
            String sku = editTextSKU.getText().toString().trim();
            double quantity = Double.parseDouble(editTextQuantity.getText().toString().trim());
            InventoryItem newItem = new InventoryItem(name, sku, quantity);
            databaseHelper.addItem(newItem);
            itemList.add(newItem);
            adapter.notifyItemInserted(itemList.size() -1);
            updateUI();
            dialog.dismiss();
        });

        dialog.show();
    }

    public void openEditDialog(int position) {
        InventoryItem item = itemList.get(position);
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        View dialogView = getLayoutInflater().inflate(R.layout.dialog_update_product, null);
        builder.setView(dialogView);

        EditText editTextName = dialogView.findViewById(R.id.editTextProductName);
        EditText editTextSKU = dialogView.findViewById(R.id.editTextProductSKU);
        EditText editTextQuantity = dialogView.findViewById(R.id.editTextProductQuantity);
        Button buttonUpdateProduct = dialogView.findViewById(R.id.buttonAddProduct);

        // Set existing values to the dialog fields
        editTextName.setText(item.getName());
        editTextSKU.setText(item.getSku());
        editTextQuantity.setText(String.valueOf(item.getQuantity()));
        buttonUpdateProduct.setText(getString(R.string.product_update));

        // Set the state of the notification switch
        configureNotificationSwitch(dialogView);

        AlertDialog dialog = builder.create();
        buttonUpdateProduct.setOnClickListener(v -> {
            String name = editTextName.getText().toString().trim();
            String sku = editTextSKU.getText().toString().trim();
            double quantity;

            try {
                quantity = Double.parseDouble(editTextQuantity.getText().toString().trim());
            } catch (NumberFormatException e) {
                // Handle invalid quantity input
                quantity = item.getQuantity();
            }

            // Update item with new values
            item.setName(name);
            item.setSku(sku);
            item.setQuantity(quantity);

            // Update database
            databaseHelper.updateItem(item);
            itemList.set(position, item);
            adapter.notifyItemChanged(position);
            dialog.dismiss();
        });

        dialog.show();
    }

    public void confirmDeletion(int position) {
        InventoryItem item = itemList.get(position);
        new AlertDialog.Builder(this)
            .setTitle("Confirm Deletion")
            .setMessage("Are you sure you want to delete " + item.getName() + "?")
            .setPositiveButton("Delete", (dialog, which) -> {
                databaseHelper.deleteItem(item);
                itemList.remove(position);
                adapter.notifyItemRemoved(position);
                updateUI();
            })
            .setNegativeButton("Cancel", null)
            .show();
    }

    private String getNotificationStatusMessage() {
        SharedPreferences sharedPreferences = getSharedPreferences("AppSettings", MODE_PRIVATE);
        return sharedPreferences.getBoolean("EnableSMS", false) ? getString(R.string.notifications_enabled_msg) : getString(R.string.notifications_disabled_msg);
    }

    private void configureNotificationSwitch(View dialogView) {
        // Set the state of the notification switch
        TextView notificationStatus = dialogView.findViewById(R.id.notifications_status_text);
        notificationStatus.setText(getNotificationStatusMessage());
    }

}
