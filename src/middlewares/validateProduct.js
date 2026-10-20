const { z } = require("zod");

const productSchema = z.object({
  name: z.string().trim().min(1),
  price: z.number().positive(),
  stock: z.number().int().min(0)
});

const validateProduct = (req, res, next) => {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      errors: result.error.issues
    });
  }

  req.body = result.data;
  next();
};

module.exports = validateProduct;