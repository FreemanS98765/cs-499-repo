/**
 * @fileOverview Interface for defining the structure of a Notification.
 */

/**
 * @interface Notification
 * @description Represents a notification within the system, including its unique identifier, message content, and the date it was created.
 * 
 * @property {string} _id - The unique identifier for the notification.
 * @property {string} msg - The message content of the notification.
 * @property {Date} date - The date and time when the notification was created.
 */
export interface Notification {
    _id: string;
    msg: string;
    date: Date;
}