package com.example.cs_360_as_project_two_freeman_sands;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.content.ContentValues;
import android.database.Cursor;

import java.util.ArrayList;
import java.util.List;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;

import android.telephony.SmsManager;
import android.util.Log;
import android.widget.Toast;
import android.Manifest;

import androidx.core.content.ContextCompat;


public class DatabaseHelper extends SQLiteOpenHelper {

    private final Context context;

    // Phone number for SMS notifications
    private static final String PHONE_NUMBER = "1234567890";

    public DatabaseHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
        this.context = context;
    }

    private static final String DATABASE_NAME = "InventoryApp.db";
    private static final int DATABASE_VERSION = 1;

    // User Table
    private static final String TABLE_USER = "user";
    private static final String COLUMN_USER_ID = "user_id";
    private static final String COLUMN_USER_NAME = "user_name";
    private static final String COLUMN_USER_PASSWORD = "user_password";

    // SQL statement to create user table
    private static final String CREATE_USER_TABLE = "CREATE TABLE " + TABLE_USER + "("
            + COLUMN_USER_ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
            + COLUMN_USER_NAME + " TEXT,"
            + COLUMN_USER_PASSWORD + " TEXT" + ")";

    // Inventory Table
    private static final String TABLE_INVENTORY = "inventory";
    private static final String COLUMN_ID = "id";
    private static final String COLUMN_NAME = "name";
    private static final String COLUMN_SKU = "sku";
    private static final String COLUMN_QUANTITY = "quantity";

    // SQL statement to create inventory table
    private static final String CREATE_INVENTORY_TABLE = "CREATE TABLE " + TABLE_INVENTORY + "("
            + COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
            + COLUMN_NAME + " TEXT,"
            + COLUMN_SKU + " TEXT," // Added SKU column
            + COLUMN_QUANTITY + " INTEGER" + ")";

    // Notifications Table
    private static final String TABLE_NOTIFICATIONS = "notifications";
    private static final String COLUMN_NOTIFICATION_ID = "notification_id";
    private static final String COLUMN_NOTIFICATION_TEXT = "notification_text";
    private static final String COLUMN_NOTIFICATION_DATE = "notification_date";

    // SQL statement to create notifications table
    private static final String CREATE_NOTIFICATIONS_TABLE = "CREATE TABLE " + TABLE_NOTIFICATIONS + "("
            + COLUMN_NOTIFICATION_ID + " INTEGER PRIMARY KEY AUTOINCREMENT,"
            + COLUMN_NOTIFICATION_TEXT + " TEXT,"
            + COLUMN_NOTIFICATION_DATE + " TIMESTAMP DEFAULT CURRENT_TIMESTAMP" + ")";


    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    // Helper method to send SMS
    private void sendSMSNotification(String message) {
        SharedPreferences prefs = context.getSharedPreferences("AppSettings", Context.MODE_PRIVATE);
        boolean isSMSEnabled = prefs.getBoolean("EnableSMS", false);
        if (isSMSEnabled && ContextCompat.checkSelfPermission(context, Manifest.permission.SEND_SMS) == PackageManager.PERMISSION_GRANTED) {
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(PHONE_NUMBER, null, message, null, null);
            Toast.makeText(context, "SMS sent", Toast.LENGTH_SHORT).show();
        } else {
            Toast.makeText(context, "SMS not sent", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

        // Create user table
        db.execSQL(CREATE_USER_TABLE);

        // Create inventory table
        db.execSQL(CREATE_INVENTORY_TABLE);

        // Create notifications table
        db.execSQL(CREATE_NOTIFICATIONS_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        // Drop older table if existed
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_USER);
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_INVENTORY);
        db.execSQL("DROP TABLE IF EXISTS " + TABLE_NOTIFICATIONS);

        // Create tables again
        onCreate(db);
    }

    // Register user
    public void registerUser(String userName, String password) {
        try (SQLiteDatabase db = this.getWritableDatabase()) {
            ContentValues values = new ContentValues();
            values.put(COLUMN_USER_NAME, userName);
            values.put(COLUMN_USER_PASSWORD, password);
            db.insert(TABLE_USER, null, values);
        } catch (Exception e) {
            Log.e("DBHelper", "Error while registering user", e);
        }
    }

    // Authenticate user
    public boolean authenticateUser(String userName, String password) {
        String[] projection = {COLUMN_USER_ID};
        String selection = COLUMN_USER_NAME + " = ? AND " + COLUMN_USER_PASSWORD + " = ?";
        String[] selectionArgs = {userName, password};

        try (SQLiteDatabase db = this.getReadableDatabase(); Cursor cursor = db.query(TABLE_USER, projection, selection, selectionArgs, null, null, null)) {
            return cursor.getCount() > 0;
        }
    }

    // Add an Item
    public void addItem(InventoryItem item) {
        try (SQLiteDatabase db = this.getWritableDatabase()) {
            ContentValues values = new ContentValues();
            values.put(COLUMN_NAME, item.getName());
            values.put(COLUMN_QUANTITY, item.getQuantity());
            values.put(COLUMN_SKU, item.getSku());
            long result = db.insert(TABLE_INVENTORY, null, values);
            if (result != -1) {
                addNotification("New item added: " + item.getName());
                sendSMSNotification("New item added: " + item.getName());
            }
        } catch (Exception e) {
            Log.e("DBHelper", "Error while adding inventory item", e);
        }
    }


    // Get a single item
    public InventoryItem getItem(int id) {
        SQLiteDatabase db = this.getReadableDatabase();
        Cursor cursor = null;
        InventoryItem item = null;
        try {
            String[] projection = {COLUMN_ID, COLUMN_NAME, COLUMN_SKU, COLUMN_QUANTITY};
            String selection = COLUMN_ID + " = ?";
            String[] selectionArgs = {String.valueOf(id)};
            cursor = db.query(TABLE_INVENTORY, projection, selection, selectionArgs, null, null, null);
            if (cursor != null && cursor.moveToFirst()) {
                int idIndex = cursor.getColumnIndex(COLUMN_ID);
                int nameIndex = cursor.getColumnIndex(COLUMN_NAME);
                int skuIndex = cursor.getColumnIndex(COLUMN_SKU);
                int quantityIndex = cursor.getColumnIndex(COLUMN_QUANTITY);
                item = new InventoryItem(cursor.getInt(idIndex), cursor.getString(nameIndex), cursor.getString(skuIndex), cursor.getDouble(quantityIndex));
            }
        } finally {
            if (cursor != null) cursor.close();
            db.close();
        }
        return item;
    }


    // Update a single item
    public int updateItem(InventoryItem item) {
        try (SQLiteDatabase db = this.getWritableDatabase()) {
            ContentValues values = new ContentValues();
            values.put(COLUMN_NAME, item.getName());
            values.put(COLUMN_QUANTITY, item.getQuantity());
            values.put(COLUMN_SKU, item.getSku());
            int rowsAffected = db.update(TABLE_INVENTORY, values, COLUMN_ID + " = ?", new String[]{String.valueOf(item.getId())});
            if (rowsAffected > 0) {
                addNotification("Updated item: " + item.getName());
                sendSMSNotification("Updated item: " + item.getName());
            }
            return rowsAffected;
        } catch (Exception e) {
            Log.e("DBHelper", "Error while updating inventory item", e);
            return -1;
        }
    }

    // Delete a single item
    public void deleteItem(InventoryItem item) {
        // First retrieve the name of the item

        try (SQLiteDatabase db = this.getWritableDatabase()) {
            String itemName = item.getName();
            int id = item.getId();
            int rowsAffected = db.delete(TABLE_INVENTORY, COLUMN_ID + " = ?", new String[]{String.valueOf(id)});
            if (rowsAffected > 0) {
                addNotification("Deleted item: " + itemName);
                sendSMSNotification("Deleted item " + item.getName());
            }
        } catch (Exception e) {
            Log.e("DBHelper", "Error while deleting inventory item", e);
        }
    }

    // Get all items
    public List<InventoryItem> getAllItems() {
        List<InventoryItem> items = new ArrayList<>();
        String selectQuery = "SELECT * FROM " + TABLE_INVENTORY;
        try (SQLiteDatabase db = this.getReadableDatabase(); Cursor cursor = db.rawQuery(selectQuery, null)) {
            int idIndex = cursor.getColumnIndex(COLUMN_ID);
            int nameIndex = cursor.getColumnIndex(COLUMN_NAME);
            int skuIndex = cursor.getColumnIndex(COLUMN_SKU); // Get the index of the SKU column
            int quantityIndex = cursor.getColumnIndex(COLUMN_QUANTITY);

            // Check for valid column indices
            if (idIndex == -1 || nameIndex == -1 || skuIndex == -1 || quantityIndex == -1) {
                throw new IllegalArgumentException("Database column index error");
            }

            if (cursor.moveToFirst()) {
                do {
                    int id = cursor.getInt(idIndex); // Assuming ID is an integer
                    String name = cursor.getString(nameIndex);
                    String sku = cursor.getString(skuIndex); // Fetch the SKU
                    int quantity = cursor.getInt(quantityIndex);

                    // Construct an InventoryItem with the SKU included
                    InventoryItem item = new InventoryItem(id, name, sku, quantity);
                    items.add(item);
                } while (cursor.moveToNext());
            }
        } catch (Exception e) {
            Log.e("DBHelper", "Error while retrieving inventory items", e);
        }

        return items;
    }

    // Add a notification
    public void addNotification(String text) {
        try (SQLiteDatabase db = this.getWritableDatabase()) {
            ContentValues values = new ContentValues();
            values.put(COLUMN_NOTIFICATION_TEXT, text);
            db.insert(TABLE_NOTIFICATIONS, null, values);
        } catch (Exception e) {
            Log.e("DBHelper", "Error while adding notification", e);
        }
    }

    // Delete a notification
    public void deleteNotification(int id) {
        try (SQLiteDatabase db = this.getWritableDatabase()) {
            db.delete(TABLE_NOTIFICATIONS, COLUMN_NOTIFICATION_ID + " = ?", new String[]{String.valueOf(id)});
        } catch (Exception e) {
            Log.e("DBHelper", "Error while deleting notification", e);
        }
    }

    // Get all notifications
    public List<NotificationItem> getAllNotifications() {
        List<NotificationItem> notifications = new ArrayList<>();
        String selectQuery = "SELECT * FROM " + TABLE_NOTIFICATIONS;

        try (SQLiteDatabase db = this.getReadableDatabase(); Cursor cursor = db.rawQuery(selectQuery, null)) {
            int idIndex = cursor.getColumnIndex(COLUMN_NOTIFICATION_ID);
            int textIndex = cursor.getColumnIndex(COLUMN_NOTIFICATION_TEXT);
            int dateIndex = cursor.getColumnIndex(COLUMN_NOTIFICATION_DATE);

            if (idIndex == -1 || textIndex == -1 || dateIndex == -1) {
                throw new IllegalArgumentException("Database column index error");
            }

            if (cursor.moveToFirst()) {
                do {
                    int id = cursor.getInt(idIndex);
                    String text = cursor.getString(textIndex);
                    String dateString = cursor.getString(dateIndex);
                    Date date = null;
                    try {
                        date = dateFormat.parse(dateString);
                    } catch (ParseException e) {
                        Log.e("DBHelper", "Error parsing date: " + dateString, e);
                    }

                    notifications.add(new NotificationItem(id, text, date));
                } while (cursor.moveToNext());
            }
        } catch (Exception e) {
            Log.e("DBHelper", "Error while retrieving notifications", e);
        }
        return notifications;
    }

}
