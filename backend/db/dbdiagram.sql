
Table "food_menu" {
  "id" SERIAL [pk, increment]
  "name" VARCHAR(255) [not null]
  "price" INTEGER [not null]
  "image_url" VARCHAR(255) [default: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"]
  "category" varchar(255) [default: `''`]
  "description" TEXT
}

Table "food_order" {
  "id" SERIAL [pk, increment]
  "order_time" timestamp [default: `NOW()`]
  "seat_id" VARCHAR(255)
  "payment_completed" BOOLEAN [default: false]
}

Table "food_order_items" {
  "id" SERIAL [pk, increment]
  "order_id" INTEGER [not null]
  "food_id" INTEGER [not null]
  "quantity" INTEGER [not null]
  "status" VARCHAR(255) [default: "PENDING"]
}

Table "feedbacks" {
  "id" SERIAL [pk, increment]
  "rating" INTEGER [not null]
  "feedback_text" TEXT [not null]
  "created_at" timestamp [not null, default: `NOW()`]
  "seat_id" INTEGER [not null]
}

Table "users" {
  "id" SERIAL [pk, increment]
  "username" VARCHAR(50) [unique, not null]
  "password" VARCHAR(255) [not null]
}

Ref:"food_order"."id" < "food_order_items"."order_id" [delete: cascade]

Ref:"food_menu"."id" < "food_order_items"."food_id" [delete: cascade]

Ref:"feedbacks"."seat_id" < "food_order"."seat_id" [delete: cascade]
