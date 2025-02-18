"""Initial migration with all models

Revision ID: e45e1cb372c0
Revises: 
Create Date: 2024-05-25 18:38:38.929687

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel             # NEW


# revision identifiers, used by Alembic.
revision = 'e45e1cb372c0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favoritefood',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('food_id', sa.Integer(), nullable=False),
    sa.Column('favorite_food_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('favorite_food_id')
    )
    op.create_table('favoriterecipe',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.Column('favorite_recipe_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('favorite_recipe_id')
    )
    op.create_table('food',
    sa.Column('food_name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('food_type', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('calories', sa.Float(), nullable=False),
    sa.Column('protein', sa.Float(), nullable=False),
    sa.Column('carbohydrates', sa.Float(), nullable=False),
    sa.Column('fat', sa.Float(), nullable=False),
    sa.Column('food_image', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('food_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('food_id')
    )
    op.create_table('meal',
    sa.Column('meal_name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('meal_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('meal_id')
    )
    op.create_table('recipe',
    sa.Column('recipe_name', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('recipe_description', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('calories', sa.Float(), nullable=False),
    sa.Column('protein', sa.Float(), nullable=False),
    sa.Column('carbohydrates', sa.Float(), nullable=False),
    sa.Column('fat', sa.Float(), nullable=False),
    sa.Column('preparation_time', sa.Float(), nullable=False),
    sa.Column('cooking_time', sa.Float(), nullable=False),
    sa.Column('recipe_image', sqlmodel.sql.sqltypes.AutoString(), nullable=True),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('recipe_id')
    )
    op.create_table('user',
    sa.Column('username', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('email', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('password', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('registration_date', sa.Date(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('gender', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('weight', sa.Float(), nullable=False),
    sa.Column('height', sa.Float(), nullable=False),
    sa.Column('is_superadmin', sa.Boolean(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('user_id')
    )
    op.create_table('usermeal',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('meal_id', sa.Integer(), nullable=False),
    sa.Column('food_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Float(), nullable=False),
    sa.Column('meal_date', sa.Date(), nullable=False),
    sa.Column('user_meal_id', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('user_meal_id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('usermeal')
    op.drop_table('user')
    op.drop_table('recipe')
    op.drop_table('meal')
    op.drop_table('food')
    op.drop_table('favoriterecipe')
    op.drop_table('favoritefood')
    # ### end Alembic commands ###
