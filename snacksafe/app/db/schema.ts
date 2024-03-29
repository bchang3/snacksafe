import {
  serial,
  text,
  timestamp,
  pgTable,
  uuid,
  time,
  varchar,
  boolean,
  real,
  integer,
} from "drizzle-orm/pg-core";
export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
export const profiles = pgTable("profile", {
  id: uuid("id"),
  updated_at: timestamp("updated_at"),
  avatar_url: text("avatar"),
  first_name: varchar("first_name"),
  last_name: varchar("last_name"),
  email: varchar("email"),
  has_set_password: boolean("has_set_password"),
  createdAt: timestamp("created_at"),
  title: text("title"),
});
export const restaurants = pgTable("profile", {
  id: text("id"),
  name: text("name"),
  safety_rating: real("safety_rating"),
  address: text("address"),
  review_count: integer("review_count"),
  image_url: text("image_url"),
  distance: real("distance"),
  phone: text("phone"),
});
