const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxLength: [40, 'A tour name must have max 40 characters'],
      minLength: [10, 'A tour must have minimum 10 characters'],
      // validator: [validator.isAlpha, 'Tour name must only contain characters'],
    },
    slug: { type: String },
    duration: { type: Number, required: [true, 'Duration is mandatory'] },
    maxGroupSize: { type: Number, required: [true, 'group size mandatory'] },
    difficulty: {
      type: String,
      required: [true, 'Difficulty is mandatory'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4,
      min: [1, 'The ratings must be above 1.0'],
      max: [5, 'The ratings must be below or equal 5.0'],
    },
    ratingsQuantity: { type: Number, default: 0 },
    price: { type: Number, required: [true, 'A tour must have a price'] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          //this only points to current document on new document creation. Will not work on update
          return val < this.price;
        },
        message: 'Discount cannot be greater than sales price',
      },
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true,
    },
    description: {
      type: String,
      // required: [true, 'Description is mandatory'],
      trim: true,
    },
    imageCover: { type: String, required: [true, 'Image is Mandatory'] },
    images: [String],
    createdAt: { type: Date, default: Date.now(), select: false },
    startDates: [Date],
    secretTour: { type: Boolean, default: false },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//document middleware.. runs before save and create
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

//Query middleware

tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

//aggregation middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
