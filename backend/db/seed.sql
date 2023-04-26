-- Seed data

INSERT INTO users(username, password) VALUES('admin', 'password')

INSERT INTO food_menu (name, price, description, category) 
VALUES 
    ('Butter chicken', 120, 'A rich and creamy tomato-based chicken curry', 'non_vegetarian'),
    ('Palak paneer', 110, 'Spinach and cottage cheese curry', 'vegetarian'),
    ('Chana masala', 90, 'Spiced chickpea curry', 'north_indian'),
    ('Aloo gobi', 100, 'Potato and cauliflower curry', 'north_indian'),
    ('Samosa', 20, 'Fried pastry with spiced potato filling', 'snacks'),
    ('Papdi chaat', 20, 'Crispy dough wafers with yogurt, chutney, and spices', 'chaat'),
    ('Tandoori chicken', 150, 'Marinated and grilled chicken', 'non_vegetarian'),
    ('Naan', 25, 'Leavened Indian flatbread', 'breads'),
    ('Roti', 20, 'Unleavened Indian flatbread', 'breads'),
    ('Lassi', 25, 'Sweet or savory yogurt-based drink', 'drinks');



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