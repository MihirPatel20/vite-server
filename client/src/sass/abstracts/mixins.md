## Mixins Usage Manual

This manual provides step-by-step instructions on how to use the mixins defined in the SCSS code.

### 1. Flex-Center Mixin

The `flex-center` mixin is used to center elements using flexbox.

**Usage:**

1. Import the required mixin and map:

```scss
@use "sass:map";

// Import the mixin file containing the flex-center mixin
@use "path/to/flex-center-mixin-file";
```

2. Apply the mixin to the desired selector:

```scss
.my-element {
  @include flex-center;
}
```

This will center the `.my-element` horizontally and vertically using flexbox.

3. (Optional) Customize the flex direction:

```scss
.another-element {
  @include flex-center(col);
}
```

By passing `col` as an argument, the flex direction will be set to column, resulting in vertical centering.

### 2. Media Query Mixin (mq)

The `mq` mixin allows you to apply styles within specific media query breakpoints.

**Usage:**

1. Import the required mixin and map:

```scss
@use "sass:map";

// Import the mixin file containing the mq mixin
@use "path/to/mq-mixin-file";
```

2. Apply the mixin and define styles within the desired breakpoint:

```scss
.my-element {
  @include mq(sm) {
    // Styles applied for screens smaller than or equal to the "sm" breakpoint
    color: red;
  }

  @include mq(md) {
    // Styles applied for screens smaller than or equal to the "md" breakpoint
    color: blue;
  }
}
```

The styles defined inside each `@include mq(...)` block will only be applied when the screen width is less than or equal to the specified breakpoint size.

### Additional Notes

- Ensure that the mixin file and required maps are properly imported into your SCSS project.
- Adjust the values in the `$breakpoints` map to match your desired breakpoint sizes.
- Experiment with different styles and properties to achieve the desired visual effects.
- Refer to the main SCSS file for more mixins and variables that can be utilized in your project.

---
&nbsp;

&nbsp;

By following these step-by-step instructions and examples, you can effectively utilize the provided mixins in your SCSS code. Feel free to customize the mixin usage and explore additional options to meet your specific design and layout requirements.

Please note that the `path/to/flex-center-mixin-file` and `path/to/mq-mixin-file` should be replaced with the actual paths to the SCSS files containing the respective mixins.

## Variables

The following variables are used to customize various aspects of the SCSS code.

### Fonts

- `$font-body`: Specifies the font family for the body text.
- `$font-heading`: Specifies the font family for headings.

### Spacing

- `$spacing-default`: Sets the default spacing value, which can be used for margins, paddings, or other spacing-related properties.

### Breakpoints

- `$breakpoint-sm`: Defines the size for the small breakpoint in media queries.
- `$breakpoint-md`: Defines the size for the medium breakpoint in media queries.
- `$breakpoint-lg`: Defines the size for the large breakpoint in media queries.
- `$breakpoint-xl`: Defines the size for the extra-large breakpoint in media queries.

Adjust these variables according to your design requirements to achieve the desired visual effects.

---

By utilizing the provided mixins and customizing the variables, you can create flexible and responsive SCSS code that meets your specific design needs. Experiment with different options and explore further possibilities to enhance your project's
