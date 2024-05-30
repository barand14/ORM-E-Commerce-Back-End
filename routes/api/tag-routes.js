const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [Product],
  })
    .then(tags => res.status(200).json(tags))
    .catch(err => {
      console.error(err); // Use a proper logging mechanism
      res.status(400).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findByPk(req.params.id, {
    include: [Product],
  })
    .then(tag => {
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(200).json(tag);
    })
    .catch(err => {
      console.error(err); // Use a proper logging mechanism
      res.status(400).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new tag
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Tag name is required' });
  }

  Tag.create({ name })
    .then(tag => res.status(200).json(tag))
    .catch(err => {
      console.error(err); // Use a proper logging mechanism
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Tag name is required' });
  }

  Tag.update({ name }, { where: { id: req.params.id } })
    .then(updated => {
      if (!updated) {
        return res.status(404).json({ message: 'Tag not found' });
      }
      res.status(200).json({ message: 'Tag updated successfully' });
    })
    .catch(err => {
      console.error(err); // Use a proper logging mechanism
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tag => res.json(tag))
    .catch(err => res.status(404).json(err))
});

module.exports = router;
