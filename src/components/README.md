# COMPONENTS

Section for storing components and containers.
Components should be decomposed.


## Example
Suppose there is some kind of product card in an online store. It has a picture and some description.

The card can be called: `product-card.component.tsx`, and it would be logical to put it in
section `components/product/product-card`.
The description `description` can be generic, or it can be directly related to the product card.

- В первом случае компонент должен располагаться в разделе `components/description` в итоге получится такой путь: `components/description/description.component.tsx`,
- In the second case, the path will be like this: `components/product/product-card/description/product-card-description.component.tsx`.

It is worth noting that the name of the component in these cases will be different.

Recommended maximum nesting (depth) = 3. This will allow you to create more general/reusable components.

