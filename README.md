# Amazon Clone 🛍️

---

This is a functional **Amazon Clone** built with React, focusing on an e-commerce experience with product listings, a shopping cart, and a secure checkout process powered by Stripe.

## ✨ Features

* **Product Listing:** Browse various products with details.
* **Shopping Cart Functionality:** Add, remove, and manage items in the cart.
* **Secure Checkout:** Integrated with **Stripe Checkout** for payment processing.
* **Stripe Webhooks:** Handles post-payment actions and order confirmation.
* **User Authentication:** (If implemented, e.g., with NextAuth).
* **Order History:** (If implemented) View past orders.
* **Data Storage:** Product and order data stored in **Firestore (Firebase)**.

## 🚀 Tech Stack

* **Frontend:** ReactJS
* **Payments:** Stripe Checkout, Stripe Webhooks
* **Backend/Database:** Firestore (Firebase)
* **Authentication:** NextAuth (If used, otherwise mention if custom)

## ⚙️ Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/RaviRafaliya11/amazon-clone.git](https://github.com/RaviRafaliya11/amazon-clone.git)
    cd amazon-clone
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Firebase & Stripe Setup:**
    * Set up a Firebase project and enable Firestore.
    * Configure your Firebase and Stripe API keys in your `.env.local` file.
    * Set up a Stripe webhook for handling successful payments.
4.  **Run the application:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will be available at `http://localhost:3000`.

---
