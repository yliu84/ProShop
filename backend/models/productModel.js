import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
    {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
      maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    images: [
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    brand: {
      type: String,
      required: [true, 'Please enter product brand'],
    },
    category: {
      type: String,
      required: [true, 'Please select category for this product'],
      enum: {
          values: [
              'Electronics',
              'Cameras',
              'Laptops',
              'Accessories',
              'Headphones',
              'Food',
              'Books',
              'Clothes/Shoes',
              'Beauty/Health',
              'Sports',
              'Outdoor',
              'Home'
          ],
          message: 'Please select correct category for product'
      }
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
      trim: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      default: 0.0
    },
    countInStock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product