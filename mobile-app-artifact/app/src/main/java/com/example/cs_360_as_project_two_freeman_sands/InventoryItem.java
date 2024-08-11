package com.example.cs_360_as_project_two_freeman_sands;

public class InventoryItem {
    private Integer id;
    private String name;
    private String sku;
    private double quantity;

    // Constructor for new items where ID is not yet set.
    public InventoryItem(String name, String sku, double quantity) {
        this.name = name;
        this.sku = sku;
        this.quantity = quantity;
    }

    // Constructor for existing items where ID is already set.
    public InventoryItem(Integer id, String name, String sku, double quantity) {
        this.id = id;
        this.name = name;
        this.sku = sku;
        this.quantity = quantity;
    }

    // Getters
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSku() {
        return sku;
    }

    public double getQuantity() {
        return quantity;
    }


    // Setters as needed
    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }
}


