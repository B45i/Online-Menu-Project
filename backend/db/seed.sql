-- Seed data

INSERT INTO food_menu (name, price, image_url, description)
VALUES 
    ('Item 1', 10.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 1'),
    ('Item 2', 12.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 2'),
    ('Item 3', 15.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 3'),
    ('Item 4', 8.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 4'),
    ('Item 5', 5.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 5'),
    ('Item 6', 9.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 6'),
    ('Item 7', 14.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 7'),
    ('Item 8', 19.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 8'),
    ('Item 9', 25.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 9'),
    ('Item 10', 11.99, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80', 'Description of item 10');

-- Create an entry in the "food_order" table
INSERT INTO food_order (seat_id, payment_completed) VALUES ('A1', false) RETURNING id;

-- Use the generated "id" value to insert the order items in "food_order_items" table
INSERT INTO food_order_items (food_id, order_id, quantity)
VALUES
    ((SELECT id FROM food_menu WHERE name = 'Item 1'), (SELECT id FROM food_order ORDER BY id DESC LIMIT 1), 3),
    ((SELECT id FROM food_menu WHERE name = 'Item 3'), (SELECT id FROM food_order ORDER BY id DESC LIMIT 1), 3),
    ((SELECT id FROM food_menu WHERE name = 'Item 5'), (SELECT id FROM food_order ORDER BY id DESC LIMIT 1), 3);


-- select all orders
SELECT 
    food_order.id as order_id,
    food_order.seat_id,
    food_order.payment_completed,
    food_order_items.food_id,
    food_menu.name,
    food_order_items.quantity
FROM food_order
JOIN food_order_items ON food_order.id = food_order_items.order_id
JOIN food_menu ON food_order_items.food_id = food_menu.id


--  query to get items for an order with id 1

SELECT 
    food_order.id as order_id,
    food_order.seat_id,
    food_order.payment_completed,
    food_order_items.food_id,
    food_menu.name,
    food_order_items.quantity
FROM food_order
JOIN food_order_items ON food_order.id = food_order_items.order_id
JOIN food_menu ON food_order_items.food_id = food_menu.id
WHERE food_order.id = 1;