(this.webpackJsonpskincare=this.webpackJsonpskincare||[]).push([[0],{16:function(e,t,n){e.exports=n(25)},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(14),o=n.n(i),s=(n(23),n(24),n(7)),l=n(2);var c=function(e){let{setGoalsData:t,setSelectedMoodsApp:n,setIncludeFragranceApp:i}=e;const o=Object(l.o)(),[s,c]=Object(a.useState)([]),[d,u]=Object(a.useState)("no"),[m,p]=Object(a.useState)([]),h=e=>m.includes(e);return r.a.createElement("div",null,r.a.createElement("h2",null,"Select Your Skincare Goals/Concerns"),r.a.createElement("form",{onSubmit:e=>{e.preventDefault(),t(s),n(m),i(d),o("/product")}},["Adult acne","Dry skin","Sensitive Skin","Wrinkles","Puffiness","Redness","Sun Protection","Aging or age spots","Large pores","Atopic dermatitis"].map((e,t)=>{return r.a.createElement("button",{key:t,type:"button",onClick:()=>(e=>{const t=s.includes(e)?s.filter(t=>t!==e):[...s,e];c(t)})(e),className:"goals-button ".concat((n=e,s.includes(n)?"selected":""))},e);var n}),r.a.createElement("div",null,r.a.createElement("h3",null,"Include natural fragrances?"),r.a.createElement("button",{type:"button",onClick:()=>u("yes"),className:"goals-button ".concat("yes"===d?"selected":"")},"Yes"),r.a.createElement("button",{type:"button",onClick:()=>u("no"),className:"goals-button ".concat("no"===d?"selected":"")},"No")),"yes"===d&&r.a.createElement("div",null,r.a.createElement("h3",null,"How do you want the fragrance to make you feel?"),["Fresh","Relaxing","Invigorated","Pampered","Focused","Beautiful","Confident","Rejuvenated","Empowered"].map((e,t)=>r.a.createElement("button",{key:t,type:"button",onClick:()=>(e=>{const t=m.includes(e)?m.filter(t=>t!==e):[...m,e];p(t)})(e),className:"goals-button ".concat(h(e)?"selected":"")},e))),r.a.createElement("button",{className:"submit",type:"submit",disabled:0===s.length||"yes"===d&&0===m.length},"Next")))};var d=function(e){let{setProductData:t}=e;const n=Object(l.o)(),[i,o]=Object(a.useState)("");return r.a.createElement("div",{className:"product-container"},r.a.createElement("h2",null,"Select a Skincare Product Type"),r.a.createElement("form",{onSubmit:e=>{e.preventDefault(),t(i),n("/summary")}},Object.entries({"Daytime Moisturizing Cream with SPF":"An invigorating morning cream that hydrates your skin while providing sun protection with natural zinc oxide, perfect for applying after your morning cleanse to keep your skin soft and shielded throughout the day.","Moisturizing Cream (No SPF)":"Ideal for night-time nourishment or for daytime use under your preferred sunscreen, this cream deeply moisturizes your skin, leaving it feeling smooth and refreshed","Face Oil":"Designed to deeply nourish and rejuvenate your skin, best used in combination with a separate SPF product during the day to ensure full sun protection while maintaining radiant skin.","Scalp Oil":"A soothing and revitalizing scalp oil formulated to nourish your scalp and strengthen hair roots, perfect for daily use to maintain a healthy, hydrated scalp environment."}).map(e=>{let[t,n]=e;return r.a.createElement("div",{key:t},r.a.createElement("button",{type:"button",onClick:()=>{o(t)},className:i===t?"selected":""},t.charAt(0).toUpperCase()+t.slice(1)),r.a.createElement("p",{className:i===t?"selected":""},n))}),r.a.createElement("button",{className:"submit",type:"submit",disabled:!i},"Next")))};var u={"Sunflower Oil":{phase:"oil",hlb:0,description:"Moisturizer, rich in Vitamin E, non-comedogenic, suitable for sensitive skin.",good_for:["Sensitive Skin","Dry skin"],bad_for:[],cost:"$20/half gallon",density:.92,cost_per_g:.01148},"Jojoba Oil":{phase:"oil",hlb:0,description:"Moisturizer, mimics natural skin oils, balances sebum production, good for acne-prone skin.",good_for:["Adult acne","Dry skin","Sensitive Skin"],bad_for:[],cost:"$9.99/8oz",density:.87,cost_per_g:.0485},"Argan Oil":{phase:"oil",hlb:11,description:"Rich in antioxidants and Vitamin E, moisturizes, reduces signs of aging, improves skin elasticity and enhances hair shine.",good_for:["Aging or age spots","Dry skin","Wrinkles"],bad_for:[],cost:"$54.99/32oz",density:.91,cost_per_g:.0639,buy_again_url:"https://www.organicpureoil.com/product/pure-1-oz-organic-argan-oil-extra-virgin-unrefined-cold-pressed/"},"Shea Butter":{phase:"oil",hlb:8,description:"Moisturizer, rich in fatty acids and vitamins, anti-inflammatory, helps with skin healing.",good_for:["Dry skin","Atopic dermatitis"],bad_for:["Adult acne"],cost:"$9.99/16oz",density:.927,cost_per_g:.0228},"Cocoa Butter":{phase:"oil",hlb:8,description:"Moisturizer, high in fatty acids, helps to hydrate and nourish the skin, reduces the appearance of scars.",good_for:["Dry skin","Wrinkles"],bad_for:["Adult acne"],cost:"$1/oz",cost_per_g:.0338,buy_again_url:"https://simply-ingredients.com/collections/butters-waxes/products/fair-trade-cocoa-butter?variant=37889946484922"},"Coconut Oil":{phase:"oil",hlb:8,description:"Moisturizes skin and hair, rich in fatty acids and antioxidants. Can be comedogenic (acne-causing) for some.",good_for:["Dry skin"],bad_for:["Adult acne"],cost:"$6.96/15oz",density:.924,cost_per_g:.017},"Pecan Oil":{phase:"oil",hlb:0,description:"Moisturizer, rich in antioxidants, promotes skin and hair health, hydrating properties.",good_for:["Dry skin"],bad_for:[],cost:"$17/8oz",density:.95,cost_per_g:.0756},"Pumpkin Seed Oil":{phase:"oil",hlb:0,description:"Rich in zinc and vitamins, improves skin tone, fights acne, and soothes sensitive skin.",good_for:["Adult acne","Sensitive Skin"],bad_for:[],cost:"$3/2oz",density:.95,cost_per_g:.0534},"Olive Oil":{phase:"oil",hlb:0,description:"Moisturizer, rich in vitamins and antioxidants, promotes skin and hair health, but can be comedogenic (acne-causing) for some.",good_for:["Dry skin"],bad_for:["Adult acne"],cost:"$18.99/68oz",density:.9,cost_per_g:.0105},"Distilled Water":{phase:"aqueous",hlb:20,description:"Hydrates and serves as a base for water-soluble ingredients.",good_for:[],bad_for:[],cost_per_g:1e-4},"Green Tea":{phase:"aqueous",hlb:20,description:"Antioxidant-rich, reduces inflammation and redness, can protect against environmental stressors and promotes skin healing.",good_for:["Redness","Puffiness","Sensitive Skin"],bad_for:[],cost_per_g:.007},"Sea Salt":{phase:"aqueous",hlb:20,description:"Rich in minerals, helps in detoxifying and cleansing the skin, can balance oil production.",good_for:["Large pores","Atopic dermatitis"],bad_for:["Dry skin"]},"Aloe Vera Gel":{phase:"aqueous",hlb:20,description:"Soothes skin irritations, hydrates, promotes healing, good for sunburns and inflammation",good_for:["Sensitive Skin","Sun Protection","Redness"],bad_for:[],cost:"9.99/300ml",density:1.2,cost_per_g:.02775},Glycerin:{phase:"aqueous",hlb:20,description:"Humectant, draws moisture into the skin, suitable for all skin types, enhances skin hydration.",good_for:["Dry skin"],bad_for:[],cost:"3.66/4oz",density:1.26,cost_per_g:.0246},Honey:{phase:"aqueous",hlb:20,description:"Natural humectant, antibacterial, great for acne treatment and hydration, soothing for the skin.",good_for:["Dry skin","Adult acne"],bad_for:[]},"Apple Cider Vinegar":{phase:"aqueous",hlb:20,description:"Balances skin's pH, astringent properties, good for acne-prone skin but can be drying.",good_for:["Adult acne","Large pores"],bad_for:["Dry skin"]},"Cucumber Juice":{phase:"aqueous",hlb:20,description:" Hydrating, soothing, rich in vitamins and minerals, good for puffiness and calming irritated skin.",good_for:["Puffiness","Sensitive Skin"],bad_for:[]},"Oat Milk":{phase:"aqueous",hlb:20,description:"Contains lipids and water-absorbing substances, providing moisturizing and soothing benefits. Helps in reducing inflammation",good_for:["Dry skin","Sensitive Skin"],bad_for:[]},Beeswax:{phase:"emulsifier",hlb:12,description:" Emulsifier and stabilizer in formulations, creates a protective barrier on the skin, retains moisture.",good_for:["Dry skin"],bad_for:[],cost_per_g:.1706},Lecithin:{phase:"emulsifier",hlb:8,description:"Natural stabilizer, thickens formulas and creates protective barrier on skin.",good_for:[],bad_for:[],cost_per_g:.0884},"Cetearyl Alcohol":{phase:"emulsifier",hlb:16,description:"A waxy fatty alcohol used as an emulsifier, thickener and stabilizer in creams and lotions. Extracted from Coconut and Palm Kernel oils",good_for:[],bad_for:["Sensitive Skin"],cost_per_g:.0439},"Castille Soap":{phase:"surfactant",hlb:"10",description:"Gentle and versatile cleanser, made from olive and hemp oils, suitable for sensitive skin.",good_for:["Sensitive Skin"],bad_for:[],density:1.04,cost_per_g:.0172},"Zinc Oxide":{phase:"additive",hlb:0,max_percent:25,default_percent:10,description:"Sunscreen agent, provides broad-spectrum UV protection, also known for its soothing and astringent properties.",good_for:["Sun Protection"],bad_for:[],cost_per_g:.0958},"Hyaluronic Acid":{phase:"additive",hlb:20,max_percent:2,default_percent:.5,description:"Powerful humectant, helps to hydrate and plump the skin by retaining moisture, reduces the appearance of fine lines and wrinkles.",good_for:["Dry skin","Wrinkles","Aging or age spots"],bad_for:[],cost_per_g:.4639},Retinol:{phase:"additive",hlb:0,max_percent:1,default_percent:.1,description:"A form of Vitamin A, helps in skin renewal, boosts collagen production, effective against aging signs. Should be used intermittently until skin aclimates to it. Sun sensitizing, so should only be used at night.",good_for:["Wrinkles","Aging or age spots"],bad_for:["Sensitive Skin"],cost_per_g:.4282},"Vitamin C":{phase:"additive",hlb:20,max_percent:20,default_percent:5,description:"Antioxidant, aids in skin repair and regeneration, can help in reducing pigmentation and promoting collagen production.",good_for:["Aging or age spots","Sun Protection"],bad_for:[],cost_per_g:.0288},"Vitamin E":{phase:"additive",hlb:0,max_percent:1,default_percent:.5,description:"Antioxidant, helps in protecting the skin from environmental damage, moisturizes, and heals. Extends shelf life of oils.",good_for:["Sun Protection","Aging or age spots"],bad_for:[],density:.95,cost_per_g:.3505},"Niacinamide (Vitamin B3)":{phase:"additive",hlb:20,max_percent:5,default_percent:2,description:"Improves appearance of enlarged pores, uneven skin tone, fine lines. Reduces redness and irritation.",good_for:["Large pores","Wrinkles","Redness"],bad_for:[],cost_per_g:.3567},"Lavender Oil":{phase:"additive",hlb:0,max_percent:1,default_percent:.5,description:"Calming and relaxing, and can be used to soothe irritated skin. Anti-inflammatory and antimicrobial properties.",good_for:["Sensitive Skin","Redness"],bad_for:[],density:.885,cost_per_g:1.1578},"Rosemary Oil":{phase:"additive",hlb:0,max_percent:2,default_percent:1,description:"Rejuvenates skin, improves hair growth and scalp health, and has antioxidant properties. Improves circulation and can help with puffiness.",good_for:["Aging or age spots"],bad_for:["Sensitive Skin"],density:.895,cost_per_g:.1214},"Tea Tree Oil":{phase:"additive",hlb:0,max_percent:2,default_percent:1,description:"Antimicrobial and anti-inflammatory, very effective against acne, helps in cleansing the skin.",good_for:["Adult acne"],bad_for:["Dry skin"],density:.878,cost_per_g:.3792},"Jasmine Oil":{phase:"additive",hlb:0,max_percent:1,default_percent:.5,description:"Moisturizes, soothes, often used for its fragrance and hydrating properties.",good_for:["Dry skin"],bad_for:[],density:.947,cost_per_g:2.7434},"Eucalyptus Oil":{phase:"additive",hlb:0,max_percent:2,default_percent:1,description:"Antiseptic and anti-inflammatory properties, good for healing. Refreshing scent.",good_for:["Adult acne"],bad_for:["Sensitive Skin","Dry skin"],densitY:.914,cost_per_g:.153},"Peppermint Oil":{phase:"additive",hlb:0,max_percent:1,default_percent:.5,description:"Cooling sensation and refreshing scent. It has antiseptic and antimicrobial properties. Can help with acne and oily skin, but can be irritating.",good_for:["Adult acne","Puffiness"],bad_for:["Sensitive Skin","Redness"],density:.898,cost_per_g:.0942},"Pine Oil":{phase:"additive",hlb:0,max_percent:1,default_percent:.5,description:"Known for its invigorating and refreshing scent, has antimicrobial and anti-inflammatory properties. It's often used in skincare for its soothing effects on the skin and its ability to help with respiratory issues.",good_for:["Atopic dermatitis","Adult acne"],bad_for:["Sensitive Skin"],cost_per_g:1.155},"Cedar Oil":{phase:"additive",hlb:0,max_percent:1,default_percent:.5,description:"With its woodsy aroma, is known for its calming and grounding effects. It has antiseptic, anti-inflammatory, and astringent properties, making it beneficial for skin conditions like acne and aiding in soothing irritated skin.",good_for:["Adult acne","Atopic dermatitis"],bad_for:["Sensitive Skin"],density:.952,cost_per_g:1.7507},"Rosehip Seed Oil":{phase:"oil",hlb:0,max_percent:10,default_percent:2,description:"Rosehip Seed Oil is rich in essential fatty acids and antioxidants. It's renowned for its skin-regenerative properties, aiding in reducing scars and fine lines. High in vitamins A and C, it helps in evening out skin tone and improving hydration.",good_for:["Wrinkles","Dry skin","Sun Protection","Aging or age spots"],bad_for:[],density:.92,cost_per_g:.6159},"Geranium Oil":{phase:"additive",hlb:0,max_percent:2,default_percent:.5,description:"Geranium Oil, known for its floral scent, is used for its astringent, antiseptic, and anti-inflammatory properties. It helps in balancing sebum production, enhancing skin elasticity, and promoting the healing of scars and spots.",good_for:["Adult acne","Large pores","Wrinkles"],bad_for:["Sensitive Skin"],density:.887,cost_per_g:1.5031},"Carrot Seed Oil":{phase:"additive",hlb:0,max_percent:5,default_percent:1,description:"Carrot Seed Oil is valued for its antioxidant properties and high vitamin A content. It's considered excellent for sun protection, rejuvenating aged skin, and promoting skin healing. Also known for its ability to rejuvenate and regenerate skin tissues.",good_for:["Aging or age spots","Sun Protection","Wrinkles"],bad_for:["Sensitive Skin"],density:.92,cost_per_g:1.5942},Turmeric:{phase:"additive",hlb:0,max_percent:1,default_percent:.5,description:" Anti-inflammatory, antimicrobial, helps in improving skin tone and reducing scars.",good_for:["Redness","Adult acne","Atopic dermatitis"],bad_for:[]},"Tepezcohuite Mimosa Tenuiflora Infusion":{phase:"aqueous",hlb:0,max_percent:10,default_percent:5,description:"Rich in tannins and antioxidants, known for its healing, regenerative, and antimicrobial properties. Used to soothe skin conditions, promote wound healing, and provide anti-aging benefits. Also known as Jurema.",good_for:["Atopic dermatitis","Wrinkles","Redness"],bad_for:["Sensitive Skin"]}};const m=["AI is preparing a recipe for you...","Considering which ingredients will work best for your concerns...","Balancing proportions to ensure proper texture...","Optimizing for your skin type...","Finalizing the perfect skincare formula...","Almost there, just adding the finishing touches..."];var p=function(e){let{goalsData:t,productData:n,includeFragrance:i,selectedMoods:o}=e;const s=Object(l.o)(),[c,d]=Object(a.useState)(!1),[p,h]=Object(a.useState)(m[0]);function g(e){let t="";return Object.keys(e).forEach((n,a,r)=>{t+=n,(e[n].hasOwnProperty("default_percent")||e[n].hasOwnProperty("max_percent"))&&(t+=" (",e[n].hasOwnProperty("default_percent")&&(t+="default: ".concat(e[n].default_percent),e[n].hasOwnProperty("max_percent")&&(t+=", ")),e[n].hasOwnProperty("max_percent")&&(t+="max: ".concat(e[n].max_percent)),t+=")"),a<r.length-1&&(t+=", ")}),t}return Object(a.useEffect)(()=>{if(c){const e=setInterval(()=>{h(e=>{const t=(m.indexOf(e)+1)%m.length;return m[t]})},4e3);return()=>clearInterval(e)}},[c]),r.a.createElement("div",null,r.a.createElement("h2",null,"Your Selections"),r.a.createElement("h3",null,"Skincare Goals/Concerns:"),r.a.createElement("ul",null,t.map((e,t)=>r.a.createElement("li",{key:t},e))),r.a.createElement("h3",null,"Selected Skincare Product:"),r.a.createElement("ul",null,r.a.createElement("li",null,n.charAt(0).toUpperCase()+n.slice(1))),r.a.createElement("h3",null,"Include Fragrance: "),r.a.createElement("ul",null,r.a.createElement("li",null,i.charAt(0).toUpperCase()+i.slice(1))),"yes"===i&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h3",null,"Selected Moods:"),r.a.createElement("ul",null,o.map((e,t)=>r.a.createElement("li",{key:t},e)))),c?r.a.createElement("div",{className:"loading-container"},r.a.createElement("div",{className:"loader"}),r.a.createElement("p",{className:"loading-message"},p)):r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:()=>{d(!0),h(m[0]);const e=t.join(", "),a=n,r="yes"===i?"Essential oils should be added that will make me feel  ".concat(o.join(" and ")," ."):"It should not have fragrance added.",l={text:"Hello, I am trying to formulate a ".concat(a," for ").concat(e,". ").concat(r," Please suggest a recipe?"),ingredients:g(u)};console.log("Sending OpenAI request: ",l.text,l.ingredients),fetch("https://us-central1-skincare-recipe-tool.cloudfunctions.net/getInitialRecipe",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)}).then(e=>(console.log(e),e.json())).then(e=>{d(!1),console.log("Success:",e);const t=e.reply.choices[0].message.content,n=JSON.parse(t);console.log(n),s("/recipe-builder",{state:{recipe:n}})}).catch(e=>{d(!1),console.error("Error:",e)})}},"Generate a Formulation with AI"),r.a.createElement("button",{onClick:()=>{s("/recipe-builder")}},"Choose Ingredients Manually")))};var h=function(){var e;const t=Object(l.o)(),[n,i]=Object(a.useState)([]),[o,s]=Object(a.useState)({}),[c,d]=Object(a.useState)("selectIngredients"),[m,p]=Object(a.useState)(""),[h,g]=Object(a.useState)(""),f=Object(l.m)(),b=null===(e=f.state)||void 0===e?void 0:e.recipe;console.log(f.state),console.log("initialRecipe",b);const y=()=>{d("adjustProportions")},v=(e,t)=>{let a=100-Object.keys(o).filter(e=>_(e)).reduce((e,t)=>e+o[t],0);const r=n.filter(e=>!_(e)),i={...o,[e]:t};a-=t;const l=r.filter(t=>t!==e).reduce((e,t)=>e+i[t],0);if(l>0){const t=a/l;r.forEach(n=>{if(n!==e){let e=i[n]*t;i[n]=e<0?0:e}})}else r.forEach(t=>{t!==e&&(i[t]=0)});s(i)},[E,k]=Object(a.useState)({}),_=e=>{const t=u[e];return!!t&&"additive"===t.phase},S=()=>{const e={...o};let t=0;Object.keys(e).forEach(n=>{_(n)||(e[n]=Math.round(e[n])),t+=e[n]});const n=100-t,a=Object.keys(e).filter(e=>!_(e)),r=n/a.length;a.forEach(t=>{e[t]+=r});let i=0;if(a.forEach(t=>{e[t]<0&&(i+=e[t],e[t]=0)}),i<0){const t=a.filter(t=>e[t]>=.01),n=Math.abs(i)/t.length;t.forEach(t=>{e[t]+=n})}const l=Object.values(e).reduce((e,t)=>e+t,0);if(l>100){const t=l-100,n=a.filter(t=>e[t]>0),r=t/n.length;n.forEach(t=>{e[t]-=r})}s(e)},w=()=>{setTimeout(()=>{S()},10)},O={display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"};Object(a.useEffect)(()=>{const e={};n.forEach(t=>{_(t)?e[t]=1:e[t]=10}),s(t=>Object.keys(t).filter(e=>n.includes(e)).reduce((e,n)=>(e[n]=t[n],e),e))},[n]);const j=Object.values(o).reduce((e,t)=>e+t,0),x={color:Math.abs(j-100)<.01?"black":"red"};return Object(a.useEffect)(()=>{if(console.log("useeffectinitialRecipe",b),b){const e={},t=[];Object.keys(b).forEach(n=>{"commentary"===n?p(b.commentary):"shelfLifeEstimate"===n?g(b.shelfLifeEstimate):u[n]&&(e[n]=b[n],t.push(n))}),console.log("ingredientsfromresponse",e),s(e),i(t),y()}},[b]),r.a.createElement("div",null,"selectIngredients"===c&&r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("div",{style:O},r.a.createElement("h3",null,"Available Ingredients:"),r.a.createElement("button",{onClick:y},"Adjust Proportions"),r.a.createElement("span",null)),Object.entries(u).map(e=>{let[t,a]=e;return r.a.createElement("div",{className:(l=t,(n.includes(l)?"selected":"")+" ingredient-row"),key:t,onClick:()=>(e=>{if(n.includes(e)){i(n.filter(t=>t!==e));const t={...o};delete t[e],s(t)}else i([...n,e]),s({...o,[e]:"additive"===u[e].phase?u[e].default_percent:10})})(t)},r.a.createElement("strong",null,t),r.a.createElement("small",null,a.description));var l}))),"adjustProportions"===c&&r.a.createElement("div",{className:"recipe-builder-container"},r.a.createElement("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"10px"}},r.a.createElement("button",{onClick:()=>{d("selectIngredients")}},"Back to Ingredients"),r.a.createElement("h3",null,"Proportions:"),r.a.createElement("span",{style:x,onClick:S},j.toFixed(2),"%")),r.a.createElement("div",{className:"scrollable-content"},r.a.createElement("table",{style:{width:"95%",borderCollapse:"collapse"}},r.a.createElement("tbody",null,n.map(e=>{var t;return r.a.createElement(r.a.Fragment,{key:e},r.a.createElement("tr",null,r.a.createElement("td",null,e),r.a.createElement("td",null,o[e].toFixed(2),"%")),r.a.createElement("tr",null,r.a.createElement("td",{colSpan:"2"},_(e)?r.a.createElement("div",{style:{position:"relative"}},r.a.createElement("input",{type:"text",value:null!==(t=E[e])&&void 0!==t?t:o[e],onChange:t=>((e,t)=>{k({...E,[e]:t});const n=parseFloat(t),a=u[e].max_percent||100;if(!isNaN(n)&&t.match(/^\d+(\.\d+)?$/)){const t=n>a?a:n,r={...o,[e]:t};s(r),v(e,n)}})(e,t.target.value),onBlur:t=>(e=>{const t=E[e],n=t?parseFloat(t):0,a=u[e].max_percent||100,r=n>a?a:n;if(!isNaN(r)){const t={...o,[e]:r};s(t),v(e,r),n>a&&k({...E,[e]:a})}})(e,t.target.value),style:{width:"100%",borderColor:o[e]===u[e].max_percent?"red":"initial"}}),o[e]===u[e].max_percent&&r.a.createElement("span",{style:{position:"absolute",right:0,top:0,color:"red"}},"Max")):r.a.createElement("input",{type:"range",min:"0",max:"100",step:"0.01",value:o[e],onChange:t=>((e,t)=>{const n=parseFloat(t);v(e,n)})(e,t.target.value),onMouseUp:w,onTouchEnd:w,style:{width:"100%"}}))))}))),m&&r.a.createElement("div",{className:"commentary"},r.a.createElement("div",{style:O},r.a.createElement("h3",null,"Commentary:"),r.a.createElement("button",{onClick:()=>{console.log("boop")}},"Get Recipe Advice (Coming Soon!)")),r.a.createElement("p",null,m),r.a.createElement("p",null,"Estimated Shelf Life: ",h))),r.a.createElement("button",{className:"submit",onClick:()=>{S(),t("/finalize-recipe",{state:{recipe:o,commentary:m}})}},"Finalize Recipe")))},g=n(15),f=n(5);const b=Object(g.a)({apiKey:"AIzaSyD-XWrjMOmhRPjjRz-MOA1ARZN_RVwTcbc",authDomain:"skincare-recipe-tool.firebaseapp.com",projectId:"skincare-recipe-tool",storageBucket:"skincare-recipe-tool.appspot.com",messagingSenderId:"1053752399193",appId:"1:1053752399193:web:caf58158f655ca8e0f2848"}),y=Object(f.e)(b);var v=function(){var e,t;const[n,i]=Object(a.useState)(""),o=Object(l.m)(),s=Object(l.o)(),c=null===(e=o.state)||void 0===e?void 0:e.recipe,d=null===(t=o.state)||void 0===t?void 0:t.commentary,u=n.trim().length>0;return r.a.createElement("div",{className:"body-container"},r.a.createElement("h2",null,"Name Your Custom Skincare Recipe"),r.a.createElement("input",{type:"text",placeholder:"Enter recipe name",value:n,onChange:e=>i(e.target.value)}),r.a.createElement("h2",null,"Your Base Recipe"),r.a.createElement("div",{className:"recipe"},c&&Object.keys(c).map((e,t)=>r.a.createElement("div",{key:t},r.a.createElement("strong",null,e),": ",c[e]))),r.a.createElement("div",{className:"actions"},r.a.createElement("button",{onClick:()=>{s("/change-ingredients")}},"Change Ingredients"),r.a.createElement("button",{onClick:()=>{s("/recipe-builder")}},"Change Proportions"),r.a.createElement("button",{className:"submit",onClick:async()=>{try{const e=n.toLowerCase().replace(/[^a-z0-9]/gi,"").replace(/ /g,"-")+"-"+(new Date).getTime();console.log(e),console.log(o.state);await Object(f.f)(Object(f.c)(y,"formulations",e),{name:n,ingredients:c,commentary:d,createdAt:new Date});console.log("Document written with ID: ",e),s("/saved-recipe",{state:{recipeId:e}})}catch(e){console.error("Error adding document: ",e)}},disabled:!u},"Confirm and Save")),!u&&r.a.createElement("p",{className:"why-disabled"},"Please enter a recipe name."))};var E=function(){var e;const[t,n]=Object(a.useState)(null),i=Object(l.m)(),o=Object(l.o)(),s=null===(e=i.state)||void 0===e?void 0:e.recipeId,[c,d]=Object(a.useState)("Share this Recipe");return Object(a.useEffect)(()=>{const e=new URLSearchParams(i.search).get("recipeId");if(e){(async()=>{const t=Object(f.c)(y,"formulations",e),a=await Object(f.d)(t);a.exists()?n(a.data()):console.log("No such document!")})()}else if(s){(async()=>{const e=Object(f.c)(y,"formulations",s),t=await Object(f.d)(e);t.exists()?n(t.data()):console.log("No such document!")})()}},[s,i.search]),t?r.a.createElement("div",null,r.a.createElement("h2",null,t.name),r.a.createElement("div",{className:"recipe"},Object.keys(t.ingredients).map((e,n)=>r.a.createElement("div",{key:n},r.a.createElement("strong",null,e),": ",t.ingredients[e]))),r.a.createElement("button",{onClick:()=>{const e=window.location.href,t="".concat(e,"?recipeId=").concat(s);navigator.clipboard.writeText(t).then(()=>{console.log("Recipe URL copied to clipboard!"),d("Copied!"),setTimeout(()=>{d("Share this Recipe")},3e3)}).catch(()=>{console.log("Error copying to clipboard")})}},c),r.a.createElement("button",{onClick:()=>{o("/order-formulation",{state:{recipeId:s}})}},"Order Formulation of this Recipe")):r.a.createElement("div",null,"Loading...")};var k=function(){var e;const t=Object(l.o)(),[n,i]=Object(a.useState)(null),[o,s]=Object(a.useState)(""),[c,d]=Object(a.useState)(""),[u,m]=Object(a.useState)(!0),[p,h]=Object(a.useState)({street1:"",street2:"",zip:""}),g=null===(e=Object(l.m)().state)||void 0===e?void 0:e.recipeId;return Object(a.useEffect)(()=>{if(g){(async()=>{const e=Object(f.c)(y,"formulations",g),t=await Object(f.d)(e);t.exists()?i(t.data()):console.log("No such document!")})()}},[g]),n?r.a.createElement("div",null,r.a.createElement("h2",null,n.name),r.a.createElement("div",{className:"recipe"},Object.keys(n.ingredients).map((e,t)=>r.a.createElement("div",{key:t},r.a.createElement("strong",null,e),": ",n.ingredients[e]))),r.a.createElement("p",null,"While this service is in development, formulations are free to you! We only ask that you please provide a review of your product and feedback about your experience using the service. (We'll send you a way to access that after we deliver your formulation)."),r.a.createElement("p",null,"We currently are only serving people in the Seattle area. ",r.a.createElement("a",{href:"#"},"Click here")," to be put on a waiting list for us to formulate and ship your recipe once we have that set up."),r.a.createElement("form",{onSubmit:async e=>{e.preventDefault();try{const e=(new Date).getTime()+"="+g;await(await Object(f.f)(Object(f.c)(y,"orders",e),{name:o,recipeId:g,phoneNumber:c,pickup:u,address:u?null:p,createdAt:new Date})),console.log("Order submitted"),t("/order-success")}catch(e){console.error("Error submitting order: ",e)}}},r.a.createElement("div",null,r.a.createElement("label",null,"Your Name:"),r.a.createElement("input",{type:"text",value:o,onChange:e=>s(e.target.value)})),r.a.createElement("div",null,r.a.createElement("label",null,"Mobile phone number (We'll text with you to coordinate delivery):"),r.a.createElement("input",{type:"tel",value:c,onChange:e=>d(e.target.value)})),r.a.createElement("div",null,r.a.createElement("label",null,"Are you willing to pick it up from Chris Koss's house?"),r.a.createElement("select",{value:u,onChange:e=>m("true"===e.target.value)},r.a.createElement("option",{value:"true"},"Yes"),r.a.createElement("option",{value:"false"},"No"))),!u&&r.a.createElement("div",null,r.a.createElement("label",null,"Delivery Address:"),r.a.createElement("input",{type:"text",placeholder:"Street 1",value:p.street1,onChange:e=>h({...p,street1:e.target.value})}),r.a.createElement("input",{type:"text",placeholder:"Street 2",value:p.street2,onChange:e=>h({...p,street2:e.target.value})}),r.a.createElement("input",{type:"text",value:"Seattle",readOnly:!0}),r.a.createElement("input",{type:"text",value:"WA",readOnly:!0}),r.a.createElement("input",{type:"text",placeholder:"Zip Code",value:p.zip,onChange:e=>h({...p,zip:e.target.value})})),r.a.createElement("button",{type:"submit",className:"submit"},"Submit Order"))):r.a.createElement("div",null,"Loading...")};var _=function(){return r.a.createElement("div",{className:"order-success"},r.a.createElement("h2",null,"Order Submitted Successfully!"),r.a.createElement("p",null,"Your information has been successfully submitted. Please look out for a text message from Chris."),r.a.createElement("p",null,"Chris will coordinate the mixing time with you, ensuring that your formulation is mixed within 24 hours of when you receive it for maximum freshness."),r.a.createElement("p",null,"Thank you for using our service!"))};var S=()=>{const[e,t]=Object(a.useState)(""),[n,i]=Object(a.useState)(""),[o,s]=Object(a.useState)(!1);return o?r.a.createElement("div",null,r.a.createElement("h1",null,"Thanks for contacting us! ",r.a.createElement("br",null)," We'll get back to you soon!"),r.a.createElement("a",{href:"/"},"Back to home")):r.a.createElement("form",{onSubmit:async t=>{t.preventDefault();try{await Object(f.a)(Object(f.b)(y,"contact-form-submissions"),{phoneNumber:e,message:n,createdAt:new Date}),s(!0)}catch(a){console.error("Error adding document: ",a)}},className:"contact-us-form"},r.a.createElement("h2",null,"Contact Us"),r.a.createElement("label",null,r.a.createElement("strong",null,"Phone number")," (if you'd like us to text you a response): ",r.a.createElement("br",null),r.a.createElement("input",{type:"text",value:e,onChange:e=>t(e.target.value)})),r.a.createElement("br",null),r.a.createElement("label",null,r.a.createElement("strong",null,"Message:"),r.a.createElement("br",null),r.a.createElement("textarea",{value:n,onChange:e=>i(e.target.value)})),r.a.createElement("button",{type:"submit"},"Submit"))};var w=function(){const[e,t]=Object(a.useState)([]),[n,i]=Object(a.useState)("no"),[o,u]=Object(a.useState)([]),[m,g]=Object(a.useState)("");return r.a.createElement(s.a,null,r.a.createElement(l.c,null,r.a.createElement(l.a,{path:"/",element:r.a.createElement("div",{style:{backgroundImage:'url("bgimg.png")',backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center top",height:"100vh",color:"#61685f"},className:"homePageContainer"},r.a.createElement("div",{className:"title"},r.a.createElement("h1",null,r.a.createElement("img",{src:"/logo.png",className:"logo"})," Skincremental"),r.a.createElement("h4",null,"Revolutionizing Skincare, One Batch at a Time!")),r.a.createElement(s.b,{to:"/goals"},r.a.createElement("button",{className:"startbutton"},"Design Custom ",r.a.createElement("br",null)," Skincare Recipe")),r.a.createElement("div",{className:"homepageText"},r.a.createElement("p",null,r.a.createElement("strong",null,"Tailored to You, Evolving with You:")," ",r.a.createElement("br",null)," Small batch custom-crafted skincare that adapts to your unique needs, lifestyle, and environmental changes."),r.a.createElement("p",null,r.a.createElement("strong",null,"Double the Discovery, Double the Impact:")," ",r.a.createElement("br",null)," Embark on a skincare adventure with every order as you try two variations of your custom formulation. Use, assess, and let us know your favorite. Our AI assistant will refine your choice into two new exploratory batches for your next order. Your skincare journey is an ongoing adventure of discovery and optimization."),r.a.createElement("p",null,r.a.createElement("strong",null,"Tired of skincare cluttered with unnecessary preservatives, stabilizers and cheap synthetic fillers?")," We are too! Our mission is to provide you with skincare essentials free from the non-beneficial ingredients that are only added so it can sit in a warehouse for a year before it reaches you.  Our commitment to using only deeply nourishing ingredients means your skin receives only the best."),r.a.createElement("p",null,r.a.createElement("strong",null,"Knowledge is Power, Especially for Your Skin:"),"  Dive into the world of ingredients without the complexity. As you customize your formulation, we'll guide you through each ingredient's purpose. Say goodbye to mystery chemicals and hello to informed skincare choices."),r.a.createElement("p",null,r.a.createElement("strong",null,"Empowered by AI:"),"  Say hello to your new skincare partner, our AI-powered formulation assistant. It's not just about the initial match but how your skincare evolves with you, ensuring you always have the best for your skin."),r.a.createElement("p",null,r.a.createElement("strong",null,"Natural Preservation, Naturally Better:")," Delivering small batches within days of mixing means minimal need for preservatives. When needed, we opt for natural, plant-based options. Healthier for your skin, gentler on the planet."),r.a.createElement("p",null,r.a.createElement("strong",null,"Adapt with the Seasons:")," As the seasons change, so should your skincare. We fine-tune your formulation to adapt to seasonal shifts, ensuring your skin always gets what it needs, when it needs it."),r.a.createElement("p",null,r.a.createElement("strong",null,"Craft, Share, Earn:")," Ready to be a skincare trendsetter? Create and perfect your unique formulation, then share it with the world. Every time someone chooses your creation, you can earn rewards or support a cause close to your heart. Empower your skin and your community!"),r.a.createElement("p",null,r.a.createElement("strong",null,"Conscious, Clean, and Community-Driven:")," We're not just about great skincare; we're about a healthier planet. Our packaging? Recycled, sterilized, and reused for future orders. Our ingredients? We strive to source from local Pacific Northwest small and family-owned businesses whenever possible. For each jar you return for recycling, we\u2019ll donate $1 to a local charity."),r.a.createElement("p",null,r.a.createElement("strong",null,"Join the Skincremental Revolution:")," Where skincare is more than a routine \u2013 it's a dynamic, personalized journey. Be a part of a community that chooses sustainability, customization, and innovation.")),r.a.createElement(s.b,{to:"/goals"},r.a.createElement("button",{className:"bottomstartbutton"},"Begin Your Skincare Journey")),r.a.createElement(s.b,{to:"/contact"},r.a.createElement("a",{href:"/contact"},"Contact us")))}),r.a.createElement(l.a,{path:"/goals",element:r.a.createElement(c,{setGoalsData:t,setIncludeFragranceApp:e=>{i(e)},setSelectedMoodsApp:e=>{u(e)}})}),r.a.createElement(l.a,{path:"/product",element:r.a.createElement(d,{setProductData:g})}),r.a.createElement(l.a,{path:"/summary",element:r.a.createElement(p,{goalsData:e,productData:m,includeFragrance:n,selectedMoods:o})}),r.a.createElement(l.a,{path:"/recipe-builder",element:r.a.createElement(h,null)}),r.a.createElement(l.a,{path:"/finalize-recipe",element:r.a.createElement(v,null)}),r.a.createElement(l.a,{path:"/saved-recipe",element:r.a.createElement(E,null)}),r.a.createElement(l.a,{path:"/order-formulation",element:r.a.createElement(k,null)}),r.a.createElement(l.a,{path:"/order-success",element:r.a.createElement(_,null)}),r.a.createElement(l.a,{path:"/contact",element:r.a.createElement(S,null)})))};var O=e=>{e&&e instanceof Function&&n.e(3).then(n.bind(null,26)).then(t=>{let{getCLS:n,getFID:a,getFCP:r,getLCP:i,getTTFB:o}=t;n(e),a(e),r(e),i(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null))),O()}},[[16,1,2]]]);
//# sourceMappingURL=main.ad6ed322.chunk.js.map