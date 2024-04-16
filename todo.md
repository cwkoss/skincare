Goals for launch

- AI generates a recipe that is broken down by phase (could be multiple calls)
- Normalize phase based recipe to ensure 
--- Contains appropriate amount of emulsifier if has both water and oil phases
--- Make sure proportions of each phase type are reasonably balanced
- User is able to "chat" with AI to update rather than having to manually adjust recipe (though manual mode should still be an option).  This could either be freetext or with a 'suggestions' based button interface
- Do a better job of explaining what the user should expect from their recipe.  This could be based on the scales I prototyped or something else, but I'd like something more illustrative than a paragraph of text. 
- Revist design of site
- Update new ingredients


User choices for recipe dichotomies
Gentle <> Active
Prevents Acne <> Moisturizes Intensely
Light <> Heavy or Penetrating <> Occlusive

Boolean choice
- Do you wish to only use plant derived ingredients? 
- All fragrances options are from plant derived essential oils that offer skin benefits. Do you wish to include these fragrances or would you like to minimize fragrance? 


----


- finish out phaseselection
-- Add additive mode for proportions
-- switch proportions from percentages to 'parts' and compute percentages
-- Should ingredient selection and proportion management be two different pages?
-- How should the user flow work? Should there be back and forward buttons?  
-- Should there be a way to get further AI input while a user has made changes?
-- Build way to convert all phases into a single unified recipe that adds up to 100% and uses sane proportions every time (even if AI suggests something wacky)
-- Improve the design of phaseselection components
-- Have phase selection replace recipebuilder
-- clean up recipebuilder 


- enforce emulsifier requirement
- Make AI drop user on finalizeRecipe instead of proportion seletor, automatically round to 100%
- pass goals, product, fragrance and commentary into saved recipe
- Build variation selector
- Ingredient selector update - pick exclude, maybe, include


DONE
- build page that computes weights from target weight and proportions "prep assist" tool
- Build review page
- Style other pages so they all have a center column with fixed width like the homepage. 