import { useState, useEffect, useRef, useCallback } from "react";
import * as React from "react";

const SUPABASE_URL = "https://osgqohqokbyvvzdnzqdc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zZ3FvaHFva2J5dnZ6ZG56cWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NDE2OTIsImV4cCI6MjA5MzIxNzY5Mn0.h_gkwAxMCmhGC41lnCTHnnv82fmeQIBGfozPdd2CEcY";
const BODY_WEIGHT_KG = 70.8;
const FFM_KG = 63.6;

const HISTORICAL_ROWS = [{"date":"2026-04-02","items":[{"id":0.0,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":0.1,"name":"Bread, white/wheat (2 slices)","cal":160,"protein":6,"carbs":30,"fat":2},{"id":0.2,"name":"Flour tortilla (1 medium)","cal":146,"protein":4,"carbs":25,"fat":3},{"id":0.3,"name":"Mixed nuts (2 tbsp)","cal":100,"protein":3,"carbs":4,"fat":9},{"id":0.4,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":0.5,"name":"Salmon, cooked (8 oz)","cal":467,"protein":64,"carbs":0,"fat":22},{"id":0.6,"name":"Chicken meatball (1)","cal":40,"protein":5,"carbs":2,"fat":2},{"id":0.7,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":0.8,"name":"Greek yogurt, low-fat (\u00bd cup)","cal":65,"protein":9,"carbs":5,"fat":1},{"id":0.9,"name":"Bread with butter (3 slices)","cal":300,"protein":6,"carbs":42,"fat":12},{"id":0.1,"name":"Cheeseburger, half","cal":300,"protein":17,"carbs":23,"fat":16},{"id":0.11,"name":"French fries, half serving","cal":230,"protein":3,"carbs":30,"fat":11},{"id":0.12,"name":"Cake, 1/3 slice","cal":117,"protein":1,"carbs":18,"fat":5},{"id":0.13,"name":"Cooked white rice (\u00bd cup)","cal":103,"protein":2,"carbs":22,"fat":0},{"id":0.14,"name":"Oatmeal, cooked (1 cup)","cal":150,"protein":5,"carbs":27,"fat":3},{"id":0.15,"name":"Honey (2 tbsp)","cal":128,"protein":0,"carbs":35,"fat":0},{"id":0.16,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0}],"exercise_cals":511},{"date":"2026-04-03","items":[{"id":1.0,"name":"Oatmeal, cooked (2 cups)","cal":300,"protein":10,"carbs":54,"fat":6},{"id":1.1,"name":"Honey (2 tbsp)","cal":128,"protein":0,"carbs":35,"fat":0},{"id":1.2,"name":"Banana, whole (1 medium)","cal":105,"protein":1,"carbs":27,"fat":0},{"id":1.3,"name":"Gatorade Endurance powder (3 scoops)","cal":176,"protein":0,"carbs":44,"fat":0},{"id":1.4,"name":"Cake, 3 bites","cal":105,"protein":1,"carbs":16,"fat":4},{"id":1.5,"name":"Sausage, egg & cheese English muffin","cal":450,"protein":21,"carbs":30,"fat":27},{"id":1.6,"name":"Sugar (20g)","cal":77,"protein":0,"carbs":20,"fat":0},{"id":1.7,"name":"Cake, 5 bites","cal":175,"protein":1,"carbs":27,"fat":7},{"id":1.8,"name":"Smoothie \u2014 banana (1 medium)","cal":105,"protein":1,"carbs":27,"fat":0},{"id":1.9,"name":"Smoothie \u2014 whey protein (14g scoop)","cal":55,"protein":12,"carbs":2,"fat":1},{"id":1.1,"name":"Smoothie \u2014 PB2 Performance (1 scoop)","cal":100,"protein":8,"carbs":8,"fat":3},{"id":1.11,"name":"Smoothie \u2014 honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":1.12,"name":"Maple syrup (1 tbsp)","cal":52,"protein":0,"carbs":13,"fat":0},{"id":1.13,"name":"Greek yogurt, low-fat (1 cup)","cal":130,"protein":17,"carbs":9,"fat":3},{"id":1.14,"name":"Hamburger with ketchup","cal":540,"protein":28,"carbs":43,"fat":27},{"id":1.15,"name":"Coca-Cola (12 oz)","cal":140,"protein":0,"carbs":39,"fat":0},{"id":1.16,"name":"Sugar cookie with icing","cal":240,"protein":2,"carbs":35,"fat":10},{"id":1.17,"name":"Black bean patty","cal":130,"protein":6,"carbs":20,"fat":3},{"id":1.18,"name":"Bread (1 slice)","cal":80,"protein":3,"carbs":15,"fat":1},{"id":1.19,"name":"Sirloin steak (10 oz)","cal":580,"protein":72,"carbs":0,"fat":31},{"id":1.2,"name":"Chicken breast, cooked (8 oz)","cal":370,"protein":70,"carbs":0,"fat":8},{"id":1.21,"name":"Spinach salad with light olive oil","cal":80,"protein":2,"carbs":4,"fat":7},{"id":1.22,"name":"Sweet potatoes (side)","cal":130,"protein":2,"carbs":30,"fat":0},{"id":1.23,"name":"Corn on the cob (1 ear)","cal":90,"protein":3,"carbs":19,"fat":1},{"id":1.24,"name":"Orange, small","cal":45,"protein":1,"carbs":11,"fat":0},{"id":1.25,"name":"Bread (3 slices)","cal":240,"protein":9,"carbs":45,"fat":3},{"id":1.26,"name":"Mixed fruit, small cup","cal":70,"protein":1,"carbs":18,"fat":0},{"id":1.27,"name":"Cake, 1 slice","cal":350,"protein":4,"carbs":52,"fat":14}],"exercise_cals":1697},{"date":"2026-04-04","items":[{"id":2.0,"name":"Cinnamon rolls with extra icing (2)","cal":600,"protein":8,"carbs":90,"fat":22},{"id":2.1,"name":"Baby carrots (~8)","cal":28,"protein":1,"carbs":6,"fat":0},{"id":2.2,"name":"Orange bell pepper strips","cal":20,"protein":1,"carbs":5,"fat":0},{"id":2.3,"name":"Cherry tomatoes (~3)","cal":15,"protein":1,"carbs":3,"fat":0},{"id":2.4,"name":"Hummus (2 tbsp)","cal":50,"protein":2,"carbs":4,"fat":3},{"id":2.5,"name":"Pita chips (~4 pieces)","cal":70,"protein":2,"carbs":10,"fat":3},{"id":2.6,"name":"Chicken salad (\u00bd cup)","cal":200,"protein":15,"carbs":5,"fat":13},{"id":2.7,"name":"Veggie quiche (1 slice)","cal":300,"protein":10,"carbs":22,"fat":19},{"id":2.8,"name":"Bread, whole wheat (1 slice)","cal":80,"protein":4,"carbs":15,"fat":1},{"id":2.9,"name":"Hot sauce/ketchup (dollop)","cal":10,"protein":0,"carbs":2,"fat":0},{"id":2.1,"name":"Bread, whole wheat (1 slice)","cal":80,"protein":4,"carbs":15,"fat":1},{"id":2.11,"name":"Chicken salad (1 cup)","cal":400,"protein":30,"carbs":10,"fat":26},{"id":2.12,"name":"Toast, large slice","cal":120,"protein":4,"carbs":22,"fat":2},{"id":2.13,"name":"Jelly, extra (2 tbsp)","cal":100,"protein":0,"carbs":26,"fat":0},{"id":2.14,"name":"Cooked pasta (3 cups)","cal":630,"protein":22,"carbs":123,"fat":3},{"id":2.15,"name":"Olive oil (1 tsp)","cal":40,"protein":0,"carbs":0,"fat":5},{"id":2.16,"name":"Sirloin steak (10 oz)","cal":580,"protein":72,"carbs":0,"fat":31},{"id":2.17,"name":"Cooked pasta (2 cups)","cal":420,"protein":15,"carbs":82,"fat":2},{"id":2.18,"name":"Parmesan (1 tbsp)","cal":22,"protein":2,"carbs":0,"fat":1},{"id":2.19,"name":"Bread (1 slice)","cal":80,"protein":4,"carbs":15,"fat":1},{"id":2.2,"name":"Cookie (1 medium)","cal":150,"protein":2,"carbs":20,"fat":7}],"exercise_cals":1103},{"date":"2026-04-05","items":[{"id":3.0,"name":"Oatmeal, cooked (2.5 cups)","cal":375,"protein":12,"carbs":67,"fat":7},{"id":3.1,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":3.2,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":3.3,"name":"Sugar (120g)","cal":464,"protein":0,"carbs":120,"fat":0},{"id":3.4,"name":"Banana (1 medium)","cal":105,"protein":1,"carbs":27,"fat":0},{"id":3.5,"name":"Smoothie","cal":116,"protein":10,"carbs":10,"fat":4},{"id":3.6,"name":"Assorted vegetables (2 cups)","cal":80,"protein":4,"carbs":16,"fat":0},{"id":3.7,"name":"Egg whites (2)","cal":34,"protein":7,"carbs":0,"fat":0},{"id":3.8,"name":"Lean brisket (8 oz)","cal":400,"protein":56,"carbs":0,"fat":18},{"id":3.9,"name":"Potato salad, side","cal":180,"protein":3,"carbs":22,"fat":9},{"id":3.1,"name":"Bread (1 slice)","cal":80,"protein":4,"carbs":15,"fat":1},{"id":3.11,"name":"Cookie (1)","cal":150,"protein":2,"carbs":20,"fat":7},{"id":3.12,"name":"Dinner roll (1)","cal":100,"protein":3,"carbs":18,"fat":2},{"id":3.13,"name":"Cookie, half","cal":75,"protein":1,"carbs":10,"fat":4},{"id":3.14,"name":"Crackers (6)","cal":90,"protein":2,"carbs":15,"fat":3},{"id":3.15,"name":"Macaroni and cheese (1 serving)","cal":350,"protein":12,"carbs":48,"fat":13},{"id":3.16,"name":"Filet steak (8 oz)","cal":440,"protein":60,"carbs":0,"fat":22},{"id":3.17,"name":"Side salad","cal":30,"protein":2,"carbs":5,"fat":0},{"id":3.18,"name":"Bread (2 slices)","cal":160,"protein":8,"carbs":30,"fat":2},{"id":3.19,"name":"Deviled egg (1)","cal":63,"protein":3,"carbs":1,"fat":5},{"id":3.2,"name":"Fruit pizza (1 piece)","cal":310,"protein":4,"carbs":48,"fat":12}],"exercise_cals":1651},{"date":"2026-04-06","items":[{"id":4.0,"name":"Greek yogurt, low-fat (1 cup)","cal":130,"protein":17,"carbs":9,"fat":3},{"id":4.1,"name":"PB2 Performance (\u00bd scoop)","cal":50,"protein":4,"carbs":4,"fat":2},{"id":4.2,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":4.3,"name":"Walnuts (1 tsp)","cal":20,"protein":0,"carbs":0,"fat":2},{"id":4.4,"name":"Hard boiled egg whites (2)","cal":34,"protein":7,"carbs":0,"fat":0},{"id":4.5,"name":"Deviled egg (1)","cal":63,"protein":3,"carbs":1,"fat":5},{"id":4.6,"name":"Mixed nuts (1 tbsp)","cal":50,"protein":1,"carbs":2,"fat":4},{"id":4.7,"name":"Carrots (4 baby)","cal":14,"protein":0,"carbs":3,"fat":0},{"id":4.8,"name":"Lean brisket (4.5 oz)","cal":225,"protein":32,"carbs":0,"fat":10},{"id":4.9,"name":"Cooked white rice (3 cups)","cal":618,"protein":12,"carbs":135,"fat":1},{"id":4.1,"name":"Milk, whole (\u00bc cup)","cal":37,"protein":2,"carbs":3,"fat":2},{"id":4.11,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":4.12,"name":"Lean brisket, thin slices (2, ~4 oz)","cal":200,"protein":28,"carbs":0,"fat":9},{"id":4.13,"name":"Clementine/Cutie (1)","cal":35,"protein":1,"carbs":9,"fat":0},{"id":4.14,"name":"Thin crust pizza (1 slice)","cal":200,"protein":8,"carbs":24,"fat":8},{"id":4.15,"name":"Large spinach salad with light dressing","cal":120,"protein":4,"carbs":10,"fat":7},{"id":4.16,"name":"Bunnie Grams crackers (\u00bd cup)","cal":130,"protein":2,"carbs":21,"fat":4},{"id":4.17,"name":"David protein bar (1)","cal":150,"protein":28,"carbs":14,"fat":2}],"exercise_cals":0},{"date":"2026-04-07","items":[{"id":5.0,"name":"Oatmeal, cooked (1.5 cups)","cal":225,"protein":8,"carbs":41,"fat":5},{"id":5.1,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":5.2,"name":"Honey (\u00bd tbsp)","cal":32,"protein":0,"carbs":9,"fat":0},{"id":5.3,"name":"Galaxy Cafe Buddy Bowl with Salmon","cal":706,"protein":54,"carbs":65,"fat":24},{"id":5.4,"name":"Mixed fruit (1 cup)","cal":74,"protein":1,"carbs":18,"fat":0},{"id":5.5,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":5.6,"name":"Milk, whole (\u00bc cup)","cal":37,"protein":2,"carbs":3,"fat":2},{"id":5.7,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":5.8,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":5.9,"name":"Clementine/Cutie (1)","cal":35,"protein":1,"carbs":9,"fat":0},{"id":5.1,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":5.11,"name":"PB2 Performance (1 scoop)","cal":100,"protein":8,"carbs":8,"fat":3},{"id":5.12,"name":"Coconut water (\u00bd cup)","cal":23,"protein":0,"carbs":6,"fat":0},{"id":5.13,"name":"Filet mignon (4 oz)","cal":220,"protein":28,"carbs":0,"fat":11},{"id":5.14,"name":"Lean ground beef 93/7 (4 oz)","cal":195,"protein":25,"carbs":0,"fat":10},{"id":5.15,"name":"Taco shell, hard (1)","cal":60,"protein":1,"carbs":8,"fat":3},{"id":5.16,"name":"Mixed vegetables (1 cup)","cal":80,"protein":4,"carbs":15,"fat":0},{"id":5.17,"name":"Clementine/Cutie (1)","cal":35,"protein":1,"carbs":9,"fat":0},{"id":5.18,"name":"Mixed nuts (1 tbsp)","cal":50,"protein":1,"carbs":2,"fat":4}],"exercise_cals":0},{"date":"2026-04-08","items":[{"id":6.0,"name":"Oatmeal, cooked (2.5 cups)","cal":375,"protein":12,"carbs":67,"fat":7},{"id":6.1,"name":"Honey (3 tbsp)","cal":192,"protein":0,"carbs":52,"fat":0},{"id":6.2,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":6.3,"name":"PB2 Performance (1 scoop)","cal":100,"protein":8,"carbs":8,"fat":3},{"id":6.4,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":6.5,"name":"Coconut water (1 cup)","cal":46,"protein":0,"carbs":11,"fat":0},{"id":6.6,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":6.7,"name":"Pita bread (1.5 medium)","cal":218,"protein":7,"carbs":44,"fat":2},{"id":6.8,"name":"Hummus (\u00be cup)","cal":300,"protein":12,"carbs":30,"fat":18},{"id":6.9,"name":"Salmon, cooked (3 oz)","cal":175,"protein":24,"carbs":0,"fat":8},{"id":6.1,"name":"Cooked white rice (\u00bd cup)","cal":103,"protein":2,"carbs":22,"fat":0},{"id":6.11,"name":"Mixed vegetables (\u00bd cup)","cal":40,"protein":2,"carbs":8,"fat":0},{"id":6.12,"name":"Sirloin steak, cooked (2 oz)","cal":110,"protein":16,"carbs":0,"fat":5},{"id":6.13,"name":"Cooked white rice (1\u00be cups)","cal":360,"protein":7,"carbs":79,"fat":1},{"id":6.14,"name":"Cooked white rice (3 cups)","cal":618,"protein":12,"carbs":135,"fat":1},{"id":6.15,"name":"Filet mignon (3 oz)","cal":165,"protein":21,"carbs":0,"fat":8},{"id":6.16,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":6.17,"name":"Jelly (1 tbsp)","cal":50,"protein":0,"carbs":13,"fat":0},{"id":6.18,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":6.19,"name":"Honey (\u00bd tbsp)","cal":32,"protein":0,"carbs":9,"fat":0}],"exercise_cals":896},{"date":"2026-04-09","items":[{"id":7.0,"name":"Milk, whole (\u00bc cup)","cal":37,"protein":2,"carbs":3,"fat":2},{"id":7.1,"name":"Maple syrup (1 tsp)","cal":17,"protein":0,"carbs":4,"fat":0},{"id":7.2,"name":"Matcha powder (1 tsp)","cal":3,"protein":0,"carbs":1,"fat":0},{"id":7.3,"name":"Oatmeal, cooked (1 cup)","cal":150,"protein":5,"carbs":27,"fat":3},{"id":7.4,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":7.5,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":7.6,"name":"Greek yogurt, nonfat (1 cup)","cal":130,"protein":22,"carbs":9,"fat":0},{"id":7.7,"name":"Honey (\u00bd tbsp)","cal":32,"protein":0,"carbs":9,"fat":0},{"id":7.8,"name":"Mixed nuts (1 tbsp)","cal":50,"protein":1,"carbs":2,"fat":4},{"id":7.9,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":7.1,"name":"Lean ground beef 93/7, cooked (\u00bd cup)","cal":195,"protein":25,"carbs":0,"fat":10},{"id":7.11,"name":"Cooked white rice (\u00bd cup)","cal":103,"protein":2,"carbs":22,"fat":0},{"id":7.12,"name":"Lean ground beef 93/7, cooked (\u00bc cup)","cal":98,"protein":13,"carbs":0,"fat":5},{"id":7.13,"name":"Coca-Cola (7.5 oz)","cal":90,"protein":0,"carbs":25,"fat":0},{"id":7.14,"name":"Cooked white rice (1\u00bd cups)","cal":309,"protein":6,"carbs":67,"fat":0},{"id":7.15,"name":"Smoothie \u2014 coconut water (2 cups)","cal":90,"protein":0,"carbs":22,"fat":0},{"id":7.16,"name":"Smoothie \u2014 banana (1 medium)","cal":105,"protein":1,"carbs":27,"fat":0},{"id":7.17,"name":"Smoothie \u2014 whey protein (1 scoop)","cal":120,"protein":25,"carbs":3,"fat":2},{"id":7.18,"name":"Sourdough bread, white (3 slices)","cal":360,"protein":12,"carbs":69,"fat":3},{"id":7.19,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":7.2,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":7.21,"name":"Salmon, cooked (3 oz)","cal":175,"protein":24,"carbs":0,"fat":8},{"id":7.22,"name":"Cooked white rice (2.5 cups)","cal":515,"protein":10,"carbs":113,"fat":1},{"id":7.23,"name":"Baby carrots (5)","cal":18,"protein":0,"carbs":4,"fat":0},{"id":7.24,"name":"Honey (1 tsp)","cal":21,"protein":0,"carbs":6,"fat":0},{"id":7.25,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":7.26,"name":"Jelly (\u00bd tbsp)","cal":25,"protein":0,"carbs":6,"fat":0},{"id":7.27,"name":"Sourdough bread (\u00bd slice)","cal":60,"protein":2,"carbs":12,"fat":1}],"exercise_cals":300},{"date":"2026-04-10","items":[{"id":8.0,"name":"Oatmeal, cooked (1.5 cups)","cal":225,"protein":8,"carbs":41,"fat":5},{"id":8.1,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":8.2,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":8.3,"name":"Sugar (60g)","cal":232,"protein":0,"carbs":60,"fat":0},{"id":8.4,"name":"Turkey bacon egg white English muffin","cal":250,"protein":20,"carbs":28,"fat":5},{"id":8.5,"name":"Cooked white rice (2.5 cups)","cal":515,"protein":10,"carbs":113,"fat":1},{"id":8.6,"name":"Sirloin steak, cooked (2 oz)","cal":110,"protein":16,"carbs":0,"fat":5},{"id":8.7,"name":"Egg, whole (1 large)","cal":70,"protein":6,"carbs":0,"fat":5},{"id":8.8,"name":"Kimchi (3 oz)","cal":15,"protein":1,"carbs":2,"fat":0},{"id":8.9,"name":"Coca-Cola (7.5 oz)","cal":90,"protein":0,"carbs":25,"fat":0},{"id":8.1,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":8.11,"name":"Jelly (1 tbsp)","cal":50,"protein":0,"carbs":13,"fat":0},{"id":8.12,"name":"Coca-Cola (8 oz)","cal":96,"protein":0,"carbs":26,"fat":0},{"id":8.13,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":8.14,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":8.15,"name":"Spinach salad, half","cal":40,"protein":2,"carbs":3,"fat":3},{"id":8.16,"name":"French fries, cooked (1 cup)","cal":365,"protein":4,"carbs":48,"fat":17},{"id":8.17,"name":"Salmon, cooked (7 oz)","cal":408,"protein":56,"carbs":0,"fat":19},{"id":8.18,"name":"Carrots, raw (\u00bd cup)","cal":26,"protein":1,"carbs":6,"fat":0},{"id":8.19,"name":"Fried chicken finger (1)","cal":160,"protein":12,"carbs":9,"fat":8}],"exercise_cals":1600},{"date":"2026-04-11","items":[{"id":9.0,"name":"White bagel (1)","cal":270,"protein":10,"carbs":53,"fat":1},{"id":9.1,"name":"Jelly (\u00bc cup)","cal":200,"protein":0,"carbs":52,"fat":0},{"id":9.2,"name":"Sugar (250g)","cal":968,"protein":0,"carbs":250,"fat":0},{"id":9.3,"name":"Banana, whole (1 medium)","cal":105,"protein":1,"carbs":27,"fat":0},{"id":9.4,"name":"Chips, bag (350 kcal)","cal":350,"protein":4,"carbs":35,"fat":22},{"id":9.5,"name":"Coca-Cola (20 oz)","cal":240,"protein":0,"carbs":65,"fat":0},{"id":9.6,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":9.7,"name":"Whey protein (1 scoop)","cal":120,"protein":24,"carbs":3,"fat":1},{"id":9.8,"name":"PB2 Performance (1 scoop)","cal":100,"protein":8,"carbs":8,"fat":3},{"id":9.9,"name":"Coconut water (1 cup)","cal":46,"protein":0,"carbs":11,"fat":0},{"id":9.1,"name":"Cooked white rice (3 cups)","cal":618,"protein":12,"carbs":135,"fat":1},{"id":9.11,"name":"Sweet potato, cooked (\u00bd cup)","cal":90,"protein":2,"carbs":21,"fat":0},{"id":9.12,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":9.13,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":9.14,"name":"Ramen Tatsuya \u2014 Tonkotsu ramen (est.)","cal":850,"protein":42,"carbs":65,"fat":38},{"id":9.15,"name":"David protein bar (1)","cal":150,"protein":28,"carbs":14,"fat":2}],"exercise_cals":2800},{"date":"2026-04-12","items":[{"id":10.0,"name":"Greek yogurt, nonfat (1 cup)","cal":100,"protein":17,"carbs":6,"fat":0},{"id":10.1,"name":"Peanut butter (\u00bd tbsp)","cal":47,"protein":2,"carbs":2,"fat":4},{"id":10.2,"name":"Walnuts (1 tsp)","cal":18,"protein":0,"carbs":0,"fat":2},{"id":10.3,"name":"Pear (\u00bc medium)","cal":25,"protein":0,"carbs":6,"fat":0},{"id":10.4,"name":"Cooked white rice (1\u00bd cups)","cal":309,"protein":6,"carbs":67,"fat":1},{"id":10.5,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":10.6,"name":"Sweet potato, cooked (1 cup)","cal":180,"protein":4,"carbs":41,"fat":0},{"id":10.7,"name":"Spinach, cooked (\u00bd cup)","cal":21,"protein":3,"carbs":3,"fat":0},{"id":10.8,"name":"Whey protein (1 scoop)","cal":120,"protein":24,"carbs":3,"fat":1},{"id":10.9,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":10.1,"name":"Coconut water (1 cup)","cal":46,"protein":0,"carbs":11,"fat":0},{"id":10.11,"name":"Eggs, whole (2 large)","cal":143,"protein":13,"carbs":1,"fat":10},{"id":10.12,"name":"Egg white (1 large)","cal":17,"protein":4,"carbs":0,"fat":0},{"id":10.13,"name":"Egg white (1 large)","cal":17,"protein":4,"carbs":0,"fat":0},{"id":10.14,"name":"Mixed vegetables (1 cup)","cal":80,"protein":4,"carbs":16,"fat":0},{"id":10.15,"name":"Chips (\u00bd cup / ~1 oz)","cal":140,"protein":2,"carbs":18,"fat":7},{"id":10.16,"name":"Cheese (3 oz)","cal":330,"protein":21,"carbs":3,"fat":27},{"id":10.17,"name":"Chicken breast, cooked (10 oz)","cal":463,"protein":88,"carbs":0,"fat":10},{"id":10.18,"name":"Cooked white rice (1\u00bd cups)","cal":309,"protein":6,"carbs":67,"fat":1},{"id":10.19,"name":"Bread (2 slices)","cal":160,"protein":6,"carbs":30,"fat":2},{"id":10.2,"name":"Cookie (1 medium)","cal":150,"protein":2,"carbs":20,"fat":7}],"exercise_cals":200},{"date":"2026-04-13","items":[{"id":11.0,"name":"Oatmeal, cooked (1 cup)","cal":150,"protein":5,"carbs":27,"fat":3},{"id":11.1,"name":"Greek yogurt, nonfat (1 cup)","cal":100,"protein":17,"carbs":6,"fat":0},{"id":11.2,"name":"Honey (\u00bd tbsp)","cal":32,"protein":0,"carbs":9,"fat":0},{"id":11.3,"name":"Milk, whole (\u00bd cup)","cal":73,"protein":4,"carbs":6,"fat":4},{"id":11.4,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":11.5,"name":"Lean ground beef 93/7, cooked (\u00bd cup)","cal":195,"protein":25,"carbs":0,"fat":10},{"id":11.6,"name":"Sweet potato, cooked (1 cup)","cal":180,"protein":4,"carbs":41,"fat":0},{"id":11.7,"name":"Spinach, cooked (1 cup)","cal":41,"protein":5,"carbs":7,"fat":0},{"id":11.8,"name":"Lean ground beef 93/7, cooked (1 cup)","cal":390,"protein":50,"carbs":0,"fat":20},{"id":11.9,"name":"Coconut water (8 oz)","cal":46,"protein":0,"carbs":11,"fat":0},{"id":11.1,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":11.11,"name":"Whey protein (1 scoop)","cal":120,"protein":24,"carbs":3,"fat":1},{"id":11.12,"name":"PB2 Performance (\u00bd scoop)","cal":50,"protein":4,"carbs":4,"fat":2},{"id":11.13,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":11.14,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":11.15,"name":"Spinach salad with light dressing (medium)","cal":120,"protein":4,"carbs":10,"fat":7},{"id":11.16,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":11.17,"name":"Clementine/Cutie (2)","cal":70,"protein":2,"carbs":18,"fat":0},{"id":11.18,"name":"Oatmeal, cooked (\u00bd cup)","cal":75,"protein":3,"carbs":13,"fat":1}],"exercise_cals":200},{"date":"2026-04-14","items":[{"id":12.0,"name":"Oatmeal, cooked (2 cups)","cal":300,"protein":10,"carbs":54,"fat":6},{"id":12.1,"name":"Honey (1 tsp)","cal":21,"protein":0,"carbs":6,"fat":0},{"id":12.2,"name":"Greek yogurt, nonfat (\u00be cup)","cal":75,"protein":13,"carbs":5,"fat":0},{"id":12.3,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":12.4,"name":"Spinach, cooked (1 cup)","cal":41,"protein":5,"carbs":7,"fat":0},{"id":12.5,"name":"Lean ground beef 93/7, cooked (1 cup)","cal":390,"protein":50,"carbs":0,"fat":20},{"id":12.6,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":12.7,"name":"Honey (\u00bd tbsp)","cal":32,"protein":0,"carbs":9,"fat":0},{"id":12.8,"name":"Bell peppers, cooked (\u00bd cup)","cal":20,"protein":1,"carbs":5,"fat":0},{"id":12.9,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":12.1,"name":"Egg white (1 large)","cal":17,"protein":4,"carbs":0,"fat":0},{"id":12.11,"name":"Coca-Cola (7 oz)","cal":83,"protein":0,"carbs":23,"fat":0},{"id":12.12,"name":"Flour tortilla (1 medium)","cal":146,"protein":4,"carbs":25,"fat":3},{"id":12.13,"name":"Sea bass, cooked (5 oz)","cal":165,"protein":27,"carbs":0,"fat":5},{"id":12.14,"name":"Spinach, raw (4 oz)","cal":26,"protein":3,"carbs":4,"fat":0},{"id":12.15,"name":"Sourdough bread (2 slices)","cal":240,"protein":8,"carbs":46,"fat":2},{"id":12.16,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":12.17,"name":"Flour tortilla (2 medium)","cal":292,"protein":8,"carbs":50,"fat":6},{"id":12.18,"name":"Clementine/Cutie (2)","cal":70,"protein":2,"carbs":18,"fat":0},{"id":12.19,"name":"Rice cakes, plain (3)","cal":105,"protein":2,"carbs":21,"fat":1}],"exercise_cals":1000},{"date":"2026-04-15","items":[{"id":13.0,"name":"Oatmeal, cooked (1 cup)","cal":150,"protein":5,"carbs":27,"fat":3},{"id":13.1,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":13.2,"name":"Honey (\u00bd tbsp)","cal":32,"protein":0,"carbs":9,"fat":0},{"id":13.3,"name":"Egg white (2 large)","cal":34,"protein":8,"carbs":0,"fat":0},{"id":13.4,"name":"Flour tortilla (1 medium)","cal":146,"protein":4,"carbs":25,"fat":3},{"id":13.5,"name":"Chicken pita sandwich","cal":450,"protein":30,"carbs":45,"fat":12},{"id":13.6,"name":"Mixed vegetables (\u00bd cup)","cal":40,"protein":2,"carbs":8,"fat":0},{"id":13.7,"name":"Chips, bag (350 kcal)","cal":350,"protein":4,"carbs":35,"fat":22},{"id":13.8,"name":"Protein bar (1)","cal":200,"protein":20,"carbs":20,"fat":7},{"id":13.9,"name":"Eggs, whole (3 large)","cal":215,"protein":19,"carbs":2,"fat":14},{"id":13.1,"name":"Popcorn, small bag (~3 cups)","cal":130,"protein":3,"carbs":17,"fat":7},{"id":13.11,"name":"Clementine/Cutie (2)","cal":70,"protein":2,"carbs":18,"fat":0},{"id":13.12,"name":"Pasta with cream sauce (5 cups)","cal":1275,"protein":40,"carbs":155,"fat":52},{"id":13.13,"name":"White fish, cooked (6 oz)","cal":180,"protein":39,"carbs":0,"fat":1},{"id":13.14,"name":"Cake (1 slice)","cal":350,"protein":4,"carbs":52,"fat":14},{"id":13.15,"name":"Meatball (1 large)","cal":80,"protein":7,"carbs":4,"fat":4}],"exercise_cals":0},{"date":"2026-04-16","items":[{"id":14.0,"name":"Greek yogurt, nonfat (1 cup)","cal":100,"protein":17,"carbs":6,"fat":0},{"id":14.1,"name":"Flour tortilla (1 medium)","cal":146,"protein":4,"carbs":25,"fat":3},{"id":14.2,"name":"Rice cake, plain (1)","cal":35,"protein":1,"carbs":7,"fat":0},{"id":14.3,"name":"White bagel (1)","cal":270,"protein":10,"carbs":53,"fat":1},{"id":14.4,"name":"Eggs, whole (2 large)","cal":143,"protein":13,"carbs":1,"fat":10},{"id":14.5,"name":"Cheese (1 slice/1 oz)","cal":110,"protein":7,"carbs":1,"fat":9},{"id":14.6,"name":"Doughnut, glazed (1)","cal":253,"protein":3,"carbs":34,"fat":12},{"id":14.7,"name":"Cinnamon roll (1 large)","cal":300,"protein":5,"carbs":45,"fat":11}],"exercise_cals":0},{"date":"2026-04-23","items":[{"id":40.0,"name":"Oatmeal, cooked (1 cup)","cal":150,"protein":5,"carbs":27,"fat":3},{"id":40.1,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":40.2,"name":"Cottage cheese (\u00bd cup)","cal":90,"protein":12,"carbs":5,"fat":2},{"id":40.3,"name":"Sugar (100g)","cal":387,"protein":0,"carbs":100,"fat":0},{"id":40.4,"name":"Fat source (10g)","cal":90,"protein":0,"carbs":0,"fat":10},{"id":40.5,"name":"Smoothie (coco water + whey + PB2 + honey)","cal":330,"protein":32,"carbs":39,"fat":4},{"id":40.6,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":40.7,"name":"Salmon, cooked (3 oz)","cal":175,"protein":24,"carbs":0,"fat":8},{"id":40.8,"name":"Lean ground beef 93/7, cooked (3 oz)","cal":146,"protein":19,"carbs":0,"fat":8},{"id":40.9,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":40.1,"name":"Coca-Cola (8 oz)","cal":96,"protein":0,"carbs":26,"fat":0},{"id":40.11,"name":"Meatball, half (large)","cal":40,"protein":4,"carbs":2,"fat":2},{"id":40.12,"name":"Cacio e pepe pasta (3 cups)","cal":810,"protein":27,"carbs":99,"fat":33},{"id":40.13,"name":"Bread (2 slices)","cal":160,"protein":6,"carbs":30,"fat":2},{"id":40.14,"name":"Butter (1 tbsp)","cal":102,"protein":0,"carbs":0,"fat":12},{"id":40.15,"name":"Cheese pizza (2 slices)","cal":570,"protein":24,"carbs":70,"fat":20},{"id":40.16,"name":"Small salad with light dressing","cal":80,"protein":2,"carbs":8,"fat":5}],"exercise_cals":1600},{"date":"2026-04-24","items":[{"id":41.0,"name":"Cottage cheese, low fat (\u00bd cup)","cal":90,"protein":12,"carbs":5,"fat":2},{"id":41.1,"name":"Kodiak pancake (\u00bd)","cal":95,"protein":7,"carbs":15,"fat":2},{"id":41.2,"name":"Kodiak pancake (1)","cal":190,"protein":14,"carbs":29,"fat":3},{"id":41.3,"name":"Cupcake with icing (1 medium)","cal":350,"protein":3,"carbs":52,"fat":14},{"id":41.4,"name":"Chicken noodle soup, hearty (2 cups)","cal":240,"protein":18,"carbs":28,"fat":6},{"id":41.5,"name":"Coca-Cola (8 oz)","cal":96,"protein":0,"carbs":26,"fat":0},{"id":41.6,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":41.7,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":41.8,"name":"Buttery flour tortillas (4)","cal":720,"protein":16,"carbs":100,"fat":24},{"id":41.9,"name":"Mexican tortilla chips (1 cup)","cal":140,"protein":2,"carbs":18,"fat":7},{"id":41.1,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":41.11,"name":"Black beans, cooked (\u00bd cup)","cal":114,"protein":7,"carbs":20,"fat":0}],"exercise_cals":200},{"date":"2026-04-25","items":[{"id":42.0,"name":"Kodiak pancakes (1.5)","cal":285,"protein":21,"carbs":43,"fat":5},{"id":42.1,"name":"Banana, whole (1 medium)","cal":105,"protein":1,"carbs":27,"fat":0},{"id":42.2,"name":"Maple syrup (1 tbsp)","cal":52,"protein":0,"carbs":13,"fat":0},{"id":42.3,"name":"Sugar (225g)","cal":870,"protein":0,"carbs":225,"fat":0},{"id":42.4,"name":"Starbucks egg white & turkey bacon English muffin (1)","cal":230,"protein":17,"carbs":30,"fat":5},{"id":42.5,"name":"Whey protein, vanilla (1 scoop)","cal":120,"protein":24,"carbs":3,"fat":1},{"id":42.6,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":42.7,"name":"Coconut water (1 cup)","cal":46,"protein":0,"carbs":11,"fat":0},{"id":42.8,"name":"Heritage Flakes cereal (1.5 cups)","cal":225,"protein":6,"carbs":48,"fat":2},{"id":42.9,"name":"Potato, half (medium, baked)","cal":80,"protein":2,"carbs":18,"fat":0},{"id":42.1,"name":"Egg white (1 large)","cal":17,"protein":4,"carbs":0,"fat":0},{"id":42.11,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":42.12,"name":"Coca-Cola (8 oz)","cal":96,"protein":0,"carbs":26,"fat":0},{"id":42.13,"name":"Rice cake, plain (\u00bd)","cal":18,"protein":0,"carbs":4,"fat":0},{"id":42.14,"name":"Butter roll (1 medium)","cal":180,"protein":5,"carbs":30,"fat":5},{"id":42.15,"name":"Caesar salad (\u00bd serving)","cal":150,"protein":4,"carbs":8,"fat":12},{"id":42.16,"name":"Egg, whole (1 large)","cal":72,"protein":6,"carbs":1,"fat":5},{"id":42.17,"name":"Burger, half (quarter-lb)","cal":270,"protein":18,"carbs":22,"fat":12},{"id":42.18,"name":"French fries (\u00bd serving)","cal":230,"protein":3,"carbs":30,"fat":11},{"id":42.19,"name":"Sirloin steak, cooked (4 oz)","cal":220,"protein":30,"carbs":0,"fat":11},{"id":42.2,"name":"Potatoes (\u00bd serving)","cal":130,"protein":3,"carbs":28,"fat":1},{"id":42.21,"name":"Chocolate cake (\u2153 slice)","cal":170,"protein":2,"carbs":26,"fat":7}],"exercise_cals":3100},{"date":"2026-04-26","items":[{"id":43.0,"name":"Bacon, egg, avocado & cheese sandwich","cal":520,"protein":25,"carbs":32,"fat":32},{"id":43.1,"name":"Smoothie (coco water + whey + \u00bd PB2 + \u00bd banana)","cal":269,"protein":29,"carbs":33,"fat":3},{"id":43.2,"name":"Kodiak pancake (\u2153)","cal":63,"protein":5,"carbs":14,"fat":2},{"id":43.3,"name":"Maple syrup (1 tsp)","cal":17,"protein":0,"carbs":4,"fat":0},{"id":43.4,"name":"Blueberries (10)","cal":8,"protein":0,"carbs":2,"fat":0},{"id":43.5,"name":"Coca-Cola (8 oz)","cal":96,"protein":0,"carbs":26,"fat":0},{"id":43.6,"name":"Thin crust pizza (3 slices)","cal":600,"protein":24,"carbs":72,"fat":24},{"id":43.7,"name":"Bread (2 slices)","cal":160,"protein":6,"carbs":30,"fat":2},{"id":43.8,"name":"Mixed fruit (1 cup)","cal":74,"protein":1,"carbs":18,"fat":0},{"id":43.9,"name":"Mixed vegetables (1 cup)","cal":80,"protein":4,"carbs":16,"fat":0},{"id":43.1,"name":"Cupcake with icing (1 medium)","cal":350,"protein":3,"carbs":52,"fat":14},{"id":43.11,"name":"Heritage Flakes cereal (2 cups)","cal":300,"protein":8,"carbs":64,"fat":2},{"id":43.12,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":43.13,"name":"Graham crackers (3)","cal":156,"protein":2,"carbs":28,"fat":4}],"exercise_cals":0},{"date":"2026-04-27","items":[{"id":44.0,"name":"Kodiak pancakes (1 serving)","cal":190,"protein":14,"carbs":29,"fat":3},{"id":44.1,"name":"Banana, whole (1 medium)","cal":105,"protein":1,"carbs":27,"fat":0},{"id":44.2,"name":"Blueberries (\u00bd cup)","cal":42,"protein":1,"carbs":11,"fat":0},{"id":44.3,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":44.4,"name":"Cooked pasta (3 cups)","cal":660,"protein":24,"carbs":132,"fat":3},{"id":44.5,"name":"Coca-Cola (8 oz)","cal":96,"protein":0,"carbs":26,"fat":0},{"id":44.6,"name":"Chicken noodle soup (1 cup)","cal":75,"protein":4,"carbs":9,"fat":2},{"id":44.7,"name":"Mixed nuts (1 tbsp)","cal":50,"protein":1,"carbs":2,"fat":4},{"id":44.8,"name":"Sardines, canned (1 can, 3.75oz)","cal":190,"protein":23,"carbs":0,"fat":11},{"id":44.9,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":44.1,"name":"Sugar (50g)","cal":193,"protein":0,"carbs":50,"fat":0},{"id":44.11,"name":"Spinach, raw (3 cups)","cal":21,"protein":2,"carbs":3,"fat":0},{"id":44.12,"name":"Chicken salad (\u00bd cup)","cal":200,"protein":14,"carbs":3,"fat":15},{"id":44.13,"name":"David protein bar (\u00bd)","cal":75,"protein":14,"carbs":7,"fat":1},{"id":44.14,"name":"Chocolate (3 oz)","cal":450,"protein":5,"carbs":52,"fat":26},{"id":44.15,"name":"Clementine/Cutie (1)","cal":35,"protein":1,"carbs":9,"fat":0},{"id":44.16,"name":"Rice cake, plain (\u00bd)","cal":18,"protein":0,"carbs":4,"fat":0},{"id":44.17,"name":"Peanut butter pretzels (\u00bd cup)","cal":320,"protein":8,"carbs":40,"fat":14}],"exercise_cals":1000},{"date":"2026-04-28","items":[{"id":45.0,"name":"Eggs, whole (4 large)","cal":286,"protein":25,"carbs":2,"fat":20},{"id":45.1,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":45.2,"name":"Oatmeal, cooked (1 cup)","cal":150,"protein":5,"carbs":27,"fat":3},{"id":45.3,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":45.4,"name":"Honey (\u2154 tbsp)","cal":43,"protein":0,"carbs":11,"fat":0},{"id":45.5,"name":"Smoothie (whey + \u00bd PB2 + \u00bd banana + coco water)","cal":269,"protein":29,"carbs":31,"fat":3},{"id":45.6,"name":"Cooked white rice (1\u00bd cups)","cal":309,"protein":6,"carbs":67,"fat":1},{"id":45.7,"name":"Egg, whole (1 large)","cal":72,"protein":6,"carbs":1,"fat":5},{"id":45.8,"name":"Rice cake, plain (1)","cal":35,"protein":1,"carbs":7,"fat":0},{"id":45.9,"name":"Clementine/Cutie (2)","cal":70,"protein":2,"carbs":18,"fat":0},{"id":45.1,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":45.11,"name":"Chicken breast, cooked (8 oz)","cal":370,"protein":70,"carbs":0,"fat":8},{"id":45.12,"name":"Chopped veggies with teriyaki sauce (1.5 cups)","cal":150,"protein":4,"carbs":28,"fat":2},{"id":45.13,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":45.14,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":45.15,"name":"Honey (1 tsp)","cal":21,"protein":0,"carbs":6,"fat":0}],"exercise_cals":0},{"date":"2026-04-29","items":[{"id":46.0,"name":"Oatmeal, cooked (2 cups)","cal":300,"protein":10,"carbs":54,"fat":6},{"id":46.1,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":46.2,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":46.3,"name":"Sugar (20g)","cal":77,"protein":0,"carbs":20,"fat":0},{"id":46.4,"name":"Smoothie (coconut water + whey + \u00bd PB2 + \u00bd banana)","cal":269,"protein":30,"carbs":31,"fat":3},{"id":46.5,"name":"Cooked white rice (\u00bd cup)","cal":103,"protein":2,"carbs":22,"fat":0},{"id":46.6,"name":"Veggies with teriyaki sauce (1 cup)","cal":100,"protein":3,"carbs":18,"fat":1},{"id":46.7,"name":"Grilled chicken breast (1 cup)","cal":240,"protein":45,"carbs":0,"fat":5},{"id":46.8,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":46.9,"name":"Honey (2 tbsp)","cal":128,"protein":0,"carbs":35,"fat":0},{"id":46.1,"name":"Kodiak pancake (1)","cal":190,"protein":14,"carbs":29,"fat":3},{"id":46.11,"name":"Cooked pasta (3 cups)","cal":660,"protein":24,"carbs":132,"fat":3},{"id":46.12,"name":"Chicken breast, cooked (4 oz)","cal":185,"protein":35,"carbs":0,"fat":4},{"id":46.13,"name":"Spinach, raw (2 oz)","cal":13,"protein":2,"carbs":2,"fat":0},{"id":46.14,"name":"Parmesan cheese (1 tbsp)","cal":22,"protein":2,"carbs":0,"fat":1},{"id":46.15,"name":"Greek yogurt, whole milk (\u00bd cup)","cal":110,"protein":9,"carbs":6,"fat":6},{"id":46.16,"name":"Cooked pasta (1 cup)","cal":220,"protein":8,"carbs":44,"fat":1},{"id":46.17,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1}],"exercise_cals":1400},{"date":"2026-04-30","items":[{"id":47.0,"name":"Kodiak pancake (1)","cal":190,"protein":14,"carbs":29,"fat":3},{"id":47.1,"name":"Maple syrup (3 tbsp)","cal":157,"protein":0,"carbs":39,"fat":0},{"id":47.2,"name":"Banana, half (medium)","cal":53,"protein":1,"carbs":13,"fat":0},{"id":47.3,"name":"Blueberries (\u00bd cup)","cal":42,"protein":1,"carbs":11,"fat":0},{"id":47.4,"name":"Sourdough bread (1 slice)","cal":120,"protein":4,"carbs":23,"fat":1},{"id":47.5,"name":"Graham crackers (2)","cal":104,"protein":2,"carbs":19,"fat":3},{"id":47.6,"name":"Sugar (120g)","cal":463,"protein":0,"carbs":120,"fat":0},{"id":47.7,"name":"Strip steak, cooked (8 oz)","cal":528,"protein":62,"carbs":0,"fat":30},{"id":47.8,"name":"Cooked noodles (2 cups)","cal":440,"protein":16,"carbs":88,"fat":2},{"id":47.9,"name":"Chicken breast, cooked (3 oz)","cal":139,"protein":26,"carbs":0,"fat":3},{"id":47.1,"name":"Sourdough bread (2 slices)","cal":240,"protein":8,"carbs":46,"fat":2},{"id":47.11,"name":"Honey (1 tbsp)","cal":64,"protein":0,"carbs":17,"fat":0},{"id":47.12,"name":"Clementine/Cutie (1)","cal":35,"protein":1,"carbs":9,"fat":0},{"id":47.13,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":47.14,"name":"Cooked white rice (2 cups)","cal":412,"protein":8,"carbs":90,"fat":1},{"id":47.15,"name":"Cooked white rice (1 cup)","cal":206,"protein":4,"carbs":45,"fat":0},{"id":47.16,"name":"Rice cake, plain (1)","cal":35,"protein":1,"carbs":7,"fat":0},{"id":47.17,"name":"Mixed nuts (1 tbsp)","cal":50,"protein":1,"carbs":2,"fat":4},{"id":47.18,"name":"Clementine/Cutie (1)","cal":35,"protein":1,"carbs":9,"fat":0}],"exercise_cals":1800},{"date":"2026-05-01","items":[{"id":9.0,"name":"Greek yogurt, low fat (\u2154 cup)","cal":67,"protein":11,"carbs":4,"fat":1},{"id":9.1,"name":"Honey (1 tsp)","cal":21,"protein":0,"carbs":6,"fat":0},{"id":9.2,"name":"PB2 Performance (\u00bc scoop)","cal":25,"protein":2,"carbs":2,"fat":1},{"id":9.3,"name":"Chick-fil-A nuggets (18 ct)","cal":562,"protein":61,"carbs":25,"fat":25},{"id":9.4,"name":"Chicken noodle soup (2 cups)","cal":150,"protein":8,"carbs":18,"fat":4},{"id":9.5,"name":"Rice cakes, plain (4)","cal":140,"protein":3,"carbs":28,"fat":1},{"id":9.6,"name":"Peanut butter (1 tbsp)","cal":94,"protein":4,"carbs":3,"fat":8}],"exercise_cals":0}];

// ── Nutrition fallback DB ───────────────────────────────────────────────────
const FOOD_DB = {
  cutie:              {n:"Clementine/Cutie",cal:35,p:1,c:9,f:0},
  clementine:         {n:"Clementine",cal:35,p:1,c:9,f:0},
  banana:             {n:"Banana (medium)",cal:105,p:1,c:27,f:0},
  apple:              {n:"Apple (medium)",cal:95,p:0,c:25,f:0},
  orange:             {n:"Orange (medium)",cal:62,p:1,c:15,f:0},
  rice:               {n:"White rice, cooked (1 cup)",cal:206,p:4,c:45,f:0},
  oatmeal:            {n:"Oatmeal, cooked (1 cup)",cal:150,p:5,c:27,f:3},
  egg:                {n:"Egg, whole",cal:72,p:6,c:1,f:5},
  chicken:            {n:"Chicken breast (4oz)",cal:185,p:35,c:0,f:4},
  salmon:             {n:"Salmon (3oz)",cal:175,p:24,c:0,f:8},
  yogurt:             {n:"Greek yogurt, nonfat (1 cup)",cal:100,p:17,c:6,f:0},
  honey:              {n:"Honey (1 tbsp)",cal:64,p:0,c:17,f:0},
  "rice cake":        {n:"Rice cake, plain",cal:35,p:1,c:7,f:0},
  sourdough:          {n:"Sourdough bread (1 slice)",cal:120,p:4,c:23,f:1},
  bread:              {n:"Bread (1 slice)",cal:80,p:3,c:15,f:1},
  pasta:              {n:"Pasta, cooked (1 cup)",cal:220,p:8,c:44,f:1},
  coke:               {n:"Coca-Cola (8 oz)",cal:96,p:0,c:26,f:0},
  "peanut butter":    {n:"Peanut butter (1 tbsp)",cal:94,p:4,c:3,f:8},
  whey:               {n:"Whey protein (1 scoop)",cal:120,p:24,c:3,f:1},
  kodiak:             {n:"Kodiak pancake (1)",cal:190,p:14,c:29,f:3},
  sugar:              {n:"Sugar (100g)",cal:387,p:0,c:100,f:0},
  nuts:               {n:"Mixed nuts (1 tbsp)",cal:50,p:1,c:2,f:4},
  milk:               {n:"Whole milk (1 cup)",cal:149,p:8,c:12,f:8},
  "whole milk":       {n:"Whole milk (1 cup)",cal:149,p:8,c:12,f:8},
  "skim milk":        {n:"Skim milk (1 cup)",cal:83,p:8,c:12,f:0},
  "almond milk":      {n:"Almond milk (1 cup)",cal:39,p:1,c:3,f:3},
  "coconut water":    {n:"Coconut water (1 cup)",cal:46,p:0,c:11,f:0},
  "cottage cheese":   {n:"Cottage cheese (½ cup)",cal:90,p:12,c:5,f:2},
  steak:              {n:"Steak, cooked (4oz)",cal:220,p:30,c:0,f:11},
  beef:               {n:"Ground beef (4oz)",cal:280,p:26,c:0,f:19},
  tuna:               {n:"Tuna, canned (3oz)",cal:100,p:22,c:0,f:1},
  avocado:            {n:"Avocado (half)",cal:120,p:1,c:6,f:11},
  spinach:            {n:"Spinach, raw (1 cup)",cal:7,p:1,c:1,f:0},
  blueberries:        {n:"Blueberries (½ cup)",cal:42,p:1,c:11,f:0},
  strawberries:       {n:"Strawberries (1 cup)",cal:49,p:1,c:12,f:0},
  tortilla:           {n:"Flour tortilla (medium)",cal:146,p:4,c:25,f:3},
  pizza:              {n:"Pizza, cheese (1 slice)",cal:285,p:12,c:36,f:10},
  burger:             {n:"Hamburger (1 patty)",cal:295,p:17,c:24,f:14},
  fries:              {n:"French fries (medium)",cal:365,p:4,c:48,f:17},
  "greek yogurt":     {n:"Greek yogurt, nonfat (1 cup)",cal:100,p:17,c:6,f:0},
  "maple syrup":      {n:"Maple syrup (1 tbsp)",cal:52,p:0,c:13,f:0},
  "olive oil":        {n:"Olive oil (1 tbsp)",cal:119,p:0,c:0,f:14},
  butter:             {n:"Butter (1 tbsp)",cal:102,p:0,c:0,f:12},
  cheese:             {n:"Cheese (1 oz)",cal:110,p:7,c:1,f:9},
  turkey:             {n:"Turkey breast (3oz)",cal:135,p:26,c:0,f:3},
  "protein bar":      {n:"Protein bar",cal:200,p:20,c:22,f:6},
  "sweet potato":     {n:"Sweet potato (medium)",cal:103,p:2,c:24,f:0},
  potato:             {n:"Potato (medium)",cal:161,p:4,c:37,f:0},
  "black beans":      {n:"Black beans (½ cup)",cal:114,p:7,c:20,f:0},
  soup:               {n:"Chicken noodle soup (1 cup)",cal:75,p:4,c:9,f:2},
  crackers:           {n:"Crackers (1 serving)",cal:130,p:2,c:19,f:5},
  granola:            {n:"Granola (¼ cup)",cal:149,p:4,c:24,f:5},
  "protein powder":   {n:"Protein powder (1 scoop)",cal:120,p:24,c:3,f:1},
  creatine:           {n:"Creatine (5g)",cal:0,p:0,c:0,f:0},
  bagel:              {n:"Bagel (1 medium)",cal:270,p:10,c:53,f:1},
  "english muffin":  {n:"English muffin (1)",cal:134,p:4,c:26,f:1},
  waffle:             {n:"Waffle (1)",cal:218,p:6,c:25,f:11},
  pancake:            {n:"Pancake (1 medium)",cal:175,p:5,c:22,f:7},
  muffin:             {n:"Muffin (1 medium)",cal:340,p:5,c:49,f:14},
  croissant:          {n:"Croissant (1)",cal:231,p:5,c:26,f:12},
  "pita bread":       {n:"Pita bread (1)",cal:165,p:5,c:33,f:1},
  wrap:               {n:"Flour wrap (1 large)",cal:210,p:5,c:35,f:5},
  cereal:             {n:"Cereal (1 cup)",cal:150,p:3,c:32,f:1},
  granola:            {n:"Granola (¼ cup)",cal:149,p:4,c:24,f:5},
  "cottage cheese":   {n:"Cottage cheese, low fat (½ cup)",cal:90,p:12,c:5,f:2},
  "cream cheese":     {n:"Cream cheese (1 tbsp)",cal:51,p:1,c:1,f:5},
  "sour cream":       {n:"Sour cream (2 tbsp)",cal:60,p:1,c:1,f:6},
  "chocolate milk":   {n:"Chocolate milk (1 cup)",cal:208,p:8,c:26,f:8},
  "protein shake":    {n:"Protein shake (1 scoop whey + water)",cal:120,p:24,c:3,f:1},
  "string cheese":    {n:"String cheese (1)",cal:80,p:6,c:1,f:6},
  "hard boiled egg":  {n:"Hard boiled egg (1)",cal:72,p:6,c:1,f:5},
  "scrambled eggs":   {n:"Scrambled eggs (2 large)",cal:182,p:12,c:2,f:14},
  "fried egg":        {n:"Fried egg (1)",cal:90,p:6,c:0,f:7},
  shrimp:             {n:"Shrimp, cooked (3oz)",cal:84,p:18,c:0,f:1},
  tilapia:            {n:"Tilapia, cooked (4oz)",cal:145,p:30,c:0,f:3},
  cod:                {n:"Cod, cooked (4oz)",cal:119,p:26,c:0,f:1},
  pork:               {n:"Pork tenderloin, cooked (4oz)",cal:187,p:29,c:0,f:7},
  "ham":              {n:"Ham (2oz)",cal:91,p:11,c:2,f:5},
  "ground turkey":    {n:"Ground turkey, cooked (4oz)",cal:193,p:22,c:0,f:11},
  edamame:            {n:"Edamame (½ cup)",cal:94,p:9,c:8,f:4},
  "kidney beans":     {n:"Kidney beans (½ cup)",cal:112,p:8,c:20,f:0},
  lentils:            {n:"Lentils, cooked (½ cup)",cal:115,p:9,c:20,f:0},
  hummus:             {n:"Hummus (2 tbsp)",cal:70,p:2,c:6,f:4},
  broccoli:           {n:"Broccoli (1 cup)",cal:55,p:4,c:11,f:1},
  "mixed veggies":    {n:"Mixed vegetables (1 cup)",cal:80,p:4,c:16,f:0},
  salad:              {n:"Side salad with light dressing",cal:80,p:2,c:8,f:5},
  "caesar salad":     {n:"Caesar salad (1 cup)",cal:150,p:4,c:8,f:12},
  "chocolate":        {n:"Dark chocolate (1oz)",cal:155,p:2,c:17,f:9},
  "protein cookie":   {n:"Protein cookie (1)",cal:220,p:15,c:25,f:7},
  "rice krispies":    {n:"Rice Krispies (1 cup)",cal:130,p:2,c:29,f:0},
  "cheerios":         {n:"Cheerios (1 cup)",cal:100,p:3,c:20,f:2},
  "pop tart":         {n:"Pop-Tart (1)",cal:200,p:2,c:37,f:5},
  "oreo":             {n:"Oreos (3 cookies)",cal:160,p:1,c:25,f:7},
  cupcake:            {n:"Cupcake with icing (1)",cal:350,p:3,c:52,f:14},
  "ice cream":        {n:"Ice cream (½ cup)",cal:137,p:2,c:16,f:7},
  chips:              {n:"Potato chips (1oz)",cal:152,p:2,c:15,f:10},
  pretzels:           {n:"Pretzels (1oz)",cal:108,p:3,c:23,f:1},
  popcorn:            {n:"Popcorn (3 cups)",cal:110,p:3,c:22,f:1},
  "trail mix":        {n:"Trail mix (¼ cup)",cal:173,p:5,c:17,f:11},
  "energy drink":     {n:"Energy drink (1 can)",cal:110,p:1,c:28,f:0},
  "sports drink":     {n:"Sports drink (12oz)",cal:80,p:0,c:21,f:0},
  "orange juice":     {n:"Orange juice (8oz)",cal:112,p:2,c:26,f:0},
  "apple juice":      {n:"Apple juice (8oz)",cal:114,p:0,c:28,f:0},
};

function parseQty(str) {
  str = str.trim().toLowerCase();
  if (str === "half" || str === "1/2") return 0.5;
  if (str === "1/3" || str === "third") return 0.33;
  if (str === "2/3") return 0.67;
  if (str === "1/4" || str === "quarter") return 0.25;
  if (str === "3/4") return 0.75;
  if (str === "a" || str === "an" || str === "one") return 1;
  const n = parseFloat(str);
  return isNaN(n) ? 1 : n;
}

// Convert a quantity+unit to a multiplier relative to the food DB serving
function convertToDBServing(qty, unit, foodKey) {
  // Food DB servings: milk=1 cup(8oz), rice=1 cup, chicken=4oz, salmon=3oz, etc.
  const ozPerCup = 8;
  unit = (unit || "").toLowerCase().trim();

  // oz conversions for foods stored per cup
  const cupFoods = ["milk","whole milk","skim milk","almond milk","coconut water","soup","yogurt","greek yogurt","oatmeal","rice","pasta"];
  if ((unit === "oz" || unit === "fl oz") && cupFoods.some(f => foodKey.includes(f))) {
    return qty / ozPerCup; // convert oz to fraction of 1 cup
  }
  // oz conversions for foods stored per oz or specific oz serving
  const ozFoods = { chicken: 4, salmon: 3, beef: 4, steak: 4, turkey: 3, tuna: 3 };
  if (unit === "oz") {
    for (const [key, dbOz] of Object.entries(ozFoods)) {
      if (foodKey.includes(key)) return qty / dbOz;
    }
  }
  // tbsp
  if (unit === "tbsp" || unit === "tablespoon") {
    const tbspFoods = ["honey","maple syrup","peanut butter","olive oil","butter","nuts"];
    if (tbspFoods.some(f => foodKey.includes(f))) return qty; // DB is already per tbsp
  }
  // cups — DB is already per cup for most
  if (unit === "cup" || unit === "cups") return qty;
  // g for sugar
  if (unit === "g" && foodKey.includes("sugar")) return qty / 100; // DB sugar is per 100g
  return qty; // fallback: treat as multiplier
}

function fallbackParse(input) {
  const phrases = input.toLowerCase().split(/[,;]+/).map(s => s.trim()).filter(Boolean);
  const results = [];
  for (const phrase of phrases) {
    // Strip leading action words like "add", "log", "ate", "had", "eat"
    const cleaned = phrase.replace(/^(add|log|ate|had|eat|i ate|i had|please add)\s+/i, "").trim();
    for (const [key, food] of Object.entries(FOOD_DB)) {
      if (cleaned.includes(key)) {
        // Find qty+unit anywhere before the food name in the cleaned phrase
        const beforeFood = cleaned.slice(0, cleaned.indexOf(key)).trim();
        const qtyMatch = beforeFood.match(/([\d.]+\/[\d.]+|[\d.]+|half|quarter|third|a|an|one)\s*(oz|fl oz|cup|cups|tbsp|tablespoon|tsp|g|ml)?$/i);
        const rawQty = qtyMatch ? parseQty(qtyMatch[1]) : 1;
        const unit = qtyMatch ? (qtyMatch[2] || "") : "";
        const qty = convertToDBServing(rawQty, unit, key);
        const label = unit ? `${rawQty}${unit}` : (rawQty !== 1 ? `×${rawQty}` : "");
        results.push({
          name: label ? `${food.n.split("(")[0].trim()} (${label})` : food.n,
          cal: Math.round(food.cal * qty),
          protein: Math.round(food.p * qty),
          carbs: Math.round(food.c * qty),
          fat: Math.round(food.f * qty),
        });
        break;
      }
    }
  }
  return results;
}

// ── Supabase helpers ───────────────────────────────────────────────────────
async function sbFetch(path, options = {}) {
  const res = await fetch(SUPABASE_URL + "/rest/v1/" + path, {
    ...options,
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": "Bearer " + SUPABASE_KEY,
      "Content-Type": "application/json",
      "Prefer": "return=representation",
      ...(options.headers || {}),
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

async function seedHistoricalData() {
  try {
    await sbFetch("macro_days?on_conflict=date", {
      method: "POST",
      headers: { "Prefer": "resolution=ignore-duplicates,return=minimal" },
      body: JSON.stringify(HISTORICAL_ROWS),
    });
  } catch (e) { console.warn("Seed skipped:", e.message); }
}

async function fetchAllDays() {
  return sbFetch("macro_days?select=*&order=date.asc");
}

async function upsertDay(date, items) {
  return sbFetch("macro_days?on_conflict=date", {
    method: "POST",
    headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify([{ date, items }]),
  });
}

// ── AI parser ──────────────────────────────────────────────────────────────
async function parseFoodWithAI(input) {
  // Step 1: Try local DB first (instant, no API needed)
  const localResult = fallbackParse(input);
  if (localResult.length > 0) return localResult;

  // Step 2: Try Claude API with web search tool enabled
  const prompt = `You are a nutrition expert. The user has described food they ate.
Look up accurate nutrition info and parse it into individual items with macros.
User input: "${input}"
Respond ONLY with a JSON array. No markdown, no explanation.
Example: [{"name":"Whole milk 3oz","cal":56,"protein":3,"carbs":4,"fat":3}]
Rules: cal/protein/carbs/fat are integers. name includes quantity. Be accurate — use real nutrition data.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) throw new Error("API " + res.status);
    const data = await res.json();
    // Extract text from content blocks (may include tool_use blocks from web search)
    const textBlock = data.content?.find(b => b.type === "text");
    const text = textBlock?.text || "[]";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    if (parsed.length > 0) return parsed;
    throw new Error("empty");
  } catch(e) {
    throw new Error("Couldn't recognize that food — try being more specific (e.g. '3oz whole milk')");
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────
function dateLabel(iso) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });
}
function computeTotals(items = []) {
  return items.reduce((a, i) => ({ cal:a.cal+(i.cal||0), protein:a.protein+(i.protein||0), carbs:a.carbs+(i.carbs||0), fat:a.fat+(i.fat||0) }), {cal:0,protein:0,carbs:0,fat:0});
}

// ── Components ─────────────────────────────────────────────────────────────
function MacroBar({ label, value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom:8 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3, color:"#94a3b8" }}>
        <span>{label}</span><span style={{ color:"#e2e8f0" }}>{value.toFixed(1)} g/kg</span>
      </div>
      <div style={{ height:4, background:"#1e293b", borderRadius:2, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${pct}%`, background:color, borderRadius:2, transition:"width 0.4s" }} />
      </div>
    </div>
  );
}

function FoodItem({ item, onDelete }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", borderRadius:8, background:"#0f172a", border:"1px solid #1e293b", marginBottom:6 }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, color:"#e2e8f0", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{item.name}</div>
        <div style={{ fontSize:11, color:"#64748b", marginTop:2 }}>{item.cal} cal · {item.protein}P · {item.carbs}C · {item.fat}F</div>
      </div>
      <button onClick={onDelete} style={{ background:"none", border:"none", color:"#334155", cursor:"pointer", fontSize:16, padding:"2px 6px" }}
        onMouseEnter={e=>e.target.style.color="#ef4444"} onMouseLeave={e=>e.target.style.color="#334155"}>×</button>
    </div>
  );
}

function TrendChart({ points, lines, W, H, PL, PR, PT, PB, cW, cH, xOf, yOf, path, area, maxVal, gridVals, n }) {
  const [hovered, setHovered] = useState(null);
  return (
    <svg width={W} height={H} style={{ display:"block", minWidth:W }} onMouseLeave={()=>setHovered(null)}>
      {gridVals.map(v => (
        <g key={v}>
          <line x1={PL} x2={W-PR} y1={yOf(v)} y2={yOf(v)} stroke="#1e293b" strokeWidth="1" />
          <text x={PL-4} y={yOf(v)+4} textAnchor="end" fontSize="9" fill="#334155">{v}</text>
        </g>
      ))}
      {lines.filter(l=>l.tMax<=maxVal).map(l => (
        <rect key={l.key+"band"} x={PL} width={cW} y={yOf(l.tMax)} height={Math.max(yOf(l.tMin)-yOf(l.tMax),0)} fill={l.color} fillOpacity="0.07" />
      ))}
      {lines.map(l => <path key={l.key+"area"} d={area(l.key)} fill={l.color} fillOpacity="0.07" />)}
      {lines.map(l => <path key={l.key} d={path(l.key)} fill="none" stroke={l.color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />)}
      {points.map((p,i) => (
        <g key={i} onMouseEnter={()=>setHovered(i)} style={{cursor:"default"}}>
          <rect x={xOf(i)-14} y={PT} width={28} height={cH} fill="transparent" />
          {lines.map(l => <circle key={l.key} cx={xOf(i)} cy={yOf(p[l.key])} r={hovered===i?5:3} fill={l.color} stroke="#020817" strokeWidth="1.5" />)}
        </g>
      ))}
      {hovered !== null && (() => {
        const p = points[hovered]; const x = xOf(hovered);
        const tipW=112, tipH=74;
        const tx = Math.min(Math.max(x-tipW/2, PL), W-PR-tipW);
        return (
          <g>
            <rect x={tx} y={PT+4} width={tipW} height={tipH} rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
            <text x={tx+8} y={PT+18} fontSize="10" fill="#64748b">{p.date}</text>
            {lines.map((l,li) => (
              <g key={l.key}>
                <rect x={tx+8} y={PT+26+li*16} width={8} height={8} rx="2" fill={l.color} />
                <text x={tx+20} y={PT+34+li*16} fontSize="10" fill="#e2e8f0">{l.label}: {p[l.key]}</text>
              </g>
            ))}
          </g>
        );
      })()}
      {points.map((p,i) => {
        const step = Math.max(1, Math.ceil(n/7));
        if (i % step !== 0 && i !== n-1) return null;
        return <text key={i} x={xOf(i)} y={H-6} textAnchor="middle" fontSize="9" fill="#334155">{p.date}</text>;
      })}
    </svg>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
export default function MacroTracker() {
  const [days, setDays] = useState({});
  const [activeDay, setActiveDay] = useState(new Date().toISOString().split("T")[0]);
  const [input, setInput] = useState("");
  const [parsing, setParsing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("today");
  const inputRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  const loadData = useCallback(async (showStatus=false) => {
    try {
      await seedHistoricalData();
      const rows = await fetchAllDays();
      const mapped = {};
      rows.forEach(r => { mapped[r.date] = { items: r.items || [] }; });
      setDays(mapped);
      if (showStatus) setError("✅ Synced " + rows.length + " days");
    } catch (e) {
      const fallback = {};
      HISTORICAL_ROWS.forEach(r => { fallback[r.date] = { items: r.items || [] }; });
      setDays(fallback);
      setError("⚠️ Offline — showing cached data");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const dayData = days[activeDay] || { items: [] };
  const totals = computeTotals(dayData.items);

  async function handleAddFood(e) {
    e.preventDefault();
    if (!input.trim()) return;
    setParsing(true); setError("");
    try {
      const newItems = await parseFoodWithAI(input.trim());
      if (!newItems.length) throw new Error("No items parsed");
      const tagged = newItems.map(it => ({ ...it, id: Date.now() + Math.random() }));
      const updated = [...dayData.items, ...tagged];
      setSaving(true);
      await upsertDay(activeDay, updated);
      setDays(prev => ({ ...prev, [activeDay]: { items: updated } }));
      setInput("");
    } catch(e) { setError(e.message || "Couldn't parse that food"); }
    setParsing(false); setSaving(false);
    inputRef.current?.focus();
  }

  async function handleDeleteItem(itemId) {
    const updated = dayData.items.filter(i => i.id !== itemId);
    await upsertDay(activeDay, updated);
    setDays(prev => ({ ...prev, [activeDay]: { items: updated } }));
  }

  const sortedDays = Object.keys(days).sort().reverse();
  const allDaysAsc = Object.entries(days).filter(([,d])=>d.items&&d.items.length>0).sort(([a],[b])=>a.localeCompare(b));

  if (loading) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100vh", background:"#020817", color:"#334155", fontFamily:"monospace", flexDirection:"column", gap:12 }}>
      <div style={{ fontSize:20, animation:"spin 1s linear infinite" }}>↻</div>
      <div style={{ fontSize:11, letterSpacing:2 }}>LOADING</div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"#020817", fontFamily:"'DM Mono','Fira Code','Courier New',monospace", color:"#e2e8f0", maxWidth:480, margin:"0 auto", paddingBottom:80 }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        textarea, input { outline: none; }
        textarea::placeholder, input::placeholder { color: #334155; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ padding:"24px 20px 16px", borderBottom:"1px solid #0f172a" }}>
        <div style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:4 }}>
          <span style={{ fontSize:11, letterSpacing:3, color:"#334155", textTransform:"uppercase" }}>Macro</span>
          <span style={{ fontSize:22, fontWeight:700, color:"#f8fafc", letterSpacing:-1 }}>Tracker</span>
          {saving && <span style={{ fontSize:10, color:"#38bdf8", marginLeft:"auto", animation:"spin 0.8s linear infinite", display:"inline-block" }}>↻</span>}
        </div>
        <div style={{ fontSize:11, color:"#475569", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span>{dateLabel(today)}</span>
          <button onClick={()=>loadData(true)} style={{ background:"none", border:"1px solid #1e293b", borderRadius:6, padding:"3px 10px", color:"#475569", cursor:"pointer", fontSize:10, letterSpacing:1 }}>↺ Sync</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid #0f172a", padding:"0 20px" }}>
        {["today","trends","history"].map(t => (
          <button key={t} onClick={()=>{ setView(t); if(t==="today") setActiveDay(today); }}
            style={{ background:"none", border:"none", cursor:"pointer", padding:"10px 14px 10px 0", fontSize:11, letterSpacing:2, textTransform:"uppercase", color:view===t?"#38bdf8":"#334155", borderBottom:view===t?"2px solid #38bdf8":"2px solid transparent", transition:"all 0.15s", marginBottom:-1 }}>
            {t}
          </button>
        ))}
      </div>

      {view === "today" ? (
        <div style={{ padding:"16px 20px" }}>
          {/* Date picker */}
          <div style={{ marginBottom:12, display:"flex", alignItems:"center", gap:8 }}>
            <input
              type="date"
              value={activeDay}
              max={today}
              onChange={e => {
                const d = e.target.value;
                if (d) {
                  setActiveDay(d);
                  // Initialize empty day if it doesn't exist
                  if (!days[d]) {
                    setDays(prev => ({ ...prev, [d]: { items: [] } }));
                  }
                }
              }}
              style={{
                flex:1, background:"#0f172a", border:"1px solid #1e293b",
                borderRadius:8, padding:"7px 10px", color:"#e2e8f0",
                fontSize:12, fontFamily:"inherit", cursor:"pointer",
              }}
            />
            {activeDay !== today && (
              <button onClick={()=>setActiveDay(today)}
                style={{ background:"none", border:"1px solid #1e293b", borderRadius:8, padding:"7px 12px", color:"#38bdf8", cursor:"pointer", fontSize:11, whiteSpace:"nowrap", fontFamily:"inherit" }}>
                ← Today
              </button>
            )}
          </div>

          {/* Totals card */}
          <div style={{ background:"#0a1628", border:"1px solid #1e293b", borderRadius:12, padding:16, marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16 }}>
              <div>
                <div style={{ fontSize:32, fontWeight:700, color:"#f8fafc", letterSpacing:-2, lineHeight:1 }}>{totals.cal.toLocaleString()}</div>
                <div style={{ fontSize:10, color:"#475569", letterSpacing:2, textTransform:"uppercase", marginTop:2 }}>calories</div>
              </div>
            </div>
            <MacroBar label="Protein" value={totals.protein/BODY_WEIGHT_KG} max={2.2} color="#38bdf8" />
            <MacroBar label="Carbs"   value={totals.carbs/BODY_WEIGHT_KG}   max={8}   color="#a78bfa" />
            <MacroBar label="Fat"     value={totals.fat/BODY_WEIGHT_KG}     max={1.2} color="#fb923c" />
          </div>

          {/* Food input */}
          <form onSubmit={handleAddFood} style={{ marginBottom:16 }}>
            <div style={{ position:"relative" }}>
              <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); handleAddFood(e); } }}
                placeholder="What did you eat? e.g. 3 cuties, 2 cups rice, 4oz salmon"
                rows={2}
                style={{ width:"100%", background:"#0f172a", border:"1px solid #1e293b", borderRadius:10, padding:"12px 50px 12px 14px", color:"#e2e8f0", fontSize:13, resize:"none", fontFamily:"inherit", lineHeight:1.5 }}
                onFocus={e=>e.target.style.borderColor="#38bdf8"}
                onBlur={e=>e.target.style.borderColor="#1e293b"}
              />
              <button type="submit" disabled={parsing||!input.trim()} style={{ position:"absolute", right:8, top:"50%", transform:"translateY(-50%)", background:parsing?"#0f172a":"#38bdf8", border:"none", borderRadius:6, padding:"6px 10px", cursor:parsing?"not-allowed":"pointer", color:parsing?"#38bdf8":"#020817", fontSize:14 }}>
                {parsing ? <span style={{ display:"inline-block", animation:"spin 0.8s linear infinite" }}>↻</span> : "↑"}
              </button>
            </div>
            {error && <div style={{ fontSize:11, color:error.startsWith("✅")?"#22c55e":error.startsWith("⚠️")?"#eab308":"#ef4444", marginTop:6, paddingLeft:4 }}>{error}</div>}
          </form>


          {/* Smoothie shortcut */}
          <button onClick={async () => {
            const smoothieItems = [{
              id: Date.now() + Math.random(),
              name: "Smoothie (coco water + whey + sugar + creatine)",
              cal: 228, protein: 24, carbs: 30, fat: 1
            }];
            const updated = [...dayData.items, ...smoothieItems];
            setSaving(true);
            try {
              await upsertDay(activeDay, updated);
              setDays(prev => ({ ...prev, [activeDay]: { items: updated } }));
            } catch(e) {
              setDays(prev => ({ ...prev, [activeDay]: { items: updated } }));
            }
            setSaving(false);
          }} style={{
            width:"100%", padding:"10px", marginBottom:16,
            background:"#0f172a", border:"1px solid #1e293b",
            borderRadius:10, color:"#38bdf8", cursor:"pointer",
            fontSize:12, fontFamily:"inherit", letterSpacing:1,
            textAlign:"left", display:"flex", alignItems:"center", gap:8,
            transition:"border-color 0.15s"
          }}
          onMouseEnter={e=>e.currentTarget.style.borderColor="#38bdf8"}
          onMouseLeave={e=>e.currentTarget.style.borderColor="#1e293b"}>
            <span style={{fontSize:16}}>🥤</span>
            <div>
              <div style={{fontWeight:700}}>Smoothie</div>
              <div style={{fontSize:10, color:"#475569", marginTop:2}}>Coco water · Whey · 16g sugar · 10g creatine · 228 cal · 24P · 30C · 1F</div>
            </div>
          </button>
          <div style={{ fontSize:10, color:"#334155", textTransform:"uppercase", letterSpacing:2, marginBottom:10 }}>{dayData.items.length} items</div>
          {dayData.items.length === 0
            ? <div style={{ textAlign:"center", color:"#1e293b", fontSize:13, padding:"40px 0" }}>Nothing logged yet</div>
            : dayData.items.map(item => <FoodItem key={item.id} item={item} onDelete={()=>handleDeleteItem(item.id)} />)
          }
        </div>

      ) : view === "history" ? (
        <div style={{ padding:"16px 20px" }}>
          {(() => {
            if (!allDaysAsc.length) return <div style={{ textAlign:"center", color:"#1e293b", fontSize:13, padding:"40px 0" }}>No data yet</div>;
            const totalsArr = [...allDaysAsc].reverse().map(([iso,d]) => {
              const t = computeTotals(d.items);
              return { iso, cal:t.cal, protein:t.protein, carbs:t.carbs, fat:t.fat };
            });
            const n = totalsArr.length;
            const avg = k => Math.round(totalsArr.reduce((s,d)=>s+d[k],0)/n);
            const avgCal=avg("cal"), avgP=avg("protein"), avgC=avg("carbs"), avgF=avg("fat");
            return (<>
              <div style={{ fontSize:10, color:"#334155", textTransform:"uppercase", letterSpacing:2, marginBottom:10 }}>{n}-Day Averages</div>
              <div style={{ background:"#0a1628", border:"1px solid #1e293b", borderRadius:12, padding:16, marginBottom:16 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {[
                    {l:"Avg Calories", v:avgCal.toLocaleString(), c:"#f8fafc", u:"kcal"},
                    {l:"Avg Protein",  v:`${avgP}g`, c:"#38bdf8", u:`${(avgP/BODY_WEIGHT_KG).toFixed(1)}/kg`},
                    {l:"Avg Carbs",    v:`${avgC}g`, c:"#a78bfa", u:`${(avgC/BODY_WEIGHT_KG).toFixed(1)}/kg`},
                    {l:"Avg Fat",      v:`${avgF}g`, c:"#fb923c", u:`${(avgF/BODY_WEIGHT_KG).toFixed(1)}/kg`},
                  ].map(m => (
                    <div key={m.l} style={{ background:"#0f172a", borderRadius:8, padding:"10px 12px" }}>
                      <div style={{ fontSize:20, fontWeight:700, color:m.c }}>{m.v}</div>
                      <div style={{ fontSize:9, color:"#475569", textTransform:"uppercase", letterSpacing:1 }}>{m.l}</div>
                      <div style={{ fontSize:10, color:"#64748b", marginTop:2 }}>{m.u}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ fontSize:10, color:"#334155", textTransform:"uppercase", letterSpacing:2, marginBottom:10 }}>Day by Day</div>
              <div style={{ background:"#0a1628", border:"1px solid #1e293b", borderRadius:12, overflow:"hidden" }}>
                <div style={{ display:"grid", gridTemplateColumns:"80px 1fr 55px 45px 45px 45px", gap:4, padding:"8px 12px", borderBottom:"1px solid #0f172a" }}>
                  {["Date","","Cal","P","C","F"].map(h=><div key={h} style={{ fontSize:9, color:"#334155", textTransform:"uppercase", letterSpacing:1 }}>{h}</div>)}
                </div>
                {totalsArr.map(({iso,cal,protein,carbs,fat},i) => (
                  <div key={iso} onClick={()=>{setActiveDay(iso);setView("today");}}
                    style={{ display:"grid", gridTemplateColumns:"80px 1fr 55px 45px 45px 45px", gap:4, padding:"8px 12px", borderBottom:i<totalsArr.length-1?"1px solid #0a1628":"none", cursor:"pointer" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#0f172a"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <div style={{ fontSize:11, color:"#64748b" }}>{new Date(iso+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"})}</div>
                    <div />
                    <div style={{ fontSize:11, color:"#e2e8f0" }}>{cal.toLocaleString()}</div>
                    <div style={{ fontSize:11, color:"#38bdf8" }}>{protein}</div>
                    <div style={{ fontSize:11, color:"#a78bfa" }}>{carbs}</div>
                    <div style={{ fontSize:11, color:"#fb923c" }}>{fat}</div>
                  </div>
                ))}
              </div>
            </>);
          })()}
        </div>

      ) : view === "trends" ? (
        <div style={{ padding:"16px 20px" }}>
          {(() => {
            if (allDaysAsc.length < 2) return <div style={{ textAlign:"center", color:"#1e293b", fontSize:13, padding:"40px 0" }}>Need at least 2 days of data</div>;
            const points = allDaysAsc.map(([iso, d]) => {
              const t = computeTotals(d.items);
              return {
                date: new Date(iso+"T12:00:00").toLocaleDateString("en-US",{month:"short",day:"numeric"}),
                protein: Math.round((t.protein/BODY_WEIGHT_KG)*10)/10,
                carbs: Math.round((t.carbs/BODY_WEIGHT_KG)*10)/10,
                fat: Math.round((t.fat/BODY_WEIGHT_KG)*10)/10,
              };
            });
            const allVals = points.flatMap(p => [p.protein, p.carbs, p.fat]);
            const maxVal = Math.ceil(Math.max(...allVals)) + 1;
            const W=440,H=220,PL=36,PR=16,PT=20,PB=44;
            const cW=W-PL-PR, cH=H-PT-PB, n=points.length;
            const xOf = i => PL+(i/(n-1))*cW;
            const yOf = v => PT+cH-(v/maxVal)*cH;
            const mkPath = key => points.map((p,i)=>`${i===0?"M":"L"}${xOf(i).toFixed(1)},${yOf(p[key]).toFixed(1)}`).join(" ");
            const mkArea = key => `${mkPath(key)} L${xOf(n-1).toFixed(1)},${(PT+cH).toFixed(1)} L${PL},${(PT+cH).toFixed(1)} Z`;
            const gridVals = Array.from({length:Math.ceil(maxVal/2)+1},(_,i)=>i*2).filter(v=>v<=maxVal);
            const lines = [
              {key:"protein",color:"#38bdf8",label:"Protein",tMin:1.6,tMax:2.2},
              {key:"carbs",  color:"#a78bfa",label:"Carbs",  tMin:6,  tMax:8},
              {key:"fat",    color:"#fb923c",label:"Fat",    tMin:0.8,tMax:1.2},
            ];
            return (<>
              <div style={{ fontSize:10, color:"#334155", textTransform:"uppercase", letterSpacing:2, marginBottom:10 }}>Macros by Day (g/kg)</div>
              <div style={{ display:"flex", gap:16, marginBottom:12 }}>
                {lines.map(l=>(
                  <div key={l.key} style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:16, height:2, background:l.color, borderRadius:1 }} />
                    <span style={{ fontSize:11, color:"#64748b" }}>{l.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ background:"#0a1628", border:"1px solid #1e293b", borderRadius:12, overflowX:"auto", padding:"8px 0 4px" }}>
                <TrendChart points={points} lines={lines} W={W} H={H} PL={PL} PR={PR} PT={PT} PB={PB} cW={cW} cH={cH} xOf={xOf} yOf={yOf} path={mkPath} area={mkArea} maxVal={maxVal} gridVals={gridVals} n={n} />
              </div>
              <div style={{ marginTop:16 }}>
                {[
                  { label:"3-Day Avg",  n:3  },
                  { label:"7-Day Avg",  n:7  },
                  { label:"30-Day Avg", n:30 },
                ].map(({ label, n: windowN }) => {
                  const slice = points.slice(-windowN);
                  const avgMacro = key => slice.length
                    ? Math.round(slice.reduce((s,p)=>s+p[key],0)/slice.length*10)/10
                    : "—";
                  return (
                    <div key={label} style={{ background:"#0a1628", border:"1px solid #1e293b", borderRadius:10, padding:"12px 14px", marginBottom:8 }}>
                      <div style={{ fontSize:9, color:"#475569", textTransform:"uppercase", letterSpacing:2, marginBottom:10 }}>{label}</div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                        {lines.map(l => (
                          <div key={l.key}>
                            <div style={{ fontSize:18, fontWeight:700, color:l.color }}>{avgMacro(l.key)}</div>
                            <div style={{ fontSize:9, color:"#475569", textTransform:"uppercase", letterSpacing:1, marginTop:2 }}>{l.label} g/kg</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>);
          })()}
        </div>

      ) : null}
    </div>
  );
}
