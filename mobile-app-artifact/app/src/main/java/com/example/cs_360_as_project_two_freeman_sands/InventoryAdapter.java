package com.example.cs_360_as_project_two_freeman_sands;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.ImageView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class InventoryAdapter extends RecyclerView.Adapter<InventoryAdapter.ViewHolder> {

    private final List<InventoryItem> mItems;
    private final Context mContext;

    public InventoryAdapter(Context context, List<InventoryItem> items) {
        mItems = items;
        mContext = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.item_inventory, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        InventoryItem item = mItems.get(position);
        holder.textViewName.setText(item.getName());
        holder.textViewSku.setText(item.getSku());
        holder.textViewAmount.setText(String.format("%.2f", item.getQuantity()));

        holder.deleteButton.setOnClickListener(v -> {
            if (mContext instanceof InventoryActivity) {
                ((InventoryActivity) mContext).confirmDeletion(position);
            }
        });

        holder.editButton.setOnClickListener(v -> {
            if (mContext instanceof InventoryActivity) {
                ((InventoryActivity) mContext).openEditDialog(position);
            }
        });
    }

    @Override
    public int getItemCount() {
        return mItems.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        public TextView textViewName, textViewSku, textViewAmount;
        public ImageView deleteButton, editButton;

        public ViewHolder(View itemView) {
            super(itemView);
            textViewName = itemView.findViewById(R.id.textViewName);
            textViewSku = itemView.findViewById(R.id.textViewSku);
            textViewAmount = itemView.findViewById(R.id.textViewAmount);
            editButton = itemView.findViewById(R.id.buttonEdit);
            deleteButton = itemView.findViewById(R.id.buttonDelete);
        }
    }
}
