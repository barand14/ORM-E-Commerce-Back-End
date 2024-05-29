const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `localhost:3001/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:[Product]
  })
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).json(err));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, { include: [Product] })
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(data);
    })
    .catch(err => res.status(400).json(err));
});


router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then(data => res.status(200).json({ message: 'Category created successfully!', data }))
  .catch(err => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id }
  })
    .then(() => Category.findByPk(req.params.id)) // Find updated category
    .then(updatedCategory => {
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(updatedCategory);
    })
    .catch(err => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({ where: { id: req.params.id } })
  .then(data => { // data will be the number of rows deleted
    if (!data) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully!' });
  })
  .catch(err => res.status(400).json(err));
});

module.exports = router;
