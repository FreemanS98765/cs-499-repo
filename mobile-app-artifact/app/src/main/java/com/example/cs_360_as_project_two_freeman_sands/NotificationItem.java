package com.example.cs_360_as_project_two_freeman_sands;

import java.util.Date;

public class NotificationItem {
    private int id;
    private String text;
    private Date date; // Include this if you're storing timestamps

    // Constructor for creating a new notification item when date is not known or needed at creation time
    public NotificationItem(int id, String text) {
        this.id = id;
        this.text = text;
    }

    // Constructor for creating a notification item with all properties, including the date
    public NotificationItem(int id, String text, Date date) {
        this.id = id;
        this.text = text;
        this.date = date;
    }

    // Getters
    public int getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Date getDate() {
        return date;
    }

    // Setters
    public void setId(int id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
