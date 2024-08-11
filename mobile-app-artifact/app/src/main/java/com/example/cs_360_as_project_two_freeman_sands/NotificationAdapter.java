package com.example.cs_360_as_project_two_freeman_sands;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import android.content.Context;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Locale;

public class NotificationAdapter extends RecyclerView.Adapter<NotificationAdapter.ViewHolder> {

    private final List<NotificationItem> notifications;
    private final DatabaseHelper databaseHelper;
    private final Context context;
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.getDefault());

    public NotificationAdapter(Context context, List<NotificationItem> notifications) {
        this.context = context;
        this.notifications = notifications;
        this.databaseHelper = new DatabaseHelper(context);
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_notification, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        NotificationItem notification = notifications.get(position);
        holder.notificationTextView.setText(notification.getText());

        if (notification.getDate() != null) {
            String formattedDate = dateFormat.format(notification.getDate());
            holder.notificationDate.setText(formattedDate);
        } else {
            holder.notificationDate.setText("");
        }

        // Handle notification delete button click
        holder.deleteButton.setOnClickListener(v -> deleteNotification(position));
    }

    @Override
    public int getItemCount() {
        return notifications.size();
    }

    public void deleteNotification(int position) {
        databaseHelper.deleteNotification(notifications.get(position).getId());
        notifications.remove(position);
        notifyItemRemoved(position);
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        TextView notificationTextView;
        TextView notificationDate;
        ImageView deleteButton;

        public ViewHolder(View itemView) {
            super(itemView);
            notificationTextView = itemView.findViewById(R.id.notificationText);
            notificationDate = itemView.findViewById(R.id.notificationDate);
            deleteButton = itemView.findViewById(R.id.buttonNotificationDelete);
        }
    }
}
