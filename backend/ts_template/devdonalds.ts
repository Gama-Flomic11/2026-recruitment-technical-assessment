import express, { Request, Response } from "express";

// ==== Type Definitions, feel free to add or modify ==========================
interface cookbookEntry {
  name: string;
  type: string;
}

interface requiredItem {
  name: string;
  quantity: number;
}

interface recipe extends cookbookEntry {
  requiredItems: requiredItem[];
}

interface ingredient extends cookbookEntry {
  cookTime: number;
}

const entries:cookbookEntry[] = []


function addCookbook(entry: cookbookEntry) {
  entries[entries.length] = entry;
}

function lengthCookbook() : number {
  return entries.length;
}

function viewCookbook(index: number) : cookbookEntry {
  return entries[index];
}


// =============================================================================
// ==== HTTP Endpoint Stubs ====================================================
// =============================================================================
const app = express();
app.use(express.json());

// Store your recipes here!
const cookbook: any = null;

// Task 1 helper (don't touch)
app.post("/parse", (req:Request, res:Response) => {
  const { input } = req.body;

  const parsed_string = parse_handwriting(input)
  if (parsed_string == null) {
    res.status(400).send("this string is cooked");
    return;
  } 
  res.json({ msg: parsed_string });
  return;
  
});

// [TASK 1] ====================================================================
// Takes in a recipeName and returns it in a form that 
const parse_handwriting = (recipeName: string): string | null => {
  let regex = /[-_]/
  while (recipeName.match(regex) != null) {
    recipeName = recipeName.replace(regex, ' ')
  }

  regex = /  /
  while (recipeName.match(regex) != null) {
    recipeName = recipeName.replace(regex, ' ')
  }


  regex = /[A-Z]/
  while (recipeName.match(regex) != null) {
    const element = recipeName.match(regex)
    recipeName = recipeName.replace(regex, element[0].toLowerCase())
  }

  regex = /[^A-Za-z_ ]/
  while (recipeName.match(regex) != null) {
    recipeName = recipeName.replace(regex, '')
  }

  regex = /[a-z]/
  if (recipeName.search(regex) == 0) {
    const element = recipeName.match(regex)
    recipeName = recipeName.replace(regex, element[0].toUpperCase())
  }

  regex = /\s[a-z]/
  while (recipeName.match(regex) != null) {
    const element = recipeName.match(regex)
    recipeName = recipeName.replace(regex, element[0].toUpperCase())
  }

  if (recipeName.length == 0) {
    return null
  }
  return recipeName
}

// [TASK 2] ====================================================================
// Endpoint that adds a CookbookEntry to your magical cookbook
app.post("/entry", (req:Request, res:Response) => {
  
  console.log(req.body) 

    const entry:cookbookEntry = req.body
    if (!(entry.type.localeCompare("recipe")==0 || entry.type.localeCompare("ingredient")==0)) {
      res.status(400).send("wrong type");
    }

    for (let i = 0; i < lengthCookbook(); i++) {
      if ((entry.name.toLowerCase().localeCompare(viewCookbook(i).name.toLowerCase())==0)) {
      res.status(400).send("non-unique name");
    }
  }

    if (entry.type.localeCompare("ingredient")==0) {
      console.log("ingredient");
      const ingredient: ingredient = req.body
      if (ingredient.cookTime < 0){
        res.status(400).send("Not a time");
      }
      addCookbook(ingredient);
      console.log("ingredient");
    } else if (entry.type.localeCompare("recipe")==0) {

      const recipe: recipe = req.body
      for (let i = 0; i < recipe.requiredItems.length; i++){
        for (let j = 0; j < recipe.requiredItems.length; j++){
          if ((recipe.requiredItems[i].name.toLowerCase().localeCompare(recipe.requiredItems[j].name.toLowerCase())==0)) {
            res.status(400).send("non-unique required item");
          }
        }
      }
      addCookbook(recipe);
    }

    res.status(200);




});

// [TASK 3] ====================================================================
// Endpoint that returns a summary of a recipe that corresponds to a query name
app.get("/summary", (req:Request, res:Request) => {
  // TODO: implement me
  res.status(500).send("not yet implemented!")

});

// =============================================================================
// ==== DO NOT TOUCH ===========================================================
// =============================================================================
const port = 8080;
app.listen(port, () => {
  console.log(`Running on: http://127.0.0.1:8080`);
});
