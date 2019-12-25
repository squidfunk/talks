# Cognitive CSS Complexity

## Author @3m

- My background
- Why research CSS?
- State of research in CSS

## Motivation / Problem @2m

- What problem are we trying to solve?
- Motivating examples

> We want to increase our confidence when changing styles

## A brief introduction to CSS @5m

- How do HTML and CSS play together?
- How do CSS selectors work?
  - Location
  - Specificity
- Cascade and inheritance
  - What is the CSS cascade?
  - What is CSS inheritance?
    - Unintended changes
    - !importants
  - What is CSS specificity?

> Location and Specificity are the two primary factors how styles are applied
> We'll leave out inheritance for now to keep things simple

## A brief introduction to Software Complexity

### in general @5m

- What is complexity (in software)?
- Why measure complexity?
- How is complexity measured?
  - McCabe, Cyclomatic etc.
  - Cognitive Complexity (vs. computational complexity!)
  - Always related to branching

> Complexity is a good indicator on how expensive changes to our software are

### in CSS @10m

- Why can't we apply classical software complexity metrics to CSS?
- How is CSS complexity currently defined?
- What are shortcomings of this approach?
- What are tools I can use?
  - Descriptive statistics
  - Specificity graph
    https://jonassebastianohlsson.com/specificity-graph/

> Complexity in CSS is too high-level and has no dynamic nature

## Towards Cognitive CSS Complexity

TODO: probably too much oriented in inheritance-related problems

- CSS spans a possibility space
    https://www.edge.org/response-detail/10071
  - The possibility space is constructed by creating every possible combination
    - The union of all possible documents
    - How can we collapse certain dimensions in the space?
- How can we constraint this possibility space?
  - Use classes (BEM, etc.)
  - Scope rules (introduce boundaries)
    - Shadow DOM
    - CSS Modules
    - Not always possible

> The real complexity of CSS is tied to the runtime.

One of the most widely-useful (but not widely-understood) scientific concepts 
is that of a possibility space. This is a way of thinking precisely about 
complex situations. Possibility spaces can be difficult to get your head around, 
but once you learn how to use them, they are a very powerful way to reason, 
because they allow you to sidestep thinking about causes and effects.
