from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import date


class SongBase(SQLModel):
    name: str
    artist: str
    year: Optional[int] = None


class Song(SongBase, table=True):
    id: int = Field(default=None, primary_key=True)


class SongCreate(SongBase):
    pass


class FoodBase(SQLModel):
    food_name: str
    food_type: str
    calories: float
    protein: float
    carbonhidrats: float
    fat: float
    food_image: Optional[str] = None


class Food(FoodBase, table=True):
    food_id: int = Field(default=None, primary_key=True)
    favorite_foods: List["FavoriteFood"] = Relationship(back_populates="food")
    user_meals: List["UserMeal"] = Relationship(back_populates="food")


class FoodCreate(FoodBase):
    pass


class FoodRead(FoodBase):
    food_id: int


class FoodUpdate(SQLModel):
    food_name: Optional[str] = None
    food_type: Optional[str] = None
    calories: Optional[float] = None
    protein: Optional[float] = None
    carbonhidrats: Optional[float] = None
    fat: Optional[float] = None
    food_image: Optional[str] = None


class UserBase(SQLModel):
    username: str
    email: str
    password: str
    registration_date: date
    age: int
    gender: str
    weight: float
    height: float
    is_superadmin: bool


class User(UserBase, table=True):
    user_id: int = Field(default=None, primary_key=True)
    favorite_recipes: List["FavoriteRecipe"] = Relationship(back_populates="user")
    favorite_foods: List["FavoriteFood"] = Relationship(back_populates="user")
    user_meals: List["UserMeal"] = Relationship(back_populates="user")


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    user_id: int


class UserUpdate(SQLModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    registration_date: Optional[date] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    is_superadmin: Optional[bool] = None



class RecipeBase(SQLModel):
    recipe_name: str
    recipe_description: Optional[str] = None
    calories: float
    protein: float
    carbonhidrats: float
    fat: float
    preparation_time: float
    cooking_time: float
    recipe_image: Optional[str] = None


class Recipe(RecipeBase, table=True):
    recipe_id: int = Field(default=None, primary_key=True)
    favorite_recipes: List["FavoriteRecipe"] = Relationship(back_populates="recipe")


class RecipeCreate(RecipeBase):
    pass


class RecipeRead(RecipeBase):
    recipe_id: int


class RecipeUpdate(SQLModel):
    recipe_name: Optional[str] = None
    recipe_description: Optional[str] = None
    calories: Optional[float] = None
    protein: Optional[float] = None
    carbonhidrats: Optional[float] = None
    fat: Optional[float] = None
    preparation_time: Optional[float] = None
    cooking_time: Optional[float] = None
    recipe_image: Optional[str] = None


class Meal(SQLModel, table=True):
    meal_id: int = Field(default=None, primary_key=True)
    meal_name: str

    user_meals: List["UserMeal"] = Relationship(back_populates="meal")


# FavoriteRecipe model
class FavoriteRecipeBase(SQLModel):
    user_id: int
    recipe_id: int


class FavoriteRecipe(FavoriteRecipeBase, table=True):
    favorite_recipe_id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    recipe_id: int = Field(foreign_key="recipe.recipe_id")

    user: User = Relationship(back_populates="favorite_recipes")
    recipe: Recipe = Relationship(back_populates="favorite_recipes")


class FavoriteRecipeCreate(FavoriteRecipeBase):
    pass


class FavoriteRecipeRead(FavoriteRecipeBase):
    favorite_recipe_id: int


class FavoriteRecipeUpdate(SQLModel):
    user_id: Optional[int] = None
    recipe_id: Optional[int] = None

# FavoriteFood model
class FavoriteFoodBase(SQLModel):
    user_id: int
    food_id: int


class FavoriteFood(FavoriteFoodBase, table=True):
    favorite_food_id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    food_id: int = Field(foreign_key="food.food_id")

    user: User = Relationship(back_populates="favorite_foods")
    food: Food = Relationship(back_populates="favorite_foods")


class FavoriteFoodCreate(FavoriteFoodBase):
    pass


class FavoriteFoodRead(FavoriteFoodBase):
    favorite_food_id: int


class FavoriteFoodUpdate(SQLModel):
    user_id: Optional[int] = None
    food_id: Optional[int] = None

# UserMeal model
class UserMealBase(SQLModel):
    user_id: int
    meal_id: int
    food_id: int
    quantity: float
    meal_date: date


class UserMeal(UserMealBase, table=True):
    user_meal_id: int = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.user_id")
    meal_id: int = Field(foreign_key="meal.meal_id")
    food_id: int = Field(foreign_key="food.food_id")

    user: User = Relationship(back_populates="user_meals")
    meal: Meal = Relationship(back_populates="user_meals")
    food: Food = Relationship(back_populates="user_meals")


class UserMealCreate(UserMealBase):
    pass


class UserMealRead(UserMealBase):
    user_meal_id: int


class UserMealUpdate(SQLModel):
    user_id: Optional[int] = None
    meal_id: Optional[int] = None
    food_id: Optional[int] = None
    quantity: Optional[float] = None
    meal_date: Optional[date] = None