const { Salads } = require("../models");

const saladsData = [
  {
    name: 'Cesar Salad',
    ingredients: ['1 head romaine heart, chopped', '2 oz. parmesan cheese, shredded', 'dash pepper (optional)', 'croutons', 'Asiago Caesar dressing to taste'].join(''),
    filename: 'cesar-salads.jpg'
  },
  {
    name: 'Garden Salad',
    ingredients: ['1 head romaine, chopped', '2 tomatoes, wedges', '1/4 cucumber, sliced', '1/2 cup mixed cherry tomatoes', ' 1 oz. red onion, thinly sliced', '2 oz. parmesan, shaved', 'Your favorite dressing'].join(''),
    filename: 'garden-salad.jpg'
  },
  {
    name: 'Easy Fruit Salad',
    ingredients: ['1 pineapple, chopped', '1/2 carton strawberries, quartered', '1/2 pkg. green grapes', '1/2 pkg. red grapes', '3 kiwi, cut', '1 can mandarins, drained', '1 carton red raspberries', '1 carton blackberries', '1/4 cup honey', '2 Tbsp fresh lime juice'].join(''),
    filename: 'fruit-salad.jpg'
  },
  {
    name: 'Potato Salad',
    ingredients: ['4 potatoes', '8 Tbsp mayonnaise', '2 tsp vinegar (optional)', '1/2 Tbsp sugar', '1 cucumber, chopped', '2 boiled eggs', '2 ham slices, diced', 'salt and pepper'].join(''),
    filename: 'potato-salad.jpg'
  },
  {
    name: 'BBQ Chicken Santa Fe Salad',
    ingredients: ['2 BBQ chicken thighs', 'iceberg lettuce', 'feta cheese', 'sweet corn', 'green olives', 'carrots, sliced', 'strawberries', 'salt and pepper', 'Your favorite dressing'].join(''),
    filename: 'bbq-chicken-sf-salad.jpg'
  }
];

const seedSalads = () => Salads.bulkCreate(saladsData);

module.exports = seedSalads; 