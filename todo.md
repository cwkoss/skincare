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
Gentle <> Active OR Soothing <> Stimulating
Prevents Acne <> Moisturizes Intensely
Light <> Heavy or Penetrating <> Occlusive

New user flow:
- User makes the above choices then
-- For each phase
--- User is presented with 3 suggestions for the phase, each with a description.  
--- User chooses one before moving to the next phase, or can reroll with a text area for a description of what they are looking for
-- After all phases are complete, there is a final step for choosing proportions of the phases. 

Boolean choice
- Do you wish to only use plant derived ingredients? 
- All fragrances options are from plant derived essential oils that offer skin benefits. Do you wish to include these fragrances or would you like to minimize fragrance? 


--- Next steps --- 

- DONE Make summary take user to a blank page, switched with devFeature
- DONE Replace that blank page with a "AI is working on options for your recipe" loading page
- DONE When page loads, show user with 3 phase options

- DONE Update recipe context to include the new phase format for recipes. Have it initialize with an empty copy of each phase
- CHANGED - computed via currentphase at time of use - Make recipecontext.getNextEmptyPhase
- DONE When user clicks a phase option and next, send the phase to recipecontext
- DONE When user clicks a phase option, go to nextEmptyPhase
? DECIDE - should preservatives be a static object rather than hitting AI?
- DONE - Write 3 example phase options for each phase type for AI examples. 
- DONE - Make actually AI call to load phase options (not just dummy copy)
- Have recipecontext save to a session/user specific 
- CSS the PhaseChoices page
- Make page for choosing emulsifier, proportion and consistency (I think this should be before phase choices?)

- Create user login mechanism tied to google authentication
- once all phases are chosen does the user need to choose phase proportions? maybe it is just automatic... 
- How does the user pick their variation?  is that just a single 3-choice after the initial recipe is decided?
- if user makes choice fast, they get another loading page, but we should try to load the subsequent phase in the background, so if the user takes some time to think they don't have to wait for the next phase.

----

New intake questionaire
- Skin type (dry, oily, combination)
- Do you have sensitive skin? (yes no)
- Do you have any specific goals for your skincare routine (e.g., brightening, anti-aging, hydration)?
- What are your primary skincare concerns (e.g., acne, wrinkles, dryness, dark spots)?
- Do you have any known skin allergies or sensitivities? Are there any ingredients you prefer to avoid?
- What is your age range?
- How much time are you willing to spend on your skincare routine each day?


---


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