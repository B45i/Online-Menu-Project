DROP TABLE IF EXISTS food_order_items;
DROP TABLE IF EXISTS food_menu;
DROP TABLE IF EXISTS food_order;
DROP TABLE IF EXISTS users;


-- Create food_menu table
CREATE TABLE IF NOT EXISTS food_menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image_url VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
    category varchar(255) DEFAULT '',
    description TEXT
);

-- Create food_order table
CREATE TABLE IF NOT EXISTS food_order (
    id SERIAL PRIMARY KEY,
    order_time TIMESTAMP DEFAULT NOW(),
    seat_id VARCHAR(255),
    payment_completed BOOLEAN DEFAULT false
);

-- Create food_order_items table
CREATE TABLE IF NOT EXISTS food_order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    food_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(255) DEFAULT 'PENDING',
    FOREIGN KEY (order_id) REFERENCES food_order(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food_menu(id) ON DELETE CASCADE
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
INSERT INTO users(username, password) VALUES('admin', 'password')