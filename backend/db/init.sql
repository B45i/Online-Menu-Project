DROP TABLE IF EXISTS food_order_items;
DROP TABLE IF EXISTS food_menu;
DROP TABLE IF EXISTS food_order;


-- Create food_menu table
CREATE TABLE IF NOT EXISTS food_menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    image_url VARCHAR(255),
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
    FOREIGN KEY (order_id) REFERENCES food_order(id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES food_menu(id) ON DELETE CASCADE
);
